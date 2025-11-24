import { createConfig, http } from 'wagmi';
import { liskSepolia } from 'wagmi/chains';
import { AppKit } from '@reown/appkit';

// Initialize AppKit
const appKit = new AppKit({
  appName: 'Ambience Chat DApp',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
});

// Create the wagmi config
export const config = createConfig({
  chains: [liskSepolia],
  transports: {
    [liskSepolia.id]: http(import.meta.env.VITE_RPC_URL),
  },
  ...appKit.getWagmiConfig(), // Use AppKit's wagmi config
});

// Export the AppKit instance for use in components
export { appKit };
