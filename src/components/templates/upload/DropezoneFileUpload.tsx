
"use client"
// src/FileUpload.tsx

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosResponse } from 'axios';

// interface FileUploadResponse {
//   success: string;
//   filename: string;
// }

interface FileUploadProps {
  acceptedFileExtensions?: string[];
  apiEndpoint?: string
}

const FileUpload: React.FC<FileUploadProps> = ({ acceptedFileExtensions, apiEndpoint }) => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check if the file extension is allowed
    if(acceptedFileExtensions){
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!acceptedFileExtensions!.includes(fileExtension)) {
      console.error('Invalid file type. Please upload a valid file.');
      setUploadSuccess(false);
      return;
    }
}
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response: AxiosResponse =
        await axios.post(apiEndpoint || '/api/upload', formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded / (progressEvent?.total || file.size)) * 100
            );
            setUploadProgress(percentCompleted);
          },
        });

      // Handle the server response here
      if (response.status === 200) {
        setUploadSuccess(true);
        
        console.log({response})
        // Reset the progress and success message after a delay (e.g., 3 seconds)
        setTimeout(() => {
          setUploadProgress(null);
          setUploadSuccess(null);
        }, 3000);
      } else {
        setUploadSuccess(false);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadSuccess(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`bg-gray-200 border-dashed border-2 border-gray-300 rounded-lg p-4 text-center ${isDragActive ? 'bg-gray-300' : ''
          }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      {uploadProgress !== null && uploadSuccess === null && (
        <div className="mt-4">
          <p>Upload Progress: {uploadProgress}%</p>
          <div className="bg-blue-400 h-2 w-full">
            <div
              className="bg-blue-600 h-2"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {uploadSuccess === true && (
        <div className="mt-4 text-green-600">
          <p>Upload finished successfully! ✔️</p>
        </div>
      )}

      {uploadSuccess === false && (
        <div className="mt-4 text-red-600">
          <p>Upload failed. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;


//=================================================================================================================
// const FileUpload = () => {
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const onDrop = useCallback(async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded / progressEvent.total) * 100
//           );
//           setUploadProgress(percentCompleted);
//         },
//       });

//       // Handle the server response here if needed
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     } finally {
//       // Reset the progress after the upload is complete or fails
//       setUploadProgress(0);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div>
//       <div
//         {...getRootProps()}
//         className={`bg-gray-200 border-dashed border-2 border-gray-300 rounded-lg p-4 text-center ${
//           isDragActive ? 'bg-gray-300' : ''
//         }`}
//       >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the files here...</p>
//         ) : (
//           <p>Drag 'n' drop some files here, or click to select files</p>
//         )}
//       </div>

//       {uploadProgress > 0 && (
//         <div className="mt-4">
//           <p>Upload Progress: {uploadProgress}%</p>
//           <div className="bg-blue-400 h-2 w-full">
//             <div
//               className="bg-blue-600 h-2"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;



//===========================================================
// import React, { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// interface FileUploadResponse {
//   message: string;
//   filePath: string;
// }

// const FileUpload: React.FC = () => {
//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post<FileUploadResponse>('/upload', formData, {
//         onUploadProgress: (progressEvent:any) => {
//           const percentCompleted = Math.round(
//             (progressEvent?.loaded / progressEvent?.total) * 100
//           );
//           console.log(`Upload Progress: ${percentCompleted}%`);
//         },
//       });

//       // Handle the server response here if needed
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div>
//       <div
//         {...getRootProps()}
//         className={`bg-gray-200 border-dashed border-2 border-gray-300 rounded-lg p-4 text-center ${
//           isDragActive ? 'bg-gray-300' : ''
//         }`}
//       >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the files here...</p>
//         ) : (
//           <p>Drag 'n' drop some files here, or click to select files</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;




 //===============================================================================================================
// import React, { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';

// interface FileUploadResponse {
//   message: string;
//   filePath: string;
// }

// const DropezoneFileUpload: React.FC = () => {
//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     const formData = new FormData();
//     formData.append('file', acceptedFiles[0]);

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         // const data: FileUploadResponse = await response.json();
//         const data = await response.json();
//         // Handle the server response here if needed
//         console.log({uploadData:data});
//       } else {
//         console.error('File upload failed');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div
//       {...getRootProps()}
//       className={`bg-gray-200 border-dashed border-2 border-gray-300 rounded-lg p-4 text-center ${
//         isDragActive ? 'bg-gray-300' : ''
//       }`}
//     >
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//     </div>
//   );
// };

// export default DropezoneFileUpload;
