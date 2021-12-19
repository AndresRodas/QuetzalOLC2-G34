/******************************EXPORTACIONES*******************************/
%{
//metodos codigo tres direcciones
var cont_t = 0, cont_l = 0, heap = 0, stack = 0;

function new_temp(){
        cont_t += 1
        return 't'+String(cont_t)
}
function new_label(){
        cont_l += 1
        return 'L'+String(cont_l)
}

%}
 
/******************************LEXICO***************************************/ 

%lex 
%options case-sensitive
escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}

acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

%%

/* COMMENTS */
\s+                                 // se ignoran espacios en blanco
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

/* ARITHMETIC OPERATOR */
"+"                     return 'mas'
"-"                     return 'menos'
"*"                     return 'por'
"/"                     return 'div' 
"%"                     return 'mod'
"++"                    return 'masmas'
"--"                    return 'menosmenos'        

/* RELATIONAL OPERATOR */
"=="                   return 'igual'
"!="                   return 'dif'
"<="                   return 'men_ig'
"<"                    return 'men_que'
">="                   return 'may_ig'
">"                    return 'may_que'

/* LOGIC OPERATOR */

"&&"                   return 'land'
"||"                   return 'lor'
"!"                    return 'lnot'

/* SYMBOL */
"["                     return 'c_abre'
"]"                     return 'c_cierra'
"{"                     return 'l_abre'
"}"                     return 'l_cierra'
"("                     return 'p_abre'
")"                     return 'p_cierra'
":"                     return 'd_puntos'
"."                     return 'punto'
";"                     return 'pyc'
","                     return 'coma'
"="                     return 'eq'
"?"                     return 'quest'
"#"                     return 'copy'
"&"                     return 'concat'
"^"                     return 'repet'

/* TYPES */
"null"                  return 'Tnull'
"int"                   return 'Tint'
"double"                return 'Tdouble'
"boolean"               return 'Tboolean'
"char"                  return 'Tchar'
"String"                return 'Tstring'
"struct"                return 'Tstruct'
"float"                 return 'Tfloat'
"void"                  return 'Tvoid'

/* NATIVES */
"pow"                   return 'pow'
"sqrt"                  return 'sqrt'
"sin"                   return 'sin'
"cos"                   return 'cos'
"tan"                   return 'tan'
"log10"                 return 'log'
"println"               return 'println'
"print"                 return 'print'
"caracterOfPosition"    return 'posstr'
"subString"             return 'substr'
"length"                return 'length'
"toUppercase"           return 'upper'
"toLowercase"           return 'lower'
"parse"                 return 'parse'
"toInt"                 return 'toint'
"toDouble"              return 'todouble'
"string"                return 'str'
"typeof"                return 'typeof'

/* RESERVED WORDS */
"function"              return 'Rfunction'
"return"                return 'Rreturn'
"if"                    return 'Rif'
"else if"               return 'Relseif'
"else"                  return 'Relse'
"switch"                return 'Rswitch'
"case"                  return 'Rcase'
"break"                 return 'Rbreak'
"continue"              return 'Rcontinue'
"default"               return 'Rdefault'
"while"                 return 'Rwhile'
"do"                    return 'Rdo'
"for"                   return 'Rfor'
"in"                    return 'Rin'
"begin"                 return 'Rbegin'
"end"                   return 'Rend'
"push"                  return 'Rpush'
"pop"                   return 'Rpop'
"main"                  return 'Rmain'
"true"                  return 'Rtrue'
"false"                 return 'Rfalse'

/* LITERALS */
(([0-9]+"."[0-9]*)|("."[0-9]+))|[0-9]+      return 'num';
{stringliteral}                             return 'StringLiteral'
{charliteral}                               return 'CharLiteral'
[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9_ñÑ]*               return 'id'; 

//errores
. {  
    console.log('Error léxico')
}

<<EOF>>     return 'EOF'

/lex

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'id'
%left 'punto'
%left 'quest'
%left 'lor' 
%left 'land'
%left 'igual' 'dif' 'men_que' 'men_ig' 'may_que' 'may_ig'
%left 'mas' 'menos' 'concat'
%left 'por' 'div' 'repet'
%left 'mod'
%left 'masmas'
%left 'menosmenos'
%right 'lnot'
%left UMINUS

/* operator associations and precedence */
%start BEGIN        
%%                   

/******************************SINTACTICO***************************************/ 

