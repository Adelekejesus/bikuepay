import { createContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = useCallback((userData) => {
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;