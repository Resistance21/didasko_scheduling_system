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
import ScheduleRowSubject from './components/schedule-row-subject/schedule-row-subject-component'

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
      
      if (user) {
              firestore.collection('user').doc(user.uid).get().then((doc) => {
                this.setState({
                  uid: user.uid,
                  email: user.email,
                  displayName: doc.data().displayName,
                  accountType: doc.data().accountType,
                  currentUser: {
                    uid: user.uid,
                    email: doc.data().email,
                    displayName: doc.data().displayName,
                    accountType: doc.data().accountType,
                    schedules: doc.data().schedules,
                    subjects: doc.data().subjects
                  },
                })
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
            <div className='header'>header</div>
          <div className='content-signout'>
              <CSVUpload />
            {/* <CustomButton onClick={this.logOut}>LOG OUT</CustomButton> */}
            <Route render={({ history }) => (
              <CustomButton onClick={() => { history.push('/'); this.logOut()} }>Logout</CustomButton>   
                )} />
            </div>
            {this.state.currentUser.accountType === "admin" ? <div className='content'> <AdminPage className="lecturer-page" currentUser={this.state.currentUser} /></div> : null}
            {this.state.currentUser.accountType === "manager" ? <div className='content'> <ManagerPage className="lecturer-page" currentUser={this.state.currentUser} /></div> : null}
            {this.state.currentUser.accountType === "lecturer" ? <div className='content'> <LecturerPage className="lecturer-page" currentUser={this.state.currentUser} /></div> : null}
            {this.state.currentUser.accountType === "" ? <div className='content'> <SignInPage /></div> : null}
            
            
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
      </div>
    );
  }

}

export default App;
