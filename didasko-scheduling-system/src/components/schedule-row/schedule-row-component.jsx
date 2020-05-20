import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 

import './schedule-row-style.scss';

class ScheduleRow extends Component {
    constructor(props) {
        super(props);
        this.updateRowColour = this.updateRowColour.bind(this);
        
        this.state={
            firstMonth: "",
            secondMonth: "",
            thridMonth: "",
            idnum: this.props.idnum

        }
    }
  
    
    componentDidMount() {
        this.setState({
            firstMonth: this.props.months[0],
            secondMonth: this.props.months[1],
            thridMonth: this.props.months[2],
        })
        this.updateRowColour();
    }

    updateRowColour = () => {
        let foundID;
        const node = ReactDOM.findDOMNode(this);
        switch (this.props.months[0]) {
            case "jan":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
                //foundID.classList.add("color");
                break;
            case "feb":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
                break;
            case "mar":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
                break;
            case "apr":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
                break;
            case "may":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
                break;
            case "june":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
            break;
            case "july":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
            break;
            case "aug":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
            break;
            case "sep":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
            break;
            case "oct":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
            break;
            case "nov":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
            break;
            case "dec":
                node.querySelector(`#${this.props.months[0]}`).classList.add("color");
                break;
            default:
                break;
        }
        switch (this.props.months[1]) {
            case "jan":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
                break;
            case "feb":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
                break;
            case "mar":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
                break;
            case "apr":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
                break;
            case "may":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
                break;
            case "june":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
            break;
            case "july":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
            break;
            case "aug":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
            break;
            case "sep":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
            break;
            case "oct":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
            break;
            case "nov":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
            break;
            case "dec":
                node.querySelector(`#${this.props.months[1]}`).classList.add("color");
                break;
            default:
                break;
        }
        switch (this.props.months[2]) {
            case "jan":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
                break;
            case "feb":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
                break;
            case "mar":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
                break;
            case "apr":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
                break;
            case "may":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
                break;
            case "june":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
            break;
            case "july":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
            break;
            case "aug":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
            break;
            case "sep":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
            break;
            case "oct":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
            break;
            case "nov":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
            break;
            case "dec":
                node.querySelector(`#${this.props.months[2]}`).classList.add("color");
                break;
            default:
                break;
        }
    }

    
    render() {
        
        return (
            <div id={this.state.idnum} className="grid-holder">
                <div id="" className="wheather-grid-item-date" data-name="row1-date">class name</div>
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
            </div>
        )
    }
}

export default ScheduleRow;