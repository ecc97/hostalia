import ProtectedRoute from "@/app/dashboard/guard/ProtectedRoute";
import Navbar from "@/components/ui/Navbar";

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <ProtectedRoute>
        <Navbar />
        {children}
      </ProtectedRoute>
    </>
  )
}
