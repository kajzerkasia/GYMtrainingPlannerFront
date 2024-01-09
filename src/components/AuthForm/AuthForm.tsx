import {Form, Link, useSearchParams, useActionData, useNavigation} from 'react-router-dom';
import './AuthForm.css';

function AuthForm() {
    const data: any = useActionData();
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';

    return (
        <>
            <Form method="post" className="form">
                <h1>{isLogin ? 'Zaloguj się' : 'Dodaj nowego użytkownika'}</h1>
                {data && data.errors && (
                    <ul>
                        {Object.values(data.errors).map((err: any) => <li key={err}>{err}</li>)}
                    </ul>
                )}
                {data && data.message && <p>{data.message}</p>}
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required/>
                </p>
                <p>
                    <label htmlFor="image">Hasło</label>
                    <input id="password" type="password" name="password" required/>
                </p>
                <div className="actions">
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                        {isLogin ? 'Dodaj nowego użytkownika' : 'Zaloguj się'}
                    </Link>
                    <button disabled={isSubmitting}>{isSubmitting ? 'Zapisywanie...' : 'Zapisz'}</button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;