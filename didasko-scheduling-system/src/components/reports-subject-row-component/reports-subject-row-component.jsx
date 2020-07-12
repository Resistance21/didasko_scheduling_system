import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LecturerWeightSummaryRow from '../../components/lecturer-weight-summary/lecturer-weight-summary-row-component.jsx'
import { firestore } from '../../firebase/firebase.utils'
import InstanceModifyModal from '../instance-modify-modal-component/instance-modify-modal-component.jsx'
//import shallowCompare from 'react-addons-shallow-compare'; 

import './reports-subject-row-style.scss';

class ReportsSubjectRow extends Component {
    constructor(props) {
        super(props);

        this.onHover = this.onHover.bind(this);
        this.onOut = this.onOut.bind(this);

        this.state={
            subjectClasses: this.props.subjectClasses,
            subjectCode: this.props.subjectCode,
            subjectTitle: this.props.subjectTitle,
            instanceType: this.props.instanceType,
            hoverInfo: {
                teacher: 'John',
                hoverSubjectName: 'Class Name',
                students: 100,
                subjectcode: this.props.subjectCode[0],
                subjectid: 'SCGR45',
                instanceID: ''
            },
            hover: false,
            loadingData: true,
            subjectList: {},
            subjectWeights: this.props.subjectWeights,
            studentCountWeights: this.props.studentCountWeights,
            show: false
        }
    }
    
    
    
