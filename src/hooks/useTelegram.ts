import { useState, useEffect } from 'react';
import { User } from '@/types';

export function useTelegram() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@telegram-apps/telegram-ui@2.1.8/dist/styles.css';
        document.head.appendChild(link);

        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();

            // Detectar e aplicar o tema do Telegram
            const colorScheme = tg.colorScheme || 'light';
            const bgColor = tg.themeParams.bg_color || (colorScheme === 'dark' ? '#000000' : '#ffffff');
            const headerColor = tg.themeParams.bg_color || (colorScheme === 'dark' ? '#000000' : '#ffffff');

            tg.setHeaderColor(headerColor);
            tg.setBackgroundColor(bgColor);

            // Aplicar CSS custom properties do Telegram
            if (tg.themeParams) {
                const root = document.documentElement;
                root.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
                root.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
                root.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#999999');
                root.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#3390ec');
                root.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#3390ec');
                root.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
                root.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color || '#f4f4f5');
                root.style.setProperty('--tg-theme-header-bg-color', tg.themeParams.header_bg_color || '#ffffff');
                root.style.setProperty('--tg-theme-section-bg-color', tg.themeParams.section_bg_color || '#ffffff');
                root.style.setProperty('--tg-theme-destructive-text-color', tg.themeParams.destructive_text_color || '#ff3b30');
            }

            // Listener para mudanças de tema
            tg.onEvent('themeChanged', () => {
                const newColorScheme = tg.colorScheme || 'light';
                const newBgColor = tg.themeParams.bg_color || (newColorScheme === 'dark' ? '#000000' : '#ffffff');
                tg.setHeaderColor(newBgColor);
                tg.setBackgroundColor(newBgColor);

                if (tg.themeParams) {
                    const root = document.documentElement;
                    root.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
                    root.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
                    root.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#999999');
                    root.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#3390ec');
                    root.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#3390ec');
                    root.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
                    root.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color || '#f4f4f5');
                    root.style.setProperty('--tg-theme-header-bg-color', tg.themeParams.header_bg_color || '#ffffff');
                    root.style.setProperty('--tg-theme-section-bg-color', tg.themeParams.section_bg_color || '#ffffff');
                    root.style.setProperty('--tg-theme-destructive-text-color', tg.themeParams.destructive_text_color || '#ff3b30');
                }
            });

            const telegramUser = tg.initDataUnsafe?.user;
            if (telegramUser) {
                setUser({
                    id: telegramUser.id,
                    firstName: telegramUser.first_name,
                    lastName: telegramUser.last_name,
                    username: telegramUser.username
                });
            } else {
                setUser({
                    id: 'demo',
                    firstName: 'Demo',
                    lastName: 'User',
                    username: 'demouser'
                });
            }
        } else {
            setUser({
                id: 'demo',
                firstName: 'Demo',
                lastName: 'User',
                username: 'demouser'
            });
        }
    }, []);

    return { user };
}
