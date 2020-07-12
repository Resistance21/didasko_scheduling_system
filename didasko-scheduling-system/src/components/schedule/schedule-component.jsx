import React, { Component } from 'react';

import './schedule-style.scss';
import { auth, firestore, firestoreTwo } from '../../firebase/firebase.utils';
import ScheduleRow from '../schedule-row/schedule-row-component';
import CustomButton from '../custom-button/custom-button.component'
import ScheduleRowPicker from '../schedule-row-picker/schedule-row-picker-component';
import ScheduleRowSubject from '../schedule-row-subject/schedule-row-subject-component'
import ScheduleInstanceAssignPicker from '../schedule-instance-assign-picker/schedule-instance-assign-picker'

class schedule extends Component {
    constructor(props) {
        super(props);

        //console.log("TEST COMPONET",this.props)

        this.state={
            month: "",
            currentUser: {
                uid: this.props.currentUser.uid,
                email: this.props.currentUser.email,
                displayName: this.props.currentUser.displayName,
                accountType: this.props.currentUser.accountType,
                schedules: {},
                subjects: ''
            },
            schedules: {},
            classAmount: 0,
            scheduleName: "",
            scheduleRowAmount: 0,
            loading: true,
            changeDisplayRows: false,
            scheduleRows: [],
            monthWeights: {jan: 0,
                feb: 0,
                mar: 0,
                apr: 0,
                may: 0,
                jun: 0,
                jul: 0,
                aug: 0,
                sep: 0,
                oct: 0,
                nov: 0,
                dec: 0
            },
            selectedUserID: '',
            selectedUserData:{}

        }
        this.addNewClass = this.addNewClass.bind(this);
        this.foreRefresh = this.foreRefresh.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.changeDisplayRows = this.changeDisplayRows.bind(this);
        
    }

    componentDidMount() {
        if (this.state.currentUser !== null) {
            firestore.collection('user').doc(this.state.currentUser.uid).get().then((doc) => {
                this.setState({
                    schedules: doc.data().schedules,
                    classAmount: Object.keys(doc.data().schedules.y2020).length,
                    selectedUserID: this.state.currentUser.uid,
                    //loading: false,
                    reUpdate: false
                })
            }).then(() => {
                this.createSubjectRow();
                this.setState({ loading: false })
            })
        }else {
        // No user is signed in.
        }

    }

    createRowsSingle() {
        const { schedules } = this.state;
        //const { uid } = this.state.currentUser;
        //const classDropDown = document.querySelector('#subjects-class-picker-dropdown');
        //const rows = await this.getCurrentSchedule();
            let key = 0;
            let subjectNum = 0;
            //let rows = [];
            let subjectAmount = Object.keys(schedules.y2020).length;
        let classRow = [];
        let subjectName = {};
            if (subjectAmount > 0) {           
                for (let keyCheck in schedules.y2020) {
                    if (schedules.y2020.hasOwnProperty(keyCheck)) {
                        //console.log("SCHUDELE OBJ:", schedules.y2020[keyCheck])//.hasOwnProperty('months'));
                        key += 1;
                        subjectNum += 1;
                        let subject = schedules.y2020[keyCheck].subject;
                        let subjectMonthsArray = schedules.y2020[keyCheck].months.split(",");
                        subjectName[subject] = {};
                        //console.log("months subject: ", keyCheck)
                        //console.log("months months: ", schedules.y2020[keyCheck].months)
                        //classRow.push(<ScheduleRow key={key} classID={keyCheck} className="schedule-row" subject={subject} months={subjectMonthsArray} />)   
                    }
                    console.log('bulkobject', subjectName);
                }
            }
            this.child = classRow;
            console.log('Schedule STATE', this.state.schedules)
            console.log("CHILDREN", this.child)
            return classRow  
    }

