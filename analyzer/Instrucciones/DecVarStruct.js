class DecVarStruct{
    linea;
    columna;
    id_struct1;
    identificador;
    id_struct2;
    lista_exp;

    hijos;
    ast_name;
    ast_id;
                
    constructor( id_struct1, identificador, id_struct2, lista_exp, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.id_struct1 = id_struct1;
        this.identificador = identificador;
        this.id_struct2 = id_struct2;
        this.lista_exp = lista_exp;
        this.ast_id = 0
        this.ast_name = 'VarStruct'
        this.hijos = [
            {ast_name: id_struct1, ast_id: 0, hijos: []},
            {ast_name: identificador, ast_id: 0, hijos: []},
            {ast_name: '=', ast_id: 0, hijos: []},
            {ast_name: id_struct2, ast_id: 0, hijos: []}].concat(lista_exp)
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {
        if (this.id_struct1 === this.id_struct2) {
            //identificador
            var id = this.id_struct1

            //nuevo simbolo a agregar jeje
            // const simbolo = new Simbolo(func.valor.parametros[index].tipo, func.valor.parametros[index].id, this.linea, this.columna, this.parametros[index].getValorImplicito(ent, arbol))
            // new_ent.agregar(func.valor.parametros[index].id, simbolo)

            //validar si existe tal struct
            if(arbol.existe(id)){
                //nuevo entorno a agregar
                var new_ent = new Entorno(null, this.identificador)
                //trae simbolo de struct
                const simbolo_struct = arbol.getStruct(id)
                //trae valor de struct
                var entorno_struct = simbolo_struct.valor
                //se asignan las variables al entorno
                var atributos = Object.values(entorno_struct.tabla)
                var llaves = Object.keys(entorno_struct.tabla)
                //lista de simbolos del entorno
                if (this.lista_exp.length === atributos.length) {
                    //Recorriendo atributos
                    for (let i = 0; i < atributos.length; i++) {
                        //si son del mismo tipo
                        if(atributos[i].getTipo(entorno_struct, arbol) === this.lista_exp[i].getTipo(entorno_struct, arbol)){
                            //asignando valor
                            //atributos[i].valor = this.lista_exp[i].getValorImplicito(ent, arbol)
                            //entorno_struct.reemplazar(this.identificador, atributos[i])
                            var new_sim = new Simbolo(atributos[i].getTipo(entorno_struct, arbol),llaves[i], this.linea, this.columna,this.lista_exp[i].getValorImplicito(ent, arbol) )
                            new_ent.agregar(llaves[i], new_sim)
                        }
                        else{
                            arbol.setError({
                                err: 'Los tipos de las variables no corresponden entre sí',
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
                        err: 'La cantidad de parámetros es incorrecta',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                }

                //creando la variable y agregandola al entorno
                var simbolo = new Simbolo('STRUCT', this.identificador, this.linea, this.columna, new_ent)
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
                    err: 'No existe la estructura '+id+' en el entorno actual',
                    type: 'Semántico',
                    amb: ent.identificador,
                    line: this.linea,
                    col: this.columna
                    })
            }
        }
        else{
            arbol.setError({
                err: 'El struct '+this.id_struct1+' no coincide con '+this.id_struct2,
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