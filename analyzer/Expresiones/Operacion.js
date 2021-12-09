class Operacion {
    linea;
    columna;
    op_izquierda;
    op_derecha;
    operador;

    constructor(op_izquierda,op_derecha, operacion, linea, columna){

        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
        if (this.operador !== 'MENOS_UNARIO' && this.operador !== 'NOT'){
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);
    
            //suma
            if (this.operador == 'SUMA')
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
            else if (this.operador == 'RESTA')
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
            //multiplicación
            else if (this.operador == 'MULTIPLICACION')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    return op1 * op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una multiplicación");
                    return { err: 'Tipos de datos no permitidos realizando una multiplicación' }
                }
            }
            //division
            else if (this.operador == 'DIVISION')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    if(op2===0){
                        console.log("Resultado indefinido, no puede ejecutarse división sobre cero");
                        return { err: 'Resultado indefinido, no puede ejecutarse división sobre cero' }
                    }
                    return op1 / op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una división");
                    return { err: 'Tipos de datos no permitidos realizando una división' }
                }
            }
            //modulo
            else if (this.operador == 'MODULO')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    if(op2===0){
                        console.log("Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        return { err: 'Resultado indefinido, no puede ejecutarse operación sobre cero' }
                    }
                    return op1 % op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando un modulo");
                    return { err: 'Tipos de datos no permitidos realizando un modulo' }
                }
            }
            //and
            else if (this.operador == 'AND')
            {
                if (typeof(op1)==="boolean" && typeof(op2)==="boolean")
                {
                    if (op1 && op2)
                    {
                        return true;
                    }
                    return false
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando un and");
                    return { err: 'Tipos de datos no permitidos realizando un and' }
                }
                
            }
            //or
            else if (this.operador == 'OR')
            {
                if (typeof(op1)==="boolean" && typeof(op2)==="boolean")
                {
                    if (op1 || op2)
                    {
                        return true;
                    }
                    return false
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando un or");
                    return { err: 'Tipos de datos no permitidos realizando un or' }
                }   
            }
            //igual
            else if (this.operador == 'IGUAL_IGUAL')
            {
                if (op1 === op2)
                {
                    return true;
                }
                return false
            }
            //diferente
            else if (this.operador == 'DIFERENTE_QUE')
            {
                if (op1 != op2)
                {
                    return true;
                }
                return false
            }
            //mayor o igual que
            else if (this.operador == 'MAYOR_IGUA_QUE')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    if (op1 >= op2)
                    {
                        return true;
                    }
                    return false
                    }
                else
                {
                    console.log("Error de tipos de datos no permitidos");
                    return { err: 'Tipos de datos no permitidos realizando un >=' }
                }
            }
            //mayor que
            else if (this.operador == 'MAYOR_QUE')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    if (op1 > op2)
                    {
                        return true;
                    }
                    return false
                    }
                else
                {
                    console.log("Error de tipos de datos no permitidos");
                    return { err: 'Tipos de datos no permitidos realizando un >' }
                }
            }
            //menor o igual que
            else if (this.operador == 'MENOR_IGUA_QUE')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    if (op1 <= op2)
                    {
                        return true;
                    }
                    return false
                    }
                else
                {
                    console.log("Error de tipos de datos no permitidos");
                    return { err: 'Tipos de datos no permitidos realizando un <=' }
                }
            }
            //menor que
            else if (this.operador == 'MENOR_QUE')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    if (op1 < op2)
                    {
                        return true;
                    }
                    return false
                    }
                else
                {
                    console.log("Error de tipos de datos no permitidos");
                    return { err: 'Tipos de datos no permitidos realizando un <' }
                }
            }
            //concatenacion
            else if (this.operador == 'CONCAT')
            {
                if (typeof(op1)==="string" && typeof(op2)==="string")
                {
                    return op1 + op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una concatenación");
                    return { err: 'Tipos de datos no permitidos realizando una concatenación' }
                }
            }
            //repeticion
            else if (this.operador == 'REPET')
            {
                if (typeof(op1)==="string" && typeof(op2)==="number")
                {
                    return op1.repeat(op2);
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una repetición");
                    return { err: 'Tipos de datos no permitidos realizando una repetición' }
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