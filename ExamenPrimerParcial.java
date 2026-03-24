import java.util.Scanner;

public class ExamenPrimerParcial {
    public static void main (String [] args){
        Scanner sc = new Scanner (System.in);
        int opcion, subOpcion, dia, mes, año;
        String nombre = null , apellidoPat = null, apellidoMat = null;
        boolean datosIngresados = false;
        double radioMay, radioMen, altura, radio;

        double calcToro, calcCilindro;
        opcion = 0;
        subOpcion = 0;
        dia = 0;
        mes = 0;
        año = 0;
        radio = 0;
        radioMay = 0;
        radioMen = 0;  
        altura = 0;      
        radio = 0;

        System.out.println("=== Bienvenido al código ===");

        do {
            System.out.println("--- Ingrese lo que desea hacer:--- \n 1.- Registro de sus datos. \n 2.-Cálculo de volumen. \n 3.- Salir.");
            opcion = sc.nextInt();
            sc.nextLine(); // Limpiar el salto de línea pendiente

            switch (opcion) {
                case 1:
                    System.out.println("Ingrese su(s) nombre(s): ...");
                    nombre = sc.nextLine();
                    
                    System.out.println("Ingrese su apellido paterno: ...");
                    apellidoPat = sc.nextLine();

                    System.out.println("Ingrese su apellido materno: ...");
                    apellidoMat = sc.nextLine();

                    System.out.println("Ingrese su día de nacimiento: ...");
                    dia = sc.nextInt();
                    System.out.println("ingrese su mes de nacimiento: ...");
                    mes = sc.nextInt();
                    System.out.println("Ingrese su año de nacimiento: ...");
                    año = sc.nextInt();
                    sc.nextLine(); // limpiar pendiente después de nextInt

                    if (dia < 1 || dia > 31) {
                        System.out.println("Ingrese un día válido");
                    } else if (mes < 1 || mes > 12) {
                        System.out.println("Ingrese un mes válido");
                    } else if (año < 1900 || año > 2100) {
                        System.out.println("Ingrese un año válido");
                    } else {
                        datosIngresados = true;
                    }
                    break;

                case 2:
                    if (datosIngresados) {
                        System.out.println("¿Qué figura desea calcular su vollumen?... \1.- Dona (El Toro). \n 2.- Cilindro.");
                        subOpcion = sc.nextInt();

                        switch (subOpcion) {
                            case 1:
                                System.out.println("Ingrese el radio mayor (R)");
                                radioMay = sc.nextDouble();

                                System.out.println("Ingrese el radio menor (r)");
                                radioMen = sc.nextDouble();

                                calcToro = 2 * Math.pow(Math.PI, 2) * radioMay * Math.pow(radioMen, 2);

                                System.out.println("El volumen con los datos que ingresaste es: " + calcToro);

                                break;
                        
                            case 2:
                                System.out.println("Ingrese el radio (r)");
                                 radio = sc.nextDouble();

                                System.out.println("Ingrese la altura (h)");
                                altura = sc.nextDouble();

                                calcCilindro = Math.PI * Math.pow(radio, 2) * altura;

                                System.out.println("El volumen con los datos ingresados es: " + calcCilindro);
                                break;

                            default:
                                System.out.println("Ingrese un numero valido...");
                                break;
                        }

                        
                    } else {
                        System.out.println("⚠️ ERROR: Primero debes ingresar tus datos (Opción 1).");
                    }
                    break;

                case 3:
                    if (datosIngresados) {

                        System.out.println("Tus datos generales ingresados son: ");
                        System.out.println("Nombre completo: " + nombre +" " + apellidoPat + " " + apellidoMat);
                        System.out.println("Tu fecha de nacimiento es: " + dia + "/" + mes + "/" + año);



                        System.out.println("Saliendo del programa. ¡Adiós!");
                    } else {
                        System.out.println("⚠️ ERROR: No puedes salir sin antes registrar tus datos.");
                        opcion = 0; // Reiniciamos la opción para que el bucle no termine
                    }
                    break;

                default:
                    System.out.println("Opción no válida.");
            }


        } while (opcion != 3);
    
    }    
}
