<?php  
      include("config.php");
      include("uOperador.php");
      setlocale(LC_TIME, 'es_VE'); # Localiza en español es_Venezuela
      date_default_timezone_set('America/Caracas');
      
      
      //$operador = unserialize($_SESSION['operador']);
      $id=$_POST['id'];
      //$id='00152';
      $mes=strtoupper($_POST['mes']);
      //$mes='JUNIO';
     $anhio=$_POST['anhio'];
     //$anhio='2013';
      $meses=array("ENERO"=>"01","FEBRERO"=>"02","MARZO"=>"03","ABRIL"=>"04","MAYO"=>"05","JUNIO"=>"06","JULIO"=>"07","AGOSTO"=>"08","SEPTIEMBRE"=>"09","OCTUBRE"=>"10","NOVIEMBRE"=>"11","DICIEMBRE"=>"12");
      
     
      
      $m=$meses[$mes];/* es el numero de mes a utilizar en el query*/
      
     // echo "El mes es ".$m;
      
      
      
       
                   $sql="SELECT TO_CHAR(FECHA,'DD/MM/YYYY')AS FECHA, 
                                PACIENTE, SERVICIO,TO_CHAR(MONTO,'9999999999999D00') AS MONTO,
                                ID_M_USUARIOS,MONTO AS MONTO 
                         FROM V_PACIENTES_VISTOS_MOVIL 
                         WHERE TO_CHAR(FECHA,'MM')='".$m."' AND
						                   TO_CHAR(FECHA,'YYYY')='".$anhio."' AND ID_M_USUARIOS='".$id."' 
                         ORDER BY SERVICIO,FECHA";
                     
                       
                      
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
                        $pacvistos[$i]=array("fecha"=>$row[0],"pac"=>$row[1],"serv"=>$row[2],"monto"=>$row[3],"monto2"=>$row[5]);
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
 
       
      
 

