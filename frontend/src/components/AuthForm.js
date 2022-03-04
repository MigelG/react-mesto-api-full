function AuthForm({ name, handleSubmit, email, handleChangeEmail, password, handleChangePassword, button }) {

    return (
        <form name={name} className='register__form' onSubmit={handleSubmit} noValidate>
            <input type='email' name='email' placeholder='E-mail'
                className='register__input' value={email} onChange={handleChangeEmail} required />
            <input type='password' name='password' placeholder='Пароль'
                className='register__input' value={password} onChange={handleChangePassword} required />
            <button type='submit' className='register__submit-button'>{button}</button>
        </form>
    )
}

export default AuthForm;