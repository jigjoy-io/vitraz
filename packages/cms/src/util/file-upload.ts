import { uploadDocument } from "../api/upload"
import { fileToBase64 } from "./file-to-base64"
import { useRootPage } from "./store"

const useFileUpload = (setValue: (value: string) => void, acceptedFileType: string) => {
    const rootPage = useRootPage()

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith(acceptedFileType)) {
            alert(`Please select a valid ${acceptedFileType} file.`)
            return
        }
        try {
            const base64 = await fileToBase64(file)
            const response = await uploadDocument({
                file: base64,
                name: file.name,
                type: file.type,
                rootPageId: rootPage.id,
            })
            setValue(response.filePath)
            return response.filePath
        } catch (error) {
            console.error(`Failed to upload ${acceptedFileType} file:`, error)
            alert(`Error uploading ${acceptedFileType} file.`)
        }
    }

    return { handleFileUpload }
}

export default useFileUpload
