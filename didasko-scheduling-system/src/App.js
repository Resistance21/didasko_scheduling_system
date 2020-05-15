import React, { Component } from 'react';
import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Signin from './components/sign-in/sign-in.component';
import Signup from './components/sign-up/sign-up.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
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
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }
    
    

  render() {
    return (
      <div>
        <Signin />
        <Signup />

      </div>
    );
  }
}

export default App;
