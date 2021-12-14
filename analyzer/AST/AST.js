class AST{
    instrucciones;
    structs;
    prints;
    errores;

    constructor(instrucciones){
        this.instrucciones = instrucciones;
        this.structs = [];
        this.prints = '';
        this.errores = [];
    }

    setPrints(toPrint, jump){
        if (jump) this.prints += toPrint + '\n'
        else this.prints += toPrint
    }

    getPrints(){
        return this.prints
    }

    setError(error_){
        this.errores.push(error_)
    }
}