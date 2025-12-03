import { UserService } from './UserService';

function App() {
  const handleError = (error: Error) => {
    console.error('Error:', error);
  };

  const handleSuccess = (message: string) => {
    console.log('Success:', message);
  };

  // For local testing, update these values:
  // 1. Get a JWT token from auth-service (see TESTING.md)
  // 2. Update userId to match the user ID in the token
  // 3. Ensure user-service is running on localhost:8095
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN || 'YOUR_JWT_TOKEN_HERE';
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9000';
  const userId = import.meta.env.VITE_USER_ID || '1';

  return (
    <div className="App">
      <UserService
        apiUrl={apiUrl}
        userId={userId}
        bearerToken={bearerToken}
        onError={handleError}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default App; 
