<?php
    include("config.php");
      include("uOperador.php");
      setlocale(LC_TIME, 'es_VE'); # Localiza en español es_Venezuela
      date_default_timezone_set('America/Caracas');
      
      
      //$operador = unserialize($_SESSION['operador']);
      //$id=$_POST['id'];
      
     //echo "El mes actual es: ".date("m");
     $mes=date("m");
     //$mes=3;
     
     $resta=$mes-6;
     $anhio=date('Y');
     
     $anhioa=$anhio-1;
     $arreglo="";
     switch($mes){
		 case 1: $arreglo=array("primero"=>"Enero ".$anhio,"segundo"=>"Diciembre ".$anhioa,"tercero"=>"Noviembre ".$anhioa,"cuarto"=>"Octubre ".$anhioa,"quinto"=>"Septiembre ".$anhioa,"sexto"=>"Agosto ".$anhioa);break;	 
		 case 2: $arreglo=array("primero"=>"Febrero ".$anhio,"segundo"=>"Enero ".$anhio,"tercero"=>"Diciembre ".$anhioa,"cuarto"=>"Noviembre ".$anhioa,"quinto"=>"Octubre ".$anhioa,"sexto"=>"Septiembre ".$anhioa);break;
		 case 3: $arreglo=array("primero"=>"Marzo ".$anhio,"segundo"=>"Febrero ".$anhio,"tercero"=>"Enero ".$anhio,"cuarto"=>"Diciembre ".$anhioa,"quinto"=>"Noviembre ".$anhioa,"sexto"=>"Octubre ".$anhioa);break;
		 case 4: $arreglo=array("primero"=>"Abril ".$anhio,"segundo"=>"Marzo ".$anhio,"tercero"=>"Febrero ".$anhio,"cuarto"=>"Enero ".$anhio,"quinto"=>"Diciembre ".$anhioa,"sexto"=>"Noviembre ".$anhioa);break;		 
		 case 5: $arreglo=array("primero"=>"Mayo ".$anhio,"segundo"=>"Abril ".$anhio,"tercero"=>"Marzo ".$anhio,"cuarto"=>"Febrero ".$anhio,"quinto"=>"Enero ".$anhio,"sexto"=>"Diciembre ".$anhioa);break;	 
		 case 6: $arreglo=array("primero"=>"Junio ".$anhio,"segundo"=>"Mayo ".$anhio,"tercero"=>"Abril ".$anhio,"cuarto"=>"Marzo ".$anhio,"quinto"=>"Febrero ".$anhio,"sexto"=>"Enero ".$anhio);break;
		 case 7: $arreglo=array("primero"=>"Julio ".$anhio,"segundo"=>"Junio ".$anhio,"tercero"=>"Mayo ".$anhio,"cuarto"=>"Abril ".$anhio,"quinto"=>"Marzo ".$anhio,"sexto"=>"Febrero ".$anhio);break;	 
		 case 8: $arreglo=array("primero"=>"Agosto ".$anhio,"segundo"=>"Julio ".$anhio,"tercero"=>"Junio ".$anhio,"cuarto"=>"Mayo ".$anhio,"quinto"=>"Abril ".$anhio,"sexto"=>"Marzo ".$anhio);break;
		 case 9: $arreglo=array("primero"=>"Septiembre ".$anhio,"segundo"=>"Agosto ".$anhio,"tercero"=>"Julio ".$anhio,"cuarto"=>"Junio ".$anhio,"quinto"=>"Mayo ".$anhio,"sexto"=>"Abril ".$anhio);break;
		 case 10: $arreglo=array("primero"=>"Octubre ".$anhio,"segundo"=>"Septiembre ".$anhio,"tercero"=>"Agosto ".$anhio,"cuarto"=>"Julio ".$anhio,"quinto"=>"Junio ".$anhio,"sexto"=>"Mayo ".$anhio);break;		 
		 case 11: $arreglo=array("primero"=>"Noviembre ".$anhio,"segundo"=>"Octubre ".$anhio,"tercero"=>"Septiembre ".$anhio,"cuarto"=>"Agosto ".$anhio,"quinto"=>"Julio ".$anhio,"sexto"=>"Junio ".$anhio);break;	 
		 case 12: $arreglo=array("primero"=>"Diciembre ".$anhio,"segundo"=>"Noviembre ".$anhio,"tercero"=>"Octubre ".$anhio,"cuarto"=>"Septiembre ".$anhio,"quinto"=>"Agosto ".$anhio,"sexto"=>"Julio ".$anhio);break;	 	 
     }
    
     $arregloJSON=json_encode($arreglo);
    
     echo $arregloJSON;
    
?>
