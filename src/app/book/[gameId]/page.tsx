'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import TelegramTicketApp from '@/components/TelegramTicketApp';

export default function BookingPage() {
    // In a real app, we might use the gameId to fetch specific game details
    // or pass it to the TelegramTicketApp component.
    // For now, we just render the existing ticket app.
    const params = useParams();
    const gameId = params.gameId;

    return <TelegramTicketApp />;
}
