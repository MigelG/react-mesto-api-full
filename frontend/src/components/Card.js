import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ _id, name, link, likes, onCardClick, owner, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = owner._id === currentUser._id;
    const isLiked = likes.some(i => i._id === currentUser._id);
    let cardLikeButtonClassName;
    if (isLiked) {
        cardLikeButtonClassName = "place__like-button_active";
    }

    function handleClick() {
        onCardClick({ name, link, onCardClick });
    }

    function handleLikeClick() {
        onCardLike({ _id, likes });
    }

    function handleDeleteClick() {
        onCardDelete({ id: _id });
    }

    return (
        <article className="place">
            {isOwn && <button onClick={handleDeleteClick} type="button" className="button place__delete-button"></button>}
            <div className="place__image-container">
                <img onClick={handleClick} className="place__image" src={link} alt={name} />
            </div>
            <div className="place__caption">
                <h2 className="place__title">{name}</h2>
                <div>
                    <button onClick={handleLikeClick} type="button" className={`button place__like-button ${cardLikeButtonClassName}`}></button>
                    <p className="place__like-score">{likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;