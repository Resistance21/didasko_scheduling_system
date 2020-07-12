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
            emailInput: '',
            selectedUserID: ''

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
                DropDownString.push([doc.data().email, doc.id]); 
            })
            let dropDownOrder = DropDownString.sort()
            dropDownOrder.forEach((el) => {
                const option = (document.createElement("option"));
                option.text = el[0];
                option.dataset.userId = el[1];
                dropDown.add(option); 
            })

        })

        firestore.collection('subjects').doc('subjectList').get().then((snapShot) => {
            const checkBoxGrid = document.querySelector('#subject-list');
            let DropDownString = [];
            for (let key in snapShot.data()) {               
                if (snapShot.data().hasOwnProperty(key)) {
                    DropDownString.push([snapShot.data()[key].title, snapShot.data()[key].code]); 
                }
            }
            let dropDownOrder = DropDownString.sort()
            dropDownOrder.forEach((el) => {
                const newDiv = document.createElement('div');

                const appendChildEl = document.createElement("INPUT");
                appendChildEl.setAttribute("type", "checkbox");
                appendChildEl.dataset.subjectName = el[0];
                appendChildEl.dataset.subjectCode = el[1];

                const appendLabel = document.createElement("LABEL");
                appendLabel.innerHTML = el[0]
                newDiv.classList.add('subject-name');
                newDiv.appendChild(appendLabel);
                newDiv.appendChild(appendChildEl);
                checkBoxGrid.appendChild(newDiv)
                
                //checkBoxGrid.appendChild(appendChildEl) 
            })

        })
    }

    onDropDownChange = async() => {
        const dropDown = document.querySelector('#modify-account-dropdown');
        const nameInputField = document.querySelector('#modify-name-input');
        const emailInputField = document.querySelector('#modify-email-input');
        const allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
        allCheckBoxes.forEach(el => {
            el.checked = false;
        })
        let dropDownValue = dropDown.value;

        await firestore.collection('user').where('email', '==', dropDownValue).get().then(snapShot => {

            for(let doc of snapShot.docs) {
                const radioInput = document.querySelector(`#modify-account-radio-${doc.data().accountType}`);
                nameInputField.value = doc.data().displayName;
                emailInputField.value = doc.data().email;
                console.log(doc.id, " => ", doc.data())
                radioInput.checked = true;


                if (doc.data().qualifications !=  null || doc.data().qualifications != undefined ) {
                    for (var key of Object.keys(doc.data().qualifications)) {
                        const checkbox = document.querySelector(`[data-subject-code="${key}"]`);
                        checkbox.checked = true;
                        console.log('key', key)
                    }
                    
                }

                this.setState({
                    selectedUserID: doc.id
                })
            }
        })
    }

    modifyAccount = async (event) => {
        event.preventDefault();
        const { selectedUserID } = this.state;
        const batch = firestore.batch();
        const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        const unCheckBoxes = document.querySelectorAll('input[type=checkbox]:not(:checked)');
        const dbRef = firestore.collection(`user/${selectedUserID}/qualifications`);
        console.log('checkboxes', checkboxes)
        let checkBoxOBJ = {}

        checkboxes.forEach(el => {
            checkBoxOBJ = {
                ...checkBoxOBJ,
                [el.dataset.subjectCode]:[el.dataset.subjectCode, el.dataset.subjectName]
            }
        })

        console.log('obj', checkBoxOBJ)

        await firestore.collection('user').doc(selectedUserID).update({
            qualifications: checkBoxOBJ
        })       

    }
    

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='modify-account-container'>
                
                <h1 className='title'>Modify User Account</h1>
                <h2>Please select Account:</h2>
                <h3>Account Email:</h3>
                <select name='subjects' id='modify-account-dropdown' onChange={this.onDropDownChange} ></select>
                <form>
                    <div>First Name:</div>
                    <input id='modify-name-input' className='form-input' type='text' name='displayName' label='' required />
                    <div>Last Name:</div>
                    <input id='modify-email-input' className='form-input' type='email' name='email' label='' required />
                    
                    <h2>Account Qualifications: </h2>
                    <div id='subject-list'>

                    </div>


                    <h2>Account Level:</h2>
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
                    <div className="button-wrapper">
                        <CustomButton type='button' onClick={this.modifyAccount} >Modify Account</CustomButton>

                    </div>

                </form>

            </div>
        )
    }
}

export default ModifyAccount;