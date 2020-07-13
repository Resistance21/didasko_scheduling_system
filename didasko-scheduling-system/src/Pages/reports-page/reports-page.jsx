import React, { Component } from 'react';
import { firestore } from '../../firebase/firebase.utils'
import ReportsSubjectRow from '../../components/reports-subject-row-component/reports-subject-row-component'
import LecturerWeightSummaryRow from '../../components/lecturer-weight-summary/lecturer-weight-summary-row-component.jsx'
import InstanceModifyModal from '../../components/instance-modify-modal-component/instance-modify-modal-component'
import TotalMonlthyInstanceCountRow from '../../components/total-monthly-instance-count/total-monthly-instance-count-row-component'

import './reports-page-style.scss';
import TotalMonthlyInstanceCountRow from '../../components/total-monthly-instance-count/total-monthly-instance-count-row-component';

class ReportsPage extends Component {
    constructor(props) {
        super(props);
        this.drawReport = this.drawReport.bind(this);

        this.state = {
            loadingSchedule: true,
            subjectList: [],
            classList: [],
            lecturerWeightSummaryList: [],
            loadingWeightSummary: true,
            subjectWeights: [],
            subjectInstanceList: [],
            studentCountWeights: [],
            modalShow: false,
            modalInfo: {
                oldLecturerName: '',
                instanceType: '',
                subjectCode: '',
                instanceCode: '',
                oldLecEmail: ''
                
            },
            reportRows: [],


        }


    }

    showModal = (target) => {
        const clickedInstance = target
        console.log('CLIcked instance', clickedInstance)

        this.setState({
            modalShow: true,
            modalInfo: {
                subjectCode: clickedInstance.dataset.subjectCode,
                instanceCode: clickedInstance.dataset.instanceId,
                instanceType: clickedInstance.dataset.instanceType,
                oldLecEmail: clickedInstance.dataset.lecturerEmail,
                oldLecFirstName: clickedInstance.dataset.lecturerFirstName,
                oldLecSecondName: clickedInstance.dataset.lecturerSecondName
            }
        });
        console.log('click working', target)
        console.log('click subjectcode', clickedInstance.dataset.subjectCode)
        console.log('click instancecode', clickedInstance.dataset.instanceId)
      };
    
    hideModalAfterUpdate = async (currentLec, oldLec, oldSupport, newSupport) => {
        
        this.setState({ modalShow: false });
        await this.updateRow(this.state.modalInfo.subjectCode);
        //this.calculateAllWeightsUpdate(currentLec, oldLec, oldSupport, newSupport);
        this.calculateAllWeights();

    };

    closeModal = async(event) => {
        this.setState({ modalShow: false });
        //this.updateRow(this.state.modalInfo.subjectCode);
    };

    getInstanceList = async () => {
        let year = 'y2020'
        let classListArray = []
        await firestore.collection(`classes/${year}/classes/`).get().then(snapShot => {
            for(const snap of snapShot.docs) {
                //console.log("SNAP class", snap.data())
                classListArray.push(snap.data())
            }
            console.log('class list array',classListArray)

            this.setState({
                classList: classListArray
            })
        })
    }

    getSubjectList = async () => {
        let year = 'y2020'
        let subjectListArray = []

        await firestore.collection('subjects').doc('subjectList').get().then((querySnapshot) => {
            //console.log(querySnapshot.data())
            subjectListArray = Object.keys(querySnapshot.data()).map((key) => {
                //console.log(key)
                return [[querySnapshot.data()[key].title], [querySnapshot.data()[key].code]]
            })
            //console.log("unsort subjectlist", subjectListArray);
            subjectListArray.sort((a, b) => {
                if (a[0] === b[0]) {
                    //console.log("0", a, b);
                    return 0
                } else {
                    //console.log("other", a, b);
                    return (a[0] > b[0]) ? 1 : -1
                }
            })
            this.setState({ subjectList: subjectListArray })
            //this.setState({ loadingSchedule: false })
        })
        return subjectListArray
    }

