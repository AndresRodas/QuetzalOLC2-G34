class Primitivo {
    linea;
    columna;
    valor;

    tmp;
    c3d;
    lv;
    lf;

    constructor(valor, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;

        this.tmp = ''
        this.c3d = ''
        this.lv = ''
        this.lf = ''
    }
    
    
    traducir(tmp, c3d, lv, lf) {        
        this.tmp = tmp;
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