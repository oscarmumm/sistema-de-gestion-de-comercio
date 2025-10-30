import {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    subWeeks,
    subMonths,
    format,
} from 'date-fns';

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

export const getDateRange = (period: string) => {
    const now = new Date();
    switch (period) {
        case 'currentWeek': {
            const from = startOfWeek(now, { weekStartsOn: 1 });
            const until = endOfWeek(now, { weekStartsOn: 1 });
            return {
                from: format(from, 'yyyy-MM-dd'),
                until: format(until, 'yyyy-MM-dd'),
            };
        }
        case 'previousWeek': {
            const lastWeek = subWeeks(now, 1);
            const from = startOfWeek(lastWeek, { weekStartsOn: 1 });
            const until = endOfWeek(lastWeek, { weekStartsOn: 1 });
            return {
                from: format(from, 'yyyy-MM-dd'),
                until: format(until, 'yyyy-MM-dd'),
            };
        }
        case 'currentMonth': {
            const from = startOfMonth(now);
            const until = endOfMonth(now);
            return {
                from: format(from, 'yyyy-MM-dd'),
                until: format(until, 'yyyy-MM-dd'),
            };
        }
        case 'previousMonth': {
            const lastMonth = subMonths(now, 1);
            const from = startOfMonth(lastMonth);
            const until = endOfMonth(lastMonth);
            return {
                from: format(from, 'yyyy-MM-dd'),
                until: format(until, 'yyyy-MM-dd'),
            };
        }
        default:
            throw new Error('Período desconocido');
    }
};

export const formatMoney = (
    amount: number,
    currency: string = 'ARS'
): string => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};