    getWeightList = async () => {

        await firestore.collection('weights').get().then(snapShot => {
            const subjectWeightsArray = []
            const studentCountWeightsArray = []
            for (const snap of snapShot.docs) {
                if (snap.id === 'number of students weights') {
                } else {
                    subjectWeightsArray.push([snap.id,snap.data()]);
                    
                }
            }
            this.setState({
                subjectWeights: subjectWeightsArray,
            })
        })

        await firestore.collection("weights/number of students weights/number break points").get().then(snapShot => {
            let studentWeightsArray= []
            snapShot.forEach(el => {               
                studentWeightsArray.push([el.id, el.data().weight, el.data().count]) 
            })
            this.setState({
                studentCountWeights: studentWeightsArray
                
            })
        })
    }

    componentDidMount = async () => {
        await this.getInstanceList();
                
        await this.getSubjectList();
        
        await this.drawWeightSummary();

        await this.getWeightList();

        this.drawReport();

        this.setState({
            loadingWeightSummary: false,
            loadingSchedule: false 
        })

        this.calculateAllWeights();

    }

    round = (value, decimals) => {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      }

      calculateAllWeightsUpdate = async (currentLec, oldLec, oldSupport, newSupport) => {
          const lecturerArray = []

          if (currentLec === oldLec) {
              lecturerArray.push(currentLec)
              
            } else {
                lecturerArray.push(currentLec)
                lecturerArray.push(oldLec)
          }

          const combinedSupport = new Set(oldSupport, newSupport);
          const combinedSupportArray = Array.from(combinedSupport);
          combinedSupportArray.forEach(el => {
              lecturerArray.push(el)
          })
        lecturerArray.forEach(el => {          
            const lect = document.querySelectorAll(`[data-lecturer-email="${el}"]`);
            let weightObj = {
                jan: 0,
                feb: 0,
                mar: 0,
                apr: 0,
                may: 0,
                jun: 0,
                jul: 0,
                sep: 0,
                aug: 0,
                oct: 0,
                nov: 0,
                dec: 0
    
            }
    
            lect.forEach(el => {
                switch (el.id) {
                    case `jan`:
                        weightObj={
                            ...weightObj,
                            jan: weightObj.jan + parseFloat(el.dataset.weightAmount),
                            feb: weightObj.feb + parseFloat(el.dataset.weightAmount),
                            mar: weightObj.mar + parseFloat(el.dataset.weightAmount)
                        }
                        break;
                    case `feb`:
                        weightObj={
                            ...weightObj,
                            feb: weightObj.feb + parseFloat(el.dataset.weightAmount),
                            mar: weightObj.mar + parseFloat(el.dataset.weightAmount),
                            apr: weightObj.apr + this.round(parseFloat(el.dataset.weightAmount), 2)
                        }
                        break;
                    case `mar`:
                        weightObj={
                            ...weightObj,
                            mar: weightObj.mar + parseFloat(el.dataset.weightAmount),
                            apr: weightObj.apr + this.round(parseFloat(el.dataset.weightAmount), 2),
                            may: weightObj.may + parseFloat(el.dataset.weightAmount)
                        }
                        break;
                    case `apr`:
                        weightObj={
                            ...weightObj,
                            apr: weightObj.apr + this.round(parseFloat(el.dataset.weightAmount), 2), 
                            may: weightObj.may + parseFloat(el.dataset.weightAmount),
                            jun: weightObj.jun + parseFloat(el.dataset.weightAmount)
                        }
                        break;
                    case `may`:
                        weightObj={
                            ...weightObj,
                            may: weightObj.may + parseFloat(el.dataset.weightAmount),
                            jun: weightObj.jun + parseFloat(el.dataset.weightAmount),
                            jul: weightObj.jul + parseFloat(el.dataset.weightAmount)
                        }
                        break;
                    case `jun`:
                        weightObj={
                            ...weightObj,
                            jun: weightObj.jun + parseFloat(el.dataset.weightAmount),
                            jul: weightObj.jul + parseFloat(el.dataset.weightAmount),
                            aug: weightObj.aug + parseFloat(el.dataset.weightAmount)
                        }
                        break;
                    case `jul`:
                        weightObj={
                            ...weightObj,
                            jul: weightObj.jul + parseFloat(el.dataset.weightAmount),
                            aug: weightObj.aug + parseFloat(el.dataset.weightAmount),
                            sep: weightObj.sep + parseFloat(el.dataset.weightAmount)
                        }
                        break;
                    case `aug`:
                        weightObj={
                            ...weightObj,
                            aug: weightObj.aug + parseFloat(el.dataset.weightAmount),
                            sep: weightObj.sep + parseFloat(el.dataset.weightAmount),
                            oct: weightObj.oct + parseFloat(el.dataset.weightAmount)
                        }
                        break;
                    case `sep`:
                        weightObj={
                            ...weightObj,
                            sep: weightObj.sep + parseFloat(el.dataset.weightAmount),
                            oct: weightObj.oct + parseFloat(el.dataset.weightAmount),
                            nov: weightObj.nov + parseFloat(el.dataset.weightAmount)
                        }
                        break;
                    case `oct`:
                        weightObj={
                            ...weightObj,
                            oct: weightObj.oct + parseFloat(el.dataset.weightAmount),
                            nov: weightObj.nov + parseFloat(el.dataset.weightAmount),
                            dec: weightObj.dec + parseFloat(el.dataset.weightAmount)
                        }
                        break;
                    case `nov`:
                        weightObj={
                            ...weightObj,
                            nov: weightObj.nov + parseFloat(el.dataset.weightAmount),
                            dec: weightObj.dec + parseFloat(el.dataset.weightAmount),
                        }
                        break;
                    case `dec`:
                        weightObj={
                            ...weightObj,
                            dec: weightObj.dec + parseFloat(el.dataset.weightAmount),
                        }
                        break;
                    default:{
    
                    }
                }             
            })

        

            console.log('test teacher', el)
            console.log('weightObj', weightObj)
        })
    }

