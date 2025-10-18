export const getUsernameFromSession = () => {
    try {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user).username : '';
    } catch (error) {
        return '';
    }
};

export const getUserIdFromSession = () => {
    try {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user).user_id : '';
    } catch (error) {
        return '';
    }
};
