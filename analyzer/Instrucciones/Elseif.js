class Elseif{
    linea;
    columna;
    expresion;
    acciones;

    hijos;
    ast_name;
    ast_id;
                
    constructor(expresion, acciones, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.acciones = acciones;
        this.ast_id = 0
        this.ast_name = 'ElseIf'
        this.hijos = [
            {ast_name: 'Else If', ast_id: 0, hijos: []},
            expresion,
            {ast_name: '{', ast_id: 0, hijos: []}
        ]
        this.hijos.concat(acciones)
        this.hijos.push({ast_name: '}', ast_id: 0, hijos: []})
    }

    traducir(ent, arbol, le) {

        var tmp = '', c3d = '', lv = le, lf = '';
        this.expresion.traducir(ent, arbol)
        //condicion else if
        c3d += '//ELSE IF\n' +this.expresion.c3d + this.expresion.lv +':\n'
        arbol.setMainC3D(c3d)  
        //acciones else if
        for(let acc of this.acciones){
            acc.traducir(ent, arbol)
        }
        //salida
        c3d = '//ESCAPE ELSE IF\ngoto '+lv+';\n' + this.expresion.lf+':\n'
        arbol.setMainC3D(c3d)
    }

    ejecutar(ent, arbol) {
        if(this.expresion.getTipo(ent, arbol) === 'BOOL'){
            //valor de salida
            // var Output = ''

            if(this.expresion.getValorImplicito(ent, arbol)){

                for(let ins of this.acciones){
                    var salida = ins.ejecutar(ent, arbol)
                    if(salida !== undefined) {
                        if(salida.retorno !== undefined) return salida
                    }
                }
                return true
            }
            return false
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