import { useState } from 'react';
import { useAccount } from 'wagmi';
import { WalletConnectButton } from './components/WalletConnectButton';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import UsersPage from './components/UsersPage';

function App() {
    const [currentPage, setCurrentPage] = useState('landing');
    const { isConnected } = useAccount();

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

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

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-900">Ambience Chat</h1>
                    <WalletConnectButton />
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {renderPage()}
            </main>
        </div>
    );
}

export default App;
