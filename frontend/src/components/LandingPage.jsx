import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const LandingPage = ({ onNavigate }) => {
    const { address, isConnected } = useAccount();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Ambience Chat
                </h1>
                <p className="text-gray-600 mb-8">
                    Connect your wallet to register your custom ENS name and start chatting
                </p>
                
                <div className="space-y-6">
                    <ConnectButton />
                    
                    {isConnected && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => onNavigate('register')}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Register ENS Name
                                </button>
                                <button
                                    onClick={() => onNavigate('users')}
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    View Users & Chat
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
