import ProtectedRoute from "@/app/dashboard/guard/ProtectedRoute";
import Navbar from "@/components/ui/Navbar";
import DashboardAside from '@/components/ui/DashboardAside';

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <ProtectedRoute>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Navbar />
          <DashboardAside />
          <main style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
            {children}
          </main>
        </div>
      </ProtectedRoute>
    </>
  )
}
