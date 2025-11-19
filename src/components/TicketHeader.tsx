import React from 'react';
import { User } from '@/types';
import styles from './TelegramTicketApp.module.css';

interface TicketHeaderProps {
    user: User | null;
    totalTickets?: number;
    onUserClick?: () => void;
}

export const TicketHeader: React.FC<TicketHeaderProps> = ({ user, totalTickets, onUserClick }) => {
    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <div
                    className={styles.userInfoContainer}
                    onClick={onUserClick}
                    style={{ cursor: onUserClick ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}
                >
                    <div className={styles.avatar}>
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>
                            {user?.firstName} {user?.lastName}
                        </div>
                        <div className={styles.userHandle}>
                            @{user?.username}
                        </div>
                    </div>
                </div>
                {typeof totalTickets === 'number' && (
                    <div className={styles.ticketCount}>
                        <div className={styles.countValue}>
                            {totalTickets}
                        </div>
                        <div className={styles.countLabel}>
                            bilhetes
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
