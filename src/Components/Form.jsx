import React from 'react';
import { useState } from 'react';


function Form(props) {
    const [name, setName] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`/`, { method: 'GET' })
            .then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    props.setName(name);
                }
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </label>
            <input type="submit" value="Submit" disabled={!name} />
        </form>
    );
}

export default Form;