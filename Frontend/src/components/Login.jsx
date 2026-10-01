import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append('username', form.username);
        formData.append('password', form.password);

        try {
            const res = await fetch('http://localhost:8001/user/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log("Logged in user:", data.user);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert('Login successful!');
            navigate('/Dashboard/Overview');
        } catch (err) {
            console.error('Login error:', err.message);
            alert('Error: ' + err.message);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Left Side */}
            <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center text-white px-6 py-6" style={{ backgroundColor: '#1e3a8a' }}>
                <h1 className="text-4xl font-bold">Connectify</h1>
                <p className="text-lg mt-2">Chat. Connect. Collaborate.</p>
                <img src="https://via.placeholder.com/250" alt="illustration" className="mt-6" />
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <h3 className="text-2xl font-semibold mb-4">Welcome Back</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition-colors">
                            Login
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        Don’t have an account?{' '}
                        <Link to="/Signup" className="text-blue-900 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
