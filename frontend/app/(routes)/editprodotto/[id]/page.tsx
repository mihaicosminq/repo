"use client"
import React, { FormEvent,  useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Prodotto, Utente} from "@/types";


interface EditProdottoPageProps {
    params: {
        id: string
    }
}


const EditProdottoPage = ({params}: EditProdottoPageProps) => {

    const [formState, setFormState] = useState<Prodotto>({
        id:"",
        nome_oggetto: "",
        descrizione: "",
        data_inserimento: "",
        tipo_prodotto: {
            id:"",
            tipo: "",
        }
    });


    const router = useRouter();



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const keys = name.split('.');
        const key = keys[0];
        const subKey = keys[1];

        if (subKey) {
            setFormState(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    [subKey]: value,
                },
            }));
        } else {
            setFormState(prevState => ({
                ...prevState,
                [key]: value,
            }));
        }
    };



    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState);
        try {
            const response = await axios.patch(`http://localhost:3000/prodotto/${params.id}`, {
                prodotto: {
                    ...formState,
                    tipo_prodotto: {
                        ...formState.tipo_prodotto_attributes,
                        id: params.id,
                    },
                },
            });
            console.log(response.data);
            router.refresh();
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div>
            <div className="bg-white w-full h-full">
                <form onSubmit={handleSubmit}>
                    <div className="container mb-5 mt-5 pt-5">
                        <div className="row">
                            <div className="col-12">
                                <h1>Aggiorna prodotto</h1>
                            </div>
                        </div>
                        <div className="row mt-5 mb-4">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="form-group">
                                        <input placeholder="Nome prodotto" type="text" name="nome_oggetto"
                                               value={formState.nome_oggetto}
                                               onChange={handleInputChange}/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" placeholder="Descrizione" name="descrizione" value={formState.descrizione}
                                               onChange={handleInputChange}/>

                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" placeholder="Buste / Carta / Toner" name="tipo_prodotto.tipo"
                                               value={formState.tipo_prodotto.tipo}
                                               onChange={handleInputChange}/>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                        <button className="btn btn-primary mt-3" type="submit">Invia</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditProdottoPage