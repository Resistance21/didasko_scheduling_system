import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import shallowCompare from 'react-addons-shallow-compare'; 

import './lecturer-weight-summary-row-style.scss';

class LecturerWeightSummaryRow extends Component {
    constructor(props) {
        super(props);

        //this.onHover = this.onHover.bind(this);
        //this.onOut = this.onOut.bind(this);

        this.state={
            weights: this.props.weights,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            hoverInfo: {
                teacher: 'John',
                hoverSubjectName: 'Class Name',
                students: 100,
                //subjectcode: this.props.subjectCode[0],
                subjectid: 'SCGR45',
                instanceID: ''
            },
            hover: false
        }
    }
    
    
    componentDidMount() {
        console.log('weightrow', this.state)
        const node = ReactDOM.findDOMNode(this);
        const {weights} = this.state
        for (const key in weights) {
            //console.log(`${key}: ${weights[key]}`);
            if (weights[key] < 3) {
                console.log("GREEN")
                node.querySelector(`#${key}`).style.backgroundColor = 'lightgreen';
            } else if (weights[key] < 6) {
                console.log("ORANGE")
                node.querySelector(`#${key}`).style.backgroundColor = 'orange';
            } else if (weights[key] >= 6) {
                console.log("RED")
                node.querySelector(`#${key}`).style.backgroundColor = 'red';
            }
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
        const { teacher, hoverSubjectName, students, subjectcode, subjectid, instanceID} = this.state.hoverInfo;
        const { firstName, lastName, email,weights } = this.state
        return (    
                <div className="lecturer-weight-summary-grid-holder" >
                    <div className="lecturer-weight-summary-grid-row" data-name="row1-date">{`${firstName} ${lastName}`}</div>
                    <div className="lecturer-weight-summary-grid-row" data-name="row1-date">{email}</div>
                    <div id="jan" className="lecturer-weight-summary-grid-row" data-name="row-jan" >{weights.jan.toFixed(2)}</div>
                    <div id="feb" className="lecturer-weight-summary-grid-row" data-name="row-feb" >{weights.feb.toFixed(2)}</div>                             
                    <div id="mar" className="lecturer-weight-summary-grid-row" data-name="row-mar" >{weights.mar.toFixed(2)}</div>                             
                    <div id="apr" className="lecturer-weight-summary-grid-row" data-name="row-apr" >{weights.apr.toFixed(2)}</div>                             
                    <div id="may" className="lecturer-weight-summary-grid-row" data-name="row-may" >{weights.may.toFixed(2)}</div>                             
                    <div id="jun" className="lecturer-weight-summary-grid-row" data-name="row-june">{weights.jun.toFixed(2)}</div>                             
                    <div id="jul" className="lecturer-weight-summary-grid-row" data-name="row-july">{weights.jul.toFixed(2)}</div>                             
                    <div id="aug" className="lecturer-weight-summary-grid-row" data-name="row-aug" >{weights.aug.toFixed(2)}</div>
                    <div id="sep" className="lecturer-weight-summary-grid-row" data-name="row-sep" >{weights.sep.toFixed(2)}</div>                             
                    <div id="oct" className="lecturer-weight-summary-grid-row" data-name="row-oct" >{weights.oct.toFixed(2)}</div>                             
                    <div id="nov" className="lecturer-weight-summary-grid-row" data-name="row-nov" >{weights.nov.toFixed(2)}</div>                             
                    <div id="dec" className="lecturer-weight-summary-grid-row" data-name="row-dec" >{weights.dec.toFixed(2)}</div>
                </div>
        )
    }
}

export default LecturerWeightSummaryRow;