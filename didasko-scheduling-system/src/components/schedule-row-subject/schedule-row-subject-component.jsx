import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import shallowCompare from 'react-addons-shallow-compare'; 

import './schedule-row-subject-style.scss';
import CustomButton from '../custom-button/custom-button.component'
import { firestore } from '../../firebase/firebase.utils';

class ScheduleRowSubject extends Component {
    constructor(props) {
        super(props);
        this.updateRowColour = this.updateRowColour.bind(this);
        //this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onOut = this.onOut.bind(this);
        this.colourOneMonthTwo = this.colourOneMonthTwo.bind(this);
        this.calculateWeights = this.calculateWeights.bind(this);

        this.state = {
            firstMonth: '',
            secondMonth: '',
            thridMonth: '',
            subjectName: this.props.subjectName,
            months: '',
            schedule: this.props.schedule,
            testClasses: {
                class1: {
                    months: "jan,feb,mar",
                    colour: '#ffff01',
                    bevel: 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
                },
                class2: {
                    months: "feb,mar,apr",
                    colour: '#ffd300'
                },
                class3: {
                    months: "mar,apr,may",
                    colour: '#ffdc98',
                    bevel: ''
                },
                class4: {
                    months: "apr,may,june",
                    colour: '#ff7400',
                    bevel: 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
                },
                class5: {
                    months: "may,june,july",
                    colour: '#ff999a',
                    bevel: 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
                },
                class6: {
                    months: "june,july,aug",
                    colour: '#cd0174',
                    bevel: ''
                },
                class7: {
                    months: "july,aug,sep",
                    colour: '#c69edd',
                    bevel: ''
                },
                class8: {
                    months: "aug,sep,oct",
                    colour: '#b1a1e0',
                    bevel: ''
                },
                class9: {
                    months: "sep,oct,nov",
                    colour: '#1241ab',
                    bevel: 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
                },
                class10: {
                    months: "oct,nov,dec",
                    colour: '#009899',
                    bevel: 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
                },
                class11: {
                    months: "nov,dec",
                    colour: '#99eb99',
                    bevel:''
                },
                class12: {
                    months: "dec",
                    colour: '#9fef02',
                    bevel: 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
                }
            },
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
            node: '',
            weights: [],
            studentCountWeights: [],
            weightHolder: {
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
                dec:0
            },
            selectedUserID: this.props.selectedUserID,
            subjectCode: this.props.subjectCode,
            selectedUserData: this.props.selectedUserData
            

            


        }
    }

  
    componentDidUpdate(prevProps,prevState) {
        if (JSON.stringify(this.props.schedule) !== JSON.stringify(prevState.schedule)) {
            this.setState({
                schedule: this.props.schedule,
                node: ReactDOM.findDOMNode(this),
                reDraw: true
            }) 
            //this.colourThreeMonths();
        }
            
    }
    
    
    componentDidMount = async() => {
        const { schedule, displaySwitcher, studentCountWeights, selectedUserData } = this.state;
        this.setState({
            //node: ReactDOM.findDOMNode(this),
            //reDraw: true
        })
        //this.colourThreeMonths()

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
        
        await this.colourThreeMonths();
        
    }

    

