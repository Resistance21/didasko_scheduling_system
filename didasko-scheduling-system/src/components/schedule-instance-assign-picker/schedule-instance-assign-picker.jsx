import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import shallowCompare from 'react-addons-shallow-compare'; 

import './schedule-instance-assign-picker.scss';
import CustomButton from '../custom-button/custom-button.component'
import { firestore } from '../../firebase/firebase.utils';

class ScheduleInstanceAssignPicker extends Component {
    constructor(props) {
        super(props);
        this.updateRowColour = this.updateRowColour.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onOut = this.onOut.bind(this);
        this.colourOneMonthTwo = this.colourOneMonthTwo.bind(this);
        this.onClicked = this.onClicked.bind(this);

        this.state = {
            firstMonth: '',
            secondMonth: '',
            thridMonth: '',
            subjectName: '',
            months: '',
            schedule: '',
            subjectID: '',
            subjectColours: ['#01cc00',
                '#1241ab',
                '#cd0174',
                '#ffaa00',
                '#ff7400',
                '#fe0000',
                '#cd0174',
                '#7209ab',
                '#3914af',
                '#1241ab',
                '#009899',
                '#01cc00',
                '#9fef02'],
            styleStore: '',
            hover: false,
            hoverDiv: [],
            styleValues: {},
            hoverInfo: {
                teacher: 'John',
                hoverSubjectName: 'Class Name',
                students: 100,
                subjectcode: 'SCGR45',
                subjectid: 'SCGR45',
            },
            displaySwitcher: 'three-row',
            displayswitcherRun: this.props.changeDisplayRows,
            reDraw: false,
            refresh: this.props.refresh,
            selectedUserData:this.props.selectedUserData
            

            


        }
    }

  
    componentDidUpdate(prevProps) {
        /* if (JSON.stringify(this.props.schedule) !== JSON.stringify(prevProps.schedule)) {
            this.setState({
                schedule: this.props.schedule,
                reDraw: true
            })           
        } */

        if (JSON.stringify(this.props.selectedUserData) !== JSON.stringify(prevProps.selectedUserData)) {
            this.setState({
                selectedUserData: this.props.selectedUserData
            }, () => {
                    this.setQualification();
            })
        }
            
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { refresh} = this.props;
        if (props.refresh !== refresh) {
            this.colourThreeMonthsUpdate();
        }
    }

    
    setQualification = async () => {
        const { selectedUserData } = this.state
        
        //await firestore.collection('subjects').doc('subjectList').get().then((snapShot) => {
            const dropDown = document.querySelector('#subjects-row-picker-dropdown');
            const qualificationArray = Object.values(selectedUserData.qualifications)
            let DropDownString = [];
            qualificationArray.forEach(el => {
                DropDownString.push([el[1],el[0]]);
            })

            let dropDownOrder = qualificationArray.sort((a, b) => {
                var nameA = a[1].toUpperCase();
                var nameB = b[1].toUpperCase(); 
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })

            dropDown.options.length = 0;
            dropDownOrder.forEach((el) => {
                const option = (document.createElement("option"));
                option.text = el[1];
                option.dataset.subjectId = el[0]
                dropDown.add(option);  
            })

        /* }).catch(function(error) {
            console.log("Error getting documents: ", error);
        }); */
    }
    
    
    componentDidMount = async () => {
        const { schedule, displaySwitcher } = this.state;

        await firestore.collection('subjects').doc('subjectList').get().then((snapShot) => {
            const dropDown = document.querySelector('#subjects-row-picker-dropdown');
            let DropDownString = [];
            for (let key in snapShot.data()) {               
                if (snapShot.data().hasOwnProperty(key)) {
                    DropDownString.push([[snapShot.data()[key].title],[snapShot.data()[key].code]]); 
                }
            }

            let dropDownOrder = DropDownString.sort()
            dropDownOrder.forEach((el) => {
                const option = (document.createElement("option"));
                option.text = el[0][0];
                option.dataset.subjectId = el[1][0] 
                dropDown.add(option);  
            })

            dropDown.selectedIndex = -1;

        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        const dropDownValue = document.querySelector('#subjects-row-picker-dropdown').options[0].dataset.subjectId;
        this.setState({
            subjectID: dropDownValue
        })
        const classArray = [];

        await firestore.collection('classes/y2020/classes').where("subjectCode", '==', dropDownValue).get().then(snapShot => {              
            snapShot.forEach(snap => {
                //classArray.push(snap.data())
                classArray.push(snap.data());
                console.log('SNAP CLASS', snap.data())
            })
            
        })

        await firestore.collection("weights").get().then(snapShot => {
            let weightsArray= []
            snapShot.forEach(el => {               
                weightsArray.push([[el.id],[el.data().weight]]) 
            })
            this.setState({
                weights: weightsArray
                
            })
        })

        await firestore.collection("weights/number of students weights/number break points").get().then(snapShot => {
            let studentWeightsArray= []
            snapShot.forEach(el => {               
                studentWeightsArray.push([[el.id],[el.data().weight],[el.data().count]]) 
            })
            this.setState({
                studentCountWeight: studentWeightsArray
                
            })
        })

        this.colourThreeMonthsSetup();
        
    }

    

    colourThreeMonthsSetup = async() => {
        const { schedule, subjectColours, weights, studentCountWeight, weightHolder,selectedUserID, subjectID} = this.state;
        //const node = this.state.node === '' ? ReactDOM.findDOMNode(this) : this.state.node;
        const node = ReactDOM.findDOMNode(this);
        this.setState({node: node})
        let bevel = 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
        const scheduleObj = []
        let classArray = []
        let scheduleArray=[]
        const topRows = node.querySelectorAll('.assign-schedule-grid-row');
        const hideRows = node.querySelectorAll('.three-row');
        topRows.forEach(item => {
            item.childNodes.forEach((i) => {
                i.style.height = '10px';
                i.style.backgroundColor = '';
                i.style.boxShadow = '';
                i.removeAttribute("data-id");
                i.classList.remove('has-class');
                i.dataset.hasclass = "false";
                i.innerText = ''
                
            })
        })

        /* await firestore.collection('classes/y2020/classes').where("subjectCode", '==', subjectID).get().then(snapShot => {              
                snapShot.forEach(snap => {
                    classArray.push(snap.data());
                })
                
            }) */
   
        /* classArray.forEach((item, index) => {

            const instanceInfo = classArray.filter(el => el.classID === item.classID)

                let instanceWeightAmount = 0;
                let studentCountWeightAmount = 0;
                let totalWeightAmount = 0;
                const studentCountWeightArray = studentCountWeight;
                let studentCountMet = false;
                studentCountWeightArray.sort((a, b) => a[2] - b[2])

                weights.forEach(el => {
                    if (instanceInfo[0].instanceType === el[0].toString()) {
                        instanceWeightAmount = el[1];
                    }
                })

                studentCountWeightArray.forEach((el, index) => {
                    if (instanceInfo[0].studentCount < el[2] && studentCountMet === false) {
                        studentCountWeightAmount = el[1];
                        studentCountMet = true;
                    }

                    if (instanceInfo[0].studentCount >= studentCountWeightArray[studentCountWeightArray.length - 1][2]
                        && studentCountMet === false) {
                            studentCountWeightAmount = studentCountWeightArray[studentCountWeightArray.length - 1][1];
                            studentCountMet = true;
                        }

                })
            
            totalWeightAmount = instanceWeightAmount[0] + studentCountWeightAmount[0]
            let subjectMonthsArray = []//instanceInfo[0].months.split(",", 3);
            if (instanceInfo[0].months.startsWith("dec")) {
                subjectMonthsArray.push(instanceInfo[0].months.split(",", 1))
            } else if (instanceInfo[0].months.startsWith("nov")) {
                subjectMonthsArray.push(instanceInfo[0].months.split(",", 2))
            } else {
                subjectMonthsArray.push(instanceInfo[0].months.split(",", 3))
            }
            let monthCheck = ['', '', ''];
            
            subjectMonthsArray.forEach((el) => {
                el.forEach((month, index) => {
                                
                    let currentMonth = node.querySelector(`#${month}`)
                    let currentMonthChildren = currentMonth.childNodes;
                    currentMonthChildren.forEach((child, index) => {
                        let arrayStore = monthCheck[index];
                        arrayStore += child.dataset.hasclass;
                        monthCheck[index] = arrayStore;
                        
                    }) 
                            })
            
                        })      
            
                        if (monthCheck[0] === 'falsefalsefalse'){
                            const rowNum = 1
                            const rowOne = node.querySelectorAll('.row-one');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                            subjectMonthsArray[0].forEach((months, i) => {
                                const div = node.querySelector(`#${months}-${rowNum}`)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                if (i === 0) {                                  
                                    div.innerText = instanceInfo[0].classID
                                }
                                if (i === 1) {
                                    if (instanceInfo[0].assigned === true) {
                                        div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                        
                                    } else {
                                        div.innerText = `${instanceInfo[0].teacher[0]}` 
                                    }
                                }
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                            })
                            
                        } else if (monthCheck[1] === 'falsefalsefalse') {
                            const rowNum = 2
                            const rowOne = node.querySelectorAll('.row-two');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                            subjectMonthsArray[0].forEach((months, i) => {
                                //console.log('months array', months)
                                const div = node.querySelector(`#${months}-${rowNum}`)
                                //console.log('index inner2', index)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                                if (i === 0) {                                  
                                    div.innerText = instanceInfo[0].classID
                                }
                                if (i === 1) {
                                    if (instanceInfo[0].assigned === true) {
                                        div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                        
                                    } else {
                                        div.innerText = `${instanceInfo[0].teacher[0]}` 
                                    }
                                }
                            })
                            
                        } else if (monthCheck[2] === 'falsefalsefalse') {
                            const rowNum = 3
                            const rowOne = node.querySelectorAll('.row-three');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                            subjectMonthsArray[0].forEach((months, i) => {
                                //console.log('months array', months)
                                //console.log('index inner3', index)
                                
                                const div = node.querySelector(`#${months}-${rowNum}`)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                                if (i === 0) {                                  
                                    div.innerText = instanceInfo[0].classID
                                }
                                if (i === 1) {
                                    if (instanceInfo[0].assigned === true) {
                                        div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                        
                                    } else {
                                        div.innerText = `${instanceInfo[0].teacher[0]}` 
                                    }
                                }
                            })
                            
                        }
            
                        if (subjectMonthsArray.toString() === 'nov,dec') {
                            if (monthCheck[0] === 'falsefalse') {
                                const rowNum = 1
                                const rowOne = node.querySelectorAll('.row-one');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                subjectMonthsArray[0].forEach((months, i) => {
                                    //console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.dataset.id = instanceInfo[0].classID;
                                    div.dataset.weightAmount = totalWeightAmount;
                                    div.style.backgroundColor = subjectColours[index];
                                    //div.style.boxShadow = bevel;
                                    div.classList.add('has-class');
                                    div.dataset.hasclass = "true";
                                    if (i === 0) {                                  
                                        div.innerText = instanceInfo[0].classID
                                    }
                                    if (i === 1) {
                                        if (instanceInfo[0].assigned === true) {
                                            div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                            
                                        } else {
                                            div.innerText = `${instanceInfo[0].teacher[0]}` 
                                        }
                                    }
                                })
                            }
                            else if (monthCheck[1] === 'falsefalse') {
                                const rowNum = 2
                                const rowOne = node.querySelectorAll('.row-two');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                subjectMonthsArray[0].forEach((months, i) => {
                                    //console.log('months array', months)
            
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.dataset.id = instanceInfo[0].classID;
                                    div.dataset.weightAmount = totalWeightAmount;
                                    div.style.backgroundColor = subjectColours[index];
                                    //div.style.boxShadow = bevel;
                                    div.classList.add('has-class');
                                    div.dataset.hasclass = "true";
                                    if (i === 0) {                                  
                                        div.innerText = instanceInfo[0].classID
                                    }
                                    if (i === 1) {
                                        if (instanceInfo[0].assigned === true) {
                                            div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                            
                                        } else {
                                            div.innerText = `${instanceInfo[0].teacher[0]}` 
                                        }
                                    }
                                })
                            } else if (monthCheck[2] === 'falsefalse') {
                                const rowNum = 3
                                const rowOne = node.querySelectorAll('.row-three');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                subjectMonthsArray[0].forEach((months, i) => {
                                    //console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.dataset.id = instanceInfo[0].classID;
                                    div.dataset.weightAmount = totalWeightAmount;
                                    div.style.backgroundColor = subjectColours[index];
                                    //div.style.boxShadow = bevel;
                                    div.classList.add('has-class');
                                    div.dataset.hasclass = "true";
                                    if (i === 0) {                                  
                                        div.innerText = instanceInfo[0].classID
                                    }
                                    if (i === 1) {
                                        if (instanceInfo[0].assigned === true) {
                                            div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                            
                                        } else {
                                            div.innerText = `${instanceInfo[0].teacher[0]}` 
                                        }
                                    }
                                })
                            }
                        }
            
                        if (subjectMonthsArray.toString() === 'dec') {
                            if (monthCheck[0] === 'false') {
                                const rowNum = 1
                                const rowOne = node.querySelectorAll('.row-one');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                const div = node.querySelector(`#dec-${rowNum}`)
                                div.setAttribute("data-id", instanceInfo[0].classID)
                                div.dataset.weightAmount = totalWeightAmount;
                                //div.dataset.id = item.id;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";                                 
                                div.innerText = instanceInfo[0].classID

                                
                            }
                            else if (monthCheck[1] === 'false') {
                                const rowNum = 2
                                const rowOne = node.querySelectorAll('.row-two');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                const div = node.querySelector(`#dec-${rowNum}`)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                                div.innerText = instanceInfo[0].classID
                            } else if (monthCheck[2] === 'false') {
                                const rowNum = 3
                                const rowOne = node.querySelectorAll('.row-three');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                const div = node.querySelector(`#dec-${rowNum}`)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                                div.innerText = instanceInfo[0].classID
                            }
                }
            }) */
            //this.calculateWeights(node);
            this.setState({reDraw: false}) 
        //this.calculateWeights();
        
    }

    colourThreeMonthsUpdate = async() => {
        const { schedule, subjectColours, weights, studentCountWeight, weightHolder,selectedUserID,} = this.state;
        //const node = this.state.node === '' ? ReactDOM.findDOMNode(this) : this.state.node;
        const node = ReactDOM.findDOMNode(this);
        const subjectDropDown = document.querySelector('#subjects-row-picker-dropdown');
        const subjectID = subjectDropDown[subjectDropDown.selectedIndex].dataset.subjectId;
        this.setState({node: node})
        let bevel = 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
        const scheduleObj = []
        let classArray = []
        let scheduleArray=[]
        const topRows = node.querySelectorAll('.assign-schedule-grid-row');
        const hideRows = node.querySelectorAll('.three-row');
        topRows.forEach(item => {
            item.childNodes.forEach((i) => {
                i.style.height = '10px';
                i.style.backgroundColor = '';
                i.style.boxShadow = '';
                i.removeAttribute("data-id");
                i.classList.remove('has-class');
                i.dataset.hasclass = "false";
                i.innerText = ''
                
            })
        })

        await firestore.collection('classes/y2020/classes').where("subjectCode", '==', subjectID).get().then(snapShot => {              
                snapShot.forEach(snap => {
                    classArray.push(snap.data());
                })
                
            })
   
        classArray.forEach((item, index) => {

            const instanceInfo = classArray.filter(el => el.classID === item.classID)

                let instanceWeightAmount = 0;
                let studentCountWeightAmount = 0;
                let totalWeightAmount = 0;
                const studentCountWeightArray = studentCountWeight;
                let studentCountMet = false;
                studentCountWeightArray.sort((a, b) => a[2] - b[2])

                weights.forEach(el => {
                    if (instanceInfo[0].instanceType === el[0].toString()) {
                        instanceWeightAmount = el[1];
                    }
                })

                studentCountWeightArray.forEach((el, index) => {
                    if (instanceInfo[0].studentCount < el[2] && studentCountMet === false) {
                        studentCountWeightAmount = el[1];
                        studentCountMet = true;
                    }

                    if (instanceInfo[0].studentCount >= studentCountWeightArray[studentCountWeightArray.length - 1][2]
                        && studentCountMet === false) {
                            studentCountWeightAmount = studentCountWeightArray[studentCountWeightArray.length - 1][1];
                            studentCountMet = true;
                        }

                })
            
            totalWeightAmount = instanceWeightAmount[0] + studentCountWeightAmount[0]
            let subjectMonthsArray = []//instanceInfo[0].months.split(",", 3);
            if (instanceInfo[0].months.startsWith("dec")) {
                subjectMonthsArray.push(instanceInfo[0].months.split(",", 1))
            } else if (instanceInfo[0].months.startsWith("nov")) {
                subjectMonthsArray.push(instanceInfo[0].months.split(",", 2))
            } else {
                subjectMonthsArray.push(instanceInfo[0].months.split(",", 3))
            }
            let monthCheck = ['', '', ''];
            
            subjectMonthsArray.forEach((el) => {
                el.forEach((month, index) => {
                                
                    let currentMonth = node.querySelector(`#${month}`)
                    let currentMonthChildren = currentMonth.childNodes;
                    currentMonthChildren.forEach((child, index) => {
                        let arrayStore = monthCheck[index];
                        arrayStore += child.dataset.hasclass;
                        monthCheck[index] = arrayStore;
                        
                    }) 
                            })
            
                        })      
            
                        if (monthCheck[0] === 'falsefalsefalse'){
                            const rowNum = 1
                            const rowOne = node.querySelectorAll('.row-one');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                            subjectMonthsArray[0].forEach((months, i) => {
                                const div = node.querySelector(`#${months}-${rowNum}`)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                if (i === 0) {                                  
                                    div.innerText = instanceInfo[0].classID
                                }
                                if (i === 1) {
                                    if (instanceInfo[0].assigned === true) {
                                        div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                        
                                    } else {
                                        div.innerText = `${instanceInfo[0].teacher[0]}` 
                                    }
                                }
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                            })
                            
                        } else if (monthCheck[1] === 'falsefalsefalse') {
                            const rowNum = 2
                            const rowOne = node.querySelectorAll('.row-two');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                            subjectMonthsArray[0].forEach((months, i) => {
                                //console.log('months array', months)
                                const div = node.querySelector(`#${months}-${rowNum}`)
                                //console.log('index inner2', index)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                                if (i === 0) {                                  
                                    div.innerText = instanceInfo[0].classID
                                }
                                if (i === 1) {
                                    if (instanceInfo[0].assigned === true) {
                                        div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                        
                                    } else {
                                        div.innerText = `${instanceInfo[0].teacher[0]}` 
                                    }
                                }
                            })
                            
                        } else if (monthCheck[2] === 'falsefalsefalse') {
                            const rowNum = 3
                            const rowOne = node.querySelectorAll('.row-three');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                            subjectMonthsArray[0].forEach((months, i) => {
                                //console.log('months array', months)
                                //console.log('index inner3', index)
                                
                                const div = node.querySelector(`#${months}-${rowNum}`)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                                if (i === 0) {                                  
                                    div.innerText = instanceInfo[0].classID
                                }
                                if (i === 1) {
                                    if (instanceInfo[0].assigned === true) {
                                        div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                        
                                    } else {
                                        div.innerText = `${instanceInfo[0].teacher[0]}` 
                                    }
                                }
                            })
                            
                        }
            
                        if (subjectMonthsArray.toString() === 'nov,dec') {
                            if (monthCheck[0] === 'falsefalse') {
                                const rowNum = 1
                                const rowOne = node.querySelectorAll('.row-one');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                subjectMonthsArray[0].forEach((months, i) => {
                                    //console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.dataset.id = instanceInfo[0].classID;
                                    div.dataset.weightAmount = totalWeightAmount;
                                    div.style.backgroundColor = subjectColours[index];
                                    //div.style.boxShadow = bevel;
                                    div.classList.add('has-class');
                                    div.dataset.hasclass = "true";
                                    if (i === 0) {                                  
                                        div.innerText = instanceInfo[0].classID
                                    }
                                    if (i === 1) {
                                        if (instanceInfo[0].assigned === true) {
                                            div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                            
                                        } else {
                                            div.innerText = `${instanceInfo[0].teacher[0]}` 
                                        }
                                    }
                                })
                            }
                            else if (monthCheck[1] === 'falsefalse') {
                                const rowNum = 2
                                const rowOne = node.querySelectorAll('.row-two');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                subjectMonthsArray[0].forEach((months, i) => {
                                    //console.log('months array', months)
            
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.dataset.id = instanceInfo[0].classID;
                                    div.dataset.weightAmount = totalWeightAmount;
                                    div.style.backgroundColor = subjectColours[index];
                                    //div.style.boxShadow = bevel;
                                    div.classList.add('has-class');
                                    div.dataset.hasclass = "true";
                                    if (i === 0) {                                  
                                        div.innerText = instanceInfo[0].classID
                                    }
                                    if (i === 1) {
                                        if (instanceInfo[0].assigned === true) {
                                            div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                            
                                        } else {
                                            div.innerText = `${instanceInfo[0].teacher[0]}` 
                                        }
                                    }
                                })
                            } else if (monthCheck[2] === 'falsefalse') {
                                const rowNum = 3
                                const rowOne = node.querySelectorAll('.row-three');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                subjectMonthsArray[0].forEach((months, i) => {
                                    //console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.dataset.id = instanceInfo[0].classID;
                                    div.dataset.weightAmount = totalWeightAmount;
                                    div.style.backgroundColor = subjectColours[index];
                                    //div.style.boxShadow = bevel;
                                    div.classList.add('has-class');
                                    div.dataset.hasclass = "true";
                                    if (i === 0) {                                  
                                        div.innerText = instanceInfo[0].classID
                                    }
                                    if (i === 1) {
                                        if (instanceInfo[0].assigned === true) {
                                            div.innerText = `${instanceInfo[0].teacher[0]} ${instanceInfo[0].teacher[1]}`
                                            
                                        } else {
                                            div.innerText = `${instanceInfo[0].teacher[0]}` 
                                        }
                                    }
                                })
                            }
                        }
            
                        if (subjectMonthsArray.toString() === 'dec') {
                            if (monthCheck[0] === 'false') {
                                const rowNum = 1
                                const rowOne = node.querySelectorAll('.row-one');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                const div = node.querySelector(`#dec-${rowNum}`)
                                div.setAttribute("data-id", instanceInfo[0].classID)
                                div.dataset.weightAmount = totalWeightAmount;
                                //div.dataset.id = item.id;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";                                 
                                div.innerText = instanceInfo[0].classID

                                
                            }
                            else if (monthCheck[1] === 'false') {
                                const rowNum = 2
                                const rowOne = node.querySelectorAll('.row-two');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                const div = node.querySelector(`#dec-${rowNum}`)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                                div.innerText = instanceInfo[0].classID
                            } else if (monthCheck[2] === 'false') {
                                const rowNum = 3
                                const rowOne = node.querySelectorAll('.row-three');
                            rowOne.forEach(el => {
                                el.style.height = '20px';
                            })
                                const div = node.querySelector(`#dec-${rowNum}`)
                                div.dataset.id = instanceInfo[0].classID;
                                div.dataset.weightAmount = totalWeightAmount;
                                div.style.backgroundColor = subjectColours[index];
                                //div.style.boxShadow = bevel;
                                div.classList.add('has-class');
                                div.dataset.hasclass = "true";
                                div.innerText = instanceInfo[0].classID
                            }
                }
            })
            //this.calculateWeights(node);
            this.setState({reDraw: false}) 
        //this.calculateWeights();
        
    }

    colourOneMonthTwo() {
        const { schedule, subjectColours} = this.state;
        const node = ReactDOM.findDOMNode(this);
        let bevel = 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
        const scheduleObj = []
        console.log('node',node)
        const topRows = node.querySelectorAll('.grid-row');
        const hideRows = node.querySelectorAll(".three-row");
        topRows.forEach(item => {
            item.firstElementChild.style.height = '100%'
            item.firstElementChild.style.backgroundColor = '';
            item.firstElementChild.removeAttribute("data-id");
        })
        hideRows.forEach(item => {
            item.style.display = 'none'
            item.style.backgroundColor = ''
            item.removeAttribute("data-id");
        })

        schedule.forEach((item, index) => {
            if (index === 0) {
                scheduleObj.push(item)
                
            }
            
        })

        console.log('schedule obj', scheduleObj)

        scheduleObj.forEach((item , index) => {
            let subjectMonthsArray = item.months.split(",");
            let monthCheck = ['', '', ''];
            let currentMonthDataset = node.querySelector(`#${subjectMonthsArray[0]}`).firstElementChild.dataset.hasclass   

            if (currentMonthDataset === 'false') {
                const rowNum = 1
                const div = node.querySelector(`#${subjectMonthsArray[0]}-${rowNum}`)
                div.dataset.id = item.id;
                div.style.backgroundColor = subjectColours[index];
                div.style.boxShadow = bevel;
                div.dataset.hasclass = "true";
                
            } else if (currentMonthDataset === 'false') {
                const rowNum = 2
                const div = node.querySelector(`#${subjectMonthsArray[0]}-${rowNum}`)
                //console.log('index inner2', index)
                div.dataset.id = item.id;
                div.style.backgroundColor = subjectColours[index];
                div.style.boxShadow = bevel;
                div.dataset.hasclass = "true";
                
            } else if (currentMonthDataset === 'false') {
                const rowNum = 3
                const div = node.querySelector(`#${subjectMonthsArray[0]}-${rowNum}`)
                div.dataset.id = item.id;
                div.style.backgroundColor = subjectColours[index];
                div.style.boxShadow = bevel;
                div.dataset.hasclass = "true";
                
            }

            if (subjectMonthsArray[0] === 'nov') {
                if (currentMonthDataset === 'false') {
                    const rowNum = 1
                    const div = node.querySelector(`#${subjectMonthsArray[0]}-${rowNum}`)
                    div.dataset.id = item.id;
                    div.style.backgroundColor = subjectColours[index];
                    div.style.boxShadow = bevel;
                    div.dataset.hasclass = "true";
                }
                else if (currentMonthDataset === 'false') {
                    const rowNum = 2
                    const div = node.querySelector(`#${subjectMonthsArray[0]}-${rowNum}`)
                    div.dataset.id = item.id;
                    div.style.backgroundColor = subjectColours[index];
                    div.style.boxShadow = bevel;
                    div.dataset.hasclass = "true";
                } else if (currentMonthDataset === 'false') {
                    const rowNum = 3
                    const div = node.querySelector(`#${subjectMonthsArray[0]}-${rowNum}`)
                    div.dataset.id = item.id;
                    div.style.backgroundColor = subjectColours[index];
                    div.style.boxShadow = bevel;
                    div.dataset.hasclass = "true";
                }
            }

            if (subjectMonthsArray[0] === 'dec') {
                if (currentMonthDataset === 'false') {
                    const rowNum = 1
                    const div = node.querySelector(`#${subjectMonthsArray[0]}-${rowNum}`)
                    div.dataset.id = item.id;
                    div.style.backgroundColor = subjectColours[index];
                    div.style.boxShadow = bevel;
                    div.dataset.hasclass = "true";
                    
                }
                else if (currentMonthDataset === 'false') {
                    const rowNum = 2
                    const div = node.querySelector(`#${subjectMonthsArray[0]}-${rowNum}`)
                    div.dataset.id = item.id;
                    div.style.backgroundColor = subjectColours[index];
                    div.style.boxShadow = bevel;
                    div.dataset.hasclass = "true";
                } else if (currentMonthDataset === 'false') {
                    const rowNum = 3
                    const div = node.querySelector(`#${subjectMonthsArray[0]}-${rowNum}`)
                    div.dataset.id = item.id;
                    div.style.backgroundColor = subjectColours[index];
                    div.style.boxShadow = bevel;
                    div.dataset.hasclass = "true";
                }
            }
        })

        
    }

    colourOneMonth() {
        const { schedule } = this.state;
        const node = ReactDOM.findDOMNode(this);
        for (let key in schedule) {
            if (schedule.hasOwnProperty(key)) {
                let subjectMonthsArray = schedule[key].months.split(",");
                console.log('subjectarray', subjectMonthsArray.toString())
                let monthCheck = ['', '', ''];
                subjectMonthsArray.forEach((month, index) => {
                    let currentMonth = node.querySelector(`#${month}`)
                    let currentMonthChildren = currentMonth.childNodes;
                    currentMonthChildren.forEach((child, index) => {
                        let arrayStore = monthCheck[index];
                        arrayStore = child.dataset.hasclass;
                        monthCheck[index] = arrayStore;
                        
                    })

                        if (monthCheck[0] === 'false') {
                            const rowNum = 1
                            subjectMonthsArray.forEach(months => {
                                console.log('months array', months)
                                const div = node.querySelector(`#${months}-${rowNum}`)
                                div.style.backgroundColor = schedule[key].colour;
                                div.style.boxShadow = schedule[key].bevel;
                                div.dataset.hasclass = "true";
                            })
                        }

                        if (subjectMonthsArray.toString() === 'nov,dec') {
                            //if (monthCheck[0] === 'false') {
                                const rowNum = 1
                                subjectMonthsArray.forEach(months => {
                                    //console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.style.backgroundColor = schedule[key].colour;
                                    div.style.boxShadow = schedule[key].bevel;
                                    div.dataset.hasclass = "true";
                                })
                            
                        }

                        if (subjectMonthsArray.toString() === 'dec') {
                            //if (monthCheck[0] === 'false') {
                                const rowNum = 1
                                subjectMonthsArray.forEach(months => {
                                    console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.style.backgroundColor = schedule[key].colour;
                                    div.style.boxShadow = schedule[key].bevel;
                                    div.dataset.hasclass = "true";
                                })
                            
                        }
                    

                })
            }
        }
    }

    hoverTrue = () => { this.setState({ hover: !this.state.hover }) }
    
    renderHoverDiv = (top, left, divid) => {
        //console.log(top, left)
        
        const styleValues = {
            position: 'fixed',
            top: top + 20,
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
                subjectcode: 'XXXX',
                subjectid: divid
            
        }})
        //const divStore = [];
        //divStore.push(<div key={1} style={{ styleValues }}>This is added div! uniqueID:</div>);
        this.setState({ styleValues: styleValues })
        console.log(this.state.styleValues)
        return (
            this.state.hoverDiv
        )
    }

    onClicked = (event) => {
        const node = ReactDOM.findDOMNode(this);
        const clickedDivs = node.querySelectorAll(".clicked");
        clickedDivs.forEach(div => {
            div.classList.remove("clicked")
        })
        const positions = event.target.getBoundingClientRect();
        const hoveredDiv = event.target.dataset.id
        const dataSet = node.querySelectorAll(`[data-id]`);
        if (hoveredDiv) {
            dataSet.forEach(div => {
                if (div.dataset.id === hoveredDiv) {
                    div.classList.add("clicked")
                }
            })
            this.renderHoverDiv(positions.top, positions.left, hoveredDiv);
            this.setState({hover: true})
            
        }
    }

    onHover = (event) => {
        this.setState({ styleStore: event.target.style.boxShadow })
        const node = ReactDOM.findDOMNode(this);
        const positions = event.target.getBoundingClientRect();
        const hoveredDiv = event.target.dataset.id
        const dataSet = node.querySelectorAll(`[data-id]`);
        if (hoveredDiv) {
            dataSet.forEach(div => {
                if (div.dataset.id === hoveredDiv) {
                    div.classList.add('hovered')
                }
            })
            this.renderHoverDiv(positions.top, positions.left, hoveredDiv);
            this.setState({hover: true})
            
        }

    }

    onOut = (event) => {
        //event.target.style.boxShadow = this.state.styleStore;
        const node = ReactDOM.findDOMNode(this);
        //console.log('EVENT', event.target.dataset.id)
        const hoveredDiv = event.target.dataset.id
        const dataSet = node.querySelectorAll(`[data-id]`);
        //console.log(dataSet)
        //console.log('hover', hoveredDiv)
        dataSet.forEach(div => {
            //console.log(div)
            if (div.dataset.id === hoveredDiv) {
                //console.log(div)
                div.classList.remove('hovered')
                //div.style.boxShadow = this.state.styleStore
            }
            //div.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0.5px 2px inset'
                //, rgba(255, 255, 255, 0.4) 0px 0px 0px inset';
        })
        //this.setState({ hoverDiv: "" })
        this.setState({hover: false})
        //this.renderHoverDiv();
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

    changeDisplayRows = () => {
        const { displaySwitcher } = this.state;
        if (displaySwitcher === 'one-row') {
            this.setState({ displaySwitcher: "three-row" })
            this.colourThreeMonths()
        } else {
            this.setState({ displaySwitcher: "one-row" })
            this.colourOneMonthTwo();
        }
    }

    onDropDownChange = async(event) => {
        const dropDown = document.querySelector('#subjects-row-picker-dropdown');
        //const classDropDown = document.querySelector('#subjects-row-class-picker-dropdown');
        let dropDownValue = dropDown.value;
        const subjectID = event.target.options[event.target.selectedIndex].dataset.subjectId;
        this.setState({
            subjectID: subjectID,
            subjectName: dropDownValue
        }, () => {
            this.colourThreeMonthsUpdate();           
        })


    }

    
    render() {
        const { subjectName, displaySwitcher, displayswitcherRun,reDraw } = this.state;
        const { teacher, hoverSubjectName, students, subjectcode, subjectid } = this.state.hoverInfo;

        if (reDraw) {
            this.colourThreeMonths();
            this.setState({reDraw: false})
        }

/*         if (displayswitcherRun) {
            this.changeDisplayRows()
            this.setState({displayswitcherRun: false})
        } */
        
        
        return (
            <div>
            <div style={{position: "relative"}}>
                {this.state.hover ? <div style={this.state.styleValues}>
                    <div> Teacher: {teacher} </div>
                    <div> class: {hoverSubjectName} </div>
                    <div> students: {students} </div>
                    <div> subjectcode: {subjectcode} </div>
                    <div> subjectcode: {subjectid} </div>
                </div> : null}
            </div>
                
                <select name='subjects' id='subjects-row-picker-dropdown' onChange={this.onDropDownChange} ></select>
                {/* <select name='subjects' id='subjects-row-class-picker-dropdown'></select> */}
                <div data-class-id={this.props.classID} className="grid-holder" >
                

                {/* <div id="" className="wheather-grid-item-date" data-name="row1-date">{subjectName}</div> */}
                
                <div id="jan" className="assign-schedule-grid-row" data-name="row-jan">
                    <div id='jan-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jan-2' className='assign-schedule-grid-inner three-row row-two'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jan-3' className='assign-schedule-grid-inner three-row row-three'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>
                <div id="feb" className="assign-schedule-grid-row" data-name="row-feb">
                    <div id='feb-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='feb-2' className='assign-schedule-grid-inner three-row row-two'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='feb-3' className='assign-schedule-grid-inner three-row row-three'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="mar" className="assign-schedule-grid-row" data-name="row-mar">
                    <div id='mar-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='mar-2' className='assign-schedule-grid-inner three-row row-two'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='mar-3' className='assign-schedule-grid-inner three-row row-three'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="apr" className="assign-schedule-grid-row" data-name="row-apr">
                    <div id='apr-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='apr-2' className='assign-schedule-grid-inner three-row row-two'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='apr-3' className='assign-schedule-grid-inner three-row row-three'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="may" className="assign-schedule-grid-row" data-name="row-may">
                    <div id='may-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='may-2' className='assign-schedule-grid-inner three-row row-two'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='may-3' className='assign-schedule-grid-inner three-row row-three'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="jun" className="assign-schedule-grid-row" data-name="row-june">
                    <div id='jun-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jun-2' className='assign-schedule-grid-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jun-3' className='assign-schedule-grid-inner three-row row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="jul" className="assign-schedule-grid-row " data-name="row-july">
                    <div id='jul-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jul-2' className='assign-schedule-grid-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jul-3' className='assign-schedule-grid-inner three-row row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="aug" className="assign-schedule-grid-row " data-name="row-aug">
                    <div id='aug-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked}  onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='aug-2' className='assign-schedule-grid-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked}  onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='aug-3' className='assign-schedule-grid-inner three-row row-three' 
                        data-hasclass='false' onClick={this.onClicked}  onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>
                <div id="sep" className="assign-schedule-grid-row " data-name="row-sep">
                    <div id='sep-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='sep-2' className='assign-schedule-grid-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='sep-3' className='assign-schedule-grid-inner three-row row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="oct" className="assign-schedule-grid-row" data-name="row-oct">
                    <div id='oct-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='oct-2' className='assign-schedule-grid-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='oct-3' className='assign-schedule-grid-inner three-row row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="nov" className="assign-schedule-grid-row" data-name="row-nov">
                    <div id='nov-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='nov-2' className='assign-schedule-grid-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='nov-3' className='assign-schedule-grid-inner three-row row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="dec" className="assign-schedule-grid-row" data-name="row-dec">
                    <div id='dec-1' className='assign-schedule-grid-inner row-one'
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='dec-2' className='assign-schedule-grid-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='dec-3' className='assign-schedule-grid-inner three-row row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>
                </div>
                {/* <CustomButton onClick={this.changeDisplayRows} /> */}
            </div>
        )
    }
}

export default ScheduleInstanceAssignPicker;