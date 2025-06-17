import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';
import { User, UserFormData, UserServiceProps } from '../types';

export const UserService: React.FC<UserServiceProps> = ({
  apiUrl,
  userId,
  bearerToken,
  onError,
  onSuccess,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<UserFormData>({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  React.useEffect(() => {
    fetchUserData();
  }, [apiUrl, userId, bearerToken]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/v0/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      });
      setUser(response.data);
      setFormData({
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber || '',
      });
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/v0/user/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      });
      setUser(response.data);
      setEditing(false);
      onSuccess?.('User information updated successfully');
    } catch (error) {
      onError?.(error as Error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={user?.avatar}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Typography variant="h5" component="h2">
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>

        {editing ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button
                    variant="outlined"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="body1">{user?.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  First Name
                </Typography>
                <Typography variant="body1">{user?.firstName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  Last Name
                </Typography>
                <Typography variant="body1">{user?.lastName}</Typography>
              </Grid>
              {user?.phoneNumber && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Phone Number
                  </Typography>
                  <Typography variant="body1">{user.phoneNumber}</Typography>
                </Grid>
              )}
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}; 