"use client"
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import PasswordChecklist from "react-password-checklist"
import {isValid} from "zod";
import {bootstrap} from "next/dist/build/output/log";
import {useRouter} from "next/navigation";


const RegisterPage = () => {

    const initialState = {
        username: "",
        password: "",
        nome: "",
        cognome: "",
        data_nascita: new Date().toISOString().split('T')[0],
        email: ""
    };

    const [formState, setFormState] = useState({
        username: "",
        password: "",
        nome: "",
        cognome: "",
        data_nascita: new Date().toISOString().split('T')[0],
        email: "",
    });
    const router = useRouter();

    useEffect(() => {
        const handleBeforeUnload = () => {
            setFormState({...initialState});
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormState({...initialState});
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/utentes", formState);
            console.log(response.data);
            router.push("/home")
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div className="bg-white w-full h-full">
            <form onSubmit={handleSubmit}>
                <div className="container mb-5 mt-5 pt-5">
                    <div className="row">
                        <div className="col-12">
                            <h1>Registrazione</h1>
                        </div>
                    </div>
                    <div className="row mt-5 mb-4">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <div className="form-group">
                                    <input placeholder="Username" type="text" name="username" value={formState.username}
                                           onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="form-group">
                                    <input type="password" data-bs-input className="form-control input-password"
                                           placeholder="Password" name="password" value={formState.password}
                                           onChange={handleInputChange}/>
                                    <div className="password-strength-meter">
                                        <small className="form-text text-muted"
                                               data-bs-short-pass="Password molto debole"
                                               data-bs-bad-pas="Password debole"
                                               data-bs-good-pass="Password sicura"
                                               data-bs-strong-pass="Password molto sicura"
                                        >Inserisci almeno 8 caratteri e una lettera maiuscola</small>
                                        <div className="password-meter progress rounded-0 position-absolute">
                                            <div className="row position-absolute w-100 m-0">
                                                <div className="col-3 border-start border-end border-white"></div>
                                                <div className="col-3 border-start border-end border-white"></div>
                                                <div className="col-3 border-start border-end border-white"></div>
                                                <div className="col-3 border-start border-end border-white"></div>
                                            </div>
                                            <div className="progress-bar bg-muted" role="progressbar"
                                                 aria-valuenow={formState.password.length * 10}
                                                 aria-valuemin={0} aria-valuemax={100}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <input type="text" placeholder="Cognome" name="cognome"
                                                   value={formState.cognome}
                                                   onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12">
                                        <div className="form-group">
                                            <input type="text" placeholder="Nome" name="nome" value={formState.nome}
                                                   onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <input type="date" placeholder="Data di nascita" name="data_nascita"
                                                   value={formState.data_nascita}
                                                   onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12">
                                        <div className="form-group">
                                            <input placeholder="Email" type="email" name="email"
                                                   value={formState.email}
                                                   onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <span className="py-2 underline text-blue-400 hover:text-blue-600 cursor-pointer"
                                          onClick={() => {
                                              router.push("/login");
                                          }}>Hai già un account?</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button className="btn btn-primary mt-3" type="submit">Invia</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default RegisterPage