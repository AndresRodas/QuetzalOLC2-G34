class AsignacionArr{
    linea;
    columna;
    identificador;
    index;
    expresion;

    hijos;
    ast_name;
    ast_id;
                
    constructor(identificador, index, expresion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.index = index;
        this.expresion = expresion;
        this.ast_id = 0
        this.ast_name = 'AsigArray'
        this.hijos = [{ast_name: identificador, ast_id: 0, hijos: []}, index, {ast_name: '=', ast_id: 0, hijos: []}, expresion]
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {
        var indice = this.index.getValorImplicito(ent,arbol)
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador)
            if(indice > 0 && indice < simbolo.valor.length){
                if(simbolo.getTipo(ent, arbol) === this.expresion.getTipo(ent, arbol)){
                    var new_valor = this.expresion.getValorImplicito(ent, arbol)
                    simbolo.valor[indice] = new_valor
                    ent.reemplazar(this.identificador, simbolo)
                }
                else{
                    arbol.setError({
                        err: 'No se puede asignar una variable tipo '+this.expresion.getTipo(ent, arbol)+' a una tipo '+simbolo.getTipo(ent, arbol),
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                }
            }
            else{
                arbol.setError({
                    err: 'El indice '+indice+' sobre pasa los límites o es incorrecto',
                    type: 'Semántico',
                    amb: ent.identificador,
                    line: this.linea,
                    col: this.columna
                  })
            }
        }
        else{
            arbol.setError({
                err: 'El arreglo '+this.identificador+' no existe en el entorno actual',
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
        }
        this.traducir(ent, arbol)
    }
}