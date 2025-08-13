import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';
import { axios } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const toast = useToast();
  const { login } = useAuth();

  // Custom colors and styles
  const boxBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const inputBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Clear error when user starts typing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (loginError) setLoginError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (loginError) setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setLoginError('');
    
    // Basic form validation
    if (!email.trim()) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (!password.trim()) {
      toast({
        title: 'Password required',
        description: 'Please enter your password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await axios.post('/auth/login', { email, password });
      const data = response.data;
      if (!response.status || response.status >= 400) {
        throw new Error(data.detail || 'Login failed');
      }
      login(data.access_token, data.user_name);
      toast({
        title: 'Login successful',
        description: `Welcome back, ${data.user_name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Handle specific error cases
      let errorMessage = 'An error occurred during login';
      
      if (error.response?.status === 401) {
        // Extract the specific error message from the backend
        errorMessage = error.response.data?.detail || 'Incorrect email or password';
        // Clear password field for security
        setPassword('');
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Set the error state
      setLoginError(errorMessage);
      
      toast({
        title: 'Login failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      w="100%"
      position="fixed"
      top="0"
      left="0"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Container maxW="md" mx="auto" px={4}>
        <Box
          bg={boxBg}
          p={{ base: 8, md: 10 }}
          rounded="xl"
          boxShadow="lg"
          border="1px solid"
          borderColor={borderColor}
        >
          <VStack spacing={8} align="stretch">
            <VStack spacing={3}>
              <Heading
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="bold"
                textAlign="center"
                color={textColor}
              >
                POS System Login
              </Heading>
              <Text
                color={textColor}
                fontSize="lg"
                textAlign="center"
                opacity={0.8}
              >
                Sign in to access the Point of Sale system
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel color={textColor}>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    size="lg"
                    bg={inputBg}
                    borderColor={borderColor}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color={textColor}>Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      bg={inputBg}
                      borderColor={borderColor}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {/* Error message display */}
                {loginError && (
                  <Box
                    bg="red.50"
                    border="1px solid"
                    borderColor="red.200"
                    borderRadius="md"
                    p={3}
                    color="red.700"
                    fontSize="sm"
                  >
                    {loginError}
                  </Box>
                )}

                <Button
                  type="submit"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                  width="full"
                  colorScheme="blue"
                >
                  LOGIN
                </Button>
              </VStack>
            </form>

            <Text color={textColor} textAlign="center" fontSize="md">
              Don't have an account?{' '}
              <Link to="/signup">
                <Text
                  as="span"
                  display="inline"
                  color="blue.500"
                  fontWeight="semibold"
                  _hover={{
                    textDecoration: 'underline',
                  }}
                >
                  Sign up
                </Text>
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login; 
