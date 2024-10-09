import { useState } from "react";
import { uploadDocument } from "../api/upload"; 
import { fileToBase64 } from "../util/file-to-base64"; 
import { useRootPage } from "../util/store"; 

const useFileUpload = (setValue: (value: string) => void, acceptedFileType: string) => {
    const [fileName, setFileName] = useState("");
    const [uploading, setUploading] = useState(false);
    const rootPage = useRootPage();

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith(acceptedFileType)) {
            alert(`Please select a valid ${acceptedFileType} file.`);
            return;
        }
        setFileName(file.name);
        setUploading(true);
        try {
            const base64 = await fileToBase64(file);
            const response = await uploadDocument({
                file: base64,
                name: file.name,
                type: file.type,
                rootPageId: rootPage.id,
            });
            setValue(response.filePath);
        } catch (error) {
            console.error(`Failed to upload ${acceptedFileType} file:`, error);
            alert(`Error uploading ${acceptedFileType} file.`);
        } finally {
            setUploading(false);
        }
    };

    return { fileName, uploading, handleFileUpload, setFileName };
};

export default useFileUpload;
