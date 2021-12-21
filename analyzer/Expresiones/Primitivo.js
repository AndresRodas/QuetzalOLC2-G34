class Primitivo {
    linea;
    columna;
    valor;
    tmp;
    c3d;
    lv;
    lf;

    hijos;
    ast_id;
    ast_name;

    constructor(valor, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.hijos = [{ ast_name: valor, ast_id: 0, hijos: []}]  
        this.ast_id = 0
        this.ast_name = 'Primitivo'
    }
    
    traducir(ent, arbol) {  
        
        var tmp = '', c3d = '', lv = '', lf = '', str = this.valor

        if(this.getTipo(ent, arbol) === 'STRING'){
            c3d = '//generando un string y guardandolo en el heap\n'
            tmp = new_temp()
            var ascii_vals = []
            for(let val of str){ ascii_vals.push(val.charCodeAt(0)) }
            c3d += tmp + '= H;\n'
            for(let asc of ascii_vals){
                    c3d += 'heap[(int)H] = ' + asc.toString() + ';\n'
                    c3d += 'H = H + 1;\n'
                    heap += 1
            }
            c3d += 'heap[(int)H] = -1;\nH = H + 1;\n\n'
            heap += 1  
        }
        else if(this.getTipo(ent, arbol) === 'INT' || this.getTipo(ent, arbol) === 'DOUBLE'){
            tmp = str
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
            return 'BOOL';
        }
        else if (typeof(valor) === 'string')
        {
            return 'STRING';
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return 'INT';
            }
           return 'DOUBLE';
        }
        else if (typeof(valor) === 'object')
        {
            return 'ARRAY';
        }
        else if(valor === null){
            return 'NULL';
        }
            
        return 'VOID';
    }

    getValorImplicito(ent, arbol) {
        return this.valor;
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}