import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),

    login: (username, password) => {
        // Frontend simulation
        const token = 'token_' + Date.now();
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
        
        set({
            user: { username },
            token,
            isAuthenticated: true,
        });
    },

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },

    loadUser: () => {
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');
        
        if (token && username) {
            set({
                user: { username },
                token,
                isAuthenticated: true,
            });
        }
    },
}));