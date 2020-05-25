import React, { Component } from 'react';

import './schedule-style.scss';
import { auth, firestore, firestoreTwo } from '../../firebase/firebase.utils';
import ScheduleRow from '../schedule-row/schedule-row-component';
import CustomButton from '../custom-button/custom-button.component'
import ScheduleRowPicker from '../schedule-row-picker/schedule-row-picker-component';

class schedule extends Component {
    constructor(props) {
        super(props);

        //console.log("TEST COMPONET")

        this.state={
            month: "",
            currentUser: {
                uid: "",
                email: 'test',
                displayName: '',
                accountType: '',
                schedules: {},
                subjects: ''
            },
            schedules: {},
            classAmount: 0,
            scheduleName: "",
            scheduleRowAmount: 0,
            loading: true,

        }
        this.addNewClass = this.addNewClass.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }

    componentDidMount() {
        console.log("COMPONENT MOUNT")
        const user = auth.currentUser;
        if (user) {
            firestore.collection('user').doc(user.uid).get().then((doc) => {
                this.setState({
                    currentUser: {
                        uid: user.uid,
                        email: user.email,
                        displayName: doc.data().displayName,
                        accountType: doc.data().accountType,
                        schedules: doc.data().schedules,
                        subjects: doc.data().subjects
                    },
                    schedules: doc.data().schedules,
                    classAmount: Object.keys(doc.data().schedules.y2020).length,
                    loading: false,
                    reUpdate: false
                })
            })
        }else {
        // No user is signed in.
        }

    }

    createRows() {
        const { schedules } = this.state;
        //const { uid } = this.state.currentUser;
        //const classDropDown = document.querySelector('#subjects-class-picker-dropdown');
        //const rows = await this.getCurrentSchedule();
            let key = 0;
            let subjectNum = 0;
            //let rows = [];
            let subjectAmount = Object.keys(schedules.y2020).length;
            let classRow = [];
            if (subjectAmount > 0) {           
                for (let keyCheck in schedules.y2020) {
                    if (schedules.y2020.hasOwnProperty(keyCheck)) {
                        //console.log("SCHUDELE OBJ:", schedules.y2020[keyCheck])//.hasOwnProperty('months'));
                        key += 1;
                        subjectNum += 1;
                        let subject = schedules.y2020[keyCheck].subject;
                        let subjectMonthsArray = schedules.y2020[keyCheck].months.split(",");
                        //console.log("months subject: ", keyCheck)
                        //console.log("months months: ", schedules.y2020[keyCheck].months)
                        classRow.push(<ScheduleRow key={key} classID={keyCheck} className="schedule-row" subject={subject} months={subjectMonthsArray} />)   
                    }
                }
            }
            this.child = classRow;
            console.log('Schedule STATE', this.state.schedules)
            console.log("CHILDREN", this.child)
            return classRow  
    }

    addNewClass = (event) => {
        const selectedMonths = document.querySelectorAll('.new-class-colour');
        const dropDown = document.querySelector('#subjects-picker-dropdown');
        const dropDownClass = document.querySelector('#subjects-class-picker-dropdown');
        const { uid, schedules} = this.state.currentUser;
        let { loading } = this.state.currentUser;
        let selectedMonthsString = '';
        let classID = dropDownClass.value;
        const subjectString = "subject";

        for (let item of selectedMonths) {
            //console.log('ITEM', item)
            selectedMonthsString += item.id + ',';
        }

        const userSchedule = firestore.collection('user').doc(uid)

        userSchedule.set({
            schedules: {
                y2020: {
                    [classID]: {
                        months: selectedMonthsString,
                        subject: dropDown.value
                    }
                
                }
            }
        }, { merge: true })
            .then(() => {
            firestore.collection('user').doc(uid).get().then((doc) => {
                this.setState(prevState => ({
                    currentUser: {
                        ...prevState.currentUser,
                        schedules: doc.data().schedules,
                    },
                    schedules: doc.data().schedules,
                    subject: doc.data().subject
                    //classAmount: subjectNum
                }))
                console.log("New subject added");
                //console.log("STATE", this.state.schedules);
                //this.forceUpdate();
                loading = true;
                //loading = false;
            }
            )
            }).catch(err => {
                console.log(err.message)
            });
    }
    
