<?php session_start();
      include("config.php");
      include("uOperador.php");
      $operador = unserialize($_SESSION['operador']);
?>
<html lang="es">
    <head>
        <link href="../js/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css" rel="stylesheet" type="text/css"/>
        <link href="../css/robyir.css" rel="stylesheet" type="text/css"/>
        <script src="../js/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="../js/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js" type="text/javascript"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>  
    </head>
  <body>
       
        <div data-role="page" id="main" data-theme="A">
            <div data-role="header" style="text-align:center;"><h3>O24<?php echo " ".$operador->clinica;?></h3>
                <ul data-role="listview">
                    <li data-role="list-divider">
                        <?php echo"<p style='font-size:10px;'>Usuario: ".$operador->nombres."<br />Grupo:".$operador->grupo."</p>";?>
                    
                    </li>
                </ul>
                
                <div data-role="navbar" data-iconpos="top">
                      <ul>
                        <li><a href="#" data-icon="user" class="ui-btn-active">Pacientes por Ver</a></li>
                        <li><a href="#" data-icon="arrow-r">Honorarios</a></li>
                        
                      </ul>
                </div>
            </div>
          
            <div data-role="content" >
                <div id="visor">
                <?php
                  $sql="SELECT ID_I_PROF_ESPE,
                       NOMBRE_PROFESIONAL,
                       NOMBRE_ESPECIALIDAD,
                       ID_M_PACIENTES,
                       NOMBRE_COMPLETO,
                       EDAD_UNIDAD,
                       FECHA_EVOLUCION,
                       ID_M_USUARIOS,
                       NOMBRE_USUARIO,
                       NOMBRE_SERVICIO,
                       TIPO,
                       CANCELADO
                       FROM V_PACIENTES_POR_VER_CONSULTA 
                       WHERE ID_M_PROFESIONALES=(SELECT ID_M_PROFESIONALES 
                        FROM M_PROFESIONALES
                        WHERE ID_M_USUARIOS2='".$operador->id."') AND FECHA_EVOLUCION BETWEEN TRUNC(SYSDATE) AND TRUNC(SYSDATE) + 1 ORDER BY FECHA_EVOLUCION";
 
                  
                      $cs=  strtoupper($operador->clinica);
                      
                      $Cn=new conexion($cs);
                      $conexion=$Cn->conectarse();

                      $consulta=oci_parse($conexion,$sql);

                      $ejecutar=oci_execute($consulta);
                      $numlinea=0;
                      echo"<ul data-role='listview'>";
                      while($row= oci_fetch_row($consulta)){
                          $numlinea++;
                          //echo "ID Profesional: ".$row[0]."<br />";
                          //echo "Nombre Profesional: ".$row[1]."<br />";
                          //echo "Especialidad: ".$row[2]."<br />";
                          echo"<li data-role='divider'>Paciente $numlinea</li>";
                          echo"<li>";
//                          echo"<li><a href='#'>";
                          echo "Fecha Evoluci&oacute;n: <b>".$row[6]."</b><br />";
                          echo "Historia: <b>".$row[3]."</b><br />";
                          echo "Paciente: <b>".$row[4]."</b><br />";
                          echo "Edad: <b>".$row[5]."</b><br />";
                          
//                          echo "ID Usuario: ".$row[7]."<br />";
//                          echo "Nombre Usuario: ".$row[8]."<br />";
                          echo "Servicio: <b>".$row[9]."</b><br />";
//                          echo "Tipo: ".$row[10]."<br />";
//                          echo "Cancelado: ".$row[11]."<br />";
                          
                         // echo $row[0];
//                          echo"</a></li>";  
                           echo"</li>";
                      }
                    ?>
                         
                </div>
            </div>
            <div data-role="footer" style="text-align:center;"><h3>Organizaci&oacuten Las 24 Horas</h3></div>
     </div>
        
         



    </body>
    
</html>