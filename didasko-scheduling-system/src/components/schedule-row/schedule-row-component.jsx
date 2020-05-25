import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import shallowCompare from 'react-addons-shallow-compare'; 

import './schedule-row-style.scss';

class ScheduleRow extends Component {
    constructor(props) {
        super(props);
        this.updateRowColour = this.updateRowColour.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.state={
            firstMonth: this.props.months[0],
            secondMonth: this.props.months[1],
            thridMonth: this.props.months[2],
            subject: this.props.subject,
            months: this.props.months


        }
    }

  
    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.months) !== JSON.stringify(prevProps.months)) {
            const node = ReactDOM.findDOMNode(this);
                node.querySelector(`#jan`).classList.remove('color');
                node.querySelector(`#feb`).classList.remove('color');
                node.querySelector(`#mar`).classList.remove('color');
                node.querySelector(`#apr`).classList.remove('color');
                node.querySelector(`#may`).classList.remove('color');
                node.querySelector(`#june`).classList.remove('color');
                node.querySelector(`#july`).classList.remove('color');
                node.querySelector(`#aug`).classList.remove('color');
                node.querySelector(`#sep`).classList.remove('color');
                node.querySelector(`#oct`).classList.remove('color');
                node.querySelector(`#nov`).classList.remove('color');
                node.querySelector(`#dec`).classList.remove('color');
                //node.querySelector(`#${this.state.months[2]}`).classList.remove('color');
            //console.log('New Months')
            this.setState({ months: this.props.months })
            console.log("old subject", prevProps.subject)
            console.log("new subject", this.props.subject)
            console.log('pre props Months', prevProps.months)
            console.log('New Months', this.props.months)
            console.log('STATE', this.state.months)
            this.updateRowColour(this.props.months)
            
          }
            
        
            //console.log("OLD MONTHS", this.state.months)
            
    }
    
    
    componentDidMount() {
        this.updateRowColour(this.state.months);
        console.log('ROW STATE:', this.state)
        console.log('ROW PRops:', this.props)
    }

    updateRowColour = (months) => {
        
        const node = ReactDOM.findDOMNode(this);
        

        switch (months[0]) {
            case "jan":
                node.querySelector(`#${months[0]}`).classList.add("color");
                //foundID.classList.add("color");
                break;
            case "feb":
                node.querySelector(`#${months[0]}`).classList.add("color");
                break;
            case "mar":
                node.querySelector(`#${months[0]}`).classList.add("color");
                break;
            case "apr":
                node.querySelector(`#${months[0]}`).classList.add("color");
                break;
            case "may":
                node.querySelector(`#${months[0]}`).classList.add("color");
                break;
            case "june":
                node.querySelector(`#${months[0]}`).classList.add("color");
            break;
            case "july":
                node.querySelector(`#${months[0]}`).classList.add("color");
            break;
            case "aug":
                node.querySelector(`#${months[0]}`).classList.add("color");
            break;
            case "sep":
                node.querySelector(`#${months[0]}`).classList.add("color");
            break;
            case "oct":
                node.querySelector(`#${months[0]}`).classList.add("color");
            break;
            case "nov":
                node.querySelector(`#${months[0]}`).classList.add("color");
            break;
            case "dec":
                node.querySelector(`#${months[0]}`).classList.add("color");
                break;
            default:
                break;
        }
        switch (months[1]) {
            case "jan":
                node.querySelector(`#${months[1]}`).classList.add("color");
                break;
            case "feb":
                node.querySelector(`#${months[1]}`).classList.add("color");
                break;
            case "mar":
                node.querySelector(`#${months[1]}`).classList.add("color");
                break;
            case "apr":
                node.querySelector(`#${months[1]}`).classList.add("color");
                break;
            case "may":
                node.querySelector(`#${months[1]}`).classList.add("color");
                break;
            case "june":
                node.querySelector(`#${months[1]}`).classList.add("color");
            break;
            case "july":
                node.querySelector(`#${months[1]}`).classList.add("color");
            break;
            case "aug":
                node.querySelector(`#${months[1]}`).classList.add("color");
            break;
            case "sep":
                node.querySelector(`#${months[1]}`).classList.add("color");
            break;
            case "oct":
                node.querySelector(`#${months[1]}`).classList.add("color");
            break;
            case "nov":
                node.querySelector(`#${months[1]}`).classList.add("color");
            break;
            case "dec":
                node.querySelector(`#${months[1]}`).classList.add("color");
                break;
            default:
                break;
        }
        switch (months[2]) {
            case "jan":
                node.querySelector(`#${months[2]}`).classList.add("color");
                break;
            case "feb":
                node.querySelector(`#${months[2]}`).classList.add("color");
                break;
            case "mar":
                node.querySelector(`#${months[2]}`).classList.add("color");
                break;
            case "apr":
                node.querySelector(`#${months[2]}`).classList.add("color");
                break;
            case "may":
                node.querySelector(`#${months[2]}`).classList.add("color");
                break;
            case "june":
                node.querySelector(`#${months[2]}`).classList.add("color");
            break;
            case "july":
                node.querySelector(`#${months[2]}`).classList.add("color");
            break;
            case "aug":
                node.querySelector(`#${months[2]}`).classList.add("color");
            break;
            case "sep":
                node.querySelector(`#${months[2]}`).classList.add("color");
            break;
            case "oct":
                node.querySelector(`#${months[2]}`).classList.add("color");
            break;
            case "nov":
                node.querySelector(`#${months[2]}`).classList.add("color");
            break;
            case "dec":
                node.querySelector(`#${months[2]}`).classList.add("color");
                break;
            default:
                break;
        }
        //this.setState({subject: this.props.subject})
    }

    
    render() {
        
        return (
            <div data-class-id={this.props.classID} className="grid-holder" >
                <div id="" className="wheather-grid-item-date" data-name="row1-date">{this.props.subject}</div>
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