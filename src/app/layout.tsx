import Footer from "@/app/(home)/footer";
import Header from "@/app/(home)/header";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});


export const metadata: Metadata = {
    title: "NotesHub | Notes Sharing Platform",
    description: "A platform for sharing and collaborating on notes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} antialiased scroll-smooth`}>
                <main className="min-h-screen flex flex-col bg-darkgreen-50">
                    <Header />
                    {children}
                    <Footer />
                </main>
                <Toaster />
                <Analytics mode="production" />
            </body>
        </html>
    );
}
