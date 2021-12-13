void main(){
	println(( 5 <= 3 ) || (false && true)  );
    println(56+54);
	println(!(false || true));
	println("conche"+" la"+" lora");
	println("ja"^5+" que risa bro");
	println(60 >= 50 ? "Puede vacunarse" : "No puede vacunarse");   
    print("salto de linea: ");
    print("Esto sale en la misma linea");
    println(", ultima frase");
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
	return;
}


int a,b,c,d;
print("Valor default variable 0 = ");
println(a);
int edad = 20;
print("Valor edad declarado 20 = ");
println(edad);
print("Valor edad asignado 30 = ");
edad = 30;
println(edad);
println(1);
println(true);
println("hola mundo");
    

if(edad==20){
	int edad = 25;
	print("Valor edad declarado 25 = ");
	println(edad);
	print("Valor edad asignado 45 = ");
	edad = 45;
	println(edad);
}