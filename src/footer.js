import React from "react";

const Footer = (props) => {

    const openStat = (e) => {
        props.setIsOpenStat(true);
        generateList();
    }
    const closeStat = (e) => {
        props.setIsOpenStat(false);
    }

    const chooseWhatToReturn = () => {
        if(props.isOpenStat) {
            return (
                <React.Fragment>
                    <ul>
                        {generateList()}
                    </ul>
                    <button 
                        className="main-block__footer-button" 
                        onClick={closeStat}
                    >
                        Close Statistic
                    </button>
                </React.Fragment>
            )
        } else return <p onClick={openStat}>Open Statistic</p>
    }

    const generateList = () => {
        let listItems = props.scores.map((score) => 
            <li key={score.name}>
                {score.name} : {score.steps}
            </li>
        );
        return listItems;
    }

    return (
        <div className="main-block__footer">
            {chooseWhatToReturn()}
        </div>
    )
}

export default Footer;

