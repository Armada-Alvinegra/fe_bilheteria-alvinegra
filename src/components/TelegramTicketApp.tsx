'use client';

import React from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { useTickets } from '@/hooks/useTickets';
import { TicketHeader } from './TicketHeader';
import { MainTicket } from './MainTicket';
import { AdditionalTickets } from './AdditionalTickets';
import { TicketSummary } from './TicketSummary';
import { AdditionalTicket } from '@/types';
import styles from './TelegramTicketApp.module.css';

export default function TelegramTicketApp() {
    const { user } = useTelegram();
    const { tickets, loading, toggleMainTicket, updateAdditionalTickets } = useTickets(user);

    const getTotalTickets = () => {
        const mainCount = tickets.main ? 1 : 0;
        const additionalCount = tickets.additional.filter(t => t.reserved).length;
        return mainCount + additionalCount;
    };

    const handleAddAdditionalTicket = (ticket: AdditionalTicket) => {
        updateAdditionalTickets([...tickets.additional, ticket]);
    };

    const handleUpdateAdditionalTicket = (index: number, ticket: AdditionalTicket) => {
        const newAdditional = [...tickets.additional];
        newAdditional[index] = ticket;
        updateAdditionalTickets(newAdditional);
    };

    const handleRemoveAdditionalTicket = (index: number) => {
        const newAdditional = tickets.additional.filter((_, i) => i !== index);
        updateAdditionalTickets(newAdditional);
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div>A carregar...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <TicketHeader
                user={user}
                totalTickets={getTotalTickets()}
            />

            <MainTicket
                isReserved={tickets.main}
                onToggle={toggleMainTicket}
            />

            <AdditionalTickets
                tickets={tickets.additional}
                onAdd={handleAddAdditionalTicket}
                onUpdate={handleUpdateAdditionalTicket}
                onRemove={handleRemoveAdditionalTicket}
            />

            <TicketSummary
                tickets={tickets}
                totalTickets={getTotalTickets()}
            />

            <div style={{ height: '20px' }} />
        </div>
    );
}
