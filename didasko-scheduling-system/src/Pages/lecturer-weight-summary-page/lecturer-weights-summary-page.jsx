import React, { Component } from 'react';
import { firestore } from '../../firebase/firebase.utils'
import ReportsSubjectRow from '../../components/reports-subject-row-component/reports-subject-row-component'
import LecturerWeightSummaryRow from '../../components/lecturer-weight-summary/lecturer-weight-summary-row-component.jsx'
import TotalMonthlyInstanceCount from '../../components/total-monthly-instance-count/total-monthly-instance-count-row-component.jsx'

import './lecturer-weights-summary-page';
import TotalMonthlyInstanceCountRow from '../../components/total-monthly-instance-count/total-monthly-instance-count-row-component.jsx';

class LecturerWeightSummary extends Component {
    constructor(props) {
        super(props);
        this.drawWeightSummary = this.drawWeightSummary.bind(this);

        this.state = {
            loadingData: true,
            weightList: [],
            lecturerList: [],
            instanceCountList:[]

        }


    }

    componentDidMount() {
        let weightListArray = []
        let lecturerListArray = []
        firestore.collection('user').get().then((querySnapshot) => {
            querySnapshot.forEach(snap => {
                console.log("snap shot", snap.data())
                lecturerListArray.push(snap.data())

            })
            lecturerListArray.sort((a, b) => {
                if (a.displayName === b.displayName) {
                    //console.log("0", a, b);
                    return 0
                } else {
                    //console.log("other", a, b);
                    return (a.displayName > b.displayName) ? 1 : -1
                }
            })

            lecturerListArray.forEach((item, index) => {
                weightListArray.push(<LecturerWeightSummaryRow key={index} weights={item.weights} lecturerName={item.displayName} email={item.email} />)
            })

            this.setState({
                weightList: weightListArray,
                loadingData: false
            })

            /* classListArray = Object.keys(querySnapshot.data()).map((key) => {
                //console.log(Object.keys(querySnapshot.data()[key]).length)
                const currentSubjectObjLength = Object.keys(querySnapshot.data()[key]).length;
                const currentSubjectArray = [];
                const tempClassArray = []
                const tempQuery = querySnapshot.data();
                for (let i = 0; i < currentSubjectObjLength; i++){
                    tempClassArray.push([[key],
                        [Object.values(querySnapshot.data()[key])[i].teacher],
                        [Object.values(querySnapshot.data()[key])[i].classID],
                        [Object.values(querySnapshot.data()[key])[i].months],
                        [Object.values(querySnapshot.data()[key])[i].title]])
                }
                currentSubjectArray.push(tempClassArray)
                return currentSubjectArray
            })
            this.setState({ classList: classListArray })
            console.log("state",this.state)
            console.log("classArracy",classListArray) */
            //console.log('classlistarray', classListArray)

            /* Object.values(topDoc.data()).map((secondDoc) => {
                const subjectID = topDoc;
                Object.values(secondDoc).map((d) => {
                    console.log("doc", subjectID)
                    classListArray.push([['doc.subject'], [d.teacher], [d.classID], [d.months]]);
                }) */
                // doc.data() is never undefined for query doc snapshots
                //classListArray.push([[doc.subject], [doc.data().teacher], [doc.id], [doc.data().months]]);
                //console.log("Console",doc.id, " => ", doc.data().subject);
        }).then(
                
            /* firestore.collection('subjects').doc('subjectList').get().then((querySnapshot) => {
                //console.log(querySnapshot.data())
                subjectListArray = Object.keys(querySnapshot.data()).map((key) => {
                    //console.log(key)
                    return [[querySnapshot.data()[key].title],[querySnapshot.data()[key].code]]
                })
                //console.log("unsort subjectlist", subjectListArray);
                subjectListArray.sort((a, b) => {
                    if (a[0] === b[0]) {
                        //console.log("0", a, b);
                        return 0
                    } else {
                        //console.log("other", a, b);
                        return (a[0] > b[0]) ? 1 : -1
                    }
                })
                this.setState({subjectList: subjectListArray})
                //console.log("sort subjectlist", subjectListArray);
                //console.log("Console");
                this.setState({ loadingData: false })
        
            }) */
            )
        //this.setState({ classList: classListArray })
        //console.log("state",this.state)
            //console.log("unsort", classListArray);
/*             classListArray.sort((a, b) => {
                //console.log("0", a, b);
                if (a[0] === b[0]) {
                    //console.log("0", a, b);
                    return 0
                } else {
                    //console.log("other", a, b);
                    return (a[0] > b[0]) ? 1 : -1
                }
            }) */
            //console.log("sort", classListArray);
            //console.log("state", this.state.classList);
        

    }

