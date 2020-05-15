import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.scss'

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: '',
            subjects: [],

        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        let checkedAccountType = "";
        const checkedSubjects = [];
        const checkBoxes = document.getElementsByName("subjects")

        for (var i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
                checkedSubjects.push(checkBoxes[i].value);
                console.log(checkBoxes[i].value)
            }
        }
        console.log(checkedSubjects)

        const checkRadio = document.getElementsByName("accountType");
        for (var j = 0; j < checkRadio.length; j++) {
            if (checkRadio[j].checked) {
                checkedAccountType = checkRadio[j].value;
            }
        }

        const { displayName, email, password, confirmPassword,} = this.state;
        if (password !== confirmPassword) {
            alert("password do not match");
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            const user = auth.currentUser;
            //console.log(" Displayname :" + displayName + " checked Account :" + checkedAccountType + " Checksubjecy: " + checkedSubjects)
            //console.log(JSON.stringify(user))
            await createUserProfileDocument(user, displayName, email, checkedAccountType, checkedSubjects)
            
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
        catch(error){
            console.error(error)
        }

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up' onSubmit={this.handleSubmit} >
                    <FormInput className='form-input' type='text' name='displayName'
                        value={displayName} onChange={this.handleChange} label='Display Name' required />
                    <FormInput className='form-input' type='email' name='email'
                        value={email} onChange={this.handleChange} label='Email' required />
                    <FormInput className='form-input' type='password' name='password'
                        value={password} onChange={this.handleChange} label='Password' required />
                    <FormInput className='form-input' type='password' name='confirmPassword'
                        value={confirmPassword} onChange={this.handleChange} label='Confirm Password' required />
                    <FormInput className='form-input' type='checkbox' name='subjects'
                        value={"subject-1"} label='subject-1'   />
                    <FormInput className='form-input' type='checkbox' name='subjects'
                        value={"subject-2"} label='subject-2'   />
                    <FormInput className='form-input' type='checkbox' name='subjects'
                        value={"subject-3"} label='subject-3'  />
                    <FormInput className='form-input' type='radio' name='accountType'
                        value={"admin"} label='Admin' required />
                    <FormInput className='form-input' type='radio' name='accountType'
                        value={"manager"} label='Manager' required />
                    <FormInput className='form-input' type='radio' name='accountType'
                        value={"lecturer"} label='Lecturer' required />
                    <CustomButton type='submit' >Sign Up</CustomButton>

                </form>

            </div>
        )
    }
}

export default SignUp;