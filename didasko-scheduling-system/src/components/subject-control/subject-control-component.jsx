import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument, firestore, firestoreTwo } from '../../firebase/firebase.utils'

import './subject-control-style.scss'

class SubjectControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: '',
            subjectList: {},

        }
    }

    componentDidMount = async () => {
        
        await firestore.collection('subjects').doc('subjectList').get().then(doc => {
            this.setState({
                subjectList: doc.data()
            })
        })


        const subjectList = await firestore.collection('subjects').doc('subjectList').get().then((snapShot) => {
            let DropDownString = [];
            for (let key in snapShot.data()) {
                if (snapShot.data().hasOwnProperty(key)) {
                    DropDownString.push([[snapShot.data()[key].title],[snapShot.data()[key].code]]);
                }
            }
            let dropDownOrder = DropDownString.sort()
            return dropDownOrder
        })

        const subjectModifyDropDown = document.querySelector('#subject-picker-modify-dropdown');
        subjectList.forEach((el) => {
            const option = (document.createElement("option"));
            option.text = el[0][0];
            option.dataset.subjectId = el[1][0] 
            subjectModifyDropDown.add(option); 
        })

        const subjectDeleteDropDown = document.querySelector('#subject-picker-delete-dropdown');
        subjectList.forEach((el) => {
            const option = (document.createElement("option"));
                option.text = el[0][0];
                option.dataset.subjectId = el[1][0] 
            subjectDeleteDropDown.add(option); 
        })
    }

    onDropDownChange = async(event) => {
        const { subjectList} = this.state;
        const dropDownID = event.target.id
        const months = ["JAN", 'FEB', 'MAR', "APR", 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        const modifySubjectDropDown = document.querySelector('#subject-picker-modify-dropdown');
        const deleteSubjectDropDown = document.querySelector('#subject-picker-delete-dropdown');
        if (dropDownID === modifySubjectDropDown.id) {
            const subjectListArray = Object.entries(subjectList);
            const modifySubjectCodeNewInput = document.querySelector('#subject-code-new-modify-input');
            const modifySubjectCodeOldInput = document.querySelector('#subject-code-old-modify-input');
            const modifySubjectInput = document.querySelector('#subject-modify-input');
            modifySubjectInput.value = modifySubjectDropDown.value;
            subjectListArray.forEach(el => {
                if (el[1].title === modifySubjectDropDown.value) {
                    modifySubjectCodeOldInput.value = el[0];
                    modifySubjectCodeNewInput.value = el[0];
                }
            })
        } else {
            
        }
        

    }

    addSubject = async (event) => {
        event.preventDefault();
        const year = 'y2020'
        const subjectNameInput = document.querySelector('#subject-add-input');
        const subjectCodeInput = document.querySelector('#subject-code-add-input');

        console.log('subject names', subjectNameInput.value, subjectCodeInput.value )

        await firestore.collection('subjects').doc('subjectList').update({
            [subjectCodeInput.value]: {
                code: subjectCodeInput.value,
                title:subjectNameInput.value               
            }
        })
    }

    modifySubject = async (event) => {
        event.preventDefault();
        const year = 'y2020'
        const modifySubjectDropDown = document.querySelector('#subject-picker-modify-dropdown');
        const modifySubjectInput = document.querySelector('#subject-modify-input');
        const modifySubjectOldCodeInput = document.querySelector('#subject-code-old-modify-input');
        const subjectCodeNew = document.querySelector('#subject-code-new-modify-input');
        const firestoreRef = firestore.collection(`classes/${year}/classes`);

        const oldInstances = await firestoreRef.where('subjectCode', '==', modifySubjectOldCodeInput.value).get().then(snapShot => {
                const tempArray = []
                snapShot.forEach(snap => {
                    tempArray.push([snap.id, snap.data()]);
                })
            console.log('tempArray', tempArray)
                return tempArray;
            })
        
        const batch = firestore.batch();
        oldInstances.forEach(el => {
            const month = el[0].split('-')[1]
            const tempObj = {
                assigned: el[1].assigned,
                classID: `${subjectCodeNew.value}-${month}`,
                instanceType: el[1].instanceType,
                months: el[1].months,
                studentCount: el[1].studentCount,
                subjectCode: `${subjectCodeNew.value}`,
                supportLecturer: el[1].supportLecturer,
                teacher: el[1].teacher,
                teacherEmail: el[1].teacherEmail,
                title: modifySubjectInput.value
            }
            console.log('old months', month);
            const ref = firestoreRef.doc(`${subjectCodeNew.value}-${month}`);
            batch.set(ref, {
                ...tempObj
            })

            batch.delete(firestoreRef.doc(el[0]));
        })

        const subjectListRef = firestore.collection('subjects').doc('subjectList');

        batch.update(subjectListRef,{
            [modifySubjectOldCodeInput.value]: firestoreTwo.FieldValue.delete()
        })

        batch.update(subjectListRef, {
            [subjectCodeNew.value]: {
                code: subjectCodeNew.value,
                title:modifySubjectInput.value               
            }
        })



        batch.commit().then('Batch Done')

        console.log('old instances', oldInstances);
    }

    deleteSubject = async (event) => {
        event.preventDefault();
        const year = 'y2020'
        const deleteDropDown = document.querySelector('#subject-picker-delete-dropdown');
        const subjectCode = deleteDropDown[deleteDropDown.selectedIndex].dataset.subjectId;
        
        const instanceArray = await firestore.collection(`classes/${year}/classes`)
            .where('subjectCode', '==', subjectCode).get().then(snapShot => {
                const tempArray = []
                snapShot.forEach(snap => {
                    tempArray.push([snap.id,snap.data()])
                })

                return tempArray
        })

        const batch = firestore.batch();

        const dbRef = firestore.collection(`classes/${year}/classes`);
        instanceArray.forEach(el => {
            const tempRef = dbRef.doc(el[0])
            batch.delete(tempRef);
        })

        const subjectListRef = firestore.collection('subjects').doc('subjectList')
        batch.update(subjectListRef,{
            [subjectCode]: firestoreTwo.FieldValue.delete()
        })

        batch.commit().then(console.log('batch done'))

    }
    

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='subject-control-container'>
                <h1>Subject Control</h1>
                <h2 className='title'>Create New Subject</h2>
                <form className='form-column'>
                    <label>Subject Name</label><input type='text' id='subject-add-input'></input>
                    <label>Subject Code</label><input type='text' id='subject-code-add-input'></input>
                    <CustomButton onClick={this.addSubject}>Create</CustomButton>

                </form>
                
                <h2 className='title'>Modify Subject</h2>
                <form className='form-column'>
                    <label>Current Subject Title</label>
                    <select name='subjects' id='subject-picker-modify-dropdown' onChange={this.onDropDownChange} ></select>
                    <label>Subject Title</label><input type='text' id='subject-modify-input'></input>
                    <label>Subject Code Current</label><input type='text' disabled={true} id='subject-code-old-modify-input'></input>
                    <label>Subject Code New</label><input type='text' id='subject-code-new-modify-input'></input>
                    <CustomButton type='submit' onClick={this.modifySubject} >Modify</CustomButton>

                </form>
                
                <h2 className='title'>Delete Subject</h2>
                <form className='form-column'>
                <select name='subjects' id='subject-picker-delete-dropdown' onChange={this.onDropDownChange} ></select>
                <CustomButton type='submit' onClick={this.deleteSubject} >Delete</CustomButton>

                </form>
                

            </div>
        )
    }
}

export default SubjectControl;