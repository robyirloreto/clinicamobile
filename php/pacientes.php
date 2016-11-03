<?php  
      include("config.php");
      include("uOperador.php");
      setlocale(LC_TIME, 'es_VE'); # Localiza en español es_Venezuela
      date_default_timezone_set('America/Caracas');
      
      
      //$operador = unserialize($_SESSION['operador']);
      $id=$_POST['id'];
     // $id="00152";
                  $sql="SELECT ID_I_PROF_ESPE,
                       NOMBRE_PROFESIONAL,
                       NOMBRE_ESPECIALIDAD,
                       ID_M_PACIENTES,
                       NOMBRE_COMPLETO,
                       EDAD_UNIDAD,
                       TO_CHAR(FECHA_EVOLUCION,'HH24:MI:SS') AS HORAE,
                       ID_M_USUARIOS,
                       NOMBRE_USUARIO,
                       NOMBRE_SERVICIO,
                       TIPO,
                       CANCELADO,
                       TO_CHAR(FECHA_EVOLUCION,'DD-MM-YYYY') AS FECHAE
                       FROM V_PACIENTES_POR_VER_CONSULTA 
                       WHERE ID_M_PROFESIONALES=(SELECT ID_M_PROFESIONALES 
                        FROM M_PROFESIONALES
                        WHERE ID_M_USUARIOS2='".$id."') AND FECHA_EVOLUCION BETWEEN TRUNC(SYSDATE) AND TRUNC(SYSDATE) + 1 ORDER BY FECHA_EVOLUCION";
                     
                       
                      
                      $cs=  strtoupper($_POST['cli']);
                    // $cs="CCFA";
                      $Cn=new conexion($cs);
                      $conexion=$Cn->conectarse();

                      $consulta=oci_parse($conexion,$sql);

                      $ejecutar=oci_execute($consulta);
                      $numlinea=0;
                    //esta  echo"<ul data-role='listview'>";
                      $row='';
                      $arregloJSON=''; 
                      $i=0;
                      
                      while($row= oci_fetch_row($consulta)){
                           
                        $pacientes[$i]=array("idpro"=>$row[0],"npro"=>$row[1],"epro"=>$row[2],"horaevo"=>$row[6],"fechaevo"=>$row[12],"nhistoria"=>$row[3],"paciente"=>$row[4],"edad"=>$row[5],"idusuario"=>$row[7],"nusuario"=>$row[8],"servicio"=>$row[9],"tipo"=>$row[10],"cancel"=>$row[11]);
	                    $arregloJSON=json_encode($pacientes);
	                    $i++;
	                 // echo "Progreso por vuelta ".$jsonarreglo." <br /><br />";
	                }
	    
         // $arregloJSON=json_encode($pacientes);
         if($i==0){
           $pacientes[0]=array("registros"=>"norecords");
           $arregloJSON=json_encode($pacientes);
	       echo $arregloJSON;
	     }else{
	        echo $arregloJSON;
	       } 
 ?>
 
       
      
 
