import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  databaseURL: import.meta.env.VITE_databaseURL,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
}


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(app);

const authEmulatorHost = import.meta.env.VITE_AUTH_EMULATOR_HOST;
if (import.meta.env.DEV && authEmulatorHost) {
  connectAuthEmulator(auth, authEmulatorHost);
}

export async function uploadFile(file: File, path: string) {
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);
  return url;
}

