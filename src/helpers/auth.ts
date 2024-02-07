import {redirect} from "react-router-dom";

export function getTokenDuration(): number {
    const storedExpirationDate: string | null = localStorage.getItem('expiration');
    const expirationDate: Date = new Date(storedExpirationDate || '');
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return {
        token,
        email,
    }
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    return null;
}