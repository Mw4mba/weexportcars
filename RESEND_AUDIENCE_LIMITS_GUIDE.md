# Resend Audience Limits & Email Service Options

## Current Setup
**Email Service:** Resend  
**Package Version:** ^6.1.3  
**Configuration File:** `src/app/api/contact/route.ts`  
**Current Recipient:** `mwambaandy06@gmail.com`

---

## Resend Audience Limits

### Free Tier
- **Emails per day:** 100 emails/day
- **Emails per month:** 3,000 emails/month
- **Audience size:** Up to 100 contacts
- **Domain verification:** Required for custom domains
- **Price:** FREE

### Pro Plan ($20/month)
- **Emails per day:** No daily limit
- **Emails per month:** 50,000 emails/month
- **Audience size:** Up to 1,000 contacts
- **Overage:** $1 per 1,000 additional emails
- **Features:**
  - Custom domains
  - Webhooks
  - API access
  - Email analytics
  - Dedicated support

### Business Plan (Custom Pricing)
- **Emails per month:** Unlimited (custom)
- **Audience size:** Unlimited contacts
- **Features:**
  - Everything in Pro
  - Priority support
  - SLA guarantee
  - Dedicated IP addresses
  - Advanced analytics

---

## Current Audience Limitation Issue

### Problem
The current implementation uses a single hardcoded recipient:
```typescript
to: ['mwambaandy06@gmail.com']
```

