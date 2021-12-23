class DeclaracionStruct{
    linea;
    columna;
    identificador;
    lista_atr;

    hijos;
    ast_name;
    ast_id;
                
    constructor(identificador, lista_atr, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.lista_atr = lista_atr;
        this.ast_id = 0
        this.ast_name = 'DeclaraStruct'
        this.hijos = [{ast_name: identificador, ast_id: 0, hijos: []}].concat(lista_atr)        
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {

        if (!arbol.existe(this.identificador)) {    
            //creando entorno con variables
            var entorno_struct = new Entorno(null, this.identificador)
            //agregando los atributos
            for(let dec of this.lista_atr){
                dec.ejecutar(entorno_struct, arbol)
            }
            //agregando entorno a simbolo struct
            const simbolo = new Simbolo('STRUCT', this.identificador, this.linea, this.columna, entorno_struct)
            arbol.agregar(this.identificador, simbolo)
            /**********SYMBOL_TABLE*************/
            var simval = simbolo.valor
            if(Entorno.prototype.isPrototypeOf(simval)){
                var tmp_val = simval.identificador+'( '
                for(let val of Object.keys(simval.tabla)){
                    tmp_val+= val+' '
                }
                tmp_val += ')'
                simval = tmp_val
            }
            arbol.setTable({
                id: simbolo.identificador,
                type: simbolo.tipo,
                env: ent.identificador,
                val: simval,
                row: simbolo.linea,
                col: simbolo.columna
            })
        }
        else{
            arbol.setError({
                err: 'Ya existe un struct llamado '+id,
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
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