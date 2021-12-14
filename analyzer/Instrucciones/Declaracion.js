class Declaracion{
    linea;
    columna;
    tipo;
    lista_id;
    expresion;
                
    constructor(tipo, lista_id, expresion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.lista_id = lista_id;
        this.expresion = expresion;
        
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        for (const id of this.lista_id) {
            if (!ent.existe(id)) {
                if(this.expresion === null){
                    const simbolo = new Simbolo(this.tipo, id, this.linea, this.columna, this.getValorDefault())
                    ent.agregar(id, simbolo)
                }
                else{
                    if(this.tipo === this.expresion.getTipo(ent,arbol)){
                        const simbolo = new Simbolo(this.tipo, id, this.linea, this.columna, this.expresion.getValorImplicito(ent,arbol))
                        ent.agregar(id, simbolo)
                    }
                    else{
                        arbol.setError({
                            err: 'No se puede asignar una variable tipo '+this.expresion.getTipo(ent, arbol)+' a una tipo '+this.tipo,
                            type: 'Semántico',
                            amb: ent.identificador,
                            line: this.linea,
                            col: this.columna
                          })
                    }
                    
                }
            }
            else{
                arbol.setError({
                    err: 'Ya existe una variable llamada '+id,
                    type: 'Semántico',
                    amb: ent.identificador,
                    line: this.linea,
                    col: this.columna
                  })
            }
        }
    }

    getValorDefault(){
        if(this.tipo === 'INT'){
            return 0
        }
        else if(this.tipo === 'DOUBLE'){
            return 0.0
        }
        else if(this.tipo === 'BOOL'){
            return false
        }
        else if(this.tipo === 'STRING'){
            return ''
        }
        return null
    }

}