import { Link } from 'react-router-dom';
import { useState } from 'react';
import AuthForm from './AuthForm.js';

function Register({ onRegister }) {
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
        onRegister(email, password);
    }

    return (
        <div className='register'>
            <h1 className='register__title'>Регистрация</h1>
            <AuthForm
                name='register'
                handleSubmit={handleSubmit}
                email={email}
                handleChangeEmail={handleChangeEmail}
                password={password}
                handleChangePassword={handleChangePassword}
                button='Зарегестрироваться' />
            <p className='register__option-text'>Уже зарегестрированы? <Link className='register__option-link' to='/react-mesto-auth/sign-in'>Войти</Link></p>
        </div>
    )
}

export default Register;