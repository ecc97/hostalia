'use client'
import React from 'react'
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';
import { IRegisterRequest } from '@/interfaces/IAuth';
import { useRouter } from 'next/navigation';

export default function FormRegister() {
    const { register, error, loading } = useAuthStore();
    const { openLoginModal } = useModalStore();
    const [formData, setFormData] = React.useState<IRegisterRequest>({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validación simple de contraseñas
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }
        try {
            await register(formData);
            console.log("Registro exitoso");
            router.push('/dashboard'); 
        } catch (err) {
            console.error("Error al registrarse:", err);
        }
    }
  return (
    <form className='flex flex-col align-center justify-center gap-4 mx-auto p-6 bg-white rounded-lg' onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center font-bold mb-4">Crea una cuenta</h2>
        <div className="relative mb-4">
            <label htmlFor="name" className="label-login absolute left-2 top-2 transition-all duration-200 transform origin-top-left pointer-events-none">Nombre</label>
            <input 
                type="text" 
                id="name" 
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
            <label htmlFor="email" className="label-login absolute left-2 top-2 transition-all duration-200 transform origin-top-left pointer-events-none">Correo Electrónico</label>
                <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            <label htmlFor="phone" className="label-login absolute left-2 top-2 transition-all duration-200 transform origin-top-left pointer-events-none">Teléfono</label>
                <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
        

        <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="label-login absolute left-2 top-2 transition-all duration-200 transform origin-top-left pointer-events-none">Confirmar Contraseña</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
        {(error || errorMessage) && (
            <p className="text-red-500 text-center">{error || errorMessage}</p>
        )}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-[12px]" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        <p className="text-center mt-4">¿Ya tienes una cuenta? <button onClick={openLoginModal} className="text-blue-500">Inicia sesión</button></p>
    </form>
  )
}
