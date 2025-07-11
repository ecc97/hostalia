'use client';
import Link from 'next/link';
import { useAuthStore } from '../../store/authStore';
import { useAsideStore } from '../../store/asideStore';
import { LuArrowLeftFromLine } from 'react-icons/lu';

export default function DashboardAside() {
    const { user, logout } = useAuthStore();
    const { isOpen, closeAside } = useAsideStore();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className={`dashboard-aside ${isOpen ? 'open' : 'closed'} bg-black/50`} onClick={closeAside}>
            <aside className={`sidebar-container ${isOpen ? 'open' : 'closed'}`} onClick={(e) => e.stopPropagation()}>
                {isOpen && (
                    <button className="aside-toggle" onClick={closeAside} title="Cerrar menú">
                        <LuArrowLeftFromLine size={22} />
                    </button>
                )}
                <div className="flex items-center">
                    <Link href="/" className={`text-2xl font-bold hover:text-blue-200 transition-colors text-white`}>
                        🏠 Hostalia
                    </Link>
                </div>

                <nav className='grow'>
                    <ul className='items-link flex flex-col justify-center h-full'>
                        <li className='md:hidden'><Link href="/dashboard" onClick={closeAside}>Dashboard</Link></li>
                        <li><Link href="/dashboard/accommodations" onClick={closeAside}>Alojamientos</Link></li>
                        <li><Link href="/dashboard/bookings" onClick={closeAside}>Reservas</Link></li>
                        <li><Link href="/dashboard/my-bookings" onClick={closeAside}>Mis reservas</Link></li>
                    </ul>
                </nav>
                <div className="user-info">
                    <span>👤 {user?.fullName || user?.email || 'Usuario'}</span>
                    <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </aside>
        </div>
    );
}
