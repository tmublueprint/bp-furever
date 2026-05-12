import { Request, Response } from "express";
import { createGuide, getGuide } from "../services/guideService";
import { guideModel } from "../models/guideModel";
import admin from "../firebase";


const FIRESTORE_COLLECTION = "guides";

// GET all guides
export async function getAllGuidesController(req: Request, res: Response) {
  try {
    const snapshot = await admin.firestore().collection(FIRESTORE_COLLECTION).get();

    const guides = snapshot.docs.map(doc => {
      const data = doc.data();

      return {
        guideID: data.guideID,
        postTitle: data.postTitle,
        postSummary: data.postSummary,
        imageLink: data.imageLink,
        pdfLink: data.pdfLink
      };
    });

    return res.status(200).json(guides);

  } catch (e) {
    console.error("Failed to fetch guides:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// GET guide by ID
export async function getGuideController(req: Request, res: Response) {
    try {
        const { guideID } = req.params;

        if (!guideID) {
            return res.status(400).json({
                error: "guideID required",
            });
        }

        const guide = await getGuide(guideID, FIRESTORE_COLLECTION);

        if (!guide) {
            return res.status(404).json({
                error: "Guide not found",
            });
        }

        return res.status(200).json(guide);

    } catch (e) {
        console.error("Get guide failed:", e);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
}

// CREATE new guide
export async function createGuideController(req: Request, res: Response) {
    try {
        const { image, pdf } = req.files as {
            image?: Express.Multer.File[];
            pdf?: Express.Multer.File[];
        };

        const imageFile = image?.[0];
        const pdfFile = pdf?.[0];

        const { postTitle, postSummary } = req.body;

        if (!imageFile || !pdfFile) {
            return res.status(400).json({
                error: "Image and PDF are required",
            });
        }

        const guide: guideModel = await createGuide({
            postTitle,
            postSummary,
            imageFile,
            pdfFile,
        }, FIRESTORE_COLLECTION);

        return res.status(201).json({
            message: "Guide created successfully",
            guide,
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
}