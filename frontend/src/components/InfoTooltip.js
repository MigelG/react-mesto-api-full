import logoSuccess from '../images/tooltipSuccess.svg'
import logoFail from '../images/tooltipFail.svg'

function InfoTooltip({ isOpen, onClose, type }) {
    return (
        <div className={`tooltip ${isOpen ? 'tooltip_opened' : ''}`}>
            <div className='tooltip__container'>
                <button onClick={onClose} type='button' className='button tooltip__close-button'></button>
                <img className='tooltip__image' src={type ? logoSuccess : logoFail} alt={type ? 'Успех!' : 'Неудача('} />
                <h2 className='tooltip__title'>{type ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;