import { contractAddress, abi ,ipfsConfig} from "../constants"
import { create } from "ipfs-http-client";
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"


export default function FormAddClinicExams(){

    const { isWeb3Enabled, account, Moralis,chainId: chainIdHex } =useMoralis()

    const chainId = parseInt(chainIdHex)
   const address= chainId in contractAddress ? contractAddress[chainId][0] : null

   const IPFSUrl=ipfsConfig["IPFSUrl"]
   const IPFSOutputPath=ipfsConfig["IPFSOutputPath"]
   

   const [checkIsFile, setCheckIsFile] = useState(false)

   useEffect(() => {
    let fileReport=document.getElementById("fileReport")
    let textReport=document.getElementById("textReport")
    if(checkIsFile==true){
        fileReport.style.display="block"
        textReport.style.display="none"
    }else{
        fileReport.style.display="none"
        textReport.style.display="block"
    }
       
    
}, [checkIsFile])

    const { runContractFunction: addClinicExam, isFetching, isLoading } =
    useWeb3Contract();

    const dispatch = useNotification()


    const handleSuccess = async (tx) => {
        document.getElementById("patient").value=""
        document.getElementById("examType").value=""
        if(checkIsFile==true){
            document.getElementById("fileReport").value=""
        }else{
            document.getElementById("textReport").value=""
        }
        dispatch({
            type: "success",
            message: "Esame inserito correttamente!",
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

    return(<div>
<div className="row d-flex justify-content-center my-5 text-lg">
  <div className="col-lg-8  mb-sm-0">
<div className="card text-center">
  <div className="card-header">
    Inserimento Esame Clinico
  </div>
  <div className="card-body">
  <div className="row g-3 d-flex justify-content-center my-2">
    <div className="col-4">
    <label >Paziente</label>
    </div>
    <div className="col-7">
    <input type="text"  className="form-control" id="patient" placeholder="0x0000000000000000000000000000000000000000"/>
    </div>
    
</div>

<div className="row g-3 d-flex justify-content-center my-2">
    <div className="col-4">
    <label >Tipo di Esame</label>
    </div>
    <div className="col-7">
    <input type="text"  className="form-control" id="examType" placeholder="Esame del sangue"/>
    </div>
    
</div>

<div className="row g-3 d-flex justify-content-center my-2">
    <div className="col-4">
    <label >File</label>
    </div>
    <div className="col-7 ">
    <label className="switch">
  <input type="checkbox" id="isFile" onClick={(e)=>{
    
    let check=e.currentTarget.checked
    setCheckIsFile(check)
  }}/>
  <span className="slider round"></span>
</label>
    </div>

</div>

<div className="row g-3 d-flex justify-content-center my-2">
    <div className="col-4">
    <label >Referto</label>
    </div>
    <div className="col-7">
    <input className="form-control" type="file" id="fileReport"/>
    <textarea className="form-control" id="textReport" placeholder="Glicemia:80 mg/dl"></textarea>
    </div>
    
</div>

<div className="row g-3 d-flex justify-content-center my-2">
<div className="col-3">
    <button type="button" className="btn btn-primary mb-3"
    onClick={async ()=>{
        let patient=document.getElementById("patient").value;
        let examType=document.getElementById("examType").value;
        let isFile=document.getElementById("isFile").checked
        if(patient==""||examType==""){
            handleError("Campi vuoti!")
        }else{
        if(isFile==true){
            let fileReport=document.getElementById("fileReport")
            const client = create(IPFSUrl);
            let CID="";
            
            const data = fileReport.files[0]
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(data);
            reader.onloadend = async () => {
             let f=Buffer(reader.result);
              try{
                CID = await client.add(f);
                } catch{
                    handleError("IPFS disattivato")
                }
                if(CID!==""){
                    let report=CID.path
                    const options = {
                        abi: abi,
                        contractAddress: address,
                        functionName: "addClinicExam",
                        params: {
                          patient:patient,examType:examType,report:report,isFile:isFile
                        },
                      };
                    await addClinicExam({ params: options,
                    onSuccess:()=>handleSuccess(),
                    onError:()=>handleError("Qualcosa è andato storto!")
                    })

                }
              }
            

            
            
        }else{
            let textReport=document.getElementById("textReport").value
            if(textReport==""){
                handleError("Nessun report!")
            }else{
            const options = {
                abi: abi,
                contractAddress: address,
                functionName: "addClinicExam",
                params: {
                  patient:patient,examType:examType,report:textReport,isFile:isFile
                },
              };
            await addClinicExam({ params: options,
            onSuccess:()=>handleSuccess(),
            onError:()=>handleError("Qualcosa è andato storto!")
            })
        }}}
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