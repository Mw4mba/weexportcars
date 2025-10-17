# Resend Email Setup Guide
**Project:** We Export Cars Contact Form  
**Date:** October 17, 2025  
**Destination Email:** mwambaandy06@gmail.com

---

## ✅ Implementation Complete

The contact form email functionality has been successfully implemented with the following components:

### Files Created/Modified:
1. ✅ `emails/ContactFormEmail.tsx` - Email template
2. ✅ `src/app/api/contact/route.ts` - API endpoint
3. ✅ `src/components/home/ContactFormSection.tsx` - Form with submission handler
4. ✅ `tsconfig.json` - Updated to include emails directory
5. ✅ `.env.local.example` - Environment variables template

### Dependencies Installed:
- ✅ `resend` - Email sending SDK
- ✅ `react-email` - Email template framework
- ✅ `@react-email/components` - Email components

---

## 🚀 Setup Steps Required

### Step 1: Create Resend Account (5 minutes)

1. **Go to:** https://resend.com
2. **Click:** "Sign up" (Free account, no credit card required)
3. **Sign up with:**
   - GitHub (recommended - fastest)
   - Or email/password
4. **Verify email** if using email signup

---

### Step 2: Get Your API Key (2 minutes)

1. **After login, go to:** https://resend.com/api-keys
2. **Click:** "Create API Key"
3. **Name:** "We Export Cars Production" (or any name)
4. **Permission:** Select "Sending access" (default)
5. **Click:** "Add"
6. **IMPORTANT:** Copy the API key immediately (starts with `re_`)
   - It will look like: `re_123abc456def789ghi012jkl345mno678`
   - You won't be able to see it again!

---

### Step 3: Configure Environment Variables (1 minute)

1. **Create `.env.local` file** in project root (same directory as `package.json`):

```bash
# Copy the example file
copy .env.local.example .env.local
```

2. **Edit `.env.local`** and add your API key:

```env
# Resend API Key (get from https://resend.com/api-keys)
RESEND_API_KEY=re_YOUR_ACTUAL_API_KEY_HERE

# Destination email (already set)
CONTACT_EMAIL=mwambaandy06@gmail.com
```

3. **Save the file**

---

### Step 4: Test Locally (5 minutes)

1. **Start development server:**
```bash
npm run dev
```

2. **Open browser:** http://localhost:3000

3. **Scroll to contact form** (bottom of homepage)

4. **Fill out test submission:**
   - Name: Test User
   - Email: your-email@example.com
   - Vehicle: Select any or "Other"
   - Country: Select any
   - Message: "Test submission"

5. **Click "Submit Request"**

6. **Expected results:**
   - ✅ Button shows "Sending..." with spinner
   - ✅ Green success message appears after 1-2 seconds
   - ✅ Form resets after 4 seconds
   - ✅ Email arrives at mwambaandy06@gmail.com

7. **Check your email:**
   - From: We Export Cars <onboarding@resend.dev>
   - Reply-To: your-email@example.com
   - Subject: New Export Inquiry - [vehicle name]
   - Body: Formatted with customer details

---

### Step 5: Deploy to Vercel (5 minutes)

1. **Add environment variables to Vercel:**
   - Go to: https://vercel.com/dashboard
   - Select your project: `weexportcars`
   - Click: Settings → Environment Variables
   - Add two variables:

   ```
   Name: RESEND_API_KEY
   Value: re_YOUR_ACTUAL_API_KEY_HERE
   Environment: Production, Preview, Development (select all)
   
   Name: CONTACT_EMAIL
   Value: mwambaandy06@gmail.com
   Environment: Production, Preview, Development (select all)
   ```

2. **Redeploy:**
   ```bash
   git add .
   git commit -m "Add Resend email integration for contact form"
   git push origin main
   ```

3. **Wait for deployment** (1-2 minutes)

4. **Test production:** 
   - Visit: https://weexportcars.vercel.app
   - Submit test form
   - Verify email received

---

## 🎯 What You Get

### Free Tier Features:
- ✅ **100 emails per day** (3,000/month)
- ✅ **Beautiful HTML emails** with React templates
- ✅ **99%+ deliverability** (dedicated infrastructure)
- ✅ **Real-time dashboard** to track sent emails
- ✅ **Delivery logs** with timestamps
- ✅ **Bounce handling** built-in
- ✅ **Reply-to functionality** (customers can reply directly)

### Security Features Included:
- ✅ **Rate limiting** - Max 5 submissions per hour per IP
- ✅ **Honeypot field** - Blocks simple spam bots
- ✅ **Input sanitization** - Prevents XSS attacks
- ✅ **Email validation** - Server-side verification
- ✅ **Error handling** - Graceful failure messages

---

## 📧 Email Template Preview

When a customer submits the form, you'll receive an email like this:

```
From: We Export Cars <onboarding@resend.dev>
Reply-To: customer@example.com
To: mwambaandy06@gmail.com
Subject: New Export Inquiry - 2022 Audi Q7

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚗 New Export Inquiry

CUSTOMER NAME:
John Doe

EMAIL ADDRESS:
customer@example.com

VEHICLE OF INTEREST:
2022 Audi Q7

DESTINATION COUNTRY:
United States

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADDITIONAL MESSAGE:
I am interested in this vehicle. 
Please provide more information...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This inquiry was submitted via the We Export Cars contact form.
Reply directly to this email to contact the customer.
```

