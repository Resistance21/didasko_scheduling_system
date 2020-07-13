import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase.utils'

import './instance-control-style.scss'

class InstanceControl extends Component {
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

        const { displayName, email, password, confirmPassword, } = this.state;
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
        catch (error) {
            console.error(error)
        }

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    componentDidMount = async() => {
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

        const subjectAddDropDown = document.querySelector('#subjects-picker-add-dropdown');
        subjectList.forEach((el) => {
            const option = (document.createElement("option"));
                option.text = el[0][0];
                option.dataset.subjectId = el[1][0] 
                option.dataset.subjectTitle = el[0][0] 
            subjectAddDropDown.add(option); 
        })
        subjectAddDropDown.selectedIndex = -1;

        const subjectModifyDropDown = document.querySelector('#subjects-picker-modify-dropdown');
        subjectList.forEach((el) => {
            const option = (document.createElement("option"));
            option.text = el[0][0];
            option.dataset.subjectId = el[1][0] 
            subjectModifyDropDown.add(option); 
        })
        subjectModifyDropDown.selectedIndex = -1;
        
        const subjectDeleteDropDown = document.querySelector('#subjects-picker-delete-dropdown');
        subjectList.forEach((el) => {
            const option = (document.createElement("option"));
                option.text = el[0][0];
                option.dataset.subjectId = el[1][0] 
            subjectDeleteDropDown.add(option); 
        })
        subjectDeleteDropDown.selectedIndex = -1;
        console.log("SUBJECT LIST", subjectList)
    }

