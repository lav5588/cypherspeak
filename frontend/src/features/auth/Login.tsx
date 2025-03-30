import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { setUser } from '@/redux-toolkit/slices/authSlice';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await loginUser(formData);
            console.log('Login success:', res);
            dispatch(setUser(res));
            navigate('/chats');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                <h2 className="text-2xl font-semibold text-center">Login</h2>

                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Login
                </Button>
                <p className="text-sm text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="underline">
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
