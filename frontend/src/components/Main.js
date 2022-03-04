import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div onClick={props.onEditAvatar} className="profile__avatar">
                    <img className="profile__img" src={currentUser.avatar} alt="Аватарка" />
                </div>

                <div className="profile__info">
                    <h1 className="profile__username">{currentUser.name}</h1>
                    <button onClick={props.onEditProfile} type="button" className="button profile__edit-button"></button>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" className="button profile__add-button"></button>
            </section>

            <section className="places">
                {
                    props.cards.map((card) => <Card
                        key={card._id}
                        _id={card._id}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={props.onCardClick}
                        owner={card.owner}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />)
                }
            </section>
        </main>
    );
}

export default Main;