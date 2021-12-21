class Function{
    linea;
    columna;
    tipo;
    identificador;
    parametros;
    acciones;

    hijos;
    ast_name;
    ast_id;
                
    constructor(tipo, identificador, parametros, acciones, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo
        this.identificador = identificador
        this.parametros = parametros
        this.acciones = acciones
        this.ast_id = 0
        this.ast_name = 'Function'
        this.hijos = [
            {ast_name: tipo, ast_id: 0, hijos: []},
            {ast_name: identificador, ast_id: 0, hijos: []}
        ].concat(acciones)
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {
        //guardar en entorno global
        if(!ent.existe(this.identificador)){
            var func = {
                parametros: this.parametros,
                acciones: this.acciones
            }
            var simbolo = new Simbolo(this.tipo,this.identificador, this.linea, this.linea, func)
            ent.agregar(this.identificador, simbolo)

        }else{
            arbol.setError({
                err: 'Ya existe una función/variable llamada '+this.identificador,
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
        }
        console.log(ent)
    }

}