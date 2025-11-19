import React from 'react';
import styles from './TelegramTicketApp.module.css';

interface MainTicketProps {
    isReserved: boolean;
    onToggle: () => void;
}

export const MainTicket: React.FC<MainTicketProps> = ({ isReserved, onToggle }) => {
    return (
        <div className={`${styles.section} ${styles.sectionBg}`}>
            <div className={styles.sectionHeader}>
                Bilhete Principal
            </div>

            <div className={styles.card}>
                <button
                    onClick={onToggle}
                    className={styles.listButton}
                >
                    <div className={styles.buttonContent}>
                        <div className={styles.icon}>🎫</div>
                        <div className={styles.textContainer}>
                            <div className={styles.mainText}>
                                Meu bilhete
                            </div>
                            <div className={styles.subText}>
                                {isReserved ? 'Reservado' : 'Não reservado'}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.checkbox} ${isReserved ? styles.checkboxChecked : styles.checkboxUnchecked}`}>
                        {isReserved && '✓'}
                    </div>
                </button>
            </div>
        </div>
    );
};
