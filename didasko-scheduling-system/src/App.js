import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
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
import CSVUpload from './components/csv-uploader/csv-uploader-component'
import SignInPage from './Pages/sign-in-page/sign-in-page'
import CustomButton from './components/custom-button/custom-button.component'
//import ScheduleRowSubject from './components/schedule-row-subject/schedule-row-subject-component'

class App extends Component {
  constructor() {
    super();

    this.state = {
      uid: '',
      currentUser: {
        accountType: '',
      },
      email: '',
      displayName: '',
      accountType: "",
      fetching: true

    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {

    auth.onAuthStateChanged( async user => {
      console.log(user)
      if (user) {
        firestore.collection('user').doc(user.uid).get().then(async (doc) => {
          console.log('DOC', doc)
          if (!doc.exists) {
            const accountype = 'lecturer'
            const needsUpdate = 'needs updating'
            const createdAt = new Date();
            await firestore.collection('user').doc(user.uid).set({
              accountType: accountype,
              createdAt: createdAt,
              email: user.email,
              firstName: needsUpdate,
              lastName: needsUpdate,
              qualifications: {},
              weights: {
                apr: 0,
                aug: 0,
                dec: 0,
                feb: 0,
                jan: 0,
                jul: 0,
                jun: 0,
                mar: 0,
                may: 0,
                nov: 0,
                oct: 0,
                sep: 0
              }
            }).then(
              this.setState({
                uid: user.uid,
                email: user.email,
                accountType: accountype,
                currentUser: {
                  uid: user.uid,
                  email: user.email,
                  accountType: accountype,
                },
              })
            )
          }else{
            this.setState({
              uid: user.uid,
              email: user.email,
              accountType: doc.data().accountType,
              currentUser: {
                uid: user.uid,
                email: doc.data().email,
                accountType: doc.data().accountType,
              },
            })
          }
          console.log('IN CURENT USER', this.state)
          this.setState({fetching: false})
        })
      }else {
          // No user is signed in.
        this.setState({fetching: false})
      }
    })
  }

  logOut = () => {
    auth.signOut().then(() => {
      console.log("STATE", this.state)
      console.log("LOGGED OUT");
      console.log("STATE", this.state)
      this.setState({
        currentUser: {
          accountType: ""
        }
      })
      console.log("STATE", this.state)
    }).catch(function(error) {
      // An error happened.
    });
  }



  render() {

    if (this.state.fetching) {
      return (
        <div>LOADING</div> 
      )
    }


    return (
      <div className="app-div">
          <div id='main-grid'>
          <div className='header'>
            <CustomButton onClick={this.logOut}>LOG OUT</CustomButton>
            </div>
            {/* <CSVUpload /> */}
            {/* <div className='content-signout'> */}
            {/* <Route render={({ history }) => (<CustomButton onClick={() => { history.push('/'); this.logOut()} }>Logout</CustomButton>   )} /> */}
            {this.state.currentUser.accountType === "admin" ? <AdminPage className="lecturer-page" currentUser={this.state.currentUser} />: null}
            {this.state.currentUser.accountType === "manager" ? <ManagerPage className="lecturer-page" currentUser={this.state.currentUser} /> : null}
            {this.state.currentUser.accountType === "lecturer" ? <LecturerPage className="lecturer-page" currentUser={this.state.currentUser} />: null}
            {this.state.currentUser.accountType === "" ? <SignInPage /> : null}
            <div className='footer'></div>
        {/* </div> */}
        </div>
      </div>
    );
  }

}

export default App;
