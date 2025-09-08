# 🚀 Quick Deploy Guide

Deploy Guten Email Notification to Cloudflare Workers in under 5 minutes!

## 📋 Prerequisites

- ✅ **Cloudflare account**: with a domain
- ✅ **Email address**: you can only send to your own emails

## 🚀 One-Click Deployment

**Step 1:** Enable Cloudflare Email Routing
1. Go to your Cloudflare dashboard
2. Select your domain
3. Navigate to **Email** → **Email Routing**
4. Enable email routing

**Step 2:** Click the deploy button below

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/gutenye/email-notification)

**Step 3:** Configure Environment Variables

```bash
# Generate a secure API key
# Pro Tip: use this command `openssl rand -base64 32 | tr '+/' '-_' | tr -d '='`
API_KEYS: your-secure-api-key-here

# Use your Cloudflare domain
DEFAULT_FROM: notifications@yourdomain.com

# Your email address (from Email Routing dashboard - Verified email addresses)
DEFAULT_TO: your-email@example.com
```

## 📧 Gmail Setup (Optional)

Prevent notifications from going to spam

1. Go to Gmail → Settings → Filters and Blocked Addresses
2. Create a new filter:
   - **From:** `notifications@yourdomain.com`
   - **Action:** Never send it to Spam ✅

## ✅ Test Your Deployment

Send your first notification

```bash
curl https://your-worker.your-subdomain.workers.dev/YOUR_API_KEY -d $'Test Notification\nHello from Guten Email Notification!'
```

**🎉 Success!** You should receive an email notification within seconds.