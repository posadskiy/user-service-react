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
  const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoLXNlcnZpY2UiLCJzdWIiOiIyIiwibmJmIjoxNzUwMTg3NDE5LCJleHAiOjE3NTA1NDc0MTksImlhdCI6MTc1MDE4NzQxOSwicm9sZXMiOltdfQ.R3kSIhlrLMpIvHqFoqHPvSHah2GDXsQQv9Z-o2W21pM';

  return (
    <div className="App">
      <UserService
        apiUrl="http://user-service.local"
        userId="2"
        bearerToken={bearerToken}
        onError={handleError}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default App; 