    showModal = (event) => {
        this.props.showModal(event.target)
      };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    updateRow = () => {
        const { subjectClasses, subjectWeights, studentCountWeights, subjectCode, instanceType } = this.state;
            const node = ReactDOM.findDOMNode(this);
            if (subjectClasses.length > 0) {
                
                subjectClasses.forEach((item, index) => {
                    if (item.length === 0) {
                        
                    } else {
                        if (item.classID === 'CSE2ANX-MAY') {
                            console.log("ITEM", item)
                            
                        }
                        let studentCountMet = false;
                        let studentCountWeightAmount = 0;
                        let instanceWeight = 0;
                        let weight = 0;
                        subjectWeights.forEach(i => {
                            if (i[0] === item.instanceType) {
                                instanceWeight = i[1].weight
                            }
                        })
    
                        studentCountWeights.sort((a, b) => a[2] - b[2])
    
                        studentCountWeights.forEach((el, index) => {
                            if (item.studentCount < el[2] && studentCountMet === false) {
                                studentCountWeightAmount = el[1];
                                studentCountMet = true;
                            }
    
                            if (item.studentCount >= studentCountWeights[studentCountWeights.length - 1][2]
                                && studentCountMet === false) {
                                    studentCountWeightAmount = studentCountWeights[studentCountWeights.length - 1][1];
                                    studentCountMet = true;
                                }
    
                        })
    
                        weight = studentCountWeightAmount + instanceWeight;
                        
                        //console.log('report class', item)
                        const monthsArray = item.months.split(',', 1)
                        //console.log('months aray',monthsArray)
                        const startMonth = node.querySelector(`#${monthsArray[0]}`);
                        //console.log('start months',startMonth)
                        if (item.teacher[0].length > 8) {
                            startMonth.innerHTML = item.teacher[0].substring(0,12);
                        } else {
                            startMonth.innerHTML = `${item.teacher[0]} ${item.teacher[1]}`;                      
                        }
                        startMonth.setAttribute('data-instance-id', item.classID);
                        startMonth.setAttribute('data-weight-amount', weight);
                        startMonth.setAttribute('data-subject-code', subjectCode);
                        startMonth.setAttribute('data-instance-type', item.instanceType);
                        startMonth.setAttribute('data-student', item.studentCount);
                        startMonth.setAttribute('data-lecturer-email', item.teacherEmail);
                        startMonth.setAttribute('data-lecturer-first-name', item.teacher[0]);
                        startMonth.setAttribute('data-lecturer-second-name', item.teacher[1]);
                        startMonth.setAttribute('data-support-lecturers-assigned', item.supportLecturerAssigned);
                        startMonth.setAttribute('data-support-lecturers', item.supportLecturerName);
                        startMonth.addEventListener('click', this.showModal);
                        startMonth.classList.add('has-instance');
                        
                        
                    }
                });
            }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.subjectClasses !== prevProps.subjectClasses) {
            this.setState({
                subjectClasses: this.props.subjectClasses
            }, () => {
                this.updateRow()
                    
            })
        }
    }
    
    componentDidMount() {

        this.updateRow();

    }

    renderHoverDiv = (top, left, div, height) => {
       console.log('position check',top, left,height)
        
        const styleValues = {
            position: 'fixed',
            top: top + height + 25,
            left: left,
            zIndex: 1,
            //backgroundColor: "black",
            //color: 'white'
        };

        let month = '';
        let supportLecturers = '';

        switch (div.id) {
            case "jan":
                month = 'January';
                break;
            case "feb":
                month = 'February'
                break;
            case 'mar':
                month = 'March';
                break;
            case "apr":
                month = 'April';
                break;
            case "may":
                month = 'May'
                break;
            case 'jun':
                month = 'June';
            break;
            case "jul":
                month = 'July';
                break;
            case "aug":
                month = 'August'
                break;
            case 'sep':
                month = 'September';
            break;
            case "oct":
                month = 'October';
                break;
            case "nov":
                month = 'November'
                break;
            case 'dec':
                month = 'December';
                break;
            default:
                break
        }

        if (div.dataset.supportLecturersAssigned === 'undefined') {
            supportLecturers = 'None';
        } else {
            supportLecturers = div.dataset.supportLecturers
        }
        

        this.setState({
            hoverInfo: {
                teacher: `${div.dataset.lecturerFirstName} ${div.dataset.lecturerSecondName}`,
                hoverSubjectName: this.state.subjectName,
                supportLecturers: supportLecturers,
                students: div.dataset.student,
                subjectid: month,
                instanceID: div.dataset.instanceId,
                subjectCode: div.dataset.subjectCode,
                weightAmount: div.dataset.weightAmount
            
        }})
        this.setState({ styleValues: styleValues })
        console.log(this.state.styleValues)
        return (
            this.state.hoverDiv
        )
    }

    onHover = (event) => {
        this.setState({ styleStore: event.target.style.boxShadow })
        //console.log('hover in')
        const node = ReactDOM.findDOMNode(this);
        const positions = event.target.getBoundingClientRect();
        const hoveredDiv = event.target
        console.log(event.target)
        console.log(positions)
        const dataSet = node.querySelector(`#${hoveredDiv.id}`).innerHTML;
        if (dataSet !== '') {
            this.renderHoverDiv(positions.top, positions.left, hoveredDiv, positions.height);
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


    
    render() {
        const { teacher, hoverSubjectName, students, subjectCode,
            subjectid, instanceID, supportLecturers, weightAmount } = this.state.hoverInfo;
        //style={{ position: "relative" }}
        return (
            <div className='report-row-content'>              
                
                {this.state.hover ? <div className='instance-info-hover' style={this.state.styleValues}>
                    <div> Lecturer: {teacher} </div>
                    <div> Subject Title: {this.state.subjectTitle[0]} </div>
                    <div> Support Lecturers: {supportLecturers} </div>
                    <div> Student Count: {students} </div>
                    <div> Subject Code: {subjectCode} </div>
                    <div> Start Months: {subjectid} </div>
                    <div> Instance ID: {instanceID} </div>
                    <div> Weight Amount: {weightAmount} </div>
                </div> : null} 
                
                <div className="report-grid-holder" >
                    <div id="" className="report-grid-row" data-name="row1-date">{this.state.subjectCode}</div>
                    <div id="" className="report-grid-row" data-name="row1-date">{this.state.subjectTitle}</div>
                    <div id="jan" className="report-grid-row" data-name="row-jan" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id="feb" className="report-grid-row" data-name="row-feb" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="mar" className="report-grid-row" data-name="row-mar" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="apr" className="report-grid-row" data-name="row-apr" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="may" className="report-grid-row" data-name="row-may" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="jun" className="report-grid-row" data-name="row-june" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="jul" className="report-grid-row" data-name="row-july" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="aug" className="report-grid-row" data-name="row-aug" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id="sep" className="report-grid-row" data-name="row-sep" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="oct" className="report-grid-row" data-name="row-oct" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="nov" className="report-grid-row" data-name="row-nov" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="dec" className="report-grid-row" data-name="row-dec" 
                        onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>
            </div>
        )
    }
}

export default ReportsSubjectRow;