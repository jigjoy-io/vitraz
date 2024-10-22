import React from "react"
import Tabs from "../../../../components/tabs/tabs"
import Tab from "../../../../components/tabs/tab"
import FileUploader from "../../../../components/file-uploader/file-uploader"
import FileUrlEditor from "../../../../components/file-uploader/file-url-editor"
import { updateBlock } from "../../../../reducers/page-reducer"
import { useDispatch } from "react-redux"

interface LocalizationStrings {
    update: string
    embedLink: string
    uploadFile: string
    clickToUpload: string
    fileTooLarge: string
    fileLoadSuccess: string
    fileUploadedSuccessfully: string
    uploadInProgress: string
    uploadError: string
    embedLinkPlaceholder: string
    embedButton: string
}

interface FileEditorProps {
    value: string
    attribute: string,
    block: any
    fileType: "image" | "video" | "audio"
    localization: LocalizationStrings
    lang: "US" | "RS"
}

export default function FileEditor({ value, block, attribute, fileType, localization }: FileEditorProps) {
    
    const dispatch = useDispatch()


	const update = (fileUrl) => {

        const newBlock = { ...block }
        newBlock[attribute] = fileUrl
        dispatch(updateBlock(newBlock))

	}

    return (
        <div className="flex flex-col p-2 w-[300px] mt-4">
            
            <Tabs>
                <Tab key={localization.uploadFile}>
                    <FileUploader mediaType={fileType} localization={localization} callback={update}/>
                </Tab>
                <Tab key={localization.embedLink}>
                    <FileUrlEditor filePath={value} fileType={fileType} localization={localization} callback={update}/>
                </Tab>
            </Tabs>

        </div>
    )
}