import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase.utils'

import './weight-control-style.scss'

class WeightControl extends Component {
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


    componentDidMount = async() => {
        const weightList = await firestore.collection('weights').get().then((snapShot) => {
            let tempWeightList = [];
            for (const snap of snapShot.docs) {
                tempWeightList.push([[snap.id],[snap.data()]]);     
            }

            let dropDownOrder = tempWeightList.sort()
            return dropDownOrder
        })

        const weightStudentAmountList = await firestore.collection('weights/number of students weights/number break points').get().then((snapShot) => {
            let tempWeightList = [];
            for (const snap of snapShot.docs) {
                tempWeightList.push([[snap.id],[snap.data()]]);     
            }

            let dropDownOrder = tempWeightList.sort()
            return dropDownOrder
        })


        const weightModifyDropDown = document.querySelector('#weight-modify-picker-dropdown');
        weightList.forEach((el) => {
            console.log("weightlist array", el)
            if (el[0][0] === 'number of students weights') {
                
            } else {
                const option = (document.createElement("option"));
                option.text = el[0][0];
                option.dataset.subjectId = el[1][0] 
                weightModifyDropDown.add(option); 
                
            }
        })

        const weightDeleteDropDown = document.querySelector('#weight-delete-picker-dropdown');
        weightList.forEach((el) => {
            if (el[0][0] === 'number of students weights') {
                
            } else {
                const option = (document.createElement("option"));
                option.text = el[0][0];
                option.dataset.subjectId = el[1][0] 
                weightDeleteDropDown.add(option);               
            } 
        })

        weightStudentAmountList.sort((a, b) => {
            return a[1][0].count - b[1][0].count;
          });

        const weightStudentCountDropDown = document.querySelector('#weight-modify-student-amount-picker-dropdown');
        console.log('weightstudetnamount', weightStudentAmountList)
        weightStudentAmountList.forEach(el => {
            const option = (document.createElement("option"));
                option.text = el[0];
                option.dataset.weightAmount = el[1][0].weight 
                weightStudentCountDropDown.add(option); 
        })

        const weightStudentAmountDeleteDropDown = document.querySelector('#weight-delete-student-amount-picker-dropdown');
        weightStudentAmountList.forEach(el => {
            const option = (document.createElement("option"));
                option.text = el[0];
                option.dataset.weightAmount = el[1][0].weight 
                weightStudentAmountDeleteDropDown.add(option); 
        })
    }

    onDropDownChange = async(event) => {
        const dropDown = document.querySelector(`#${event.target.id}`);
        let dropDownValue = dropDown.value;
        if (event.target.id === 'weight-modify-picker-dropdown') {
            const weightModifyName = document.querySelector('#weight-modify-name');
            const weightAmount = document.querySelector(`#weight-modify-number`);
            weightModifyName.value = dropDownValue;
            await firestore.collection('weights').doc(dropDownValue).get().then(doc => {
                weightAmount.value = doc.data().weight;              
            })      
        } else if (event.target.id === 'weight-modify-student-amount-picker-dropdown') {
            const currentWeightDropDown = document.querySelector('#weight-modify-student-amount-picker-dropdown');
            const newWeightName = document.querySelector('#weight-modify-student-amount-name')
            const weightAmount = document.querySelector('#weight-modify-student-amount-number');
            newWeightName.value = currentWeightDropDown.value;


            await firestore.collection('weights/number of students weights/number break points')
                .doc(currentWeightDropDown.value).get().then(doc => {
                    weightAmount.value = doc.data().weight
                })
        }

    }

    createWeight = async (event) => {
        event.preventDefault();
        const weightName = document.querySelector('#create-new-weight-name-input');
        const weightAmount = document.querySelector('#create-new-weight-name-amount');

        await firestore.collection('weights').doc(weightName.value).set({
            weight: parseFloat(weightAmount.value)
        })
        
    }

    modifyWeight = async (event) => {
        event.preventDefault();
        const weightNameDropDown = document.querySelector('#weight-modify-picker-dropdown');
        const weightModifyName = document.querySelector('#weight-modify-name');
        const weightAmountInput = document.querySelector('#weight-modify-number');

        await firestore.collection('weights').doc(weightNameDropDown.value).delete();

        await firestore.collection('weights').doc(weightModifyName.value).set({
            weight: parseFloat(weightAmountInput.value)
        })

    }

