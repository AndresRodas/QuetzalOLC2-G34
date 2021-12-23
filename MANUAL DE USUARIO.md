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

 

## License

2021 - USAC GRUPO 34

**Yo no elegí este camino. El camino, me eligió a mí.
-Ezio Auditore**

