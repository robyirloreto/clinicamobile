<?php
    class uOperador{
        public $id='';
        public $cedula=''; 
        public $nombres='';
        public $grupo='';
        public $clinica='';
        public function __construct($id,$ced,$nom,$gru,$cli) {
         $this->id=$id;
         $this->cedula=$ced; 
         $this->nombres=$nom;
         $this->grupo=$gru;
         $this->clinica=$cli;
        } 
      }
    
?>