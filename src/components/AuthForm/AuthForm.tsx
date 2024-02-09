import {Form, Link, useSearchParams, useActionData, useNavigation} from 'react-router-dom';
import classes from './AuthForm.module.css';

function AuthForm() {
    const data: any = useActionData();
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';

    return (
        <>
            <Form method="post" className={classes.form}>
                <h1>{isLogin ? 'Zaloguj się' : 'Dodaj nowego użytkownika'}</h1>
                <div>
                    {data && data.errors && (
                        <ul>
                            {Object.values(data.errors).map((err: any) => <li key={err}>{err}</li>)}
                        </ul>
                    )}
                    {data && data.message && <p>{data.message}</p>}
                </div>
                {!isLogin && (
                    <p>
                        <label htmlFor="name">{!isLogin && <span>*</span>}Imię</label>
                        <input id="name" type="text" name="name"/>
                    </p>
                )}
                <p>
                    <label htmlFor="email">{!isLogin && <span>*</span>}Email</label>
                    <input id="email" type="email" name="email" required/>
                </p>
                <p>
                    <label htmlFor="image">{!isLogin && <span>*</span>}Hasło</label>
                    <input id="password" type="password" name="password" required/>
                </p>
                <div className={classes.actions}>
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