BEGIN: CODE EOF { 
                        //creacion ast
                        var Ast = new AST($1.main, $1.global)
                        //seteo de variables
                        cont_t = 0;
                        cont_l = 0;
                        return Ast;
                }          
;

CODE : GLOBAL_ENV MAIN GLOBAL_ENV       { $$ = { global: $1.concat($3), main: $2 } }
        | GLOBAL_ENV MAIN               { $$ = { global: $1, main: $2 } }
        | MAIN GLOBAL_ENV               { $$ = { global: $2, main: $1 } }
        | MAIN                          { $$ = { global: [], main: $1 } }
;

GLOBAL_ENV : GLOBAL_ENV DECLARACION     { $1.push($2); $$ = $1 }
        | GLOBAL_ENV FUNCION            { $1.push($2); $$ = $1 }
        | DECLARACION                   { $$ = [$1] }
        | FUNCION                       { $$ = [$1] }
;

MAIN : Tvoid Rmain p_abre p_cierra l_abre ACCIONES l_cierra { $$ = new Main($6, @1.first_line, @1.first_column) }
;

ACCIONES : ACCIONES ACCION { $1.push($2); $$ = $1; }
        | ACCION { $$ = [$1] }
;

ACCION : INSTRUCCION { $$ = $1 }
;

EXPRESION : OPERACION { $$ = $1 }
        | PRIMITIVA { $$ = $1 }
;

INSTRUCCION : IMPRESION         { $$ = $1 }
        | PRE_DECLARACION       { $$ = $1 }
        | CONDICION             { $$ = $1 }
        | CICLO                 { $$ = $1 }
        | TO_CONTINUE           { $$ = $1 }
        | INC_DECRE_INSTR       { $$ = $1 }
        | RETURN                { $$ = $1 }
        | PUSH                  { $$ = $1 }
        | POP pyc               { $$ = $1 } 
;

PRE_DECLARACION : DECLARACION   { $$ = $1 }
                | ASIGNACION    { $$ = $1 }
;

