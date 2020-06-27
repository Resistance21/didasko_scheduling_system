import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase.utils'


import './modify-account-style.scss'

class ModifyAccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: '',
            subjects: [],
            nameInput: '',
            emailInput: ''

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

    componentDidMount = () => {


        firestore.collection('user').get().then((snapShot) => {
            const dropDown = document.querySelector('#modify-account-dropdown');
            let DropDownString = [];
            snapShot.forEach(doc => {
                console.log('Snap', doc.data())
                DropDownString.push(doc.data().email); 
            })
            let dropDownOrder = DropDownString.sort()
            dropDownOrder.forEach((el) => {
                const option = (document.createElement("option"));
                option.text = el;
                dropDown.add(option); 
            })

        })

        firestore.collection('subjects').doc('subjectList').get().then((snapShot) => {
            const checkBoxGrid = document.querySelector('#subject-teach');
            let DropDownString = [];
            for (let key in snapShot.data()) {               
                if (snapShot.data().hasOwnProperty(key)) {
                    DropDownString.push(snapShot.data()[key].title); 
                }
            }
            let dropDownOrder = DropDownString.sort()
            dropDownOrder.forEach((el) => {
                const appendChildEl = document.createElement("INPUT");
                appendChildEl.setAttribute("type", "checkbox");
                const appendLabel = document.createElement("LABEL");
                appendLabel.innerHTML = el
                //appendLabel.value = el
                checkBoxGrid.appendChild(appendLabel)
                checkBoxGrid.appendChild(appendChildEl)
                /* const option = (document.createElement("option"));
                option.text = el;
                dropDown.add(option); */
                //console.log("ORDER", el)
                //console.log("next item ", ((arr.length - 1 === index) ? "END" : arr[index + 1].text))
                //orderedDropDown.sort()   
            })

        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    onDropDownChange() {
        const dropDown = document.querySelector('#modify-account-dropdown');
        const nameInput = document.querySelector('#modify-name-input');
        const emailInput = document.querySelector('#modify-email-input');
        //const classDropDown = document.querySelector('#subjects-class-picker-dropdown');
        let dropDownValue = dropDown.value;

        firestore.collection('user').where('email', '==', dropDownValue).get().then(snapShot => {
            snapShot.forEach(doc => {
                const radioInput = document.querySelector(`#modify-account-radio-${doc.data().accountType}`);
                nameInput.value = doc.data().displayName;
                emailInput.value = doc.data().email;
                console.log(doc.id, " => ", doc.data())
                radioInput.checked = true;
                
            })
        })

    }
    

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                
                <h2 className='title'>Modify User Account</h2>
                <select name='subjects' id='modify-account-dropdown' onChange={this.onDropDownChange} ></select>
                <form className='sign-up' onSubmit={this.handleSubmit} >
                    <FormInput id='modify-name-input' className='form-input' type='text' name='displayName'
                        value={displayName} onChange={this.handleChange} label='' required />
                    <FormInput id='modify-email-input' className='form-input' type='email' name='email'
                        value={email} onChange={this.handleChange} label='' required />
                    
                    <div id='subject-teach'>

                    </div>


                    <div id='account-type-grid-holder'>
                    
                    <label>Admin</label>

                    <input id='modify-account-radio-admin' className='form-input' type='radio' name='accountType'
                        value={"admin"} label='Admin' required />
                    <label>Manager</label>
                    <input id='modify-account-radio-manager' className='form-input' type='radio' name='accountType'
                        value={"manager"} label='Manager' required />
                    <label>Lecturer</label>
                    <input id='modify-account-radio-lecturer' className='form-input' type='radio' name='accountType'
                        value={"lecturer"} label='Lecturer' required />

                    </div>
                    <CustomButton type='submit' >Modify</CustomButton>

                </form>

            </div>
        )
    }
}

export default ModifyAccount;