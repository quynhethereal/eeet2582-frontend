import React, { useState, useCallback } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { isValidFileType } from "../../utilities/utils";

function DragDropFileUpload({ onFileDrop }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      const files = event.dataTransfer.files;
      if (files.length) {
        const file = files[0];
        if (isValidFileType(file.name)) {
          onFileDrop(file);
        } else {
          alert("Please drop a Word document (.doc or .docx)");
        }
      }
    },
    [onFileDrop]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed rounded-lg p-10 m-10 text-center cursor-pointer relative ${
        isDragging ? "border-blue-500" : "border-gray-300"
      }`}
    >
      {isDragging && (
        <PlusCircleIcon className="absolute top-0 right-0 h-8 w-8 text-blue-500" />
      )}
      Drag and drop a file here, or click to select a file
    </div>
  );
}

export default DragDropFileUpload;
