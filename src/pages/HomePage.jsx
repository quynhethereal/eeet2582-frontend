import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyToaster from "../components/Toaster/MyToaster";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import DragDropFileUpload from "../components/upload/DragDropFileUpload";
import { isValidFileType, formatFileSize } from "../utilities/utils";

export default function HomePage() {
  const [userData, setUserData] = useState();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const [token, setToken] = useState();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    if (user?.id_token) {
      setUserData(jwtDecode(user.id_token));
      setToken(user.access_token);
    }
  }, [isAuthenticated, user, navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && isValidFileType(file.name)) {
      setUploadedFile(file);
    } else {
      alert("Please upload a Word document (.doc or .docx)");
      event.target.value = null;
    }
  };

  const onCustomUploadFileButtonClicked = () => {
    fileInputRef.current.click();
  };

  const handleFileDrop = (file) => {
    if (isValidFileType(file.name)) {
      setUploadedFile(file);
    }
  };

  const uploadFile = async () => {
    if (!uploadedFile) return;
  
    const formData = new FormData();
    formData.append('docx_file', uploadedFile);
  
    if (token) {
      try {
        console.log("testing")
        const response = await axios.post('http://127.0.0.1:8000/api/parse-docx', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Set content type for FormData
          },
        });
  
        if (response.status === 200) {
          const data = response.data;
          //setDownloadLink(data.processedFileLink);
          console.log("Success")
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Upload error: ", error);
      }
    }
  };
  

  return (
    <>
      <div className="mt-6 flex flex-col justify-center items-center">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Hello {userData && userData.name}
        </h1>

        {/* Drag and Drop Section */}
        <DragDropFileUpload onFileDrop={handleFileDrop} />

        {/* Display Uploaded File Information */}
        {uploadedFile && (
          <div className="my-4 p-4 border rounded">
            <p>
              <strong>File Name:</strong> {uploadedFile.name}
            </p>
            <p>
              <strong>File Size:</strong> {formatFileSize(uploadedFile.size)}
            </p>
          </div>
        )}

        {/* File Upload Section */}
        <div className="my-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".doc,.docx"
            style={{ display: "none" }} // Hide the actual input
          />
          <button
            onClick={onCustomUploadFileButtonClicked}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Select File
          </button>
          <button
            onClick={uploadFile}
            disabled={!uploadedFile} // Disable the button if no valid file is selected
            className={`ml-2 px-4 py-2 rounded focus:outline-none ${
              uploadedFile
                ? "bg-green-500 hover:bg-green-700 text-white"
                : "bg-gray-500 text-gray-300"
            }`}
          >
            Upload File
          </button>
        </div>

        {/* File Download Section */}
        {downloadLink && (
          <div className="my-4">
            <a
              href={downloadLink}
              download
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Download Processed File
            </a>
          </div>
        )}
      </div>

      <MyToaster />
    </>
  );
}
