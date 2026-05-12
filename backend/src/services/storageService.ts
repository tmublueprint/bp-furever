import { bucket } from '../firebase'

// wrappers for generic file upload func
export function uploadImage(  
  file: Express.Multer.File,
  destinationPath: string
) {
  return uploadFile(file, destinationPath, file.mimetype);
}

export function uploadPDF(  
  file: Express.Multer.File,
  destinationPath: string
) {
  return uploadFile(file, destinationPath, "application/pdf");
}

async function uploadFile(
  file: Express.Multer.File,
  destinationPath: string,
  fileType: string
): Promise<string> {
  try {
    const fileRef = bucket.file(destinationPath);

    await fileRef.save(file.buffer, {
      metadata: {
        contentType: fileType,
      },
    });

    await fileRef.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destinationPath}`;

    console.log("Uploaded PDF to:", publicUrl);
    return publicUrl;

  } catch (e) {
    console.error("Storage upload failed:", e);
    throw e;
  }
}