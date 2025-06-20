import React, { useRef, useState } from 'react'
import { LuUser , LuUpload, LuTrash } from 'react-icons/lu'

const ProfilephotoSelector = ({ image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        if(file){
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };
     
  return <div className=" flex justify-center mb-6">
    <input 
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
    />

    { !image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-400/50 rounded-full relative cursor-pointer">
        <LuUser className='text-4xl text-blue-700'/>

        <button type='button'
        className='w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
        onClick={onChooseFile}>
            <LuUpload/>
        </button>
        </div>
    ): (
        <div className="relative">
            <img src={previewUrl}
             alt="Profile photo" 
             className='w-20 h-20 rounded-full object-cover' />

            <button type='button' 
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' 
            onClick={handleRemoveImage}>
                <LuTrash/>
            </button>
        </div>
    )}
  </div>
}

export default ProfilephotoSelector
