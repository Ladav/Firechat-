import React from 'react';

import classes from './FireBackground.module.css';

const fireback = (props) => {
    return (
        <div className={classes.fire}>
            <div className={classes.fireleft}>
                <div className={classes.mainfire}></div>
                <div className={classes.particlefire}></div>
            </div>
            <div className={classes.firemain}>
                <div className={classes.mainfire}></div>
                <div className={classes.particlefire}></div>
            </div>
            <div className={classes.fireright}>
                <div className={classes.mainfire}></div>
                <div className={classes.particlefire}></div>
            </div>
            <div className={classes.firebottom}>
                <div className={classes.mainfire}></div>
            </div>
        </div>
    );
};

export default fireback;