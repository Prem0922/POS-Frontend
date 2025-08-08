# POS (Point of Sale) Application

A modern Point of Sale system with authentication that reuses the CRM authentication logic.

## Features

- **Authentication System**: Reuses CRM authentication backend
- **Login Page**: Modern UI following test case specifications
- **Protected Routes**: All POS features require authentication
- **User Management**: Display logged-in user and logout functionality
- **Responsive Design**: Works on desktop and mobile devices

## Test Cases Implemented

### TC_POS_001: Successful Login
- **Use Case**: Ensure valid users can log in successfully
- **Preconditions**: User has a valid POS account, User is on the Login screen
- **Test Steps**:
  1. Launch POS application
  2. Enter valid username (email)
  3. Enter valid password
  4. Click the 'Login' button
- **Expected Results**: The system authenticates the credentials, User is redirected to the POS Home screen/dashboard

### TC_POS_002: Unsuccessful Login with Invalid Credentials
- **Use Case**: Prevent login with incorrect credentials
- **Preconditions**: User is on the Login screen
- **Test Steps**:
  1. Launch POS application
  2. Enter invalid username or password
  3. Click 'Login'
- **Expected Results**: An error message appears (e.g., 'Invalid email or password'), User remains on the Login screen

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- CRM backend running (for authentication)

### Backend Setup

**No separate POS backend needed!** The POS application uses the live CRM backend directly.

The CRM backend is already hosted live at: `https://crm-n577.onrender.com`

**No local backend setup required!**

### Frontend Setup

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## Usage

1. **Access the application**: Open `http://localhost:5173` in your browser
2. **Login**: You'll be redirected to the login page if not authenticated
3. **Enter credentials**: Use the same email/password as your CRM account
4. **Access POS features**: After successful login, you'll be redirected to the POS dashboard

## Authentication Flow

1. **Login Request**: Frontend sends email/password to live CRM backend `/auth/login`
2. **Backend Validation**: Live CRM backend validates credentials
3. **Token Generation**: JWT token is generated and returned
4. **Storage**: Token is stored in localStorage as `pos_token`
5. **Protected Access**: All POS routes check for valid token
6. **Logout**: Token is removed and user is redirected to login

## Project Structure

```
POS/
├── src/
│   ├── components/
│   │   ├── Login.jsx        # Login page component
│   │   ├── Login.css        # Login page styles
│   │   ├── AuthWrapper.jsx  # Authentication wrapper
│   │   └── Sidebar.jsx      # Updated with logout
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── services/
│   │   └── api.js          # API service (connects to CRM backend)
│   ├── App.jsx             # Main app with routes
│   └── index.jsx           # Entry point with providers
└── package.json            # Node.js dependencies
```

## API Endpoints

The POS application uses the CRM backend endpoints directly:

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /health` - Health check
- `GET /` - Root endpoint

## Security Features

- **JWT Tokens**: Secure authentication tokens
- **Password Hashing**: Bcrypt password hashing
- **CORS Protection**: Configured for development
- **Route Protection**: All POS features require authentication
- **Token Expiration**: Automatic token expiration handling

## Development

### Adding New Features
1. Create new components in `src/components/`
2. Add routes in `App.jsx` (wrap with `ProtectedRoute`)
3. Update navigation in `Sidebar.jsx` if needed

### Styling
- Use CSS modules for component-specific styles
- Follow the existing design system
- Ensure responsive design for mobile devices

### Testing
- Test login with valid credentials
- Test login with invalid credentials
- Test logout functionality
- Test protected route access
- Test token expiration handling

## Troubleshooting

### Common Issues

1. **Backend Connection Error**:
   - Check if live CRM backend is accessible at `https://crm-n577.onrender.com`
   - Verify internet connection
   - Check CORS settings on live backend

2. **Authentication Issues**:
   - Clear browser localStorage
   - Check if CRM user exists in live database
   - Verify email/password format

3. **API Key Issues**:
   - Ensure API key is correct in `api.js`
   - Check if API key is still valid

## License

This project is part of the transit card management system. 