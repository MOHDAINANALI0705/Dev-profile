'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const user={
                email,
                password
            }
            const response=await axios.post('/api/users/login',user);
            console.log(response.data)
            toast.success('Logged in successfully')
            router.push('/profile')
        } catch (err : any) {
                 const errorMessage = err.response?.data?.message || err.message   
                           setError(errorMessage)
                           toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-md h-[85vh] p-8 rounded-lg shadow-md flex flex-col justify-around">
                <h1 className="text-2xl font-bold mb-2 text-center">Login</h1>

                <form onSubmit={handleLogin} className="flex flex-col justify-around h-[70%]">
                    {Error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {Error}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}
