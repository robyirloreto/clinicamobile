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
     $usu=$_POST['nom'];
      $meses=array("ENERO"=>"01","FEBRERO"=>"02","MARZO"=>"03","ABRIL"=>"04","MAYO"=>"05","JUNIO"=>"06","JULIO"=>"07","AGOSTO"=>"08","SEPTIEMBRE"=>"09","OCTUBRE"=>"10","NOVIEMBRE"=>"11","DICIEMBRE"=>"12");
      
      $login=$_POST["login"];
      
      $m=$meses[$mes];/* es el numero de mes a utilizar en el query*/
      
     // echo "El mes es ".$m;
      
      
      
       
                   $sql="SELECT
                              DOCUMENTO,
                               TIPO,
                               COUNT(CANTIDAD)AS CANTIDAD,
                               SUM(NETO) AS NETO
                        FROM V_RM_FACTURACION
                        WHERE TO_CHAR(FECHA,'MM')='".$m."' AND
                               TO_CHAR(FECHA,'YYYY')='".$anhio."' AND '00322'=(SELECT ID_M_GRUPOS FROM M_USUARIOS WHERE LOGIN='".$login."')
                              GROUP BY TIPO,DOCUMENTO ORDER BY TIPO";
                     
                       
                      
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
                        $documentos[$i]=array("documento"=>$row[0],"tipo"=>$row[1],"cantidad"=>$row[2],"neto"=>$row[3]);
	                    $arregloJSON=json_encode($documentos);
	                    
	                    $i++;
	                    
	                 // echo "Progreso por vuelta ".$jsonarreglo." <br /><br />";
	                }
	                
	               
	                
         // $arregloJSON=json_encode($horarios);
         if($i==0){
           $documentos[0]=array("registros"=>"norecords");
           $arregloJSON=json_encode($documentos);
	       echo $arregloJSON;
	     }else{
			   echo $arregloJSON;
	        	        
	       }  
	        
 ?>
 
       
      
 

