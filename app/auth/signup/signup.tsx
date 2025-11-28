"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { PasswordStrength } from '@/components/auth/PasswordStrength'

export default function SignupPage() {
	const router = useRouter()
	const { signup } = useAuth()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [emailSent, setEmailSent] = useState(false)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((previous) => ({
			...previous,
			[event.target.name]: event.target.value,
		}))
	}

	const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setLoading(true)
		setError('')

		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match')
			setLoading(false)
			return
		}

		try {
			console.log('Starting signup process...')
			await signup({
				email: formData.email,
				password: formData.password,
				displayName: formData.name,
			})
			
			console.log('Signup successful!')
			setEmailSent(true)
		} catch (signupError: any) {
			console.error('Signup error:', signupError)
			setError(signupError.message || 'Failed to create account')
			setLoading(false)
		}
	}

	if (emailSent) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
					<div className="text-center">
						<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
							<svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h2 className="mt-6 text-3xl font-bold text-gray-900">
							Verify your email
						</h2>
						<p className="mt-2 text-sm text-gray-600">
							We&apos;ve sent a verification email to <strong>{formData.email}</strong>.
							Please check your inbox and click the verification link to activate your account.
						</p>
						<button
							onClick={() => router.push('/auth/login')}
							className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
						>
							Go to Login
							<ArrowRight className="ml-2 h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen flex">
			<div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
				<div className="mx-auto w-full max-w-sm lg:w-96">
					<div>
						<Link href="/" className="flex items-center space-x-2 mb-8">
							<Building2 className="h-10 w-10 text-blue-600" />
							<span className="text-2xl font-bold text-gray-900">Properly</span>
						</Link>
						<h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
						<p className="mt-2 text-sm text-gray-600">
							Already have an account?{' '}
							<Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
								Sign in
							</Link>
						</p>
					</div>

					<div className="mt-8">
						<form onSubmit={handleSignup} className="space-y-6">
							{error && (
								<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-start">
									<AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
									<span>{error}</span>
								</div>
							)}

							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
									Full name
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<User className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="name"
										name="name"
										type="text"
										required
										value={formData.name}
										onChange={handleChange}
										className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="John Doe"
										autoComplete="name"
									/>
								</div>
							</div>

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
										value={formData.email}
										onChange={handleChange}
										className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="you@example.com"
										autoComplete="email"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="password"
										name="password"
										type="password"
										required
										value={formData.password}
										onChange={handleChange}
										className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="••••••••"
										autoComplete="new-password"
									/>
								</div>
								{formData.password && (
									<div className="mt-2">
										<PasswordStrength password={formData.password} />
									</div>
								)}
							</div>

							<div>
								<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
									Confirm password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										required
										value={formData.confirmPassword}
										onChange={handleChange}
										className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="••••••••"
										autoComplete="new-password"
									/>
								</div>
								{formData.confirmPassword && formData.password !== formData.confirmPassword && (
									<p className="mt-1 text-xs text-red-600">Passwords do not match</p>
								)}
							</div>

							<button
								type="submit"
								disabled={loading}
								className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{loading ? 'Creating account...' : 'Create account'}
								{!loading && <ArrowRight className="ml-2 h-4 w-4" />}
							</button>

							<p className="text-xs text-gray-500 text-center">
								By signing up, you agree to our Terms of Service and Privacy Policy
							</p>
						</form>
					</div>
				</div>
			</div>

			<div className="hidden lg:block relative flex-1">
				<div className="absolute inset-0 bg-gradient-to-br from-green-600 via-teal-600 to-cyan-700">
					<div className="absolute inset-0 bg-black opacity-20"></div>
					<div className="relative h-full flex flex-col justify-center px-12 text-white">
						<h2 className="text-4xl font-bold mb-6">Start managing smarter today</h2>
						<p className="text-xl text-green-100 mb-8">
							Free for your first 3 properties. No credit card required.
						</p>
						<div className="space-y-4">
							{[
								'Set up in minutes',
								'No long-term contracts',
								'Cancel anytime',
								'24/7 customer support',
							].map((feature) => (
								<div key={feature} className="flex items-center space-x-3">
									<div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
										<svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<span className="text-lg">{feature}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
