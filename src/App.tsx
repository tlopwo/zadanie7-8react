import React from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [file, setFile] = React.useState<File | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    try {
      await client.uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
      });
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("File upload failed. Please try again.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;