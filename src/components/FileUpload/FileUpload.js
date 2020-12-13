import React from 'react';
import { FiImage } from 'react-icons/fi';

import s from './FileUpload.module.css';

const FileUpload = ({ onFileChange }) => (
  <div className={s.fileUpload}>
    <label htmlFor="fileInput"><FiImage className={s.fileIcon}/></label>
    <input className={s.fileInput} id="fileInput" type="file" onChange={onFileChange} />
  </div>
);

export default FileUpload;
