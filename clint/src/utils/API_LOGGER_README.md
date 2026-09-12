# API Logger - Complete Request/Response Tracking

## Overview
This utility provides comprehensive logging for all API requests, responses, and Socket.IO events in your application. It helps you debug and monitor data flow between frontend and backend.

## Features

✅ **HTTP Request/Response Logging**
- URL, method, headers, body
- Response status, headers, data
- Request duration in milliseconds
- Color-coded console output

✅ **Socket.IO Event Logging**
- Emit events with data
- Received events with data
- Timestamps for all events

✅ **Error Tracking**
- Detailed error messages
- Stack traces
- Failed request information

## Usage

### 1. HTTP Requests (Already Integrated)

The logger is already integrated into:
- `public/context/context_api.jsx` - All context API calls
- `hooks/useProject.js` - Project-related API calls

**Example output in console:**
```
📤 API REQUEST [abc123] - 10:30:45 AM
  URL: http://localhost:3000/user
  Method: GET
  Headers: { Authorization: "Bearer token..." }

📥 API RESPONSE [abc123] - 245.50ms
  URL: http://localhost:3000/user
  Status: 200 OK
  Duration: 245.50ms
  Response Data: { user_tooken: {...}, project_data: [...] }
```

### 2. Socket.IO Events (Already Integrated)

Socket logging is integrated in `component/Hero/Hero.jsx`

**Example output in console:**
```
🔌 SOCKET EMIT - 10:30:45 AM
  Event: join
  Data: { userId: "123", email: "user@example.com" }

🔌 SOCKET RECEIVED - 10:30:46 AM
  Event: joined_success
  Data: { message: "Successfully joined", userId: "123" }
```

### 3. Manual Logging

You can use the logger anywhere in your code:

```javascript
import { apiLogger } from '../src/utils/apiLogger';

// Info message
apiLogger.info('Starting data fetch', { userId: 123 });

// Success message
apiLogger.success('Data saved successfully', savedData);

// Error message
apiLogger.error('Failed to save data', error);

// Warning message
apiLogger.warn('API rate limit approaching', { remaining: 10 });
```

### 4. Custom API Calls

For any new API calls, use `loggedFetch` instead of `fetch`:

```javascript
import { loggedFetch } from '../src/utils/apiLogger';

const response = await loggedFetch('http://localhost:3000/api/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  },
  body: JSON.stringify({ data: 'value' })
});
```

### 5. Custom Socket Events

For new socket events:

```javascript
import { loggedSocketEmit, loggedSocketOn } from '../src/utils/apiLogger';

// Emit with logging
loggedSocketEmit(socket, 'custom_event', { data: 'value' });

// Listen with logging
loggedSocketOn(socket, 'response_event', (data) => {
  console.log('Received:', data);
});
```

## Enable/Disable Logging

To disable all logging (e.g., in production):

**File:** `src/utils/apiLogger.js`
```javascript
const API_LOGGER_ENABLED = false; // Change to false
```

## Console Output Colors

- 🟢 **Green** - Requests
- 🔵 **Blue** - Successful responses
- 🔴 **Red** - Errors
- 🟣 **Purple** - Socket events
- ⚠️ **Orange** - Warnings

## What Gets Logged

### For Each API Request:
1. Request ID (unique identifier)
2. Timestamp
3. URL
4. HTTP Method
5. Headers (table format)
6. Request Body (parsed JSON if possible)

### For Each API Response:
1. Same Request ID (for matching)
2. Response time in milliseconds
3. HTTP Status code
4. Response Headers (table format)
5. Response Data (parsed JSON)

### For Each Socket Event:
1. Event name
2. Timestamp
3. Data payload
4. Direction (emit/receive)

## Benefits

✅ **Easy Debugging** - See exactly what data is sent and received
✅ **Performance Monitoring** - Track request durations
✅ **Error Tracking** - Detailed error information
✅ **No Code Changes** - Already integrated throughout the app
✅ **Production Ready** - Can be disabled with one flag

## Example Console Output

When you run your app, you'll see detailed logs like:

```
📤 API REQUEST [x7k9m] - 2:45:30 PM
  URL: http://localhost:3000/likeproject
  Method: POST
  Headers:
    ┌─────────────────┬──────────────────────┐
    │ Authorization   │ Bearer eyJhbGc...    │
    │ Content-Type    │ application/json     │
    └─────────────────┴──────────────────────┘
  Request Body:
    { project_id: "507f1f77bcf86cd799439011" }

📥 API RESPONSE [x7k9m] - 156.23ms
  URL: http://localhost:3000/likeproject
  Status: 200 OK
  Duration: 156.23ms
  Response Data:
    {
      project: {
        _id: "507f1f77bcf86cd799439011",
        name: "My Project",
        likes: ["user1", "user2", "user3"]
      }
    }
```

## Troubleshooting

**Q: Logs not showing?**
- Check `API_LOGGER_ENABLED` is `true` in `apiLogger.js`
- Open browser console (F12)
- Check console filter settings

**Q: Too many logs?**
- You can filter by clicking the colored tags in console
- Or temporarily disable with `API_LOGGER_ENABLED = false`

**Q: Want to log only specific APIs?**
- You can selectively use `loggedFetch` vs regular `fetch`
- Or add conditional logic in the logger

## Next Steps

The logger is now active! Just:
1. Open your browser console (F12)
2. Use your app normally
3. Watch the detailed logs appear
4. Debug issues easily with complete request/response data

Happy debugging! 🎉
