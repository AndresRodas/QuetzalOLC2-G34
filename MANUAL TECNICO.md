
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

<center>INDEX
</center>

- Index.html:
Archivo escrito en Html plano, que funciona para la pagina principal.
Muestra las tablas, graficas y contenido adicional utilizando JS para su diseño.





