import { ActionTypes } from './types';

// Initial state
const initialState = {
  // User state
  user: {
    address: null,
    ensName: null,
    isConnected: false,
  },
  
  // UI state
  ui: {
    isLoading: false,
    error: null,
    currentPage: 'landing',
    isMobileMenuOpen: false,
  },
  
  // Chat state
  chat: {
    conversations: [],
    activeConversation: null,
    messages: {},
  },
  
  // ENS state
  ens: {
    names: {},
  },
};

// Reducer function
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // User actions
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          isConnected: true,
        },
      };
      
    case ActionTypes.CLEAR_USER:
      return {
        ...state,
        user: {
          address: null,
          ensName: null,
          isConnected: false,
        },
        chat: {
          conversations: [],
          activeConversation: null,
          messages: {},
        },
      };
      
    // UI actions
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload,
        },
      };
      
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload,
        },
      };
      
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        ui: {
          ...state.ui,
          error: null,
        },
      };
      
    // Chat actions
    case ActionTypes.SET_CONVERSATIONS:
      return {
        ...state,
        chat: {
          ...state.chat,
          conversations: action.payload,
        },
      };
      
    case ActionTypes.ADD_MESSAGE: {
      const { conversationId, message } = action.payload;
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: {
            ...state.chat.messages,
            [conversationId]: [
              ...(state.chat.messages[conversationId] || []),
              message,
            ],
          },
        },
      };
    }
      
    case ActionTypes.SET_ACTIVE_CONVERSATION:
      return {
        ...state,
        chat: {
          ...state.chat,
          activeConversation: action.payload,
        },
      };
      
    // ENS actions
    case ActionTypes.SET_ENS_NAME: {
      const { address, name } = action.payload;
      return {
        ...state,
        ens: {
          ...state.ens,
          names: {
            ...state.ens.names,
            [address.toLowerCase()]: name,
          },
        },
      };
    }
      
    case ActionTypes.SET_ENS_NAMES:
      return {
        ...state,
        ens: {
          ...state.ens,
          names: {
            ...state.ens.names,
            ...action.payload,
          },
        },
      };
      
    default:
      return state;
  }
};

export { initialState, appReducer };

// Action creators
export const setUser = (userData) => ({
  type: ActionTypes.SET_USER,
  payload: userData,
});

export const clearUser = () => ({
  type: ActionTypes.CLEAR_USER,
});

export const setLoading = (isLoading) => ({
  type: ActionTypes.SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: ActionTypes.SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: ActionTypes.CLEAR_ERROR,
});

export const setConversations = (conversations) => ({
  type: ActionTypes.SET_CONVERSATIONS,
  payload: conversations,
});

export const addMessage = (conversationId, message) => ({
  type: ActionTypes.ADD_MESSAGE,
  payload: { conversationId, message },
});

export const setActiveConversation = (conversationId) => ({
  type: ActionTypes.SET_ACTIVE_CONVERSATION,
  payload: conversationId,
});

export const setENSName = (address, name) => ({
  type: ActionTypes.SET_ENS_NAME,
  payload: { address, name },
});

export const setENSNames = (names) => ({
  type: ActionTypes.SET_ENS_NAMES,
  payload: names,
});
