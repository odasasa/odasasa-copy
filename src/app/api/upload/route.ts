import { handleFileUpload } from '@/utils/upload';
import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// export async function POST(request: NextRequest) {
//   const data = await request.formData();
//   const file: File | null = data.get('file') as unknown as File;

//   if (!file) {
//     return NextResponse.json({ success: false });
//   }

//   let { name: originalname } = file,
//     extension = path.extname(originalname),
//     basename = path.basename(originalname, extension).toLowerCase().split(' ').join('_'),
//     dateString = new Date().toISOString().replace(/:/g, '-'),
//     filename = `${basename}-${dateString}${extension}`

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   // Define the upload folder path
//   const uploadFolderPath = path.join(process.cwd(), 'public', "uploads");

//   try {
//     // Check if the upload folder exists, and create it if not
//     await mkdir(uploadFolderPath, { recursive: true });
//   } catch (error) {
//     console.error('Error creating upload folder:', error);
//     return NextResponse.json({ success: false });
//   }

//   // const filepath = path.join(uploadFolderPath, file.name);
//   const filepath = path.join(uploadFolderPath, filename);
//   try {
//     // Write the file to the specified path
//     await writeFile(filepath, buffer);
//     console.log(`Uploaded file saved at: ${filepath}`);
//     return NextResponse.json({ success: true, filename });
//   } catch (error) {
//     console.error('Error saving the file:', error);
//     return NextResponse.json({ success: false });
//   }
// }





export async function POST(request: NextRequest) {
  const data = await request.formData();


  try {
    const res = await handleFileUpload(data.get('file') as unknown as File)
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}


