// Assuming this is your HomePageLayout component
import axios from "axios";
import HomeComponent from "@/app/(routes)/home/page";
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

const HomePageLayout = async () => {

    const res = await axios.get("http://localhost:3000/utentes");
    const utente = res.data
    return (
        <div>
            <div className="w-full h-full bg-white flex  justify-center">
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Cognome</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {utente.map((utente: UtenteProps, index: number) => {
                            return (

                                <HomeComponent key={index} username={utente.username} password={utente.password}
                                               nome={utente.nome}
                                               cognome={utente.cognome} created_at={utente.created_at}
                                               updated_at={utente.created_at} data_nascita={utente.data_nascita}
                                               email={utente.email} password_digest={utente.password_digest}
                                               reset_password_token={utente.reset_password_token}
                                               reset_password_sent_at={utente.reset_password_sent_at}/>

                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomePageLayout;
