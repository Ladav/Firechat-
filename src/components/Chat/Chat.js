import React from 'react';

import Composer from './Composer/Composer';
import Main from './Main/Main';
import DropZone from './DropZone/DropZone';
import DetailsBox from './DetailsBox/DetailsBox';

import classes from './Chat.module.css';
import { auth, usersRef, activeRef, chatRef, conversationRef, sendMessage } from '../../fire';

class Chat extends React.Component {
    state = {
        message: '',         // the lastest msg by the user
        upload: {
            progress: 0,
            failed: true,
            file: {}
        },
        dropActive: false
    };

    toggleDrop = () => {
        this.setState({ dropActive: !this.state.dropActive });
    };
    setDropUnactive = () => {
        this.setState({ dropActive: false });
    };

    uploadStatusToggle = () => {
        const updatedUpload = this.state.upload;
        updatedUpload.failed = !updatedUpload.failed;
        this.setState({ upload: updatedUpload });
    };
    setUploadToFailed = () => {
        const updatedUpload = this.state.upload;
        updatedUpload.failed = true;
        this.setState({ upload: updatedUpload });
    };
    uploadProgress = (progress) => {
        const updatedUpload = this.state.upload;
        updatedUpload.progress = progress;
        this.setState({ upload: updatedUpload });
    };

    fetchFileName = (file) => {
        const updatedUpload = this.state.upload;
        updatedUpload.file = file;
        this.setState({ upload: updatedUpload });
    };

    componentDidMount() {
        console.log('[chat.js] componentDidMount');  
    };

    logout = async () => {
        console.log(this.props.user)
        if (this.props.user.uid) {
            await activeRef.child(this.props.user.uid.toString()).remove().then(() => {
                usersRef.off();
                activeRef.off();
                chatRef.off();
                conversationRef.off();
                auth().signOut();
                console.log('User logged out.')
            }).catch(error => {
                console.log(error)
            });
        }
    };

    valueChangeHandler = (updatedMsg) => {
        this.setState((prevState) => {
            return { message: updatedMsg }
        })
    };
    btnClickHandler = async () => {
        if (!this.state.message) return;
        // get other user id from app and chat id and add new msg to it
        const msg = this.state.message;
        this.setState({ message: '' });
        await sendMessage(this.props.user, this.props.selected.cid, msg, 'text');
    };
    barEnterHandler = (e) => {
        if (+e.keyCode === 13) {
            this.btnClickHandler();
        }
    };
    render() {
        let showDrop = null;
        if (this.state.dropActive) {
            showDrop = <DropZone
                setDropUnactive={this.setDropUnactive}
                uploadProgress={this.uploadProgress}
                upload={this.state.upload}
                toggleStatus={this.uploadStatusToggle}
                fetchFileName={this.fetchFileName}
                details={{ user: this.props.user, cid: this.props.selected.cid }} />
        }

        let detailsBox = null;
        if (!this.state.upload.failed) {
            detailsBox = <DetailsBox
                upload={this.state.upload}
                setUploadToFailed={this.setUploadToFailed} />;
        }
        return (
            <div className={classes.Chat}>
                {showDrop}
                {detailsBox}
                <Main
                    user={this.props.user}
                    messages={this.props.conversation}
                    logout={this.logout} />
                <Composer
                    msg={this.state.message}
                    toggleDrop={this.toggleDrop}
                    changed={(e) => this.valueChangeHandler(e.target.value)}
                    clicked={this.btnClickHandler}
                    entered={(e) => this.barEnterHandler(e)} />
            </div>
        );
    };
};

export default Chat;