<?php
include("config.php");
setlocale(LC_TIME, 'es_VE'); # Localiza en español es_Venezuela
date_default_timezone_set('America/Caracas');
 

/* Extrae los valores enviados desde la aplicacion movil */
$usuarioEnviado = strtoupper($_POST['usuario']);
$passwordEnviado = strtoupper(md5(strtoupper($_POST['password'])));
$cs=  strtoupper($_POST['clinica']);
/* crea un array con datos arbitrarios que seran enviados de vuelta a la aplicacion */
$resultados = array();
$resultados["hora"] = date("F j, Y, g:i a"); 
/********************************************************************************/
 $sql ="SELECT ID_M_USUARIO,";
  $sql.=" CODIGO4,";
  $sql.=" NOMBRES,";
  $sql.=" LOGIN,";
  $sql.=" CLAVE,";
  $sql.=" GRUPO"; 
  $sql.=" FROM SISTEMAS.V_M_USUARIOS ";
  $sql.=" WHERE (LOGIN='".$usuarioEnviado."' AND CLAVE='".$passwordEnviado."') AND ESTATUS='ACT'";
  //$sql.=" WHERE LOGIN='".$usuarioEnviado."' AND ESTATUS='ACT'";
  
  
   
  $Cn=new conexion($cs);
  $conexion=$Cn->conectarse();
  
  $consulta=oci_parse($conexion,$sql);
  
  $acceso=oci_execute($consulta);
  
  
 
   $rs=  oci_fetch_row($consulta);
   $usuarioValido=$rs[3];
   $passwordValido=$rs[4];
   


/*****************verificar si se conecto a la bd *****************/
  if($conexion=="noconex"){
	  $resultados["mensaje"]="noconex";
	  }
else{
/* verifica que el usuario y password concuerden correctamente */
//if($usuarioEnviado == $usuarioValido  && $passwordEnviado == $passwordValido){
  if(($usuarioEnviado == $usuarioValido) && ($usuarioEnviado!="" && $passwordEnviado!="")){
	/*esta informacion se envia solo si la validacion es correcta */
        $resultados["id"]=$rs[0];
        $resultados["cedula"]=$rs[1];
        $resultados["nombres"]=$rs[2];
        $resultados["login"]=$rs[3];
        $resultados["clave"]= $rs[4]; 
    		$resultados["grupo"] = $rs[5];
    		$resultados["validacion"] = "ok";
    		$resultados["clinica"]= $cs;
         
}else{
	/*esta informacion se envia si la validacion falla */
	$resultados["mensaje"] = "Usuario y password incorrectos";
	$resultados["validacion"] = "error";
}
}

/*convierte los resultados a formato json*/
$resultadosJson = json_encode($resultados);

/*muestra el resultado en un formato que no da problemas de seguridad en browsers */
//echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
  echo $resultadosJson;
/*Cierro la conexion*/
oci_free_statement($consulta);
oci_close($conexion);
$resultados=null;
unset($resultados);
?>
