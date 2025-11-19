import React, { useState } from 'react';
import { AdditionalTicket, FormData } from '@/types';
import styles from './TelegramTicketApp.module.css';

interface AdditionalTicketsProps {
    tickets: AdditionalTicket[];
    onAdd: (ticket: AdditionalTicket) => void;
    onUpdate: (index: number, ticket: AdditionalTicket) => void;
    onRemove: (index: number) => void;
}

export const AdditionalTickets: React.FC<AdditionalTicketsProps> = ({
    tickets,
    onAdd,
    onUpdate,
    onRemove
}) => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        idCard: ''
    });

    const handleStartAdd = () => {
        if (tickets.length < 2) {
            setEditingIndex(tickets.length); // New index
            setFormData({ firstName: '', lastName: '', idCard: '' });
        }
    };

    const handleStartEdit = (index: number) => {
        const ticket = tickets[index];
        setEditingIndex(index);
        setFormData({
            firstName: ticket.firstName,
            lastName: ticket.lastName,
            idCard: ticket.idCard
        });
    };

    const handleSave = () => {
        if (!formData.firstName || !formData.lastName || !formData.idCard) {
            if (window.Telegram?.WebApp) {
                window.Telegram.WebApp.showAlert('Por favor preencha todos os campos');
            } else {
                alert('Por favor preencha todos os campos');
            }
            return;
        }

        if (editingIndex === null) return;

        const newTicket: AdditionalTicket = {
            ...formData,
            reserved: editingIndex < tickets.length ? tickets[editingIndex].reserved : false
        };

        if (editingIndex < tickets.length) {
            onUpdate(editingIndex, newTicket);
        } else {
            onAdd(newTicket);
        }

        setEditingIndex(null);
        setFormData({ firstName: '', lastName: '', idCard: '' });
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setFormData({ firstName: '', lastName: '', idCard: '' });
    };

    const handleToggleReserved = (index: number) => {
        const ticket = tickets[index];
        if (!ticket.firstName || !ticket.lastName || !ticket.idCard) {
            handleStartEdit(index);
            return;
        }
        onUpdate(index, { ...ticket, reserved: !ticket.reserved });
    };

    return (
        <div className={styles.section}>
            <div className={`${styles.sectionHeader} ${styles.sectionHeaderFlex}`}>
                <span>Bilhetes Adicionais</span>
                <span>{tickets.length}/2</span>
            </div>

            <div className={styles.card}>
                {tickets.map((ticket, index) => (
                    <div key={index}>
                        {editingIndex === index ? (
                            // Edit Form
                            <div className={styles.formContainer}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Primeiro Nome</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        placeholder="Ex: João"
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Último Nome</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        placeholder="Ex: Silva"
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroupLast}>
                                    <label className={styles.label}>Cartão de Cidadão</label>
                                    <input
                                        type="text"
                                        value={formData.idCard}
                                        onChange={(e) => setFormData({ ...formData, idCard: e.target.value })}
                                        placeholder="Ex: 12345678"
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.buttonGroup}>
                                    <button onClick={handleCancel} className={`${styles.button} ${styles.buttonSecondary}`}>
                                        Cancelar
                                    </button>
                                    <button onClick={handleSave} className={`${styles.button} ${styles.buttonPrimary}`}>
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // List Item
                            <div className={`${styles.listItem} ${index < tickets.length - 1 ? styles.listItemBorder : ''}`}>
                                <button
                                    onClick={() => handleToggleReserved(index)}
                                    className={styles.listButton}
                                    style={{ flex: 1 }}
                                >
                                    <div className={styles.buttonContent}>
                                        <div className={styles.icon}>👤</div>
                                        <div className={styles.textContainer}>
                                            <div className={styles.mainText}>
                                                {ticket.firstName && ticket.lastName
                                                    ? `${ticket.firstName} ${ticket.lastName}`
                                                    : `Bilhete adicional ${index + 1}`
                                                }
                                            </div>
                                            <div className={styles.subText}>
                                                {ticket.idCard
                                                    ? `CC: ${ticket.idCard} • ${ticket.reserved ? 'Reservado' : 'Não reservado'}`
                                                    : 'Preencher dados'
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {ticket.firstName && ticket.lastName && ticket.idCard && (
                                        <div className={`${styles.checkbox} ${ticket.reserved ? styles.checkboxChecked : styles.checkboxUnchecked}`}>
                                            {ticket.reserved && '✓'}
                                        </div>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleStartEdit(index)}
                                    className={styles.actionButton}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onRemove(index)}
                                    className={styles.destructiveButton}
                                >
                                    Remover
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {/* Add Form (when adding new ticket) */}
                {editingIndex === tickets.length && (
                    <div className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Primeiro Nome</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                placeholder="Ex: João"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Último Nome</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                placeholder="Ex: Silva"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroupLast}>
                            <label className={styles.label}>Cartão de Cidadão</label>
                            <input
                                type="text"
                                value={formData.idCard}
                                onChange={(e) => setFormData({ ...formData, idCard: e.target.value })}
                                placeholder="Ex: 12345678"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.buttonGroup}>
                            <button onClick={handleCancel} className={`${styles.button} ${styles.buttonSecondary}`}>
                                Cancelar
                            </button>
                            <button onClick={handleSave} className={`${styles.button} ${styles.buttonPrimary}`}>
                                Guardar
                            </button>
                        </div>
                    </div>
                )}

                {tickets.length < 2 && editingIndex === null && (
                    <button
                        onClick={handleStartAdd}
                        className={styles.addButton}
                    >
                        ➕ Adicionar bilhete
                    </button>
                )}
            </div>
        </div>
    );
};
