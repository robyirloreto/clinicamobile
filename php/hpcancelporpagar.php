<?php  
      include("config.php");
      include("uOperador.php");
      setlocale(LC_TIME, 'es_VE');  
      date_default_timezone_set('America/Caracas');
      
      
      //$operador = unserialize($_SESSION['operador']);
      $id=$_POST['id'];
       //$id='00152';//id_m_usuario

       $sql="SELECT 
            FECHA_REGISTRO AS FECHA,
            NOMBRE_COMPLETO AS PACIENTE,
            DESCRIPCION AS SERVICIO,
            MONTO,
            (SALDO_REGISTRO-MONTO) AS SALDO
     FROM V_HONORARIOS_DISTRIBUIDOS
     WHERE ID_M_PROFESIONALES=(SELECT ID_M_PROFESIONALES 
                               FROM M_PROFESIONALES 
                               WHERE ID_M_USUARIOS2='".$id."')  
     ORDER BY DESCRIPCION,SALDO DESC"; 
                      
                     $cs= strtoupper($_POST['cli']);
                     //$cs="CCFA";
                      $Cn=new conexion($cs);
                      $conexion=$Cn->conectarse();

                      $consulta=oci_parse($conexion,$sql);

                      $ejecutar=oci_execute($consulta);
                      $numlinea=0;
                    
                      $row='';
                      $arregloJSON=''; 
                      $i=0;
                       $total=0;
                      while($row= oci_fetch_row($consulta)){
                        $pacvistos[$i]=array("fechareg"=>$row[0],"paciente"=>$row[1],"servicio"=>$row[2],"monto"=>$row[3],"saldo"=>$row[4]);
	                    $arregloJSON=json_encode($pacvistos);
	                    
	                    $i++;
	                    
	                  
	                }
	                
	        
         if($i==0){
           $pacvistos[0]=array("registros"=>"norecords");
           $arregloJSON=json_encode($pacvistos);
	       echo $arregloJSON;
	     }else{
			  echo $arregloJSON;
	        	        
	       }  
	        
 ?>
 
       
      
 

