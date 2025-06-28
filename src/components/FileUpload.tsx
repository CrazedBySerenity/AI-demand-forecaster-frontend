import React from "react";

interface Props {
  onForecast: (file: File) => void;
}

const FileUpload: React.FC<Props> = ({ onForecast }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onForecast(e.target.files[0]);
    }
  };
  return <input type="file" accept=".csv" onChange={handleFileChange} />;
};


export default FileUpload;
