import React, { createContext, useReducer, useContext, useCallback, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { appKit } from '../config/reown';
import { ActionTypes } from './types';
import { 
  initialState, 
  setLoading, 
  setError, 
  clearError,
  setENSName,
  setENSNames,
} from './AppReducer';

// Create context
const AppContext = createContext(initialState);

// Provider component
export const AppProvider = ({ children, reducer }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Handle wallet connection changes
  useEffect(() => {
    if (isConnected && address) {
      // Use the imported setUser action creator
      dispatch({
        type: ActionTypes.SET_USER,
        payload: { address }
      });
      // Optionally fetch ENS name here if needed
    } else {
      dispatch({ type: ActionTypes.CLEAR_USER });
    }
  }, [isConnected, address]);

  // Connect wallet function
  const connectWallet = useCallback(async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      dispatch({ type: ActionTypes.CLEAR_ERROR });
      await appKit.connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      dispatch({ 
        type: ActionTypes.SET_ERROR, 
        payload: error.message || 'Failed to connect wallet' 
      });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  }, []);

  // Disconnect wallet function
  const disconnectWallet = useCallback(() => {
    try {
      disconnect();
      dispatch({ type: ActionTypes.CLEAR_USER });
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      dispatch({ 
        type: ActionTypes.SET_ERROR, 
        payload: error.message || 'Failed to disconnect wallet' 
      });
    }
  }, [disconnect]);

  // Set ENS name for an address
  const updateENSName = useCallback((address, name) => {
    dispatch({ 
      type: ActionTypes.SET_ENS_NAME, 
      payload: { address, name } 
    });
  }, []);

  // Set multiple ENS names at once
  const updateENSNames = useCallback((names) => {
    dispatch({ 
      type: ActionTypes.SET_ENS_NAMES, 
      payload: names 
    });
  }, []);

  // Get ENS name for an address
  const getENSName = useCallback((address) => {
    if (!address) return null;
    return state.ens.names[address.toLowerCase()] || null;
  }, [state.ens.names]);

  // Format address with or without ENS name
  const formatAddress = useCallback((address, showFull = false) => {
    if (!address) return '';
    
    const ensName = getENSName(address);
    if (ensName) return ensName;
    
    if (showFull) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [getENSName]);

  // Value to be provided by the context
  const value = {
    state,
    isConnected: state.user.isConnected,
    user: state.user,
    isLoading: state.ui.isLoading,
    error: state.ui.error,
    currentPage: state.ui.currentPage,
    isMobileMenuOpen: state.ui.isMobileMenuOpen,
    conversations: state.chat.conversations,
    activeConversation: state.chat.activeConversation,
    messages: state.chat.messages,
    ensNames: state.ens.names,
    
    // Actions
    connectWallet,
    disconnectWallet,
    setLoading: (isLoading) => dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading }),
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: ActionTypes.CLEAR_ERROR }),
    setENSName: updateENSName,
    setENSNames: updateENSNames,
    getENSName,
    formatAddress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
