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
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary text-xl" data-bs-theme="dark">
  <div className="container-fluid ">
    <h1 className="navbar-brand text-white " > <i className="bi bi-h-square mx-2"></i> Clinic Project</h1>
      <ul className=" navbar-nav">
        <li className="nav-item mx-5">
          <div><a className={currentRoute==="/admin"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/admin">Admin</a></div>
        </li>
        <li className="nav-item mx-5">
          <div><a className={currentRoute==="/"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/">Dottore</a></div>
        </li>
        <li className="nav-item mx-5 ">
        <div><a className={currentRoute==="/patient"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/patient">Paziente</a></div>
        </li>
      </ul>
       
       <div className="text-white">Indirizzo: {account}</div>
      

  </div>
</nav>
        ):(
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary text-xl" data-bs-theme="dark">
  <div className="container-fluid ">
    <h1 className="navbar-brand text-white " ><i className="bi bi-h-square mx-2"></i> Clinic Project</h1>
      <ul className=" navbar-nav ">
        <li className="nav-item mx-5">
          <div><a className={currentRoute==="/admin"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/admin">Admin</a></div>
        </li>
        <li className="nav-item mx-5">
          <div><a className={currentRoute==="/"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/">Dottore</a></div>
        </li>
        <li className="nav-item mx-5">
        <div><a className={currentRoute==="/patient"?("nav-link text-white active"):("nav-link text-white")} aria-current="page" href="/patient">Paziente</a></div>
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