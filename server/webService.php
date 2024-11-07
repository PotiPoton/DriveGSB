<?php
include 'functions.php';



class folder {

    //Root folder
    private $root;

    public function __construct($root = 'C:\\'){
        $this->root = $root;
    }

    public function getRootFolder(){
        try{
            $folderStructure = getFolderStructure($this->root);
            return json_encode($folderStructure);
        } catch(Exception $e) {
            throw new Exception("impossible de récupérer le dossier demandé".$e->getMessage());
        }

    }
}

?>