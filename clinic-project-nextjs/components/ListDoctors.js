import { contractAddress, abi } from "../constants"

import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"



export default function ListDoctors(){

    const { isWeb3Enabled,chainId: chainIdHex } =useMoralis()

    const chainId = parseInt(chainIdHex)
    const address= chainId in contractAddress ? contractAddress[chainId][0] : null

    const [listDoctors, setListDoctors] = useState([])

    const { runContractFunction: getListDoctors } = useWeb3Contract({
        abi: abi,
        contractAddress: address, 
        functionName: "getListDoctors",
        params: {},
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
    }, [listDoctors])

    async function updateUIValues() {
  
        const listDoctorsFromCall = await getListDoctors()
        setListDoctors(listDoctorsFromCall)
    }
    const { runContractFunction: removeDoctor, isFetching, isLoading } =
        useWeb3Contract();

    const dispatch = useNotification()


    const handleSuccess = async (tx) => {
        dispatch({
            type: "success",
            message: "Dottore rimosso correttamente!",
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

    return(
    <div>
        {listDoctors.length==0?(<h1 className="text-center text-red-600"><i className="bi bi-person-x-fill mr-2"></i> Nessun Dottore inserito</h1>):(<div className="row d-flex justify-content-center my-5 text-lg">
            <div className="col-lg-8  mb-sm-0">
                <div className="card text-center">
                    <div className="card-header">
                        Lista Dottori
                    </div>
                    <div className="card-body">
                        <ul className="list-group ">
                            {listDoctors.map((doctor)=>(
                                <li className="list-group-item" key={doctor}>{doctor} <button className="btn btn-danger mx-2" addressdoctor={doctor}
                                    onClick={async(e)=>{
                                        const addressDoctor=e.currentTarget.getAttribute("addressdoctor")
                                        const options = {
                                            abi: abi,
                                            contractAddress: address,
                                            functionName: "removeDoctor",
                                            params: {
                                            doctor:addressDoctor,
                                            },
                                        };
                                        await removeDoctor({ params: options,
                                            onSuccess:()=>handleSuccess(),
                                            onError:()=>handleError("Qualcosa è andato storto")
                                        })
                                    }}
                                    disabled={isLoading || isFetching ||!isWeb3Enabled}
                                    ><i className="bi bi-trash3 mr-2"></i> Elimina </button></li>
                            ))}


  
 
                        </ul>
                    </div>
                </div>
            </div>
        </div>)}
       
    </div>)
}