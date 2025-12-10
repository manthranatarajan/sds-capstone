import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import logo from '../assets/sdss.png';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            const success = login(username, password);
            if (success) {
                navigate('/');
            } else {
                setError('Invalid username or password');
            }
            setIsLoading(false);
        }, 500);
    };

    const handleDemoLogin = (demoUsername: string) => {
        setUsername(demoUsername);
        setPassword('password123');
        setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img src={logo} alt="Logo" className="w-16 h-16 rounded-lg" />
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">QC-Lite</h1>
                <p className="text-center text-gray-500 mb-8">Issue tracking made simple</p>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter your username"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter your password"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center mb-4">Demo credentials:</p>
                    <div className="space-y-2">
                        {['alice', 'bob', 'charlie'].map((user) => (
                            <button
                                key={user}
                                onClick={() => handleDemoLogin(user)}
                                className="w-full px-4 py-2 text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
                                type="button"
                            >
                                Login as {user}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-3">Password: password123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
