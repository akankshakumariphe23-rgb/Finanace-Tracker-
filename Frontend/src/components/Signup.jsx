import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function SignUp() {
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const formData = new URLSearchParams();
        formData.append('fullName', form.fullName);
        formData.append('username', form.username);
        formData.append('password', form.password);
        formData.append('confirmPassword', form.confirmPassword);
        formData.append('gender', form.gender);

        try {
            const res = await fetch('http://localhost:8001/user/Signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            alert('Signup successful!');
            navigate('/Login');
        } catch (err) {
            console.error('Signup error:', err.message);
            alert('Error: ' + err.message);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Left Side */}
            <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center text-white p-6" style={{ backgroundColor: '#1e3a8a' }}>
                <h1 className="text-4xl font-bold">Connectify</h1>
                <p className="text-lg mt-2">Chat. Connect. Collaborate.</p>
                <img src="https://via.placeholder.com/250" alt="illustration" className="mt-6" />
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <h3 className="text-2xl font-semibold mb-4">Get Started Now</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

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

                        <div>
                            <label className="block text-sm font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Gender</label>
                            <select
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition-colors">
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/Login" className="text-blue-900 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;