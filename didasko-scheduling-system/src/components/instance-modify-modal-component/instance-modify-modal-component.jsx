import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase.utils'

import './instance-modify-modal-style.scss'

class InstanceModifyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: '',
            subjects: [],
            show: this.props.show,
            modalInfo: this.props.instanceInfo,
            oldSupportLecturers: [],
            instanceInfo: ''

        }
    }

    getInstanceInfo = async () => {
        
        const year = 'y2020'
            const { subjectCode, instanceCode, instanceType, oldLecEmail } = this.state.modalInfo;
            const subjectName = document.querySelector('#modify-instance-subject-name');
            const instanceName = document.querySelector('#modify-subject-instance-name');
            const instanceTypeDropDown = document.querySelector('#modify-instance-type');
            const studentAmount = document.querySelector('#modify-instance-student-count');
            const supportLecturerDropDown = document.querySelector('#modify-support-lecturer-name-first');
            const lecturerDropDown = document.querySelector('#modify-lecturer-name');
            const qualifiedLecturers = []
            lecturerDropDown.options.length = 0;
            supportLecturerDropDown.options.length = 0;

            const instanceTypeOption = (document.createElement("option"));
            instanceTypeOption.text = instanceType;
            instanceTypeDropDown.add(instanceTypeOption);
            
            const supportLecturerDropDownArray = document.querySelectorAll('.modify-support-lecturer-name');
            if (supportLecturerDropDownArray.length > 0) {
                supportLecturerDropDownArray.forEach(el => {
                    el.remove();
                })
                
            }

            await firestore.collection('user').get().then(snapShot => {
                snapShot.forEach(snap => {
                    console.log("snap", snap.data().qualifications)
                    if (snap.data().qualifications.hasOwnProperty(subjectCode)) {
                        if (snap.data().email === oldLecEmail) {
                            qualifiedLecturers.unshift([snap.data().email, snap.data().firstName, snap.data().lastName])
                        } else {
                            qualifiedLecturers.push([snap.data().email, snap.data().firstName, snap.data().lastName])
                            
                        }
                    }
                })
            })
        

            qualifiedLecturers.forEach(el => {
                const lecturerOption = (document.createElement("option"));
                lecturerOption.text = `${el[1]} ${el[2]} (${el[0]})`;
                lecturerOption.value = el[0];
                lecturerOption.dataset.firstName = el[1];
                lecturerOption.dataset.secondName = el[2];
                lecturerDropDown.add(lecturerOption);
                
            })
            const removeOption = (document.createElement("option"));
            removeOption.text = 'Remove Lecturer';
            lecturerDropDown.add(removeOption);

        

            let supportLecturers = []
            const supportLecName = []
            
            await firestore.collection(`classes/${year}/classes`).where('classID', '==', instanceCode).get().then(snapShot => {
                for (const snap of snapShot.docs) {
                    this.setState({
                        instanceInfo: snap.data()
                    })
                    subjectName.value = snap.data().title;
                    instanceName.value = snap.data().classID;
                    instanceTypeDropDown.value = snap.data().instanceType;
                    studentAmount.value = snap.data().studentCount;
                    if (snap.data().supportLecturer != null) {
                            
                        supportLecturers = snap.data().supportLecturer
                    }
                }
            })

            for (const lecEmail of supportLecturers) {
                await firestore.collection(`user`).where('email', '==', lecEmail).get().then(snapShot => {
                    for (const snap of snapShot.docs) {
                        supportLecName.push([snap.data().firstName, snap.data().lastName, snap.data().email])
                    }
                })
        }
        

        const supportLecturerAnchor = document.querySelector('#support-lecturer-container');
        if (supportLecturers.length === 0) {
            const supportLecturerDropDown = document.querySelector('#modify-support-lecturer-name-first');
            qualifiedLecturers.forEach(i => {
                const supportLecturerOption = (document.createElement("option"));
                supportLecturerOption.text = `${i[1]} ${i[2]} (${i[0]})`;
                supportLecturerOption.value = i[0];
                supportLecturerOption.dataset.firstName = i[1];
                supportLecturerOption.dataset.secondName = i[2];
                supportLecturerDropDown.add(supportLecturerOption);
            })
            supportLecturerDropDown.selectedIndex = "-1";
        } else if (supportLecName.length === 1) {

            const supportLecturerDropDown = document.querySelector('#modify-support-lecturer-name-first');
            const supportLecturerOption = (document.createElement("option"));
            const removeOption = (document.createElement("option"));

            supportLecturerOption.text = `${supportLecName[0][0]} ${supportLecName[0][1]} (${supportLecName[0][2]})`;
            supportLecturerOption.value = supportLecName[0][2];
            supportLecturerOption.dataset.firstName = supportLecName[0][0];
            supportLecturerOption.dataset.secondName = supportLecName[0][1];
            supportLecturerDropDown.add(supportLecturerOption);
                    
            removeOption.text = 'Remove Lecturer';
            supportLecturerDropDown.add(removeOption);

            qualifiedLecturers.forEach(i => {
                if (supportLecName[0][2] === i[0]) {
                            
                } else {
                    const supportLecturerOption = (document.createElement("option"));
                    supportLecturerOption.text = `${i[1]} ${i[2]} (${i[0]})`;
                    supportLecturerOption.value = i[0];
                    supportLecturerOption.dataset.firstName = i[1];
                    supportLecturerOption.dataset.secondName = i[2];
                    supportLecturerDropDown.add(supportLecturerOption);
                }
                        
            })

            const newDropDown = document.createElement('select');
            newDropDown.classList.add('modify-support-lecturer-name');
            //const option = document.createElement('option');
            supportLecturerAnchor.appendChild(newDropDown)
            const removeOptionTwo = (document.createElement("option"));
            removeOptionTwo.text = 'Remove Lecturer';
            newDropDown.add(removeOptionTwo);

            qualifiedLecturers.forEach(i => {
                const option = document.createElement('option');
                option.text = `${i[1]} ${i[2]} (${i[0]})`;
                option.value = i[0];
                option.dataset.firstName = i[1];
                option.dataset.secondName = i[2];
                newDropDown.appendChild(option);
            })
            newDropDown.selectedIndex = -1

        } else if (supportLecName.length === 2) {
            supportLecName.forEach((el, index) => {
                if (index === 0) {
                    const supportLecturerDropDown = document.querySelector('#modify-support-lecturer-name-first');
                    const supportLecturerOption = (document.createElement("option"));
                    const removeOption = (document.createElement("option"));

                    supportLecturerOption.text = `${el[0]} ${el[1]} (${el[2]})}`;
                    supportLecturerOption.value = el[2];
                    supportLecturerOption.dataset.firstName = el[0];
                    supportLecturerOption.dataset.secondName = el[1];
                    supportLecturerDropDown.add(supportLecturerOption);

                    removeOption.text = 'Remove Lecturer';
                    supportLecturerDropDown.add(removeOption);
                            
                    qualifiedLecturers.forEach(i => {
                        if (el[2] === i[0]) {
                                    
                        } else {
                            const supportLecturerOption = (document.createElement("option"));
                            supportLecturerOption.text = `${i[1]} ${i[2]} (${i[0]})`;
                            supportLecturerOption.value = i[0];
                            supportLecturerOption.dataset.firstName = i[1];
                            supportLecturerOption.dataset.secondName = i[2];
                            supportLecturerDropDown.add(supportLecturerOption);
                        }
                                
                    })


                } else {
                    const newDropDown = document.createElement('select');
                    newDropDown.classList.add('modify-support-lecturer-name');
                    const option = document.createElement('option');
                    const removeOption = (document.createElement("option"));

                    option.text = `${el[0]} ${el[1]} (${el[2]})`;
                    option.value = el[2];
                    option.dataset.firstName = el[0];
                    option.dataset.secondName = el[1];
                    newDropDown.appendChild(option);

                    removeOption.text = 'Remove Lecturer';
                    newDropDown.add(removeOption);

                    qualifiedLecturers.forEach(i => {
                        if (el[2] === i[0]) {
                                    
                        } else {
                            const option = document.createElement('option');
                            option.text = `${i[1]} ${i[2]} (${i[0]})`;
                            option.value = i[0];
                            option.dataset.firstName = i[1];
                            option.dataset.secondName = i[2];
                            newDropDown.appendChild(option);
                        }

                    })

                    supportLecturerAnchor.appendChild(newDropDown)

                    const newDropDownTwo = document.createElement('select');
                    newDropDownTwo.classList.add('modify-support-lecturer-name');
                    //const option = document.createElement('option');
                    supportLecturerAnchor.appendChild(newDropDownTwo)
                    const removeOptionTwo = (document.createElement("option"));
                    removeOptionTwo.text = 'Remove Lecturer';
                    newDropDownTwo.add(removeOptionTwo);

                    qualifiedLecturers.forEach(i => {
                        const option = document.createElement('option');
                        option.text = `${i[1]} ${i[2]} (${i[0]})`;
                        option.value = i[0];
                        option.dataset.firstName = i[1];
                        option.dataset.secondName = i[2];
                        newDropDownTwo.appendChild(option);
                    })
                    newDropDownTwo.selectedIndex = -1

                }
            })
        } else if (supportLecName.length > 2) {
            supportLecName.forEach((el, index) => {
                if (index === 0) {
                    const supportLecturerDropDown = document.querySelector('#modify-support-lecturer-name-first');
                    const supportLecturerOption = (document.createElement("option"));
                    const removeOption = (document.createElement("option"));

                    supportLecturerOption.text = `${el[0]} ${el[1]} (${el[2]})}`;
                    supportLecturerOption.value = el[2];
                    supportLecturerOption.dataset.firstName = el[0];
                    supportLecturerOption.dataset.secondName = el[1];
                    supportLecturerDropDown.add(supportLecturerOption);

                    removeOption.text = 'Remove Lecturer';
                    supportLecturerDropDown.add(removeOption);
                            
                    qualifiedLecturers.forEach(i => {
                        if (el[2] === i[0]) {
                                    
                        } else {
                            const supportLecturerOption = (document.createElement("option"));
                            supportLecturerOption.text = `${i[1]} ${i[2]} (${i[0]})`;
                            supportLecturerOption.value = i[0];
                            supportLecturerOption.dataset.firstName = i[1];
                            supportLecturerOption.dataset.secondName = i[2];
                            supportLecturerDropDown.add(supportLecturerOption);
                        }
                                
                    })
                } else if (index !== supportLecName.length - 1) {
                    const newDropDown = document.createElement('select');
                    newDropDown.classList.add('modify-support-lecturer-name');
                    const option = document.createElement('option');
                    const removeOption = (document.createElement("option"));

                    option.text = `${el[0]} ${el[1]} (${el[2]})`;
                    option.value = el[2];
                    option.dataset.firstName = el[0];
                    option.dataset.secondName = el[1];
                    newDropDown.appendChild(option);

                    removeOption.text = 'Remove Lecturer';
                    newDropDown.add(removeOption);

                    qualifiedLecturers.forEach(i => {
                        if (el[2] === i[0]) {
                                    
                        } else {
                            const option = document.createElement('option');
                            option.text = `${i[1]} ${i[2]} (${i[0]})`;
                            option.value = i[0];
                            option.dataset.firstName = i[1];
                            option.dataset.secondName = i[2];
                            newDropDown.appendChild(option);
                        }

                    })

                    supportLecturerAnchor.appendChild(newDropDown)
                } else {
                    const newDropDown = document.createElement('select');
                    newDropDown.classList.add('modify-support-lecturer-name');
                    const option = document.createElement('option');
                    const removeOption = (document.createElement("option"));

                    option.text = `${el[0]} ${el[1]} (${el[2]})`;
                    option.value = el[2];
                    option.dataset.firstName = el[0];
                    option.dataset.secondName = el[1];
                    newDropDown.appendChild(option);

                    removeOption.text = 'Remove Lecturer';
                    newDropDown.add(removeOption);

                    qualifiedLecturers.forEach(i => {
                        if (el[2] === i[0]) {
                                    
                        } else {
                            const option = document.createElement('option');
                            option.text = `${i[1]} ${i[2]} (${i[0]})`;
                            option.value = i[0];
                            option.dataset.firstName = i[1];
                            option.dataset.secondName = i[2];
                            newDropDown.appendChild(option);
                        }

                    })

                    supportLecturerAnchor.appendChild(newDropDown)

                    const newDropDownTwo = document.createElement('select');
                    newDropDownTwo.classList.add('modify-support-lecturer-name');
                    //const optionTwo = document.createElement('option');
                    const removeOptionTwo = (document.createElement("option"));
                    removeOptionTwo.text = 'Remove Lecturer';
                    newDropDownTwo.add(removeOptionTwo);

                    qualifiedLecturers.forEach(i => {
                        const optionTwo = document.createElement('option');
                        optionTwo.text = `${i[1]} ${i[2]} (${i[0]})`;
                        optionTwo.value = i[0];
                        optionTwo.dataset.firstName = i[1];
                        optionTwo.dataset.secondName = i[2];
                        newDropDownTwo.appendChild(optionTwo);
                    })

                    supportLecturerAnchor.appendChild(newDropDownTwo)
                    newDropDownTwo.selectedIndex = -1
                }
            })
        }

        this.setState({
            oldSupportLecturers: supportLecName
        })               
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.show !== prevProps.show) {
            this.setState({
                show: !this.state.show,
                modalInfo: this.props.instanceInfo
            }, () => {
                    this.getInstanceInfo()
            })      
    }
        
            
    }

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount = async () => {

    }

    onDropDownChange = async(event) => {
        console.log('EVENT', event.target)
        const dropDownID = event.target.id
        const months = ["JAN",'FEB','MAR',"APR",'MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
        if (dropDownID === 'subjects-picker-add-dropdown') {
            const dropDown = document.querySelector(`#${event.target.id}`);
            const instanceDropDown = document.querySelector('#subjects-instance-picker-add-dropdown');
            const selectedIndexOfSubject = dropDown.selectedIndex;
            instanceDropDown.options.length = 0;
            let dropDownValue = dropDown.value;
            const subjectID = dropDown[selectedIndexOfSubject].dataset.subjectId;
                months.forEach((el, index) => {
                    const option = (document.createElement("option"));
                    option.text = `${subjectID}-${months[index]}`;
                    option.id = `add-instance-${months[index]}`;
                    instanceDropDown.add(option)
                })

            await firestore.collection('classes/y2020/classes').where("title", '==', dropDownValue).get().then(snapShot => {
                snapShot.forEach(doc => {
                    let option; 
                    const classCode = doc.data().subjectCode;
                    console.log("DOC", doc.data())

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
        const year = 'y2020'
        const { subjectCode, instanceCode, instanceType, oldLecturerFirstName, oldLecturerSecondName, oldLecEmail } = this.state.modalInfo;
        const { oldSupportLecturers, instanceInfo } = this.state;
        const subjectName = document.querySelector('#modify-instance-subject-name');
        const instanceName = document.querySelector('#modify-subject-instance-name');
        const lecturer = document.querySelector('#modify-lecturer-name');
        const instanceTypeDropDown = document.querySelector('#modify-instance-type');
        const studentAmount = document.querySelector('#modify-instance-student-count');
        const firstSupportDropDown = document.querySelector('#modify-support-lecturer-name-first');
        const secondarySupport = document.querySelectorAll('.modify-support-lecturer-name');
        const supportLecturerNames = []
        let newLecFirstName = lecturer.options[lecturer.selectedIndex].dataset.firstName;
        let newLecSecondName = lecturer.options[lecturer.selectedIndex].dataset.secondName;
        const removeLec = lecturer.value


        let supportTecherArray = []
        const currentLec = lecturer.text;

        if (removeLec !== 'Remove Lecturer') {
            const oldLecID = await firestore.collection(`user`).where('email', '==', instanceInfo.teacherEmail).get().then(snapshot => {
                let tempID
                snapshot.forEach(snap => {
                    tempID = snap.id
                })
                return tempID
            })
    
            await firestore.collection(`user/${oldLecID}/schedules/${year}/subjects/${subjectCode}/instances`).doc(instanceCode)
                .delete().catch(err => {
                    console.log('deleteing error', err)
                })
            
            await firestore.collection(`user/${oldLecID}/schedules/y2020/subjects/`).doc(subjectCode).collection('instances')
            .get().then(async (snapShot) => {
                if (snapShot.size === 0) {
                    firestore.collection(`user/${oldLecID}/schedules/y2020/subjects/`).doc(subjectCode).delete()
                }
            })
            const currentLecID = await firestore.collection(`user`).where('email', '==', lecturer.value).get().then(snapShot => {
                let tempID
                snapShot.forEach(snap => {
                    tempID = snap.id;
                    //newLecFirstName = snap.data().firstName;
                    //newLecSecondName = snap.data().secondName;
                })
                return tempID
            })

            await firestore.collection(`user/${currentLecID}/schedules/y2020/subjects/`).doc(subjectCode).set({})
            await firestore.collection(`user/${currentLecID}/schedules/${year}/subjects/${subjectCode}/instances`).doc(instanceCode)
                .set({}).catch(err => {
                    console.log('deleteing error', err)
                })
            
        }else if (removeLec === 'Remove Lecturer') {
            const oldLecID = await firestore.collection(`user`).where('email', '==', instanceInfo.teacherEmail).get().then(snapshot => {
                let tempID
                snapshot.forEach(snap => {
                    tempID = snap.id
                })
                return tempID
            })
    
            await firestore.collection(`user/${oldLecID}/schedules/${year}/subjects/${subjectCode}/instances`).doc(instanceCode)
                .delete().catch(err => {
                    console.log('deleteing error', err)
                })
            
            await firestore.collection(`user/${oldLecID}/schedules/y2020/subjects/`).doc(subjectCode).collection('instances')
            .get().then(async (snapShot) => {
                if (snapShot.size === 0) {
                    firestore.collection(`user/${oldLecID}/schedules/y2020/subjects/`).doc(subjectCode).delete()
                }
            })
        }
        /* else if (oldLecEmail !== lecturer.value) {
            const oldLecID = await firestore.collection(`user`).where('email', '==', instanceInfo.teacherEmail).get().then(snapshot => {
                let tempID
                snapshot.forEach(snap => {
                    tempID = snap.id
                })
                return tempID
            })
    
            await firestore.collection(`user/${oldLecID}/schedules/${year}/subjects/${subjectCode}/instances`).doc(instanceCode)
                .delete().catch(err => {
                    console.log('deleteing error', err)
                })
            
            await firestore.collection(`user/${oldLecID}/schedules/y2020/subjects/`).doc(subjectCode).collection('instances')
            .get().then(async (snapShot) => {
                if (snapShot.size === 0) {
                    firestore.collection(`user/${oldLecID}/schedules/y2020/subjects/`).doc(subjectCode).delete()
                }
            })
            
            const currentLecID = await firestore.collection(`user`).where('email', '==', lecturer.value).get().then(snapShot => {
                let tempID
                snapShot.forEach(snap => {
                    tempID = snap.id;
                    //newLecFirstName = snap.data().firstName;
                    //newLecSecondName = snap.data().secondName;
                })
                return tempID
            })

            await firestore.collection(`user/${currentLecID}/schedules/y2020/subjects/`).doc(subjectCode).set({})
            await firestore.collection(`user/${currentLecID}/schedules/${year}/subjects/${subjectCode}/instances`).doc(instanceCode)
                .set({}).catch(err => {
                    console.log('deleteing error', err)
                })
            
        } */

        if (firstSupportDropDown.value !== "Remove Lecturer" && firstSupportDropDown.value !== '') {
            supportTecherArray.push(firstSupportDropDown.value);
            supportLecturerNames.push(`${firstSupportDropDown[firstSupportDropDown.selectedIndex].dataset.firstName} ` +
                `${ firstSupportDropDown[firstSupportDropDown.selectedIndex].dataset.secondName }`)
            if (secondarySupport.length > 0) {
                secondarySupport.forEach((el, index) => {
                    if (el.value !== "Remove Lecturer" && el.value !== '') {
                        supportTecherArray.push(el.value);
                        supportLecturerNames.push(`${el[el.selectedIndex].dataset.firstName} ${el[el.selectedIndex].dataset.secondName}`)
                    }
                })
            }
        } else {
            if (secondarySupport.length > 0) {
                secondarySupport.forEach((el, index) => {
                    if (el.value !== "Remove Lecturer" && el.value !== '') {
                        supportTecherArray.push(el.value)
                        supportLecturerNames.push(`${el.dataset.firstName} ${el.dataset.secondName}`) 
                    }
                })
            }
        }

        console.log("supportOBJ", supportTecherArray)
        if (removeLec === 'Remove Lecturer') {
            if (supportTecherArray.length > 0) {
                await firestore.collection('classes/y2020/classes').doc(instanceCode).update({
                    instanceType: instanceTypeDropDown.value,
                    studentCount: studentAmount.value,
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: lecturer.value,
                    supportLecturer: supportTecherArray,
                    supportLecturerName: supportLecturerNames,
                    supportLecturerAssigned: true
                }).then(alert('Updating Instance Complete')).catch(error => {
                    alert(error)
                })
                
            } else {
                await firestore.collection('classes/y2020/classes').doc(instanceCode).update({
                    instanceType: instanceTypeDropDown.value,
                    studentCount: studentAmount.value,
                    teacher: ['Unassinged'],
                    assigned: false,
                    teacherEmail: lecturer.value,
                    supportLecturer: supportTecherArray,
                    supportLecturerName: supportLecturerNames,
                    supportLecturerAssigned: false
                }).then(alert('Updating Instance Complete')).catch(error => {
                    alert(error)
                })
                
            }          
        } else {
            if (supportTecherArray.length > 0) {
                await firestore.collection('classes/y2020/classes').doc(instanceCode).update({
                    instanceType: instanceTypeDropDown.value,
                    studentCount: studentAmount.value,
                    teacher: [newLecFirstName,newLecSecondName],
                    assigned: true,
                    teacherEmail: lecturer.value,
                    supportLecturer: supportTecherArray,
                    supportLecturerName: supportLecturerNames,
                    supportLecturerAssigned: true
                }).then(alert('Updating Instance Complete')).catch(error => {
                    alert(error)
                })
                
            } else {
                await firestore.collection('classes/y2020/classes').doc(instanceCode).update({
                    instanceType: instanceTypeDropDown.value,
                    studentCount: studentAmount.value,
                    teacher: [newLecFirstName,newLecSecondName],
                    assigned: true,
                    teacherEmail: lecturer.value,
                    supportLecturer: supportTecherArray,
                    supportLecturerName: supportLecturerNames,
                    supportLecturerAssigned: false
                }).then(alert('Updating Instance Complete')).catch(error => {
                    alert(error)
                })
                
            }
            
        }


        this.props.hideModalAfterUpdate(currentLec,oldLecEmail, oldSupportLecturers, supportTecherArray);

    }

    closeModal = (event) => {
        event.preventDefault();
        this.props.closeModal();
    }

    

    render() {
        const { displayName, email, password, confirmPassword, show } = this.state;
        const showHideClassName = show ? "modal display-block" : "modal display-none";
        return (
            <div className={`instance-modify-modal ${showHideClassName}`}>
                <div className='modal-main'>
                    <h2 className='title'>Modify Instance</h2>
                    <form className='form-column'>                    
                        <label>Subject Name</label> <input id='modify-instance-subject-name' type='text' disabled={true}></input>
                        <label>Subject Instance</label> <input id='modify-subject-instance-name' type='text' disabled={true}></input>
                        <label>Lecturer</label> <select name='lecturers' id='modify-lecturer-name'></select>
                        <div id='support-lecturer-container'>
                            <label>Support Lecturers</label> <select name='support-lecturers' id='modify-support-lecturer-name-first'
                                ></select>
                        </div>
                        <label>Instance Type</label> <select name='instanceType' id='modify-instance-type'></select>
                        <label>Student Count</label> <input id='modify-instance-student-count' type='number'></input>
                        <CustomButton type='submit' className='custom-button modify-buttons' onClick={this.modifyInstance} >Modify</CustomButton>
                        <CustomButton type='submit' className='custom-button modify-buttons' onClick={this.closeModal} >Close</CustomButton>

                    </form>
                </div>

            </div>
        )
    }
}

export default InstanceModifyModal;