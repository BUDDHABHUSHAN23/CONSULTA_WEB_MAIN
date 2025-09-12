# Email Configuration Guide

## Quick Setup for Fast Email Delivery

### 1. Gmail Setup (Recommended)
```bash
# Environment variables
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Generate from Google Account settings
SMTP_FROM="Consulta Technologies <your-email@gmail.com>"
NOTIFY_TO=admin@consulta.in,info@consulta.in
```

### 2. Gmail App Password Setup
1. Go to Google Account settings
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Generate password for "Mail"
5. Use this password as SMTP_PASS

### 3. Alternative: Yahoo Mail
```bash
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### 4. Test Email Functionality
```bash
# Test endpoint
curl -X POST http://localhost:8000/api/mailer/test

# Health check
curl http://localhost:8000/api/health/mailer
```

### 5. Performance Optimizations Made
- ✅ Reduced SMTP timeout from 20s to 10s
- ✅ Reduced retries from 2 to 1
- ✅ Faster retry backoff (0.5s instead of 1.2s)
- ✅ Synchronous email sending (not background task)
- ✅ Reduced rate limiting from 30s to 10s
- ✅ Added fallback SMTP configuration
- ✅ Better error handling and logging

### 6. Troubleshooting
- Check SMTP credentials are correct
- Ensure app password is used (not regular password)
- Verify firewall allows SMTP connections
- Check email provider's sending limits
- Monitor logs for specific error messages