    deleteWeight = async (event) => {
        event.preventDefault();
        const deleteWeightDropDown = document.querySelector('#weight-delete-picker-dropdown');

        await firestore.collection('weights').doc(deleteWeightDropDown.value).delete()
    }

    createNewStudentAmountWeight = async (event) => {
        event.preventDefault();
        const weightName = document.querySelector("#weight-create-student-amount-name");
        const weightAmount = document.querySelector('#create-new-weight-student-amount');

        await firestore.collection('weights/number of students weights/number break points').doc(weightName.value).set({
            count: parseInt(weightName.value),
            weight: parseFloat(weightAmount.value)
        })
    }

    modifyStudnetCountWeight = async (event) => {
        event.preventDefault();
        const currentWeightDropDown = document.querySelector('#weight-modify-student-amount-picker-dropdown');
        const newWeightName = document.querySelector('#weight-modify-student-amount-name');
        const weightAmount = document.querySelector('#weight-modify-student-amount-number');

        await firestore.collection('weights/number of students weights/number break points').doc(currentWeightDropDown.value).delete();
        await firestore.collection('weights/number of students weights/number break points').doc(newWeightName.value).set({
            count: parseInt(newWeightName.value),
            weight: parseFloat(weightAmount.value)
        })
    }

    deleteStudentAmountWeight = async (event) => {
        event.preventDefault()
        const deleteStudentAmountWeight = document.querySelector('#weight-delete-student-amount-picker-dropdown');

        await firestore.collection('weights/number of students weights/number break points').doc(deleteStudentAmountWeight.value).delete()
    }
    

    render() {
        return (
            <div className='weight-control-container'>
                <h1>Weight Control</h1>
                <div className='control-grid-container'>
                    <div>
                        <h2 className='title'>Create New Weight</h2>
                        <form className='form-column'>
                        <label>Weight Name</label> <input type='text' id='create-new-weight-name-input'></input>
                        <label>Weight Amount</label> <input type='number' step='0.1' min='0' id='create-new-weight-name-amount'></input>
                        <CustomButton type='submit' onClick={this.createWeight} >Create</CustomButton>

                        </form>
                        
                        <h2 className='title'>Modify Weight</h2>
                        <form className='form-column'>
                            <label>Current Weights</label>
                            <select name='subjects' id='weight-modify-picker-dropdown' onChange={this.onDropDownChange} ></select>
                            <label>New Weight Name</label>
                            <input type='text' id='weight-modify-name'></input>
                            <label>Weight Amount</label>
                            <input type='number' step='0.1' min='0' id='weight-modify-number'></input>
                            <CustomButton type='submit' onClick={this.modifyWeight} >Modify</CustomButton>

                        </form>
                    
                        <h2 className='title'>Delete Weight</h2>
                        <form className='form-column'>
                        <select name='subjects' id='weight-delete-picker-dropdown'></select>
                        <CustomButton type='submit' onClick={this.deleteWeight} >Delete</CustomButton>

                        </form>

                    </div>
                    <div>
                        <h2 className='title'>Create New Student Amount Weight</h2>
                        <form className='form-column'>
                        <label>Weight Name</label> <input type='number' step='1' min='0' id='weight-create-student-amount-name'></input>
                        <label>Weight Amount</label> <input type='number' step='0.1' min='0' id='create-new-weight-student-amount'></input>
                        <CustomButton type='submit' onClick={this.createNewStudentAmountWeight} >Create</CustomButton>

                        </form>

                        <h2 className='title'>Modify Student Amount Weight</h2>
                        <form className='form-column'>
                            <label>Current Weights</label>
                            <select name='subjects' id='weight-modify-student-amount-picker-dropdown' onChange={this.onDropDownChange} ></select>
                            <label>New Weight Name</label>
                            <input type='number' step='1' min='0' id='weight-modify-student-amount-name'></input>
                            <label>Weight Amount</label>
                            <input type='number' step='0.1' min='0' id='weight-modify-student-amount-number'></input>
                            <CustomButton type='submit' onClick={this.modifyStudnetCountWeight} >Modify</CustomButton>

                        </form>

                        <h2 className='title'>Delete Student Amount Weight</h2>
                        <form className='form-column'>
                        <select name='subjects' id='weight-delete-student-amount-picker-dropdown'></select>
                        <CustomButton type='submit' onClick={this.deleteStudentAmountWeight} >Delete</CustomButton>

                        </form>

                    </div>
                </div>
                
            </div>
        )
    }
}

export default WeightControl;