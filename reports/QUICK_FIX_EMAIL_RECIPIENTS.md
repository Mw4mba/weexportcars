# Quick Fix: Add Recipients to Resend Test List

**Time Required:** 5 minutes  
**Cost:** FREE  
**Will Enable:** All three recipients to receive emails immediately

---

## The Problem in Simple Terms

You're using `onboarding@resend.dev` which is Resend's **test/sandbox domain**. For security, it only sends emails to:
1. ✅ The Resend account owner email (mwambaandy06@gmail.com)
2. ✅ Manually verified test recipients
3. ❌ All other emails are blocked

---

## The Solution

Add the other two email addresses as "test recipients" in your Resend account.

---

## Step-by-Step Instructions

### 1. Login to Resend
- Go to: https://resend.com/login
- Use the account that has the API key `re_NqEjdsGm_G21b12d2pLpyzczsGnnL2WJB`

### 2. Navigate to Domain Settings
- Click on **"Domains"** in the left sidebar
- Find and click on **"onboarding@resend.dev"** (or it might be in Settings → Testing)

### 3. Find Test Recipients Section
Look for one of these sections:
- "Test Recipients"
- "Allowed Recipients"
- "Sandbox Recipients"
- "Verified Recipients for Testing"

### 4. Add Both Email Addresses
Click "Add Recipient" or similar button and add:

```
kamatu@weexportcars.africa
```

Then add:
```
4ndilok@gmail.com
```

### 5. Save Changes
- Click "Save" or "Add" or "Verify"
- Some services require clicking a verification link sent to those emails

### 6. Test Immediately
- Go to your website: https://weexportcars.vercel.app
- Fill out and submit the contact form
- Check ALL THREE inboxes (including spam folders)

---

## Expected Result

All three recipients should now receive the contact form emails:
- ✅ mwambaandy06@gmail.com
- ✅ kamatu@weexportcars.africa
- ✅ 4ndilok@gmail.com

---

## If You Can't Find "Test Recipients"

### Alternative Location 1: Settings
1. Go to: Settings → General
2. Look for "Sandbox Mode" or "Test Mode"
3. Add recipients there

### Alternative Location 2: API Settings
1. Go to: API Keys
2. Click on your API key
3. Look for "Allowed Recipients" or "Restrictions"

### Alternative Location 3: Contact Resend Support
If you still can't find it:
- Email: support@resend.com
- Subject: "How to add test recipients for onboarding@resend.dev"
- Message: "I need to add kamatu@weexportcars.africa and 4ndilok@gmail.com as test recipients"

---

## Important Notes

⚠️ **This is a temporary solution**

**Limitations:**
- You can typically only add 5-10 test recipients
- Sender still shows as `onboarding@resend.dev` (not professional)
- Not suitable for production long-term

**For production use**, you should set up a custom domain (see `EMAIL_DELIVERY_TROUBLESHOOTING.md` Solution 2).

---

## Verification Email Requirement

Some email providers might require verification:

**For kamatu@weexportcars.africa:**
- Resend might send a verification email
- Check inbox and spam folder
- Click verification link

**For 4ndilok@gmail.com:**
- Same process
- Check Gmail inbox and spam
- Click verification link if received

---

## Troubleshooting

### Problem: Can't find test recipients section
**Solution:** Update to Solution 2 in the main report (custom domain)

### Problem: Verification email not received
**Solution 1:** Check spam/junk folders  
**Solution 2:** Re-add the email address  
**Solution 3:** Contact Resend support

### Problem: Still not receiving emails after adding
**Solution 1:** Wait 5 minutes and try again  
**Solution 2:** Check Resend dashboard → Emails → Look for delivery status  
**Solution 3:** Verify the email addresses were added correctly (no typos)

---

## Next Steps After This Works

Once all three recipients are receiving emails:

1. **Short term (1 week):** Keep using this setup
2. **Medium term (this month):** Set up custom domain `contact@weexportcars.africa`
3. **Long term:** Monitor email deliverability and adjust as needed

See `EMAIL_DELIVERY_TROUBLESHOOTING.md` for the custom domain setup guide.

---

## Quick Checklist

- [ ] Logged into Resend account
- [ ] Found test recipients / allowed recipients section
- [ ] Added kamatu@weexportcars.africa
- [ ] Added 4ndilok@gmail.com
- [ ] Verified both emails (if required)
- [ ] Submitted test contact form
- [ ] Confirmed all 3 recipients received email
- [ ] Checked spam folders if not in inbox

---

## Success Criteria

✅ You're done when:
1. Submit contact form on website
2. All THREE emails receive notification within 1-2 minutes
3. Emails look properly formatted
4. Reply-to address works correctly

**Time to complete:** 5 minutes  
**Difficulty:** Easy 🟢  
**Cost:** $0 (Free)
