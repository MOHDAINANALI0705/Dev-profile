'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export default function SignupPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!username.trim()) {
            setError('Please enter a username')
            return
        }

        const trimmedEmail = email.trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(trimmedEmail)) {
            setError('Please enter a valid email address')
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            await axios.post('/api/users/signup', {
                username: username.trim(),
                email: trimmedEmail,
                password
            })

            toast.success('Signup successful!')
            router.push('/login')
        } catch (err) {
            const errorMessage = axios.isAxiosError(err) 
                ? err.response?.data?.message || err.message 
                : 'An error occurred'
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
                Already have an account?{' '}
                <button onClick={() => router.push('/login')} className="text-blue-500 hover:underline font-semibold">
                    Login
                </button>
            </p>
        </div>
    </div>
    );
}
