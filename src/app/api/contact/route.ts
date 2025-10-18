import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormEmail } from '../../../../emails/ContactFormEmail';

// Use Node.js runtime for React Email compatibility
export const runtime = 'nodejs';

interface ContactFormData {
  name: string;
  email: string;
  vehicle: string;
  customModel?: string;
  country: string;
  message: string;
  honeypot?: string; // Anti-bot field
}

// Rate limiting map (in-memory, resets on cold start)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Allow 5 requests per hour per IP
  const recentRequests = timestamps.filter(t => now - t < 3600000);
  
  if (recentRequests.length >= 5) {
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body: ContactFormData = await request.json();
    
    // Honeypot check (anti-bot)
    if (body.honeypot) {
      // Bot detected - silently return success to avoid tipping off bot
      return NextResponse.json(
        { success: true, message: 'Your inquiry has been sent successfully!' },
        { status: 200 }
      );
    }

    // Basic validation
    if (!body.name || !body.email || !body.country) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Name, Email, Country).' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Sanitize input (basic XSS prevention)
    const sanitize = (str: string) => {
      return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    };

    const sanitizedName = sanitize(body.name.trim());
    const sanitizedEmail = body.email.trim().toLowerCase();
    const sanitizedCountry = sanitize(body.country.trim());
    const sanitizedMessage = body.message ? sanitize(body.message.trim()) : 'No additional message provided';

    // Determine vehicle name
    const vehicleName = body.vehicle === 'other' 
      ? (body.customModel ? sanitize(body.customModel.trim()) : 'Custom vehicle request')
      : sanitize(body.vehicle);

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'We Export Cars <onboarding@resend.dev>', // Use verified domain or resend dev domain
      to: [
        'mwambaandy06@gmail.com',
        'kamatu@weexportcars.africa',
        '4ndilok@gmail.com'
      ],
      replyTo: sanitizedEmail, // Allow direct reply to customer
      subject: `New Export Inquiry - ${vehicleName}`,
      react: ContactFormEmail({
        name: sanitizedName,
        email: sanitizedEmail,
        vehicle: vehicleName,
        country: sanitizedCountry,
        message: sanitizedMessage,
      }),
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send your inquiry. Please try again or contact us via WhatsApp.' },
        { status: 500 }
      );
    }

    // Log successful submission (useful for monitoring)
    console.log('[Contact Form] Submission sent:', {
      timestamp: new Date().toISOString(),
      name: sanitizedName,
      email: sanitizedEmail,
      vehicle: vehicleName,
      messageId: data?.id,
    });

    // Success response
    return NextResponse.json(
      { 
        success: true, 
        messageId: data?.id,
        message: 'Thank you! Your inquiry has been sent successfully. We\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again or contact us via WhatsApp.' },
      { status: 500 }
    );
  }
}
