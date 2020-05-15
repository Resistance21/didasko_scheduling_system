import React, { Component } from 'react';

import './sign-in.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        
        try {
            await auth.signInWithEmailAndPassword(email, password); 
            this.setState({ email: '', password: '' });
            
        }
        catch(error){
            console.error(error);
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' value={this.state.email} handleChange={this.handleChange} label='email' required />
                    <FormInput name='password' value={this.state.password} type='password' handleChange={this.handleChange} label='password' required />
                    <div className='buttons'>
                        <CustomButton type='submit'> SIGN IN</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn > SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                </form>

            </div>
        );
    }
       
    
}

export default SignIn;