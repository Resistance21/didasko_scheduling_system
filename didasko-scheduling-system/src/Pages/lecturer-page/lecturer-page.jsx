import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import './lecturer-page-style.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
import Schedule from '../../components/schedule/schedule-component';

const adminPage = () =>{
    return(
        <div id='lecturer-page-container' className='homepage'>
            <div id='navbar-lecturer'>
                <CustomButton>HOME</CustomButton>
                <CustomButton>Schedule</CustomButton>
                <CustomButton>Other thing</CustomButton>
                <CustomButton>More things</CustomButton>
            </div>
            {/* <Schedule className="content-lecturer" /> */}
            <div className="content-lecturer">
            <Schedule /> 

            </div>
            
        </div>
    )
}

export default adminPage;