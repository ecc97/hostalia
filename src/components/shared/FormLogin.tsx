'use client'
import React from "react"
import { useModalStore } from "@/store/modalStore"

export default function FormLogin() {
    const { openRegisterModal } = useModalStore();
    return (
        <form className="flex flex-col align-center justify-center gap-4 mx-auto p-6 bg-white rounded-lg">
            <h2 className="text-2xl text-center font-bold mb-4">Bienvenido a Hostalia</h2>
            <div className="relative mb-4">
                <label htmlFor="email" className="label-login absolute left-2 top-2 transition-all duration-200 transform origin-top-left pointer-events-none">Correo Electrónico</label>
                <input 
                    type="email" 
                    id="email" 
                    className="input-login border-none p-2 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required
                    onFocus={(e) => {
                        const label = e.target.previousElementSibling;
                        if (label) {
                            label.classList.add('scale-75', 'top-[-10px]', 'bg-white', 'px-2');
                        }
                    }}
                    onBlur={(e) => {
                        const label = e.target.previousElementSibling;
                        if(!e.target.value) {
                            if (label) {
                                label.classList.remove('scale-75', 'top-[-10px]', 'bg-white', 'px-2');
                            }
                        }
                    }} 
                />
            </div>
            <div className="relative mb-4">
                <label htmlFor="password" className="label-login absolute left-2 top-2 transition-all duration-200 transform origin-top-left text-gray-500 pointer-events-none">Contraseña</label>
                <input 
                    type="password" 
                    id="password" 
                    className="input-login border-none p-2 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required
                    onFocus={(e) => {
                        const label = e.target.previousElementSibling;
                        if (label) {
                            label.classList.add('scale-75', 'top-[-10px]', 'bg-white', 'px-2');
                        }
                    }}
                    onBlur={(e) => {
                        const label = e.target.previousElementSibling;
                        if(!e.target.value) {
                            if (label) {
                                label.classList.remove('scale-75', 'top-[-10px]', 'bg-white', 'px-2');
                            }
                        }
                    }} 
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-[24px]">Iniciar Sesión</button>
            <p className="text-center mt-4">¿No tienes una cuenta? <button onClick={openRegisterModal} className="text-blue-500">Registrate</button></p>
        </form>
    )
}
