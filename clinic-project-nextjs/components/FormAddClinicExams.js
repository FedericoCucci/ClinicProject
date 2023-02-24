import { contractAddress, abi } from "../constants"

import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"


export default function FormAddClinicExams(){

    const { isWeb3Enabled, account, Moralis,chainId: chainIdHex } =useMoralis()

    const chainId = parseInt(chainIdHex)
   const address= chainId in contractAddress ? contractAddress[chainId][0] : null
   /* const { runContractFunction: addDoctor, isFetching, isLoading } =
    useWeb3Contract();

    const dispatch = useNotification()


    const handleSuccess = async (tx) => {
        document.getElementById("indirizzo").value=""
        dispatch({
            type: "success",
            message: "Dottore inserito correttamente!",
            title: "Successo",
            position: "topR",
            
        })
    }

    const handleError = async (tx) => {
        dispatch({
            type: "error",
            message: tx,
            title: "Errore",
            position: "topR",
            
        })
    }
*/
    return(<div>
<div className="row d-flex justify-content-center my-5 text-lg">
  <div className="col-lg-8  mb-sm-0">
<div className="card text-center">
  <div className="card-header">
    Inserimento Esame Clinico
  </div>
  <div className="card-body">
  <div className="row g-3 d-flex justify-content-center ">
    <div className="col-4">
    <label >Paziente</label>
    </div>
    <div className="col-7">
    <input type="text"  className="form-control" id="paziente" placeholder="0x0000000000000000000000000000000000000000"/>
    </div>
    
</div>

<div className="row g-3 d-flex justify-content-center ">
    <div className="col-4">
    <label >Tipo di Esame</label>
    </div>
    <div className="col-7">
    <input type="text"  className="form-control" id="tipoEsame" placeholder="Esame del sangue"/>
    </div>
    
</div>

<div className="row g-3 d-flex justify-content-center ">
    <div className="col-4">
    <label >File</label>
    </div>
    <div className="col-7">
    <label className="switch">
  <input type="checkbox" id="isFile" onClick={(e)=>{
    textReport=document.getElementById("textReport")
    fileReport=document.getElementById("fileReport")
    check=e.currentTarget.checked
    if(check==true){
        textReport.style.display="none"
    }
  }}/>
  <span className="slider round"></span>
</label>
    </div>

        <div className="row g-3 d-flex justify-content-center ">
    <div className="col-4">
    <label >Referto</label>
    </div>
    <div className="col-7">
    <input className="form-control" type="file" id="fileReport"/>
    <textarea className="form-control" id="textReport" placeholder="Glicemia:80 mg/dl"></textarea>
    </div>
    
</div>
    
</div>

<div className="row g-3 d-flex justify-content-center ">
<div className="col-3">
    <button type="button" className="btn btn-primary mb-3"
    onClick={()=>{
        let s=document.getElementById("isFile").checked
        console.log(s);
    }}
    > Aggiungi
        </button>
        </div>
    </div>
  </div>
 </div>
 </div>
</div>
    </div>)
}