import React, { Component, Fragment } from 'react';

import FireBackground from '../UI/FireBackground/FireBackground';
import Login from '../components/Index/Login';
import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../components/Chat/Chat';
import Spinner from '../UI/Spinner/Spinner';

import classes from './App.module.css';
import { autoScroll } from '../utils/autoScroll'
import {
  auth,
  createNewUser, addUserToActive,
  usersRef, activeRef, chatRef, conversationRef
} from '../fire';

//// scroll when message are loaded for the first time

class App extends Component {
  state = {
    user: null,
    allUsers: [],
    selected: {
      uid: '',    // otheruser id
      cid: ''     // chat id
    },
    conversation: {},
    loading: false
  };

  authListener = () => {
    auth().onAuthStateChanged(async (user) => {
      this.setState({loading: true});
      if (user) {
        await createNewUser(user);
        await addUserToActive(user);
        // get all user's to display in the sidebar
        usersRef.on('value', snapshot => {
          const allUsers = snapshot.val();
          // get all active user's
          activeRef.on('value', snapshot => {
            const activeUsers = snapshot.val();
            if (!activeUsers) return;
            // modifying data according to the requirement's
            let users = [];
            for (let user in allUsers) {    // here user will be the userid of the user it will same in alluser's and activeuser's
              if (activeUsers[user])
                users.push({ ...activeUsers[user], online: true });
              else
                users.push({ ...allUsers[user], online: false });
            }
            this.setState({ allUsers: users });
            this.setState({ user: user });

            // open a chat with otheruser who is at the top of the otherusers list
            if (users) this.userSelected(users[0].uid)
          });
        });
      }
      else {
        this.setState({ user: null });
      }
      this.setState({loading: false});
    });
  };

  componentDidMount() {
    this.authListener();
  };
  componentDidUpdate() {
    const $msgContainer = document.querySelector('.Msg__Container');
    if ($msgContainer) autoScroll($msgContainer);
  };

  // when a new user is selected from the sidebar
  userSelected = async (otherUserId) => {
    this.setState({loading: true});
    // if there is no chat history record available create a one in chat about the other user and the chat id
    // if available fetch -> "otheruserid: chatid" from chat->user

    let chatId = '';
    let userId = this.state.user.uid;

    const setUpCoversationListener = (id) => {
      conversationRef.child(id).on('value', snapshot => {
        const conversation = snapshot.val();
        this.setState({ conversation: conversation });
      });
    };

    const startNewConversation = () => {
      chatId = (userId > otherUserId) ? userId + otherUserId : otherUserId + userId;
      // create meta record about conversation for reference
      conversationRef.child(chatId).set({
        meta: {
          uid: userId,
          otherUser: otherUserId,
        }
      });

      //make a entry in the "chat" (with whom user have a conversation) ex -> chat->currentUser-> {otheruserid: chatid}
      const chatEntry = {};
      chatEntry[otherUserId] = chatId;
      chatRef.child(userId).update(chatEntry);

      //setup a conversation listen that will be executed on any changes made to the conversation node
      setUpCoversationListener(chatId);
    };

    if (otherUserId) {
      await chatRef.child(userId).once('value', snapshot => {
        const allChats = snapshot.val();    // list of user's with whom user have conversation at least once

        if (allChats) {
          chatId = allChats[otherUserId];  // fetching chatid of the chat that user have withe current otheruser
          if (chatId) {
            //some chats exist and an entry of chat with the other user exist open it and fetch the conversation
            conversationRef.child(chatId).on('value', snapshot => {
              const conversation = snapshot.val();
              this.setState({ conversation: conversation });
            });
          }
          else {
            // no record of chat with the current user so make a entry in chat and start a conversation
            startNewConversation();
          }
        } else {
          startNewConversation();
        }
        this.setState({ selected: { uid: otherUserId, cid: chatId } });
      });
    };
    this.setState({loading: false});
  };

  render() {
    return (
      <div className={classes.App}>
        {this.state.user ?
          <Fragment>
            {this.state.loading ? <Spinner /> : null}
            <Sidebar
              allUsers={this.state.allUsers}
              currentUser={this.state.user}
              selectUser={this.userSelected}
              selectedUser={this.state.selected.uid} />
            <Chat
              user={this.state.user}
              selected={this.state.selected}
              conversation={this.state.conversation} />
          </Fragment> :
          <Fragment>
            <FireBackground />
            <Login />
          </Fragment>}
      </div>
    );
  };
}

export default App;