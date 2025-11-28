'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Mail, ArrowRight, Check, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function ForgotPasswordPage() {
	const router = useRouter()
	const { resetPassword } = useAuth()
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [error, setError] = useState('')

	async function onSubmit(event: React.FormEvent) {
		event.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			await resetPassword({ email })
			setIsSubmitted(true)
		} catch (resetError: any) {
			setError(resetError.message || 'Failed to send reset email')
		} finally {
			setIsLoading(false)
		}
	}

	if (isSubmitted) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
				{/* Background decorative elements */}
				<div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
					<div className="absolute top-1/4 right-32">
						<div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
							<Check className="w-6 h-6 text-white" />
						</div>
					</div>
					<div className="absolute top-1/2 right-20">
						<div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
							<Check className="w-6 h-6 text-white" />
						</div>
					</div>
				</div>

				<div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
					<Link href="/" className="flex items-center justify-center space-x-2 mb-8">
						<Building2 className="h-10 w-10 text-blue-600" />
						<span className="text-2xl font-bold text-gray-900">Properly</span>
					</Link>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
					<div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
						<div className="text-center">
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
								<CheckCircle2 className="h-8 w-8 text-green-600" />
							</div>
							<h2 className="mt-4 text-2xl font-bold text-gray-900">Check your email</h2>
							<p className="mt-2 text-sm text-gray-600">
								We&apos;ve sent a password reset link to <strong>{email}</strong>
							</p>
							<button
								onClick={() => router.push('/auth/login')}
								className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
							>
								Back to Login
								<ArrowRight className="ml-2 h-4 w-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
				<div className="absolute top-20 right-20 text-blue-200">
					<p className="text-6xl font-light leading-relaxed">
						Reset<br />
						your<br />
						password<br />
						securely
					</p>
				</div>
				<div className="absolute top-1/4 right-32">
					<div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">
						<Check className="w-6 h-6 text-white" />
					</div>
				</div>
				<div className="absolute bottom-1/4 right-40">
					<div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">
						<Check className="w-6 h-6 text-white" />
					</div>
				</div>
			</div>

			<div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
				<Link href="/" className="flex items-center justify-center space-x-2 mb-8">
					<Building2 className="h-10 w-10 text-blue-600" />
					<span className="text-2xl font-bold text-gray-900">Properly</span>
				</Link>
				<h2 className="text-center text-3xl font-bold text-gray-900">Reset your password</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Enter your email address and we&apos;ll send you a link to reset your password.
				</p>
			</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
					<div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
						<form className="space-y-6" onSubmit={onSubmit}>
							{error && (
								<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
									{error}
								</div>
							)}

							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
									Email address
								</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									name="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="you@example.com"
									autoComplete="email"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{isLoading ? 'Sending...' : 'Send reset link'}
							{!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
						</button>
					</form>

					<div className="mt-6 text-center">
						<Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
							Back to login
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
