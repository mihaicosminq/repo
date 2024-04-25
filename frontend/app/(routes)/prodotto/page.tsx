"use client"
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/lib/authContext";

interface ProdottoPageProps {
    id: string,
    nome_oggetto: string,
    index: number,
    descrizione: string,
    data_inserimento: string,
    tipo_prodotto: {
        id: string,
        tipo: string,
        created_at: string,
        updated_at: string
    }
}

const ProdottoPage: React.FC<ProdottoPageProps> = ({
                                                       id,
                                                       index,
                                                       nome_oggetto,
                                                       descrizione,
                                                       data_inserimento,
                                                       tipo_prodotto
                                                   }) => {

    const router = useRouter();
    const {currentUser} = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) {
            router.push("/login");
        } else {
            setIsLoading(false);
        }
    }, [currentUser, router]);

    if (isLoading) {
        return null;
    }

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/prodotto/${id}`);
            if (response.status === 204) {
                console.log('Prodotto deleted successfully');
                // Optionally, update the UI to reflect the deletion
            }
        } catch (error) {
            console.error('Error deleting prodotto:', error);
        }
    };

    return (
        <>
            <tr key={index}>
                <td>{index}</td>
                <td>{nome_oggetto}</td>
                <td>{descrizione}</td>
                <td>{data_inserimento}</td>
                <td>{tipo_prodotto.tipo}</td>
                <td>
                    <button onClick={() => router.push(`/editprodotto/${id}`)}>Edit</button>
                </td>
                <td scope="row">
                    <button onClick={handleDelete}>Delete</button>
                </td>
            </tr>
        </>
    );
}

export default ProdottoPage;
