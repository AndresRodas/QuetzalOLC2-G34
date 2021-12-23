class For{
    linea;
    columna;
    declaracion;
    expresion;
    instruccion;
    acciones;

    hijos;
    ast_id;
    ast_name;

    constructor(declaracion, expresion, instruccion, acciones, linea, columna){
        this.declaracion = declaracion
        this.expresion = expresion
        this.instruccion = instruccion
        this.acciones = acciones
        this.linea = linea;
        this.columna = columna;
      
        this.ast_id = 0
        this.ast_name = 'For'
        this.hijos = []
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {
        //es dec
        if(Declaracion.prototype.isPrototypeOf(this.declaracion)){
            //valor salida
            let cont = 0
            //crear entorno for
            var ent_for = new Entorno(ent, 'FOR')
            //declaracion variable
            this.declaracion.ejecutar(ent_for, arbol);
            //ciclo
            while (this.expresion.getValorImplicito(ent_for, arbol) && cont < 2000) {
                //acciones
                for(let acc of this.acciones){
                    acc.ejecutar(ent_for, arbol)
                }
                //instruccion salida
                this.instruccion.ejecutar(ent_for, arbol)
                cont += 1
            }
        }
        //es id
        else{
            //recorriendo expresion
            for( let exp of this.expresion.getValorImplicito(ent, arbol)){
                //crear entorno for
                var ent_for = new Entorno(ent, 'FOR')
                //creando variable
                const simbolo = new Simbolo('STRING', this.declaracion, this.linea, this.columna, exp)
                ent_for.agregar(this.declaracion, simbolo)
                //acciones
                for(let acc of this.acciones){
                    acc.ejecutar(ent_for, arbol)
                }
            }

        }


    }

}