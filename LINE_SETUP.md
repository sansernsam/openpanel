# LINE Messaging API Setup Guide

## ✅ Webhook Endpoint Created

Your LINE webhook endpoint is now available at:
```
https://www.cosdentbyslc.com/webhook/line
```

## 📋 Required Environment Variables

Add these to your `.env` file:

```bash
# LINE Messaging API Configuration
LINE_CHANNEL_ID=2006031962
LINE_CHANNEL_SECRET=173ac5fc0327c1ff9822eb0877815b18
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token_here
```

## 🔑 Getting Your Channel Access Token

1. Go to [LINE Developers Console](https://developers.line.biz/console/channel/2006031962/messaging-api)
2. Scroll down to **"Channel access token (long-lived)"** section
3. Click **"Issue"** if you don't have a token yet
4. Copy the token and add it to your `.env` file as `LINE_CHANNEL_ACCESS_TOKEN`

## 🔗 Configure Webhook URL in LINE Console

1. Go to [LINE Developers Console](https://developers.line.biz/console/channel/2006031962/messaging-api)
2. Find the **"Webhook settings"** section
3. Set the **Webhook URL** to:
   ```
   https://www.cosdentbyslc.com/webhook/line
   ```
4. Enable **"Use webhook"**
5. Click **"Verify"** to test the connection

## 🚀 What's Implemented

The webhook endpoint handles these LINE events:

- **message** - When users send messages (text, images, etc.)
- **follow** - When users add your LINE Official Account as a friend
- **unfollow** - When users unfollow your account
- **postback** - For interactive buttons/actions
- **join** - When your bot joins a group/room
- **leave** - When your bot leaves a group/room

## 📝 Next Steps

### To Send Messages Back to Users

Install the LINE Messaging API SDK:

```bash
pnpm add @line/bot-sdk
```

Then update the webhook controller to send replies. Example:

```typescript
import { Client } from '@line/bot-sdk';

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
});

// In the webhook handler:
case 'message':
  if (event.replyToken && event.message?.type === 'text') {
    await client.replyMessage(event.replyToken, {
      type: 'text',
      text: `You said: ${event.message.text}`,
    });
  }
  break;
```

### Current Event Logging

Right now, the webhook:
- ✅ Verifies LINE signatures for security
- ✅ Logs all incoming events
- ✅ Responds with 200 OK to acknowledge receipt
- 🔜 Ready for you to add custom message handling logic

## 🔒 Security

The webhook automatically:
- Validates the `x-line-signature` header using your Channel Secret
- Rejects requests with invalid signatures
- Uses HMAC-SHA256 for signature verification

## 📍 Code Locations

- Webhook Controller: [apps/api/src/controllers/webhook.controller.ts](apps/api/src/controllers/webhook.controller.ts#L235)
- Webhook Router: [apps/api/src/routes/webhook.router.ts](apps/api/src/routes/webhook.router.ts#L18)

## 🧪 Testing

To test locally:
1. Use ngrok or a similar tool to expose your local server
2. Update the webhook URL in LINE Console to your ngrok URL
3. Send messages to your LINE Official Account
4. Check your server logs for incoming events

## 📚 Resources

- [LINE Messaging API Documentation](https://developers.line.biz/en/docs/messaging-api/)
- [LINE Bot SDK for Node.js](https://github.com/line/line-bot-sdk-nodejs)
- [LINE Webhook Event Types](https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects)
