'use client'
import React from 'react'
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>¡Bienvenido, {user?.fullName || user?.email}!</h1>
      <section style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '1rem', minWidth: 200 }}>
          <h2>Alojamientos</h2>
          <p>Gestiona tus alojamientos publicados.</p>
        </div>
        <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '1rem', minWidth: 200 }}>
          <h2>Reservas</h2>
          <p>Consulta y administra tus reservas.</p>
        </div>
        <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '1rem', minWidth: 200 }}>
          <h2>Perfil</h2>
          <p>Actualiza tu información personal.</p>
        </div>
      </section>
      <p style={{ color: '#888' }}>
        Usa el menú lateral para navegar entre las secciones del dashboard.
      </p>
    </div>
  );
}
