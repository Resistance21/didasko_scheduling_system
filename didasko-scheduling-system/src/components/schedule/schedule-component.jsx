import React, { Component } from 'react';

import './schedule-style.scss';
import ScheduleRow from '../schedule-row/schedule-row-component';

class schedule extends Component {
    constructor(props) {
        super(props);

        this.state={
            month:""
        }
        
    }
    
    createRows() {

        let rows = [];

        for (let x = 0; x < 10; x++) {
            rows.push(<ScheduleRow key={x} className="schedule-row" months={["mar","apr","may"]}/>)
        }

        return rows
    }


    render() {
        
        return (
            <div>
                <div className="schedule-header">
                    <div class="schedule-header-item"></div>
                    <div class="schedule-header-item"><span>J</span> </div>
                    <div class="schedule-header-item"><span>F</span> </div>
                    <div class="schedule-header-item"><span>M</span> </div>
                    <div class="schedule-header-item"><span>A</span> </div>
                    <div class="schedule-header-item"><span>M</span> </div>
                    <div class="schedule-header-item"><span>J</span> </div>
                    <div class="schedule-header-item"><span>J</span> </div>
                    <div class="schedule-header-item"><span>A</span> </div>
                    <div class="schedule-header-item"><span>S</span> </div>
                    <div class="schedule-header-item"><span>O</span> </div>
                    <div class="schedule-header-item"><span>N</span> </div>
                    <div class="schedule-header-item"><span>D</span> </div>
                </div>
                
                {/* [{this.createRows()}] */}
            

                <ScheduleRow className="schedule-row" months={["mar","apr","may"]}/>
                <ScheduleRow className="schedule-row" months={["jan","feb","mar"]}/>
                <ScheduleRow className="schedule-row" months={["aug","sep","oct"]}/>
                <ScheduleRow className="schedule-row" months={["feb","mar","apr"]}/>
                <ScheduleRow className="schedule-row" months={["june","july","aug"]}/>
                <ScheduleRow key="10" className="schedule-row" months={["sep", "oct", "nov"]} />
                <ScheduleRow className="schedule-row" months={["mar","apr","may"]}/>
                <ScheduleRow className="schedule-row" months={["jan","feb","mar"]}/>
                <ScheduleRow className="schedule-row" months={["aug","sep","oct"]}/>
                <ScheduleRow className="schedule-row" months={["feb","mar","apr"]}/>
                <ScheduleRow className="schedule-row" months={["june","july","aug"]}/>
                <ScheduleRow key="10" className="schedule-row" months={["sep", "oct", "nov"]} />
                <ScheduleRow className="schedule-row" months={["mar","apr","may"]}/>
                <ScheduleRow className="schedule-row" months={["jan","feb","mar"]}/>
                <ScheduleRow className="schedule-row" months={["aug","sep","oct"]}/>
                <ScheduleRow className="schedule-row" months={["oct","nov","dec"]}/>
                <ScheduleRow className="schedule-row" months={["june","july","aug"]}/>
                <ScheduleRow key="10" className="schedule-row" months={["sep","oct","nov"]}/>
                <div className="schedule-header">
                    <div class="schedule-header-item"></div>
                    <div class="schedule-header-item"><span>J</span> </div>
                    <div class="schedule-header-item"><span>F</span> </div>
                    <div class="schedule-header-item"><span>M</span> </div>
                    <div class="schedule-header-item"><span>A</span> </div>
                    <div class="schedule-header-item"><span>M</span> </div>
                    <div class="schedule-header-item"><span>J</span> </div>
                    <div class="schedule-header-item"><span>J</span> </div>
                    <div class="schedule-header-item"><span>A</span> </div>
                    <div class="schedule-header-item"><span>S</span> </div>
                    <div class="schedule-header-item"><span>O</span> </div>
                    <div class="schedule-header-item"><span>N</span> </div>
                    <div class="schedule-header-item"><span>D</span> </div>
                </div>
                
            </div>
        )
    }
}

export default schedule;