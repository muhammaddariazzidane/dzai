import { SiGooglegemini } from "react-icons/si";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center">
            <SiGooglegemini
                size={100}
                className="text-sky-500 mx-auto animate-pulse opacity-80"
            />
        </div>
    );
}