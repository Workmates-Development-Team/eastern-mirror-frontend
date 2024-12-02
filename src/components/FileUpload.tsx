import React from "react";

const FileUpload = () => {
  return (
    <div className="file-upload-container">
      <input
        accept="image/*"
        multiple
        type="file"
        style={{ display: "none" }}
        id="file-upload-input"
      />
      <label htmlFor="file-upload-input" className="file-upload-label">
        <img src="/svg/svgviewer-output.svg" alt="no-image" />
      </label>
    </div>
  );
};

export default FileUpload;
