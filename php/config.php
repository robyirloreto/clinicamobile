<?php
  
  define("IPSERVER",$_SERVER['SERVER_ADDR']);
  define("IPLOCAL",$_SERVER['REMOTE_ADDR']);
  
class conexion
{
     private $server;
     private $db;
     private $udb;
     private $pdb;  
     
     public function __construct($clinica){
        //$host=($clinica=="ASESA")?"10.2.150.70":"10.1.150.70";
      $host=($clinica=="ASESA")?"10.2.150.70":"ccfa1.no-ip.org";
//      $this->server = "(DESCRIPTION =";
//      $this->server.="(ADDRESS = (PROTOCOL = TCP)(HOST = 10.1.150.70)(PORT = 1521))";
//      $this->server.="(CONNECT_DATA = (SID = o24)))";
      $this->server = "(DESCRIPTION =";
      $this->server.="(ADDRESS = (PROTOCOL = TCP)(HOST = ".$host.")(PORT = 1521))";
      $this->server.="(CONNECT_DATA = (SID = o24)))";
      $this->udb= "sistemas";
      $this->pdb = "las36horas"; 
         
     }
    
     
    public function conectarse()
    {
        $Cn = oci_pconnect($this->udb,$this->pdb,$this->server,'AL32UTF8');
        if (!$Cn) 
            {
                $e = oci_error();
                trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
                return "noconex";
            }
        else{
                
              $qry = oci_parse($Cn, "alter session set NLS_TERRITORY='SPAIN'");
              $qry = oci_execute($qry);
              @oci_commit($Cn);

              $qry = oci_parse($Cn, "alter session set NLS_DATE_FORMAT='DD-MM-YYYY HH24:MI:SS'");
              $qry = oci_execute($qry, OCI_DEFAULT);
              @oci_commit($Cn);

              $qry = oci_parse($Cn, "alter session set NLS_TIMESTAMP_FORMAT='DD-MM-YYYY HH24:MI:SS'");
              $qry = oci_execute($qry, OCI_DEFAULT);
              @oci_commit($Cn);

             /* $qry = oci_parse($Cn, "alter session set NLS_NUMERIC_CHARACTERS='.,'");
              $qry = oci_execute($qry, OCI_DEFAULT);
              @oci_commit($Cn);*/

            
            return $Cn;}
        
           //by Robyir
    }
}

 
 
?>

