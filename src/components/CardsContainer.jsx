import React, { useState, useEffect } from 'react';
import Card from './Card';

const signs = [
    'fa fa-anchor', 'fa fa-automobile', 'fa fa-bug', 'fa fa-bank', 'fa fa-bullhorn', 
    'fa fa-battery', 'fa fa-calendar', 'fa fa-camera', 'fa fa-clock-o', 'fa fa-check'
]

const CardsContainer = () => {
    const [cardArr, setCardArr] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [prevCardIndex, setPrevCardIndex] = useState(null);
    const [halt, setHalt] = useState(false);

    const randomize = arr => {
        let myArr = arr.slice();
        let newArr;
        newArr = myArr.map(el => {
            return {id: Math.random(), cl: el}
        }).sort((a, b) => {
            return a.id - b.id;
        }).map(el => {
            return el.cl;
        });
        return newArr;
    }

    const displayAfter = (arr) => {
        let check = true;
        arr = cardArr.map((el, i) => {
            if(el === null) {
                return <div id="empty" key={i} style={{backgroundColor: '#333', height: '100%', width: '100%', borderRadius: '5px'}}></div> 
            } else if(el.props.id === 'empty') {
                return el;
            } else {
                check = false;
                if(i === prevCardIndex) {
                    return <Card flip={true} setPrevCardIndex={setPrevCardIndex} cardArr={cardArr} setCardArr={setCardArr} selectedCards={selectedCards} setSelectedCards={setSelectedCards} 
                    setHalt={setHalt} key={el.key} sign={el.key} />
                }
                return <Card flip={false} setPrevCardIndex={setPrevCardIndex} cardArr={cardArr} setCardArr={setCardArr} selectedCards={selectedCards} setSelectedCards={setSelectedCards} 
                setHalt={setHalt} key={el.key} sign={el.key} />
            }
        });
        setCardArr(arr);
        if(check) {
            setCardArr([]);
            setSelectedCards([]);
        }
    }
    
    const displayCards = arr => {
        let displayArr = [];
        if(cardArr.length === 0) {
            for (let i = 0; i < 2; i++) {
                displayArr = displayArr.concat(
                    arr.map(el => {
                        return <Card flip={false} setPrevCardIndex={setPrevCardIndex} selectedCards={selectedCards} setSelectedCards={setSelectedCards}
                        setHalt={setHalt} cardArr={cardArr} setCardArr={setCardArr} key={`${el}-${i}`} sign={`${el}-${i}`} />
                    })
                    )
                }
                setCardArr(randomize(displayArr));
        } else {
            displayAfter(displayArr);
        } 
    }

    useEffect(() => {
        displayCards(signs);
    }, [selectedCards])

    return (
        <div className="cards-grid">
            {
                halt && <div className="halo"></div>
            }
            {
                cardArr
            }
        </div>
    )
}

export default CardsContainer;
