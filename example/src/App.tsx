import React from 'react';
import { UserService } from './UserService';

function App() {
  const handleError = (error: Error) => {
    console.error('Error:', error);
  };

  const handleSuccess = (message: string) => {
    console.log('Success:', message);
  };

  // In a real application, this token would typically come from your authentication system
  const bearerToken = 'your-bearer-token-here';
  const apiUrl = 'your-api-url-here';
  const userId = 'your-user-id-here';

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