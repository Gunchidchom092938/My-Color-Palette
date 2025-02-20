"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import "../../css/custom-color-picker.css";
import "../../css/style.css";
import { useMessage } from "@/context/MessageContext";

interface CardProps {
    key: number;
    data: {
        id: number;
        name: string;
        colors: { color: string; weight: number }[];
    };
    onUpdate: (
        id: number,
        newData: Partial<{
            name: string;
            colors: { color: string; weight: number }[];
        }>
    ) => void;

    onDelete: (id: number) => void;
}

const ColorMixer = (prop: CardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [paletteName, setPaletteName] = useState(prop.data.name);
    const [colors, setColors] = useState(prop.data.colors);

    const { addMessage } = useMessage();

    const handleColorChange = (index: number, newColor: string) => {
        const newColors = [...colors];
        newColors[index].color = newColor;
        setColors(newColors);
        prop.onUpdate(prop.data.id, { colors: newColors });
    };

    const handleNameChange = (newName: string) => {
        setPaletteName(newName);
        prop.onUpdate(prop.data.id, { name: newName });
    };

    const handleWeightChange = (index: number, newWeight: number) => {
        const newColors = [...colors];
        newColors[index].weight = Math.max(0, Math.min(100, newWeight));
        setColors(newColors);
    };

    const addColor = () => {
        if (colors.length < 5) {
            setColors([...colors, { color: "#888888", weight: 20 }]);
        }
    };

    const removeColor = (index: number) => {
        if (colors.length > 2) {
            setColors(colors.filter((_, i) => i !== index));
        }
    };

    const mixColors = () => {
        const totalWeight = colors.reduce((sum, c) => sum + c.weight, 0);
        let [r, g, b] = [0, 0, 0];

        colors.forEach(({ color, weight }) => {
            const ratio = weight / totalWeight;
            const [cr, cg, cb] = color
                .match(/\w\w/g)!
                .map((c) => parseInt(c, 16));
            r += cr * ratio;
            g += cg * ratio;
            b += cb * ratio;
        });

        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    };

    const rgbToHex = (rgb: string) => {
        const result = rgb
            .match(/\d+/g)
            ?.map((num) => parseInt(num).toString(16).padStart(2, "0"));
        return result ? `#${result.join("")}` : "#000000";
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const mixedRGB = mixColors();
    const mixedHex = rgbToHex(mixedRGB);

    return (
        <div>
            <div className="p-4 drop-shadow-lg shadow-lg rounded-t-lg bg-[#F8F8FF]">
                <div className="flex justify-center items-center gap-2 pb-4">
                    {isEditing ? (
                        <input
                            type="text"
                            value={paletteName}
                            onChange={(e) => handleNameChange(e.target.value)}
                            onBlur={() => setIsEditing(false)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") setIsEditing(false);
                            }}
                            autoFocus
                            className="text-xl font-extrabold text-center border-b-2 border-gray-400 focus:border-blue-500 outline-none"
                        />
                    ) : (
                        <h2
                            className="text-xl font-extrabold text-center cursor-pointer"
                            onClick={() => setIsEditing(true)}
                        >
                            {paletteName}
                        </h2>
                    )}
                    <Pencil
                        className="cursor-pointer text-gray-500 hover:text-black"
                        size={18}
                        onClick={() => setIsEditing(true)}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 min-h-[280px]">
                    {colors.map((c, i: number) => (
                        <div
                            key={i}
                            className="flex flex-col items-center min-w-fit drop-shadow-md"
                        >
                            <section className="small custom-pointers-small color-pick-rounded color-pick-rounded-saturation">
                                <HexColorPicker
                                    color={c.color}
                                    onChange={(color) =>
                                        handleColorChange(i, color)
                                    }
                                />
                            </section>
                            <div className="flex min-h-6 w-full">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={c.weight}
                                    onChange={(e) =>
                                        handleWeightChange(
                                            i,
                                            Number(e.target.value)
                                        )
                                    }
                                    className={`flex-1 ${
                                        i !== 0 && i !== 1
                                            ? "rounded-bl"
                                            : "rounded-b"
                                    }`}
                                />

                                {i !== 0 && i !== 1 && (
                                    <button
                                        onClick={() => removeColor(i)}
                                        className="bg-red-500 text-white rounded-l-none rounded-br px-2"
                                        disabled={colors.length <= 2}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="min-h-[50px] duration-100">
                    <button
                        disabled={colors.length >= 5}
                        onClick={addColor}
                        className={`w-full p-2 font-semibold  text-white rounded ${
                            colors.length >= 5
                                ? "bg-[#5C5858]"
                                : "bg-black active:bg-white active:text-black active:border-black active:border-2 "
                        } `}
                    >
                        + Add Color
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center bg-white shadow-lg drop-shadow-xl rounded-b-lg pt-2 pb-4 px-4 gap-2">
                <div className="flex w-full gap-4 justify-between">
                    <div
                        className="flex self-center min-h-16 min-w-16 max-h-20 max-w-20  md:min-h-20  md:min-w-20 aspect-square rounded-full"
                        style={{
                            backgroundColor: mixColors(),
                        }}
                    />

                    <div className="flex flex-col">
                        <div className="text-xl font-medium">Mixed Color</div>

                        <div className="flex flex-col">
                            <div>
                                Hex:{" "}
                                <span
                                    className="cursor-pointer text-blue-600"
                                    onClick={() => {
                                        copyToClipboard(mixedHex);
                                        addMessage(
                                            "success",
                                            mixedHex + " copied"
                                        );
                                    }}
                                >
                                    {mixedHex}
                                </span>
                            </div>
                            <div>
                                RGB:{" "}
                                <span
                                    className="cursor-pointer text-blue-600"
                                    onClick={() => {
                                        copyToClipboard(mixedRGB);
                                        addMessage(
                                            "success",
                                            mixedRGB + " copied"
                                        );
                                    }}
                                >
                                    {mixedRGB}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="items-center justify-center flex">
                        <Trash2
                            className="cursor-pointer text-red-500 hover:text-red-700 "
                            size={20}
                            onClick={() => prop.onDelete(prop.data.id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorMixer;
