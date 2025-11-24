import { useAccount, useDisconnect } from 'wagmi';
import { appKit } from '../config/reown';

export function WalletConnectButton() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      await appKit.connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
    >
      Connect Wallet
    </button>
  );
}
