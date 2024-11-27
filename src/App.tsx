import React from 'react';
import { uploadData, isCancelError} from 'aws-amplify/storage';
import { FileUploader } from '@aws-amplify/ui-react-storage';

import '@aws-amplify/ui-react/styles.css';


export const DefaultFileUploaderExample = () => {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      path="public/"
      maxFileCount={1}
      isResumable
    />
  );
};

try {
  const result = await uploadData({
    path: "album/2024/1.jpg",
    // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
    data: file,
    options: {
      bucket: 'firstBucket'
    }
  }).result;
  console.log('Succeeded: ', result);
} catch (error) {
  console.log('Error : ', error);
}

const monitorUpload = async () => {
  try {
    const result = await uploadData({
      path: "album/2024/1.jpg",
      // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
      data: file,
      options: {
        onProgress: ({ transferredBytes, totalBytes }) => {
          if (totalBytes) {
            console.log(
              `Upload progress ${Math.round(
                (transferredBytes / totalBytes) * 100
              )} %`
            );
          }
        },
      },
    }).result;
    console.log("Path from Response: ", result.path);
  } catch (error) {
    console.log("Error : ", error);
  }
  
}



function App() {
  const [file, setFile] = React.useState();

  const handleChange = (event: any) => {
      setFile(event.target.files[0]);
  };

  return (
      <div>
          <input type="file" onChange={handleChange} />
          <button
              onClick={() =>
                  uploadData({
                      path: `photos/${file.name}`,
                      data: file,
                  })
              }
          >
              Upload
          </button>
      </div>
  );
}

export default App;
