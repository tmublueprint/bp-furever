import admin from 'firebase-admin';

if (!admin.apps.length) {
  if (process.env.USE_FIRESTORE_EMULATOR === 'true') {
    // Docker compose already sets FIRESTORE_EMULATOR_HOST and FIREBASE_AUTH_EMULATOR_HOST.
    // firebase-admin reads those env vars automatically.
    admin.initializeApp({ 
      projectId: process.env.GCLOUD_PROJECT || 'tmublueprint-furever',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "tmublueprint-furever.firebasestorage.app",
    } as any);
  } else {
    admin.initializeApp({
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "tmublueprint-furever.firebasestorage.app",
    }); // uses Application Default Credentials in Cloud Functions
  }
}

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
export const auth = admin.auth();
export default admin;
