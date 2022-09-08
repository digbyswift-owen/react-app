import * as React from 'react';
window.React = React

function HideButton(props){

    function flipHide(){
        props.setHideForm(!props.hideForm)
    }

    if(props.hideForm === false){
        return (
            <div>
                <button onClick={flipHide}>
                    Hide Form
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={flipHide}>
                    Show Form
                </button>
            </div>
        )
    }

}

export default HideButton