    onDropDownChange = async(event) => {
        console.log('EVENT', event.target)
        const dropDownID = event.target.id
        const months = ["JAN",'FEB','MAR',"APR",'MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
        if (dropDownID === 'subjects-picker-add-dropdown') {
            const dropDown = document.querySelector(`#${event.target.id}`);
            const instanceDropDown = document.querySelector('#subjects-instance-picker-add-dropdown');
            const instanceTypeDropDown = document.querySelector('#subjects-picker-add-instance-type-dropdown')
            const selectedIndexOfSubject = dropDown.selectedIndex;
            instanceDropDown.options.length = 0;
            let dropDownValue = dropDown.value;
            const subjectID = dropDown[selectedIndexOfSubject].dataset.subjectId;
                months.forEach((el, index) => {
                    const option = (document.createElement("option"));
                    option.text = `${subjectID}-${months[index]}`;
                    option.id = `add-instance-${months[index]}`;
                    option.dataset.startMonth = `${months[index]}`
                    instanceDropDown.add(option)
                })

            await firestore.collection('classes/y2020/classes').where("title", '==', dropDownValue).get().then(snapShot => {
                snapShot.forEach(doc => {
                    let option; 
                    const classCode = doc.data().subjectCode;
                    console.log("DOC", doc.data().classID)

                    switch (doc.data().classID) {
                        case `${classCode}-JAN`:
                            option = document.querySelector('#add-instance-JAN')
                            option.disabled = true;
                            break;
                        case `${classCode}-FEB`:
                            option = document.querySelector('#add-instance-FEB')
                            option.disabled = true;
                            break;
                        case `${classCode}-MAR`:
                            option = document.querySelector('#add-instance-MAR')
                            option.disabled = true;
                            break;
                        case `${classCode}-APR`:
                            option = document.querySelector('#add-instance-APR')
                            option.disabled = true;
                            break;
                        case `${classCode}-MAY`:
                            option = document.querySelector('#add-instance-MAY')
                            option.disabled = true;
                            break;
                        case `${classCode}-JUN`:
                            option = document.querySelector('#add-instance-JUN')
                            option.disabled = true;
                            break;
                        case `${classCode}-JUL`:
                            option = document.querySelector('#add-instance-JUL')
                            option.disabled = true;
                            break;
                        case `${classCode}-AUG`:
                            option = document.querySelector('#add-instance-AUG')
                            option.disabled = true;
                            break;
                        case `${classCode}-SEP`:
                            option = document.querySelector('#add-instance-SEP')
                            option.disabled = true;
                            break;
                        case `${classCode}-OCT`:
                            option = document.querySelector('#add-instance-OCT')
                            option.disabled = true;
                            break;
                        case `${classCode}-NOV`:
                            option = document.querySelector('#add-instance-NOV')
                            option.disabled = true;
                            break;
                        case `${classCode}-DEC`:
                            option = document.querySelector('#add-instance-DEC')
                            option.disabled = true;
                            break;   
                        default:
                    }

                    //option.text = doc.data().classID;
                    //option.value = doc.id;
                })
                
            })

            await firestore.collection('classes').doc('instanceTypes').get().then(doc => {
                const instanceTypes = doc.data().types;
                for (const [key, value] of Object.entries(instanceTypes)) {
                    const option = (document.createElement("option"));
                        option.text = value;
                        option.value = value;
                        option.dataset.instanceType = value;
                        instanceTypeDropDown.add(option)
                }
            })
        } else if (dropDownID === 'subjects-picker-modify-dropdown') {
            const dropDown = document.querySelector(`#${event.target.id}`);
            const instanceDropDown = document.querySelector('#subjects-instance-picker-modify-dropdown');
            instanceDropDown.options.length = 0;
            let dropDownValue = dropDown.value;

            await firestore.collection('classes/y2020/classes').where("title", '==', dropDownValue).get().then(snapShot => {
                snapShot.forEach(doc => {
                    const option = (document.createElement("option"));
                    option.text = doc.data().classID;
                    option.value = doc.id;
                    instanceDropDown.add(option)
                })
                
            })
        }else {
            const dropDown = document.querySelector(`#${event.target.id}`);
            const instanceDropDown = document.querySelector('#subjects-instance-picker-delete-dropdown');
            instanceDropDown.options.length = 0;
            let dropDownValue = dropDown.value;

            await firestore.collection('classes/y2020/classes').where("title", '==', dropDownValue).get().then(snapShot => {
                snapShot.forEach(doc => {
                    const option = (document.createElement("option"));
                    option.text = doc.data().classID;
                    option.value = doc.id;
                    instanceDropDown.add(option)
                })
                
            })
        }
    }

    onChangeInstance = async(event) => {
        const dropDown = document.querySelector(`#${event.target.id}`);
        let dropDownValue = dropDown.value;
        const instanceType = document.querySelector('#modify-instance-type');
        /* const startMonth = document.querySelector('#subjects-picker-modify-start-month'); */
        const studentCount = document.querySelector('#modify-instance-student-count');
        /* const months = ["JAN",'FEB','MAR',"APR",'MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'] */
        instanceType.options.length = 0;

        await firestore.collection('classes').doc('instanceTypes').get().then(doc => {
            const instanceTypes = doc.data().types;
            for (const [key, value] of Object.entries(instanceTypes)) {
                const option = (document.createElement("option"));
                    option.text = value;
                    option.value = value;
                    option.dataset.instanceType = value;
                    instanceType.add(option)
            }
        })

        const instance = await firestore.collection('classes/y2020/classes').where("classID", '==', dropDownValue).get().then(snapShot => {
            let tempInstance;
                snapShot.forEach(doc => {
                    tempInstance = doc.data()
                })
            return tempInstance              
        })

        instanceType.value = instance.instanceType
        studentCount.value = instance.studentCount
        
    }

    modifyInstance = async (event) => {
        event.preventDefault();
        const subjectAddDropDown = document.querySelector(`#subjects-picker-modify-dropdown`);
        const selectedIndexOfSubject = subjectAddDropDown.selectedIndex;
        let subjectCode = subjectAddDropDown[selectedIndexOfSubject].dataset.subjectId;
        const instanceDropDown = document.querySelector('#subjects-instance-picker-modify-dropdown');
        const instanceCode = instanceDropDown.value;
        const instanceTypeValue = document.querySelector('#modify-instance-type').value
        const studentCountAmount = document.querySelector('#modify-instance-student-count').value

        await firestore.collection('classes/y2020/classes').doc(instanceCode).update({
            instanceType: instanceTypeValue,
            studentCount: studentCountAmount,
        }).then(alert('Modifying Instance Complete')).catch(error => {
            alert(error);
        })

    }

    addInstance = async (event) => {
        event.preventDefault();
        const year = 'y2020';
        const subjectAddDropDown = document.querySelector(`#subjects-picker-add-dropdown`);
        const instanceTypeDropDown = document.querySelector('#subjects-picker-add-instance-type-dropdown');
        const instanceCodeDropDown = document.querySelector('#subjects-instance-picker-add-dropdown');
        const studentCountDropDown = document.querySelector('#subjects-picker-add-student-count');
        const selectedIndexOfSubject = subjectAddDropDown.selectedIndex;
        let subjectCode = subjectAddDropDown[selectedIndexOfSubject].dataset.subjectId;
        let subjectTitle = subjectAddDropDown[selectedIndexOfSubject].dataset.subjectTitle;
        const instanceStartMonth = instanceCodeDropDown[instanceCodeDropDown.selectedIndex].dataset.startMonth;
        const instanceCode = instanceCodeDropDown.value;
        const studentCount = studentCountDropDown.value;
        const instanceType = instanceTypeDropDown[instanceTypeDropDown.selectedIndex].dataset.instanceType;

        switch (instanceStartMonth) {
            case `JAN`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'jan,feb,mar',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `FEB`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'feb,mar,apr',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `MAR`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'mar,apr.may',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `APR`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'apr,may,jun',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `MAY`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'may,jun,jul',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `JUN`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'jun,jul,aug',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `JUL`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'jul,aug,sep',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `AUG`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'aug,sep,oct',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `SEP`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'sep,oct,nov',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `OCT`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'oct,nov,dec',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `NOV`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'nov,dec,jan',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;
            case `DEC`:
                await firestore.collection(`classes/${year}/classes`).doc(instanceCode).set({
                    classID: instanceCode,
                    months: 'dec,jan,feb',
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: '',
                    title: subjectTitle,
                    subjectCode: subjectCode,
                    instanceType: instanceType,
                    supportLecturer: [],
                    studentCount: studentCount,
                }).then(alert('Adding New Instance Complete')).catch(error => {
                    alert(error);
                })
                break;   
            default:
        }

    }

    deleteInstance = async (event) => {
        event.preventDefault();
        const year = 'y2020'
        const subjectAddDropDown = document.querySelector(`#subjects-picker-delete-dropdown`);
        const selectedIndexOfSubject = subjectAddDropDown.selectedIndex;
        let subjectCode = subjectAddDropDown[selectedIndexOfSubject].dataset.subjectId;
        const instanceCodeDropDown = document.querySelector('#subjects-instance-picker-delete-dropdown');
        const instanceCode = instanceCodeDropDown.value;

        const instance = await firestore.collection('classes/y2020/classes').where("classID", '==', instanceCode).get().then(snapShot => {
            let tempInstance;
                snapShot.forEach(doc => {
                    tempInstance = doc.data()
                })
            return tempInstance              
        })

        const currentLecturerID = await firestore.collection('user').where('email', '==', instance.teacher).get().then(snapShot => {
            let tempID;
            snapShot.forEach(snap => {
                tempID = snap.id;
            })
            return tempID
        })

        await firestore.collection(`user/${currentLecturerID}/schedules/${year}/subjects/${subjectCode}/instances`).doc(instanceCode).delete()
                
        await firestore.collection(`user/${currentLecturerID}/schedules/${year}/subjects/`).doc(subjectCode).collection('instances')
        .get().then(async (snapShot) => {
            if (snapShot.size === 0) {
                console.log('snapshot ITS EMPTY')
                console.log('snapShot.data', snapShot)
                await firestore.collection(`user/${currentLecturerID}/schedules/${year}/subjects/`).doc(subjectCode).delete()
                snapShot.forEach(el => {
                    console.log('snapShot.data', el.data())
                    console.log('snapShot.data', el.data().email)
                })
            }
            if (snapShot.size > 0) {
                console.log('snapshot ITS NOT')
                console.log('snapShot.data', snapShot)
                snapShot.forEach(el => {
                    console.log('snapShot.data', el.data())
                    console.log('snapShot.data', el.data().email)
                })
            }
        })

        await firestore.collection(`classes/${year}/classes/`).doc(instanceCode).delete().then(alert('Deleting Instance Complete')).catch(error => {
            alert(error);
        })
    }

    

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='instance-control-container'>
                <h1>Instance Control</h1>
                <h2 className='title'>Add New Instance</h2>
                <form className='form-column'>
                <select name='subjects' id='subjects-picker-add-dropdown' onChange={this.onDropDownChange} ></select>
                <select name='subjects' id='subjects-instance-picker-add-dropdown'></select>
                    <label>Instance Type</label> <select name='instanceType' id='subjects-picker-add-instance-type-dropdown'></select>
                    <label>Student Count</label> <input type='number' id='subjects-picker-add-student-count' ></input>
                    <CustomButton  type='submit' onClick={this.addInstance} >Create</CustomButton>

                </form>
                
                <h2 className='title'>Modify Instance</h2>
                <form className='form-column'>
                <select name='subjects' id='subjects-picker-modify-dropdown' onChange={this.onDropDownChange} ></select>
                <select name='subjects' id='subjects-instance-picker-modify-dropdown' onChange={this.onChangeInstance}></select>
                    <label>Instance Type</label> <select name='instanceType' id='modify-instance-type'></select>
                    <label>Student Count</label> <input id='modify-instance-student-count' type='number'></input>
                    <CustomButton type='submit' onClick={this.modifyInstance} >Modify</CustomButton>

                </form>
                

                <h2 className='title'>Delete Instance</h2>
                <form className='form-column'>
                <select name='subjects' id='subjects-picker-delete-dropdown' onChange={this.onDropDownChange} ></select>
                <select name='subjects' id='subjects-instance-picker-delete-dropdown'></select>
                <CustomButton type='submit' onClick={this.deleteInstance}  >Delete</CustomButton>
                </form>


            </div>
        )
    }
}

export default InstanceControl ;