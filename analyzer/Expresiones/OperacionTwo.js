class OperacionTwo {
    linea;
    columna;
    op_izquierda;
    operador;

    constructor(op_izquierda, operador, linea, columna){

        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.operador = operador;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return 'INT';
            }
           return 'DOUBLE';
        }
            
        return 'VOID';
    }
    

    getValorImplicito(ent, arbol) {
        if (this.operador !== 'MENOS_UNARIO' && this.operador !== 'NOT'){
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = 1;
    
            //suma
            if (this.operador == 'SUMASUMA')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    return op1 + op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    return { err: 'Tipos de datos no permitidos realizando una suma' }
                }
            }
            //resta
            else if (this.operador == 'RESTARESTA')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    return op1 - op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una resta");
                    return { err: 'Tipos de datos no permitidos realizando una resta' }
                }
            }
            

        }else{
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == 'MENOS_UNARIO')
            {
                if (typeof(op1)==="number")
                {
                    return -1* op1;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una operación unaria");
                    return { err: 'Tipos de datos no permitidos realizando una operación unaria' }
                }
            }
            else
            {
                if (typeof(op1)==="boolean")
                {
                    return !op1;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una operación unaria");
                    return { err: 'Tipos de datos no permitidos realizando una operación unaria' }
                }
            }
        }
        return null;
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
}