/******************************EXPORTACIONES*******************************/
%{
        var errors = []
        var grammar = []
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
"++"                    return 'masmas'
"--"                    return 'menosmenos'  
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
errors.push({
        err: 'El caracter '+yytext+' no es reconocido por el lenguaje',
        type: 'Léxico',
        amb: 'MAIN',
        line: yylloc.first_line,
        col: yylloc.first_column
        })
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
                        grammar.push('BEGIN ::= CODE EOF')
                        //creacion ast
                        var Ast = new AST($1.main, $1.global, grammar.reverse())
                        //errores
                        for(let err of errors){
                                Ast.setError(err)
                        }
                        //seteo de variables
                        cont_t = 0, cont_l = 0, heap = 0, stack = 0, grammar = [], errors = [];
                        return Ast;
                }          
;

CODE : GLOBAL_ENV MAIN GLOBAL_ENV       { $$ = { global: $1.concat($3), main: $2 }; grammar.push('CODE ::= GLOBAL MAIN GLOBAL') } 
        | GLOBAL_ENV MAIN               { $$ = { global: $1, main: $2 }; grammar.push('CODE ::= GLOBAL MAIN') }
        | MAIN GLOBAL_ENV               { $$ = { global: $2, main: $1 }; grammar.push('CODE ::= MAIN GLOBAL') }
        | MAIN                          { $$ = { global: [], main: $1 }; grammar.push('CODE ::= MAIN') }
        | error                         { errors.push({
                                                err: 'No se esperaba el valor '+yytext,
                                                type: 'Semántico',
                                                amb: 'GLOBAL',
                                                line: this._$.first_line,
                                                col: this._$.first_column
                                                })
                                        }
;

GLOBAL_ENV : GLOBAL_ENV DECLARACION     { $1.push($2); $$ = $1; grammar.push('GLOBAL ::= GLOBAL DECLARACION') }
        | GLOBAL_ENV FUNCION            { $1.push($2); $$ = $1; grammar.push('GLOBAL ::= GLOBAL FUNCION') }
        | DECLARACION                   { $$ = [$1]; grammar.push('GLOBAL ::= DECLARACION') }
        | FUNCION                       { $$ = [$1]; grammar.push('GLOBAL ::= FUNCION') }
;

MAIN : Tvoid Rmain p_abre p_cierra l_abre ACCIONES l_cierra     { 
                                                                $$ = new Main($6, @1.first_line, @1.first_column); 
                                                                grammar.push('MAIN ::= Tvoid Rmain p_abre p_cierra l_abre ACCIONES l_cierra');
                                                                }
;

ACCIONES : ACCIONES ACCION { $1.push($2); $$ = $1; grammar.push('ACCIONES ::= ACCIONES ACCION');}
        | ACCION { $$ = [$1]; grammar.push('ACCIONES ::= ACCION'); }
;

ACCION : INSTRUCCION { $$ = $1; grammar.push('ACCION ::= INSTRUCCION'); }
;

EXPRESION : OPERACION { $$ = $1; grammar.push('EXPRESION ::= OPERACION'); }
        | PRIMITIVA { $$ = $1; grammar.push('EXPRESION ::= PRIMITIVA'); }
;

INSTRUCCION : IMPRESION         { $$ = $1; grammar.push('INSTRUCCION ::= IMPRESION'); }
        | PRE_DECLARACION       { $$ = $1; grammar.push('INSTRUCCION ::= PRE_DECLARACION'); }
        | CONDICION             { $$ = $1; grammar.push('INSTRUCCION ::= CONDICION'); }
        | CICLO                 { $$ = $1; grammar.push('INSTRUCCION ::= CICLO'); }
        | TO_CONTINUE           { $$ = $1; grammar.push('INSTRUCCION ::= TO_CONTINUE'); }
        | INC_DECRE_INSTR       { $$ = $1; grammar.push('INSTRUCCION ::= INC_DECRE_INSTR'); }
        | RETURN                { $$ = $1; grammar.push('INSTRUCCION ::= RETURN'); }
        | PUSH                  { $$ = $1; grammar.push('INSTRUCCION ::= PUSH'); }
        | POP pyc               { $$ = $1; grammar.push('INSTRUCCION ::= POP pyc'); } 
;