    /* drawMonthlyInstanceCount = () => {
        const { instanceCountList} = this.state

        instanceCountList.forEach((item, index) => {
            weightListArray.push(<LecturerWeightSummaryRow key={index} weights={item.weights} lecturerName={item.displayName} email={item.email} />)
        })

        return weightRow;
    } */

    drawWeightSummary =() => {
            
        const subjectListArray = this.state.subjectList;
        const subjectListArraySort = []
        const classListArray = this.state.classList;
        //let keyNum = 0;
        console.log('classlist', classListArray)
        const weightRow = this.state.weightList

        /* subjectListArray.forEach((item, index) => {
            //console.log('item', item)
            const currentClassArray = []
            classListArray.forEach((i, index) => {
                //console.log('list in', i[index][0][0][0].toString())
                if (i.length !== 0) {
                    if (i[0].length === 0) {
                
                    } else if (i[0][0][0][0].toString() === item[1].toString()) {
                        //console.log('list in',i[0][0], item[0][0])
                        console.log('list in', i[0][0][0][0].toString())
                        currentClassArray.push(classListArray[index].shift())
                    }
                }
                //console.log('list',item)
            })
            //console.log("currentClass", currentClassArray)
            subjectListArraySort.push(<ReportsSubjectRow key={index} subjectCode={item[1]} subjectTitle={item[0]} subjectClasses={currentClassArray} />)
            //console.log('subjectlist array sort', subjectListArraySort)
        }) */

        /* for (let key in subjectList) {
            subjectListArray.push(<ReportsSubjectRow key={keyNum} subjectCode={subjectList[key].code} subjectTitle={subjectList[key].title} />)
            keyNum += 1
        } */
        //console.log("array",subjectListArray)
        //console.log('subjectlist array sort', subjectListArraySort)
        return weightRow;

    }  

    /* subjectLoop = (subjectList) => {
        const subjectListArray = [];
        for (let key in subjectList) {
            subjectListArray.push(<div className="grid-holder" >
                <div id="" className="wheather-grid-item-date" data-name="row1-date">{subjectList[key].code}</div>
                <div id="" className="wheather-grid-item-date" data-name="row1-date">{subjectList[key].title}</div>
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
                </div>)
        }
        return subjectListArray;
    } */


    render() {
        const {loadingData} = this.state
        return (
            <div>
                <div className="report-container">
                    <div className="report-header">
                        <div className="report-header-item"></div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>F</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>S</span> </div>
                        <div className="report-header-item"><span>O</span> </div>
                        <div className="report-header-item"><span>N</span> </div>
                        <div className="report-header-item"><span>D</span> </div>
                    </div>
                    <div>
                    {loadingData ? <div>loading</div> : this.drawWeightSummary()}

                    </div>
                    <div className="report-header">
                        <div className="report-header-item"></div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>F</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>S</span> </div>
                        <div className="report-header-item"><span>O</span> </div>
                        <div className="report-header-item"><span>N</span> </div>
                        <div className="report-header-item"><span>D</span> </div>
                    </div>
                </div>

                <div className="report-container">
                    <div className="report-header">
                        <div className="report-header-item"></div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>F</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>S</span> </div>
                        <div className="report-header-item"><span>O</span> </div>
                        <div className="report-header-item"><span>N</span> </div>
                        <div className="report-header-item"><span>D</span> </div>
                    </div>
                    <div>
                    {loadingData ? <div>loading</div> : <TotalMonthlyInstanceCountRow/>}

                    </div>
                    <div className="report-header">
                        <div className="report-header-item"></div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>F</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>M</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>J</span> </div>
                        <div className="report-header-item"><span>A</span> </div>
                        <div className="report-header-item"><span>S</span> </div>
                        <div className="report-header-item"><span>O</span> </div>
                        <div className="report-header-item"><span>N</span> </div>
                        <div className="report-header-item"><span>D</span> </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LecturerWeightSummary;