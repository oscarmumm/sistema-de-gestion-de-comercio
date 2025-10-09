export const getUsernameFromSession = () => {
    try {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user).username : '';
    } catch (error) {
        return '';
    }
};
