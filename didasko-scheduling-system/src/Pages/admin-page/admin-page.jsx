import React from 'react';
import {Route, Switch,} from 'react-router-dom';
import CustomButton from '../../components/custom-button/custom-button.component';
//import Schedule from '../../components/schedule/schedule-component';
import ReportsPage from '../reports-page/reports-page';
import CreateAccount from '../../components/create-account/create-account-component'
import ModifyAccount from '../../components/modify-account/modify-account-component'
import ModifySchedule from '../../components/modify-schedule/modify-schedule-component'
import InstanceControl from '../../components/instance-control/instance-control-component'
import SubjectControl from '../../components/subject-control/subject-control-component'
import WeightControl from '../../components/weight-control/weight-control-component'
import LecturerSchedule from '../../components/lecturer-schedule/lecturer-schedule-component'
import DidaskoLogoImage from '../../images/La-Trobe-Didasko_C_HD.jpg'

import './admin-page-style.scss';

const AdminPage = ({currentUser}) =>{
    return(
        <div className='account-content'>
            <div id='navbar'>
                <img id='nav-bar-image' src={DidaskoLogoImage} alt="La-Trobe-Didasko" width='250' height='250'/>
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/')}} homeButton={true}>Home</CustomButton>   
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
            <div className="content">
                <Switch>
                    <Route exact path='/' render={() => <div>Home Page Admin</div>} />
                    {/* <Route exact path='/' render={() => <CreateAccount/>} /> */}
                    <Route exact path='/schedule' render={() => <LecturerSchedule currentUser={currentUser} />} />
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