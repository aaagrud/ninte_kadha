import type React from "react";
import { useState, useRef } from "react";
import { Cloud, Upload, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        handleFileUpload(droppedFile);
      }
    }
  };

  // Validate File Before Upload
  const validateFile = (file: File): boolean => {
    if (!file.name.endsWith(".json")) {
      setError("Please upload a JSON file");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("File size should be less than 10MB");
      return false;
    }

    return true;
  };

  // Read & Send JSON File to Backend
  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      if (event.target?.result) {
        try {
          const jsonData = JSON.parse(event.target.result as string); // Convert file content to JSON
          console.log("Extracted JSON Data:", jsonData);

          // Send JSON to FastAPI backend
          const response = await sendDataToBackend(jsonData);
          if (response?.success) {
            setUploadSuccess(true);
          }
        } catch (error) {
          console.error("Invalid JSON file:", error);
          setError("Invalid JSON format");
        }
      }
    };

    reader.readAsText(file); // Read file as text
  };

  // Function to send JSON data to FastAPI
  const sendDataToBackend = async (jsonData: any) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const data = await response.json();
      console.log("Response from Backend:", data);
      return { success: true };
    } catch (error) {
      console.error("Error sending data to backend:", error);
      setError("Failed to upload file");
      return { success: false };
    }
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        handleFileUpload(selectedFile);
      }
    }
  };

  // Open File Picker
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-purple-700">Upload Your Search History</h2>

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group",
          isDragging ? "border-pink-400 bg-pink-50" : "border-purple-200 hover:border-pink-300 hover:bg-pink-50",
          file ? "bg-green-50 border-green-300" : "",
        )}
      >
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />

        <div className="mb-4 relative">
          <Cloud
            className={cn(
              "w-20 h-20 transition-colors duration-300",
              file ? "text-green-400" : isDragging ? "text-pink-400" : "text-purple-300 group-hover:text-pink-400",
            )}
          />
          {file ? (
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
              <Check className="w-6 h-6 text-green-500" />
            </div>
          ) : (
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
              <Upload className="w-6 h-6 text-purple-500 group-hover:text-pink-500" />
            </div>
          )}
        </div>

        <div className="text-center">
          {file ? (
            <div className="space-y-1">
              <p className="text-green-600 font-medium">File uploaded successfully!</p>
              <p className="text-sm text-gray-500">{file.name}</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-purple-700 font-medium group-hover:text-pink-600 transition-colors">
                Drag & drop your JSON file here
              </p>
              <p className="text-sm text-gray-500">or click to browse</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center text-red-500 justify-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="flex items-center text-green-500 justify-center">
          <Check className="w-4 h-4 mr-1" />
          <span className="text-sm">File uploaded successfully!</span>
        </div>
      )}
    </div>
  );
}
