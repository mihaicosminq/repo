import ProdottoPage from "@/app/(routes)/prodotto/page";
import axios from "axios";
import {Prodotto} from "@/types"
import HomeComponent from "@/app/(routes)/home/page";
import {useAuth} from "@/lib/authContext";



const LayoutProdotto = async() =>{

    const response = await axios.get<Prodotto[]>("http://localhost:3000/prodotto")
    const data = response.data as Prodotto[];

    return (
        <div className="w-full h-full bg-white flex  justify-center">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrizione</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((prodotto: Prodotto, index: number) => (
                        <>
                        <ProdottoPage
                            key={index}
                            index={index}
                            id={prodotto.id}
                            nome_oggetto={prodotto.nome_oggetto}
                            data_inserimento={prodotto.data_inserimento}
                            tipo_prodotto={prodotto.tipo_prodotto as {
                                id: string;
                                tipo: string;
                                created_at: string;
                                updated_at: string;
                            }}
                            descrizione={prodotto.descrizione}
                        />
                        </>
                    ))}
                    </tbody>
                </table>
        </div>
)
}

export default LayoutProdotto