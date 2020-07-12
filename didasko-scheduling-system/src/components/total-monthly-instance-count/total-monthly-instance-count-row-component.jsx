import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import shallowCompare from 'react-addons-shallow-compare'; 

import './total-monthly-instance-count-row-style.scss';
import { firestore } from '../../firebase/firebase.utils';

class TotalMonthlyInstanceCountRow extends Component {
    constructor(props) {
        super(props);

        //this.onHover = this.onHover.bind(this);
        //this.onOut = this.onOut.bind(this);

        this.state={
            weights: this.props.weights,
            lecturerName: this.props.lecturerName,
            email: this.props.email,
            hoverInfo: {
                teacher: 'John',
                hoverSubjectName: 'Class Name',
                students: 100,
                //subjectcode: this.props.subjectCode[0],
                subjectid: 'SCGR45',
                instanceID: ''
            },
            hover: false,
            classArray: [],
            months:{
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
            },
            assignedMonths: {
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
            
        }
    }

    getInstance = async () => {
        let {months, classArray} = this.state
        const node = ReactDOM.findDOMNode(this);
        await firestore.collection('classes/y2020/classes').get().then(snapShot => {
            const tempArray =[];
            snapShot.forEach(el => {
                tempArray.push(el.data())
            })
            this.setState({
                classArray: tempArray
            })
        })
        console.log("classArracy count", classArray)

        this.state.classArray.forEach((el, index) => {
            const monthsStart = el.months.split(',', 1);
            switch (monthsStart[0]) {
                case "jan":
                    months.jan += 1;
                    break;
                case "feb":
                    months.feb += 1;
                    break;
                case "mar":
                    months.mar += 1;
                    break;
                case "apr":
                    months.apr += 1;
                    break;
                case "may":
                    months.may += 1;
                    break;
                case "jun":
                    months.jun += 1;
                    break;
                case "jul":
                    months.jul += 1;
                    break;
                case "aug":
                    months.aug += 1;
                    break;
                case "sep":
                    months.sep += 1;
                    break;
                case "oct":
                    months.oct += 1;
                    break;
                case "nov":
                    months.nov += 1;
                    break;
                case "dec":
                    months.dec += 1;
                    break;
                default:
                    break;
            }
        })
        this.tallyTotlaCount();
    }
    
    
    componentDidMount = async() => {
        
        this.getInstance();
    }

    renderHoverDiv = (top, left, divid) => {
        console.log(top, left)
        
        const styleValues = {
            position: 'fixed',
            top: top + 35,
            left: left,
            zIndex: 1,
            backgroundColor: "black",
            color: 'white'

        };
        this.setState({
            hoverInfo: {
                teacher: 'Jane',
                hoverSubjectName: this.state.subjectName,
                students: 350,
                //subjectcode: 'XXXX',
                subjectid: divid.id,
                instanceID: divid.dataset.instanceId
            
        }})
        //const divStore = [];
        //divStore.push(<div key={1} style={{ styleValues }}>This is added div! uniqueID:</div>);
        this.setState({ styleValues: styleValues })
        console.log(this.state.styleValues)
        return (
            this.state.hoverDiv
        )
    }

    onHover = (event) => {
        this.setState({ styleStore: event.target.style.boxShadow })
        console.log('hover in')
        const node = ReactDOM.findDOMNode(this);
        const positions = event.target.getBoundingClientRect();
        const hoveredDiv = event.target
        console.log(event.target)
        const dataSet = node.querySelector(`#${hoveredDiv.id}`).innerHTML;
        if (dataSet !== '') {
            this.renderHoverDiv(positions.top, positions.left, hoveredDiv);
            this.setState({hover: true})   
        }

    }

    onOut = (event) => {
        //const node = ReactDOM.findDOMNode(this);
        //const hoveredDiv = event.target.dataset.id
        //const dataSet = node.querySelectorAll(`[data-id]`);
        //this.setState({ hoverDiv: "" })
        this.setState({hover: false})
        //this.renderHoverDiv();
    }

    tallyTotlaCount = () => {
        const { months, classArray } = this.state
        const tempMonths = {
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

        const tempAssignedMonths = {
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

        this.state.classArray.forEach((el, index) => {
            const monthsStart = el.months.split(',', 1);
            switch (monthsStart[0]) {
                case "jan":
                    tempMonths.jan += 1;
                    if (el.assigned) {
                        tempAssignedMonths.jan += 1;
                    }
                    break;
                case "feb":
                    tempMonths.feb += 1;
                    if (el.assigned) {
                        tempAssignedMonths.feb += 1;
                    }
                    break;
                case "mar":
                    tempMonths.mar += 1;
                    if (el.assigned) {
                        tempAssignedMonths.mar += 1;
                    }
                    break;
                case "apr":
                    tempMonths.apr += 1;
                    if (el.assigned) {
                        tempAssignedMonths.apr += 1;
                    }
                    break;
                case "may":
                    tempMonths.may += 1;
                    if (el.assigned) {
                        tempAssignedMonths.may += 1;
                    }
                    break;
                case "jun":
                    tempMonths.jun += 1;
                    if (el.assigned) {
                        tempAssignedMonths.jun += 1;
                    }
                    break;
                case "jul":
                    tempMonths.jul += 1;
                    if (el.assigned) {
                        tempAssignedMonths.jul += 1;
                    }
                    break;
                case "aug":
                    tempMonths.aug += 1;
                    if (el.assigned) {
                        tempAssignedMonths.aug += 1;
                    }
                    break;
                case "sep":
                    tempMonths.sep += 1;
                    if (el.assigned) {
                        tempAssignedMonths.sep += 1;
                    }
                    break;
                case "oct":
                    tempMonths.oct += 1;
                    if (el.assigned) {
                        tempAssignedMonths.oct += 1;
                    }
                    break;
                case "nov":
                    tempMonths.nov += 1;
                    if (el.assigned) {
                        tempAssignedMonths.nov += 1;
                    }
                    break;
                case "dec":
                    tempMonths.dec += 1;
                    if (el.assigned) {
                        tempAssignedMonths.dec += 1;
                    }
                    break;
                default:
                    break;
            }
        })
        this.setState({
            months: tempMonths,
            assignedMonths: tempAssignedMonths
        })
    }


    
    render() {
        const { teacher, hoverSubjectName, students, subjectcode, subjectid, instanceID} = this.state.hoverInfo;
        const { months, assignedMonths } = this.state
        return ( 
                <div className="report-total-instance-grid-holder" >
                    <div id="" className="report-total-instance-grid-row" data-name="row1-date"></div>
                    <div id="" className="report-total-instance-grid-row" data-name="row1-date"></div>
                    <div id="jan" className="report-total-instance-grid-row" data-name="row-jan" >T:{months.jan}  A:{assignedMonths.jan}</div>
                    <div id="feb" className="report-total-instance-grid-row" data-name="row-feb" >T:{months.feb}  A:{assignedMonths.feb}</div>                             
                    <div id="mar" className="report-total-instance-grid-row" data-name="row-mar" >T:{months.mar}  A:{assignedMonths.mar}</div>                             
                    <div id="apr" className="report-total-instance-grid-row" data-name="row-apr" >T:{months.apr}  A:{assignedMonths.apr}</div>                             
                    <div id="may" className="report-total-instance-grid-row" data-name="row-may" >T:{months.may}  A:{assignedMonths.may}</div>                             
                    <div id="jun" className="report-total-instance-grid-row" data-name="row-june">T:{months.jun}  A:{assignedMonths.jun}</div>                             
                    <div id="jul" className="report-total-instance-grid-row" data-name="row-july">T:{months.jul}  A:{assignedMonths.jul}</div>                             
                    <div id="aug" className="report-total-instance-grid-row" data-name="row-aug" >T:{months.aug}  A:{assignedMonths.aug}</div>
                    <div id="sep" className="report-total-instance-grid-row" data-name="row-sep" >T:{months.sep}  A:{assignedMonths.sep}</div>                             
                    <div id="oct" className="report-total-instance-grid-row" data-name="row-oct" >T:{months.oct}  A:{assignedMonths.oct}</div>                             
                    <div id="nov" className="report-total-instance-grid-row" data-name="row-nov" >T:{months.nov}  A:{assignedMonths.nov}</div>                             
                    <div id="dec" className="report-total-instance-grid-row" data-name="row-dec" >T:{months.dec}  A:{assignedMonths.dec}</div>
                </div>
        )
    }
}

export default TotalMonthlyInstanceCountRow;