const FileUpload = ({ onFileChange }) => {
  return (
    <div className="FileWrapper">
      <input className="FileUpload" type="file" onChange={onFileChange} />
    </div>
  )
}

export default FileUpload;