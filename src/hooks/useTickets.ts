import { useState, useEffect } from 'react';
import { TicketsState, User } from '@/types';

export function useTickets(user: User | null) {
    const [tickets, setTickets] = useState<TicketsState>({
        main: false,
        additional: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'demo';
            const result = localStorage.getItem(`tickets:${userId}`);
            if (result) {
                setTickets(JSON.parse(result));
            }
        } catch (error) {
            console.log('Primeira vez do utilizador');
        }
        setLoading(false);
    };

    const saveTickets = async (newTickets: TicketsState) => {
        try {
            if (!user) return;
            const userId = user.id;
            localStorage.setItem(`tickets:${userId}`, JSON.stringify(newTickets));
            setTickets(newTickets);

            if (window.Telegram?.WebApp) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
            }
        } catch (error) {
            console.error('Erro ao guardar:', error);
        }
    };

    const toggleMainTicket = () => {
        const newTickets = { ...tickets, main: !tickets.main };
        saveTickets(newTickets);
    };

    const updateAdditionalTickets = (newAdditional: TicketsState['additional']) => {
        saveTickets({ ...tickets, additional: newAdditional });
    };

    return {
        tickets,
        loading,
        toggleMainTicket,
        updateAdditionalTickets
    };
}
