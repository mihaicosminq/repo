"use client"
import {useRouter} from "next/navigation";
import {useAuth} from "@/lib/authContext";


const Navbar = () => {

    const router = useRouter();
    const {currentUser,logout} = useAuth();

    const wrap = () =>{
        logout()
        router.refresh()
    }

    return (
        <div className="it-header-slim-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="it-header-slim-wrapper-content">
                            <a className="d-none d-lg-block navbar-brand" href="#" onClick={() => router.push("/home")}>Logo
                                Ente</a>
                            <div className="nav-mobile">
                                <nav aria-label="Navigazione accessoria">
                                    <a className="it-opener d-lg-none" data-bs-toggle="collapse" href="#menu1a"
                                       role="button" aria-expanded="false" aria-controls="menu4">
                                        <span>Ente</span>
                                        <svg className="icon" aria-hidden="true">
                                            <use href="/bootstrap-italia/dist/svg/sprites.svg#it-expand"></use>
                                        </svg>
                                    </a>
                                    <div className="text-white flex-row flex p-2">
                                        <div className="p-2 hover:text-blue-500 cursor-pointer " onClick={() => router.push("/home")}>
                                            <span>Utenti</span>
                                        </div>
                                        <div className="p-2 hover:text-blue-500 cursor-pointer " onClick={() => router.push("/prodotto")}>
                                            <span>Prodotti</span>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                            <div className="it-header-slim-right-zone">
                                <div className="it-access-top-wrapper">
                                    {currentUser? <div className="flex flex-row">
                                    <div>{currentUser.username}</div>
                                        <div>
                                        <button className="btn btn-primary btn-sm" onClick={()=>wrap()}>logout</button>
                                        </div>
                                    </div>
                                    : <a className="btn btn-primary btn-sm" href="#"
                                        onClick={() => router.push("/login")}>Accedi</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar