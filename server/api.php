<?php

include "webService.php";

//Préciser dans le constructeur le dossier par défaut (sinon par défaut : C:\)
$oFolder = new Folder('C:\\Users\\PotiPoton\\Documents\\Informatique\\Arbo de test');

if (isset($_GET['folder'])){
    if($_GET['folder'] == 'root'){
        echo $oFolder->getRootFolder();
    }
}


?>