OPERACION : EXPRESION mas EXPRESION             {       
                                                $$ = new Operacion($1,$3,'SUMA', @1.first_line, @1.first_column); 
                                                var new_tmp = new_temp(), c3d = '';
                                                c3d = $1.c3d+$3.c3d+new_tmp+'='+$1.tmp+'+'+$3.tmp+'\n'
                                                $$.traducir(new_tmp,c3d,'','');
                                                }
        | EXPRESION menos EXPRESION             { 
                                                $$ = new Operacion($1,$3,'RESTA', @1.first_line, @1.first_column); 
                                                var new_tmp = new_temp(), c3d = '';
                                                c3d = $1.c3d+$3.c3d+new_tmp+'='+$1.tmp+'-'+$3.tmp+'\n'
                                                $$.traducir(new_tmp,c3d,'','');
                                                }
        | EXPRESION por EXPRESION               { 
                                                $$ = new Operacion($1,$3,'MULTIPLICACION', @1.first_line, @1.first_column);
                                                var new_tmp = new_temp(), c3d = '';
                                                c3d = $1.c3d+$3.c3d+new_tmp+'='+$1.tmp+'*'+$3.tmp+'\n'
                                                $$.traducir(new_tmp,c3d,'','');
                                                }
        | EXPRESION div EXPRESION               { 
                                                $$ = new Operacion($1,$3,'DIVISION', @1.first_line, @1.first_column); 
                                                var new_tmp = new_temp(), c3d = '';
                                                c3d = $1.c3d+$3.c3d+new_tmp+'='+$1.tmp+'/'+$3.tmp+'\n'
                                                $$.traducir(new_tmp,c3d,'','');  
                                                }
        | EXPRESION mod EXPRESION               { 
                                                $$ = new Operacion($1,$3,'MODULO', @1.first_line, @1.first_column); 
                                                }
        | EXPRESION land EXPRESION              { 
                                                $$ = new Operacion($1,$3,'AND', @1.first_line, @1.first_column); 
                                                var c3d = $1.c3d + $1.lv + ':\n' + $3.c3d
                                                var lv = $3.lv
                                                var lf = $1.lf + ',' + $3.lf
                                                $$.traducir('', c3d, lv, lf);
                                                }
        | EXPRESION lor EXPRESION               { 
                                                $$ = new Operacion($1,$3,'OR', @1.first_line, @1.first_column); 
                                                var c3d = $1.c3d + $1.lf + ':\n' + $3.c3d
                                                var lv = $1.lv + ',' + $3.lv
                                                var lf = $3.lf
                                                $$.traducir('', c3d, lv, lf);
                                                }
        | EXPRESION igual EXPRESION             { 
                                                $$ = new Operacion($1,$3,'IGUAL_IGUAL', @1.first_line, @1.first_column); 
                                                var lv = new_label(), lf = new_label(),c3d = '';
                                                c3d = $1.c3d + $3.c3d + 'if '+$1.tmp + '==' + $3.tmp + ' goto '+ lv + '\n' + 'goto '+ lf +'\n'                                              
                                                $$.traducir('', c3d, lv, lf);
                                                }
        | EXPRESION dif EXPRESION               {       
                                                $$ = new Operacion($1,$3,'DIFERENTE_QUE', @1.first_line, @1.first_column); 
                                                var lv = new_label(), lf = new_label(),c3d = '';
                                                c3d = $1.c3d + $3.c3d + 'if '+$1.tmp + '!=' + $3.tmp + ' goto '+ lv + '\n' + 'goto '+ lf +'\n'                                              
                                                $$.traducir('', c3d, lv, lf);
                                                }
        | EXPRESION may_ig EXPRESION            { 
                                                $$ = new Operacion($1,$3,'MAYOR_IGUA_QUE', @1.first_line, @1.first_column); 
                                                var lv = new_label(), lf = new_label(), c3d = '';
                                                c3d = $1.c3d + $3.c3d + 'if ' + $1.tmp+ '>=' + $3.tmp + ' goto '+ lv +'\n' + 'goto '+ lf + '\n' 
                                                $$.traducir('', c3d, lv, lf)
                                                }
        | EXPRESION may_que EXPRESION           { 
                                                $$ = new Operacion($1,$3,'MAYOR_QUE', @1.first_line, @1.first_column); 
                                                var lv = new_label(), lf = new_label(), c3d = '';
                                                c3d = $1.c3d + $3.c3d + 'if ' + $1.tmp+ '>' + $3.tmp + ' goto '+ lv +'\n' + 'goto '+ lf + '\n' 
                                                $$.traducir('', c3d, lv, lf)
                                                }
        | EXPRESION men_ig EXPRESION            { 
                                                $$ = new Operacion($1,$3,'MENOR_IGUA_QUE', @1.first_line, @1.first_column); 
                                                var lv = new_label(), lf = new_label(), c3d = '';
                                                c3d = $1.c3d + $3.c3d + 'if ' + $1.tmp+ '<=' + $3.tmp + ' goto '+ lv +'\n' + 'goto '+ lf + '\n' 
                                                $$.traducir('', c3d, lv, lf)
                                                }
        | EXPRESION men_que EXPRESION           { 
                                                $$ = new Operacion($1,$3,'MENOR_QUE', @1.first_line, @1.first_column); 
                                                var lv = new_label(), lf = new_label(), c3d = '';
                                                c3d = $1.c3d + $3.c3d + 'if ' + $1.tmp+ '<' + $3.tmp + ' goto '+ lv +'\n' + 'goto '+ lf + '\n' 
                                                $$.traducir('', c3d, lv, lf)
                                                }
        | EXPRESION concat EXPRESION            { 
                                                $$ = new Operacion($1,$3,'CONCAT', @1.first_line, @1.first_column); 
                                                }
        | EXPRESION repet EXPRESION             { 
                                                $$ = new Operacion($1,$3,'REPET', @1.first_line, @1.first_column); 
                                                }
        | menos EXPRESION %prec UMINUS          { 
                                                $$ = new Operacion($1,$3,'MENOS_UNARIO', @1.first_line, @1.first_column); 
                                                var new_tmp = new_temp(), c3d = '';
                                                c3d = $2.c3d + new_tmp +'='+'0'+'-'+ $2.tmp + '\n'
                                                $$.traducir(new_tmp,c3d,'','');
                                                }
        | lnot EXPRESION %prec UMINUS           { 
                                                $$ = new Operacion($2,'','NOT', @1.first_line, @1.first_column); 
                                                $$.traducir($2.tmp, $2.c3d, $2.lf, $2.lv);
                                                }
        | EXPRESION quest EXPRESION d_puntos EXPRESION { 
                                                $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column); 
                                                }
        | p_abre EXPRESION p_cierra     { $$ = $2 }
;

