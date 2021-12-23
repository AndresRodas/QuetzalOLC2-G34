int numero = 22;
String saludo = "holas";
String[] arr = ["H","O","L","A"];

void main(){
    println(2,true,"jajaja",5, saludo);
	println(( 5 <= 3 ) || (false && true)  );
    println(56+54);
	println(!(false || true));
	println("hola"&" mundo "&":3");
	println("ja"^5 &" que risa bro");
	println(60 >= 50 ? "Puede vacunarse" : "No puede vacunarse");   
    print("salto de linea: ");
    println("Esto sale en la misma linea");
    println("esto ya es otra linea");
	println(log10(5));
	println(int.parse("1")+1);
	println(double.parse("1.5")+1);
	println(boolean.parse("sdasdasd") && true);
	println(toInt(4.9999));
	println(toDouble("4.9999"));
	println(string(5)^3);
	println(typeof(true));
	println("Tigre".caracterOfPosition(3-1));
	println("Tigre".subString(2,4));
	println("Tigre".length());
	println("Tigre".toUppercase());
	println("Tigre".toLowercase());
	
    if(false){
    	println("if");   
    }
    else if(false){
    	println("else if 1");
    }
    else if(true){
    	println("else if 2");
        if(false){
        	println("if en else");
        }
        else if(true){
			println("else if anidado");
        }else{
        	println("else en else");
        }
    }
    else{
    	println("else");
    }

	switch (numero-20){
    	case 1:
        	println("22-20 = 1 ");
		break;
        case 2:
        	println("22-20 = 2 "&saludo);
        break;
        case 3:
        	println("22-20 = 3 ");
        break;
        case 4:
        	println("22-20 = 4 ");
        break;
        default:
        	println("operacion imposible");
    }

    println("**************SUMA**************");
    println(suma(2,3));

    println("**************FIBONACCI**************");
   	print(string(fibonacci(0))&", ");
    print(string(fibonacci(1))&", ");
    print(string(fibonacci(2))&", ");
    print(string(fibonacci(3))&", ");
    print(string(fibonacci(4))&", ");
    print(string(fibonacci(5))&", ");
    print(string(fibonacci(6))&", ");
    print(string(fibonacci(7))&", ");
    print(string(fibonacci(8))&", ");
    print(string(fibonacci(9))&", ");
	println(string(fibonacci(10)));

    Casa MyHouse = Casa("Zona 6, mixco", 200000, true);
    println(MyHouse);
    MyHouse.disponible = false;
    println(MyHouse);

    println(arr);
    arr[2] = "Oooooo";
    println(arr);
    println(arr[2] & " my gash");
    arr[2] = "l".toUppercase();
    println(arr[begin:end]);
    println(arr[1:end]);
    println(arr[begin:2]);
    println(arr[2:3]);
    arr.push("!");
    arr.push("!");
    println(arr);
    println(arr.pop());
    println(arr);
    arr.pop();
    println(arr);

    int num = 6;
	Nodo der = Nodo(num, num);
    Nodo izq = Nodo(3,2);
    Arbol arb = Arbol(der, izq);
    Bosque forest = Bosque(arb);
    println(arb.derecho.alto);
    arb.derecho.alto = 7;
    println(arb.derecho.alto);
    println(arb.derecho);

    for (int i = 0; i < 10; i++) {
      println(i);
    }
    for letra in "Hola Mundo!"{
       print(letra, "-");
    }

    int i = 0;
    while (i < 5) {
      println(i);
      i = i + 1;
    }

	return;
}

int suma(int num1, int num2){
    	println(num1);
        println(num2);
        if(num1 > num2){
        	return "num1 es mayor que num2";
        }
        return suma(num1 + 1, num2);
    }

int fibonacci(int num){
        if(num == 0){
        	return 0;
        }
        else if (num == 1){
        	return 1;
        }
        else{
        	return fibonacci(num - 1) + fibonacci(num - 2);
        }
    }

struct Casa{
	String direccion;
    int costo;
    boolean disponible;
};

struct Nodo{
	int alto;
    int ancho;
};

struct Arbol{
	Nodo derecho;
    Nodo izquierdo;
};

struct Bosque{
	Arbol tree;
};
