<?php session_start();
      include("config.php");
       
      
  //$usua=  "ABRAHANB";
  //$pass=strtoupper(md5("1234"));
  
  //$cs=$_POST['cs'];
  //$cs="CCFA";
  $arreglo[]='';
  $arreglo[0]=$usua;
  $arreglo[1]=$pass;
  $arreglo[2]=$cs;
  

  /*
     ID_M_USUARIO,
  NOMBRES,
  LOGIN,
  CLAVE,
  ID_M_GRUPOS,
  GRUPO,
  UNICO,
  ESTATUS,
  FECHA_REGISTRO,
  ID_M_USUARIOS,
  NOMBRE_USUARIO,
  ID_M_DEPARTAMENTOS,
  NOMBRE_DEPARTAMENTO,
  NOMBRE_NIVEL,
  NIVEL,
  CODIGO4,
  CAMPO3,
  FECHA_NAC,
  FECHA_INGRESO,
  CODIGO1,
  NOMBRE,
  APELLIDO,
  TIPO,
  NOMBRE_CARGOS,
  NOMBRE_DIRECCION,
  ID_M_CARGOS,
  CODIGO5
  */
//  
/*  $sql ="SELECT ID_M_USUARIO,";
  $sql.=" CODIGO4,";
  $sql.=" NOMBRES,";
  $sql.=" LOGIN,";
  $sql.=" CLAVE,";
  $sql.=" GRUPO"; 
  $sql.=" FROM SISTEMAS.V_M_USUARIOS ";
  $sql.=" WHERE (LOGIN='".$usua."' AND CLAVE='".$pass."') AND ESTATUS='ACT'";
  
  
   
  $Cn=new conexion($cs);
  $conexion=$Cn->conectarse();
  
  $consulta=oci_parse($conexion,$sql);
  
  $acceso=oci_execute($consulta);
  
  
 
   $rs=  oci_fetch_row($consulta);
   
     echo json_encode($rs);*/
 
  
?>