PRIMITIVA : num                         { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); $$.traducir($1,'','','') }
        | StringLiteral                 { 
                                        $$ = new Primitivo($1.split("\"")[1], @1.first_line, @1.first_column); 
                                        var c3d = '//generando un string y guardandolo en el heap\n', str = $1.split("\"")[1], ascii_vals = [], tmp = new_temp();
                                        for(let val of str){ ascii_vals.push(val.charCodeAt(0)) }
                                        c3d += tmp + '= H;\n'
                                        for(let asc of ascii_vals){
                                                c3d += 'heap[H] = ' + asc.toString() + ';\n'
                                                c3d += 'H = H + 1;\n'
                                                heap += 1
                                        }
                                        c3d += 'heap[H] = -1;\nH = H + 1;\n\n'
                                        heap += 1
                                        $$.traducir(tmp, c3d, '', '')
                                        }
        | CharLiteral                   { $$ = new Primitivo($1.split("\'")[1], @1.first_line, @1.first_column); $$.traducir($1,'','','') }
        | Tnull                         { $$ = new Primitivo(null, @1.first_line, @1.first_column); $$.traducir($1,'','','')}
        | Rtrue                         { $$ = new Primitivo(true, @1.first_line, @1.first_column); $$.traducir($1,'','','')}
        | Rfalse                        { $$ = new Primitivo(false, @1.first_line, @1.first_column); $$.traducir($1,'','','')}
        | id                            { $$ = new Acceso($1, @1.first_line, @1.first_column); }
        | CALL                          { $$ = $1 }
        | ACCESO_ID id                  {
                                        $1.push($2)
                                        $$ = new AccesoStruct($1, @1.first_line, @1.first_column);
                                        }
        | ACCESO_ARR                    { $$ = $1 }
;

DECLARACION : TIPO LISTA_ID eq EXPRESION pyc                            { $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column) }
        | TIPO LISTA_ID pyc                                             { $$ = new Declaracion($1, $2, null, @1.first_line, @1.first_column) }
        | Tstruct id l_abre LISTA_ATR l_cierra pyc                      { $$ = new DeclaracionStruct($2, $4, @1.first_line, @1.first_column) }
        | id id eq id p_abre LISTA_EXP p_cierra pyc                     { $$ = new DecVarStruct($1, $2, $4, $6, @1.first_line, @1.first_column) }
        | TIPO c_abre c_cierra id eq c_abre LISTA_EXP c_cierra pyc      { $$ = new DeclaracionArr($1, $4, $7, @1.first_line, @1.first_column) }
;

LISTA_ATR : LISTA_ATR DECLARACION               { $1.push($2); $$ = $1 }
        | LISTA_ATR id id pyc                   { $1.push(new Declaracion($2, [$3], null, @1.first_line, @1.first_column)); $$ = $1 }
        | DECLARACION                           { $$ = [$1] }
        | id id pyc                             { $$ = [new Declaracion($1, [$2], null, @1.first_line, @1.first_column)] }
;

LISTA_ID : LISTA_ID coma id             { $1.push($3); $$ = $1 }
        | id                            { $$ = [$1] }
;

TIPO : Tint             { $$ = 'INT' }
        | Tdouble       { $$ = 'DOUBLE' }
        | Tboolean      { $$ = 'BOOL' }
        | Tchar         { $$ = 'STRING' }
        | Tstring       { $$ = 'STRING' }
        | Tfloat        { $$ = 'DOUBLE' }
;

ASIGNACION : id eq EXPRESION pyc                                { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column) }
        | ACCESO_ID id eq EXPRESION pyc                         {
                                                                $1.push($2) 
                                                                $$ = new AsignacionStruct($1, $4, @1.first_line, @1.first_column) 
                                                                }
        | id c_abre EXPRESION c_cierra eq EXPRESION pyc         { $$ = new AsignacionArr($1, $3, $6, @1.first_line, @1.first_column) }
;

ACCESO_ID : ACCESO_ID id punto               { $1.push($2); $$ = $1 }
        | id punto                           { $$ = [$1] }
;

CALL : DERIVADA         { $$ = $1 }
        | NATIVA        { $$ = $1 }
;

DERIVADA : id p_abre LISTA_EXP p_cierra                 { $$ = new Call($1, $3, @1.first_line, @1.first_column) }
;

