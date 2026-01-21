import { Providers } from "@/components/providers/Providers";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background">
          <AdminHeader />
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </div>
      </ThemeProvider>
    </Providers>
  );
}

export default AdminLayout;