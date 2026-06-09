import type { guideModel } from '../models/guideModel.js'
import { deleteGuideAsset, guideAssetPath, uploadPDF, uploadImage } from './storageService.js';
import admin from '../firebase.js'

export async function getGuide(guideID: string, firebaseCollection: string) {
    try {
        const doc = await admin.firestore().collection(firebaseCollection).doc(guideID).get();
        
        if (!doc.exists) {
            throw new Error(`Guide not found: ${guideID}`);
        }

        return doc.data();

    } catch (e){
        console.log(e);
    }
}

export async function createGuide(
  data: {
    guideID?: string;
    postTitle: string;
    postSummary: string;
    imageFile?: Express.Multer.File;
    pdfFile?: Express.Multer.File;
    imageLink?: string;
    pdfLink?: string;
  },
  firestoreCollection: string
) {
  const guideRef = data.guideID
    ? admin.firestore().collection(firestoreCollection).doc(data.guideID)
    : admin.firestore().collection(firestoreCollection).doc();
  const guideID = guideRef.id;

  const shouldUseBackendRoute = (link?: string) => {
    if (!link) {
      return false;
    }

    return link.includes('storage.googleapis.com') || link.includes('firebasestorage.googleapis.com');
  };

  try {
    const imageLink = data.imageFile
      ? await uploadImage(data.imageFile, guideAssetPath(guideID, 'image'))
      : data.imageLink?.trim();

    const pdfLink = data.pdfFile
      ? await uploadPDF(data.pdfFile, guideAssetPath(guideID, 'pdf'))
      : data.pdfLink?.trim();

    if (!imageLink) {
      throw new Error('Image is required');
    }

    if (!pdfLink) {
      throw new Error('PDF link or file is required');
    }

    const guide: guideModel = {
      guideID,
      postTitle: data.postTitle,
      postSummary: data.postSummary,
      imageLink: data.imageFile || shouldUseBackendRoute(imageLink)
        ? `/api/guides/${guideID}/image`
        : imageLink ?? `/api/guides/${guideID}/image`,
      pdfLink: data.pdfFile || shouldUseBackendRoute(pdfLink)
        ? `/api/guides/${guideID}/pdf`
        : pdfLink ?? `/api/guides/${guideID}/pdf`,
    };

    await guideRef.set(guide);

    return guide;

  } catch (e) {
    console.error("Guide creation failed:", e);
    throw e;
  }
}

export async function deleteGuide(guideID: string, firestoreCollection: string) {
  const guideRef = admin.firestore().collection(firestoreCollection).doc(guideID);
  const doc = await guideRef.get();

  if (!doc.exists) {
    throw new Error(`Guide not found: ${guideID}`);
  }

  await Promise.all([
    deleteGuideAsset(guideAssetPath(guideID, 'image')),
    deleteGuideAsset(guideAssetPath(guideID, 'pdf')),
    guideRef.delete(),
  ]);
}