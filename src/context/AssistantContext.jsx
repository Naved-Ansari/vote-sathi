import { createContext, useContext, useReducer } from 'react';

const AssistantContext = createContext();

const initialState = {
  step: 0,
  totalSteps: 5,
  messages: [],
  userProfile: {
    isFirstTime: null,
    age: null,
    state: null,
    isRegistered: null,
    hasVoterId: null,
  },
  isComplete: false,
  isTyping: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'SET_PROFILE':
      return { ...state, userProfile: { ...state.userProfile, ...action.payload } };
    case 'SET_COMPLETE':
      return { ...state, isComplete: true };
    case 'RESET':
      return { ...initialState, messages: [] };
    default:
      return state;
  }
}

export function AssistantProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addBotMessage = (text, options = null, type = 'bot') => {
    dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), sender: 'bot', text, options, type, timestamp: new Date() } });
  };

  const addUserMessage = (text) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), sender: 'user', text, timestamp: new Date() } });
  };

  const setTyping = (v) => dispatch({ type: 'SET_TYPING', payload: v });
  const nextStep = () => dispatch({ type: 'NEXT_STEP' });
  const setProfile = (data) => dispatch({ type: 'SET_PROFILE', payload: data });
  const setComplete = () => dispatch({ type: 'SET_COMPLETE' });
  const reset = () => dispatch({ type: 'RESET' });

  return (
    <AssistantContext.Provider value={{ ...state, addBotMessage, addUserMessage, setTyping, nextStep, setProfile, setComplete, reset }}>
      {children}
    </AssistantContext.Provider>
  );
}

export const useAssistant = () => useContext(AssistantContext);
