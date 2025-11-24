import { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAppContext } from './context/AppContext';
import { useAccount } from 'wagmi';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import UsersPage from './components/UsersPage';

function App() {
  const { 
    state: { ui, user },
    setLoading,
    setError,
    clearError,
    formatAddress,
    connectWallet,
    disconnectWallet,
  } = useAppContext();
  
  const { isConnected, address } = useAccount();
  const { currentPage, isMobileMenuOpen } = ui;
  
  // Handle wallet connection changes
  useEffect(() => {
    if (isConnected && address) {
      // Update user state when wallet connects
      setUser({ address });
    } else if (!isConnected && currentPage !== 'landing') {
      // Redirect to landing if disconnected and not already there
      handleNavigate('landing');
    }
  }, [isConnected, address, currentPage]);

  // Handle page navigation
  const handleNavigate = (page) => {
    // Update the current page in the state
    // Note: In a real implementation, you would dispatch an action to update the state
    // For now, we'll just log it
    console.log(`Navigating to: ${page}`);
    
    // Close mobile menu when navigating
    if (isMobileMenuOpen) {
      // In a real implementation, you would dispatch an action to close the menu
      console.log('Closing mobile menu');
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    // In a real implementation, you would dispatch an action to toggle the menu
    console.log('Toggling mobile menu');
  };

  // Navigation links for authenticated users
  const navLinks = user.isConnected ? (
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

  // Render the appropriate page based on currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'users':
        return <UsersPage onNavigate={handleNavigate} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Ambience Chat</h1>
              {user.isConnected && (
                <div className="hidden md:block ml-10">
                  {navLinks}
                </div>
              )}
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {user.isConnected ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    {formatAddress(user.address)}
                  </span>
                  <button
                    onClick={disconnectWallet}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
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
              {user.isConnected && (
                <>
                  {navLinks}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex flex-col space-y-2">
                      <div className="px-4 py-2 text-sm text-gray-700">
                        Connected: {formatAddress(user.address, true)}
                      </div>
                      <button
                        onClick={disconnectWallet}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors text-center"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              {!user.isConnected && (
                <button
                  onClick={connectWallet}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors text-center"
                >
                  Connect Wallet
                </button>
              )}
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
      
      {/* Loading overlay */}
      {ui.isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span>Loading...</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Error toast */}
      {ui.error && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg max-w-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">Error</p>
                <p className="text-sm">{ui.error}</p>
              </div>
              <button 
                onClick={clearError}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
