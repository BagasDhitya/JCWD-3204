'use client'
import { useState } from "react"
import { useLogin } from "@/utils/useLogin"
import { toast, Toaster } from "sonner"
import { getAuthCookie } from "@/lib/cookies"

function Login() {

    const { login } = useLogin()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const result = await login(email, password)
        const authorize = getAuthCookie()
        if (result.success) {
            toast.success(result.message as string)
            if (authorize.role === 'EMPLOYEE') {
                window.location.href = '/employees/attendance'
            } else {
                window.location.href = '/employees/dashboard'
            }
        } else {
            toast.error(typeof result.message === 'string' ? result.message : JSON.stringify(result.message))
        }
    }

    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-100">
            <Toaster
                richColors
                position="top-center"
            />
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login