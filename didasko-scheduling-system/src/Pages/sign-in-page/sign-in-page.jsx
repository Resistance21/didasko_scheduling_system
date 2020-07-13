import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component'
import DidaskoLogo from '../../images/La-Trobe-Didasko_C_HD.jpg';

import './sign-in-page-style.scss';

const SignInPage = () =>{
    return (
        <div className='sign-in-page-container'>
            <div className='image grid-square'>
                <img src={DidaskoLogo} alt="La-Trobe-Didasko" width='250' height='250' />   
            </div>
            <div className='grid-square'>
                <SignIn/>
            </div>
        </div>
    )
}

export default SignInPage;