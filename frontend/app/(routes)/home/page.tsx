"use client"

import {useRouter} from "next/navigation";
import {useAuth} from "@/lib/authContext";

interface UtenteProps {
    username: string,
    password: string | null,
    nome: string,
    cognome: string,
    created_at: string,
    updated_at: string,
    data_nascita: string,
    email: string,
    password_digest: string,
    reset_password_token: string | null,
    reset_password_sent_at: string | null
}


const HomeComponent = ({username, password, nome, cognome, data_nascita, email}: UtenteProps) => {

    const {currentUser, login} = useAuth();
    const router = useRouter();

    if (!currentUser) {
        router.push("/login")
    }
    return (

        <tr>
            <th scope="row">
                <button onClick={() => router.push(`/edit/${username}`)}>Edit
                </button>
            </th>
            <td>{username}</td>
            <td>{nome}</td>
            <td>{cognome}</td>
            <td>{email}</td>
        </tr>

    )
}

export default HomeComponent