import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AdminSidebar } from './admin/AdminSidebar'
import { AdminTopbar } from './admin/AdminTopbar'

export { AdminGrid, AdminGridSidebar, AdminPage } from './admin/AdminPage'

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-canvas">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-[248px]">
        <AdminTopbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
