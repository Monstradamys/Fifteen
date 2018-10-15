import React from 'react';

import Header from './header';
import Footer from './footer';
import Element from './element.js';



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers:    [],   //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,'zero', 15 ],
            canBeMoved: [],
            steps: 0,
            isZero: false,
            isOpenStat: false,
            scores: localStorage.players ? JSON.parse(localStorage.players) : [],
        }
    }

    componentDidMount() {
        this.fillNumbersArray();
    }

    fillNumbersArray() {
        let numbersArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'zero'];
        for(let i = 0; i < numbersArr.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbersArr[i], numbersArr[j]] = [numbersArr[j], numbersArr[i]];
        }
        this.setState({
            numbers: numbersArr
        })
    }


    getElementToMove() {
        if(this.state.canBeMoved.length !== 0) 
            return false;

        var freeLeft  = true;
        var freeRight = true;  
        for(let i = 0; i < 4; i++) {
            let row = [];
            for(let j = 0 + i * 4; j < 4 + i * 4; j++) {    
                row.push(this.state.numbers[j]);
                if(row.indexOf('zero') === 0) {
                    freeLeft = false;
                }
                if(row.indexOf('zero') === 3) {
                    freeRight = false;
                }          
            } 
        }   
        
        let {numbers, canBeMoved} = this.state;
        let zeroIndex = numbers.indexOf('zero');    
        if(numbers[zeroIndex - 4] !== undefined) {
            canBeMoved.push(numbers[zeroIndex - 4])
        }
        if(numbers[zeroIndex + 4] !== undefined) {
            canBeMoved.push(numbers[zeroIndex + 4])
        }
        if(numbers[zeroIndex - 1] !== undefined && freeLeft) {
            canBeMoved.push(numbers[zeroIndex - 1])
        }
        if(numbers[zeroIndex + 1] !== undefined && freeRight) {
            canBeMoved.push(numbers[zeroIndex + 1])
        }
        this.forceUpdate();
    }

    moveElements = (chosenElement) => {
        if(chosenElement === 'zero') {
            this.setIsZero(true);
            this.getElementToMove();
        } else {
            this.setIsZero(false);
            this.getElementToMove();         
            if(this.state.canBeMoved.indexOf(+chosenElement) !== -1) {
                let {numbers} = this.state;
                let zeroIndex = numbers.indexOf('zero');
                let chosenElementIndex = numbers.indexOf(+chosenElement);
                numbers[zeroIndex] = numbers[chosenElementIndex];
                numbers[chosenElementIndex] = 'zero';
                this.setState({
                    canBeMoved: [],
                    steps: this.state.steps + 1
                });
                this.forceUpdate(); 
            } else {
                this.setIsZero(true)
            }
        }
    }

    checkIfWin = () => {
        const winArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'zero'];
        if(this.state.numbers.join("") === winArray.join(""))
            return true;
        else return false;
    }

    setIsZero(value) {
        this.setState({
            isZero: value
        });
    }


    handleDragOver = (e) => {
        e.preventDefault();
    }

    moveElementsDND = (firstElement, secondElement) => {
        this.getElementToMove();
        
        let zero, element;
        let {numbers, canBeMoved} = this.state;
        if(firstElement === 'zero' && canBeMoved.indexOf(+secondElement) !== -1) {
            zero    = firstElement;
            element = secondElement;
        }
        if (secondElement === 'zero' && canBeMoved.indexOf(+firstElement) !== -1){
            element = firstElement;
            zero    = secondElement;        
        }
        
        if(canBeMoved.indexOf(+element) !== -1) {
            let zeroIndex         = numbers.indexOf('zero');
            let elementIndex      = numbers.indexOf(+element);
            numbers[zeroIndex]    = numbers[elementIndex];
            numbers[elementIndex] = 'zero';

            this.setState({
                canBeMoved: [],
                steps: this.state.steps + 1
            });
            this.forceUpdate();
        }
    }

    setIsOpenStat = (value) => {
        this.setState({
            isOpenStat: value
        })
    }
    
    fillScores = (name, steps) => {
            this.state.scores.push({'name': name, 'steps': steps});
            this.forceUpdate();
            this.addToLocalStorage();
            this.setState({
                steps: 0
            });
            this.fillNumbersArray();
    }

    addToLocalStorage() {
        localStorage.setItem('players', JSON.stringify(this.state.scores));
    }


    render() {
        return (
            <div className='main-block__wrapper' onDragOver={this.handleDragOver} >
                <div className='main-block' >
                    <Header 
                        checkIfWin={this.checkIfWin} 
                        steps={this.state.steps}
                        fillScores={this.fillScores}
                        scores={this.state.scores}
                    />
                    {this.state.numbers.map(number => <Element 
                                                        value ={number} 
                                                        key={number}
                                                        id={number} 
                                                        canBeMoved={this.state.canBeMoved.indexOf(number) === -1 ? false : true}
                                                        isZero={this.state.isZero}
                                                        moveElements={this.moveElements}
                                                        moveElementsDND={this.moveElementsDND}
                                                      />)}
                    <Footer isOpenStat={this.state.isOpenStat}
                            setIsOpenStat={this.setIsOpenStat}
                            scores={this.state.scores}/>
                </div>
            </div>
        )
    }
    
};