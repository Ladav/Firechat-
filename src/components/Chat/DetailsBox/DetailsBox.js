import React, { Component } from 'react';

import Progress from './Progress/Progress';
import classes from './DetailsBox.module.css';

class DetailsBox extends Component {
    state = {
        detailsBox: {
            pos: {
                top: 15,
                left: 15,
            },
            rel: null,  // position relate to the mouse cursor
            dragging: false
        },
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.detailsBox.dragging && !prevState.detailsBox.dragging) {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        }
        else if (!this.state.detailsBox.dragging && prevState.detailsBox.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        }
    };

    onMouseDown = (e) => {
        if (e.button !== 0) return; // only left mouse button
        let top = e.target.offsetTop;
        let left = e.target.offsetLeft;
        this.setState({
            detailsBox: {
                ...this.state.detailsBox,
                rel: {
                    top: e.pageY - top,
                    left: e.pageX - left
                },
                dragging: true
            }
        });

        e.stopPropagation(); // to preventing any parent event handlers from being executed
        e.preventDefault();
    };
    onMouseUp = (e) => {
        this.setState({
            detailsBox: {
                ...this.state.detailsBox,
                dragging: false
            }
        });
        e.stopPropagation();
        e.preventDefault();
    };
    onMouseMove = (e) => {
        if (this.state.dragging === false) return;
        this.setState({
            detailsBox: {
                ...this.state.detailsBox,
                pos: {
                    top: e.pageY - this.state.detailsBox.rel.top,
                    left: e.pageX - this.state.detailsBox.rel.left
                }
            }
        });
    };
    render() {
        return (
            <div className={[classes.DetailsBox, ' detailsBox'].join(' ')} onMouseDown={this.onMouseDown}
                style={{ left: `${this.state.detailsBox.pos.left}px`, top: `${this.state.detailsBox.pos.top}px` }}>
                <div className={classes.Preview}>
                    {this.props.upload.file}
                </div>
                <div className={classes.Control}>
                    <Progress upload={this.props.upload} />
                    <button className={classes.ControlButton} onClick={this.props.setUploadToFailed} >cancel</button>
                </div>
            </div>
        );
    };
}

export default DetailsBox;