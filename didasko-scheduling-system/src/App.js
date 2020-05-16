import React, { Component } from 'react';
import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import {Route, Switch, Redirect} from 'react-router-dom';

import Signin from './components/sign-in/sign-in.component';
import Signup from './components/sign-up/sign-up.component';
import AdminPage from './Pages/admin-page/admin-page';
import SignIn from './components/sign-in/sign-in.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      accountType: "admin"
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

          console.log("FIRST STATE " + this.state);
          //this.setState({ accountType: (this.currentUser.accountType) })
          console.log(this.state.currentUser.accountType);
        });
      }

      this.setState({ currentUser: userAuth });

    });
  }

    
    

  render() {
    return (
      <div className="app-div">
          <Signin className="inner" />
        <Signup className="inner" />
        {this.accountType === "admin" ? <AdminPage/> : null}
        <Switch>
          {this.accountType === "admin" ? <AdminPage/> : null}
          {this.accountType === "manager" ? <Route component={SignIn} /> : null}
          {this.accountType === "lecturer" ? <Route component={SignIn} /> : null}

          <Route render={() =>
            this.accountType === "admin" ? (
              <Redirect to='/' />
            ) : (
                <AdminPage />
              )}
          />
          
        </Switch>
        <AdminPage></AdminPage>

      </div>
    );
  }
}

export default App;
