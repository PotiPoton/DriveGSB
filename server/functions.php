<?php

function getFolderStructure($dirPath) {
    $structure = [];
    $items = scandir($dirPath); // Récupère tous les éléments du dossier

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;

        $itemPath = $dirPath . DIRECTORY_SEPARATOR . $item;

        if (is_dir($itemPath)) {
            // Ajouter le dossier avec ses enfants
            $structure[] = [
                'type' => 'folder',
                'name' => $item,
                'path' => $itemPath,
                'children' => getFolderStructure($itemPath)
            ];
        } else {
            // Ajouter le fichier
            $structure[] = [
                'type' => 'file',
                'name' => $item,
                'path' => $itemPath
            ];
        }
    }

    return $structure;
}

?>