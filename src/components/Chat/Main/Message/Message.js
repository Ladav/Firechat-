import React from 'react';

import classes from './Message.module.css';

const message = (props) => {
    const updateName = (fullName) => {
        const tokens = fullName.split('.');
        return tokens[tokens.length - 1];
    };

    const styles = (props.user.uid === props.currentUser.uid) ? { backgroundColor: 'rgb(251, 192, 45)' } : { backgroundColor: '#666' };
    return (
        <div className={classes.Message__Container}>
            <div className={classes.Message} style={styles}>
                <p className={classes.Msg__Header}>
                    <span className={classes.Msg__Name}>{props.username}</span>
                    <span className={classes.Msg__Time}>{props.time}</span>
                </p>
                {
                    props.type === 'link' ?
                        <div className={classes.Link}>
                            <a href={props.message}>
                                <div className={classes.Preview}>{updateName(props.filename)}</div>
                                {props.filename}
                            </a>
                        </div> :
                        <p className={classes.Msg__Text}>{props.message}</p>
                }
            </div>
        </div>
    );
};

export default message