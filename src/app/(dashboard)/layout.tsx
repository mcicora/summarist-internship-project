import SearchHeader from "@/components/layout/SearchHeader";
import Sidebar from "@/components/layout/Sidebar";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <SearchHeader />

          <main className="dashboard-main">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
