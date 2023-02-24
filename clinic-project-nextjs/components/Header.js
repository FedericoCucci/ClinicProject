import { useMoralis } from "react-moralis"
import { useEffect } from "react"
import { useRouter } from 'next/router';


export default function Header(){

    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } =useMoralis()

    const router = useRouter();
    const currentRoute = router.pathname;

    useEffect(() => {
        if (
            !isWeb3Enabled &&
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            enableWeb3()
           
        }
    }, [isWeb3Enabled])
    

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account changed to ${newAccount}`)
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

    return(<div>
        {account?(
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid ">
    <h1 className="navbar-brand text-white " > <i className="bi bi-h-square"></i> Clinic Project</h1>
      <ul className=" navbar-nav d-flex justify-content-md-evenly ">
        <li className="nav-item me-2 ms-2">
          <h4><a className={currentRoute==="/admin"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/admin">Admin</a></h4>
        </li>
        <li className="nav-item me-2 ms-2">
          <h4><a className={currentRoute==="/"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/">Dottore</a></h4>
        </li>
        <li className="nav-item me-2 ms-2">
        <h4><a className={currentRoute==="/patient"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/patient">Paziente</a></h4>
        </li>
      </ul>
       
       <div className="text-white h5">Indirizzo: {account}</div>
      

  </div>
</nav>
        ):(
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid ">
    <h1 className="navbar-brand text-white " ><i className="bi bi-h-square"></i> Clinic Project</h1>
      <ul className=" navbar-nav d-flex justify-content-md-evenly ">
        <li className="nav-item me-2 ms-2">
          <h4><a className={currentRoute==="/admin"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/admin">Admin</a></h4>
        </li>
        <li className="nav-item me-2 ms-2">
          <h4><a className={currentRoute==="/"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/">Dottore</a></h4>
        </li>
        <li className="nav-item me-2 ms-2">
        <h4><a className={currentRoute==="/patient"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/patient">Paziente</a></h4>
        </li>
      </ul>
       
        <button className="btn btn-primary" type="button" onClick={async()=>{
            await enableWeb3()
            if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected")
                
            }
        }}
        disabled={isWeb3EnableLoading}
        >Connetti</button>
      

  </div>
</nav>
        )}
        
    </div>)
}