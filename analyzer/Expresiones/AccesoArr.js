class AccesoArr {
    linea;
    columna;
    identificador;
    exp1;
    exp2;

    hijos;
    ast_name;
    ast_id;

    constructor(identificador, exp1, exp2, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.hijos = [
            {ast_name: identificador, ast_id: 0, hijos: []},
            {ast_name: '[', ast_id: 0, hijos: []},
        ]
        if (exp1 === 'begin') this.hijos.push({ast_name: 'begin', ast_id: 0, hijos: []})
        else if(exp1 != null) this.hijos.push(exp1)
        if (exp2 === 'end') this.hijos.push({ast_name: 'end', ast_id: 0, hijos: []})
        else if (exp2 != null) this.hijos.push(exp2)
        this.hijos.push({ast_name: ']', ast_id: 0, hijos: []})
        this.ast_name = 'AccessArray'
        this.ast_id = 0
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
            //un acceso normal - retorna valor
            if(this.exp2 === null){
                if(this.exp1.getTipo(ent, arbol) === 'INT'){
                    return simbolo.valor[this.exp1.getValorImplicito(ent, arbol)]
                }
                else{
                    //error indice incorrecto
                    arbol.setError({
                        err: 'El indice '+this.exp1.getValorImplicito(ent, arbol)+' es de un tipo incorrecto',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
                }
            }
            //un acceso doble - retorna arreglo
            else{
                var index1 = 0
                var index2 = 0
                if (this.exp1 === 'begin'){
                    index1 = 0
                }else{
                    //arreglo 1
                    if (this.exp1.getTipo(ent, arbol) === 'INT'){
                        index1 = this.exp1.getValorImplicito(ent, arbol)
                    } 
                    else{
                        arbol.setError({
                            err: 'El indice '+this.exp1.getValorImplicito(ent, arbol)+' es del tipo incorrecto',
                            type: 'Semántico',
                            amb: ent.identificador,
                            line: this.linea,
                            col: this.columna
                          })
                        return null
                    }
                }
                if (this.exp2 === 'end'){
                    index2 = simbolo.valor.length-1
                }else{
                    //arreglo 2
                    if (this.exp2.getTipo(ent, arbol) === 'INT') index2 = this.exp2.getValorImplicito(ent, arbol)
                    else{
                        arbol.setError({
                            err: 'El indice '+this.exp2.getValorImplicito(ent, arbol)+' es del tipo incorrecto',
                            type: 'Semántico',
                            amb: ent.identificador,
                            line: this.linea,
                            col: this.columna
                        })
                        return null
                    }
                }
                //Comprobando rangos
                if(index1 < 0 || index2 >= simbolo.valor.length ){
                    arbol.setError({
                        err: 'Los indices '+index1+' y '+index2+' estan fuera del rango ',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                    })
                    return null
                }
                else{
                    return simbolo.valor.slice(index1,index2+1)
                }               
            }    
        }
        else{
            arbol.setError({
                err: 'El arreglo '+this.identificador+' no existe',
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
            return null
        }
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}