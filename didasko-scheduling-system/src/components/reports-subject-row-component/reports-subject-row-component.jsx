import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
            hoverInfo: {
                teacher: 'John',
                hoverSubjectName: 'Class Name',
                students: 100,
                subjectcode: this.props.subjectCode[0],
                subjectid: 'SCGR45',
                instanceID: ''
            },
            hover: false
        }
    }
    
    
    componentDidMount() {
        const { subjectClasses } = this.state;
        const node = ReactDOM.findDOMNode(this);
        //console.log("report state", this.state)
        if (subjectClasses.length > 0) {
            
            subjectClasses[0].forEach((item, index) => {
                if (item.length === 0) {
                    
                } else {
                    
                    //console.log('report class', item)
                    const monthsArray = item[3].toString().split(',', 1)
                    //console.log('months aray',monthsArray)
                    const startMonth = node.querySelector(`#${monthsArray[0]}`);
                    //console.log('start months',startMonth)
                    startMonth.innerHTML = item[1];
                    startMonth.setAttribute('data-instance-id', item[2]);
                }
            });
        }
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


    
    render() {
        const { teacher, hoverSubjectName, students, subjectcode, subjectid, instanceID } = this.state.hoverInfo;
        
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
                    <div id="" className="report-grid-row" data-name="row1-date">{this.state.subjectCode}</div>
                    <div id="" className="report-grid-row" data-name="row1-date">{this.state.subjectTitle}</div>
                    <div id="jan" className="report-grid-row" data-name="row-jan" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id="feb" className="report-grid-row" data-name="row-feb" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="mar" className="report-grid-row" data-name="row-mar" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="apr" className="report-grid-row" data-name="row-apr" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="may" className="report-grid-row" data-name="row-may" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="jun" className="report-grid-row" data-name="row-june" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="jul" className="report-grid-row" data-name="row-july" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="aug" className="report-grid-row" data-name="row-aug" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id="sep" className="report-grid-row" data-name="row-sep" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="oct" className="report-grid-row" data-name="row-oct" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="nov" className="report-grid-row" data-name="row-nov" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>                             
                    <div id="dec" className="report-grid-row" data-name="row-dec" onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>
            </div>
        )
    }
}

export default ReportsSubjectRow;