import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
            <body>
                <main className="min-h-screen flex flex-col bg-darkgreen-50">
                    <Header />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
