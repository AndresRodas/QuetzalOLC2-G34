class Operacion {
    linea;
    columna;
    op_izquierda;
    op_derecha;
    operador;

    tmp;
    c3d;
    lv;
    lf;

    constructor(op_izquierda,op_derecha, operacion, linea, columna){

        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;

        this.tmp = ''
        this.c3d = ''
        this.lv = ''
        this.lf = ''
    }
    traducir(tmp, c3d, lv, lf) {
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para una suma',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para una resta',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para una multiplicación',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
                }
            }
            //division
            else if (this.operador == 'DIVISION')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    if(op2===0){
                        arbol.setError({
                            err: 'Resultado indefinido, no se puede dividir sobre cero',
                            type: 'Semántico',
                            amb: ent.identificador,
                            line: this.linea,
                            col: this.columna
                          })
                        return null
                    }
                    return op1 / op2;
                }
                else
                {
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para una división',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
                }
            }
            //modulo
            else if (this.operador == 'MODULO')
            {
                if (typeof(op1)==="number" && typeof(op2)==="number")
                {
                    if(op2===0){
                        arbol.setError({
                            err: 'Resultado indefinido, no se puede calcular modulo sobre cero',
                            type: 'Semántico',
                            amb: ent.identificador,
                            line: this.linea,
                            col: this.columna
                          })
                        return null
                    }
                    return op1 % op2;
                }
                else
                {
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para un módulo',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para un and',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para un or',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para un >=',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para un >',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para un <=',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para un <',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para una concatenación',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipos de dato '+typeof(op1)+', '+typeof(op2)+' incompatibles para una repetición',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipo de dato '+typeof(op1)+' incompatible para una operacion unaria',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
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
                    arbol.setError({
                        err: 'Tipo de dato '+typeof(op1)+' incompatible para una operacion unaria',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
                }
            }
        }
        return null;
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
}