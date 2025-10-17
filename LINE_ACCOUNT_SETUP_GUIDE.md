# LINE Official Account - Complete Setup Guide (From Scratch)

## 📱 Prerequisites

Before you start, you need:
- A LINE account (download LINE app if you don't have one)
- An email address
- A verified phone number

---

## Step 1: Create LINE Official Account

### 1.1 Go to LINE Official Account Manager
Visit: **https://manager.line.biz/**

### 1.2 Log In
- Click **"Log in"**
- Use your LINE account credentials
- You may need to verify with your phone

### 1.3 Create New Account
1. Click **"Create"** or **"Create an Official Account"**
2. Fill in the following information:
   - **Account name**: Your bot/business name
   - **Industry**: Select appropriate category
   - **Sub-industry**: More specific category
   - **Email**: Your email address

3. Click **"Create"**

### 1.4 Verify Your Account
- Check your email for verification link
- Click the link to verify
- Return to LINE Official Account Manager

---

## Step 2: Create Developer Channel

### 2.1 Go to LINE Developers Console
Visit: **https://developers.line.biz/console/**

### 2.2 Create or Select Provider
1. If you don't have a provider:
   - Click **"Create a new provider"**
   - Enter provider name (can be your company/personal name)
   - Click **"Create"**

2. If you already have a provider:
   - Click on your existing provider

### 2.3 Create Messaging API Channel
1. Click **"Create a new channel"**
2. Select **"Messaging API"**
3. Fill in the required fields:

   **Basic Information:**
   - **Channel type**: Messaging API (already selected)
   - **Provider**: Your provider name (auto-filled)
   - **Channel name**: Your bot name (e.g., "MyBot")
   - **Channel description**: What your bot does
   - **Category**: Select appropriate category
   - **Subcategory**: More specific category

   **App Settings:**
   - **Email address**: Your contact email

   **Terms of Use:**
   - ✅ Check "I have read and agree to the LINE Official Account Terms of Use"
   - ✅ Check "I have read and agree to the LINE Official Account API Terms of Use"

4. Click **"Create"**

---

## Step 3: Get Your Credentials

### 3.1 Go to Channel Settings
After creating the channel, you'll be on the channel page. If not:
1. Go to https://developers.line.biz/console/
2. Select your provider
3. Click on your channel

### 3.2 Get Channel ID and Channel Secret
1. Click on the **"Basic settings"** tab
2. You'll see:
   - **Channel ID** - Copy this (you'll need it)
   - **Channel secret** - Click "Show" then copy it

### 3.3 Get Channel Access Token
1. Click on the **"Messaging API"** tab
2. Scroll down to **"Channel access token (long-lived)"** section
3. Click **"Issue"**
4. A token will be generated - Click **"Copy"** to copy it
5. **IMPORTANT**: Save this token somewhere safe! You won't be able to see it again.

---

## Step 4: Configure Webhook Settings

Still on the **"Messaging API"** tab:

### 4.1 Set Webhook URL
1. Find **"Webhook settings"** section
2. Click **"Edit"** next to "Webhook URL"
3. Enter your webhook URL:
   ```
   https://www.cosdentbyslc.com/webhook/line
   ```
4. Click **"Update"**

### 4.2 Enable Webhook
1. Toggle **"Use webhook"** to **ON** (green)

### 4.3 Verify Webhook (Optional - for testing)
1. Click **"Verify"** button
2. If your server is running and configured, it should show "Success"
3. If not running yet, skip this step for now

---

## Step 5: Configure Auto-Reply Settings

### 5.1 Disable Default Responses
Still in the **"Messaging API"** tab:

1. Find **"Auto-reply messages"** section
2. Click the link to **LINE Official Account Manager**
3. OR go directly to: https://manager.line.biz/
4. Select your account
5. Go to **"Response settings"**
6. Disable:
   - ❌ **Auto-response messages** (turn OFF)
   - ❌ **Greeting messages** (turn OFF if you want to handle it in code)
7. Enable:
   - ✅ **Webhooks** (turn ON)

This ensures your webhook handles all messages instead of LINE's default responses.

---

## Step 6: Add Credentials to Your Application

### 6.1 Create/Update .env File
In your project root, add these environment variables:

```bash
# LINE Messaging API Configuration
LINE_CHANNEL_ID=<your_channel_id_from_step_3.2>
LINE_CHANNEL_SECRET=<your_channel_secret_from_step_3.2>
LINE_CHANNEL_ACCESS_TOKEN=<your_access_token_from_step_3.3>
```

### 6.2 Example
```bash
LINE_CHANNEL_ID=1234567890
LINE_CHANNEL_SECRET=abcdef1234567890abcdef1234567890
LINE_CHANNEL_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 7: Test Your Bot

### 7.1 Add Bot as Friend
1. In LINE Developers Console, go to **"Messaging API"** tab
2. Find **"QR code"** section
3. Scan the QR code with your LINE app
4. Add the bot as a friend

### 7.2 Send a Test Message
1. Open the chat with your bot in LINE app
2. Send a message like "Hello"
3. Check your server logs to see if the webhook received the event

### 7.3 Check Logs
Your webhook should log:
```
LINE event received { type: 'message', userId: 'U1234...' }
LINE text message { text: 'Hello', userId: 'U1234...' }
```

---

## 🎉 You're All Set!

Your LINE Official Account is now connected to your webhook!

### What Happens Now?
- When users message your bot → Your webhook receives the event
- You can process the message in your code
- You can send replies using the Channel Access Token

### Next Steps
- Implement message reply logic in [webhook.controller.ts](apps/api/src/controllers/webhook.controller.ts)
- Install `@line/bot-sdk` to send messages back: `pnpm add @line/bot-sdk`
- See [LINE_SETUP.md](LINE_SETUP.md) for code examples

---

## 🔒 Security Checklist

- ✅ Never commit `.env` file to git
- ✅ Keep Channel Secret and Access Token private
- ✅ Add `.env` to `.gitignore`
- ✅ Webhook signature verification is enabled (already in code)

---

## 📚 Useful Links

- **LINE Official Account Manager**: https://manager.line.biz/
- **LINE Developers Console**: https://developers.line.biz/console/
- **Messaging API Docs**: https://developers.line.biz/en/docs/messaging-api/
- **LINE Bot SDK**: https://github.com/line/line-bot-sdk-nodejs

---

## ❓ Troubleshooting

### Webhook verification fails
- Make sure your server is running and accessible from the internet
- Check that the webhook URL is correct
- Ensure `LINE_CHANNEL_SECRET` is set in your `.env` file

### Bot doesn't respond to messages
- Check webhook is enabled in Messaging API settings
- Check auto-reply is disabled in Official Account Manager
- Check server logs for errors
- Verify environment variables are loaded

### Can't find Channel ID/Secret
- Go to LINE Developers Console → Your Channel → "Basic settings" tab

### Lost Channel Access Token
- Go to Messaging API tab
- You can't view the old token, but you can issue a new one
- Click "Issue" in the Channel access token section

---

## 📞 Need Help?

If you get stuck:
1. Check the error messages in your server logs
2. Verify all settings in LINE Developers Console
3. Make sure your `.env` file has all three variables
4. Test webhook URL is accessible from the internet

Good luck! 🚀