LISTA_EXP : LISTA_EXP coma EXPRESION                    { $1.push($3); $$ = $1 }
        | EXPRESION                                     { $$ = [$1] }
        |                                               { $$ = [] }
;

LISTA_PARAMETROS : LISTA_PARAMETROS coma TIPO id        { $1.push( { tipo: $3, id: $4 } ); $$ = $1 }
                | TIPO id                               { $$ = [ { tipo: $1, id: $2 } ] }
                |                                       { $$ = [] }
;

ACCESO_ARR : id c_abre EXPRESION c_cierra                       { $$ = new AccesoArr($1, $3, null, @1.first_line, @1.first_column) }
        | id c_abre EXPRESION d_puntos EXPRESION c_cierra       { $$ = new AccesoArr($1, $3, $5, @1.first_line, @1.first_column) }
        | id c_abre Rbegin d_puntos EXPRESION c_cierra          { $$ = new AccesoArr($1, $3, $5, @1.first_line, @1.first_column) }
        | id c_abre EXPRESION d_puntos Rend c_cierra            { $$ = new AccesoArr($1, $3, $5, @1.first_line, @1.first_column) }
        | id c_abre Rbegin d_puntos Rend c_cierra               { $$ = new AccesoArr($1, $3, $5, @1.first_line, @1.first_column) }
;

NATIVA : POW           { $$ = $1 }
        | SQRT          { $$ = $1 }
        | SIN           { $$ = $1 }
        | COS           { $$ = $1 }
        | TAN           { $$ = $1 }
        | LOG           { $$ = $1 }
        | PARSE         { $$ = $1 }
        | TO_NATIVE     { $$ = $1 }
        | POS_STR       { $$ = $1 }
        | SUB_STR       { $$ = $1 }
        | LENGTH        { $$ = $1 }
        | TO_UPPER      { $$ = $1 }
        | TO_LOWER      { $$ = $1 }
        | POP           { $$ = $1 }

;

POW : pow p_abre EXPRESION coma EXPRESION p_cierra      { $$ = new Pow($3, $5, @1.first_line, @1.first_column) }
;

SQRT : sqrt p_abre EXPRESION p_cierra                   { $$ = new Sqrt($3, @1.first_line, @1.first_column) }
;

SIN : sin p_abre EXPRESION p_cierra                     { $$ = new Sin($3, @1.first_line, @1.first_column) }
;

COS : cos p_abre EXPRESION p_cierra                     { $$ = new Cos($3, @1.first_line, @1.first_column) }
;

TAN : tan p_abre EXPRESION p_cierra                     { $$ = new Tan($3, @1.first_line, @1.first_column) }
;

LOG : log p_abre EXPRESION p_cierra                     { $$ = new Log($3, @1.first_line, @1.first_column) }
;

PARSE : TIPO punto parse p_abre EXPRESION p_cierra      { $$ = new Parse( $1, $5, @1.first_line, @1.first_column) }
;

TO_NATIVE : toint p_abre EXPRESION p_cierra             { $$ = new ToNative( $1, $3, @1.first_line, @1.first_column ) }
        | todouble p_abre EXPRESION p_cierra            { $$ = new ToNative( $1, $3, @1.first_line, @1.first_column ) }
        | str p_abre EXPRESION p_cierra                 { $$ = new ToNative( $1, $3, @1.first_line, @1.first_column ) }
        | typeof p_abre EXPRESION p_cierra              { $$ = new ToNative( $1, $3, @1.first_line, @1.first_column ) }
;

POS_STR : EXPRESION punto posstr p_abre EXPRESION p_cierra { $$ = new PositionStr( $1, $5, @1.first_line, @1.first_column) }
;

SUB_STR : EXPRESION punto substr p_abre EXPRESION coma EXPRESION p_cierra { $$ = new SubStr($1, $5, $7, @1.first_line, @1.first_column) }
;

LENGTH : EXPRESION punto length p_abre p_cierra         { $$ = new Length( $1, @1.first_line, @1.first_column ) }
;

TO_UPPER : EXPRESION punto upper p_abre p_cierra        { $$ = new Upper( $1, @1.first_line, @1.first_column ) }
;

TO_LOWER : EXPRESION punto lower p_abre p_cierra        { $$ = new Lower( $1, @1.first_line, @1.first_column ) }
;

PUSH : id punto Rpush p_abre EXPRESION p_cierra pyc     { $$ = new Push( $1, $5, @1.first_line, @1.first_column ) }
;

