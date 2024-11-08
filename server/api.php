<?php

include "webService.php";

//* Préciser dans le constructeur le dossier par défaut /!\
$oFolder = new Folder('C:\\Users\\PotiPoton\\Documents\\Informatique');

if (isset($_GET['folder'])) {
    echo $oFolder->getFolder($_GET['folder']);
}


?>