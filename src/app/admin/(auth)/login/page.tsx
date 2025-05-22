"use client"
import { ReloadIcon } from '@radix-ui/react-icons';
import { Eye, EyeClosed, Lock, LogIn, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    });

    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then((data: { token: string | null }) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    router.push('/admin');
                } else {
                    toast('Invalid credentials');
                }
            }).finally(() => {
                setLoading(false);
                setFormData({
                    username: '',
                    password: '',
                })
            })
    };

    return (
        <div className="bg-darkgreen-50 flex items-center justify-center p-4 w-full h-screen">
            <div className="relative max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header section */}
                <div className="bg-darkgreen-600 py-6 px-8 text-center">
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                </div>

                {/* Form section */}
                <div className="p-8">
                    <form id="loginForm" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-darkgreen-800 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="text-darkgreen-400 w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    required
                                    className="pl-10 w-full px-4 py-3 rounded-lg border border-darkgreen-200 focus:outline-none input-focus transition-all"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-darkgreen-800 mb-1">Password</label>
                            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-darkgreen-200 focus:outline-none input-focus transition-all">
                                <div className="flex items-center pointer-events-none">
                                    <Lock className="text-darkgreen-400 w-4 h-4" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    className="w-full flex-1 border-none focus:outline-none placeholder:text-darkgreen-400"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="flex items-center text-darkgreen-400 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <EyeClosed className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-darkgreen-600 hover:bg-darkgreen-700 text-white cursor-pointer">
                            {loading ? "Signing In..." : "Sign In"}
                            {loading ? <ReloadIcon className="animate-spin w-4 h-4 mr-2" /> : <LogIn className="w-4 h-4" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;