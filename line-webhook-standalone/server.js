const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// LINE credentials from environment variables
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

// Middleware to parse JSON and get raw body for signature verification
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'LINE Webhook Service',
    timestamp: new Date().toISOString()
  });
});

app.get('/healthcheck', (req, res) => {
  res.json({ status: 'healthy' });
});

// LINE webhook endpoint
app.post('/webhook/line', (req, res) => {
  try {
    // Verify LINE signature
    const signature = req.headers['x-line-signature'];

    if (!LINE_CHANNEL_SECRET) {
      console.error('LINE_CHANNEL_SECRET not configured');
      return res.status(500).json({ error: 'Webhook not configured' });
    }

    if (!signature) {
      console.error('Missing x-line-signature header');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validate signature
    const hash = crypto
      .createHmac('sha256', LINE_CHANNEL_SECRET)
      .update(req.rawBody)
      .digest('base64');

    if (hash !== signature) {
      console.error('Invalid LINE signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Parse and log events
    const { events, destination } = req.body;

    console.log('LINE webhook received:', {
      destination,
      eventCount: events?.length || 0,
      timestamp: new Date().toISOString()
    });

    // Process each event
    if (events && Array.isArray(events)) {
      events.forEach((event) => {
        console.log('Event:', {
          type: event.type,
          userId: event.source?.userId,
          timestamp: event.timestamp,
        });

        // Handle different event types
        switch (event.type) {
          case 'message':
            if (event.message?.type === 'text') {
              console.log('Text message:', {
                text: event.message.text,
                userId: event.source?.userId,
              });

              // TODO: Add your custom message handling logic here
              // Example: Reply to the user
              // replyToUser(event.replyToken, `You said: ${event.message.text}`);
            }
            break;

          case 'follow':
            console.log('New follower:', { userId: event.source?.userId });
            // TODO: Welcome message logic
            break;

          case 'unfollow':
            console.log('User unfollowed:', { userId: event.source?.userId });
            break;

          case 'postback':
            console.log('Postback event:', {
              data: event.postback?.data,
              userId: event.source?.userId
            });
            break;

          case 'join':
            console.log('Bot joined group/room:', {
              groupId: event.source?.groupId,
              roomId: event.source?.roomId
            });
            break;

          case 'leave':
            console.log('Bot left group/room:', {
              groupId: event.source?.groupId,
              roomId: event.source?.roomId
            });
            break;

          default:
            console.log('Unhandled event type:', event.type);
        }
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example function to reply to users (uncomment and use if needed)
/*
async function replyToUser(replyToken, message) {
  if (!LINE_CHANNEL_ACCESS_TOKEN) {
    console.error('LINE_CHANNEL_ACCESS_TOKEN not configured');
    return;
  }

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [{
          type: 'text',
          text: message
        }]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send reply:', error);
    } else {
      console.log('Reply sent successfully');
    }
  } catch (error) {
    console.error('Error sending reply:', error);
  }
}
*/

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`LINE Webhook Service running on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/webhook/line`);
  console.log(`Health check: http://localhost:${PORT}/healthcheck`);
});
