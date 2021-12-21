class Asignacion{
    linea;
    columna;
    identificador;
    expresion;

    hijos;
    ast_id;
    ast_name;
                
    constructor(identificador, expresion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.expresion = expresion;
        this.hijos = [{ast_name: identificador, ast_id: 0, hijos: []}, expresion]
        this.ast_id = 0;
        this.ast_name = 'Asignacion'
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador)
            if(simbolo.getTipo(ent, arbol) === this.expresion.getTipo(ent, arbol)){
                var new_valor = this.expresion.getValorImplicito(ent, arbol)
                simbolo.valor = new_valor
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
                err: 'La variable '+this.identificador+' no existe en el entorno actual',
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
        }

    }
}