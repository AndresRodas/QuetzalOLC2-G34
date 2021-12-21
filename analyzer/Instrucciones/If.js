class If{
    linea;
    columna;
    expresion;
    acciones;
    else_if;
    else_ins;

    hijos;
    ast_name;
    ast_id;
                
    constructor(expresion, acciones, else_if, else_ins, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.acciones = acciones;
        this.else_if = else_if;
        this.else_ins = else_ins;
        this.ast_id = 0
        this.ast_name = 'If'
        this.hijos = [
            {ast_name: 'If', ast_id: 0, hijos: []},
            expresion,
            {ast_name: '{', ast_id: 0, hijos: []}
        ]
        this.hijos.concat(acciones)
        this.hijos.push({ast_name: '}', ast_id: 0, hijos: []})
        if (else_if != null) this.hijos.concat(else_if)
        if (else_ins != null) this.hijos.push(else_ins)
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {
        if(this.expresion.getTipo(ent, arbol) === 'BOOL'){

            //si es verdadero
            if(this.expresion.getValorImplicito(ent, arbol)){
                //crear entorno
                var new_ent = new Entorno(ent, 'IF')
                for(let acci of this.acciones){
                    var salida = acci.ejecutar(new_ent, arbol)
                    if(salida !== undefined) {
                        if(salida.retorno !== undefined) return salida
                    }
                }
                return undefined
            }
            //si es falso se valida si hay elseif
            else if (this.else_if !== null){
                //crear entorno
                var new_ent = new Entorno(ent, 'ELSE IF')
                //para cada elseif
                for (let element of this.else_if) {
                    var salida = element.ejecutar(new_ent, arbol)
                    if(salida !== undefined) {
                        if(salida.retorno !== undefined) return salida
                        else if(salida === true) return undefined     
                    }
                }

            }
            //si es falso se valida si hay else
            if(this.else_ins !== null){
                //crear entorno
                var new_ent = new Entorno(ent, 'ELSE')

                var salida = this.else_ins.ejecutar(new_ent, arbol)
                if(salida !== undefined) {
                    if(salida.retorno !== undefined) return salida
                }
            } 
            
        }
        else{
            arbol.setError({
                err: 'El tipo '+this.expresion.getTipo(ent, arbol)+' es incorrecto para una condicional',
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
        }
    }

}