import React from 'react';
import { useState } from 'react';
import Form from ".//Form.jsx";
import HideButton from ".//HideButton.jsx";

function Body(props) {
    const [hideForm, setHideForm] = useState(false);
    if(hideForm === true){
        return (
            <div>
                <HideButton hideForm={hideForm} setHideForm={setHideForm}/>
            </div>
        )
    }
    if(props.name === ''){
        return (
            <div>
                <Form name={props.name} setName={props.setName}/>
                <HideButton hideForm={hideForm} setHideForm={setHideForm}/>
            </div>
        )
    } else {
        return (
            <div>
                <h2>
                    Thank you for submitting: {props.name}
                </h2>
            </div>
        )
    }
};

export default Body

