'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, ArrowRight, Check, Shield } from 'lucide-react'
import { RecaptchaVerifier } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/hooks/use-auth'

// Extend Window interface for RecaptchaVerifier
declare global {
	interface Window {
		recaptchaVerifier?: RecaptchaVerifier
	}
}

export default function TwoFactorPage() {
	const router = useRouter()
	useAuth()
	const [code, setCode] = useState(['', '', '', '', '', ''])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')


	useEffect(() => {
		// Initialize reCAPTCHA verifier for phone auth
		if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
				size: 'invisible',
			})
		}
	}, [])

	const handleChange = (index: number, value: string) => {
		if (value.length > 1) return

		const newCode = [...code]
		newCode[index] = value
		setCode(newCode)

		// Auto-focus next input
		if (value && index < 5) {
			const nextInput = document.getElementById(`code-${index + 1}`)
			nextInput?.focus()
		}
	}

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !code[index] && index > 0) {
			const prevInput = document.getElementById(`code-${index - 1}`)
			prevInput?.focus()
		}
	}



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		const verificationCode = code.join('')

		if (verificationCode.length !== 6) {
			setError('Please enter the complete 6-digit code')
			setLoading(false)
			return
		}

		try {
			// Verify existing MFA
			// This would be used during login after initial auth
			router.push('/dashboard')
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Verification failed'
			setError(message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
				<div className="absolute top-20 right-20 text-purple-200">
					<p className="text-6xl font-light leading-relaxed">
						Secure<br />
						your<br />
						account<br />
						with<br />
						two-factor<br />
						authentication
					</p>
				</div>
				<div className="absolute top-1/4 right-32">
					<div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
						<Shield className="w-6 h-6 text-white" />
					</div>
				</div>
				<div className="absolute top-1/2 right-20">
					<div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
						<Check className="w-6 h-6 text-white" />
					</div>
				</div>
				<div className="absolute bottom-1/4 right-40">
					<div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
						<Shield className="w-6 h-6 text-white" />
					</div>
				</div>
			</div>

			<div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
				<Link href="/" className="flex items-center justify-center space-x-2 mb-8">
					<Building2 className="h-10 w-10 text-blue-600" />
					<span className="text-2xl font-bold text-gray-900">Properly</span>
				</Link>
				<div className="text-center">
					<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
						<Shield className="h-6 w-6 text-purple-600" />
					</div>
					<h2 className="text-3xl font-bold text-gray-900">Two-Factor Authentication</h2>
					<p className="mt-2 text-sm text-gray-600">
						Enter the 6-digit verification code from your authenticator app
					</p>
				</div>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
				<div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
					{/* reCAPTCHA container */}
					<div id="recaptcha-container"></div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
								{error}
							</div>
						)}

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-4 text-center">
								Verification Code
							</label>
							<div className="flex gap-2 justify-center">
								{code.map((digit, index) => (
									<input
										key={index}
										id={`code-${index}`}
										type="text"
										maxLength={1}
										value={digit}
										onChange={(e) => handleChange(index, e.target.value)}
										onKeyDown={(e) => handleKeyDown(index, e)}
										className="w-12 h-14 text-center text-2xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										required
									/>
								))}
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{loading ? 'Verifying...' : 'Verify'}
							{!loading && <ArrowRight className="ml-2 h-4 w-4" />}
						</button>

						<div className="text-center space-y-2">
							<p className="text-sm text-gray-600">
								Didn&apos;t receive a code?{' '}
								<button
									type="button"
									className="font-medium text-blue-600 hover:text-blue-500"
									onClick={() => {
										// Resend code logic
										alert('Code resent!')
									}}
								>
									Resend
								</button>
							</p>
							<Link href="/auth/login" className="block text-sm font-medium text-blue-600 hover:text-blue-500">
								Back to login
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
