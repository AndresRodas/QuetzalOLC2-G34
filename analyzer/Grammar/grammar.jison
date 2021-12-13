/******************************EXPORTACIONES*******************************/
%{
  

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
%left 'punto'
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
        | DECLARACION { $$ = $1 }
        | METODOS
        | MAIN { $$ = $1 }
;

MAIN : Tvoid Rmain p_abre p_cierra l_abre ACCIONES Rreturn pyc l_cierra { $$ = $6 }
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

INSTRUCCION : IMPRESION         { $$ = $1 }
        | PRE_DECLARACION       { $$ = $1 }
        | CONDICION             { $$ = $1 }
        | FUNCION               { $$ = $1 }
        | CICLO                 { $$ = $1 }
        | TO_CONTINUE           { $$ = $1 }
;

PRE_DECLARACION : DECLARACION   { $$ = $1 }
                | ASIGNACION    { $$ = $1 }
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
        | p_abre EXPRESION p_cierra     { $$ = $2 }
;

PRIMITIVA : num                         { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
        | StringLiteral                 { $$ = new Primitivo($1.split("\"")[1], @1.first_line, @1.first_column); }
        | CharLiteral                   { $$ = new Primitivo($1.split("\'")[1], @1.first_line, @1.first_column); }
        | Tnull                         { $$ = new Primitivo(null, @1.first_line, @1.first_column); }
        | Rtrue                         { $$ = new Primitivo(true, @1.first_line, @1.first_column); }
        | Rfalse                        { $$ = new Primitivo(false, @1.first_line, @1.first_column); }
        | c_abre ARRAY c_cierra         { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
        | id                            { $$ = new Acceso($1, @1.first_line, @1.first_column); }
        | CALL                          { $$ = $1 }
;
//ToDo: reparar array
ARRAY : ARRAY coma EXPRESION { $1.push($3); $$ = $1; }
        | EXPRESION     { $$ = [$1] } 
;

DECLARACION : TIPO LISTA_ID eq EXPRESION pyc    { $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column) }
        | TIPO LISTA_ID pyc                     { $$ = new Declaracion($1, $2, null, @1.first_line, @1.first_column) }
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

ASIGNACION : id eq EXPRESION pyc        { $$ = new Asignacion($1, $3, null, @1.first_line, @1.first_column) }
;

CALL : DERIVADA         { $$ = $1 }
        | NATIVA        { $$ = $1 }
;

DERIVADA : id p_abre LISTA_PARAMETROS p_cierra pyc
;

LISTA_PARAMETROS : LISTA_PARAMETROS coma id
                | LISTA_PARAMETROS coma TIPO id
                | id
                | TIPO id
                |
;

NATIVA : POW            { $$ = $1 }
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

FUNCION : TIPO id p_abre LISTA_PARAMETROS p_cierra c_abre ACCIONES c_cierra
;







IMPRESION : println p_abre EXPRESION p_cierra pyc{ $$ = new Print( $3, @1.first_line, @1.first_column, true) }
        | print p_abre EXPRESION p_cierra pyc{ $$ = new Print( $3, @1.first_line, @1.first_column, false) }
;