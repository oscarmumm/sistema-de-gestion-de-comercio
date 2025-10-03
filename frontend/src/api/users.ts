export const getUsers = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application-json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Error al obtener usuarios');
    }
    const data = await res.json();
    return data;
};
