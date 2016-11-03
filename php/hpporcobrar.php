<?php  
      include("config.php");
      include("uOperador.php");
      setlocale(LC_TIME, 'es_VE'); # Localiza en español es_Venezuela
      date_default_timezone_set('America/Caracas');
      
      
      //$operador = unserialize($_SESSION['operador']);
      $id=$_POST['id'];
      //$id='00152';id_m_usuario
      $mes=strtoupper($_POST['mes']);
      //$mes='DICIEMBRE';
     $anhio=$_POST['anhio'];
     //$anhio='2003';
      $meses=array("ENERO"=>"01","FEBRERO"=>"02","MARZO"=>"03","ABRIL"=>"04","MAYO"=>"05","JUNIO"=>"06","JULIO"=>"07","AGOSTO"=>"08","SEPTIEMBRE"=>"09","OCTUBRE"=>"10","NOVIEMBRE"=>"11","DICIEMBRE"=>"12");
      
     
      
      $m=$meses[$mes];/* es el numero de mes a utilizar en el query*/
      
     // echo "El mes es ".$m;
      
      
      
       
                  /* $sql="SELECT TO_CHAR(FECHA,'DD/MM/YYYY')AS FECHA, PACIENTE, SERVICIO,TO_CHAR(MONTO,'9999999999999D00') AS MONTO,ID_M_USUARIOS,MONTO AS MONTO FROM V_PACIENTES_VISTOS_MOVIL WHERE TO_CHAR(FECHA,'MM')='".$m."' AND
						 TO_CHAR(FECHA,'YYYY')='".$anhio."' AND ID_M_USUARIOS='".$id."' ORDER BY SERVICIO,FECHA";*/
                     
                   $sql="SELECT 
                               NOMBRE_PROFESIONAL,
                               TO_CHAR(FECHA_REGISTRO,'DD/MM/YYYY')AS FECHA,
                               ID_M_DOC_FINAL,
                               NOMBRE_CLIENTE,
                               NOMBRE_COMPLETO,
                               TRIM(DESCRIPCION) DESCRIPCION,
                               SALDO_REGISTRO,
                               TO_CHAR(MONTO_PROFESIONAL,'9999999999999D00') AS MONTO_PROFESIONAL
                         FROM  V_HONORARIOS_POR_COBRAR
                         WHERE TO_CHAR(FECHA_REGISTRO,'MM')='".$m."' AND 
                              TO_CHAR(FECHA_REGISTRO,'YYYY')='".$anhio."' AND 
                              ID_M_PROFESIONALES=(SELECT ID_M_PROFESIONALES FROM M_PROFESIONALES WHERE ID_M_USUARIOS2='".$id."')  
                                ORDER BY DESCRIPCION,FECHA";    
                      
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
                        $pacvistos[$i]=array("fecha"=>$row[1],"iddoc"=>$row[2],"nomcli"=>$row[3],"nompac"=>$row[4],"descri"=>$row[5],"saldoreg"=>$row[6],"montopro"=>$row[7]);
	                    $arregloJSON=json_encode($pacvistos);
	                    
	                    $i++;
	                    
	                 // echo "Progreso por vuelta ".$jsonarreglo." <br /><br />";
	                }
	                
	               
	                
         // $arregloJSON=json_encode($horarios);
         if($i==0){
           $pacvistos[0]=array("registros"=>"norecords");
           $arregloJSON=json_encode($pacvistos);
	       echo $arregloJSON;
	     }else{
			  echo $arregloJSON;
	        	        
	       }  
	        
 ?>
 
       
      
 

