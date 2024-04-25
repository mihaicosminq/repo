"use client"
import React, {FormEvent, useState} from "react";
import axios from "axios";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {useAuth} from "@/lib/authContext";


const LoginPage = () => {

    const router = useRouter();


    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };
    const {login} = useAuth();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", formState);
            await login(formState);
            router.push("/home");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
                setErrorMessage(error.response?.data?.message || 'An error occurred');
            } else {
                console.error("Error logging in:", error);
                setErrorMessage('An unexpected error occurred');
            }
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
                <div className="bg-zinc-200 mt-20 h-[50%] w-[40%] rounded">
                    <div className="container mb-5 mt-5 pt-5 flex items-center flex-col ">
                        <div className="row">
                            <div className="col-12">
                                <h1>Login</h1>
                            </div>
                        </div>
                        <div className="row pt-2 flex flex-col items-center justify-center w-full">
                            <div className="col-4 ">
                                <div className="form-group">
                                    <input placeholder="Email" type="email" name="email" value={formState.email}
                                           onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="col-4 ">
                                <div className="form-group">
                                    <input placeholder="Password" type="password" name="password"
                                           value={formState.password} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div onClick={()=>router.push("/register")} className="text-black hover: text-blue-400 cursor-pointer">
                                <span>Non hai un account ?</span>
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
    )
}
export default LoginPage