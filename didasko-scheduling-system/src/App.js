import React, { Component } from 'react';
import './App.scss';

import { auth, firestore } from './firebase/firebase.utils';

//import {Route, Switch, Redirect} from 'react-router-dom';

//import Signin from './components/sign-in/sign-in.component';
//import Signup from './components/sign-up/sign-up.component';
import AdminPage from './Pages/admin-page/admin-page';
import ManagerPage from './Pages/manager-page/manager-page';
import LecturerPage from './Pages/lecturer-page/lecturer-page';
//import SignIn from './components/sign-in/sign-in.component';
//import Schedule from './components/schedule/schedule-component';
///import CSVUpload from './components/csv-uploader/csv-uploader-component'
import SignInPage from './Pages/sign-in-page/sign-in-page'
import CustomButton from './components/custom-button/custom-button.component'

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      email: '',
      displayName: '',
      accountType: "",
      fetching: true

    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log(this.state.fetching)
    auth.onAuthStateChanged(user => {
      if (user) {
        firestore.collection('user').doc(user.uid).get().then((doc) => {
          this.setState({
            fetching: false,
            email: user.email,
            displayName: doc.data().displayName,
            accountType: doc.data().accountType,
            currentUser: {
              email: user.email,
              displayName: doc.data().displayName,
              accountType: doc.data().accountType,
              schedules: doc.data().schedules,
              subjects: doc.data().subjects
            },
          })
          console.log(this.state);
          /* console.log(this.state);
          console.log("FALSE LOADING1:" + this.state.fetching)
          console.log(this.state.currentUser.displayName)
          console.log(this.state.currentUser.email)
          console.log(this.state.currentUser.accountType)
          console.log(this.state.currentUser.schedules)
          console.log(this.state.currentUser.subjects)
          console.log("FALSE LOADING2:" + this.state.fetching) */
        })
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
/*     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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
        });
      }

      this.setState({ currentUser: userAuth });
      this.setState({ accountType: "manager" });
      console.log(this.state.accountType);

    }); */
  }

  logOut = () => {
    auth.signOut().then(() => {
      console.log("STATE", this.state)
      console.log("LOGGED OUT");
      console.log("STATE", this.state)
      this.setState({ accountType: "" })
      console.log("STATE", this.state)
    }).catch(function(error) {
      // An error happened.
    });
  }

    

  render() {

    return (
      <div id='main-grid' className="app-div">
        <div className='header'>header</div>
        <div className='content-signout'>
          <CustomButton onClick={this.logOut}>LOG OUT</CustomButton>
        </div>
        {this.state.accountType === "admin" ? <div className='content'> <AdminPage/></div>  : null}
        {this.state.accountType === "manager" ? <div className='content'> <ManagerPage/></div>  : null}
        {this.state.accountType === "lecturer" ? <div className='content'> <LecturerPage/></div>  : null}
        {this.state.accountType === "" ? <div className='content'> <SignInPage/></div> : null}
        
        {/* <Switch>
        {console.log(this.state.currentUser)}
          {this.state.fetching ? <div> L O A D I N G </div> :
            <Route exact path="/schedule"  component={Schedule} />
          }
        </Switch>
          <CSVUpload />
        {this.state.currentUser === null ?
            <div className="app-div">
              <SignIn className="inner" />
              <Signup className="inner" />
              {console.log("inside sing in")}
            </div> :null} */} 
          <div className='footer'>TEST</div>
      </div>
    );
  }
}

export default App;
