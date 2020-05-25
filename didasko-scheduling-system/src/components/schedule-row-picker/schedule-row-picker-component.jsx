import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 

import './schedule-row-picker-style.scss';
import { firestore } from '../../firebase/firebase.utils';

class ScheduleRowPicker extends Component {
    constructor(props) {
        super(props);
        this.updateRowColour = this.updateRowColour.bind(this);
        
        this.state={
            firstMonth: "",
            secondMonth: "",
            thridMonth: "",
            idnum: this.props.idnum,


        }
        this.onDropDownChange = this.onDropDownChange.bind(this);
    }
  
    
    componentDidMount() {
        const rowEL = document.querySelectorAll('.add-class-grid-row');
        for (const row of rowEL) {
            row.addEventListener('mouseover', (e) => {
                this.mouseOverGridSquare(e);
            })
        }

        firestore.collection('subjects').doc('subjectList').get().then((snapShot) => {
            const dropDown = document.querySelector('#subjects-picker-dropdown');
            let DropDownString = [];
            for (let key in snapShot.data()) {               
                if (snapShot.data().hasOwnProperty(key)) {
                    DropDownString.push(snapShot.data()[key].title); 
                }
            }
            let dropDownOrder = DropDownString.sort()
            dropDownOrder.forEach((el) => {
                const option = (document.createElement("option"));
                option.text = el;
                dropDown.add(option);
                //console.log("ORDER", el)
                //console.log("next item ", ((arr.length - 1 === index) ? "END" : arr[index + 1].text))
                //orderedDropDown.sort()   
            })

        })
    }

    updateRowColour = () => {
        //let foundID;
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

    mouseOverGridSquare(caller) {
        const gridSqaures = document.querySelectorAll('.add-class-grid-row');
        let secondRow;
        let thridRow;
        const className = "new-class-colour"

        //console.log("class check :",classCheck)

        for (let row of gridSqaures) {
            row.classList.remove(className);
        }

        for (let row of gridSqaures) {
            if (caller.path[0].id === row.id) {
                if (row.id === "dec") {
                    row.classList.add(className); 
                }
                else if (row.id === "nov") {
                    //console.log("MATCHED" + caller.path[0].id + "AND " + row.id)
                    secondRow = row.nextElementSibling;
                    row.classList.add(className);
                    secondRow.classList.add(className);
                } else {
                    //console.log("MATCHED" + caller.path[0].id + "AND " + row.id)
                    secondRow = row.nextElementSibling;
                    thridRow = secondRow.nextElementSibling;
                    row.classList.add(className);
                    secondRow.classList.add(className);
                    thridRow.classList.add(className)
                    //console.log(row, secondRow, thridRow)
                    
                }
            }
        }
    }

    onDropDownChange() {
        const dropDown = document.querySelector('#subjects-picker-dropdown');
        const classDropDown = document.querySelector('#subjects-class-picker-dropdown');
        let dropDownValue = dropDown.value;

        const classCheck = firestore.collection('classes').where('subject', '==', dropDownValue).get().then(snapShot => {
            snapShot.forEach(doc => {
                const option = (document.createElement("option"));
                option.text = doc.data().subject;
                option.value = doc.id;
                classDropDown.add(option)
                 //console.log(doc.id, " => ", doc.data())
                
            })
        })

    }
    
    render() {
        
        return (
            <div>

                <label for='subjects'>Pick a class</label>
                <select name='subjects' id='subjects-picker-dropdown' onChange={this.onDropDownChange} ></select>
                <select name='subjects' id='subjects-class-picker-dropdown'></select>
                <div className='container'>
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
                    <div id={this.state.idnum} className="grid-holder">
                        <div id="" className="class-name" data-name="picked-class"></div>
                        <div id="jan" className="add-class-grid-row grid-row" data-name="row-jan"></div>
                        <div id="feb" className="add-class-grid-row grid-row" data-name="row-feb" ></div>                             
                        <div id="mar" className="add-class-grid-row grid-row" data-name="row-mar"></div>                             
                        <div id="apr" className="add-class-grid-row grid-row" data-name="row-apr"></div>                             
                        <div id="may" className="add-class-grid-row grid-row" data-name="row-may"></div>                             
                        <div id="june" className="add-class-grid-row grid-row" data-name="row-june"></div>                             
                        <div id="july" className="add-class-grid-row grid-row" data-name="row-july"></div>                             
                        <div id="aug" className="add-class-grid-row grid-row" data-name="row-aug"></div>
                        <div id="sep" className="add-class-grid-row grid-row" data-name="row-sep"></div>                             
                        <div id="oct" className="add-class-grid-row grid-row" data-name="row-oct"></div>                             
                        <div id="nov" className="add-class-grid-row grid-row" data-name="row-nov"></div>                             
                        <div id="dec" className="add-class-grid-row grid-row" data-name="row-dec"></div>
                    </div>
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
                </div>
            </div>
        )
    }
}

export default ScheduleRowPicker;