import { contractAddress, abi,ipfsConfig,contracts_file, providerUrl} from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"


import { ethers } from "ethers"

export default function ListAllExamsByPatient(){
    
    const { isWeb3Enabled} =useMoralis()
    const addr=contracts_file["address"];

    const dispatch = useNotification()
    const IPFSOutputPath=ipfsConfig["IPFSOutputPath"]

    const [listExams, setListExams] = useState([])

    const handleError = async (tx) => {
        dispatch({
            type: "error",
            message: tx,
            title: "Errore",
            position: "topR",
            
        })
    }

    const handleInfo=async(tx)=>{
        dispatch({
            type: "info",
            message: tx,
            title: "Info",
            position: "topR",
            
        })
    }

    function getDate(x) {
        const myDate = new Date(x * 1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:"numeric",minute: "numeric", second:"numeric" };
        return myDate.toLocaleDateString("it-IT",options);
    }
    useEffect(() => {
        if (isWeb3Enabled) {
           
        }
    }, [listExams])

    return(
        <div>
            <div className="row d-flex justify-content-center my-5 text-lg">
          <div className="col-lg-8  mb-sm-0">
            <div className="card text-center">
              <div className="card-header">
                Storia Paziente
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-2">
                    <label >Indirizzo</label>
                  </div>
                  <div className="col-7">
                    <input type="text"  className="form-control" id="addresspatient" placeholder="0x0000000000000000000000000000000000000000"/>
                  </div>
                  <div className="col-3">
                    <button type="button" className="btn btn-primary mb-3"
                    onClick={async()=>{
                        
                        let list=[]
                        let addressPatient=document.getElementById("addresspatient").value;
                        if(addressPatient==""){
                            handleError("Campo vuoto!")
                          }else{
                            const provider = new ethers.providers.JsonRpcProvider(providerUrl)
                            let eventName="ClinicExamConfirmed"
                            for(let i=0;i<addr.length;i++){
                                const logs = await provider.getLogs({
                                
                                address:addr[i],
                                fromBlock: 0,
                                toBlock:"latest"
                            });
                        
                        
                            if(logs.length!=0){
                            for(let j=0;j<logs.length;j++){
                            const a=abi;
                            const intrfc = new ethers.utils.Interface(a);
                            let parsedLog = intrfc.parseLog(logs[j]);
                            if(parsedLog.eventFragment.name==eventName){
                                if(parsedLog.args[1].patient==addressPatient){
                                    let clinic=addr[i];
                                    let doctor=parsedLog.args[1].doctor
                                    let examType=parsedLog.args[1].examType
                                    let report=parsedLog.args[1].report
                                    let isFileExam=parsedLog.args[1].isFile
                                    let dateExam=getDate(parsedLog.args[1].date)
                                    let exam={"clinic":clinic,"doctor":doctor,"examType":examType,"report":report,"isFile":isFileExam,"dateExam":dateExam}
                                    list.push(exam)

                                    
                                }
                                
                            }
                            }
                            if(list.length!=0){
                            document.getElementById("addresspatient").value=""
                            setListExams(list)
                        }else{
                            document.getElementById("addresspatient").value=""
                            handleInfo("Nessun Esame")
                            setListExams([]);
                           
                            
                        }

                        }
                        }
                        }
                          }
                    }

                      >
                     <i className="bi bi-search mr-2"></i> Cerca
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="listexam">
        {listExams.length==0?(<div></div>):(<div>
            {listExams.map((exam,index)=>(
                    <div key={index}>
                        <div className="row d-flex justify-content-center my-5 text-lg">
                            <div className="col-lg-8  mb-sm-0">
                                <div className="card text-center">
                                    <div className="card-header">
                                       <b> {exam.examType}</b>
                                    </div>
                                    <div className="card-body">
                                        <div>Clinica: {exam.clinic}</div>
                                        <div>Dottore: {exam.doctor}</div>
                                        <div>Data: {exam.dateExam
                                        }</div>
                                        {exam.isFile?(
                                            <div>  Referto: <a href={IPFSOutputPath+exam.report}> {exam.report}</a></div>
                                        ):(
                                            <div>Referto: {exam.report}</div>
                                        )}
                                        


                                    </div>
  
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>)}
        </div>
    
  </div>)
}