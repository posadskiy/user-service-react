# User Service React Component

A React component for managing user information, built with Material-UI and TypeScript.

## Installation

```bash
npm install user-service-react
```

## Usage

```tsx
import { UserService } from 'user-service-react';

function App() {
  const handleError = (error: Error) => {
    console.error('Error:', error);
  };

  const handleSuccess = (message: string) => {
    console.log('Success:', message);
  };

  // In a real application, this token would typically come from your authentication system
  const bearerToken = 'your-jwt-token-here';

  return (
    <UserService
      apiUrl="https://your-api-url.com"
      userId="user123"
      bearerToken={bearerToken}
      onError={handleError}
      onSuccess={handleSuccess}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| apiUrl | string | Yes | The base URL of your user service API |
| userId | string | Yes | The ID of the user to display/edit |
| bearerToken | string | Yes | JWT token for API authentication |
| onError | (error: Error) => void | No | Callback function for error handling |
| onSuccess | (message: string) => void | No | Callback function for success messages |

## Features

- View user information
- Edit user profile
- JWT authentication support
- Responsive design
- Material-UI components
- TypeScript support
- Error handling
- Success notifications

## API Endpoints

The component uses the following API endpoints:

- GET `/v0/user/{userId}` - Fetch user information
- PUT `/v0/user/{userId}` - Update user information

All requests include the Bearer token in the Authorization header.

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build
```

## License

MIT 