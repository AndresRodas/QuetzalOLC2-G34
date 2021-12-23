class Declaracion{
    linea;
    columna;
    tipo;
    lista_id;
    expresion;

    tmp;
    c3d;
    lv;
    lf;

    hijos;
    ast_id;
    ast_name;
                
    constructor(tipo, lista_id, expresion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.lista_id = lista_id;
        this.expresion = expresion;
        this.hijos = [{ast_name: tipo, ast_id: 0, hijos: []}]
        for(let id of this.lista_id){
            this.hijos.push({ast_name: id, ast_id: 0, hijos: []})
        }
        if(expresion != null) this.hijos.push(expresion)
        this.ast_id = 0
        this.ast_name = 'Declaracion'
    }

    traducir(ent, arbol) {
        var tmp = '', c3d = '', lv = '', lf = '';
        if(this.expresion != null){
            this.expresion.traducir(ent, arbol)
            c3d = this.expresion.c3d
            for(let id of this.lista_id){
                c3d += '//GUARDANDO VARIABLE//\nstack[(int)'+stack+'] = '+this.expresion.tmp+';\n';
                tabla3d[id] = stack
                stack++  
            }
        }
        else{
            for(let id of this.lista_id){
                c3d += '//GUARDANDO VARIABLE//\nstack[(int)'+stack+'] = 0;\n';
                tabla3d[id] = stack
                stack++  
            }
        }
        

        this.tmp = tmp
        this.c3d = c3d
        this.lv = lv
        this.lf = lf
        arbol.setMainC3D(this.c3d)

    }

    ejecutar(ent, arbol) {
        for (const id of this.lista_id) {
            if (!ent.existe(id)) {
                if(this.expresion === null){
                    const simbolo = new Simbolo(this.tipo, id, this.linea, this.columna, this.getValorDefault())
                    ent.agregar(id, simbolo)
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
                    if(this.tipo === this.expresion.getTipo(ent,arbol)){
                        const simbolo = new Simbolo(this.tipo, id, this.linea, this.columna, this.expresion.getValorImplicito(ent,arbol))
                        ent.agregar(id, simbolo)
                        
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
        this.traducir(ent, arbol)
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