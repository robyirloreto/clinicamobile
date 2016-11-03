
<?php

     class clasePersona{
            /********* Estas son las propiedades  *****************/
                  private $documentoIdentidad='';
                  private $nombres='';
                  private $apellidos='';
                  private $telefono='';
                  private $dirHabitacion='';
        
       /***** Esto es el constructor para Inicializar la clase**/           
         public function __construct($docI,$nom,$ape,$tel,$dirH) {
                  $this->documentoIdentidad=$docI;
                  $this->nombres=$nom;
                  $this->apellidos=$ape;
                  $this->telefono=$tel;
                  $this->dirHabitacion=$dirH;
         }  
         
         /***********Lo que viene son los métodos de la clase *************/
         
         public function obtenerdocIden(){
             return $this->documentoIdentidad;
         }
         
         public function obtenerNombres(){
             return $this->nombres;
         }
         
         public function obtenerApellidos(){
             return $this->apellidos;
         }
         
         public function obtenerTelefono(){
             return $this->telefono;
         }
         
         public function obtenerdirHabitacion(){
             return $this->dirHabitacion;
         }
     }//fin de la clase
     
     /*Ahora instanciamos el objeto con esa clase*/
     
     $objetoPersona=new clasePersona('1111111','Pedro','Pérez','04240000000','Venezuela calle tal');
     
     /*Y para acceder a esa información usamos los métodos que declaramos en la clase*/
     
     echo"El documento de Identidad es: ".$objetoPersona->obtenerdocIden()."<br />";
     echo"Los nombres son: ".$objetoPersona->obtenerNombres()."<br />";
     echo"Los apellidos son: ".$objetoPersona->obtenerApellidos()."<br />";
     echo"El número de telefono es: ".$objetoPersona->obtenerTelefono()."<br />";
     echo"La dirección de Habitación es: ".$objetoPersona->obtenerdirHabitacion()."<br />";

?>


