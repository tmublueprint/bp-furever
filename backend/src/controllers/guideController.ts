import { Request, Response } from "express";
import { createGuide, deleteGuide, getGuide } from "../services/guideService.js";
import type { guideModel } from "../models/guideModel.js";
import admin, { bucket } from "../firebase.js";


const FIRESTORE_COLLECTION = "guides";

function normalizeGuideLinks(data: Record<string, any>) {
    const guideID = data.guideID as string | undefined;

    if (!guideID) {
        return data;
    }

    const shouldRewrite = (value: unknown) => {
        if (typeof value !== 'string' || !value) {
            return true;
        }

        return value.includes('storage.googleapis.com') || value.includes('firebasestorage.googleapis.com');
    };

    const imageLink = shouldRewrite(data.imageLink)
        ? `/api/guides/${guideID}/image`
        : data.imageLink;

    const pdfLink = shouldRewrite(data.pdfLink)
        ? `/api/guides/${guideID}/pdf`
        : data.pdfLink;

    return {
        ...data,
        imageLink,
        pdfLink,
    };
}

// GET all guides
export async function getAllGuidesController(req: Request, res: Response) {
    console.log("Fetching all guides...");
    try {
    const snapshot = await admin.firestore().collection(FIRESTORE_COLLECTION).get();

        const guides = snapshot.docs.map(doc => normalizeGuideLinks(doc.data()));

    return res.status(200).json(guides);

  } catch (e) {
    console.error("Failed to fetch guides:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// GET guide by ID
export async function getGuideController(req: Request, res: Response) {
    console.log("Fetching guide with ID:", req.params.guideID);
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

        return res.status(200).json(normalizeGuideLinks(guide as Record<string, any>));

    } catch (e) {
        console.error("Get guide failed:", e);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
}

// CREATE new guide
export async function createGuideController(req: Request, res: Response) {
    console.log("Creating/updating guide with data");
    console.log("Creating/updating guide with data");
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Files:", req.files);
    console.log("Body:", req.body);
    try {
        const { image, pdf } = req.files as {
            image?: Express.Multer.File[];
            pdf?: Express.Multer.File[];
        };

        const imageFile = image?.[0];
        const pdfFile = pdf?.[0];

        const { postTitle, postSummary } = req.body;

        // Allow either uploaded files or existing links provided in the body
        const imageLink = req.body.imageLink as string | undefined;
        const pdfLink = req.body.pdfLink as string | undefined;

        if (!imageFile && !imageLink) {
            return res.status(400).json({ error: 'Image file or imageLink is required' });
        }

        if (!pdfFile && !pdfLink) {
            return res.status(400).json({ error: 'PDF file or pdfLink is required' });
        }

        const guide: guideModel = await createGuide({
            postTitle,
            postSummary,
            imageFile,
            pdfFile,
            imageLink,
            pdfLink,
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

export async function deleteGuideController(req: Request, res: Response) {
    console.log("Deleting guide with ID:", req.params.guideID);
    try {
        const { guideID } = req.params;

        if (!guideID) {
            return res.status(400).json({ error: 'guideID required' });
        }

        await deleteGuide(guideID, FIRESTORE_COLLECTION);

        return res.status(200).json({ message: 'Guide deleted successfully' });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Internal server error';

        if (message.startsWith('Guide not found')) {
            return res.status(404).json({ error: message });
        }

        console.error('Delete guide failed:', e);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function sendGuideAsset(req: Request, res: Response, assetType: 'image' | 'pdf') {
    console.log(`Sending guide ${assetType} for guide ID:`, req.params.guideID);
    try {
        const { guideID } = req.params;

        if (!guideID) {
            return res.status(400).json({ error: 'guideID required' });
        }

        const filePath = `guides/${guideID}/${assetType}`;
        const fileRef = bucket.file(filePath);
        const [exists] = await fileRef.exists();

        if (!exists) {
            return res.status(404).json({ error: `${assetType} not found` });
        }

        const [metadata] = await fileRef.getMetadata();
        const [fileBuffer] = await fileRef.download();

        if (metadata.contentType) {
            res.setHeader('Content-Type', metadata.contentType);
        }

        res.setHeader('Content-Length', fileBuffer.length);
        return res.status(200).send(fileBuffer);
    } catch (e) {
        console.error(`Failed to send guide ${assetType}:`, e);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getGuideImageController(req: Request, res: Response) {
    return sendGuideAsset(req, res, 'image');
}

export async function getGuidePdfController(req: Request, res: Response) {
    return sendGuideAsset(req, res, 'pdf');
}