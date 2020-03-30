import React from 'react';

import Users from './Users/Users';
import classes from './Sidebar.module.css';

const sidebar = (props) => {
    return (
        <div className={classes.Sidebar}>
            <div className={classes.Title}>firechat</div>
            {props.allUsers ? <Users
                allUsers={props.allUsers}
                curUser={props.currentUser}
                selectUser={props.selectUser}
                selectedUser={props.selectedUser} /> : null}
        </div>
    );
};

export default sidebar;