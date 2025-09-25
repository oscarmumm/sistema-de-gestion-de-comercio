export interface LoginResponse {
    token: string;
    user?: {
        id: number;
        username: string;
        role?: string;
    };
}

export const loginRequest = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Credenciales incorrectas');
    }
    return res.json();
};

export const logoutRequest = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};
