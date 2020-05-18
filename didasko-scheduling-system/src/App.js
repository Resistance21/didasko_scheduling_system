import React, { Component } from 'react';
import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import {Route, Switch, Redirect} from 'react-router-dom';

import Signin from './components/sign-in/sign-in.component';
import Signup from './components/sign-up/sign-up.component';
import AdminPage from './Pages/admin-page/admin-page';
import ManagerPage from './Pages/manager-page/manager-page';
import LecturerPage from './Pages/lecturer-page/lecturer-page';
import SignIn from './components/sign-in/sign-in.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      accountType: "lecturer"
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              accountType: snapShot.accountType,
              ...snapShot.data()
            }
          });

          console.log(this.state.currentUser);
          console.log(this.state.currentUser.accountType);
          this.setState({ accountType: this.state.currentUser.accountType });
          console.log(this.state.accountType);
          //this.setState({ currentUser: null });
        });
      }

      this.setState({ currentUser: userAuth });
      this.setState({ accountType: "manager" });
      console.log(this.state.accountType);

    });
  }

    

  render() {
    return (
      <div className="app-div">
        <Signin className="inner" />
        <Signup className="inner" />
        {this.state.accountType === "admin" ? <ManagerPage/> : null}
        <Switch>
          {this.state.accountType === "admin" ? <AdminPage/> : null}
          {this.state.accountType === "manager" ? <ManagerPage/> : null}
          {this.state.accountType === "lecturer" ? <LecturerPage /> : null} 
          {console.log("STATE user: " + this.state.currentUser)}
        </Switch>
        {this.state.currentUser === null ?
            <div className="app-div">
              <SignIn className="inner" />
              <Signup className="inner" />
              {console.log("inside sing in")}
            </div> :null} 
      </div>
    );
  }
}

export default App;
