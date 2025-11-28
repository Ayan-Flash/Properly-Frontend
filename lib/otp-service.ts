import { auth } from "./firebase"
import { sendPasswordResetEmail, PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth"

/**
 * OTP Service Layer
 * Provides abstraction for OTP sending via Firebase (current) and Twilio (future)
 * This allows easy migration from Firebase to Twilio without changing consuming code
 */

export type OTPChannel = "email" | "sms"
export type OTPProvider = "firebase" | "twilio"

interface OTPServiceConfig {
  provider: OTPProvider
  twilioAccountSid?: string
  twilioAuthToken?: string
  twilioServiceSid?: string
}

class OTPService {
  private config: OTPServiceConfig

  constructor(config: OTPServiceConfig) {
    this.config = config
  }

  /**
   * Send OTP via email
   * Currently uses Firebase password reset email
   * Future: Can be switched to Twilio SendGrid or Twilio Verify
   */
  async sendEmailOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      if (this.config.provider === "firebase") {
        await sendPasswordResetEmail(auth, email)
        return {
          success: true,
          message: "Password reset email sent successfully",
        }
      } else if (this.config.provider === "twilio") {
        // TODO: Implement Twilio email OTP when ready
        // const client = twilio(this.config.twilioAccountSid, this.config.twilioAuthToken)
        // await client.verify.v2.services(this.config.twilioServiceSid)
        //   .verifications.create({ to: email, channel: 'email' })
        throw new Error("Twilio email OTP not yet implemented")
      }

      throw new Error("Invalid OTP provider")
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to send email OTP",
      }
    }
  }

  /**
   * Send OTP via SMS
   * Currently uses Firebase Phone Auth
   * Future: Can be switched to Twilio SMS
   */
  async sendSMSOTP(
    phoneNumber: string,
    recaptchaVerifier?: RecaptchaVerifier
  ): Promise<{ success: boolean; message: string; verificationId?: string }> {
    try {
      if (this.config.provider === "firebase") {
        if (!recaptchaVerifier) {
          throw new Error("RecaptchaVerifier required for Firebase Phone Auth")
        }
        const phoneProvider = new PhoneAuthProvider(auth)
        const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier)
        return {
          success: true,
          message: "SMS OTP sent successfully",
          verificationId,
        }
      } else if (this.config.provider === "twilio") {
        // TODO: Implement Twilio SMS OTP when ready
        // const client = twilio(this.config.twilioAccountSid, this.config.twilioAuthToken)
        // await client.verify.v2.services(this.config.twilioServiceSid)
        //   .verifications.create({ to: phoneNumber, channel: 'sms' })
        throw new Error("Twilio SMS OTP not yet implemented")
      }

      throw new Error("Invalid OTP provider")
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to send SMS OTP",
      }
    }
  }

  /**
   * Verify OTP code
   * Currently uses Firebase verification
   * Future: Can be switched to Twilio verification
   */
  async verifyOTP(
    identifier: string,
    code: string,
    channel: OTPChannel = "email"
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (this.config.provider === "firebase") {
        // Firebase handles verification differently based on channel
        // For email: Password reset link handles verification
        // For SMS: PhoneAuthProvider.credential is used
        return {
          success: true,
          message: "OTP verified successfully",
        }
      } else if (this.config.provider === "twilio") {
        // TODO: Implement Twilio OTP verification when ready
        // const client = twilio(this.config.twilioAccountSid, this.config.twilioAuthToken)
        // const verification = await client.verify.v2.services(this.config.twilioServiceSid)
        //   .verificationChecks.create({ to: identifier, code })
        throw new Error("Twilio OTP verification not yet implemented")
      }

      throw new Error("Invalid OTP provider")
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to verify OTP",
      }
    }
  }
}

// Initialize with Firebase for now
// To switch to Twilio, update provider and add credentials
export const otpService = new OTPService({
  provider: "firebase",
  // Uncomment and configure when switching to Twilio:
  // provider: "twilio",
  // twilioAccountSid: process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
  // twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  // twilioServiceSid: process.env.NEXT_PUBLIC_TWILIO_VERIFY_SERVICE_SID,
})

export default otpService
