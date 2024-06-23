import { Input, UploadImage } from "@/shared";
import { Loader } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, Dispatch, Ref, RefObject, SetStateAction, useRef } from "react";

export default function FileUploader({fileRef, onChange, isFileLoading, file, isHidedImage, setIsHidedImage}: {fileRef: RefObject<HTMLInputElement>, onChange: (e: ChangeEvent<HTMLInputElement>) => void, isFileLoading: boolean, file: string, isHidedImage: boolean, setIsHidedImage: Dispatch<SetStateAction<boolean>>}) {
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
        {!isFileLoading  ? (
          <Image src={UploadImage} width={40} height={40} alt="upload" />
        ): (
          <div className="text-16 flex-center font-medium basic-label">
            Загружаем
            <Loader size={20} className="animate-spin ml-2" />
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-12 font-bold text-orange-1">
            Нажми для загрузки иконки профиля
          </h2>
          <p className="text-12 font-normal text-gray-1">SVG, PNG, JPG, или GIF (макс. 1080x1080px)</p> 
        </div>
      </div>
      {file && !isHidedImage && (
        <div className="flex-center w-full">
          <Image
            src={file}
            width={200}
            height={200}
            className="mt-5"
            alt='uploader'  />
        </div>
      )}
      {file && 
        <>
          { isHidedImage ? (
          <h2 className="text-16 basic-label md:hidden" onClick={() => setIsHidedImage(false)}>Открыть</h2>
          ) : (
          <h2 className='text-16 basic-label md:hidden' onClick={() => setIsHidedImage(true)}>Скрыть</h2>
          )}
        </>
      }
    </>
  )
}