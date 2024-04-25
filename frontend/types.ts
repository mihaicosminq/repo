export type Utente = {
    username: string;
    password: string | null;
    nome: string;
    cognome: string;
    created_at: string;
    updated_at: string;
    data_nascita: string;
    email: string;
    password_digest: string;
    reset_password_token: string | null;
    reset_password_sent_at: string | null;
};

export type Prodotto = {
    id:string,
    nome_oggetto:string,
    descrizione:string,
    data_inserimento:string,
    tipo_prodotto:{
        id:string,
        tipo:string,
    }
    [key: string]: any;
}
