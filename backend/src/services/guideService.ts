import type { guideModel } from '../models/guideModel.js'
import { guideAssetPath, uploadPDF, uploadImage } from './storageService.js';
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
      imageLink: imageLink?.startsWith('http') ? imageLink : `/api/guides/${guideID}/image`,
      pdfLink: pdfLink?.startsWith('http') ? pdfLink : `/api/guides/${guideID}/pdf`,
    };

    await guideRef.set(guide);

    return guide;

  } catch (e) {
    console.error("Guide creation failed:", e);
    throw e;
  }
}