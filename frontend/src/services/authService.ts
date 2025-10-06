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
        body: JSON.stringify({ username, password }),
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

// función que verifica la validez del token
export const verifyTokenservice = async (): Promise<boolean> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return false;

        const res = await fetch('http://localhost:3000/api/auth/verify', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) return false;

        return true;
    } catch (error) {
        console.error('Error verificando el token: ', error);
        return false;
    }
};