    colourThreeMonths = async() => {
        const { schedule, subjectColours, weights, studentCountWeight, weightHolder,selectedUserID, subjectCode,selectedUserData } = this.state;
        const node = this.state.node === '' ? ReactDOM.findDOMNode(this) : this.state.node;
        this.setState({node: node})
        let bevel = 'inset 2px 2px rgba(255, 255, 255, .4), inset 0px -2px 2px rgba(0, 0, 0, .4)'
        const scheduleObj = []
        let classArray = []
        let scheduleArray=[]
        const topRows = node.querySelectorAll('.schedule-grid-row');
        const hideRows = node.querySelectorAll('.three-row');
        topRows.forEach(item => {
            item.childNodes.forEach((i) => {
                i.style.height = '10px';
                i.style.backgroundColor = '';
                i.style.boxShadow = '';
                i.removeAttribute("data-id");
                i.dataset.hasclass = "false";
                
            })
        })

        await firestore.collection(`user/${selectedUserID}/schedules/y2020/subjects/${subjectCode}/instances`).get().then(snapShot => {
            snapShot.forEach(el => {
                scheduleArray.push(el.id)
            })
        })


        //console.log("CLASS GET", classArray)
        await firestore.collection('classes/y2020/classes').where("subjectCode", '==', subjectCode).get().then(snapShot => {              
                snapShot.forEach(snap => {
                    //classArray.push(snap.data())
                    classArray.push(snap.data());
                })
                
            })

        this.setState({
            subjectName: classArray[0].title
        })

        scheduleArray.forEach((item, index) => {
                const instanceInfo = classArray.filter(el => el.classID === item)
            if (instanceInfo.length === 0) {
                        
            } else {
                
                    
                let instanceWeightAmount = 0;
                let studentCountWeightAmount = 0;
                let totalWeightAmount = 0;
                const studentCountWeightArray = studentCountWeight;
                let studentCountMet = false;
                console.log("weightcount before sort", studentCountWeightArray)
                studentCountWeightArray.sort((a, b) => a[2] - b[2])
                console.log("weightcount after sort", studentCountWeightArray)

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

                console.log("WEight Amounts", instanceWeightAmount, studentCountWeightAmount)

                totalWeightAmount = instanceWeightAmount[0] + studentCountWeightAmount[0]
                let subjectMonthsArray
                if (instanceInfo[0].months === 'dec,jan,feb') {
                    subjectMonthsArray = instanceInfo[0].months.split(",", 1);
                } else if (instanceInfo[0].months === 'nov,dec,jan') {
                    subjectMonthsArray = instanceInfo[0].months.split(",", 2);
                } else {
                    subjectMonthsArray = instanceInfo[0].months.split(",", 3);
                }
                let monthCheck = ['', '', ''];
            
                subjectMonthsArray.forEach((month) => {
                    let currentMonth = node.querySelector(`#${month}`)
                    //let subjectColour = subjectColourSelection
                    let currentMonthChildren = currentMonth.childNodes;
                    currentMonthChildren.forEach((child, index) => {
                        let arrayStore = monthCheck[index];
                        arrayStore += child.dataset.hasclass;
                        monthCheck[index] = arrayStore;
                                
                    })
            
                })
            
                if (monthCheck[0] === 'falsefalsefalse') {
                    const rowNum = 1
                    const rowOne = node.querySelectorAll('.row-one');
                    rowOne.forEach(el => {
                        el.style.height = '20px';
                    })
                    subjectMonthsArray.forEach((months, i) => {
                        const div = node.querySelector(`#${months}-${rowNum}`)
                        div.dataset.id = instanceInfo[0].classID;
                        div.dataset.subjectCode = instanceInfo[0].subjectCode;
                        div.dataset.weightAmount = totalWeightAmount;
                        div.style.backgroundColor = subjectColours[index];
                        //div.style.boxShadow = bevel;
                        if (i === 0) {
                            div.innerText = instanceInfo[0].classID
                        }
                        if (i === 2) {
                            div.innerText = `${selectedUserData.firstName} ${selectedUserData.lastName}`
                        }
                        //div.style.height = "25px"
                        div.classList.add('has-class');
                        div.dataset.hasclass = "true";
                        //subjectColourSelection += 1;
                    })
                            
                } else if (monthCheck[1] === 'falsefalsefalse') {
                    const rowNum = 2
                    const rowOne = node.querySelectorAll('.row-two');
                    rowOne.forEach(el => {
                        el.style.height = '20px';
                    })
                    subjectMonthsArray.forEach((months, i) => {
                        //console.log('months array', months)
                        const div = node.querySelector(`#${months}-${rowNum}`)
                        //console.log('index inner2', index)
                        div.dataset.id = instanceInfo[0].classID;
                        div.dataset.subjectCode = instanceInfo[0].subjectCode;
                        div.dataset.weightAmount = totalWeightAmount;
                        div.style.backgroundColor = subjectColours[index];
                        //div.style.boxShadow = bevel;
                        div.classList.add('has-class');
                        div.dataset.hasclass = "true";
                        if (i === 0) {
                            div.innerText = instanceInfo[0].classID
                        }
                        if (i === 2) {
                            div.innerText = `${selectedUserData.firstName} ${selectedUserData.lastName}`
                        }
                    })
                            
                } else if (monthCheck[2] === 'falsefalsefalse') {
                    const rowNum = 3
                    const rowOne = node.querySelectorAll('.row-three');
                    rowOne.forEach(el => {
                        el.style.height = '20px';
                    })
                    subjectMonthsArray.forEach((months, i) => {
                        //console.log('months array', months)
                        //console.log('index inner3', index)
                                
                        const div = node.querySelector(`#${months}-${rowNum}`)
                        div.dataset.id = instanceInfo[0].classID;
                        div.dataset.subjectCode = instanceInfo[0].subjectCode;
                        div.dataset.weightAmount = totalWeightAmount;
                        div.style.backgroundColor = subjectColours[index];
                                
                        //div.style.boxShadow = bevel;
                        div.classList.add('has-class');
                        div.dataset.hasclass = "true";
                        if (i === 0) {
                            div.innerText = instanceInfo[0].classID
                        }
                        if (i === 2) {
                            div.innerText = `${selectedUserData.firstName} ${selectedUserData.lastName}`
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
                        subjectMonthsArray.forEach((months, i) => {
                                    
                                        
                            //console.log('months array', months)
                            const div = node.querySelector(`#${months}-${rowNum}`)
                            div.dataset.id = instanceInfo[0].classID;
                            div.dataset.subjectCode = instanceInfo[0].subjectCode;
                            div.dataset.weightAmount = totalWeightAmount;
                            div.style.backgroundColor = subjectColours[index];
                            //div.style.boxShadow = bevel;
                            div.classList.add('has-class');
                            div.dataset.hasclass = "true";
                            if (i === 0) {
                                div.innerText = instanceInfo[0].classID
                            }
                            if (i === 1) {
                                div.innerText = `${selectedUserData.firstName} ${selectedUserData.lastName}`
                            }
                                    
                        })
                    }
                    else if (monthCheck[1] === 'falsefalse') {
                        const rowNum = 2
                        const rowOne = node.querySelectorAll('.row-two');
                        rowOne.forEach(el => {
                            el.style.height = '20px';
                        })
                        subjectMonthsArray.forEach((months, i) => {
                                    
                                        
                            //console.log('months array', months)
                
                            const div = node.querySelector(`#${months}-${rowNum}`)
                            div.dataset.id = instanceInfo[0].classID;
                            div.dataset.subjectCode = instanceInfo[0].subjectCode;
                            div.dataset.weightAmount = totalWeightAmount;
                            div.style.backgroundColor = subjectColours[index];
                            //div.style.boxShadow = bevel;
                            div.classList.add('has-class');
                            div.dataset.hasclass = "true";
                            if (i === 0) {
                                div.innerText = instanceInfo[0].classID
                            }
                            if (i === 1) {
                                div.innerText = `${selectedUserData.firstName} ${selectedUserData.lastName}`
                            }
                                    
                        })
                    } else if (monthCheck[2] === 'falsefalse') {
                        const rowNum = 3
                        const rowOne = node.querySelectorAll('.row-three');
                        rowOne.forEach(el => {
                            el.style.height = '20px';
                        })
                        subjectMonthsArray.forEach((months, i) => {
                            //console.log('months array', months)
                            const div = node.querySelector(`#${months}-${rowNum}`)
                            div.dataset.id = instanceInfo[0].classID;
                            div.dataset.subjectCode = instanceInfo[0].subjectCode;
                            div.dataset.weightAmount = totalWeightAmount;
                            div.style.backgroundColor = subjectColours[index];
                            //div.style.boxShadow = bevel;
                            div.classList.add('has-class');
                            div.dataset.hasclass = "true";
                            if (i === 0) {
                                div.innerText = instanceInfo[0].classID
                            }
                            if (i === 2) {
                                div.innerText = `${selectedUserData.firstName} ${selectedUserData.lastName}`
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
                        div.dataset.subjectCode = instanceInfo[0].subjectCode;
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
                        div.dataset.subjectCode = instanceInfo[0].subjectCode;
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
                        div.dataset.subjectCode = instanceInfo[0].subjectCode;
                        div.dataset.weightAmount = totalWeightAmount;
                        div.style.backgroundColor = subjectColours[index];
                        //div.style.boxShadow = bevel;
                        div.classList.add('has-class');
                        div.dataset.hasclass = "true";
                        div.innerText = instanceInfo[0].classID
                    }
                }
                console.log("INSIDE THE LOOP 1")
            }
            })
            console.log("OUTSIDE THE LOOP 1")
            this.calculateWeights(node);
            this.setState({reDraw: false}) 
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
        //console.log('map', scheduleObj)


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
            /* subjectMonthsArray.forEach((month) => {
                let currentMonth = node.querySelector(`#${month}`)
                let currentMonthChildren = currentMonth.childNodes;
                currentMonthChildren.forEach((child, index) => {
                    if (index === 0) {
                        child.style.height= "100%"
                    }
                    
                }) 

            }) */      

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
                
            //console.log('colour count', subjectColourSelection)
        })
            //console.log('colour count', subjectColourSelection)
        
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

                        
                    
                        console.log('subject month', subjectMonthsArray)
                        console.log(monthCheck)
                

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
                            //}
                            /* else if (monthCheck[1] === 'false') {
                                const rowNum = 1
                                subjectMonthsArray.forEach(months => {
                                    console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.style.backgroundColor = schedule[key].colour;
                                    div.style.boxShadow = schedule[key].bevel;
                                    div.dataset.hasclass = "true";
                                })
                            } else if (monthCheck[2] === 'false') {
                                const rowNum = 1
                                subjectMonthsArray.forEach(months => {
                                    console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.style.backgroundColor = schedule[key].colour;
                                    div.style.boxShadow = schedule[key].bevel;
                                    div.dataset.hasclass = "true";
                                })
                            } */
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
                            //}
                            /* else if (monthCheck[1] === 'false') {
                                const rowNum = 1
                                subjectMonthsArray.forEach(months => {
                                    console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.style.backgroundColor = schedule[key].colour;
                                    div.style.boxShadow = schedule[key].bevel;
                                    div.dataset.hasclass = "true";
                                })
                            } else if (monthCheck[2] === 'false') {
                                const rowNum = 1
                                subjectMonthsArray.forEach(months => {
                                    console.log('months array', months)
                                    const div = node.querySelector(`#${months}-${rowNum}`)
                                    div.style.backgroundColor = schedule[key].colour;
                                    div.style.boxShadow = schedule[key].bevel;
                                    div.dataset.hasclass = "true";
                                })
                            } */
                        }
                    

                })
            }
        }
    }

    hoverTrue = () => { this.setState({ hover: !this.state.hover }) }
    
    renderHoverDiv = (top, left, divid) => {
        console.log(top, left)
        
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

    onHover = (event) => {
        this.setState({ styleStore: event.target.style.boxShadow })
        const node = ReactDOM.findDOMNode(this);
        const positions = event.target.getBoundingClientRect();
        const hoveredDiv = event.target.dataset.id
        const dataSet = node.querySelectorAll(`[data-id]`);
        if (hoveredDiv) {
            dataSet.forEach(div => {
                //console.log(div)
                if (div.dataset.id === hoveredDiv) {
                    //console.log(div)
                    div.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0.5px 2px inset'
                }
            })
            this.renderHoverDiv(positions.top, positions.left, hoveredDiv);
            this.setState({hover: true})
            //event.target.style.boxShadow = 'rgba(0, 0, 0, 0.4) 2px 2px inset, rgba(255, 255, 255, 0.4) 2px -2px 2px inset';
            
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
                div.style.boxShadow = this.state.styleStore
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

    calculateWeights = () => {
        //const { node } = this.state;
        const weightHolder = {
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
            dec:0
        };
        const node = ReactDOM.findDOMNode(this);
        const monthsDivs = node.querySelectorAll(".schedule-grid-row");
        monthsDivs.forEach((item, index) => {
            const childNodes = item.childNodes;
            childNodes.forEach((i, index) => {
                if (i.dataset.hasclass === 'true') {
                    //const num = parseFloat(i.dataset.weightAmount)
                    weightHolder[item.id] += parseFloat(i.dataset.weightAmount);
                }
            })
        })
        console.log("weight holder", weightHolder)
        this.props.sendWeights(weightHolder)
    }

    onClicked = (event) => {
        console.log("CLICK'")
        //const node = ReactDOM.findDOMNode(this);
        const clickedDivs = document.querySelectorAll('.scheduled-class-clicked');
        clickedDivs.forEach(div => {
            div.classList.remove("scheduled-class-clicked")
        })
        //const positions = event.target.getBoundingClientRect();
        const hoveredDiv = event.target.dataset.id
        const dataSet = document.querySelectorAll(`[data-id]`);
        if (hoveredDiv) {
            dataSet.forEach(div => {
                if (div.dataset.id === hoveredDiv) {
                    div.classList.add("scheduled-class-clicked")
                }
            })
            
        }
    }

    
    render() {
        const { subjectName, displaySwitcher, displayswitcherRun,reDraw, node } = this.state;
        const { teacher, hoverSubjectName, students, subjectcode, subjectid } = this.state.hoverInfo;

        if (reDraw) {
            this.colourThreeMonths();
        }
        
        
        return (
            <div className='schedule-row-subject'>
                <div style={{position: "relative"}}>
                {this.state.hover ? <div style={this.state.styleValues}>
                    <div> Teacher: {teacher} </div>
                    <div> class: {hoverSubjectName} </div>
                    <div> students: {students} </div>
                    <div> subjectcode: {subjectcode} </div>
                    <div> subjectcode: {subjectid} </div>
                    </div> : null}
                </div>  
                <div id="" className="wheather-grid-item-date" data-name="row1-date">{subjectName}</div>
            <div data-class-id={this.props.classID} className="schedule-grid-holder" >

                {/* <div id="" className="wheather-grid-item-date" data-name="row1-date">{subjectName}</div> */}
                
                <div id="jan" className="schedule-grid-row" data-name="row-jan">
                    <div id='jan-1' className='schedule-grid-subject-inner row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jan-2' className='schedule-grid-subject-inner three-row row-two' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jan-3' className='schedule-grid-subject-inner three-row row-three' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>
                <div id="feb" className="schedule-grid-row" data-name="row-feb">
                    <div id='feb-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='feb-2' className='schedule-grid-subject-inner three-row row-two' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='feb-3' className='schedule-grid-subject-inner three-row  row-three' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="mar" className="schedule-grid-row" data-name="row-mar">
                    <div id='mar-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='mar-2' className='schedule-grid-subject-inner three-row row-two' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='mar-3' className='schedule-grid-subject-inner three-row  row-three' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="apr" className="schedule-grid-row" data-name="row-apr">
                    <div id='apr-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='apr-2' className='schedule-grid-subject-inner three-row row-two' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='apr-3' className='schedule-grid-subject-inner three-row  row-three' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="may" className="schedule-grid-row" data-name="row-may">
                    <div id='may-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='may-2' className='schedule-grid-subject-inner three-row row-two' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='may-3' className='schedule-grid-subject-inner three-row  row-three' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="jun" className="schedule-grid-row" data-name="row-june">
                    <div id='jun-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jun-2' className='schedule-grid-subject-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jun-3' className='schedule-grid-subject-inner three-row  row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="jul" className="schedule-grid-row " data-name="row-july">
                    <div id='jul-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jul-2' className='schedule-grid-subject-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='jul-3' className='schedule-grid-subject-inner three-row  row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="aug" className="schedule-grid-row " data-name="row-aug">
                    <div id='aug-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='aug-2' className='schedule-grid-subject-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='aug-3' className='schedule-grid-subject-inner three-row  row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>
                <div id="sep" className="schedule-grid-row " data-name="row-sep">
                    <div id='sep-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='sep-2' className='schedule-grid-subject-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='sep-3' className='schedule-grid-subject-inner three-row  row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="oct" className="schedule-grid-row" data-name="row-oct">
                    <div id='oct-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='oct-2' className='schedule-grid-subject-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='oct-3' className='schedule-grid-subject-inner three-row  row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="nov" className="schedule-grid-row" data-name="row-nov">
                    <div id='nov-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='nov-2' className='schedule-grid-subject-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='nov-3' className='schedule-grid-subject-inner three-row  row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>                             
                <div id="dec" className="schedule-grid-row" data-name="row-dec">
                    <div id='dec-1' className='schedule-grid-subject-inner  row-one' data-hasclass='false'
                        onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='dec-2' className='schedule-grid-subject-inner three-row row-two' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                    <div id='dec-3' className='schedule-grid-subject-inner three-row  row-three' 
                        data-hasclass='false' onClick={this.onClicked} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>
                </div>
            </div>
                {/* <CustomButton onClick={this.changeDisplayRows} /> */ }
        </div>
        )
    }
}

export default ScheduleRowSubject;