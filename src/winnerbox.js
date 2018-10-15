import React from 'react';


export default class WinnerBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            wrongInput: false
        }
    }

    getName = (e) => {
        this.setState({
            name: e.target.value
        });
    }   

    validateInput(input) {
        if(input.match(/^\w{3}$/))
            return true;
        else return false;
    }

    isNameInScore(name) {
        let found = false;
        for(let key in this.state.scores) {
            if(name.toLowerCase() === this.state.scores[key].name.toLowerCase()) {
                found = true;
            }
        }
        return !found;
    }

    sendName = (e) => {
        let {name} = this.state;
        if(this.isNameInScore(name) && this.validateInput(name)) {
            this.setState({
                wrongInput:false,
                name: ''
            });

            this.props.fillScores(name, this.props.steps);

        } else {
            this.setState({
                wrongInput: true
            })
        }     
    }

    render() {
        return (
            <div className='main-block__winner-box'>
                <p> Insert Your Name! </p>
                <form>
                    <input type='text' name='name' className={this.state.wrongInput ? 'main-block__winner-box__name wrong' : 'main-box__winner-box__name'} 
                            onChange={this.getName} value={this.state.name}
                            placeholder='***'
                            maxLength='3'/>
                </form>
                <button className='main-block__winner-box__button'onClick={this.sendName}>OK!</button>
            </div>
        )
    }
}