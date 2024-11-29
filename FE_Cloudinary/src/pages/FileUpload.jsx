import React, { useState } from 'react';
import { uploadFile } from '../services/axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const formattedDate = currentDate.getTime().toString().replace(/:/g, '-');
        const fileNameWithDate = `${formattedDate}_${file.name}`;

        const formData = new FormData();
        formData.append('file', file, fileNameWithDate);

        try {
            
            const response = await uploadFile(formData);
            console.log(response)
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input type="file" onChange={onFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUpload;
