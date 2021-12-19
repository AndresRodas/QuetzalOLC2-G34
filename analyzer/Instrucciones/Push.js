class Push{
    linea;
    columna;
    identificador;
    valor;

    constructor(identificador, valor, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.valor = valor;
    }
    
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        if(ent.existe(this.identificador)){
            var simbolo = ent.getSimbolo(this.identificador)
            if(typeof(simbolo.valor) === 'object'){
                if(this.valor.getTipo(ent, arbol) === simbolo.tipo){
                    simbolo.valor.push(this.valor.getValorImplicito(ent, arbol))
                    console.log(simbolo.valor)
                    ent.reemplazar(this.identificador, simbolo)
                }
                else{
                    arbol.setError({
                        err: 'El valor '+this.valor.getValorImplicito(ent, arbol)+' no es compatible con un arreglo tipo '+simbolo.tipo,
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                }    
            }
            else{
                arbol.setError({
                    err: 'El tipo '+simbolo.tipo+' no es compatible con la funcion Push',
                    type: 'Semántico',
                    amb: ent.identificador,
                    line: this.linea,
                    col: this.columna
                  })
            } 
        }
        else{
            arbol.setError({
                err: 'El array '+this.identificador+' no existe en el entorno actual',
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
        } 
    }
}