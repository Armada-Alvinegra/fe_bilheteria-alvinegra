'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTelegram } from '@/hooks/useTelegram';
import { User } from '@/types';
import styles from './TelegramTicketApp.module.css'; // Reusing styles for consistency

export default function UserProfile() {
    const router = useRouter();
    const { user: telegramUser } = useTelegram();
    const [formData, setFormData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (telegramUser) {
            // Load from local storage if available, otherwise use Telegram data
            const storedUser = localStorage.getItem(`user_profile:${telegramUser.id}`);
            if (storedUser) {
                setFormData(JSON.parse(storedUser));
            } else {
                setFormData(telegramUser);
            }
            setLoading(false);
        }
    }, [telegramUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        if (!formData) return;
        localStorage.setItem(`user_profile:${formData.id}`, JSON.stringify(formData));

        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
            window.Telegram.WebApp.showAlert('Perfil atualizado com sucesso!');
        } else {
            alert('Perfil atualizado com sucesso!');
        }
        router.back();
    };

    if (loading || !formData) {
        return <div className={styles.loading}>A carregar...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <button onClick={() => router.back()} className={styles.actionButton} style={{ padding: 0, marginRight: '16px' }}>
                        ← Voltar
                    </button>
                    <div className={styles.userName} style={{ fontSize: '18px' }}>
                        Editar Perfil
                    </div>
                </div>
            </div>

            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Nome</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Apelido</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroupLast}>
                    <label className={styles.label}>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <button onClick={handleSave} className={`${styles.button} ${styles.buttonPrimary}`}>
                    Guardar Alterações
                </button>
            </div>
        </div>
    );
}
