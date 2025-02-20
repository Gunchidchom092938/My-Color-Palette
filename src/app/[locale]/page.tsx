"use client";

import { useState } from "react";
import ColorMixer from "../containers/colorPalette";
import { Plus } from "lucide-react";

export default function Home() {
    const [colorMixers, setColorMixers] = useState([
        {
            id: 1,
            name: "Color Mixer 1",
            colors: [
                { color: "#000000", weight: 50 },
                { color: "#ffffff", weight: 50 },
            ],
        },
    ]);

    console.log(colorMixers, "colorMixers");

    const addColorMixer = () => {
        setColorMixers([
            ...colorMixers,
            {
                id: Date.now(),
                name: `Color Mixer ${colorMixers.length + 1}`,
                colors: [
                    { color: "#888888", weight: 50 },
                    { color: "#ffffff", weight: 50 },
                ],
            },
        ]);
    };

    const updateColorMixer = (
        id: number,
        newData: Partial<{
            name: string;
            colors: { color: string; weight: number }[];
        }>
    ) => {
        setColorMixers((prevMixers) =>
            prevMixers.map((mixer) =>
                mixer.id === id ? { ...mixer, ...newData } : mixer
            )
        );
    };

    const deleteColorMixer = (id: number) => {
        setColorMixers((prevMixers) =>
            prevMixers.filter((mixer) => mixer.id !== id)
        );
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {colorMixers.map((mixer) => (
                    <ColorMixer
                        key={mixer.id}
                        data={mixer}
                        onUpdate={updateColorMixer}
                        onDelete={deleteColorMixer}
                    />
                ))}
            </div>
            <button
                onClick={addColorMixer}
                className="fixed top-16 right-2 w-14 h-14 bg-gray-200 text-black rounded-full flex items-center justify-center shadow-xl hover:bg-gray-800 focus:outline-none"
            >
                <Plus size={28} />
            </button>
        </div>
    );
}