    deleteClass = () => {
        const { uid } = this.state.currentUser;
        console.log('UID', uid)
        const dropDownClass = document.querySelector('#subjects-class-picker-dropdown');
        const dropDownClassValue = dropDownClass.value
        console.log("drop down value", dropDownClass.value)
        /* firestore.collection('classes').doc(dropDownClass.value).delete().then(() => {
            console.log('document deleted');
        }).catch(err => {
            console.log('there was an error', err)
        }) */
        const userRef = firestore.collection('user').doc(uid)

        userRef.update({
            [`schedules.y2020.${dropDownClassValue}`]: firestoreTwo.FieldValue.delete()
        })

        userRef.get().then(doc =>{
            this.setState({ schedules: doc.data().schedules})
        })
        
    }

    foreRefresh = () => {
        console.log("COMPONENT MOUNT")
        const user = auth.currentUser;
        if (user) {
            firestore.collection('user').doc(user.uid).get().then((doc) => {
                this.setState({
                    currentUser: {
                        uid: user.uid,
                        email: user.email,
                        displayName: doc.data().displayName,
                        accountType: doc.data().accountType,
                        schedules: doc.data().schedules,
                        subjects: doc.data().subjects
                    },
                    schedules: doc.data().schedules,
                    classAmount: Object.keys(doc.data().schedules.y2020).length,
                    loading: false,
                    reUpdate: false
                })
            })
        }else {
        // No user is signed in.
        }
        
    }
    


    render() {
        return (
            <div>
            
                <label>{this.state.loading ?    `L O A D I N G`: `Lectuere ${this.state.currentUser.email} Schedule`}</label>
                <div className="schedule-container">
                    <div className="schedule-header">
                        <div className="schedule-header-item"></div>
                        <div className="schedule-header-item"><span>J</span> </div>
                        <div className="schedule-header-item"><span>F</span> </div>
                        <div className="schedule-header-item"><span>M</span> </div>
                        <div className="schedule-header-item"><span>A</span> </div>
                        <div className="schedule-header-item"><span>M</span> </div>
                        <div className="schedule-header-item"><span>J</span> </div>
                        <div className="schedule-header-item"><span>J</span> </div>
                        <div className="schedule-header-item"><span>A</span> </div>
                        <div className="schedule-header-item"><span>S</span> </div>
                        <div className="schedule-header-item"><span>O</span> </div>
                        <div className="schedule-header-item"><span>N</span> </div>
                        <div className="schedule-header-item"><span>D</span> </div>
                    </div>
                    { this.state.loading ? <div> L O A D I N G </div> :  this.createRows() }
                    <div className="schedule-header">
                        <div className="schedule-header-item"></div>
                        <div className="schedule-header-item"><span>J</span> </div>
                        <div className="schedule-header-item"><span>F</span> </div>
                        <div className="schedule-header-item"><span>M</span> </div>
                        <div className="schedule-header-item"><span>A</span> </div>
                        <div className="schedule-header-item"><span>M</span> </div>
                        <div className="schedule-header-item"><span>J</span> </div>
                        <div className="schedule-header-item"><span>J</span> </div>
                        <div className="schedule-header-item"><span>A</span> </div>
                        <div className="schedule-header-item"><span>S</span> </div>
                        <div className="schedule-header-item"><span>O</span> </div>
                        <div className="schedule-header-item"><span>N</span> </div>
                        <div className="schedule-header-item"><span>D</span> </div>
                    </div>
                </div>
                <div className="schedule-container">
   
                    <ScheduleRowPicker />

                    
                    <CustomButton onClick={this.addNewClass}>Add new class</CustomButton>
                    <CustomButton onClick={this.deleteClass}>Delete class</CustomButton>
                    <CustomButton onClick={this.foreRefresh}>refresh</CustomButton>

                </div>
            </div>
        )
    }
}

export default schedule;