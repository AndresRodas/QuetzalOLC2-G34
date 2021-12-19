class AST{
    main;
    instrucciones;
    structs;
    prints;
    errores;
    simbolos;

    constructor(main, instrucciones){
        this.main = main
        this.instrucciones = instrucciones;
        this.structs = {};
        this.prints = '';
        this.errores = [];
        this.simbolos = [];
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

    getErrors(){
        return this.errores
    }

    agregar(id, simbolo){
        id = id.toLowerCase();
        simbolo.indentificador = simbolo.indentificador.toLowerCase();
        this.structs[id] = simbolo;
    }

    existe(id){
        id = id.toLowerCase();
        const value = this.structs[id]
        if (value!==undefined)
        {
            return true;
        }
        return false;
    }

    getStruct(id){
        id = id.toLowerCase();
        if (this.structs[id]!=undefined){
            return this.structs[id];
        }
        return null;
    }

    setTable(symbol){
        this.simbolos.push(symbol)
    }

    getTable(){
        return this.simbolos
    }

}