    createSubjectRow = async() => {
        const { schedules, selectedUserID } = this.state;
        let scheduleSubjectArray = [];
        let subjectRows = [];

        await firestore.collection(`user/${selectedUserID}/schedules/y2020/subjects`).get().then(snapShot => {
            snapShot.forEach(el => {
                scheduleSubjectArray.push(el.id)
            })
        })

        console.log('schedule array', scheduleSubjectArray);
        scheduleSubjectArray.sort();
        scheduleSubjectArray.forEach((item, index) => {
            const currentSubjectArray = [];
            const subjectID = ''
            for (let keyCheck in schedules.y2020) {
                if (schedules.y2020[keyCheck].subject === scheduleSubjectArray[index]) {
                    currentSubjectArray.push(schedules.y2020[keyCheck])
                }
            }
            this.setState({
                monthWeights: {
                    jan: 0,
                    feb: 0,
                    mar: 0,
                    apr: 0,
                    may: 0,
                    jun: 0,
                    jul: 0,
                    aug: 0,
                    sep: 0,
                    oct: 0,
                    nov: 0,
                    dec: 0
            } })
            subjectRows.push(<ScheduleRowSubject key={item} selectedUserID={selectedUserID} sendWeights={this.calculateWeights}
                year='2020' subjectCode={item} />)  
        })
        console.log('SUBJECT ROWS', subjectRows)
        //console.log('SUBJECT ROWS state', this.state.scheduleRows)

        this.setState({scheduleRows: subjectRows })
        console.log('SUBJECT ROWS state', this.state.scheduleRows)
        //return subjectRows;
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
        let count = 1;

        for (let item of selectedMonths) {
            if (selectedMonths.length === 1) {
                selectedMonthsString += item.id;
            }else if (selectedMonths.length === 2 && count === 2) {
                selectedMonthsString += item.id;
            } else{
                selectedMonthsString += item.id + ',';
                
            }
            count += 1;
        }

        const userSchedule = firestore.collection('user').doc(uid)

        userSchedule.set({
            schedules: {
                y2020: {
                    [classID]: {
                        months: selectedMonthsString,
                        subject: dropDown.value,
                        id: classID
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
                    subject: doc.data().subject,
                    scheduleRows:[]
                }))
                console.log("New subject added");
                //console.log("STATE", this.state.schedules);
                //this.forceUpdate();
                loading = true;
                //loading = false;
            }).then(() => {
                console.log('ine add class')
                this.createSubjectRow();
            })
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
            }).then(() => {
                this.createSubjectRow();
            })
        }else {
        // No user is signed in.
        }
        
    }

    changeDisplayRows = () => {
        this.setState({ changeDisplayRows: true })
        console.log('button press', this.state.changeDisplayRows)
    }

    calculateWeights = ( weightHolder) => {
        const { monthWeights } = this.state;
        let tempWeightHolder = {
            jan: 0,
            feb: 0,
            mar: 0,
            apr: 0,
            may: 0,
            jun: 0,
            jul: 0,
            aug: 0,
            sep: 0,
            oct: 0,
            nov: 0,
            dec: 0
        }
        tempWeightHolder = monthWeights;
        //tempWeightHolder += weightHolder
        //this.setState({monthWeights: tempWeightHolder})
        for (const key in weightHolder) {
            tempWeightHolder[key] += weightHolder[key];
            this.setState({
                monthWeights: tempWeightHolder
                    //...this.state.monthWeights,
                    //[key]: weightHolder[key]
            })
        }
/*         this.setState({
            monthWeights:  tempWeightHolder
                //...this.state.monthWeights,
                //[key]: weightHolder[key]
        }) */
        /* this.setState({
            monthWeights: {
                this.state.monthWeights,
                tempWeightHolder,
                
        } }) */
        
        console.log('weight holder schedule function', this.state.monthWeights)

        /* monthWeights.forEach((item, index) => {
            console.log('months weight', item)
        }) */
    }

    printState = () => {
        console.log('Current STATE', this.state)
    }

    


    render() {
        const { monthWeights } = this.state;
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
                    {this.state.loading ? <div> L O A D I N G </div> : this.state.scheduleRows}
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
                    <div className="schedule-header">
                        <div className="schedule-header-item"></div>
                        <div className="schedule-header-item"><span>{monthWeights.jan}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.feb}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.mar}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.apr}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.may}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.jun}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.jul}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.aug}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.sep}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.oct}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.nov}</span> </div>
                        <div className="schedule-header-item"><span>{monthWeights.dec}</span> </div>
                    </div>
                </div>
                {/* <div className="schedule-container">
   
                    <ScheduleRowPicker />
                    <ScheduleInstanceAssignPicker />

                    
                    <CustomButton onClick={this.addNewClass}>Add new class</CustomButton>
                    <CustomButton onClick={this.deleteClass}>Delete class</CustomButton>
                    <CustomButton onClick={this.printState}>refresh</CustomButton>
                    <CustomButton onClick={this.changeDisplayRows}>Change display</CustomButton>

                </div> */}
            </div>
        )
    }
}

export default schedule;