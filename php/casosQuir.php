<?php  
      include("config.php");
      include("uOperador.php");
      setlocale(LC_TIME, 'es_VE'); # Localiza en español es_Venezuela
      date_default_timezone_set('America/Caracas');
      
      
      //$operador = unserialize($_SESSION['operador']);
       $id=$_POST['id'];
       //$id="00152";
                  $sql="SELECT 
						  ID_M_PACIENTES AS HISTORIA,
						  NOMBRES AS PACIENTE,
						  EDAD,
						  SEXO,
						  TO_CHAR(FECHA_CIRUGIA,'dd/mm/yyyy') AS FECHAC,
						  TO_CHAR(FECHA_CIRUGIA,'HH24:MI:SS') AS HORAC,
						  DESCRIPCION AS PROCEDIMIENTO,
						  NOMBRE_DIAGNOSTICO,
						  OBSERVACIONES
   					    FROM V_M_CIRUGIAS 
                        WHERE ESTATUS='PEN' AND ID_M_PROFESIONALES=(SELECT ID_M_PROFESIONALES 
                        FROM M_PROFESIONALES
                        WHERE ID_M_USUARIOS2='".$id."')
                        ORDER BY FECHA_CIRUGIA,HORA_CIRUGIA";
                     
                       
                      
                     $cs=  strtoupper($_POST['cli']);
                    //$cs="CCFA";
                      $Cn=new conexion($cs);
                      $conexion=$Cn->conectarse();

                      $consulta=oci_parse($conexion,$sql);

                      $ejecutar=oci_execute($consulta);
                      $numlinea=0;
                    
                      $row='';
                      $arregloJSON=''; 
                      $i=0;
                      
                      while($row= oci_fetch_row($consulta)){
                           
                        $casosquir[$i]=array("hist"=>$row[0],"nomb"=>$row[1],"edad"=>$row[2],"sexo"=>$row[3],"fcirug"=>$row[4],"hcirug"=>$row[5],"descri"=>$row[6],"diagno"=>$row[7],"obser"=>$row[8]);
	                    $arregloJSON=json_encode($casosquir);
	                    $i++;
	                 // echo "Progreso por vuelta ".$jsonarreglo." <br /><br />";
	                }
	    
         // $arregloJSON=json_encode($horarios);
     if($i==0){
           $casosquir[0]=array("registros"=>"norecords");
           $arregloJSON=json_encode($casosquir);
	       echo $arregloJSON;
	     }else{
	        echo $arregloJSON;
	       } 
	        
	        //echo $sql;
 ?>
 
       
      
 

