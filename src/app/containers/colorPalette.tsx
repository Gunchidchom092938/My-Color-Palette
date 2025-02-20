"use client";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const ColorMixer = () => {
    const [colors, setColors] = useState([
        { color: "#000000", weight: 50 },
        { color: "#ffffff", weight: 50 },
    ]);

    const handleColorChange = (index: number, newColor: string) => {
        const newColors = [...colors];
        newColors[index].color = newColor;
        setColors(newColors);
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

    console.log(mixColors(), "mixColors");

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold text-center">
                Your Color Palette
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {colors.map((c, i: number) => (
                    <div
                        key={i}
                        className="flex flex-col items-center"
                    >
                        <HexColorPicker
                            className="w-16 h-16"
                            color={c.color}
                            onChange={(color) => handleColorChange(i, color)}
                        />
                        <div className="flex w-full">
                            <input
                                type="number"
                                value={c.weight}
                                onChange={(e) =>
                                    handleWeightChange(
                                        i,
                                        Number(e.target.value)
                                    )
                                }
                                className="border p-1 w-16 text-center flex-1"
                            />

                            {i !== 0 && i !== 1 && (
                                <button
                                    onClick={() => removeColor(i)}
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                    disabled={colors.length <= 2}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {colors.length !== 5 && (
                <button
                    onClick={addColor}
                    className="w-full p-2 bg-blue-500 text-white rounded"
                >
                    + Add Color
                </button>
            )}
            <div className="w-full flex flex-col items-center">
                <div className="text-xl font-medium">Mixed Color</div>
                <div
                    className="h-40 w-40  bottom-1 border-2 rounded mt-4  flex items-center"
                    style={{
                        backgroundColor: mixColors(),
                    }}
                />
            </div>
            {/* <p className="text-center font-bold">Mixed Color: {mixColors()}</p> */}
        </div>
    );
};

export default ColorMixer;
