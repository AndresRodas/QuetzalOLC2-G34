/******************************EXPORTACIONES*******************************/
%{
    // /*****************EXPRESIONES**********************/
    // const { Primitivo } = require ('./Expresiones/Primitivo')
    // const { Operacion, Operador } = require ('./Expresiones/Operacion')
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
entero                              [0-9]+("."[0-9]+)?

%%

/* COMMENTS */
\s+                                 // se ignoran espacios en blanco
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

/* ARITHMETIC OPERATOR */
"+"                     return 'mas'
"-"                     return 'menos'
"*"                     return 'por'
"/"                   return 'div' 
"%"                   return 'mod'

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
"&"                     return 'and'
"^"                     return 'exp'
"?"                     return 'quest'
"#"                     return 'copy'

/* TYPES */
"null"                  return 'null'
"int"                   return 'int'
"double"                return 'double'
"boolean"               return 'boolean'
"char"                  return 'char'
"String"                return 'string'
"boolean"               return 'boolean'
"struct"                return 'struct'
"float"                 return 'float'
"void"                  return 'void'

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

/* LITERALS */
(([0-9]+"."[0-9]*)|("."[0-9]+))|[0-9]+      return 'num';
[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9_ñÑ]*               return 'id'; 
{stringliteral}                             return 'StringLiteral'
{charliteral}                               return 'CharLiteral'

//errores
. {  
    console.log('Error léxico')
}

<<EOF>>     return 'EOF'

/lex

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'lor' 
%left 'land'
%left 'igual' 'dif' 'men_que' 'men_ig' 'may_que' 'may_ig'
%left 'mas' 'menos'
%left 'por' 'div'
%left 'mod'
%right 'lnot'
%left UMINUS

/* operator associations and precedence */
%start BEGIN        
%%                   

/******************************SINTACTICO***************************************/ 

BEGIN: ACCIONES EOF                
;

ACCIONES: ACCIONES ACCION
        | ACCION
;

ACCION : EXPRESION pyc
        | INSTRUCCION pyc
;

EXPRESION : EXPRESION mas EXPRESION
        | EXPRESION menos EXPRESION
        | EXPRESION por EXPRESION
        | EXPRESION div EXPRESION
        | EXPRESION mod EXPRESION
        | EXPRESION land EXPRESION
        | EXPRESION lor EXPRESION
        | EXPRESION igual EXPRESION
        | EXPRESION dif EXPRESION
        | EXPRESION may_ig EXPRESION
        | EXPRESION may_que EXPRESION
        | EXPRESION men_ig EXPRESION
        | EXPRESION men_que EXPRESION
        | num
        | id
;