**Features:**
- Professional formatting with brand colors
- Click-to-email customer address
- Reply-to goes directly to customer
- Mobile-responsive design
- Works in all email clients

---

## 🔧 Monitoring & Maintenance

### Resend Dashboard
Access at: https://resend.com/emails

**What you can see:**
- All sent emails (last 30 days on free tier)
- Delivery status (delivered/bounced/failed)
- Timestamps
- Error messages (if any)

### Vercel Function Logs
Access at: https://vercel.com/dashboard → Project → Deployments → Function Logs

**What you can see:**
- API route executions
- Error messages
- Form submission logs
- Rate limit triggers

---

## 🚨 Troubleshooting

### Issue: "Email service is not configured"
**Solution:** 
- Check `.env.local` file exists
- Verify `RESEND_API_KEY` is set
- Restart dev server: `npm run dev`

### Issue: "Failed to send email"
**Possible causes:**
1. Invalid API key → Check Resend dashboard
2. Rate limit exceeded → Wait 1 hour
3. Network error → Check internet connection

**Check Resend logs:**
- Go to: https://resend.com/emails
- Look for error messages
- Click on failed email for details

### Issue: Email not received
**Check:**
1. ✅ Spam/junk folder
2. ✅ Email address spelling (mwambaandy06@gmail.com)
3. ✅ Resend dashboard - was email sent?
4. ✅ Gmail filters/rules

### Issue: "Too many requests"
**Cause:** Rate limit triggered (5 per hour per IP)

**Solution:**
- Wait 1 hour
- Or adjust rate limit in `src/app/api/contact/route.ts`:
  ```typescript
  if (recentRequests.length >= 5) { // Change 5 to higher number
  ```

---

## 🎨 Customization Options

### 1. Change Email Template
Edit: `emails/ContactFormEmail.tsx`

**Examples:**
- Add company logo
- Change colors (currently #d10e22, #2a3443)
- Add footer with social links
- Include vehicle images

### 2. Change Sender Email
**Current:** `onboarding@resend.dev` (Resend's shared domain)

**To use custom domain:**
1. Verify your domain in Resend dashboard
2. Add DNS records (SPF, DKIM)
3. Update `from` address in `route.ts`:
   ```typescript
   from: 'We Export Cars <noreply@weexportcars.com>',
   ```

### 3. Add Email Notifications
**Send confirmation email to customer:**

In `route.ts`, after sending to you:
```typescript
await resend.emails.send({
  from: 'We Export Cars <noreply@weexportcars.com>',
  to: sanitizedEmail,
  subject: 'We received your inquiry!',
  react: CustomerConfirmationEmail({ name: sanitizedName }),
});
```

### 4. Adjust Rate Limiting
Edit: `src/app/api/contact/route.ts`

```typescript
// Current: 5 requests per hour
const recentRequests = timestamps.filter(t => now - t < 3600000);
if (recentRequests.length >= 5) { ... }

// Change to 10 requests per hour:
if (recentRequests.length >= 10) { ... }

// Or 3 requests per 15 minutes:
const recentRequests = timestamps.filter(t => now - t < 900000);
if (recentRequests.length >= 3) { ... }
```

---

## 💰 Pricing & Scaling

### Current Plan: Free Tier
- **Limit:** 100 emails/day (3,000/month)
- **Cost:** $0/month
- **Perfect for:** Lead generation forms

### When to Upgrade:
If you receive more than 100 form submissions per day:

**Pro Plan: $20/month**
- 50,000 emails/month
- Priority support
- Custom IP (better deliverability)
- Webhook events

**Upgrade at:** https://resend.com/settings/billing

---

## 📚 Additional Resources

### Documentation:
- **Resend Docs:** https://resend.com/docs
- **React Email:** https://react.email/docs
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers

### Support:
- **Resend Support:** support@resend.com
- **Community:** https://resend.com/discord

---

## ✅ Post-Setup Checklist

- [ ] Created Resend account
- [ ] Copied API key
- [ ] Created `.env.local` file
- [ ] Added `RESEND_API_KEY` to `.env.local`
- [ ] Tested locally - received test email
- [ ] Added environment variables to Vercel
- [ ] Deployed to production
- [ ] Tested production form - received email
- [ ] Verified email arrives in inbox (not spam)
- [ ] Tested reply-to functionality
- [ ] Bookmarked Resend dashboard

---

## 🎉 You're All Set!

Your contact form is now fully functional and sending emails to **mwambaandy06@gmail.com**.

**Next steps:**
1. Monitor first few submissions in Resend dashboard
2. Reply to test emails to verify reply-to works
3. Consider verifying your domain for branded emails (optional)
4. Set up email notifications for new submissions (optional)

**Need help?** Check the Troubleshooting section above or contact Resend support.

---

**Setup Guide Version:** 1.0  
**Last Updated:** October 17, 2025  
**Implementation Status:** ✅ Complete - Ready for Testing
