'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Game } from '@/types';
import { useTelegram } from '@/hooks/useTelegram';
import { TicketHeader } from './TicketHeader';
import styles from './GamesList.module.css';

const MOCK_GAMES: Game[] = [
    {
        id: 1,
        home_team: 'CD Nacional',
        away_team: 'Sporting CP',
        home_team_image: 'https://upload.wikimedia.org/wikipedia/pt/d/d2/CD_Nacional_Logo.png',
        away_team_image: 'https://upload.wikimedia.org/wikipedia/pt/3/3e/Sporting_Clube_de_Portugal.png',
        date: '2024-05-20',
        time: '20:00',
        venue: 'Estádio da Madeira'
    },
    {
        id: 2,
        home_team: 'SL Benfica',
        away_team: 'CD Nacional',
        home_team_image: 'https://upload.wikimedia.org/wikipedia/pt/d/de/Sport_Lisboa_e_Benfica.svg',
        away_team_image: 'https://upload.wikimedia.org/wikipedia/pt/d/d2/CD_Nacional_Logo.png',
        date: '2024-05-27',
        time: '18:00',
        venue: 'Estádio da Madeira',
    },
];

export default function GamesList() {
    const router = useRouter();
    const { user } = useTelegram();

    const handleGameClick = (gameId: number) => {
        router.push(`/book/${gameId}`);
    };

    const handleUserClick = () => {
        router.push('/profile');
    };

    return (
        <div className={styles.container}>
            <TicketHeader user={user} onUserClick={handleUserClick} />
            <div className={styles.content}>
                <h1 className={styles.title}>Próximos Jogos</h1>
                <div className={styles.list}>
                    {MOCK_GAMES.map((game) => (
                        <div
                            key={game.id}
                            className={styles.card}
                            onClick={() => handleGameClick(game.id)}
                        >
                            <div className={styles.cardHeader}>
                                <span className={styles.date}>{game.date} • {game.time}</span>
                            </div>
                            <div className={styles.teams}>
                                <div className={styles.team}>
                                    {game.home_team_image && <img src={game.home_team_image} alt={game.home_team} className={styles.teamLogo} />}
                                    <span className={styles.teamName}>{game.home_team}</span>
                                </div>
                                <div className={styles.vs}>VS</div>
                                <div className={styles.team}>
                                    {game.away_team_image && <img src={game.away_team_image} alt={game.away_team} className={styles.teamLogo} />}
                                    <span className={styles.teamName}>{game.away_team}</span>
                                </div>
                            </div>
                            <div className={styles.venue}>{game.venue}</div>
                            <button className={styles.button}>
                                Comprar Bilhetes
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
