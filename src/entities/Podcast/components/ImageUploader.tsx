import { Input, UploadImage } from "@/shared";
import { Loader } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, Ref, RefObject, useRef } from "react";

export default function ImageUploader({fileRef, onChange, isFileLoading, file}: {fileRef: RefObject<HTMLInputElement>, onChange: (e: ChangeEvent<HTMLInputElement>) => void, isFileLoading: boolean, file: string}) {
  return (
    <>
      <div className="image_div" onClick={() => fileRef?.current?.click()}>
        <Input
          type="file"
          className="hidden"
          ref={fileRef}
          accept=".svg,.png,.jpg,.gif"
          onChange={(e) => onChange(e)} 
        />
        {!isFileLoading ? (
          <Image src={UploadImage} width={40} height={40} alt="upload" />
        ): (
          <div className="text-16 flex-center font-medium basic-label">
            Загружаем
            <Loader size={20} className="animate-spin ml-2" />
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-12 font-bold text-orange-1">
            Нажми для загрузки изображения
          </h2>
          <p className="text-12 font-normal text-gray-1">SVG, PNG, JPG, или GIF (макс. 1080x1080px)</p> 
        </div>
      </div>
      {file && (
        <div className="flex-center w-full">
          <Image
            src={file}
            width={300}
            height={300}
            className="mt-5"
            alt='uploader'  />
        </div>
      )}
    </>
  )
}