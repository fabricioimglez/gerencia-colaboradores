export class Local {
    _id?: string;
    nome!: string;
    sigla? : string

    static novo(): Local {
        return {
            nome: '',
            sigla: '',
        };
    }
}