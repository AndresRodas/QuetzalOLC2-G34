
void main(){
	String saludo = "holas";
	println(( 5 <= 3 ) || (false && true)  );
    println(56+54);
	println(!(false || true));
	println("conche"&" la"&" lora");
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
	int numero = 22;
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

	switch (2+2){
    	case 1:
        	println("2+2 = 1");
		break;
        case 2:
        	println("2+2 = 2");
        break;
        case 3:
        	println("2+2 = 3");
        break;
        case 4:
        	println("2+2 = 4 " & saludo);
        break;
        default:
        	println("operacion imposible");
    }

	int suma(int num1, int num2){
    	println(num1);
        println(num2);
        if(num1 > num2){
        	return "num1 es mayor que num2";
        }
        return suma(num1 + 1, num2);
    }
    println(suma(2,3));
    
  
	return;
}
