import { useState } from 'react';

export const useNotificationModal = () => {
    const [notificationModalMsg, setNotificationModalMsg] =
        useState<string>('');
    const [notificationModalType, setNotificationModalType] =
        useState<string>('');
    const [notificationModalActive, setNotificationModalActive] =
        useState<boolean>(false);

    const showNotification = (message: string, type: string) => {
        setNotificationModalMsg(message);
        setNotificationModalType(type);
        setNotificationModalActive(true);
        setTimeout(() => setNotificationModalActive(false), 2000);
    };

    return {
        notificationModalMsg,
        notificationModalType,
        notificationModalActive,
        showNotification,
    };
};
