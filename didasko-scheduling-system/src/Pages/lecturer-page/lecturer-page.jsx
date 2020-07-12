import React from 'react';
import {Route, Switch,} from 'react-router-dom';

import './lecturer-page-style.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
/* import Schedule from '../../components/schedule/schedule-component';
import ReportsPage from '../reports-page/reports-page';
import CreateAccount from '../../components/create-account/create-account-component'
import ModifyAccount from '../../components/modify-account/modify-account-component'
import ModifySchedule from '../../components/modify-schedule/modify-schedule-component' */
import LecturerSchedule from '../../components/lecturer-schedule/lecturer-schedule-component'
import DidaskoLogoImage from '../../images/La-Trobe-Didasko_C_HD.jpg'

const LecturerPage = ({currentUser}) =>{
    return(
        <div className='account-content'>
            <div id='navbar'>
                <img id='nav-bar-image' src={DidaskoLogoImage} alt="La-Trobe-Didasko" width='250' height='250'/>
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/')} } homeButton={true}>Home</CustomButton>   
                )} />
                <Route render={({ history }) => (
                <CustomButton onClick={() => { history.push('/schedule')} }>Schedule</CustomButton>   
                )} />
                {/* <Route render={({ history }) => (
                    <CustomButton onClick={() => { history.push('/report')} }>Reports</CustomButton>
                )} /> */}

            </div>
    
            <div className="content">
                <Switch>
                    <Route exact path='/' render={() => <div>Home Page Lecturer</div>} />
                    {/* <Route exact path='/' render={() => <CreateAccount/>} /> */}
                    <Route exact path='/schedule' render={() => <LecturerSchedule currentUser={currentUser} />} />
                    {/* <Route exact path='/report' render={() => <ReportsPage />} />  */}
                </Switch>


            </div>
            
        </div>
    )
}

export default LecturerPage;