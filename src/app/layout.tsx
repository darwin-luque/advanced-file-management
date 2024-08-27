import "@/styles/globals.css";
import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HydrateClient } from "@/trpc/server";

export const metadata: Metadata = {
  title: "Advanced Note Taking App",
  description: "This is a note taking app created by Darwin Luque (HN)",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <ThemeProvider
            enableSystem
            disableTransitionOnChange
            attribute="class"
            defaultTheme="system"
          >
            <TRPCReactProvider>
              <HydrateClient>
                <TooltipProvider>
                  {children}
                  <Toaster richColors closeButton />
                </TooltipProvider>
              </HydrateClient>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
