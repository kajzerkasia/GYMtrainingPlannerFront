import {Form, useNavigate, useSearchParams} from 'react-router-dom';
import classes from './AuthForm.module.css';
import AvatarPicker from "../AvatarPicker/AvatarPicker";
import {useEffect, useState} from "react";
import {UseFetchImages} from "../../hooks/useFetchImages";
import Button from "../Button/Button";

function AuthForm({ action }: { action: (formData: FormData, mode: string) => Promise<Response | undefined>}) {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    const [selectableImages, setSelectableImages] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        image: '',
    });

    function handleSelectImage(image: string) {
        setFormData(prevData => ({...prevData, image}));
    }

    const {fetchSelectableImages} = UseFetchImages();

    useEffect(() => {
        async function fetchData() {
            try {
                const images = await fetchSelectableImages();
                setSelectableImages(images);
            } catch (error) {
                console.error('Błąd podczas pobierania zdjęć:', error);
            }
        }

        fetchData();
    }, []);

    const mode = searchParams.get('mode') || 'login';

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);

            if (formData.image) {
                formDataToSend.append('image', formData.image as string);
            }

            if (formData.name) {
                formDataToSend.append('name', formData.name);
            }

            await action(formDataToSend, mode);
            navigate('/');

        } catch (error) {
            console.error('Błąd podczas wysyłania formularza:', error);
        }
    };

    const handleLinkClick = (newMode: string) => {
        if (window.location) {
            window.location.href = `?mode=${newMode}`;
        }
    };

    return (
        <>
            <Form method="post" className={classes.form} onSubmit={handleFormSubmit}>
                <h1>{isLogin ? 'Zaloguj się' : 'Dodaj nowego użytkownika'}</h1>
                {!isLogin && (
                    <p>
                        <label
                            htmlFor="name"
                        >{!isLogin && <span>*</span>}Imię</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            autoComplete="section-blue shipping street-address"
                        />
                    </p>
                )}
                {!isLogin && (
                    <div className="control">
                        <AvatarPicker
                            images={selectableImages}
                            onSelect={handleSelectImage}
                            selectedImage={formData.image}
                        />
                    </div>
                )}
                <p>
                    <label htmlFor="email">{!isLogin && <span>*</span>}Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        autoComplete="username"
                    />
                </p>
                <p>
                    <label htmlFor="password">{!isLogin && <span>*</span>}Hasło</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        autoComplete="current-password"
                        required
                    />
                </p>
                <div className={classes.actions}>
                    <Button>{isLogin ? 'Zaloguj się' : 'Dodaj'}</Button>
                    <Button onClick={() => handleLinkClick(isLogin ? 'signup' : 'login')}>
                        {isLogin ? 'Dodaj nowego użytkownika' : 'Zaloguj się'}
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;
