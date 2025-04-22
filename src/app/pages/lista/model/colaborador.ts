export class Colaborador {
    _id?: string;
    nome!: string;
    email?: string;
    telefone?: string;

    static novo(): Colaborador {
        return {
            nome: '',
            email: '',
            telefone: ""
        };
    }
}
