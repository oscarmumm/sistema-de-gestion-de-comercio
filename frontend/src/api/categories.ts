export const getCategories = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3000/api/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Error al obtener categorías');
    }
    const data = await res.json();
    return data;
};
