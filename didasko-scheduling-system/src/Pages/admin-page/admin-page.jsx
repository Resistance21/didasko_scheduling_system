import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import CustomButton from '../../components/custom-button/custom-button.component';
import Schedule from '../../components/schedule/schedule-component';
import ReportsPage from '../reports-page/reports-page';
import CreateAccount from '../../components/create-account/create-account-component'
import ModifyAccount from '../../components/modify-account/modify-account-component'
import ModifySchedule from '../../components/modify-schedule/modify-schedule-component'
import InstanceControl from '../../components/instance-control/instance-control-component'
import SubjectControl from '../../components/subject-control/subject-control-component'
import WeightControl from '../../components/weight-control/weight-control-component'

import './admin-page-style.scss';

const AdminPage = ({currentUser}) =>{
    return(
        <div id='lecturer-page-container' className='homepage'>
            <div id='navbar-lecturer'>
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/')} }>Home</CustomButton>   
                )} />
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/create-account')} }>Create Account</CustomButton>   
                )} />
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/modify-account')} }>Modify Account</CustomButton>   
                )} />                
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/schedule')} }>Schedule</CustomButton>   
                )} />
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/modify-schedule')} }>Modify Schedule</CustomButton>   
                )} />
                <Route render={({ history }) => (
                    <CustomButton onClick={() => { history.push('/report')} }>Report</CustomButton>
                )} />
                <Route render={({ history }) => (
                    <CustomButton onClick={() => { history.push('/instance-control')} }>Instance Control</CustomButton>
                )} />
                <Route render={({ history }) => (
                    <CustomButton onClick={() => { history.push('/subject-control')} }>Subject Control</CustomButton>
                )} />
                <Route render={({ history }) => (
                    <CustomButton onClick={() => { history.push('/weight-control')} }>Weight Control</CustomButton>
                )} />
                    


            </div>
            {/* <Schedule className="content-lecturer" /> */}
            <div className="content-lecturer">
                <Switch>
                    <Route exact path='/' render={() => <div>Home Page Admin</div>} />
                    {/* <Route exact path='/' render={() => <CreateAccount/>} /> */}
                    <Route exact path='/schedule' render={() => <Schedule currentUser={currentUser} />} />
                    <Route exact path='/report' render={() => <ReportsPage />} /> 
                    <Route exact path='/create-account' render={() => <CreateAccount />} /> 
                    <Route exact path='/modify-account' render={() => <ModifyAccount />} /> 
                    <Route exact path='/modify-schedule' render={() => <ModifySchedule currentUser={currentUser} />} /> 
                    <Route exact path='/instance-control' render={() => <InstanceControl currentUser={currentUser} />} /> 
                    <Route exact path='/subject-control' render={() => <SubjectControl currentUser={currentUser} />} /> 
                    <Route exact path='/weight-control' render={() => <WeightControl currentUser={currentUser} />} /> 
                </Switch>


            </div>
            
        </div>
    )
}

export default AdminPage;