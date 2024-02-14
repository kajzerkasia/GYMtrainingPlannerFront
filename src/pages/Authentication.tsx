import AuthForm from '../components/AuthForm/AuthForm';
import {json} from "react-router-dom";
import {apiUrl} from "../config/api";

function AuthenticationPage() {
    return <AuthForm action={(formData: FormData, mode) => action(formData, mode)}/>;
}

export default AuthenticationPage;

interface AuthData {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
    name?: FormDataEntryValue | null;
    image?: FormDataEntryValue | null;
}

export async function action(formData: FormData, mode: string) {

    if (mode !== 'login' && mode !== 'signup') {
        throw json({message: 'Unsupported mode.'}, {status: 422});
    }

    let authData: AuthData = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    if (mode === 'signup') {
        authData = {
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('name'),
            image: formData.get('image'),
        }
    }

    const response = await fetch(`${apiUrl}/api/auth-user/${mode}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData)
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw json({message: 'Could not authenticate user.'}, {status: 500});
    }

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);
    localStorage.setItem('email', authData.email as string);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());
}