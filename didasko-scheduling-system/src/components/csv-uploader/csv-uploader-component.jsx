import React, { Component } from 'react';
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase.utils';

class csvExporter extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            subjectList:{
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
          },
          classList:[
            {
              "code": "CSE1ITX",
              "title": "Information Technology Fundamentals",
              "jan": "X",
              "feb": "X",
              "mar": "X",
              "apr": "X",
              "may": "X",
              "jun": "X",
              "jul": "X",
              "aug": "X",
              "sep": "X",
              "oct": "X",
              "nov": "X",
              "dec": "X"
            },
            {
              "code": "CSE1PGX",
              "title": "Programming Environments",
              "jan": "X",
              "feb": "X",
              "mar": "X",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "X",
              "aug": "X",
              "sep": "X",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE1CFX",
              "title": "Cloud Foundations",
              "jan": "X",
              "feb": "X",
              "mar": "X",
              "apr": "X",
              "may": "X",
              "jun": "X",
              "jul": "X",
              "aug": "X",
              "sep": "X",
              "oct": "X",
              "nov": "X",
              "dec": "X"
            },
            {
              "code": "CSE1OFX",
              "title": "Object Oriented Programming Fundamentals",
              "jan": "X",
              "feb": "X",
              "mar": "X",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "X",
              "aug": "X",
              "sep": "X",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE1ISX",
              "title": "Information Systems",
              "jan": "X",
              "feb": "",
              "mar": "",
              "apr": "X",
              "may": "X",
              "jun": "X",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "X",
              "nov": "X",
              "dec": "X"
            },
            {
              "code": "CSE2NFX",
              "title": "Network Engineering Fundamentals",
              "jan": "X",
              "feb": "X",
              "mar": "X",
              "apr": "X",
              "may": "X",
              "jun": "X",
              "jul": "X",
              "aug": "X",
              "sep": "X",
              "oct": "X",
              "nov": "X",
              "dec": "X"
            },
            {
              "code": "CSE2DCX",
              "title": "Database Fundamentals on the Cloud",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "X",
              "may": "X",
              "jun": "X",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "X",
              "nov": "X",
              "dec": "X"
            },
            {
              "code": "CSE1SPX",
              "title": "Sustainability Practices",
              "jan": "X",
              "feb": "X",
              "mar": "X",
              "apr": "X",
              "may": "X",
              "jun": "X",
              "jul": "X",
              "aug": "X",
              "sep": "X",
              "oct": "X",
              "nov": "X",
              "dec": "X"
            },
            {
              "code": "CSE1SIX",
              "title": "Information System Infrastructure",
              "jan": "X",
              "feb": "X",
              "mar": "X",
              "apr": "X",
              "may": "X",
              "jun": "X",
              "jul": "X",
              "aug": "X",
              "sep": "X",
              "oct": "X",
              "nov": "X",
              "dec": "X"
            },
            {
              "code": "CSE1IOX",
              "title": "Intermediate Object Oriented Programming",
              "jan": "X",
              "feb": "X",
              "mar": "X",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "X",
              "aug": "X",
              "sep": "X",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE2ICX",
              "title": "Internet Client Engineering",
              "jan": "",
              "feb": "X",
              "mar": "X",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE2CNX",
              "title": "Computer Networks",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE2SDX",
              "title": "Information Systems Development",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "BUS2PMX",
              "title": "Project Management",
              "jan": "",
              "feb": "X",
              "mar": "X",
              "apr": "X",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": "X"
            },
            {
              "code": "CSE2VVX",
              "title": "Virtualisation for the Cloud",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "MAT2DMX",
              "title": "Discrete Mathematics for Computer Science",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE2MAX",
              "title": "Mobile Application Development",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE2OSX",
              "title": "Operating Systems",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE2ADX",
              "title": "Application Development in the Cloud",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE2CPX",
              "title": "Managing Projects in the Cloud",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "X",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE2MLX",
              "title": "Machine Learning",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE2SAX",
              "title": "Operating Systems Administration",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE2ANX",
              "title": "Advanced Computer Networks",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE2WDX",
              "title": "Web Development",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE3BGX",
              "title": "Big Data Management on the Cloud (Elective)",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE3CIX",
              "title": "Computational Intelligence for Data Analysis (Elective)",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE3CSX",
              "title": "Cybersecurity Fundamentals (Elective)",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE3NWX",
              "title": "Networks, Systems and Web Security (Elective)",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE3OTX",
              "title": "Internet of Things (Elective)",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE3WSX",
              "title": "Wireless Network Engineering (Elective)",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE3PAX",
              "title": "Industry Project 3A",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE3PBX",
              "title": "Industry Project 3B",
              "jan": "",
              "feb": "X",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE3PEX",
              "title": "Profesional Environment",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "X",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE3ACX",
              "title": "Architecting on the Cloud",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE3SOX",
              "title": "System Operations on the Cloud",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "X",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "X",
              "dec": ""
            },
            {
              "code": "CSE3BDX",
              "title": "Big Data on the Cloud",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "X",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE3PCX",
              "title": "Private Cloud Solutions",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE3CAX",
              "title": "Industry Project for Cloud Technology 3A",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            },
            {
              "code": "CSE3CBX",
              "title": "Industry Project for Cloud Technology 3B",
              "jan": "",
              "feb": "",
              "mar": "",
              "apr": "",
              "may": "",
              "jun": "",
              "jul": "",
              "aug": "",
              "sep": "",
              "oct": "",
              "nov": "",
              "dec": ""
            }
          ]
            
            

        }
        this.uploadCSV = this.uploadCSV.bind(this);

    }

  uploadCSV() {
    const { subjectList, classList } = this.state;
    let classUploadObj = {}
    let classListArray =[]
    const batch = firestore.batch();
    let db = firestore.collection('classes/y2020/classes');
    console.log('classlist', classList)
      
    classList.forEach((item, index) => {
      Object.keys(item).map((key, index) => {
        if (key === 'jan' && item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'jan,feb,mar',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              
              }
            }
          }
        }else if (key === 'feb'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'feb,mar,apr',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'mar'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'mar,apr,may',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'apr'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'apr,may,jun',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'may'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'may,jun,jul',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'jun'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'jun,jul,aug',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'jul'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'jul,aug,sep',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'aug'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'aug,sep,oct',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'sep'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'sep,oct,nov',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'oct'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'oct,nov,dec',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'nov' && item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'nov,dec',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }
        else if (key === 'dec'&& item[key] === "X") {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code],
              [`${item.code}-${key.toUpperCase()}`]: {
                months: 'dec',
                teacher: 'Test Teacher',
                classID: `${item.code}-${key.toUpperCase()}`,
                title:`${item.title}`
              }
            }
          }
        }

        else {
          classUploadObj = {
            ...classUploadObj,
            [item.code]: {
              ...classUploadObj[item.code]
            }
          }
        }

      })
    })


    
    classList.forEach((item, index) => {
      Object.keys(item).map((key, index) => {
        if (key === 'jan' && item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'jan,feb,mar',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 25,
            assigned: true
          })
        }else if (key === 'feb'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'feb,mar,apr',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 45,
            assigned: true
          })
        }
        else if (key === 'mar'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'mar,apr,may',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 200,
            assigned: true
          })
        }
        else if (key === 'apr'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'apr,may,jun',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 87,
            assigned: true
          })
        }
        else if (key === 'may'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'may,jun,jul',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 95,
            assigned: true
          })
        }
        else if (key === 'jun'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'jun,jul,aug',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 60,
            assigned: true
          })
        }
        else if (key === 'jul'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'jul,aug,sep',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 15,
            assigned: true
          })
        }
        else if (key === 'aug'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'aug,sep,oct',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 99,
            assigned: true
          })
        }
        else if (key === 'sep'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'sep,oct,nov',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 49,
            assigned: true
          })
        }
        else if (key === 'oct'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'oct,nov,dec',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 400,
            assigned: true
          })
        }
        else if (key === 'nov' && item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'nov,dec,jan',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 10,
            assigned: true
          })
        }
        else if (key === 'dec'&& item[key] === "X") {
          db = firestore.collection('classes/y2020/classes').doc(`${item.code}-${key.toUpperCase()}`) 
          batch.update(db, {
            classID: `${item.code}-${key.toUpperCase()}`,
            months: 'dec,jan,feb',
            teacher: 'test teacher',
            title: `${item.title}`,
            subjectCode: item.code,
            instanceType: 'Standard Instance Delivery',
            studentCount: 120,
            assigned: true
          })
        }
        else {

        }

      })
    })
    console.log('classobj',classUploadObj)
    //batch.set(db, classUploadObj);
    batch.commit().then(() => {
      console.log("COMPLETE");
  })
      
        /* const batch = firestore.batch();
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
        }) */
                
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