class Acceso {
    linea;
    columna;
    identificador;
    tipo;

    tmp;
    c3d;
    lv;
    lf;

    hijos;
    ast_id;
    ast_name;

    constructor(identificador, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.hijos = [{ast_name: identificador, ast_id: 0, hijos: []}]
        this.ast_id = 0
        this.ast_name = 'Acceso'
        this.tipo = ''
    }
    
    traducir(ent, arbol) {
        var tmp = '', c3d = '', lv = '', lf = '';
        
        if(tabla3d[this.identificador] != undefined){
            tmp = new_temp()
            c3d += '//ACCESO\n'+tmp + ' = stack[(int)'+tabla3d[this.identificador]+'];\n'
        }

        this.tmp = tmp
        this.c3d = c3d
        this.lv = lv
        this.lf = lf
    }

    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'boolean')
        {   
            if (this.tipo === '') this.tipo = 'BOOL';
            return 'BOOL';
        }
        else if (typeof(valor) === 'string')
        {
            if (this.tipo === '') this.tipo = 'STRING';
            return 'STRING';
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                if (this.tipo === '') this.tipo = 'INT';
                return 'INT';
            }
            if (this.tipo === '') this.tipo = 'DOUBLE';
            return 'DOUBLE';
        }
        else if (typeof(valor) === 'object')
        {
            if (this.tipo === '') this.tipo = 'ARRAY';
            return 'ARRAY';
        }
        else if(valor === null){
            if (this.tipo === '') this.tipo = 'NULL';
            return 'NULL';
        }    
        if (this.tipo === '') this.tipo = 'VOID';
        return 'VOID';
    }

    getValorImplicito(ent, arbol) {
        //console.log(ent)
        //console.log(this.identificador)
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador)
            // if(Entorno.prototype.isPrototypeOf(simbolo.valor)){
            //     var struct = simbolo.valor.identificador+'\('
            //     var list_vals = Object.values(simbolo.valor.tabla)
            //     for (let index = 0; index < list_vals.length; index++) {
            //         if (index === list_vals.length-1) struct += list_vals[index].valor.toString()+'\)'
            //         else struct += list_vals[index].valor.toString()+', '
            //     }
            //     return struct
            // }
            return simbolo.valor
        }
        arbol.setError({
            err: 'La variable '+this.identificador+' no existe',
            type: 'Semántico',
            amb: ent.identificador,
            line: this.linea,
            col: this.columna
          })
        return null
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}