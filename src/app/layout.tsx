import "./globals.css";
import { Kanit } from "next/font/google";
import Favicon from "./favicon.ico";

export const metadata = {
    title: "MY COLOR PALETTE",
    description: "My color palette",
    icons: [{ rel: "icon", url: Favicon.src }],
    openGraph: {
        title: "MY COLOR PALETTE",
        description: "MY COLOR PALETTE",
        image: Favicon.src,
        url: "https://my-palette.com",
    },
    twitter: {
        description: "HAPPY VALENTINE'S DAY",
        image: Favicon.src,
    },
};

export const generateViewport = () => ({
    width: "device-width",
    initialScale: 1.0,
});

const kanit = Kanit({
    weight: "300",
    subsets: ["latin", "latin-ext", "thai"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`bg-gray-100 ${kanit.className}`}>
                <header className="p-4 bg-black text-white text-center">
                    <h1>🎨 Color Mixer</h1>
                </header>
                <main className="flex flex-col items-center min-h-screen">
                    {children}
                </main>
                <footer className="p-4 text-center text-gray-500">
                    © 2025 Color Mixer
                </footer>
            </body>
        </html>
    );
}
