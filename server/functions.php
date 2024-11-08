<?php

function getFolderStructure($dirPath) {
    $structure = [];
    $items = scandir($dirPath); // Récupère tous les éléments du dossier

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;

        $itemPath = $dirPath . DIRECTORY_SEPARATOR . $item;
        $info = [
            'name' => $item,
            // 'path' =>realpath($itemPath),
            'size' => formatSize(filesize($itemPath)),
            'lastModified' => date('Y-m-d H:i:s', filemtime($itemPath))
        ];

        if (is_dir($itemPath)) {
            $info['type'] = 'folder';
            // $info['children'] = getFolderStructure($itemPath);
            $info['size'] = formatSize(getFolderSize($itemPath));
        } else {
            $info['type'] = 'file';
        }

        $structure[] = $info;
    }

    return $structure;
}

function formatSize($size) {
    $units = ['o', 'Ko', 'Mo', 'Go', 'To'];
    $unitIndex = 0;

    while ($size >= 1024 && $unitIndex < count($units) - 1) {
        $size /= 1024;
        $unitIndex++;
    }

    return round($size, 2) . ' ' . $units[$unitIndex];
}

function getFolderSize($dirPath) {
    $totalSize = 0;
    $items = scandir($dirPath);

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;

        $itemPath = $dirPath . DIRECTORY_SEPARATOR . $item;

        if (is_dir($itemPath)) {
            // Récursion pour calculer la taille des sous-dossiers
            $totalSize += getFolderSize($itemPath);
        } else {
            // Ajouter la taille du fichier
            $totalSize += filesize($itemPath);
        }
    }

    return $totalSize;
}

?>