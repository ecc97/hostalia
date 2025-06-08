'use client'
import React from "react"
import { useAuthStore } from "@/store/authStore";
import { useModalStore } from "@/store/modalStore"
import { ILoginRequest } from "@/interfaces/IAuth";

export default function FormLogin() {
    const { login, error, loading } = useAuthStore();
    const { openRegisterModal } = useModalStore();
    const [formData, setFormData] = React.useState<ILoginRequest>({ email: '', password: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(formData);
            console.log("Inicio de sesión exitoso");
            // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }
    return (
        <form className="flex flex-col align-center justify-center gap-4 mx-auto p-6 bg-white rounded-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl text-center font-bold mb-4">Bienvenido a Hostalia</h2>
            <div className="relative mb-4">
                <label htmlFor="email" className="label-login absolute left-2 top-2 transition-all duration-200 transform origin-top-left pointer-events-none">Correo Electrónico</label>
                <input 
                    type="email" 
                    id="email" 
                    className="input-login border-none p-2 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
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
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-[24px]" disabled={loading}>
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
            <p className="text-center mt-4">¿No tienes una cuenta? <button onClick={openRegisterModal} className="text-blue-500">Registrate</button></p>
        </form>
    )
}
