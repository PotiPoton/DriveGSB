<?php

function getFolderStructure($dirPath) {
    $structure = [];
    $items = scandir($dirPath); // Récupère tous les éléments du dossier

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;

        $itemPath = $dirPath . DIRECTORY_SEPARATOR . $item;
        $info = [
            'name' => $item,
            'path' =>realpath($itemPath),
            'size' => filesize($itemPath),
            'lastModified' => date('Y-m-d H:i:s', filemtime($itemPath))
        ];

        if (is_dir($itemPath)) {
            $info['type'] = 'folder';
            $info['children'] = getFolderStructure($itemPath);
            $info['size'] = 0;
        } else {
            $info['type'] = 'file';
        }

        $structure[] = $info;
    }



    return $structure;
}

?>