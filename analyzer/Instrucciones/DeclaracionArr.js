class DeclaracionArr{
    linea;
    columna;
    tipo;
    identificador;
    expresiones;
                
    constructor(tipo, identificador, expresiones, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.identificador = identificador;
        this.expresiones = expresiones;
        
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
            if (!ent.existe(this.identificador)) {
                var temp_array = []
                //recorrer arreglos
                for(let exp of this.expresiones){
                    if(this.tipo === exp.getTipo(ent,arbol)){
                        temp_array.push(exp.getValorImplicito(ent, arbol))
                    }else{
                        arbol.setError({
                            err: 'No se puede asignar la variable '+exp.getValorImplicito(ent, arbol)+' a un arreglo de tipo '+this.tipo,
                            type: 'Semántico',
                            amb: ent.identificador,
                            line: this.linea,
                            col: this.columna
                          })
                          return
                    }
                }     
                const simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, temp_array)
                ent.agregar(this.identificador, simbolo)
                /**********SYMBOL_TABLE*************/
                arbol.setTable({
                    id: simbolo.identificador,
                    type: simbolo.tipo,
                    env: ent.identificador,
                    val: simbolo.valor,
                    row: simbolo.linea,
                    col: simbolo.columna
                })
            }
            else{
                arbol.setError({
                    err: 'Ya existe una variable llamada '+this.identificador,
                    type: 'Semántico',
                    amb: ent.identificador,
                    line: this.linea,
                    col: this.columna
                  })
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