POP : id punto Rpop p_abre p_cierra                     { $$ = new Pop( $1, @1.first_line, @1.first_column ) }
;


CONDICION : IF          { $$ = $1 }
        | SWITCH        { $$ = $1 }
;

IF :    Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra ELSE_IF ELSE     { $$ = new If( $3, $6, $8, $9, @1.first_line, @1.first_column ) }
        | Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra ELSE_IF        { $$ = new If( $3, $6, $8, null, @1.first_line, @1.first_column ) }
        | Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra ELSE           { $$ = new If( $3, $6, null, $8, @1.first_line, @1.first_column ) }
        | Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra                { $$ = new If( $3, $6, null, null, @1.first_line, @1.first_column ) }
        | Rif p_abre EXPRESION p_cierra ACCION                                  { $$ = new If( $3, $5, null, null, @1.first_line, @1.first_column ) }
;

ELSE_IF : ELSE_IF Relseif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra    { $1.push(new Elseif( $4, $7, @1.first_line, @1.first_column)); $$ = $1 }   
        | Relseif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra            { $$ = [new Elseif( $3, $6, @1.first_line, @1.first_column)] }
;       

ELSE : Relse l_abre ACCIONES l_cierra              { $$ = new Else($3, @1.first_line, @1.first_column) }
;


SWITCH : Rswitch p_abre EXPRESION p_cierra l_abre LISTA_CASE DEFAULT_CASE l_cierra      { $$ = new Switch( $3, $6, $7, @1.first_line, @1.first_column ) }
;

LISTA_CASE : LISTA_CASE Rcase EXPRESION d_puntos ACCIONES Rbreak pyc    { $1.push(new Case( $3, $5, true, @1.first_line, @1.first_column)); $$ = $1; }
        | LISTA_CASE Rcase EXPRESION d_puntos ACCIONES                  { $1.push(new Case( $3, $5, false, @1.first_line, @1.first_column)); $$ = $1; }
        | Rcase EXPRESION d_puntos ACCIONES Rbreak pyc                  { $$ = [new Case( $2, $4, true, @1.first_line, @1.first_column)] }
        | Rcase EXPRESION d_puntos ACCIONES                             { $$ = [new Case( $2, $4, false, @1.first_line, @1.first_column)] }
;

DEFAULT_CASE : Rdefault d_puntos ACCIONES       { $$ = $3 }
        |                                       { $$ = null }
; 


INC_DECRE_INSTR:  id masmas             {$$ = new OperacionTwo($1,"SUMASUMA",@1.first_line, @1.first_column)}
                | id menosmenos         {$$ = new OperacionTwo($1,"RESTARESTA",@1.first_line, @1.first_column)}
;


TO_CONTINUE : Rcontinue                            { $$ = new Continue(@1.first_line, @1.first_column)}

;

CICLO : WHILE           { $$ = $1}
      | DOWHILE pyc        { $$ = $1}
;


WHILE : Rwhile p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra              {$$ = new While($3,$6,@1.first_line, @1.first_column)}
;    

DOWHILE : Rdo  l_abre ACCIONES l_cierra Rwhile p_abre EXPRESION p_cierra     {$$ = new DoWhile($7,$3,@1.first_line, @1.first_column)}
;


PREFOR : Rfor p_abre PRE_DECLARACION pyc EXPRESION pyc ACCIONES p_cierra l_abre ACCIONES l_cierra {$$ = new PFOR($3,$5,$7,$10,@1.first_line, @1.first_column)}
;

FUNCION : TIPO id p_abre LISTA_PARAMETROS p_cierra l_abre ACCIONES l_cierra       { $$ = new Function($1, $2, $4, $7, @1.first_line, @1.first_column) }
;

RETURN : Rreturn EXPRESION pyc          { $$ = new Return($2,@1.first_line, @1.first_column) }
        | Rreturn pyc                   { $$ = new Return(null,@1.first_line, @1.first_column) }
;

IMPRESION : println p_abre CONTENIDO_PRINT p_cierra pyc         { $$ = new Print( $3, @1.first_line, @1.first_column, true) }
        | print p_abre CONTENIDO_PRINT p_cierra pyc             { $$ = new Print( $3, @1.first_line, @1.first_column, false) }
;

CONTENIDO_PRINT : CONTENIDO_PRINT coma EXPRESION                { $1.push($3); $$ = $1 }
                | EXPRESION                                     { $$ = [$1] }
;