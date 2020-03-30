import React from 'react';

import Message from './Message/Message';

import classes from './Main.module.css';
import {updateTime} from '../../../utils/getTime';

const main = (props) => {
    const messages = [];
    for (let msg in props.messages) {
        if (msg !== 'meta') {
            messages.push(<Message
                currentUser={props.user}
                user={props.messages[msg]}
                key={msg}
                type={props.messages[msg].type}
                username={props.messages[msg].email.split('@')[0]}
                time={updateTime(props.messages[msg].time)}
                message={props.messages[msg].message}
                filename={props.messages[msg].name} />)
        }
    }
    return (
        <React.Fragment>
            <div className={classes.LogoutBtn}>
                <button onClick={props.logout} >logout</button>
            </div>
            <div className={classes.Main + " Msg__Container"}>
                {messages}
            </div>
        </React.Fragment>
    );
};

export default main;