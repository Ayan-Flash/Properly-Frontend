import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth, Auth, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getFirestore, Firestore } from "firebase/firestore"

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate configuration (soft validation to avoid hard crash in production)
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('[firebase] Missing critical config (apiKey/projectId). Check .env.local')
}

// Temporary debug log (remove when stable)
if (typeof window !== 'undefined') {
  // Only log minimal safe values client-side
  console.log('[firebase] Init config summary', {
    hasApiKey: !!firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
  })
}

// Initialize Firebase
let app: FirebaseApp
let auth: Auth
let db: Firestore

// Initialize Firebase (runs on both client and server)
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

auth = getAuth(app)
db = getFirestore(app)

// Set persistence only on client side
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Failed to set auth persistence:", error)
  })
}

export { auth, db }
export default app
