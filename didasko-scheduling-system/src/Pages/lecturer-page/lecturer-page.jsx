import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import './lecturer-page-style.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
import Schedule from '../../components/schedule/schedule-component';
import ReportsPage from '../reports-page/reports-page';
import CreateAccount from '../../components/create-account/create-account-component'
import ModifyAccount from '../../components/modify-account/modify-account-component'
import ModifySchedule from '../../components/modify-schedule/modify-schedule-component'

const LecturerPage = ({currentUser}) =>{
    return(
        <div id='lecturer-page-container' className='homepage'>
            <div id='navbar-lecturer'>
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/')} }>Home</CustomButton>   
                )} />
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/schedule')} }>Schedule</CustomButton>   
                )} />
                {/* <Route render={({ history }) => (
                    <CustomButton onClick={() => { history.push('/report')} }>Reports</CustomButton>
                )} /> */}
                    


            </div>
            {/* <Schedule className="content-lecturer" /> */}
            <div className="content-lecturer">
                <Switch>
                    <Route exact path='/' render={() => <div>Home Page Lecturer</div>} />
                    {/* <Route exact path='/' render={() => <CreateAccount/>} /> */}
                    <Route exact path='/schedule' render={() => <Schedule currentUser={currentUser} />} />
                    {/* <Route exact path='/report' render={() => <ReportsPage />} />  */}
                </Switch>


            </div>
            
        </div>
    )
}

export default LecturerPage;