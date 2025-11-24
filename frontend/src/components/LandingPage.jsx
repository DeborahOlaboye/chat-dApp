import { useAccount } from 'wagmi';
import { WalletConnectButton } from './WalletConnectButton';
import { ArrowRight } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
    const { address, isConnected } = useAccount();

    // Format address for better mobile display
    const formatAddress = (addr) => {
        if (!addr) return '';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Welcome to Ambience Chat
                    </h1>
                    <p className="text-blue-100 text-sm md:text-base">
                        Connect your wallet to get started with decentralized messaging
                    </p>
                </div>
                
                {/* Main Content */}
                <div className="p-6 md:p-8">
                    {!isConnected ? (
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-gray-600 mb-6">
                                    Connect your wallet to register your custom ENS name and start chatting
                                    with other users in a decentralized way.
                                </p>
                                <div className="flex justify-center">
                                    <WalletConnectButton />
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h3 className="text-sm font-medium text-gray-500 mb-3">
                                    Why choose Ambience Chat?
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Decentralized and secure messaging</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Custom ENS names for easy addressing</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>No central server storing your messages</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {address?.slice(2, 4).toUpperCase()}
                                    </span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                    Welcome back!
                                </h2>
                                <p className="text-sm text-gray-500 mb-6">
                                    Connected as {formatAddress(address)}
                                </p>
                            </div>
                            
                            <div className="space-y-3">
                                <button
                                    onClick={() => onNavigate('register')}
                                    className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:translate-y-0"
                                >
                                    <span>Register ENS Name</span>
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                                
                                <button
                                    onClick={() => onNavigate('users')}
                                    className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:translate-y-0"
                                >
                                    <span>View Users & Start Chatting</span>
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="text-center text-xs text-gray-500">
                                    Need help? Check out our <a href="#" className="text-blue-600 hover:underline">FAQ</a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 text-center">
                    <p className="text-xs text-gray-500">
                        By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
