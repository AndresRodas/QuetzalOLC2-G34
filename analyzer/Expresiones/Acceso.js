class Acceso {
    linea;
    columna;
    identificador;

    hijos;
    ast_id;
    ast_name;

    constructor(identificador, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.hijos = [{ast_name: identificador, ast_id: 0, hijos: []}]
        this.ast_id = 0
        this.ast_name = 'Acceso'
    }
    
    traducir(ent, arbol) {
        
    }

    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'boolean')
        {
            return 'BOOL';
        }
        else if (typeof(valor) === 'string')
        {
            return 'STRING';
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return 'INT';
            }
           return 'DOUBLE';
        }
        else if (typeof(valor) === 'object')
        {
            return 'ARRAY';
        }
        else if(valor === null){
            return 'NULL';
        }    
        return 'VOID';
    }

    getValorImplicito(ent, arbol) {

        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador)
            if(Entorno.prototype.isPrototypeOf(simbolo.valor)){
                var struct = simbolo.valor.identificador+'\('
                var list_vals = Object.values(simbolo.valor.tabla)
                for (let index = 0; index < list_vals.length; index++) {
                    if (index === list_vals.length-1) struct += list_vals[index].valor.toString()+'\)'
                    else struct += list_vals[index].valor.toString()+', '
                }
                return struct
            }
            return simbolo.valor
        }
        arbol.setError({
            err: 'La variable '+this.identificador+' no existe',
            type: 'Semántico',
            amb: ent.identificador,
            line: this.linea,
            col: this.columna
          })
        return null
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}