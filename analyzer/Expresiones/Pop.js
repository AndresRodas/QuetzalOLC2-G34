class Pop{
    linea;
    columna;
    identificador;

    constructor(identificador, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
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

    ejecutar(ent, arbol){
        this.getValorImplicito(ent, arbol)
    }

    getValorImplicito(ent, arbol) {
        if(ent.existe(this.identificador)){
            var simbolo = ent.getSimbolo(this.identificador)
            if(typeof(simbolo.valor) === 'object'){
                return simbolo.valor.pop()
            }
            else{
                arbol.setError({
                    err: 'El tipo '+simbolo.tipo+' no es compatible con la funcion Pop',
                    type: 'Semántico',
                    amb: ent.identificador,
                    line: this.linea,
                    col: this.columna
                  })
                  return null
            } 
        }
        arbol.setError({
            err: 'El array '+this.identificador+' no existe en el entorno actual',
            type: 'Semántico',
            amb: ent.identificador,
            line: this.linea,
            col: this.columna
          })
          return null
    }
}