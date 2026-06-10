import admin from 'firebase-admin';

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? 'bp-furever';
const STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET ?? `${PROJECT_ID}.appspot.com`;
const EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:3005';
const AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST ?? '127.0.0.1:9099';
const CLOUD_STORAGE_HOST = process.env.FIREBASE_STORAGE_EMULATOR_HOST ?? '127.0.0.1:9199';


// emulator, not live firebase services
if (!admin.apps.length) {
  process.env.GOOGLE_CLOUD_PROJECT = PROJECT_ID;
  process.env.FIRESTORE_EMULATOR_HOST = EMULATOR_HOST;
  process.env.FIREBASE_AUTH_EMULATOR_HOST = AUTH_EMULATOR_HOST;
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = CLOUD_STORAGE_HOST;

  admin.initializeApp({
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
  } as any);
}

export const bucket = admin.storage().bucket();
export const db = admin.firestore();
export default admin