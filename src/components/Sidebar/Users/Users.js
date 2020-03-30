import React from 'react';

import User from './User/User';

import classes from './Users.module.css';
import { updateTime } from '../../../utils/getTime';

const users = (props) => {
    let users = props.allUsers.map(user => {
        if(user.uid === props.curUser.uid) return null;
        return <User
            key={user.uid}
            clicked={props.selectUser}
            selected={props.selectedUser === user.uid}
            uid={user.uid}
            username={user.email.split('@')[0]}
            online={user.online}
            time={updateTime(user.time)} />;
    });
    return <ul className={classes.Users}>{users}</ul>;
};

export default users;