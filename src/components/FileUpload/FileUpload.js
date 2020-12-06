import React from 'react';
import { FiImage } from 'react-icons/fi';

import './FileUpload.css';

const FileUpload = ({ onFileChange }) => (
  <div className="FileUpload">
    <label htmlFor="FileInput"><FiImage className="FileIcon"/></label>
    <input id="FileInput" type="file" onChange={onFileChange} />
  </div>
);

export default FileUpload;
