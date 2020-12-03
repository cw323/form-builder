const FileUpload = ({ onFileChange }) => {
  return <input className="FileUpload" type="file" onChange={onFileChange} />;
}

export default FileUpload;