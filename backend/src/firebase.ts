import admin from 'firebase-admin';

const PROJECT_ID = process.env.GCLOUD_PROJECT || 'bp-furever';

const useEmulator =
  process.env.USE_FIRESTORE_EMULATOR === 'true' ||
  process.env.FIRESTORE_EMULATOR_HOST != null ||
  (!process.env.VERCEL &&
    !process.env.FIREBASE_SERVICE_ACCOUNT &&
    process.env.NODE_ENV !== 'production');

if (!admin.apps.length) {
  if (useEmulator) {
    process.env.GOOGLE_CLOUD_PROJECT = PROJECT_ID;
    process.env.FIRESTORE_EMULATOR_HOST ??= '127.0.0.1:3005';
    process.env.FIREBASE_AUTH_EMULATOR_HOST ??= '127.0.0.1:9099';
    process.env.FIREBASE_STORAGE_EMULATOR_HOST ??= '127.0.0.1:9199';

    admin.initializeApp({
      projectId: PROJECT_ID,
      storageBucket: `${PROJECT_ID}.appspot.com`,
    });
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      ),
      projectId: PROJECT_ID,
      storageBucket: `${PROJECT_ID}.appspot.com`,
    });
  } else {
    admin.initializeApp({
      projectId: PROJECT_ID,
      storageBucket: `${PROJECT_ID}.appspot.com`,
    });
  }
}

export const bucket = admin.storage().bucket();
export const db = admin.firestore();
export default admin;
