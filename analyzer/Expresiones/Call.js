class Call {
    linea;
    columna;
    identificador;
    parametros;

    constructor(identificador, parametros, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.parametros = parametros;
    }
    
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
        //crear entorno
        var new_ent = new Entorno(ent, this.identificador)
        
        //buscar funcion en entorno
        if(ent.existe(this.identificador)){

            var func = ent.getSimbolo(this.identificador)

            //validar parametros
            for (let index = 0; index < this.parametros.length; index++) {

                if(this.parametros[index].getTipo(ent, arbol) === func.valor.parametros[index].tipo){
                    //se agregan variables al entorno
                    const simbolo = new Simbolo(func.valor.parametros[index].tipo, func.valor.parametros[index].id, this.linea, this.columna, this.parametros[index].getValorImplicito(ent, arbol))
                    new_ent.agregar(func.valor.parametros[index].id, simbolo)

                    /**********SYMBOL_TABLE*************/
                    arbol.setTable({
                        id: simbolo.identificador,
                        type: simbolo.tipo,
                        env: new_ent.identificador,
                        val: simbolo.valor,
                        row: simbolo.linea,
                        col: simbolo.columna
                    })

                }else{
                    arbol.setError({
                        err: 'El tipo de dato '+this.parametros[index].getTipo(ent, arbol)+' y '+func.valor.parametros[index].tipo+' no coinciden',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                    })
                }
            }

            //ejecutar instrucciones con entorno creado
            for (let inst of func.valor.acciones){
                var salida = inst.ejecutar(new_ent, arbol)
                if(salida !== undefined) {
                    if(salida.retorno !== undefined) return salida.retorno
                }  
            }
            return undefined

        }else{
            //error
            arbol.setError({
                err: 'La funcion '+this.identificador+' no existe',
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
        }
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }

    ejecutar(ent, arbol){
        this.getValorImplicito(ent, arbol)
    }
    
}