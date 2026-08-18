import type { Metadata } from 'next';
import Sidebar from '@/components/shared/Sidebar';
import Header from '@/components/shared/Header';
import RightWidgetPanel from '@/components/shared/RightWidgetPanel';
import ClientProviders from '@/components/providers/ClientProviders';
import PageVoicePlayer from '@/components/shared/PageVoicePlayer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Haath+ — Artisan Intelligence System',
  description: 'AI-powered artisan intelligence platform uniting Indian craftspeople with global markets.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F9F9F7] text-[#1C1C1E] font-sans antialiased min-h-screen flex p-3 sm:p-4 gap-6 relative">
        <ClientProviders>
          {/* Left Fixed Dark Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 pt-4 pb-6 flex flex-col lg:flex-row gap-6 overflow-y-auto">
              <div className="flex-1 min-w-0 space-y-6">{children}</div>
              {/* Right Widget Panel (Calendar & Timeline) */}
              <RightWidgetPanel />
            </main>
          </div>

          {/* Global Page Voice Audio Story Player Floating Widget */}
          <PageVoicePlayer />
        </ClientProviders>
      </body>
    </html>
  );
}
