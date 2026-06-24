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
    imageLink: string;
    pdfLink: string;
  },
  firestoreCollection: string
) {
  console.log("guideId",data.guideID);
  const guideRef = data.guideID
    ? admin.firestore().collection(firestoreCollection).doc(data.guideID)
    : admin.firestore().collection(firestoreCollection).doc();
  const guideID = guideRef.id;
  console.log("Guide ID is now:", guideID);
  try {
    const guide: guideModel = {
      guideID,
      postTitle: data.postTitle,
      postSummary: data.postSummary,
      imageLink: data.imageLink,
      pdfLink: data.pdfLink,
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