import React from "react";
import WinnerBox from "./winnerbox";


const Header = (props) => {
    return (
        <div className="main-box__header">
            {props.checkIfWin() === true 
            ?
                <React.Fragment>
                    <p>Congratulations! You have won with {props.steps} steps!</p>
                    <WinnerBox 
                        steps={props.steps} 
                        fillScores={props.fillScores} 
                        scores={props.scores}
                    />
                </React.Fragment>
            :
                <p>Amount of Steps: <span>{props.steps}</span> </p>
            }
        </div>
    )
}

export default Header;