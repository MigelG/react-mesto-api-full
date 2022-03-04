import { useState } from 'react';
import AuthForm from './AuthForm.js';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        onLogin(email, password, setEmail, setPassword);
    }

    return (
        <div className='register'>
            <h1 className='register__title'>Войти</h1>
            <AuthForm
                name='login'
                handleSubmit={handleSubmit}
                email={email}
                handleChangeEmail={handleChangeEmail}
                password={password}
                handleChangePassword={handleChangePassword}
                button='Войти' />
        </div>
    )
}

export default Login;