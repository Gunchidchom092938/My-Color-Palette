import Favicon from "../favicon.ico";
import { MessageProvider } from "../../context/MessageContext";

export const metadata = {
    title: "Color Mixer",
    description: "A color mixer app",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default async function LocaleLayout({ children }) {
    return (
        <div>
            <MessageProvider>{children}</MessageProvider>
        </div>
    );
}
