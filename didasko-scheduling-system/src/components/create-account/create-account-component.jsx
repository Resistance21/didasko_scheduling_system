import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './create-account-style.scss'

class CreateAccount extends Component{
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
                <h2 className='title'>Create User Account</h2>
                <form className='sign-up' onSubmit={this.handleSubmit} >
                    <FormInput className='form-input' type='text' name='displayName'
                        value={displayName} onChange={this.handleChange} label='Display Name' required />
                    <FormInput className='form-input' type='email' name='email'
                        value={email} onChange={this.handleChange} label='Email' required />
                    <FormInput className='form-input' type='password' name='password'
                        value={password} onChange={this.handleChange} label='Password' required />
                    <FormInput className='form-input' type='password' name='confirmPassword'
                        value={confirmPassword} onChange={this.handleChange} label='Confirm Password' required />
                    <label>Admin</label>
                    <input className='form-input' type='radio' name='accountType'
                        value={"admin"} label='Admin' required />
                    <label>Manager</label>
                    <input className='form-input' type='radio' name='accountType'
                        value={"manager"} label='Manager' required />
                    <label>Lecturer</label>
                    <input className='form-input' type='radio' name='accountType'
                        value={"lecturer"} label='Lecturer' required />
                    <CustomButton type='submit' >Create</CustomButton>

                </form>

            </div>
        )
    }
}

export default CreateAccount;