export interface User {
    id: number | string;
    firstName: string;
    lastName: string;
    username?: string;
}

export interface AdditionalTicket {
    firstName: string;
    lastName: string;
    idCard: string;
    reserved: boolean;
}

export interface TicketsState {
    main: boolean;
    additional: AdditionalTicket[];
}

export interface FormData {
    firstName: string;
    lastName: string;
    idCard: string;
}

declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                ready: () => void;
                expand: () => void;
                colorScheme: 'light' | 'dark';
                themeParams: {
                    bg_color?: string;
                    text_color?: string;
                    hint_color?: string;
                    link_color?: string;
                    button_color?: string;
                    button_text_color?: string;
                    secondary_bg_color?: string;
                    header_bg_color?: string;
                    section_bg_color?: string;
                    destructive_text_color?: string;
                    [key: string]: string | undefined;
                };
                setHeaderColor: (color: string) => void;
                setBackgroundColor: (color: string) => void;
                onEvent: (eventType: string, callback: () => void) => void;
                initDataUnsafe?: {
                    user?: {
                        id: number;
                        first_name: string;
                        last_name: string;
                        username?: string;
                    };
                };
                HapticFeedback: {
                    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
                };
                showAlert: (message: string) => void;
            };
        };
    }
}
