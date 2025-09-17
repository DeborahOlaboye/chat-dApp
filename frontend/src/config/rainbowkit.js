import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { liskSepolia } from "wagmi/chains";
import { http } from "viem";

export const config = getDefaultConfig({
    appName: "Ambience Chat DApp",
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    chains: [liskSepolia],
    transports: {
        [liskSepolia.id]: http(import.meta.env.VITE_RPC_URL),
    },
});