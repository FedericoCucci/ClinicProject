import { contractAddress, abi } from "../constants"

import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"


export default function FormAddDoctor(){

    const { isWeb3Enabled, account, Moralis,chainId: chainIdHex } =useMoralis()

    const chainId = parseInt(chainIdHex)
   const address= chainId in contractAddress ? contractAddress[chainId][0] : null
    const { error,runContractFunction: addDoctor, isFetching, isLoading } =
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
            message: "Qualcosa è andato storto!",
            title: "Errore",
            position: "topR",
            
        })
    }

    return(<div>
<div className="row d-flex justify-content-center">
  <div className="col-lg-8  mb-sm-0">
<div className="card text-center">
  <div className="card-header">
    Inserimento Dottore
  </div>
  <div className="card-body">
  <div className="row g-3">
    <div className="col-2">
    <label >Indirizzo</label>
    </div>
    <div className="col-7">
    <input type="text"  className="form-control" id="indirizzo" placeholder="0x0000000000000000000000000000000000000000"/>
    </div>
    <div className="col-3">
    <button type="button" className="btn btn-primary mb-3"
    onClick={async ()=>{
        let indirizzo=document.getElementById("indirizzo").value;
        const options = {
            abi: abi,
            contractAddress: address,
            functionName: "addDoctor",
            params: {
              doctor:indirizzo,
            },
          };
        await addDoctor({ params: options,
        onSuccess:(success)=>handleSuccess(),
        onError:(error)=>handleError(error)
        })
    
    }}
    disabled={isLoading || isFetching}
    >
        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div><i className="bi bi-person-fill-add"></i> Aggiungi</div>
                        )}
        
        </button>
    </div>
</div>
  </div>
 </div>
 </div>
</div>
    </div>)
}