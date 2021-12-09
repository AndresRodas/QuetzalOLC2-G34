/******************************EXPORTACIONES*******************************/
%{
    // /*****************EXPRESIONES**********************/
    // const { Primitivo } = require ('../Expresiones/Primitivo')
    //const { Operacion, Operador } = require ('../Expresiones/Operacion')
    // const { Path } = require ('./Expresiones/Path')
    // const { SourcePath } = require ('./Expresiones/SourcePath')
    // const { Variable } = require ('./Expresiones/Variable')
    // const { If } = require ('./Expresiones/If')
    // const { Call } = require ('./Expresiones/Call')
    // const { Substring } = require ('./Expresiones/Substring')
    // const { UpperCase } = require ('./Expresiones/UpperCase')
    // const { LowerCase } = require ('./Expresiones/LowerCase')
    // const { ToString } = require ('./Expresiones/ToString')
    // const { ToNumber } = require ('./Expresiones/ToNumber') 

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
"boolean"               return 'Tboolean'
"struct"                return 'Tstruct'
"float"                 return 'Tfloat'
"void"                  return 'Tvoid'

/* NATIVES */
"pow"                   return 'pow'
"sqrt"                  return 'sqrt'
"sin"                   return 'sin'
"cos"                   return 'cos'
"tan"                   return 'tan'
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
"else"                  return 'Relse'
"elseif"                return 'Relseif'
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
%left 'quest'
%left 'lor' 
%left 'land'
%left 'igual' 'dif' 'men_que' 'men_ig' 'may_que' 'may_ig'
%left 'mas' 'menos'
%left 'concat' 'repet'
%left 'por' 'div'
%left 'mod'
%right 'lnot'
%left UMINUS

/* operator associations and precedence */
%start BEGIN        
%%                   

/******************************SINTACTICO***************************************/ 

BEGIN: GLOBAL EOF { 
                        $$ = $1;
                        return $$;
                }          
;

GLOBAL : GLOBAL STRUCTS
        | GLOBAL DECLARACION
        | GLOBAL METODOS
        | GLOBAL MAIN
        | STRUCTS
        | DECLARACION
        | METODOS
        | MAIN { $$ = $1 }
;

MAIN : Tvoid Rmain p_abre p_cierra l_abre ACCIONES l_cierra { $$ = $6 }
;

ACCIONES : ACCIONES ACCION { $1.push($2); $$ = $1; }
        | ACCION { $$ = [$1] }
;

ACCION : EXPRESION pyc { $$ = $1 }
        | INSTRUCCION { $$ = $1 }
;

EXPRESION : OPERACION { $$ = $1 }
        | PRIMITIVA { $$ = $1 }
;

OPERACION : EXPRESION mas EXPRESION     { $$ = new Operacion($1,$3,'SUMA', @1.first_line, @1.first_column); }
        | EXPRESION menos EXPRESION     { $$ = new Operacion($1,$3,'RESTA', @1.first_line, @1.first_column); }
        | EXPRESION por EXPRESION       { $$ = new Operacion($1,$3,'MULTIPLICACION', @1.first_line, @1.first_column); }
        | EXPRESION div EXPRESION       { $$ = new Operacion($1,$3,'DIVISION', @1.first_line, @1.first_column); }
        | EXPRESION mod EXPRESION       { $$ = new Operacion($1,$3,'MODULO', @1.first_line, @1.first_column); }
        | EXPRESION land EXPRESION      { $$ = new Operacion($1,$3,'AND', @1.first_line, @1.first_column); }
        | EXPRESION lor EXPRESION       { $$ = new Operacion($1,$3,'OR', @1.first_line, @1.first_column); }
        | EXPRESION igual EXPRESION     { $$ = new Operacion($1,$3,'IGUAL_IGUAL', @1.first_line, @1.first_column); }
        | EXPRESION dif EXPRESION       { $$ = new Operacion($1,$3,'DIRENTE_QUE', @1.first_line, @1.first_column); }
        | EXPRESION may_ig EXPRESION    { $$ = new Operacion($1,$3,'MAYOR_IGUA_QUE', @1.first_line, @1.first_column); }
        | EXPRESION may_que EXPRESION   { $$ = new Operacion($1,$3,'MAYOR_QUE', @1.first_line, @1.first_column); }
        | EXPRESION men_ig EXPRESION    { $$ = new Operacion($1,$3,'MENOR_IGUA_QUE', @1.first_line, @1.first_column); }
        | EXPRESION men_que EXPRESION   { $$ = new Operacion($1,$3,'MENOR_QUE', @1.first_line, @1.first_column); }
        | EXPRESION concat EXPRESION    { $$ = new Operacion($1,$3,'CONCAT', @1.first_line, @1.first_column); }
        | EXPRESION repet EXPRESION     { $$ = new Operacion($1,$3,'REPET', @1.first_line, @1.first_column); }
        | menos EXPRESION %prec UMINUS  { $$ = new Operacion($1,$3,'MENOS_UNARIO', @1.first_line, @1.first_column); }
        | lnot EXPRESION %prec UMINUS   { $$ = new Operacion($2,'','NOT', @1.first_line, @1.first_column); }
        | EXPRESION quest EXPRESION d_puntos EXPRESION { $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column); }
        | CALL
        | p_abre EXPRESION p_cierra     { $$ = $2 }
;

PRIMITIVA : num         { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
        | StringLiteral { $$ = new Primitivo($1.split("\"")[1], @1.first_line, @1.first_column); }
        | CharLiteral   { $$ = new Primitivo($1.split("\'")[1], @1.first_line, @1.first_column); }
        | Tnull         { $$ = new Primitivo(null, @1.first_line, @1.first_column); }
        | Rtrue         { $$ = new Primitivo(true, @1.first_line, @1.first_column); }
        | Rfalse        { $$ = new Primitivo(false, @1.first_line, @1.first_column); }
        | id
;

INSTRUCCION : IMPRESION { $$ = $1 }
        | CONDICION
        | CICLO
;

IMPRESION : println p_abre EXPRESION p_cierra pyc{ $$ = new Print( $3, @1.first_line, @1.first_column, true) }
        | print p_abre EXPRESION p_cierra pyc{ $$ = new Print( $3, @1.first_line, @1.first_column, false) }
;