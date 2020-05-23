import React, { Component } from 'react';
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase.utils';

class csvExporter extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            subjects:{
                "CSE1ITX": {
                  "tile": "Information Technology Fundamentals",
                  "code": "CSE1ITX"
                },
                "CSE1PGX": {
                  "tile": "Programming Environments",
                  "code": "CSE1PGX"
                },
                "CSE1CFX": {
                  "tile": "Cloud Foundations",
                  "code": "CSE1CFX"
                },
                "CSE1OFX": {
                  "tile": "Object Oriented Programming Fundamentals",
                  "code": "CSE1OFX"
                },
                "CSE1ISX": {
                  "tile": "Information Systems",
                  "code": "CSE1ISX"
                },
                "CSE2NFX": {
                  "tile": "Network Engineering Fundamentals",
                  "code": "CSE2NFX"
                },
                "CSE2DCX": {
                  "tile": "Database Fundamentals on the Cloud",
                  "code": "CSE2DCX"
                },
                "CSE1SPX": {
                  "tile": "Sustainability Practices",
                  "code": "CSE1SPX"
                },
                "CSE1SIX": {
                  "tile": "Information System Infrastructure",
                  "code": "CSE1SIX"
                },
                "CSE1IOX": {
                  "tile": "Intermediate Object Oriented Programming",
                  "code": "CSE1IOX"
                },
                "CSE2ICX": {
                  "tile": "Internet Client Engineering",
                  "code": "CSE2ICX"
                },
                "CSE2CNX": {
                  "tile": "Computer Networks",
                  "code": "CSE2CNX"
                },
                "CSE2SDX": {
                  "tile": "Information Systems Development",
                  "code": "CSE2SDX"
                },
                "BUS2PMX": {
                  "tile": "Project Management",
                  "code": "BUS2PMX"
                },
                "CSE2VVX": {
                  "tile": "Virtualisation for the Cloud",
                  "code": "CSE2VVX"
                },
                "MAT2DMX": {
                  "tile": "Discrete Mathematics for Computer Science",
                  "code": "MAT2DMX"
                },
                "CSE2MAX": {
                  "tile": "Mobile Application Development",
                  "code": "CSE2MAX"
                },
                "CSE2OSX": {
                  "tile": "Operating Systems",
                  "code": "CSE2OSX"
                },
                "CSE2ADX": {
                  "tile": "Application Development in the Cloud",
                  "code": "CSE2ADX"
                },
                "CSE2CPX": {
                  "tile": "Managing Projects in the Cloud",
                  "code": "CSE2CPX"
                },
                "CSE2MLX": {
                  "tile": "Machine Learning",
                  "code": "CSE2MLX"
                },
                "CSE2SAX": {
                  "tile": "Operating Systems Administration",
                  "code": "CSE2SAX"
                },
                "CSE2ANX": {
                  "tile": "Advanced Computer Networks",
                  "code": "CSE2ANX"
                },
                "CSE2WDX": {
                  "tile": "Web Development",
                  "code": "CSE2WDX"
                },
                "CSE3BGX": {
                  "tile": "Big Data Management on the Cloud (Elective)",
                  "code": "CSE3BGX"
                },
                "CSE3CIX": {
                  "tile": "Computational Intelligence for Data Analysis (Elective)",
                  "code": "CSE3CIX"
                },
                "CSE3CSX": {
                  "tile": "Cybersecurity Fundamentals (Elective)",
                  "code": "CSE3CSX"
                },
                "CSE3NWX": {
                  "tile": "Networks, Systems and Web Security (Elective)",
                  "code": "CSE3NWX"
                },
                "CSE3OTX": {
                  "tile": "Internet of Things (Elective)",
                  "code": "CSE3OTX"
                },
                "CSE3WSX": {
                  "tile": "Wireless Network Engineering (Elective)",
                  "code": "CSE3WSX"
                },
                "CSE3PAX": {
                  "tile": "Industry Project 3A",
                  "code": "CSE3PAX"
                },
                "CSE3PBX": {
                  "tile": "Industry Project 3B",
                  "code": "CSE3PBX"
                },
                "CSE3PEX": {
                  "tile": "Profesional Environment",
                  "code": "CSE3PEX"
                },
                "CSE3ACX": {
                  "tile": "Architecting on the Cloud",
                  "code": "CSE3ACX"
                },
                "CSE3SOX": {
                  "tile": "System Operations on the Cloud",
                  "code": "CSE3SOX"
                },
                "CSE3BDX": {
                  "tile": "Big Data on the Cloud",
                  "code": "CSE3BDX"
                },
                "CSE3PCX": {
                  "tile": "Private Cloud Solutions",
                  "code": "CSE3PCX"
                },
                "CSE3CAX": {
                  "tile": "Industry Project for Cloud Technology 3A",
                  "code": "CSE3CAX"
                },
                "CSE3CBX": {
                  "tile": "Industry Project for Cloud Technology 3B",
                  "code": "CSE3CBX"
                }
              }
            
            

        }
        this.uploadCSV = this.uploadCSV.bind(this);

    }

    uploadCSV() {
        const { subjects } = this.state;
        const batch = firestore.batch();
        const db = firestore.collection('subjects').doc('subjectList')
        
        //json.forEach(item => {
        batch.set(db, {           
                "CSE1ITX": {
                  "tile": "Information Technology Fundamentals",
                  "code": "CSE1ITX"
                },
                "CSE1PGX": {
                  "tile": "Programming Environments",
                  "code": "CSE1PGX"
                },
                "CSE1CFX": {
                  "tile": "Cloud Foundations",
                  "code": "CSE1CFX"
                },
                "CSE1OFX": {
                  "tile": "Object Oriented Programming Fundamentals",
                  "code": "CSE1OFX"
                },
                "CSE1ISX": {
                  "tile": "Information Systems",
                  "code": "CSE1ISX"
                },
                "CSE2NFX": {
                  "tile": "Network Engineering Fundamentals",
                  "code": "CSE2NFX"
                },
                "CSE2DCX": {
                  "tile": "Database Fundamentals on the Cloud",
                  "code": "CSE2DCX"
                },
                "CSE1SPX": {
                  "tile": "Sustainability Practices",
                  "code": "CSE1SPX"
                },
                "CSE1SIX": {
                  "tile": "Information System Infrastructure",
                  "code": "CSE1SIX"
                },
                "CSE1IOX": {
                  "tile": "Intermediate Object Oriented Programming",
                  "code": "CSE1IOX"
                },
                "CSE2ICX": {
                  "tile": "Internet Client Engineering",
                  "code": "CSE2ICX"
                },
                "CSE2CNX": {
                  "tile": "Computer Networks",
                  "code": "CSE2CNX"
                },
                "CSE2SDX": {
                  "tile": "Information Systems Development",
                  "code": "CSE2SDX"
                },
                "BUS2PMX": {
                  "tile": "Project Management",
                  "code": "BUS2PMX"
                },
                "CSE2VVX": {
                  "tile": "Virtualisation for the Cloud",
                  "code": "CSE2VVX"
                },
                "MAT2DMX": {
                  "tile": "Discrete Mathematics for Computer Science",
                  "code": "MAT2DMX"
                },
                "CSE2MAX": {
                  "tile": "Mobile Application Development",
                  "code": "CSE2MAX"
                },
                "CSE2OSX": {
                  "tile": "Operating Systems",
                  "code": "CSE2OSX"
                },
                "CSE2ADX": {
                  "tile": "Application Development in the Cloud",
                  "code": "CSE2ADX"
                },
                "CSE2CPX": {
                  "tile": "Managing Projects in the Cloud",
                  "code": "CSE2CPX"
                },
                "CSE2MLX": {
                  "tile": "Machine Learning",
                  "code": "CSE2MLX"
                },
                "CSE2SAX": {
                  "tile": "Operating Systems Administration",
                  "code": "CSE2SAX"
                },
                "CSE2ANX": {
                  "tile": "Advanced Computer Networks",
                  "code": "CSE2ANX"
                },
                "CSE2WDX": {
                  "tile": "Web Development",
                  "code": "CSE2WDX"
                },
                "CSE3BGX": {
                  "tile": "Big Data Management on the Cloud (Elective)",
                  "code": "CSE3BGX"
                },
                "CSE3CIX": {
                  "tile": "Computational Intelligence for Data Analysis (Elective)",
                  "code": "CSE3CIX"
                },
                "CSE3CSX": {
                  "tile": "Cybersecurity Fundamentals (Elective)",
                  "code": "CSE3CSX"
                },
                "CSE3NWX": {
                  "tile": "Networks, Systems and Web Security (Elective)",
                  "code": "CSE3NWX"
                },
                "CSE3OTX": {
                  "tile": "Internet of Things (Elective)",
                  "code": "CSE3OTX"
                },
                "CSE3WSX": {
                  "tile": "Wireless Network Engineering (Elective)",
                  "code": "CSE3WSX"
                },
                "CSE3PAX": {
                  "tile": "Industry Project 3A",
                  "code": "CSE3PAX"
                },
                "CSE3PBX": {
                  "tile": "Industry Project 3B",
                  "code": "CSE3PBX"
                },
                "CSE3PEX": {
                  "tile": "Profesional Environment",
                  "code": "CSE3PEX"
                },
                "CSE3ACX": {
                  "tile": "Architecting on the Cloud",
                  "code": "CSE3ACX"
                },
                "CSE3SOX": {
                  "tile": "System Operations on the Cloud",
                  "code": "CSE3SOX"
                },
                "CSE3BDX": {
                  "tile": "Big Data on the Cloud",
                  "code": "CSE3BDX"
                },
                "CSE3PCX": {
                  "tile": "Private Cloud Solutions",
                  "code": "CSE3PCX"
                },
                "CSE3CAX": {
                  "tile": "Industry Project for Cloud Technology 3A",
                  "code": "CSE3CAX"
                },
                "CSE3CBX": {
                  "tile": "Industry Project for Cloud Technology 3B",
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