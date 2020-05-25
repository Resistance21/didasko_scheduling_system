import React, { Component } from 'react';
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase.utils';

class csvExporter extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            subjects:{
                "CSE1ITX": {
                  "title": "Information Technology Fundamentals",
                  "code": "CSE1ITX"
                },
                "CSE1PGX": {
                  "title": "Programming Environments",
                  "code": "CSE1PGX"
                },
                "CSE1CFX": {
                  "title": "Cloud Foundations",
                  "code": "CSE1CFX"
                },
                "CSE1OFX": {
                  "title": "Object Oriented Programming Fundamentals",
                  "code": "CSE1OFX"
                },
                "CSE1ISX": {
                  "title": "Information Systems",
                  "code": "CSE1ISX"
                },
                "CSE2NFX": {
                  "title": "Network Engineering Fundamentals",
                  "code": "CSE2NFX"
                },
                "CSE2DCX": {
                  "title": "Database Fundamentals on the Cloud",
                  "code": "CSE2DCX"
                },
                "CSE1SPX": {
                  "title": "Sustainability Practices",
                  "code": "CSE1SPX"
                },
                "CSE1SIX": {
                  "title": "Information System Infrastructure",
                  "code": "CSE1SIX"
                },
                "CSE1IOX": {
                  "title": "Intermediate Object Oriented Programming",
                  "code": "CSE1IOX"
                },
                "CSE2ICX": {
                  "title": "Internet Client Engineering",
                  "code": "CSE2ICX"
                },
                "CSE2CNX": {
                  "title": "Computer Networks",
                  "code": "CSE2CNX"
                },
                "CSE2SDX": {
                  "title": "Information Systems Development",
                  "code": "CSE2SDX"
                },
                "BUS2PMX": {
                  "title": "Project Management",
                  "code": "BUS2PMX"
                },
                "CSE2VVX": {
                  "title": "Virtualisation for the Cloud",
                  "code": "CSE2VVX"
                },
                "MAT2DMX": {
                  "title": "Discrete Mathematics for Computer Science",
                  "code": "MAT2DMX"
                },
                "CSE2MAX": {
                  "title": "Mobile Application Development",
                  "code": "CSE2MAX"
                },
                "CSE2OSX": {
                  "title": "Operating Systems",
                  "code": "CSE2OSX"
                },
                "CSE2ADX": {
                  "title": "Application Development in the Cloud",
                  "code": "CSE2ADX"
                },
                "CSE2CPX": {
                  "title": "Managing Projects in the Cloud",
                  "code": "CSE2CPX"
                },
                "CSE2MLX": {
                  "title": "Machine Learning",
                  "code": "CSE2MLX"
                },
                "CSE2SAX": {
                  "title": "Operating Systems Administration",
                  "code": "CSE2SAX"
                },
                "CSE2ANX": {
                  "title": "Advanced Computer Networks",
                  "code": "CSE2ANX"
                },
                "CSE2WDX": {
                  "title": "Web Development",
                  "code": "CSE2WDX"
                },
                "CSE3BGX": {
                  "title": "Big Data Management on the Cloud (Elective)",
                  "code": "CSE3BGX"
                },
                "CSE3CIX": {
                  "title": "Computational Intelligence for Data Analysis (Elective)",
                  "code": "CSE3CIX"
                },
                "CSE3CSX": {
                  "title": "Cybersecurity Fundamentals (Elective)",
                  "code": "CSE3CSX"
                },
                "CSE3NWX": {
                  "title": "Networks, Systems and Web Security (Elective)",
                  "code": "CSE3NWX"
                },
                "CSE3OTX": {
                  "title": "Internet of Things (Elective)",
                  "code": "CSE3OTX"
                },
                "CSE3WSX": {
                  "title": "Wireless Network Engineering (Elective)",
                  "code": "CSE3WSX"
                },
                "CSE3PAX": {
                  "title": "Industry Project 3A",
                  "code": "CSE3PAX"
                },
                "CSE3PBX": {
                  "title": "Industry Project 3B",
                  "code": "CSE3PBX"
                },
                "CSE3PEX": {
                  "title": "Profesional Environment",
                  "code": "CSE3PEX"
                },
                "CSE3ACX": {
                  "title": "Architecting on the Cloud",
                  "code": "CSE3ACX"
                },
                "CSE3SOX": {
                  "title": "System Operations on the Cloud",
                  "code": "CSE3SOX"
                },
                "CSE3BDX": {
                  "title": "Big Data on the Cloud",
                  "code": "CSE3BDX"
                },
                "CSE3PCX": {
                  "title": "Private Cloud Solutions",
                  "code": "CSE3PCX"
                },
                "CSE3CAX": {
                  "title": "Industry Project for Cloud Technology 3A",
                  "code": "CSE3CAX"
                },
                "CSE3CBX": {
                  "title": "Industry Project for Cloud Technology 3B",
                  "code": "CSE3CBX"
                }
              }
            
            

        }
        this.uploadCSV = this.uploadCSV.bind(this);

    }

    uploadCSV() {
        const { subjects } = this.state;
        const batch = firestore.batch();
        const db = firestore.collection('subjects')
        
        //json.forEach(item => {
        batch.set(db, {           
                "CSE1ITX": {
                  "title": "Information Technology Fundamentals",
                  "code": "CSE1ITX"
                },
                "CSE1PGX": {
                  "title": "Programming Environments",
                  "code": "CSE1PGX"
                },
                "CSE1CFX": {
                  "title": "Cloud Foundations",
                  "code": "CSE1CFX"
                },
                "CSE1OFX": {
                  "title": "Object Oriented Programming Fundamentals",
                  "code": "CSE1OFX"
                },
                "CSE1ISX": {
                  "title": "Information Systems",
                  "code": "CSE1ISX"
                },
                "CSE2NFX": {
                  "title": "Network Engineering Fundamentals",
                  "code": "CSE2NFX"
                },
                "CSE2DCX": {
                  "title": "Database Fundamentals on the Cloud",
                  "code": "CSE2DCX"
                },
                "CSE1SPX": {
                  "title": "Sustainability Practices",
                  "code": "CSE1SPX"
                },
                "CSE1SIX": {
                  "title": "Information System Infrastructure",
                  "code": "CSE1SIX"
                },
                "CSE1IOX": {
                  "title": "Intermediate Object Oriented Programming",
                  "code": "CSE1IOX"
                },
                "CSE2ICX": {
                  "title": "Internet Client Engineering",
                  "code": "CSE2ICX"
                },
                "CSE2CNX": {
                  "title": "Computer Networks",
                  "code": "CSE2CNX"
                },
                "CSE2SDX": {
                  "title": "Information Systems Development",
                  "code": "CSE2SDX"
                },
                "BUS2PMX": {
                  "title": "Project Management",
                  "code": "BUS2PMX"
                },
                "CSE2VVX": {
                  "title": "Virtualisation for the Cloud",
                  "code": "CSE2VVX"
                },
                "MAT2DMX": {
                  "title": "Discrete Mathematics for Computer Science",
                  "code": "MAT2DMX"
                },
                "CSE2MAX": {
                  "title": "Mobile Application Development",
                  "code": "CSE2MAX"
                },
                "CSE2OSX": {
                  "title": "Operating Systems",
                  "code": "CSE2OSX"
                },
                "CSE2ADX": {
                  "title": "Application Development in the Cloud",
                  "code": "CSE2ADX"
                },
                "CSE2CPX": {
                  "title": "Managing Projects in the Cloud",
                  "code": "CSE2CPX"
                },
                "CSE2MLX": {
                  "title": "Machine Learning",
                  "code": "CSE2MLX"
                },
                "CSE2SAX": {
                  "title": "Operating Systems Administration",
                  "code": "CSE2SAX"
                },
                "CSE2ANX": {
                  "title": "Advanced Computer Networks",
                  "code": "CSE2ANX"
                },
                "CSE2WDX": {
                  "title": "Web Development",
                  "code": "CSE2WDX"
                },
                "CSE3BGX": {
                  "title": "Big Data Management on the Cloud (Elective)",
                  "code": "CSE3BGX"
                },
                "CSE3CIX": {
                  "title": "Computational Intelligence for Data Analysis (Elective)",
                  "code": "CSE3CIX"
                },
                "CSE3CSX": {
                  "title": "Cybersecurity Fundamentals (Elective)",
                  "code": "CSE3CSX"
                },
                "CSE3NWX": {
                  "title": "Networks, Systems and Web Security (Elective)",
                  "code": "CSE3NWX"
                },
                "CSE3OTX": {
                  "title": "Internet of Things (Elective)",
                  "code": "CSE3OTX"
                },
                "CSE3WSX": {
                  "title": "Wireless Network Engineering (Elective)",
                  "code": "CSE3WSX"
                },
                "CSE3PAX": {
                  "title": "Industry Project 3A",
                  "code": "CSE3PAX"
                },
                "CSE3PBX": {
                  "title": "Industry Project 3B",
                  "code": "CSE3PBX"
                },
                "CSE3PEX": {
                  "title": "Profesional Environment",
                  "code": "CSE3PEX"
                },
                "CSE3ACX": {
                  "title": "Architecting on the Cloud",
                  "code": "CSE3ACX"
                },
                "CSE3SOX": {
                  "title": "System Operations on the Cloud",
                  "code": "CSE3SOX"
                },
                "CSE3BDX": {
                  "title": "Big Data on the Cloud",
                  "code": "CSE3BDX"
                },
                "CSE3PCX": {
                  "title": "Private Cloud Solutions",
                  "code": "CSE3PCX"
                },
                "CSE3CAX": {
                  "title": "Industry Project for Cloud Technology 3A",
                  "code": "CSE3CAX"
                },
                "CSE3CBX": {
                  "title": "Industry Project for Cloud Technology 3B",
                  "code": "CSE3CBX"
                
              }
            })
            console.log(batch)
        //})

        batch.commit().then(() => {
            console.log("COMPLETE");
        })
                
    }

    render() {
        return (
            <div>
                <CustomButton onClick={this.uploadCSV}>Upload</CustomButton>
            </div>
        )
    }
}

export default csvExporter;