class Print{
    linea;
    columna;
    expresiones;
    salto;
    c3d;

    hijos;
    ast_id;
    ast_name;
                
    constructor(expresiones, linea, columna, salto){
        this.expresiones = expresiones;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
        this.c3d = ''

        this.hijos = expresiones
        this.ast_id = 0
        this.ast_name = 'Print'
    }

    traducir(ent, arbol) {

        var tmp = '', c3d = '', lv = '', lf = '';

        for(let exp of this.expresiones){

                exp.traducir(ent, arbol)

            //functions
            if (!arbol.existeFunc('print') && exp.getTipo(ent, arbol) === 'STRING' ){
                var tmp1 = new_temp(), tmp2 = new_temp(), tmp3 = new_temp(), lvl1 = new_label(), lvl2 = new_label();
                var func = '/*------IMPRIMIR------*/\nvoid printString() {\n\t'
                func += tmp1+' = P+1;\n\t'
                func += tmp2+' = stack[(int)'+tmp1+'];\n\t'+lvl2+':\n\t'
                func += tmp3+' = heap[(int)'+tmp2+'];\n\t'
                func += 'if('+tmp3+' == -1) goto '+lvl1+';\n\t'
                func += 'printf("%c", (char)'+tmp3+');\n\t'
                func += tmp2+' = '+tmp2+'+1;\n\t'
                func += 'goto '+lvl2+';\n\t'+lvl1+':\n\treturn;\n}\n\n'
                arbol.agregarFunc('print', func)
            }
            //int
            if (exp.getTipo(ent, arbol) === 'INT' || exp.getTipo(ent, arbol) === 'DOUBLE'){
                c3d += exp.c3d + '// PRINT NUMERO\n'+'printf(\"%f\", (double)'+exp.tmp+');\n\n'
            }
            //String
            else if(exp.getTipo(ent, arbol) === 'STRING'){
                tmp = new_temp()
                c3d += exp.c3d +'// PRINT STRING\n'+ tmp +' = P + '+stack+';\n'
                c3d += tmp +' = '+ tmp + ' + 1;\n'
                c3d += 'stack[(int)'+ tmp +'] = '+ exp.tmp +';\n'
                c3d += 'P = P + '+ stack +';\n'
                c3d += 'printString();\n'
                tmp = new_temp()
                c3d += tmp+' = stack[(int)P];\n'
                c3d += 'P = P - '+ stack +';\n\n'
            }
        }
        if (this.salto) c3d += 'printf(\"%c\", (char)10);\n\n'

        this.tmp = tmp
        this.c3d = c3d
        this.lv = lv
        this.lf = lf
        //arbol.setMainC3D(this.c3d)
        
    }

    ejecutar(ent, arbol) {
        var out_string = ''
        for (let exp of this.expresiones){
            var valor = exp.getValorImplicito(ent, arbol);
            if (valor !== null && valor !== undefined) out_string += valor.toString() + ' '
        }
        arbol.setPrints(out_string, this.salto)
    }
}