import React from 'react'
import { CiImageOn } from 'react-icons/ci';
import Image from 'next/image';

function ImageUploadBox({ index, isMain = false, preview, onImageChange }: { index: number; isMain?: boolean; preview: string | null; onImageChange: (file: File | null) => void; }) {
    const mainClasses = isMain ? "h-24 sm:h-28 md:h-40" : "h-18 sm:h-20 md:h-20";
    return (
        <div className={`relative border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 transition-colors cursor-pointer ${mainClasses} w-full`}>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageChange(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {preview ? (
                <div className="relative w-full h-full">
                    <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        priority={true}
                        quality={100}
                        sizes="100vw"
                        width={100}
                        height={100}
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onImageChange(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 z-20"
                    >
                        ×
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <CiImageOn className={`${isMain ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-2xl sm:text-3xl'} mb-2`} />
                    <span className={`${isMain ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-center px-2`}>
                        {isMain ? 'Cargar imagen de portada' : ''}
                    </span>
                </div>
            )}
        </div>
    )
}

export default ImageUploadBox
