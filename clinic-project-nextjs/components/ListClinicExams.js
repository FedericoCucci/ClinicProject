import { contractAddress, abi,ipfsConfig} from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"



export default function ListClinicExams(){

    const { isWeb3Enabled, account, Moralis,chainId: chainIdHex } =useMoralis()

    const chainId = parseInt(chainIdHex)
    const address= chainId in contractAddress ? contractAddress[chainId][0] : null
    const IPFSOutputPath=ipfsConfig["IPFSOutputPath"]

    const [listExams, setListExams] = useState([])
    const [listConfirm, setListConfirm] = useState([])
    const [listID, setListID] = useState([])

    const { runContractFunction: getClinicExamsByPatient } = useWeb3Contract({
        abi: abi,
        contractAddress: address, 
        functionName: "getClinicExamsByPatient",
        params: {patient:account},
    })


    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [listExams])

    async function updateUIValues() {
  
        const list = await getClinicExamsByPatient()
        setListExams(list[0])
        setListConfirm(list[1])
        setListID(list[2])
    }

    const { runContractFunction: confirmClinicExam, isFetching, isLoading } =
        useWeb3Contract();

    const dispatch = useNotification()


    const handleSuccess = async (tx) => {
        dispatch({
            type: "success",
            message: "Referto firmato correttamente!",
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

   

    function getDate(x) {
        const myDate = new Date(x * 1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:"numeric",minute: "numeric", second:"numeric" };
        return myDate.toLocaleDateString("it-IT",options);
    }

    return(
    <div>
        {listExams.length==0?(<h1 className="text-center text-red-600 mt-5"><i className="bi bi-file-x-fill mr-2"></i> Nessun Esame inserito</h1>):(
            <div>
                {listExams.map((exam,index)=>(
                    <div key={index}>
                        <div className="row d-flex justify-content-center my-5 text-lg">
                            <div className="col-lg-8  mb-sm-0">
                                <div className="card text-center">
                                    <div className="card-header">
                                       <b> {exam.examType}</b>
                                    </div>
                                    <div className="card-body">
                                        <div>Dottore: {exam.doctor}</div>
                                        <div>Data: {getDate(exam.date)
                                        }</div>
                                        {exam.isFile?(
                                            <div>  Referto: <a href={IPFSOutputPath+exam.report}> {exam.report}</a></div>
                                        ):(
                                            <div>Referto: {exam.report}</div>
                                        )}
                                        {listConfirm[index]?(
                                            <h4 className="text-green-600 italic">Esame firmato da dottore e paziente</h4>
                                        ):(
                                            <button className="btn btn-primary mt-2" idexam={listID[index].toString()}
                                                onClick={async(e)=>{
                                                    const idExam=e.currentTarget.getAttribute("idexam")
                                                    const options = {
                                                        abi: abi,
                                                        contractAddress: address,
                                                        functionName: "confirmClinicExam",
                                                        params: {
                                                            idExam:idExam,
                                                        },
                                                    };
                                                    await confirmClinicExam({ params: options,
                                                    onSuccess:()=>handleSuccess(),
                                                    onError:()=>handleError("Qualcosa è andato storto")
                                                    })
                                                }}
                                                disabled={isLoading || isFetching ||!isWeb3Enabled}
                                                ><i className="bi bi-pen mr-2"></i>Firma</button>
                                            )}


                                    </div>
  
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )
     
        }
     </div>)
}