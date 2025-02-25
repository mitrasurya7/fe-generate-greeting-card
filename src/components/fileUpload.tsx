import React, { useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const FileUpload: React.FC<{ onFileSelect: (file: File) => void }> = ({
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onFileSelect(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center border-2 border-dashed h-40 my-2 rounded-lg bg-gray-200 cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <IoCloudUploadOutline className="text-4xl" aria-label="Upload Icon" />
      <p className="text-lg font-semibold">Browse Files</p>
      <p>Drag and drop files here</p>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
