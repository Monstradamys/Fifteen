import React from "react";

const Element = (props) => {
    const handleClick = (e) => {
        props.moveElements(e.target.innerText);
    }

    const getClassName = () => {
        let className = "main-block__element ";
        className += props.value === "zero" ? "zero " : "basic ";
        if(props.isZero) 
            className += props.canBeMoved ? "movable " : null;
        
        return className; 
    }

    const handleStartDrag = (e) => {
        e.dataTransfer.setData("Text/html", e.target.innerText)
    }

    const handleDrop = (e) => {
        var data = e.dataTransfer.getData("text/html");
        props.moveElementsDND(e.target.innerText, data);
    }


    return (
        <div className = {getClassName()}
                id = {props.id}
                onClick ={handleClick}
                onDragStart={handleStartDrag}
                onDragEnd={props.ondragEnd}
                onDrop={handleDrop}
                draggable
            >
            {props.value}
        </div>
    )
}

export default Element;