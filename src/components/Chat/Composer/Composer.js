import React from 'react';

import classes from './Composer.module.css';
import attachment from './paperclip.svg';
import send from './send.svg';

const composer = (props) => {
    return (
        <div className={classes.Composer}>
            <i className={classes.Button} onClick={props.toggleDrop}>
                <img src={attachment} alt="attachment"></img>
            </i>
            <input
                type="text"
                className={classes.Input}
                placeholder="message"
                value={props.msg}
                onChange={props.changed}
                onKeyDown={props.entered} />
            <i className={classes.Button} onClick={props.clicked}>
                <img src={send} alt="send"></img>
            </i>
        </div>
    );
};

export default composer;