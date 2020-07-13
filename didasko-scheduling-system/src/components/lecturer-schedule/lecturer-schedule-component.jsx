import React, { Component } from 'react';

import './lecturer-schedule-style.scss';
import { auth, firestore, firestoreTwo } from '../../firebase/firebase.utils';
import ScheduleRow from '../schedule-row/schedule-row-component';
import CustomButton from '../custom-button/custom-button.component'
import ScheduleRowPicker from '../schedule-row-picker/schedule-row-picker-component';
import ScheduleRowSubject from '../schedule-row-subject/schedule-row-subject-component'
import ScheduleInstanceAssignPicker from '../schedule-instance-assign-picker/schedule-instance-assign-picker'

class LecturerSchedule extends Component {
    constructor(props) {
        super(props);

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
            loading: this.props.loading,
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
            reRenderPicker: false,
            refreshPicker: false,

        }
        //this.addNewClass = this.addNewClass.bind(this);
        //this.foreRefresh = this.foreRefresh.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        //this.changeDisplayRows = this.changeDisplayRows.bind(this);
        
    }

    componentDidMount() {
        firestore.collection('user').get().then((snapShot) => {
            //const dropDown = document.querySelector('#modify-schedule-dropdown');
            let DropDownString = [];
            snapShot.forEach(doc => {
                console.log('Snap', doc.id)
                DropDownString.push(doc.data().email); 
            })

        }).then(() => {
            this.createSubjectRow()
        })

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
        const { schedules, selectedUserID,} = this.state;
        const{uid} = this.state.currentUser
        let scheduleSubjectArray = [];
        let subjectRows = [];
        this.setState({
            scheduleRows: [],
            //reRenderPicker:true
        })

        await firestore.collection(`user/${uid}/schedules/y2020/subjects`).get().then(snapShot => {
            snapShot.forEach(el => {
                scheduleSubjectArray.push(el.id);
            })
        })

        const selectedUserData = await firestore.collection(`user`).doc(uid).get().then(doc => {
            return doc.data();
        })


        console.log('schedule array', scheduleSubjectArray);
        scheduleSubjectArray.sort();
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
        scheduleSubjectArray.forEach((item, index) => {
            const currentSubjectArray = [];
            const subjectID = ''
            /* for (let keyCheck in schedules.y2020) {
                if (schedules.y2020[keyCheck].subject === scheduleSubjectArray[index]) {
                    currentSubjectArray.push(schedules.y2020[keyCheck])
                }
            } */
            subjectRows.push(<ScheduleRowSubject key={item} className='schedule-row-subject' selectedUserID={uid} sendWeights={this.calculateWeights}
                year='2020' subjectCode={item} selectedUserData={selectedUserData} />) 
        })
        console.log('SUBJECT ROWS', subjectRows)
        /* if (subjectRows.length === 0) {
            const dropDown = document.querySelector('#modify-schedule-dropdown');
            const dropDownValue = dropDown.value;

            await firestore.collection('user').where('email', '==', dropDownValue).get().then(snapShot => {
                snapShot.forEach(snap => {
                    console.log("SNAP", snap)
                    firestore.collection('user').doc(snap.id).update({
                        weights: {
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
                    })
                })
            })
            
        } */

        this.setState({
            scheduleRows: subjectRows,
            //reRenderPicker: false
        })
        //this.refreshPicker()
        console.log('SUBJECT ROWS state', this.state.scheduleRows)
        //return subjectRows;
    }

    /* addNewClass = async (event) => {
        const { selectedUserID } = this.state
        const dropDown = document.querySelector('#subjects-picker-dropdown');
        const dropDownClass = document.querySelector('#subjects-class-picker-dropdown');
        const clickedDivs = document.querySelectorAll('.clicked');
        const { uid, schedules } = this.state.currentUser;
        let { loading } = this.state.currentUser;
        let selectedMonthsString = '';
        const userEmail = document.querySelector('#modify-schedule-dropdown').value;
        let classID = clickedDivs[0].dataset.id;
        const subjectString = "subject";
        let count = 1;




        const instance = await firestore.collection('classes/y2020/classes').where('classID', '==', `${classID}`).get().then(async (snapShot) => {
            let instanceData
            let oldUserID
            snapShot.forEach(doc => {
                console.log('selected user', doc.id);
                instanceData = doc.data();
            })
            return instanceData
        })

        const oldUserID = await firestore.collection('user').where('email', '==', instance.teacher).get().then(async snapShot => {
            let oldUserID
            console.log('snapshot old user', snapShot)
            for(const snap of snapShot.docs){
                oldUserID = snap.id
                await firestore.collection(`user/${snap.id}/schedules/y2020/subjects/${instance.subjectCode}/instances`)
                    .doc(instance.classID).delete()
            }
            return oldUserID
        })
                
        await firestore.collection(`user/${oldUserID}/schedules/y2020/subjects/`).doc(instance.subjectCode).collection('instances')
        .get().then(async (snapShot) => {
            if (snapShot.size === 0) {
                firestore.collection(`user/${oldUserID}/schedules/y2020/subjects/`).doc(instance.subjectCode).delete()
            }
            if (snapShot.size > 0) {
            }
        })

        const instanceUpdate = firestore.collection('classes/y2020/classes').doc(classID);
        instanceUpdate.update({
            teacher: userEmail,
            assigned: true
        })

        const selectedMonths = instance.months

        for (let item of selectedMonths) {
            if (selectedMonths.length === 1) {
                selectedMonthsString += item.id;
            } else if (selectedMonths.length === 2 && count === 2) {
                selectedMonthsString += item.id;
            } else {
                selectedMonthsString += item.id + ',';
            
            }
            count += 1;
        }
    
        await firestore.collection(`user/${selectedUserID}/schedules/y2020/subjects/`).doc(instance.subjectCode).set({})

        await firestore.collection(`user/${selectedUserID}/schedules/y2020/subjects/${instance.subjectCode}/instances`)
            .doc(instance.classID).set({})
        
            clickedDivs.forEach(div => {
                div.classList.remove('clicked')
            })
            this.createSubjectRow();
            clickedDivs.forEach(div => {
                div.classList.remove('clicked')
            })
            
    }
    
    deleteClass = async () => {
        const { uid } = this.state.currentUser;
        const { scheduleRows } = this.state;
        console.log('UID', uid)
        const userEmail = document.querySelector('#modify-schedule-dropdown').value;
        const clickedDivs = document.querySelectorAll('.scheduled-class-clicked');
        const subjectCode = clickedDivs[0].dataset.subjectCode;
        const instanceCode = clickedDivs[0].dataset.id;
        const selectedUser = await firestore.collection('user').where("email", '==', userEmail).get().then(snapShot => {
            let userID
            snapShot.forEach(doc => {
                console.log('selected user', doc.id);
                userID = doc.id;
            })
            return userID;
        });

        await firestore.collection(`user/${selectedUser}/schedules/y2020/subjects/${subjectCode}/instances`).doc(instanceCode).delete()
        console.log('delete state', this.state)
        const componentIndex = scheduleRows.findIndex(row => row.key === subjectCode);
                
        await firestore.collection(`user/${selectedUser}/schedules/y2020/subjects/`).doc(subjectCode).collection('instances')
        .get().then(async (snapShot) => {
            if (snapShot.size === 0) {
                console.log('snapshot ITS EMPTY')
                console.log('snapShot.data', snapShot)
                await firestore.collection(`user/${selectedUser}/schedules/y2020/subjects/`).doc(subjectCode).delete()
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

        this.createSubjectRow()
        /* userRef.get().then(doc =>{
            this.setState({ schedules: doc.data().schedules})
            this.createSubjectRow();
        }).then(() => {
            console.log('ine add class')
            //this.createSubjectRow();
        }) 
        
    }

    /* foreRefresh = () => {
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
        
    } */

    /* changeDisplayRows = () => {
        this.setState({ changeDisplayRows: true })
        console.log('button press', this.state.changeDisplayRows)
    } */ 

    calculateWeights = ( weightHolder) => {
        const { monthWeights } = this.state;
        const {uid} = this.state.currentUser
        //const dropDown = document.querySelector('#modify-schedule-dropdown');
        //const dropDownValue = dropDown.value;
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
        firestore.collection('user').where('email', '==', uid).get().then(snapShot => {
            snapShot.forEach(snap => {
                console.log("SNAP", snap)
                firestore.collection('user').doc(snap.id).update({
                    weights: this.state.monthWeights
                })
            })
        })
        console.log('weight holder schedule function', this.state.monthWeights)
        const colourCheck = Object.entries(this.state.monthWeights);
        colourCheck.forEach(el => {
            const monthDiv = document.querySelector(`#weight-${el[0]}`);
            if (el[1] < 3) {
                monthDiv.style.backgroundColor = 'lightgreen';
            } else if (el[1] < 6) {
                monthDiv.style.backgroundColor = 'orange';
            } else {
                monthDiv.style.backgroundColor = 'red';
            }
        })
    }

    /* printState = () => {
        console.log('Current STATE', this.state)
    }

    onDropDownChange = (event) => {
        console.log("eventid", event.id)
        const dropDown = document.querySelector('#modify-schedule-dropdown');
        //const nameInput = document.querySelector('#modify-name-input');
        //const emailInput = document.querySelector('#modify-email-input');
        //const classDropDown = document.querySelector('#subjects-class-picker-dropdown');
        let dropDownValue = dropDown.value;
        this.setState({
            scheduleRows: [],
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
        }
        })

        firestore.collection('user').where('email', '==', dropDownValue).get().then(snapShot => {
            snapShot.forEach(doc => {
                this.setState({
                    schedules: doc.data().schedules,
                    selectedUserID: doc.id,
                    //classAmount: Object.keys(doc.data().schedules.y2020).length,
                    //loading: false,
                    reUpdate: false
                })
            })              
            }).then(() => {
                this.createSubjectRow();
                this.setState({ loading: false })
            })
    }

    refreshPicker = () => {
        this.setState({refreshPicker: !this.state.refreshPicker})

    } */
    


    render() {
        const { monthWeights } = this.state;
        return (
            <div className="schedule-container">
            
                <div id='schedule-lecturer-container'>
                    <label id='schedule-lecturer'>{this.state.loading ? `L O A D I N G` : `Now Showing ${this.state.currentUser.email}, Current Schedule`}</label>
                </div>
                {/* <select name='subjects' id='modify-schedule-dropdown' onChange={this.onDropDownChange} ></select> */}
                    <div className="schedule-header">
                        {/* <div className="schedule-header-item"></div> */}
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
                        {/* <div className="schedule-header-item"></div> */}
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
                        {/* <div className="schedule-header-item"></div> */}
                        <div id='weight-jan' className="schedule-header-item"><span>{monthWeights.jan.toFixed(2)}</span> </div>
                        <div id='weight-feb' className="schedule-header-item"><span>{monthWeights.feb.toFixed(2)}</span> </div>
                        <div id='weight-mar' className="schedule-header-item"><span>{monthWeights.mar.toFixed(2)}</span> </div>
                        <div id='weight-apr' className="schedule-header-item"><span>{monthWeights.apr.toFixed(2)}</span> </div>
                        <div id='weight-may' className="schedule-header-item"><span>{monthWeights.may.toFixed(2)}</span> </div>
                        <div id='weight-jun' className="schedule-header-item"><span>{monthWeights.jun.toFixed(2)}</span> </div>
                        <div id='weight-jul' className="schedule-header-item"><span>{monthWeights.jul.toFixed(2)}</span> </div>
                        <div id='weight-aug' className="schedule-header-item"><span>{monthWeights.aug.toFixed(2)}</span> </div>
                        <div id='weight-sep' className="schedule-header-item"><span>{monthWeights.sep.toFixed(2)}</span> </div>
                        <div id='weight-oct' className="schedule-header-item"><span>{monthWeights.oct.toFixed(2)}</span> </div>
                        <div id='weight-nov' className="schedule-header-item"><span>{monthWeights.nov.toFixed(2)}</span> </div>
                        <div id='weight-dec' className="schedule-header-item"><span>{monthWeights.dec.toFixed(2)}</span> </div>
                    </div>
                
                <div className="schedule-container">
   
                    {/* <ScheduleRowPicker /> */}
                    {/* {this.state.reRenderPicker ? <div> L O A D I N G </div> : <ScheduleInstanceAssignPicker />} */}
                    {/* <ScheduleInstanceAssignPicker refresh={this.state.refreshPicker} />

                    
                    <CustomButton onClick={this.addNewClass}>Add new Instance</CustomButton>
                    <CustomButton onClick={this.deleteClass}>Delete instance</CustomButton>
                    <CustomButton onClick={this.printState}>refresh</CustomButton>
                    <CustomButton onClick={this.refreshPicker}>Change display</CustomButton> */}

                </div>
            </div>
        )
    }
}

export default LecturerSchedule;