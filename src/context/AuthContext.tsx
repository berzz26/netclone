import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '../types';

// Define action types
type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

// Create initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

// Create reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

// Create auth context
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create auth provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing user session on app load
  useEffect(() => {
    const checkUserSession = () => {
      const storedUser = localStorage.getItem('netflix_user');
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('netflix_user');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkUserSession();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check for demo credentials
      if (email === 'user@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          email: email,
          name: 'Demo User'
        };
        
        localStorage.setItem('netflix_user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return true;
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
   
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user: User = {
        id: Date.now().toString(),
        email,
        name
      };
      
      localStorage.setItem('netflix_user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('netflix_user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};