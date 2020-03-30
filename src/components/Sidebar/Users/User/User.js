import React from 'react';

import classes from './User.module.css';

const user = (props) => {
    const attachedClasses = [classes.User];
    if (props.selected) attachedClasses.push(classes.Selected);
    return (
        <li className={attachedClasses.join(' ')} onClick={() => props.clicked(props.uid)}>
            <div className={classes.UserAvatar}>{props.username.charAt(0)}</div>
            <div className={classes.UserName}>
                {props.username}
            </div>
            <div className={classes.Status}>
                <div className={props.online ? classes.Active : null}></div>
                <div className={classes.Time}>{props.time}</div>
            </div>
        </li>
    );
};

export default user;