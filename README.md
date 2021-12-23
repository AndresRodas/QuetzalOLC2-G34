# Grupo 34

---

**Universidad de San Carlos de Guatemala**

**Facultad de Ingenieria**

**Escuela de Ciencias y Sistemas**

**Organización de Lenguajes y Compiladores 2**

**Ing. Luis Fernando Espino Barrios**

**Aux. Haroldo Pablo Arias Molina**

---

## Integrantes

| Carné     | Nombre                              |
| --------- | ----------------------------------- |
| 201504220 | José Andres Rodas Arrecis           |
| 201700355 | Diego Alejandro Martinez Garcia     |
---

## Documentación

# MANUAL DE USUARIO
## _Quetzal OCL2r_


Quetzal OCL2r Es una herramienta online de apoyo que permite al usuario la inclusion de tipos implicitos como característica principal de dicha herramienta. El sistema realiza una formalización de los tipos de C y Java. Esto permite a los desarrolladores definir variables y funciones tipadas sin perder la esencia.


## Características de la infertaz

- Numero de línea y columna 
- Botón para interpretar
- Botón para traducir
- Reporte de errores
- Reporte de tabla de simbolos
- Reporte de AST
- Reporte Gramatical
- Salida de código intermedio
- Consola especial

![](https://i.imgur.com/IEAVQCS.jpg)
<center>Imagen 1</center>


## Flujo de la aplicación

> 1. Interpreta: Esta opción nos va a permitir interpretar una entrada. El programa recibe un archivo de entrada ade código de alto nivel y ejecuta las instrucciones.
> 2. Traduce: Esta opción nos va a permitir traducir una entrada. El programa recibe un archivo de entrada de alto nivel y traduce a código intermedio en la sintaxi de tres direcciones.
> 3. Reportes: Esta opcion nos va a permitir visualizar los reportes generados despues de traducir una entrada.


## Sintaxis de Quetzal

La aplicación tendra una sintaxis, la cual debera ser respetada o de lo contrario tendra como resultado una salida con errores.

- Comentarios: Las operaciones aritméticas contarán con un argumento 1, argumento 2, campo para el resultado y un operador perteneciente a la siguiente tabla
![](https://i.imgur.com/Hy4VfOx.png)


- Tipos: Quetzal aceptará distintos tipos de datos con los que cuenta Java y C. Entre ellos se aceptarán:

| Tipo     | Ejemplo |
| -------- | -------- |
| Int      | 3,2,-1,100     |
| Double   | 3.1415, 2.782,0.5 |
| Boolean  | True o False     |
| Char     | 'a','b','c' |
| String   | "Hola", "Mundo"     |
| Arreglos | [10, 20, 30, 40] |
| Struct   |   Estos pueden contener cualquier tipo de dato en su interior, incluso otros struct, arreglos o arreglos de structs   |

- Expresiones: Quetzal acepta operaciones aritmeticas, relacionales y logicas de la siguiente forma:


|  Expresion | Descripcion | Tipo |
| -------- | -------- |--------|
| Suma     | La suma de dos expresiones se define por el símbolo +    |Aritmetica|
| Resta | La resta de dos expresiones y la negación de una expresión aritmetica se define por el símbolo - |Aritmetica|
| Multiplicación     |  La multiplicación de dos expresiones se define por el símbolo *     |Aritmetica|
| División | La división de dos expresiones se define por el símbolo / |Aritmetica|
| Modulo     | El modulo entre dos expresiones se define por el símbolo %     |Aritmetica|
| Nativas | Quetzal posee 6 funciones nativas para la resolución de expresiones, entre ellas se encuentran: |Aritmetica|
| pow     | Recibe como primer parametro la base y como segundo parametro la potencia a elevar. Ejemplo: pow(2,4)     |Aritmetica|
| sqrt | Cálcula la raíz cuadrara de un número Ejemplo: sqrt(4) |Aritmetica|
| sin     | Resuelve la función seno del número que se ingrese     |Aritmetica|
| cos | Resuelve la función coseno del numero que se ingrese |Aritmetica|
| tan     |  Resuelve la función tangente del numero que se ingrese     |Aritmetica|
| Igualdad | Esta se define por el símbolo == |Relacional|
| Diferenciación | Esta se define por el símbolo != |Relacional|
| Mayor que | Esta se define por el símbolo > |Relacional|
| Menor que | Esta se define por el símbolo < |Relacional|
| Mayor o igual que | Esta se define por el símbolo >= |Relacional|
| Menor o igual que | Esta se define por el símbolo <= |Relacional|
| AND | Esta se define por el símbolo && |Lógica|
| OR | Esta se define por el símbolo |Lógica|
| NOT | Esta se define por el símbolo ! |Lógica|

- Instrucciones: Quetzal contará con varias instrucciones para su ejecución, cada instrucción deber terminar con un punto y coma (;) siempre. Las instrucciones que Quetzal acepta son:
1. Impresion: Quetzal cuenta con 2 distintas formas de imprimir.
![](https://i.imgur.com/hYzNcCS.png)


- Declaraciones y Asignaciones: Quetzal permite la declaración y asignación de variables, las NO variables pueden cambiar su tipo de dato en cualquier momento.
1. Declaracion:

![](https://i.imgur.com/xQfCatY.png)
2. Asignación:

![](https://i.imgur.com/qep6Wms.png)



- Llamada a funciones: Una llamada a función es como un desvío en el flujo de la ejecución. En lugar de pasar a la siguiente sentencia, el flujo salta al cuerpo de la función, ejecuta esta y regresa para continuar después de la llamada a la función:

![](https://i.imgur.com/CMpa9nu.png)

- Distintas Funciones Nativas: Quetzal utiliza diversas funciones nativas para sus expresiones, estas son:

![](https://i.imgur.com/QMHBVo3.png)

- Funciones:  Las funciones son secuencias de sentencias que ejecuta una operación que nosotros deseamos. Cuando se crea una función se especifica su nombre y secuencia de sentencias. Luego, ya se puede llamar a estas usando su nombre y los parámetros solicitados. Se definen las funciones en Quetzal así:

![](https://i.imgur.com/KbGQHxg.png)

- Condicionales: Quetzal cuenta con sentencias condicionales, lo que permite que un bloque de codigo pueda ser o no ejecutado. Estas se definen por if,if...else y if...else if y adicional con la sentencia switch case. Su estructura es la siguiente:

1.![](https://i.imgur.com/k0FqGrk.png)

2.![](https://i.imgur.com/kuAZPBw.png)

- Loops: Quetzal cuenta con sentencias iterativas, lo que permite ejecutar repetidamente un bloque de sentencias. Existen 2 de estas, el ciclo while, el ciclo do while y el ciclo for.

1. While: 

![](https://i.imgur.com/fyfLNt3.png)

2. DoWhile:

![](https://i.imgur.com/nL8iQFT.png)

3. For:

![](https://i.imgur.com/3n0jyC2.png)

- STructs : Como se menciono en secciones anteriores, Quetzal cuenta con tipos compuestos que los desarrolladores podrán definir mediante una sintaxis. Para la declaración de estos se utiliza la siguiente sintaxis:

![](https://i.imgur.com/HnE7We6.png)

 

 
# Manual Tecnico

---

El presente documento se le ha concedido dada la necesidad para poder saber el flujo del programa, codificación del mismo y para brindar conocimiento de la estructura de la aplicación, ademas para evitar molestias conforme a demoras en el servicio tecnico. 

---

## Requerimientos

REQUERIMIENTOS MÍNIMOS DE HARDWARE
* Procesador : Core
* Memoria RAM: Mínimo : 1 Gigabytes (GB)
* Disco Duro : 500Gb.

REQUERIMIENTOS MÍNIMOS DE SOFTWARE
* Privilegios de administrador
* Sistema Operativo: : Windows NT/98/Me/2000/2003/XP/Vista

---

### HERRAMIENTAS UTILIZADAS PARA EL DESARROLLO

---

* JavaScript: Es un lenguaje de programación o de secuencias de comandos que te permite implementar funciones complejas en páginas web, cada vez que una página web hace algo más que sentarse allí y mostrar información estática para que la veas, muestra oportunas actualizaciones de contenido, mapas interactivos, animación de Gráficos 2D/3D, desplazamiento de máquinas reproductoras de vídeo, etc., puedes apostar que probablemente JavaScript está involucrado. Es la tercera capa del pastel de las tecnologías web estándar, dos de las cuales (HTML y CSS) hemos cubierto con mucho más detalle en otras partes del Área de aprendizaje.

* Graphiz: Graphviz es un software de visualización de gráficos de código abierto. La visualización gráfica es una forma de representar información estructural como gráficos abstractos y diagramas de red. Tiene importantes aplicaciones en la interfaz visual de redes, bioinformática, ingeniería de software, diseño de bases de datos y web, aprendizaje automático y otros campos técnicos.

---




### Arquitectura

---

![](https://i.imgur.com/lZYtTAn.png)



---

## Manejo de Clases

<center>INSTRUCCIONES
</center>

- While.js: 
El constructor va a recibir lo que son los parametros de Condicion, Instruccion, Linea y columna; Al momento de ejecutar dicha instruccion debe de estar recibiendo un parametro de tipo Booleano como se especifica 'BOOL', al entrar se encicla en un bucle while para poder recibir el parametro 'condicion' y obtener su valor y asi entrar a un entorno aparte, ya dentro de ese entorno empieza una condicion que va a verificar si es permitido permanecer o terminamos el ciclo.
- DoWhile.js:
Esta clase esta similiar a la anterior, la diferencia es el orden de los parametros
- Return.js:
Constructor que va a recibir una expresion, despues al ser ejecutada simplemente pasa a la siguiente instruccion por eso se deja vacio o simplemente devuelve el valor de la expresion.
- Asignacion.Js
Constructor que va a recibir identificador, expresion, linea y columna. El constructor lleva su declaraciones para el AST a la hora de ser construido, ya esto claro y pasa a la ejecución en donde primero utiliznado el parametro identificador se revisa si existe la variable, de ser asi simplemente se retorna la actual y se modifica con una nueva con el metodo "remplazar" de lo contrario se declara un error con el metodo "setError"
- Continue.JS: 
No se recibe algun parametro extra, simplemente la fila y la columna, ya que a la hora de ser ejecutado simplemente pasa la siguiente instruccion.
- Declaracion.js:
Constructor que va a recibir como parametro Tipo, Lista de identificadores, expresion, linea y la columna, teniendo tambien dentro de el la declaracion para la creacion del AST.
Al momento de ser ejecutado, utilizando la lista de ID se recorre  y se verifica si existe la variable a declarar, de existir entonces se marca un error... Si no existe y no viene con un "valor" pasa a ser agregada, recopilando toda su informacion como el "identificado", "tipo", "valor", linea y columna... Pero si viene de la otra forma con su "expresion" declarada seria casi como la opcion anterior a diferencia que a la hora de ser agregada a la tabla la "expresion" tambien seria agregada.
- If.js:
Constructor que va a recibir de parametros: Acciones, Expresion, elseif (condicion), else_ins(Instrucciones), linea y columna

- Main.js:
- Print.Js:
- Push.js:
- Switch.js:

<center>EXPRESIONES
</center>

- Acceso.js
- AccesoArr.js
- AccesoStruct.js
- Call.js
- Cos.js
- Lenght.js
- Log.js
- Lowe.js
- .Operacion.js
- OperacionTwo.js
- Parse.js
- Pop.js
- Pow.js
- Sin.js
- Primitivo.js
- Sin.js
- Sqrt.js
- SubStr.js


<center>AST
</center>

- AST.JS
- Entorno.Js
- Simbolo.js


<center>GRAMATICA
</center>

- Gramar.jison: 

<center>INDEX
</center>



- Index.html:
Archivo escrito en Html plano, que funciona para la pagina principal.
Muestra las tablas, graficas y contenido adicional utilizando JS para su diseño.



## License

2021 - USAC GRUPO 34

**Yo no elegí este camino. El camino, me eligió a mí.
-Ezio Auditore**

