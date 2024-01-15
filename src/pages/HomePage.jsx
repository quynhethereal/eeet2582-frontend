import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyToaster from "../components/Toaster/MyToaster";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import DragDropFileUpload from "../components/upload/DragDropFileUpload";
import { isValidFileType, formatFileSize } from "../utilities/utils";
import Spinner from "../components/spinner/Spinner";

export default function HomePage() {
  const [userData, setUserData] = useState();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");
  const pollingInterval = useRef(null);

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
    formData.append("docx_file", uploadedFile);

    if (token) {
      try {
        console.log("testing");
        const response = await axios.post(
          "http://127.0.0.1:8000/api/parse-docx",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Set content type for FormData
            },
          }
        );

        if (response.status === 202) {
          const data = response.data;
          const { task_id } = response.data;
          startPolling(task_id);
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Upload error: ", error);
      }
    }
  };

  const startPolling = (taskId) => {
    setIsProcessing(true);
    pollingInterval.current = setInterval(() => checkTaskStatus(taskId), 1000);
  };

  const checkTaskStatus = async (taskId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/task-status/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { status, result } = response.data;
      setTaskStatus(status);
      console.log("Status: ", status);
      if (status === "SUCCESS") {
        clearInterval(pollingInterval.current);
        setIsProcessing(false);
        setDownloadLink(result.processedFileLink);
      } else if (status === "FAILURE") {
        clearInterval(pollingInterval.current);
        setIsProcessing(false);
        console.error("Processing failed");
      }
    } catch (error) {
      console.error("Polling error: ", error);
    }
  };

  return (
    <>
      <div className="mt-6 flex flex-col justify-center items-center">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Hello {userData && userData.name}
        </h1>

        {/* Drag and Drop Section */}
        <DragDropFileUpload
          onFileDrop={handleFileDrop}
          isProcessing={isProcessing}
        />

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
            disabled={isProcessing} // Disable this button when isProcessing is true
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Select File
          </button>
          <button
            onClick={uploadFile}
            disabled={!uploadedFile || isProcessing} // Disable this button if no valid file is selected or if isProcessing is true
            className={`ml-2 px-4 py-2 rounded focus:outline-none ${
              uploadedFile && !isProcessing
                ? "bg-green-500 hover:bg-green-700 text-white"
                : "bg-gray-500 text-gray-300"
            }`}
          >
            Upload File
          </button>
        </div>

        {/* Spinner */}
        {isProcessing && (
          <div className="flex justify-center items-center my-4">
            <div className="flex flex-col items-center">
              <Spinner />
              <p>The file is processing.</p>
            </div>
          </div>
        )}

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
