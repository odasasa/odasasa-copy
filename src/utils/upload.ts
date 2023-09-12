import { writeFile, mkdir } from 'fs/promises';
import path from "path";

export const handleFileUpload =async (infile:File|null)=>{
    const file: File | null = infile as unknown as File;

    if (!file) {
     throw ("Invalid file");
    }
  
    let { name: originalname } = file,
      extension = path.extname(originalname),
      basename = path.basename(originalname, extension).toLowerCase().split(' ').join('_'),
      dateString = new Date().toISOString().replace(/:/g, '-'),
      filename = `${basename}-${dateString}${extension}`
  
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    // Define the upload folder path
    const uploadFolderPath = path.join(process.cwd(), 'public', "uploads");
  
    try {
      // Check if the upload folder exists, and create it if not
      await mkdir(uploadFolderPath, { recursive: true });
    } catch (error:any) {
      console.error('Error creating upload folder:', error);
      throw ('Error creating upload folder:'+ error.message)
    }
  
    // const filepath = path.join(uploadFolderPath, file.name);
    const filepath = path.join(uploadFolderPath, filename);
    try {
      // Write the file to the specified path
      await writeFile(filepath, buffer);
      console.log(`Uploaded file saved at: ${filepath}`);
      return { success: true, filename };
    } catch (error) {
      console.error('Error saving the file:', error);
      return ({ success: false });
    }
}