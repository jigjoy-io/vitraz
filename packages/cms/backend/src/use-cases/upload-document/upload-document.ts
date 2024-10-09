import { uploadDocument } from '@repositories/upload-document-repository';

/**
 * Uploads a file using the repository (S3).
 * @param {Object} file - The file object to upload.
 * @returns {Promise<string>} The URL of the uploaded file.
 */
export async function uploadDocumentUseCase(file: { filename: string; content: Buffer; mimetype: string, rootPageId: string }): Promise<string> {
  const allowedMimeTypes = ['image/', 'video/', 'audio/'];
  if (!allowedMimeTypes.some(type => file.mimetype.startsWith(type))) {
    throw new Error('Only image, video, and audio uploads are allowed');
  }
  
  return await uploadDocument(file);
}
