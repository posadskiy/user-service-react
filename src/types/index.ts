export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatar?: string;
}

export interface UserFormData extends Omit<User, 'id'> {}

export interface UserServiceProps {
  apiUrl: string;
  userId: string;
  onError?: (error: Error) => void;
  onSuccess?: (message: string) => void;
} 