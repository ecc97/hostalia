import ProtectedRoute from "@/app/dashboard/guard/ProtectedRoute";
import Navbar from "@/components/ui/Navbar";
import DashboardAside from '@/components/ui/DashboardAside';

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <ProtectedRoute>
        <div className="flex flex-col dashboard-layout">
          <Navbar />
          <DashboardAside />
          <main>
            {children}
          </main>
        </div>
      </ProtectedRoute>
    </>
  )
}
