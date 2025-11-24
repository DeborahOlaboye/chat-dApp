import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { WalletConnectButton } from './components/WalletConnectButton';
import { Menu, X } from 'lucide-react';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import UsersPage from './components/UsersPage';

function App() {
    const [currentPage, setCurrentPage] = useState('landing');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isConnected } = useAccount();

    const handleNavigate = (page) => {
        setCurrentPage(page);
        setIsMobileMenuOpen(false); // Close mobile menu when navigating
    };

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isConnected && currentPage !== 'landing') {
        setCurrentPage('landing');
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'register':
                return <RegisterPage onNavigate={handleNavigate} />;
            case 'users':
                return <UsersPage onNavigate={handleNavigate} />;
            default:
                return <LandingPage onNavigate={handleNavigate} />;
        }
    };

    // Navigation links for authenticated users
    const navLinks = isConnected ? (
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <button
                onClick={() => handleNavigate('register')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
                Register ENS
            </button>
            <button
                onClick={() => handleNavigate('users')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
                View Users & Chat
            </button>
        </div>
    ) : null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">Ambience Chat</h1>
                            {isConnected && (
                                <div className="hidden md:block ml-10">
                                    {navLinks}
                                </div>
                            )}
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-4">
                            <WalletConnectButton />
                        </div>
                        
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {isConnected && navLinks}
                            <div className="pt-2 border-t border-gray-200">
                                <WalletConnectButton />
                            </div>
                        </div>
                    </div>
                )}
            </header>
            
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {renderPage()}
            </main>
            
            <footer className="bg-white border-t border-gray-200 mt-8">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Ambience Chat. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
