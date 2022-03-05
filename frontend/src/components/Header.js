import logo from '../images/logo/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function Header({ email, handleQuit, loggedIn }) {

    const [menu, setMenu] = useState(false);
    function handleShowMenu() {
        setMenu(!menu);
    }

    return (
        <header className={`header ${menu && loggedIn ? 'header_active' : null}`}>
            <img src={logo} alt='Логотип' className='header__logo' />
            <Routes>
                <Route path='/' element={
                    <>
                        <button onClick={handleShowMenu} className={`header__menu-logo ${menu ? 'header__menu-logo_active' : null}`}>
                            <span />
                        </button>
                        <div className={`header__info ${menu ? 'header__info_active' : null}`}>
                            <span className='header__email'>{email}</span>
                            <Link className='header__link' to='/sign-in' onClick={handleQuit}>Выйти</Link>
                        </div>
                    </>
                } />
                <Route path='/sign-in' element={
                    <Link className='header__link' to='/sign-up'>Регистрация</Link>
                } />
                <Route path='/sign-up' element={
                    <Link className='header__link' to='/sign-in'>Войти</Link>
                } />
            </Routes>
        </header>
    );
}

export default Header;