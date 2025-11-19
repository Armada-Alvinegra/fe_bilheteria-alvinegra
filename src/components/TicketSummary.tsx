import React from 'react';
import { TicketsState } from '@/types';
import styles from './TelegramTicketApp.module.css';

interface TicketSummaryProps {
    tickets: TicketsState;
    totalTickets: number;
}

export const TicketSummary: React.FC<TicketSummaryProps> = ({ tickets, totalTickets }) => {
    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                Resumo
            </div>

            <div className={`${styles.card} ${styles.cardPadding}`}>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>
                        Bilhete principal
                    </span>
                    <span className={`${styles.summaryValue} ${tickets.main ? styles.summaryValueSuccess : styles.summaryValueNeutral}`}>
                        {tickets.main ? '✓ Reservado' : '✗ Não reservado'}
                    </span>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>
                        Bilhetes adicionais
                    </span>
                    <span className={styles.summaryValue}>
                        {tickets.additional.filter(t => t.reserved).length} reservados
                    </span>
                </div>

                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total de bilhetes</span>
                    <span className={styles.totalValue}>
                        {totalTickets}
                    </span>
                </div>
            </div>
        </div>
    );
};
