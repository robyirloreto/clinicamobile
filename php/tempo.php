<?php
   $c=0;
    for($i=0;$i<10;$i++){
    	$c++;
        echo"c vale ".$c."<br/>";
   
        if($i%2==0){
            $c++;
        	echo"if i mod 2 es 0 incremento c y vale ".$c."<br/>";
        }

    }
?>