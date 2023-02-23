// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ClinicContract{


address[] public listDoctors;

struct ClinicExam{
    address doctor;
    address patient;
    string examType;
    string report;
    uint256 date;
    bool isFile;
    bool isConfirmed;
}

event ClinicExamAdded(address doctor,address patient, string examType, string report, uint256 date, bool isFile, bool isConfirmed);
event ClinicExamConfirmed(string message, ClinicExam e);

mapping (uint => ClinicExam) private mapExam;
mapping (uint => mapping (address => bool)) private mapConfirmExam;

uint private idCount;

function addDoctor(address doctor) public {
    listDoctors.push(doctor);
}

function removeDoctor(address doctor) public{
    
    for(uint i=0;i<listDoctors.length;i++){
        if(listDoctors[i]==doctor){
            delete listDoctors[i];
        
        }
    

}
}

function existDoctor(address doctor) private view returns(bool){
    for(uint i=0;i<listDoctors.length;i++){
        if(listDoctors[i]==doctor){
            return true;
        }
    }
    return false;
}

function addClinicExam(address patient, string memory examType, string memory report,bool isFile) public returns(uint){
        require(existDoctor(msg.sender),"You're not a doctor!");
        uint idExam=idCount;
        uint256 date=block.timestamp;
        mapExam[idExam]=ClinicExam(msg.sender,patient,examType,report,date,isFile,false);
        idCount+=1;
        mapConfirmExam[idExam][msg.sender] = true;
        emit ClinicExamAdded(msg.sender, patient, examType, report, date, isFile,false);
        return idExam;
    }



function confirmClinicExam(uint256 idExam) public{
    require(mapExam[idExam].patient==msg.sender,"You're not a patient");
    mapConfirmExam[idExam][msg.sender] = true;
    mapExam[idExam].isConfirmed=true;
    emit ClinicExamConfirmed("Patient and doctor both confirmed exam",mapExam[idExam]);
}

function getClinicExamsByPatient(address patient) public view returns(ClinicExam[] memory, bool[] memory, bool[] memory){
    uint256 count=0;
    for(uint256 i=0;i<idCount;i++){
        if(mapExam[i].patient==patient){
            count++;
        }
    }
    ClinicExam [] memory exams=new ClinicExam[](count);
    bool[] memory isFileList= new bool[](count);
    bool[] memory isConfirmedList= new bool[](count);
    uint256 j=0;
    for(uint256 i=0;i<idCount;i++){
        if(mapExam[i].patient==patient){
            exams[j]=mapExam[i];
            isFileList[j]=mapExam[i].isFile;
            isConfirmedList[j]=mapExam[i].isConfirmed;
            j++;
        }
    }
    
    return (exams,isFileList,isConfirmedList);
   
}





function isConfirmed(uint id,address addr)public view returns(bool){
    return mapConfirmExam[id][addr];
}



}
