import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase.utils'

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

    componentDidMount = () => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            
        });
        unsubscribe();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const firstName = document.querySelector('#input-first-name');
        const lastName = document.querySelector('#input-last-name');
        const email = document.querySelector('#input-email');
        const password = document.querySelector('#input-password');
        const passwordCheck = document.querySelector('#input-password-check');
        let checkedAccountType = "";
        const checkedSubjects = [];
        const checkBoxes = document.getElementsByName("subjects")
        const createdAt = new Date();

        for (var i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
                checkedSubjects.push(checkBoxes[i].value);
                console.log(checkBoxes[i].value)
            }
        }

        const checkRadio = document.getElementsByName("accountType");
        for (var j = 0; j < checkRadio.length; j++) {
            if (checkRadio[j].checked) {
                checkedAccountType = checkRadio[j].value;
            }
        }

        //const { displayName, email, password, confirmPassword,} = this.state;
        if (password.value !== passwordCheck.value) {
            alert("password do not match");
            return;
        }

        try {
            auth.createUserWithEmailAndPassword(email.value, password.value).catch(error => {
                console.error(error)
            });
                /* .then((user) => {
                firestore.collection('user').doc(user.uid).set({
                    accountType: checkedAccountType,
                    createdAt: createdAt,
                    email: email.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    qualifications: {},
                    weights: {
                        apr: 0,
                        aug: 0,
                        dec: 0,
                        feb: 0,
                        jan: 0,
                        jul: 0,
                        mar: 0,
                        may: 0,
                        nov: 0,
                        oct: 0,
                        sep: 0
                    }
                }).then(() => { return console.log('done') }) */
            /* }).catch(error => {
                console.error(error)
            }); */
            //const user = auth.currentUser;
            //console.log(" Displayname :" + displayName + " checked Account :" + checkedAccountType + " Checksubjecy: " + checkedSubjects)
            //console.log(JSON.stringify(user))
            //await createUserProfileDocument(user, displayName, email, checkedAccountType, checkedSubjects)
            
            /* this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }) */
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
            <div className='create-account-container'>
                <h2 className='title'>Create User Account</h2>
                <form>
                    <div>First Name:</div>
                    <input id='input-first-name' className='form-input' type='text' name='displayName'
                         label='Display Name' required />
                    <div>Last Name:</div>
                    <input id='input-last-name' className='form-input' type='text' name='displayName'
                         label='Display Name' required />
                    <div>Email:</div>
                    <input id='input-email' className='form-input' type='email' name='email'
                         label='Email' required />
                    <div>Password:</div>
                    <input id='input-password' className='form-input' type='password' name='password'
                         label='Password' required />
                    <div>Retype Password</div>
                    <input id='input-password-check' className='form-input' type='password' name='confirmPassword'
                         label='Confirm Password' required />
                    <label>Admin</label>
                    <input className='form-input' type='radio' name='accountType'
                        value={"admin"} label='Admin' required />
                    <label>Manager</label>
                    <input className='form-input' type='radio' name='accountType'
                        value={"manager"} label='Manager' required />
                    <label>Lecturer</label>
                    <input className='form-input' type='radio' name='accountType'
                        value={"lecturer"} label='Lecturer' required />
                    <CustomButton type='submit' onClick={this.handleSubmit} >Create</CustomButton>

                </form>

            </div>
        )
    }
}

export default CreateAccount;