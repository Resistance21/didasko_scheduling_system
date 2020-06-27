import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import shallowCompare from 'react-addons-shallow-compare'; 

import './total-monthly-instance-count-row-component';
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
            }
            
        }
    }
    
    
    componentDidMount = async() => {
        let {months, classArray} = this.state
        const node = ReactDOM.findDOMNode(this);
        await firestore.collection('classes/y2020/classes').where("assigned", '==', true).get().then(snapShot => {
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


        /* const {weights} = this.state
        for (const key in weights) {
            //console.log(`${key}: ${weights[key]}`);
            if (weights[key] < 3) {
                console.log("GREEN")
                node.querySelector(`#${key}`).style.backgroundColor = 'green';
            } else if (weights[key] < 6) {
                console.log("ORANGE")
                node.querySelector(`#${key}`).style.backgroundColor = 'orange';
            } else if (weights[key] >= 6) {
                console.log("RED")
                node.querySelector(`#${key}`).style.backgroundColor = 'red';
            }
          } */
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

        this.state.classArray.forEach((el, index) => {
            const monthsStart = el.months.split(',', 1);
            switch (monthsStart[0]) {
                case "jan":
                    tempMonths.jan += 1;
                    break;
                case "feb":
                    tempMonths.feb += 1;
                    break;
                case "mar":
                    tempMonths.mar += 1;
                    break;
                case "apr":
                    tempMonths.apr += 1;
                    break;
                case "may":
                    tempMonths.may += 1;
                    break;
                case "jun":
                    tempMonths.jun += 1;
                    break;
                case "jul":
                    tempMonths.jul += 1;
                    break;
                case "aug":
                    tempMonths.aug += 1;
                    break;
                case "sep":
                    tempMonths.sep += 1;
                    break;
                case "oct":
                    tempMonths.oct += 1;
                    break;
                case "nov":
                    tempMonths.nov += 1;
                    break;
                case "dec":
                    tempMonths.dec += 1;
                    break;
                default:
                    break;
            }
        })
        this.setState({
            months: tempMonths
        })
    }


    
    render() {
        const { teacher, hoverSubjectName, students, subjectcode, subjectid, instanceID} = this.state.hoverInfo;
        const { months } = this.state
        return (
            <div style={{position: "relative"}}>
                {this.state.hover ? <div style={this.state.styleValues}>
                    <div> Teacher: {teacher} </div>
                    <div> Subject Title: {this.state.subjectTitle[0]} </div>
                    <div> Student Count: {students} </div>
                    <div> Subject Code: {this.state.subjectCode[0]} </div>
                    <div> Start Months: {subjectid} </div>
                    <div> Instance ID: {instanceID} </div>
                    </div> : null} 
                <div className="report-grid-holder" >
                    <div id="" className="report-grid-row" data-name="row1-date"></div>
                    <div id="" className="report-grid-row" data-name="row1-date"></div>
                    <div id="jan" className="report-grid-row" data-name="row-jan" >{this.state.months.jan}</div>
                    <div id="feb" className="report-grid-row" data-name="row-feb" >{months.feb}</div>                             
                    <div id="mar" className="report-grid-row" data-name="row-mar" >{months.mar}</div>                             
                    <div id="apr" className="report-grid-row" data-name="row-apr" >{months.apr}</div>                             
                    <div id="may" className="report-grid-row" data-name="row-may" >{months.may}</div>                             
                    <div id="jun" className="report-grid-row" data-name="row-june">{months.jun}</div>                             
                    <div id="jul" className="report-grid-row" data-name="row-july">{months.jul}</div>                             
                    <div id="aug" className="report-grid-row" data-name="row-aug" >{months.aug}</div>
                    <div id="sep" className="report-grid-row" data-name="row-sep" >{months.sep}</div>                             
                    <div id="oct" className="report-grid-row" data-name="row-oct" >{months.oct}</div>                             
                    <div id="nov" className="report-grid-row" data-name="row-nov" >{months.nov}</div>                             
                    <div id="dec" className="report-grid-row" data-name="row-dec" >{months.dec}</div>
                </div>
            </div>
        )
    }
}

export default TotalMonthlyInstanceCountRow;