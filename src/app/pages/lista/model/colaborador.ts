export class Colaborador {
    _id?: string;
    nome!: string;
    email?: string;
    telefone?: string;
    id_local?: string;

    static novo(): Colaborador {
        return {
            nome: '',
            email: '',
            telefone: '',
            id_local: ''
        };
    }
}
