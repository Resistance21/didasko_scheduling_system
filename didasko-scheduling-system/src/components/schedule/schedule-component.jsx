import React, { Component } from 'react';

import './schedule-style.scss';
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase.utils';
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
            classAmount: 0,
            scheduleName: "",
            scheduleRowAmount: 0,
            loading: true,

        }
        this.addNewClass = this.addNewClass.bind(this);
        
    }

    componentDidMount() {

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
                    classAmount: Object.keys(doc.data().schedules.y2020).length
                    //loading: false
                })
                this.setState({loading: false})
            })
        }else {
        // No user is signed in.
        }
    }

    createRows() {
        const { schedules } = this.state.currentUser;
        let key = 0;
        let subjectNum = 0;
        let rows = [];
        //rows = schedules.map(item => {
            //let yearNum = 2020;
        let subjectAmount = Object.keys(schedules.y2020).length;
        //console.log("SubjectAmount " + subjectAmount)
        //console.log("SCHEDULE ", schedules.y2020)
            let classRow = [];
            for (let i = 0; i < subjectAmount; i++){
                key += 1;
                subjectNum += 1;
                let subjectNumber = "subject" + subjectNum;
                let subjectMonthsArray = schedules.y2020[subjectNumber].months.split(",");
                //console.log("months String: ", schedules)
                //console.log("months String: ", subjectNumber)
                //console.log(Object.keys(schedules.y2020).length)
                classRow.push(<ScheduleRow key={key} className="schedule-row" months={subjectMonthsArray} />)
                //console.log(classRow)
                //subjectNum += 1;
            }
            return classRow

        //})
        //return rows
    }

    addNewClass = (event) => {
        const selectedMonths = document.querySelectorAll('.new-class-colour')
        const { uid, schedules} = this.state.currentUser;
        let selectedMonthsString = '';
        let subjectNum = this.state.classAmount + 1;
        const subjectString = "subject";
        let subjectNumstring = subjectString + subjectNum;
        //console.log("MONTHS", selectedMonths)
        //console.log("UID:" + uid)

        for (let item of selectedMonths) {
            //console.log('ITEM', item)
            selectedMonthsString += item.id + ',';
        }

        const userSchedule = firestore.collection('user').doc(uid)

        const userScheduleMerge = userSchedule.set({
            schedules: {
                y2020: {
                    [subjectNumstring]: {
                        months: selectedMonthsString
                    }
                
                }
            }
        }, { merge: true })
            .then(() => {
                console.log("New subject added");
            const userSchedule = firestore.collection('user').doc(uid).get().then((doc) => {
                this.setState(prevState => ({
                    currentUser: {
                        ...prevState.currentUser,
                        schedules: doc.data().schedules,
                    },
                    classAmount: subjectNum
                }))
            })
            }).catch(err => {
                console.log(err.message)
            });
        }
    


    render() {
        return (
            <div>
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
                { this.state.loading && !(this.state.redraw) ? <div> L O A D I N G </div> : this.createRows() }
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
                <div className="new-class">
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
                    <ScheduleRowPicker />
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
                    <CustomButton onClick={this.addNewClass}>Add new class</CustomButton>

                </div>
            </div>
        )
    }
}

export default schedule;