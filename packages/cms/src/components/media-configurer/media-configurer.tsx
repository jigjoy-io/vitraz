import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { blockingUpdated } from "../../reducers/toolbar-reducer";
import TemplateFactory from "../../util/factories/templates/template-factory";
import { updateBlock } from "../../reducers/page-reducer";
import { createPortal } from "react-dom";
import ClickOutsideListener from "../../util/click-outside-listener";
import Tabs from "../tabs/tabs";
import Tab from "../tabs/tab";
import Alert from "../alert/alert";
import Button from "../button/button";
import useFileUpload from "../../util/file-upload";
import useFileChangeHandler from "../../util/handle-file-change";
import { fileUpdate } from "../../util/file-update";

interface LocalizationStrings {
  create: string;
  update: string;
  embedLink: string;
  uploadFile: string;
  clickToUpload: string;
  maxFileUpload: string;
  fileTooLarge: string;
  fileLoadSuccess: string;
  fileUploadedSuccessfully: string;
  uploadInProgress: string;
  uploadError: string;
  clickToAdd: string;
}

interface MediaConfigurerProps {
  mediaType: "image" | "audio" | "video";
  icon: React.ReactNode;
  localization: LocalizationStrings;
  lang: string;
  props: any;
}

export default function MediaConfigurer({ mediaType, icon, localization, props, lang }: MediaConfigurerProps) {
  const [display, setDisplay] = useState(false);
  const [value, setValue] = useState(props.value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const { file, fileAlert, handleFileChange, setFileAlert } = useFileChangeHandler(lang);
  const { handleFileUpload } = useFileUpload(setValue, mediaType);
  const { update, loading } = fileUpdate(props.block, setFileAlert, localization)

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const [top, setTop] = useState(window.innerHeight / 2);
  const [y, setY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      let contentRect = ref.current.getBoundingClientRect();
      if (contentRect.top + window.innerHeight / 2 > window.innerHeight) {
        setY(-100);
        setTop(contentRect.top);
      } else {
        setY(0);
        setTop(contentRect.top);
      }
    }
  }, [display]);

  const openConfigurer = () => {
    setDisplay(true);
    dispatch(blockingUpdated(true));
  };

  const create = async () => {
    dispatch(blockingUpdated(false));
    const uploadedFileUrl = await update(file, handleFileUpload, value);

    let block;

    if (mediaType === "audio") {
      block = TemplateFactory.createAudioBlock(uploadedFileUrl)
    }
    if (mediaType === "image") {
      block = TemplateFactory.createImageBlock(uploadedFileUrl)
    }
    if (mediaType === "video") {
      block = TemplateFactory.createReelBlock(uploadedFileUrl)
    }

    block.id = props.id;
    dispatch(updateBlock(block));
  };

  const turnOffPopup = () => {
    let block = JSON.parse(JSON.stringify(props));
    block.display = false;
    dispatch(updateBlock(block));
  };

  const onClose = () => {
    dispatch(blockingUpdated(false));
    setDisplay(false);
    turnOffPopup();
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      turnOffPopup();
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div>
      {display && createPortal(
        <ClickOutsideListener callback={onClose}>
          <div
            style={{
              width: 460,
              pointerEvents: 'auto',
              top: top,
              transform: `translate(-25%, ${y}%)`
            }}
            className="fixed rounded-md bg-[white] rounded-lg rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] z-50 -translate-x-[25%] left-[50%]"
          >
            <div className="p-[5%]">
              <div>
                {mediaType === "image" && <img src={value} className="w-[100px] my-2 rounded-lg" alt="Uploaded" />}
                <Tabs>
                  <Tab key={localization.uploadFile}>
                    <div className="mb-2">
                      <Alert type={fileAlert.type} message={fileAlert.message} />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept={`${mediaType}/*`}
                      style={{ display: 'none' }}
                    />
                    <Button width="w-full" text={localization.clickToUpload} color="default" action={triggerFileInput} />
                    {file && !loading && <p className="mt-2 text-sm text-ellipsis overflow-hidden">{file.name}</p>}
                  </Tab>
                  <Tab key={localization.embedLink}>
                    <input className="p-1 rounded-lg border w-[100%] mb-3" value={value} onChange={(e: any) => setValue(e.target.value)} />
                  </Tab>
                </Tabs>
              </div>
              <div className="mt-[1rem]">
                <Button width="w-full" text={localization.create} action={create} />
              </div>
            </div>
          </div>
        </ClickOutsideListener>,
        document.body
      )}

      <div
        ref={ref}
        onClick={openConfigurer}
        className="w-[100%] h-[50px] bg-default-light hover:bg-gray-300 cursor-pointer rounded-md flex items-center pl-5 hover:opacity-60"
      >
        {icon}
        <div className="pl-2">{localization.clickToAdd}</div>
      </div>
    </div>
  );

}