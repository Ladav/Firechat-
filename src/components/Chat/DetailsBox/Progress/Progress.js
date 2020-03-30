import React, { Component } from 'react';

import classes from './Progress.module.css';
class progressBar extends Component {
    move = () => {
        let $bar = document.querySelector('.bar');
        const frame = () => {
            if (this.props.upload.progress >= 100) 
                clearInterval(id);
            else 
                $bar.style.width = this.props.upload.progress + "%";
        };
        let id = setInterval(frame, 100);
    };
    
    componentDidMount() {
        console.log('[progress.js] componentDidMount');
        this.move();
    };
    render () {
        return (
            <div className={classes.ProgressBar + ' progress'}>
                <div className={classes.Bar + ' bar'}></div>
            </div>
        );
    };
};

export default progressBar;