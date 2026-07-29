import SearchHeader from "@/components/layout/SearchHeader";
import Sidebar from "@/components/layout/Sidebar";
import { ReactNode } from "react";


type DashboardLayoutProps = {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-content">
                <SearchHeader />

                <main className="dashboard-main">{children}</main>
            </div>
        </div>
    )
}