PRE_DECLARACION : DECLARACION   { $$ = $1; grammar.push('PRE_DECLARACION ::= DECLARACION'); }
                | ASIGNACION    { $$ = $1; grammar.push('PRE_DECLARACION ::= ASIGNACION'); }
;

OPERACION : EXPRESION mas EXPRESION             { $$ = new Operacion($1,$3,'SUMA', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION mas EXPRESION');}
        | EXPRESION menos EXPRESION             { $$ = new Operacion($1,$3,'RESTA', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION menos EXPRESION');}
        | EXPRESION por EXPRESION               { $$ = new Operacion($1,$3,'MULTIPLICACION', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION por EXPRESION');}
        | EXPRESION div EXPRESION               { $$ = new Operacion($1,$3,'DIVISION', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION div EXPRESION');}
        | EXPRESION mod EXPRESION               { $$ = new Operacion($1,$3,'MODULO', @1.first_line, @1.first_column);grammar.push('OPERACION ::= EXPRESION mod EXPRESION');}
        | EXPRESION land EXPRESION              { $$ = new Operacion($1,$3,'AND', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION land EXPRESION');}
        | EXPRESION lor EXPRESION               { $$ = new Operacion($1,$3,'OR', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION lor EXPRESION');}
        | EXPRESION igual EXPRESION             { $$ = new Operacion($1,$3,'IGUAL_IGUAL', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION igual EXPRESION');}
        | EXPRESION dif EXPRESION               { $$ = new Operacion($1,$3,'DIFERENTE_QUE', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION dif EXPRESION');}
        | EXPRESION may_ig EXPRESION            { $$ = new Operacion($1,$3,'MAYOR_IGUA_QUE', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION may_ig EXPRESION');}
        | EXPRESION may_que EXPRESION           { $$ = new Operacion($1,$3,'MAYOR_QUE', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION may_que EXPRESION');}
        | EXPRESION men_ig EXPRESION            { $$ = new Operacion($1,$3,'MENOR_IGUA_QUE', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION men_ig EXPRESION');}
        | EXPRESION men_que EXPRESION           { $$ = new Operacion($1,$3,'MENOR_QUE', @1.first_line, @1.first_column);grammar.push('OPERACION ::= EXPRESION men_que EXPRESION');}
        | EXPRESION concat EXPRESION            { $$ = new Operacion($1,$3,'CONCAT', @1.first_line, @1.first_column);grammar.push('OPERACION ::= EXPRESION concat EXPRESION');}
        | EXPRESION repet EXPRESION             { $$ = new Operacion($1,$3,'REPET', @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION repeat EXPRESION');}
        | menos EXPRESION %prec UMINUS          { $$ = new Operacion($2,$2,'MENOS_UNARIO', @1.first_line, @1.first_column);grammar.push('OPERACION ::= menos EXPRESION');}
        | lnot EXPRESION %prec UMINUS           { $$ = new Operacion($2,$2,'NOT', @1.first_line, @1.first_column); grammar.push('OPERACION ::= lnot EXPRESION');}
        | EXPRESION quest EXPRESION d_puntos EXPRESION { $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column); grammar.push('OPERACION ::= EXPRESION quest EXPRESION d_puntos EXPRESION');}
        | p_abre EXPRESION p_cierra     { $$ = $2; grammar.push('OPERACION ::= p_abre EXPRESION p_cierra'); }
;

PRIMITIVA : num                         { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); grammar.push('PRIMITIVA ::= num'); }
        | StringLiteral                 { $$ = new Primitivo($1.split("\"")[1], @1.first_line, @1.first_column); grammar.push('PRIMITIVA ::= StringLiteral');}
        | CharLiteral                   { $$ = new Primitivo($1.split("\'")[1], @1.first_line, @1.first_column); grammar.push('PRIMITIVA ::= CharLiteral');}
        | Tnull                         { $$ = new Primitivo(null, @1.first_line, @1.first_column); grammar.push('PRIMITIVA ::= Tnull');}
        | Rtrue                         { $$ = new Primitivo(true, @1.first_line, @1.first_column); grammar.push('PRIMITIVA ::= Rtrue');}
        | Rfalse                        { $$ = new Primitivo(false, @1.first_line, @1.first_column); grammar.push('PRIMITIVA ::= Rfalse');}
        | id                            { $$ = new Acceso($1, @1.first_line, @1.first_column); grammar.push('PRIMITIVA ::= id');}
        | CALL                          { $$ = $1; grammar.push('PRIMITIVA ::= CALL'); }
        | ACCESO_ID id                  {
                                        $1.push($2)
                                        $$ = new AccesoStruct($1, @1.first_line, @1.first_column); 
                                        grammar.push('PRIMITIVA ::= ACCESO_ID id');
                                        }
        | ACCESO_ARR                    { $$ = $1; grammar.push('PRIMITIVA ::= ACCESO_ARR'); }
;

DECLARACION : TIPO LISTA_ID eq EXPRESION pyc                            { $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column); grammar.push('DECLARACION ::= TIPO LISTA_ID eq EXPRESION pyc'); }
        | TIPO LISTA_ID pyc                                             { $$ = new Declaracion($1, $2, null, @1.first_line, @1.first_column); grammar.push('DECLARACION ::= TIPO LISTA_ID pyc'); }
        | Tstruct id l_abre LISTA_ATR l_cierra pyc                      { $$ = new DeclaracionStruct($2, $4, @1.first_line, @1.first_column); grammar.push('DECLARACION ::= Tstruct id l_abre LISTA_ATR l_cierra pyc'); }
        | id id eq id p_abre LISTA_EXP p_cierra pyc                     { $$ = new DecVarStruct($1, $2, $4, $6, @1.first_line, @1.first_column); grammar.push('DECLARACION ::= id id eq id p_abre LISTA_EXP p_cierra pyc'); }
        | TIPO c_abre c_cierra id eq c_abre LISTA_EXP c_cierra pyc      { $$ = new DeclaracionArr($1, $4, $7, @1.first_line, @1.first_column); grammar.push('DECLARACION ::= TIPO c_abre c_cierra id eq c_abre LISTA_EXP c_cierra pyc'); }
;

LISTA_ATR : LISTA_ATR DECLARACION               { $1.push($2); $$ = $1; grammar.push('LISTA_ATR ::= LISTA_ATR DECLARACION '); }
        | LISTA_ATR id id pyc                   { $1.push(new Declaracion($2, [$3], null, @1.first_line, @1.first_column)); $$ = $1; grammar.push('LISTA_ATR ::= LISTA_ATR id id pyc'); }
        | DECLARACION                           { $$ = [$1]; grammar.push('LISTA_ATR ::= DECLARACION'); }
        | id id pyc                             { $$ = [new Declaracion($1, [$2], null, @1.first_line, @1.first_column)]; grammar.push('LISTA_ATR ::= id id pyc'); }
;

LISTA_ID : LISTA_ID coma id             { $1.push($3); $$ = $1; grammar.push('LISTA_ID ::= LISTA_ID coma id'); }
        | id                            { $$ = [$1]; grammar.push('LISTA_ID ::= id');  }
;

TIPO : Tint             { $$ = 'INT'; grammar.push('TIPO ::= Tint ');  }
        | Tdouble       { $$ = 'DOUBLE'; grammar.push('TIPO ::= Tdouble'); }
        | Tboolean      { $$ = 'BOOL'; grammar.push('TIPO ::= Tboolean'); }
        | Tchar         { $$ = 'STRING'; grammar.push('TIPO ::= Tchar'); }
        | Tstring       { $$ = 'STRING'; grammar.push('TIPO ::= Tstring'); }
        | Tfloat        { $$ = 'DOUBLE'; grammar.push('TIPO ::= Tfloat'); }
;

ASIGNACION : id eq EXPRESION pyc                                { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); grammar.push('ASIGNACION ::= id eq EXPRESION pyc'); }
        | ACCESO_ID id eq EXPRESION pyc                         {
                                                                $1.push($2) 
                                                                $$ = new AsignacionStruct($1, $4, @1.first_line, @1.first_column) 
                                                                grammar.push('ASIGNACION ::= ACCESO_ID id eq EXPRESION pyc');
                                                                }
        | id c_abre EXPRESION c_cierra eq EXPRESION pyc         { $$ = new AsignacionArr($1, $3, $6, @1.first_line, @1.first_column); grammar.push('ASIGNACION ::= id c_abre EXPRESION c_cierra eq EXPRESION pyc'); }
;

ACCESO_ID : ACCESO_ID id punto               { $1.push($2); $$ = $1; grammar.push('ACCESO_ID ::= ACCESO_ID id punto'); }
        | id punto                           { $$ = [$1]; grammar.push('ACCESO_ID ::= id punto'); }
;

CALL : DERIVADA         { $$ = $1; grammar.push('CALL ::= DERIVADA'); }
        | NATIVA        { $$ = $1; grammar.push('CALL ::= NATIVA'); }
;

DERIVADA : id p_abre LISTA_EXP p_cierra                 { $$ = new Call($1, $3, @1.first_line, @1.first_column); grammar.push('DERIVADA ::= id p_abre LISTA_EXP p_cierra'); }
;

LISTA_EXP : LISTA_EXP coma EXPRESION                    { $1.push($3); $$ = $1; grammar.push('LISTA_EXP ::= LISTA_EXP coma EXPRESION'); }
        | EXPRESION                                     { $$ = [$1]; grammar.push('LISTA_EXP ::= EXPRESION'); }
        |                                               { $$ = []; }
;

LISTA_PARAMETROS : LISTA_PARAMETROS coma TIPO id        { $1.push( { tipo: $3, id: $4 } ); $$ = $1; grammar.push('LISTA_PARAMETROS ::= LISTA_PARAMETROS coma TIPO id'); }
                | TIPO id                               { $$ = [ { tipo: $1, id: $2 } ]; grammar.push('LISTA_PARAMETROS ::= TIPO id'); }
                |                                       { $$ = [] }
;

ACCESO_ARR : id c_abre EXPRESION c_cierra                       { $$ = new AccesoArr($1, $3, null, @1.first_line, @1.first_column); grammar.push('ACCESO_ARR ::= id c_abre EXPRESION c_cierra'); }
        | id c_abre EXPRESION d_puntos EXPRESION c_cierra       { $$ = new AccesoArr($1, $3, $5, @1.first_line, @1.first_column); grammar.push('ACCESO_ARR ::= id c_abre EXPRESION d_puntos EXPRESION c_cierra'); }
        | id c_abre Rbegin d_puntos EXPRESION c_cierra          { $$ = new AccesoArr($1, $3, $5, @1.first_line, @1.first_column); grammar.push('ACCESO_ARR ::= id c_abre Rbegin d_puntos EXPRESION c_cierra'); }
        | id c_abre EXPRESION d_puntos Rend c_cierra            { $$ = new AccesoArr($1, $3, $5, @1.first_line, @1.first_column); grammar.push('ACCESO_ARR ::= id c_abre EXPRESION d_puntos Rend c_cierra'); }
        | id c_abre Rbegin d_puntos Rend c_cierra               { $$ = new AccesoArr($1, $3, $5, @1.first_line, @1.first_column); grammar.push('ACCESO_ARR ::= id c_abre Rbegin d_puntos Rend c_cierra'); }
;

NATIVA : POW           { $$ = $1; grammar.push('NATIVA ::= POW'); }
        | SQRT          { $$ = $1; grammar.push('NATIVA ::= SQRT'); }
        | SIN           { $$ = $1; grammar.push('NATIVA ::= SIN'); }
        | COS           { $$ = $1; grammar.push('NATIVA ::= COS'); }
        | TAN           { $$ = $1; grammar.push('NATIVA ::= TAN'); }
        | LOG           { $$ = $1; grammar.push('NATIVA ::= LOG'); }
        | PARSE         { $$ = $1; grammar.push('NATIVA ::= PARSE'); }
        | TO_NATIVE     { $$ = $1; grammar.push('NATIVA ::= TO_NATIVE'); }
        | POS_STR       { $$ = $1; grammar.push('NATIVA ::= POS_STR'); }
        | SUB_STR       { $$ = $1; grammar.push('NATIVA ::= SUB_STR'); }
        | LENGTH        { $$ = $1; grammar.push('NATIVA ::= LENGTH'); }
        | TO_UPPER      { $$ = $1; grammar.push('NATIVA ::= TO_UPPER'); }
        | TO_LOWER      { $$ = $1; grammar.push('NATIVA ::= TO_LOWER'); }
        | POP           { $$ = $1; grammar.push('NATIVA ::= POP'); }
;

POW : pow p_abre EXPRESION coma EXPRESION p_cierra      { $$ = new Pow($3, $5, @1.first_line, @1.first_column); grammar.push('NATIVA ::= POP'); }
;

SQRT : sqrt p_abre EXPRESION p_cierra                   { $$ = new Sqrt($3, @1.first_line, @1.first_column); grammar.push('SQRT ::= sqrt p_abre EXPRESION p_cierra '); }
;

SIN : sin p_abre EXPRESION p_cierra                     { $$ = new Sin($3, @1.first_line, @1.first_column); grammar.push('SIN ::= sin p_abre EXPRESION p_cierra'); }
;

COS : cos p_abre EXPRESION p_cierra                     { $$ = new Cos($3, @1.first_line, @1.first_column); grammar.push('COS ::= cos p_abre EXPRESION p_cierra'); }
;

TAN : tan p_abre EXPRESION p_cierra                     { $$ = new Tan($3, @1.first_line, @1.first_column); grammar.push('TAN ::= tan p_abre EXPRESION p_cierra '); }
;

LOG : log p_abre EXPRESION p_cierra                     { $$ = new Log($3, @1.first_line, @1.first_column); grammar.push('LOG ::= log p_abre EXPRESION p_cierra'); }
;

PARSE : TIPO punto parse p_abre EXPRESION p_cierra      { $$ = new Parse( $1, $5, @1.first_line, @1.first_column); grammar.push('PARSE ::= TIPO punto parse p_abre EXPRESION p_cierra'); }
;

TO_NATIVE : toint p_abre EXPRESION p_cierra             { $$ = new ToNative( $1, $3, @1.first_line, @1.first_column ); grammar.push('TO_NATIVE ::= toint p_abre EXPRESION p_cierra'); }
        | todouble p_abre EXPRESION p_cierra            { $$ = new ToNative( $1, $3, @1.first_line, @1.first_column ); grammar.push('TO_NATIVE ::= todouble p_abre EXPRESION p_cierra'); }
        | str p_abre EXPRESION p_cierra                 { $$ = new ToNative( $1, $3, @1.first_line, @1.first_column ); grammar.push('TO_NATIVE ::= str p_abre EXPRESION p_cierra'); }
        | typeof p_abre EXPRESION p_cierra              { $$ = new ToNative( $1, $3, @1.first_line, @1.first_column ); grammar.push('TO_NATIVE ::= typeof p_abre EXPRESION p_cierra'); }
;

POS_STR : EXPRESION punto posstr p_abre EXPRESION p_cierra { $$ = new PositionStr( $1, $5, @1.first_line, @1.first_column); grammar.push('POS_STR ::= EXPRESION punto posstr p_abre EXPRESION p_cierra'); }
        | id punto posstr p_abre EXPRESION p_cierra     {
                                                        var id = new Acceso($1, @1.first_line, @1.first_column);
                                                        $$ = new PositionStr( id, $5, @1.first_line, @1.first_column)
                                                        grammar.push('POS_STR ::= id punto posstr p_abre EXPRESION p_cierra');
                                                        }
;

SUB_STR : EXPRESION punto substr p_abre EXPRESION coma EXPRESION p_cierra { $$ = new SubStr($1, $5, $7, @1.first_line, @1.first_column); grammar.push('SUB_STR ::= EXPRESION punto substr p_abre EXPRESION coma EXPRESION p_cierra'); }
        | id punto substr p_abre EXPRESION coma EXPRESION p_cierra      { 
                                                                        var id = new Acceso($1, @1.first_line, @1.first_column);
                                                                        $$ = new SubStr(id, $5, $7, @1.first_line, @1.first_column) 
                                                                        grammar.push('SUB_STR ::= id punto substr p_abre EXPRESION coma EXPRESION p_cierra');
                                                                        }
;

LENGTH : EXPRESION punto length p_abre p_cierra         { $$ = new Length( $1, @1.first_line, @1.first_column ); grammar.push('LENGTH ::= EXPRESION punto length p_abre p_cierra'); }
        | id punto length p_abre p_cierra                {
                                                        var id = new Acceso($1, @1.first_line, @1.first_column);
                                                        $$ = new Length( id, @1.first_line, @1.first_column );
                                                        grammar.push('LENGTH ::= id punto length p_abre p_cierra');
                                                        }
;

TO_UPPER : EXPRESION punto upper p_abre p_cierra        { $$ = new Upper( $1, @1.first_line, @1.first_column ); grammar.push('TO_UPPER ::= EXPRESION punto upper p_abre p_cierra'); }
        | id punto upper p_abre p_cierra                {
                                                        var id = new Acceso($1, @1.first_line, @1.first_column);
                                                        $$ = new Upper( id, @1.first_line, @1.first_column);
                                                        grammar.push('TO_UPPER ::= id punto upper p_abre p_cierra ');
                                                        }
;

TO_LOWER : EXPRESION punto lower p_abre p_cierra        { $$ = new Lower( $1, @1.first_line, @1.first_column ); grammar.push('TO_LOWER ::= EXPRESION punto lower p_abre p_cierra'); }
        | id punto lower p_abre p_cierra                {
                                                        var id = new Acceso($1, @1.first_line, @1.first_column);
                                                        $$ = new Lower( id, @1.first_line, @1.first_column ) 
                                                        grammar.push('TO_LOWER ::= id punto lower p_abre p_cierra');
                                                        }
;

PUSH : id punto Rpush p_abre EXPRESION p_cierra pyc     { $$ = new Push( $1, $5, @1.first_line, @1.first_column ); grammar.push('PUSH ::= id punto Rpush p_abre EXPRESION p_cierra pyc'); }
;

POP : id punto Rpop p_abre p_cierra                     { $$ = new Pop( $1, @1.first_line, @1.first_column ); grammar.push('POP ::= id punto Rpop p_abre p_cierra'); }
;


CONDICION : IF          { $$ = $1; grammar.push('CONDICION ::= IF'); }
        | SWITCH        { $$ = $1; grammar.push('CONDICION ::= SWITCH'); }
;

IF :    Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra ELSE_IF ELSE     { $$ = new If( $3, $6, $8, $9, @1.first_line, @1.first_column ); grammar.push('IF ::= Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra ELSE_IF ELSE '); }
        | Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra ELSE_IF        { $$ = new If( $3, $6, $8, null, @1.first_line, @1.first_column ); grammar.push('IF ::= Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra ELSE_IF'); }
        | Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra ELSE           { $$ = new If( $3, $6, null, $8, @1.first_line, @1.first_column ); grammar.push('IF ::= Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra ELSE'); }
        | Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra                { $$ = new If( $3, $6, null, null, @1.first_line, @1.first_column ); grammar.push('IF ::= Rif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra '); }
        | Rif p_abre EXPRESION p_cierra ACCION                                  { $$ = new If( $3, $5, null, null, @1.first_line, @1.first_column ); grammar.push('IF ::= Rif p_abre EXPRESION p_cierra ACCION'); }
;

ELSE_IF : ELSE_IF Relseif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra    { $1.push(new Elseif( $4, $7, @1.first_line, @1.first_column)); $$ = $1; grammar.push('ELSE_IF ::= ELSE_IF Relseif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra '); }   
        | Relseif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra            { $$ = [new Elseif( $3, $6, @1.first_line, @1.first_column)]; grammar.push('ELSE_IF ::= Relseif p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra'); }
;       

ELSE : Relse l_abre ACCIONES l_cierra              { $$ = new Else($3, @1.first_line, @1.first_column); grammar.push('ELSE ::= Relse l_abre ACCIONES l_cierra'); }
;


SWITCH : Rswitch p_abre EXPRESION p_cierra l_abre LISTA_CASE DEFAULT_CASE l_cierra      { $$ = new Switch( $3, $6, $7, @1.first_line, @1.first_column ); grammar.push('SWITCH ::= Rswitch p_abre EXPRESION p_cierra l_abre LISTA_CASE DEFAULT_CASE l_cierra'); }
;

LISTA_CASE : LISTA_CASE Rcase EXPRESION d_puntos ACCIONES Rbreak pyc    { $1.push(new Case( $3, $5, true, @1.first_line, @1.first_column)); $$ = $1; grammar.push('LISTA_CASE ::= LISTA_CASE Rcase EXPRESION d_puntos ACCIONES Rbreak pyc '); }
        | LISTA_CASE Rcase EXPRESION d_puntos ACCIONES                  { $1.push(new Case( $3, $5, false, @1.first_line, @1.first_column)); $$ = $1; grammar.push('LISTA_CASE ::= LISTA_CASE Rcase EXPRESION d_puntos ACCIONES ');}
        | Rcase EXPRESION d_puntos ACCIONES Rbreak pyc                  { $$ = [new Case( $2, $4, true, @1.first_line, @1.first_column)]; grammar.push('LISTA_CASE ::= Rcase EXPRESION d_puntos ACCIONES Rbreak pyc'); }
        | Rcase EXPRESION d_puntos ACCIONES                             { $$ = [new Case( $2, $4, false, @1.first_line, @1.first_column)]; grammar.push('LISTA_CASE ::= Rcase EXPRESION d_puntos ACCIONES'); }
;

DEFAULT_CASE : Rdefault d_puntos ACCIONES       { $$ = $3; grammar.push('DEFAULT_CASE ::= Rdefault d_puntos ACCIONES'); }
        |                                       { $$ = null;}
; 


INC_DECRE_INSTR: id masmas             {$$ = new OperacionTwo($1,"SUMASUMA",@1.first_line, @1.first_column); grammar.push('INC_DECRE_INSTR ::= id masmas');}
                | id menosmenos         {$$ = new OperacionTwo($1,"RESTARESTA",@1.first_line, @1.first_column); grammar.push('INC_DECRE_INSTR ::= id menosmenos');}
;


TO_CONTINUE : Rcontinue                            { $$ = new Continue(@1.first_line, @1.first_column); grammar.push('TO_CONTINUE ::= Rcontinue');}

;

CICLO : WHILE           { $$ = $1; grammar.push('CICLO ::= WHILE');}
      | DOWHILE pyc        { $$ = $1; grammar.push('CICLO ::= DOWHILE pyc');}
;


WHILE : Rwhile p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra              {$$ = new While($3,$6,@1.first_line, @1.first_column); grammar.push('WHILE ::= Rwhile p_abre EXPRESION p_cierra l_abre ACCIONES l_cierra');}
;    

DOWHILE : Rdo  l_abre ACCIONES l_cierra Rwhile p_abre EXPRESION p_cierra     {$$ = new DoWhile($7,$3,@1.first_line, @1.first_column); grammar.push('DOWHILE ::= Rdo  l_abre ACCIONES l_cierra Rwhile p_abre EXPRESION p_cierra');}
;


PREFOR : Rfor p_abre PRE_DECLARACION pyc EXPRESION pyc ACCIONES p_cierra l_abre ACCIONES l_cierra {$$ = new PFOR($3,$5,$7,$10,@1.first_line, @1.first_column); grammar.push('PREFOR ::= Rfor p_abre PRE_DECLARACION pyc EXPRESION pyc ACCIONES p_cierra l_abre ACCIONES l_cierra');}
;

FUNCION : TIPO id p_abre LISTA_PARAMETROS p_cierra l_abre ACCIONES l_cierra       { $$ = new Function($1, $2, $4, $7, @1.first_line, @1.first_column); grammar.push('FUNCION ::= TIPO id p_abre LISTA_PARAMETROS p_cierra l_abre ACCIONES l_cierra');}
;

RETURN : Rreturn EXPRESION pyc          { $$ = new Return($2,@1.first_line, @1.first_column); grammar.push('RETURN ::= Rreturn EXPRESION pyc '); }
        | Rreturn pyc                   { $$ = new Return(null,@1.first_line, @1.first_column); grammar.push('RETURN ::= Rreturn pyc'); }
;

IMPRESION : println p_abre CONTENIDO_PRINT p_cierra pyc         { $$ = new Print( $3, @1.first_line, @1.first_column, true); grammar.push('IMPRESION ::= println p_abre CONTENIDO_PRINT p_cierra pyc'); }
        | print p_abre CONTENIDO_PRINT p_cierra pyc             { $$ = new Print( $3, @1.first_line, @1.first_column, false); grammar.push('IMPRESION ::= print p_abre CONTENIDO_PRINT p_cierra pyc '); }
;

CONTENIDO_PRINT : CONTENIDO_PRINT coma EXPRESION                { $1.push($3); $$ = $1; grammar.push('CONTENIDO_PRINT ::= CONTENIDO_PRINT coma EXPRESION'); }
                | EXPRESION                                     { $$ = [$1]; grammar.push('CONTENIDO_PRINT ::= EXPRESION'); }
;