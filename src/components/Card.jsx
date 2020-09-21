import React, { useState, useEffect } from 'react';

const Card = ({setHalt, flip, setPrevCardIndex, sign, selectedCards, setSelectedCards, cardArr, setCardArr}) => {
    const [flipped, setFlipped] = useState(flip);

    const setCards = e => {
        let cardId;
        if(e.target.parentElement.getAttribute('id') === 'shown') {
            cardId = e.target.parentElement.parentElement.getAttribute('id');
        } else {
            cardId = e.target.parentElement.getAttribute('id');
        }
        console.log(cardId);
        if(selectedCards.length === 0) {
            setFlipped(!flipped);
            setSelectedCards([cardId]);
        } else if(selectedCards.length === 1) {
            if(selectedCards[0] === null || cardId === null) {
                return;
            }
            if(selectedCards[0] === cardId) {
                return;
            }
            if(selectedCards[0].slice(0, selectedCards[0].length - 2) === cardId.slice(0, cardId.length - 2)) {
                // Correct
                console.log('success');
                setFlipped(!flipped);
                setTimeout(() => {
                    let newArr = cardArr.map((card, i) => {
                        if(card.key.slice(6, card.key.length - 2) !== cardId.slice(0, cardId.length - 2)) {
                            return card;
                        } else {
                            return null;
                        }
                    })
                    setCardArr(newArr);
                    setSelectedCards([]);
                }, 1000)
            } else {
                // Wrong
                setFlipped(true);
                setHalt(true)
                setTimeout(() => {
                    setFlipped(false);
                    cardArr.map((card, i) => {
                        console.log(card.key.slice(6), selectedCards[0]);
                        if(card.key.slice(6) === selectedCards[0]) {
                            setPrevCardIndex(i);
                        }
                    })
                    setSelectedCards([]);
                    setTimeout(() => {
                        setHalt(false);
                    }, 1000)
                }, 1000);
            }
        }
    }

    useEffect(() => {
        if(flip) {
            setFlipped(false);
            setPrevCardIndex(null);
        }
    }, [flip]);

    return (
            <div id={sign.slice(6)} onClick={setCards} className="card">
                <div id={flipped ? "hidden" : "shown"} className="back"></div>
                <div id={flipped ? "shown" : "hidden"} className="front"><i className={sign.slice(0, sign.length - 2)}></i></div>
            </div>
    )
}

export default Card;
