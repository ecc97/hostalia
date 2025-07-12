'use client'
import React, { PropsWithChildren, useEffect } from "react"

interface ModalProps extends PropsWithChildren {
    isOpen: boolean
    onClose: () => void
    isLg?: boolean
}

export default function Modal({ isOpen, onClose, isLg = false, children }: ModalProps) {
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            window.addEventListener("keydown", handleKeydown)
        } 

        return () => {
            window.removeEventListener("keydown", handleKeydown)
        }
    }, [isOpen, onClose])
    
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 min-h-screen bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md ${isLg && 'lg:max-w-3xl'} w-full relative`} onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <p className="font-bold text-2xl">&times;</p>
                </button>
                {children}
            </div>
        </div>
  );
}