This means:
- ❌ Only one email address receives all inquiries
- ❌ Can't easily scale to multiple team members
- ❌ No audience/contact management needed (not using Resend's audience feature)
- ✅ Simple and direct for contact form submissions

### Is This Actually an "Audience Limit" Issue?

**No, it's not!** 

For a **contact form**, you don't typically use Resend's "Audience" feature. The audience feature is for:
- Email marketing campaigns
- Newsletter subscriptions
- Bulk email sends

For **transactional emails** (like contact form submissions), you simply need:
- Enough email quota (100/day on free tier is plenty for most contact forms)
- Verified sending domain

---

## How to Scale Recipient List

### Option 1: Multiple Recipients (Simple)
```typescript
const { data, error } = await resend.emails.send({
  from: 'We Export Cars <onboarding@resend.dev>',
  to: [
    'mwambaandy06@gmail.com',
    'sales@weexportcars.com',
    'support@weexportcars.com'
  ],
  // ... rest of config
});
```

**Pros:**
- Simple implementation
- No code changes needed
- Works with free tier

**Cons:**
- Limited to ~50 recipients per email (Resend limit)
- All recipients see each other's emails
- Hard to manage dynamically

### Option 2: BCC Recipients (Recommended for Multiple Staff)
```typescript
const { data, error } = await resend.emails.send({
  from: 'We Export Cars <onboarding@resend.dev>',
  to: ['mwambaandy06@gmail.com'], // Primary recipient
  bcc: [
    'sales@weexportcars.com',
    'support@weexportcars.com',
    'manager@weexportcars.com'
  ],
  // ... rest of config
});
```

**Pros:**
- Recipients don't see each other
- Primary recipient clearly defined
- Easy to add/remove team members

**Cons:**
- Still limited to ~50 total recipients
- All receive same email

### Option 3: Environment Variable Configuration
```typescript
// In .env.local
CONTACT_FORM_RECIPIENTS=mwambaandy06@gmail.com,sales@weexportcars.com,support@weexportcars.com

// In route.ts
const recipients = process.env.CONTACT_FORM_RECIPIENTS?.split(',') || ['mwambaandy06@gmail.com'];

const { data, error } = await resend.emails.send({
  from: 'We Export Cars <onboarding@resend.dev>',
  to: recipients,
  // ... rest of config
});
```

**Pros:**
- Easy to update without code changes
- Can be different per environment (dev/staging/prod)
- Centralized configuration

**Cons:**
- Requires environment variable management
- Need to redeploy to change

### Option 4: Database-Driven Recipients (For Large Teams)
```typescript
// Example with database
const recipients = await db.query('SELECT email FROM team_members WHERE receive_contact_forms = true');

const { data, error } = await resend.emails.send({
  from: 'We Export Cars <onboarding@resend.dev>',
  to: recipients.map(r => r.email),
  // ... rest of config
});
```

**Pros:**
- Dynamic management via admin panel
- No code deployment needed
- Can route based on inquiry type

**Cons:**
- Requires database setup
- More complex architecture
- Slower (database query on each submission)

---

## Upgrading Resend Configuration

### Step 1: Verify Your Domain
Instead of using `onboarding@resend.dev`, use your own domain:

1. **Add Domain in Resend Dashboard:**
   - Go to https://resend.com/domains
   - Add `weexportcars.com` or your actual domain
   - Add DNS records (SPF, DKIM, DMARC)

2. **Update Code:**
```typescript
const { data, error } = await resend.emails.send({
  from: 'Contact Form <noreply@weexportcars.com>', // ✅ Custom domain
  to: ['mwambaandy06@gmail.com'],
  replyTo: sanitizedEmail,
  subject: `New Export Inquiry - ${vehicleName}`,
  // ... rest
});
```

**Benefits:**
- Better deliverability
- Professional appearance
- Required for most email providers

### Step 2: Upgrade to Pro Plan (If Needed)

**When to upgrade:**
- ✅ Receiving >100 contact forms per day
- ✅ Need more than 3,000 emails/month
- ✅ Want advanced analytics
- ✅ Need webhook integration
- ✅ Require SLA/support

**Cost:** $20/month for 50,000 emails

---

## Alternative Email Services

### 1. SendGrid
**Pricing:**
- Free: 100 emails/day forever
- Essentials: $19.95/mo for 50,000 emails
- Pro: $89.95/mo for 100,000 emails

**Pros:**
- Mature, reliable service
- Excellent deliverability
- Advanced analytics
- Template management

**Cons:**
- More complex setup than Resend
- Steeper learning curve
- Heavier SDK

### 2. Postmark
**Pricing:**
- Free: 100 emails/month
- $15/mo for 10,000 emails
- $50/mo for 50,000 emails

**Pros:**
- Excellent for transactional emails
- 99.99% uptime SLA
- Best-in-class deliverability
- Simple, clean API

**Cons:**
- More expensive per email
- Not ideal for marketing emails

### 3. Amazon SES
**Pricing:**
- $0.10 per 1,000 emails
- First 62,000 emails/month FREE (via EC2)

**Pros:**
- Extremely cheap at scale
- Highly reliable (AWS infrastructure)
- No monthly minimum

**Cons:**
- Complex setup
- Requires AWS account
- Need to manage IP reputation
- No built-in templates

### 4. Mailgun
**Pricing:**
- Free: 100 emails/day (first month 5,000 free)
- Foundation: $35/mo for 50,000 emails
- Growth: $80/mo for 100,000 emails

**Pros:**
- Good for developers
- Powerful API
- Email validation included

**Cons:**
- UI not as modern
- Free tier limited

### 5. Nodemailer + Gmail/Outlook (NOT RECOMMENDED for Production)
**Pricing:**
- Free with existing account

**Pros:**
- Zero cost
- Simple setup

**Cons:**
- ❌ Daily sending limits (500-2000/day)
- ❌ Poor deliverability
- ❌ Account suspension risk
- ❌ Not scalable
- ❌ Against Gmail ToS for bulk sending

---

## Recommendations

### For We Export Cars

**Current Status:**
- Contact form with low-medium volume (<100 submissions/day estimated)
- Single recipient currently
- Using Resend free tier

**Recommended Approach:**

### Short-term (Immediate):
1. **Stay with Resend Free Tier** - More than sufficient for contact forms
2. **Add domain verification** - Improves deliverability
3. **Use environment variables for recipients** - Easy to manage

```typescript
// .env.local
CONTACT_FORM_RECIPIENTS=mwambaandy06@gmail.com,sales@weexportcars.com
CONTACT_FORM_FROM=Contact Form <noreply@weexportcars.com>

// route.ts
const recipients = process.env.CONTACT_FORM_RECIPIENTS?.split(',') || ['mwambaandy06@gmail.com'];
const fromEmail = process.env.CONTACT_FORM_FROM || 'We Export Cars <onboarding@resend.dev>';

const { data, error } = await resend.emails.send({
  from: fromEmail,
  to: recipients,
  replyTo: sanitizedEmail,
  subject: `New Export Inquiry - ${vehicleName}`,
  react: ContactFormEmail({ /* ... */ }),
});
```

### Medium-term (3-6 months):
- Monitor email volume via Resend dashboard
- If approaching 100/day, upgrade to Pro ($20/mo)
- Consider adding email routing based on vehicle type or country

### Long-term (1 year+):
- If volume exceeds 50,000/month, evaluate:
  - **Amazon SES** (cheapest at scale)
  - **Resend Business** (if you value simplicity)
  - **SendGrid** (if you need marketing features too)

---

## Migration Guide (If Switching from Resend)

### To SendGrid:
```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const msg = {
  to: recipients,
  from: 'noreply@weexportcars.com',
  subject: `New Export Inquiry - ${vehicleName}`,
  html: renderContactFormEmail({ /* ... */ }),
};

await sgMail.send(msg);
```

### To Postmark:
```bash
npm install postmark
```

```typescript
import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

await client.sendEmail({
  From: 'noreply@weexportcars.com',
  To: recipients.join(','),
  Subject: `New Export Inquiry - ${vehicleName}`,
  HtmlBody: renderContactFormEmail({ /* ... */ }),
});
```

### To Amazon SES:
```bash
npm install @aws-sdk/client-ses
```

```typescript
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const client = new SESClient({ region: 'us-east-1' });

await client.send(new SendEmailCommand({
  Source: 'noreply@weexportcars.com',
  Destination: { ToAddresses: recipients },
  Message: {
    Subject: { Data: `New Export Inquiry - ${vehicleName}` },
    Body: { Html: { Data: renderContactFormEmail({ /* ... */ }) } },
  },
}));
```

---

## Cost Comparison (for 10,000 emails/month)

| Service | Monthly Cost | Notes |
|---------|-------------|-------|
| **Resend** | **FREE** | Within 3,000/month limit; $20 for 50k |
| SendGrid | $19.95 | Essentials plan |
| Postmark | $15 | Best deliverability |
| Amazon SES | $1 | Cheapest, but complex |
| Mailgun | $35 | Foundation plan |

---

## Conclusion

**For We Export Cars:**

✅ **Stay with Resend** - It's perfect for your use case
- Free tier is sufficient (100 emails/day = 3,000/month)
- Modern, developer-friendly API
- Easy to upgrade if needed

🔧 **Implement these improvements:**
1. Add domain verification for better deliverability
2. Use environment variables for recipient list
3. Monitor usage in Resend dashboard

📊 **Upgrade trigger:**
- If consistently hitting 90+ emails/day, upgrade to Pro ($20/mo)
- If needing marketing features, consider SendGrid
- If extreme volume (>100k/month), migrate to Amazon SES

💰 **Cost-effective path:**
- Free tier → Pro ($20/mo) → Business (custom) → Amazon SES (if >500k/month)

**Estimated annual cost:** $0 (current volume) → $240/year (if upgraded to Pro)

The "audience limit" is not actually a problem for contact forms - you're using transactional email, not audience/marketing features!
