class AST{
    main;
    instrucciones;
    funcionesC3D;
    mainC3D;
    C3D;
    structs;
    prints;
    errores;
    simbolos;

    hijos;
    ast_id;
    ast_name;

    constructor(main, instrucciones){
        this.main = main
        this.instrucciones = instrucciones;
        this.structs = {};
        this.prints = '';
        this.errores = [];
        this.simbolos = [];
        this.funcionesC3D = {};
        this.mainC3D = ''
        this.C3D = ''
        this.hijos = [{ hijos: this.instrucciones, ast_id: 0, ast_name: 'Declaraciones'}, this.main]
        this.ast_id = 0
        this.ast_name = 'AST'
    }

    setMainC3D(main){
        this.mainC3D += main 
    }

    setHeaders(){
        var header = "/*------HEADER------*/\n#include <stdio.h>\n#include <math.h>\n\n"
        header += "double heap[30101999];\ndouble stack[30101999];\ndouble P;\ndouble H;\n\n"
        header += this.setVars('t', cont_t) + this.setVars('L', cont_l) + '\n'
        this.setC3D(header)
    }

    setVars(letra, numero){
        var vars = 'double '
        for (let index = 0; index < numero; index++) {
            vars += letra+index.toString()+', ' 
        }
        vars += letra+numero+';\n'
        return vars
    }

    agregarFunc(id, code){
        id = id.toLowerCase();
        this.funcionesC3D[id] = code;
    }

    existeFunc(id){
        id = id.toLowerCase();
        const value = this.funcionesC3D[id]
        if (value!==undefined)
        {
            return true;
        }
        return false;
    }

    setC3D(code){
        this.C3D += code
    }

    getC3D(){
        return this.C3D
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
        console.log(id, simbolo)
        id = id.toLowerCase();
        simbolo.indentificador = simbolo.identificador.toLowerCase();
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

    OrdenarC3D(){
        //agregando funciones
        for (let func of Object.values(this.funcionesC3D)){
            this.setC3D(func)
        }
        //agregando main
        var main = '/*------main------*/\nvoid main() {\nP = 0; H = 0;\n\n' + this.mainC3D + 'return;\n}'
        this.setC3D(main)
    }

    Clean(){
        this.main = null;
        this.instrucciones = null;
        this.structs = {};
        this.prints = '';
        this.errores = [];
        this.simbolos = [];
        this.funcionesC3D = {};
        this.mainC3D = '';
        this.C3D = '';
    }

}