import "./globals.css";
import "../css/message.css";

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
            <body className={`bg-[#B6B6B4] ${kanit.className}`}>
                <header className="p-4 bg-black text-xl text-white text-center fixed w-full top-0 z-10">
                    <h1>🎨 Color Mixer</h1>
                </header>
                <main className="flex flex-col items-center min-h-[100vh] mt-20 mb-20">
                    {children}
                </main>
                <footer className="p-4 text-center bg-black text-white fixed w-full bottom-0 z-10">
                    © 2025 Color Mixer
                </footer>
            </body>
        </html>
    );
}