    calculateAllWeights = async () => {
        const { subjectWeights } = this.state;
        const assistantIndex = subjectWeights.findIndex((el) => el[0] === 'Support of Academic Assistant');
        const assistantAmount = subjectWeights[assistantIndex][1].weight;
        console.log('asistant Amount', assistantAmount);
        const lecturerArray = []
        const arrayAfterCal = []
        const batch = firestore.batch();
        await firestore.collection('user').get().then(snapShot => {
            snapShot.forEach(snap => {
                lecturerArray.push([snap.data().email, snap.id]);
            })
        })
        lecturerArray.forEach(el => {
            console.log('lecarracy', el)          
            const lect = document.querySelectorAll(`[data-lecturer-email="${el[0]}"]`);
            let weightObj = {
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
    
            lect.forEach(el => {
                switch (el.id) {
                    case `jan`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                jan: weightObj.jan + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                feb: weightObj.feb + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                mar: weightObj.mar + parseFloat(el.dataset.weightAmount) - assistantAmount
                            }
                            
                        } else {
                            weightObj={
                                ...weightObj,
                                jan: weightObj.jan + parseFloat(el.dataset.weightAmount),
                                feb: weightObj.feb + parseFloat(el.dataset.weightAmount),
                                mar: weightObj.mar + parseFloat(el.dataset.weightAmount)
                            }
                        }
                        break;
                    case `feb`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                feb: weightObj.feb + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                mar: weightObj.mar + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                apr: weightObj.apr + parseFloat(el.dataset.weightAmount) - assistantAmount,
                            }
                        } else {
                            
                            weightObj={
                                ...weightObj,
                                feb: weightObj.feb + parseFloat(el.dataset.weightAmount),
                                mar: weightObj.mar + parseFloat(el.dataset.weightAmount),
                                apr: weightObj.apr + parseFloat(el.dataset.weightAmount),
                            }
                        }
                        break;
                    case `mar`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                mar: weightObj.mar + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                apr: weightObj.apr + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                may: weightObj.may + parseFloat(el.dataset.weightAmount) - assistantAmount
                            }
                            
                        } else{
                            weightObj={
                                ...weightObj,
                                mar: weightObj.mar + parseFloat(el.dataset.weightAmount),
                                apr: weightObj.apr + parseFloat(el.dataset.weightAmount),
                                may: weightObj.may + parseFloat(el.dataset.weightAmount)
                            }

                        }
                        break;
                    case `apr`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                apr: weightObj.apr + parseFloat(el.dataset.weightAmount) - assistantAmount, 
                                may: weightObj.may + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                jun: weightObj.jun + parseFloat(el.dataset.weightAmount) - assistantAmount
                            }
                        } else {
                            weightObj={
                                ...weightObj,
                                apr: weightObj.apr + parseFloat(el.dataset.weightAmount), 
                                may: weightObj.may + parseFloat(el.dataset.weightAmount),
                                jun: weightObj.jun + parseFloat(el.dataset.weightAmount)
                            }
                            
                        }
                        break;
                    case `may`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                may: weightObj.may + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                jun: weightObj.jun + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                jul: weightObj.jul + parseFloat(el.dataset.weightAmount) - assistantAmount
                            }
                        } else {
                            weightObj={
                                ...weightObj,
                                may: weightObj.may + parseFloat(el.dataset.weightAmount),
                                jun: weightObj.jun + parseFloat(el.dataset.weightAmount),
                                jul: weightObj.jul + parseFloat(el.dataset.weightAmount)
                            }
                            
                        }
                        break;
                    case `jun`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                jun: weightObj.jun + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                jul: weightObj.jul + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                aug: weightObj.aug + parseFloat(el.dataset.weightAmount) - assistantAmount
                            }
                        } else {
                            weightObj={
                                ...weightObj,
                                jun: weightObj.jun + parseFloat(el.dataset.weightAmount),
                                jul: weightObj.jul + parseFloat(el.dataset.weightAmount),
                                aug: weightObj.aug + parseFloat(el.dataset.weightAmount)
                            }
                            
                        }
                        break;
                    case `jul`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                jul: weightObj.jul + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                aug: weightObj.aug + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                sep: weightObj.sep + parseFloat(el.dataset.weightAmount) - assistantAmount
                            }
                        } else {
                            weightObj={
                                ...weightObj,
                                jul: weightObj.jul + parseFloat(el.dataset.weightAmount),
                                aug: weightObj.aug + parseFloat(el.dataset.weightAmount),
                                sep: weightObj.sep + parseFloat(el.dataset.weightAmount)
                            }
                            
                        }
                        break;
                    case `aug`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                aug: weightObj.aug + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                sep: weightObj.sep + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                oct: weightObj.oct + parseFloat(el.dataset.weightAmount) - assistantAmount
                            }
                        } else {
                            weightObj={
                                ...weightObj,
                                aug: weightObj.aug + parseFloat(el.dataset.weightAmount),
                                sep: weightObj.sep + parseFloat(el.dataset.weightAmount),
                                oct: weightObj.oct + parseFloat(el.dataset.weightAmount)
                            }
                            
                        }
                        break;
                    case `sep`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                sep: weightObj.sep + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                oct: weightObj.oct + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                nov: weightObj.nov + parseFloat(el.dataset.weightAmount) - assistantAmount
                            }
                        } else {
                            weightObj={
                                ...weightObj,
                                sep: weightObj.sep + parseFloat(el.dataset.weightAmount),
                                oct: weightObj.oct + parseFloat(el.dataset.weightAmount),
                                nov: weightObj.nov + parseFloat(el.dataset.weightAmount)
                            }
                            
                        }
                        break;
                    case `oct`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                oct: weightObj.oct + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                nov: weightObj.nov + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                dec: weightObj.dec + parseFloat(el.dataset.weightAmount) - assistantAmount
                            }
                        } else {
                            weightObj={
                                ...weightObj,
                                oct: weightObj.oct + parseFloat(el.dataset.weightAmount),
                                nov: weightObj.nov + parseFloat(el.dataset.weightAmount),
                                dec: weightObj.dec + parseFloat(el.dataset.weightAmount)
                            }
                            
                        }
                        break;
                    case `nov`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                nov: weightObj.nov + parseFloat(el.dataset.weightAmount) - assistantAmount,
                                dec: weightObj.dec + parseFloat(el.dataset.weightAmount) - assistantAmount,
                            }
                            
                        } else {
                            weightObj={
                                ...weightObj,
                                nov: weightObj.nov + parseFloat(el.dataset.weightAmount),
                                dec: weightObj.dec + parseFloat(el.dataset.weightAmount),
                            }
                            
                        }
                        break;
                    case `dec`:
                        if (el.dataset.supportLecturersAssigned === 'true') {
                            weightObj={
                                ...weightObj,
                                dec: weightObj.dec + parseFloat(el.dataset.weightAmount) - assistantAmount,
                            }
                        } else {
                            weightObj={
                                ...weightObj,
                                dec: weightObj.dec + parseFloat(el.dataset.weightAmount),
                            }
                            
                        }
                        break;
                    default:{
    
                    }
                }             
            })
            arrayAfterCal.push([el, weightObj]);

            //console.log('test teacher', el)
        })
        console.log('arraycal', arrayAfterCal)

        arrayAfterCal.forEach(el => {
            console.log('inside array cal', el)
            const dbRef = firestore.collection(`user`).doc(el[0][1]);
            batch.update(dbRef, {
                weights: el[1]
            })

        })

        batch.commit().then(
            this.setState({
                lecturerWeightSummaryList: []
            }, () => {
                this.drawWeightSummary();
                    
            }))
    }

    drawWeightSummary = async() => {
        let weightListArray = []
        let lecturerListArray = []

        await firestore.collection('user').get().then((querySnapshot) => {
            querySnapshot.forEach(snap => {
                console.log("snap shot", snap.data())
                lecturerListArray.push(snap.data())

            })
            lecturerListArray.sort((a, b) => {
                if (a.displayName === b.displayName) {
                    //console.log("0", a, b);
                    return 0
                } else {
                    //console.log("other", a, b);
                    return (a.displayName > b.displayName) ? 1 : -1
                }
            })

            console.log('lectureArracy', lecturerListArray);

            lecturerListArray.forEach((item, index) => {
                weightListArray.push(<LecturerWeightSummaryRow key={item.email} weights={item.weights} firstName={item.firstName} lastName={item.lastName} email={item.email} />)
            })

            this.setState({
                lecturerWeightSummaryList: weightListArray,
            })
        })

    }

    updateRow = async(subjectCode) => {
        const index = this.state.reportRows.findIndex(el => el.key === subjectCode);
        const year = 'y2020'
        const rows = [...this.state.reportRows] // important to create a copy, otherwise you'll modify state outside of setState call
        const currentClassArray = []
        await firestore.collection(`classes/${year}/classes`).where('subjectCode', '==', subjectCode).get().then(snapShot => {
            snapShot.forEach(snap => {
                currentClassArray.push(snap.data())
            })
        })
        const row = <ReportsSubjectRow key={subjectCode} subjectCode={subjectCode} subjectTitle={currentClassArray[0].title}
            subjectClasses={currentClassArray} subjectWeights={this.state.subjectWeights} studentCountWeights={this.state.studentCountWeights}
            showModal={this.showModal}/>
        rows[index] = row;
        this.setState({ reportRows: rows });
    }

    drawReport = async() => {
            
        const subjectListArray = this.state.subjectList;
        const subjectWeights = this.state.subjectWeights;
        const subjectListArraySort = [];
        const studentCountWeights = this.state.studentCountWeights  
        const classListArray = this.state.classList;

        subjectListArray.forEach((item, index) => {
            const currentClassArray = []
            classListArray.forEach((i, index) => {
                if (Object.entries(i).length > 0) {
                     if (i.subjectCode === item[1].toString()) {
                        currentClassArray.push(classListArray[index])
                    }
                }
            })
            subjectListArraySort.push(<ReportsSubjectRow key={item[1]} subjectCode={item[1]} subjectTitle={item[0]}
                subjectClasses={currentClassArray} subjectWeights={subjectWeights} studentCountWeights={studentCountWeights}
                showModal={this.showModal}/>)

        })
        this.setState({
            reportRows: subjectListArraySort
        })
        console.log("reportRows", this.state.reportRows)
        //return subjectListArraySort;

    } 

    subjectLoop = (subjectList) => {
        const subjectListArray = [];
        for (let key in subjectList) {
            subjectListArray.push(<div className="grid-holder" >
                <div id="" className="wheather-grid-item-date" data-name="row1-date">{subjectList[key].code}</div>
                <div id="" className="wheather-grid-item-date" data-name="row1-date">{subjectList[key].title}</div>
                <div id="jan" className="grid-row" data-name="row-jan"></div>
                <div id="feb" className="grid-row" data-name="row-feb"></div>                             
                <div id="mar" className="grid-row" data-name="row-mar"></div>                             
                <div id="apr" className="grid-row" data-name="row-apr"></div>                             
                <div id="may" className="grid-row" data-name="row-may"></div>                             
                <div id="june" className="grid-row" data-name="row-june"></div>                             
                <div id="july" className="grid-row " data-name="row-july"></div>                             
                <div id="aug" className="grid-row " data-name="row-aug"></div>
                <div id="sep" className="grid-row " data-name="row-sep"></div>                             
                <div id="oct" className="grid-row" data-name="row-oct"></div>                             
                <div id="nov" className="grid-row" data-name="row-nov"></div>                             
                <div id="dec" className="grid-row" data-name="row-dec"></div>
                </div>)
        }
        return subjectListArray;
    }


    render() {
        const {loadingSchedule, loadingWeightSummary,reportRows, lecturerWeightSummaryList} =this.state
        return (
            <div>

                <InstanceModifyModal show={this.state.modalShow} hideModalAfterUpdate={this.hideModalAfterUpdate}
                    closeModal={this.closeModal} instanceInfo={this.state.modalInfo}>

                </InstanceModifyModal>

                <div className="report-container">
                    <div className="report-header">
                        <div className="report-header-item"></div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>F</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>S</span> </div>
                        <div className="report-header-item"><span>O</span> </div>
                        <div className="report-header-item"><span>N</span> </div>
                        <div className="report-header-item"><span>D</span> </div>
                    </div>
                        <TotalMonthlyInstanceCountRow className="report-header"/>
                    <div>
                    {/* {loadingSchedule ? <div>loading</div> : this.drawReport()} */}
                    {loadingSchedule ? <div>loading</div> : reportRows}

                    </div>
                    <div className="report-header">
                        <div className="report-header-item"></div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>F</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>S</span> </div>
                        <div className="report-header-item"><span>O</span> </div>
                        <div className="report-header-item"><span>N</span> </div>
                        <div className="report-header-item"><span>D</span> </div>
                    </div>
                </div>

                <div className="report-container">
                    <div className="report-header">
                        <div className="report-header-item"></div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>F</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>S</span> </div>
                        <div className="report-header-item"><span>O</span> </div>
                        <div className="report-header-item"><span>N</span> </div>
                        <div className="report-header-item"><span>D</span> </div>
                    </div>
                    <div>
                        {loadingWeightSummary ? <div>loading</div> : <div className='lecturer-weight-summary-holder'>{lecturerWeightSummaryList}</div>}

                    </div>
                    <div className="report-header">
                        <div className="report-header-item"></div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>F</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>S</span> </div>
                        <div className="report-header-item"><span>O</span> </div>
                        <div className="report-header-item"><span>N</span> </div>
                        <div className="report-header-item"><span>D</span> </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportsPage;