import Favicon from "../favicon.ico";

export const metadata = {
    title: "Color Mixer",
    description: "A color mixer app",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default async function LocaleLayout({ children }) {
    return <div>{children}</div>;
}
