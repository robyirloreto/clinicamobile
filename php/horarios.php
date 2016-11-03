<?php  
      include("config.php");
      include("uOperador.php");
      setlocale(LC_TIME, 'es_VE'); # Localiza en español es_Venezuela
      date_default_timezone_set('America/Caracas');
      
      
      //$operador = unserialize($_SESSION['operador']);
      $id=$_POST['id'];
      // $id="00152";
                  $sql="SELECT DIA,HORA_DESDE,HORA_HASTA,NOMBRE_AREA 
                        FROM V_D_DIRECTORIOS_HORARIO
                        WHERE ID_M_PROFESIONALES=(SELECT ID_M_PROFESIONALES 
                        FROM M_PROFESIONALES
                        WHERE ID_M_USUARIOS2='".$id."')";
                     
                       
                      
                      $cs=  strtoupper($_POST['cli']);
                    // $cs="CCFA";
                      $Cn=new conexion($cs);
                      $conexion=$Cn->conectarse();

                      $consulta=oci_parse($conexion,$sql);

                      $ejecutar=oci_execute($consulta);
                      $numlinea=0;
                    
                      $row='';
                      $arregloJSON=''; 
                      $i=0;
                      
                      while($row= oci_fetch_row($consulta)){
                           
                        $horarios[$i]=array("dia"=>$row[0],"desde"=>$row[1],"hasta"=>$row[2],"consultorio"=>$row[3]);
	                    $arregloJSON=json_encode($horarios);
	                    $i++;
	                 // echo "Progreso por vuelta ".$jsonarreglo." <br /><br />";
	                }
	    
         // $arregloJSON=json_encode($horarios);
         if($i==0){
           $horarios[0]=array("registros"=>"norecords");
           $arregloJSON=json_encode($horarios);
	       echo $arregloJSON;
	     }else{
	        echo $arregloJSON;
	       }  
	        
 ?>
 
       
      
 

