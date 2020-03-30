import React, { Component } from "react";

import classes from './Login.module.css';
import { signIn, signUp, signInWithGoogle } from '../../fire';

class Login extends Component {
  state = {
    error: null,
    email: "",
    password: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signIn = async (event) => {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signIn(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  signUp = async (event) => {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signUp(this.state.email, this.state.password);
    }
    catch (error) {
      this.setState({ error: error.message });
    }
  };

  googleSignIn = async () => {
    try {
      await signInWithGoogle();
    }
    catch (error) {
      this.setState({ error: error.message });
    }
  };
  render() {
    return (<div className={classes.Login__Container}>
      <h1 className={classes.Title}> Login to FireChat </h1>
      <div className={classes.Login}>
        <div className={classes.Join}>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <input
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
          />
          <div>
            <button onClick={(e) => this.signIn(e)}>SignIn</button>
            <button onClick={(e) => this.signUp(e)}>SignUp</button>
            <span className={classes.Google} onClick={this.googleSignIn}>signIn with Google</span>
          </div>
        </div>
        <div className={classes.Error}>
          {this.state.error ? (
            <p>{this.state.error}</p>
          ) : null}
        </div>
      </div>
    </div>);
  };
}

export default Login;