import React, { useState, useContext } from 'react';
import { Container, Box, Button, FormControl, FormLabel, Input, VStack, Heading, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {login} from '../api/authApi';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login: loginUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data } = await login({username, password})
            loginUser(data.token);
            console.log(data)
            setSuccess('Login successful!');
            setTimeout(()=>{
                navigate("/")
            },1000)
            setError('');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            setSuccess('')
        }
    };

    return (
        <Container maxW="lg"  minW="100%" centerContent>
            <Box width={["100%","md"]} p={5} maxW="lg" borderRadius="30px" boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px;' mx="auto">
                <Heading mb={4}>Login</Heading>
                {error && <Alert status="error"><AlertIcon />{error}</Alert>}
                {success && <Alert status="success"><AlertIcon />{success}</Alert>}
                {error && <Alert status="error"><AlertIcon />{error}</Alert>}
                <VStack spacing={4} align="stretch">
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Text mt={4} textAlign="center" bg='white'>
                        Don't have an account?{' '}
                        <Link to="/signup">
                            <Text as="u" color="blue.500">
                                Sign Up
                            </Text>
                        </Link>
                    </Text>
                    <Button colorScheme="blue" onClick={handleSubmit}>Login</Button>
                </VStack>
            </Box>
        </Container>
    );
};

export default LoginForm;