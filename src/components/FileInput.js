function FileInput({ onFileSelect }) {
    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        onFileSelect(selectedFiles);
    };

    return(
        <input
        type='file'
        multiple
        accept="image/*"
        onChange={ handleFileSelect }
        />
    ); 
}
export default FileInput