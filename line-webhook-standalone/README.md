# LINE Webhook Standalone Service

A lightweight, standalone webhook service for LINE Messaging API - no database required!

## Features

- ✅ LINE webhook signature verification
- ✅ Event logging (messages, follow/unfollow, etc.)
- ✅ Simple Express.js server
- ✅ No database dependencies
- ✅ Docker ready
- ✅ Easy to deploy on Render, Heroku, or any Node.js host

## Environment Variables

Required:
```bash
LINE_CHANNEL_SECRET=your_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_access_token
```

Optional:
```bash
PORT=3000  # Default port
```

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Set environment variables
export LINE_CHANNEL_SECRET=your_secret
export LINE_CHANNEL_ACCESS_TOKEN=your_token

# Start server
npm start
```

Server will run on http://localhost:3000

### Test Locally

```bash
curl http://localhost:3000/healthcheck
```

## Deploy to Render

1. Push this folder to GitHub
2. Go to https://dashboard.render.com/
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Root Directory**: `line-webhook-standalone`
   - **Runtime**: Docker
   - **Environment Variables**:
     - `LINE_CHANNEL_SECRET`: Your LINE channel secret
     - `LINE_CHANNEL_ACCESS_TOKEN`: Your LINE access token

6. Deploy!

## Update LINE Webhook URL

After deployment:
1. Go to https://developers.line.biz/console/
2. Select your channel
3. Go to "Messaging API" tab
4. Set webhook URL to: `https://your-app.onrender.com/webhook/line`
5. Enable "Use webhook"
6. Click "Verify"

## Endpoints

- `GET /` - Service info
- `GET /healthcheck` - Health check
- `POST /webhook/line` - LINE webhook endpoint

## Logs

The service logs all incoming events to console:
- Message events (with text content)
- Follow/unfollow events
- Postback events
- Join/leave group events

Check your deployment logs to see webhook events in real-time!

## Adding Reply Logic

To send replies back to users, uncomment the `replyToUser` function in `server.js` and call it from the event handlers.

Example:
```javascript
case 'message':
  if (event.message?.type === 'text') {
    await replyToUser(event.replyToken, `You said: ${event.message.text}`);
  }
  break;
```

## License

MIT
