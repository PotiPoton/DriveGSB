/*------------------------------------------------------------------/
/                                                                   /
/                    Récupération des données                       /
/                                                                   /
/------------------------------------------------------------------*/

async function getFolder(path) {
    const response = await fetch(`http://localhost/GSB/DriveGSB/server/api.php?folder=${path}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des données du dossier");

    const folder = await response.json();
    if (!Array.isArray(folder)) throw new Error("Les dossiers récupérés sont non valides.");

    return folder;
}

/*------------------------------------------------------------------/
/                                                                   /
/                     Utilisation des données                       /
/                                                                   /
/------------------------------------------------------------------*/

/**
 * clearTable - Supprime la table avec l'id 'folderSelection' si elle existe
 */
function clearTable() {
    let existingTable = document.getElementById('folderSelection');
    if (existingTable) existingTable.remove();
}

/**
 * cutEndString - Supprime toute une partie à la fin d'une chaine à partir du caractère définit
 * 
 * @param {string} string - Chaine de caratère à couper
 * @param {char} char - Caratère de jonction
 * @returns {string}
 */
function cutEndString(string, char = '\\') {
    let lastCharString = string.lastIndexOf(char);
    cuttedString = string.substring(0, lastCharString);
    if (!cuttedString) return '';
    return cuttedString;
}

/**
 * previousFolder - permet de créer un bouton dans une table row qui renvoie au dossier précédent si celui-ci existe
 * 
 * @param {string} currentPath - chemin relatif courrant
 * @returns - une table row qui permet d'accèder au dossier précédent si celui-ci existe
 */
function previousFolder(currentPath) {
    if (currentPath !== '') {
        let tr = createEntireElement('tr');
        let td = createEntireElement('td', {
            innertext: "Dossier précédent",
            onclick: (e) => {
                e.preventDefault();
                let folderPath = (currentPath) ? cutEndString(currentPath) : '';
                localStorage.setItem('folderPath', (folderPath == '') ? '' : folderPath);
                showFolder(folderPath).then(table => {
                    if (table) document.body.appendChild(table);
                });
            }
        });
        tr.appendChild(td);
        return tr;
    }
    return null;
}

/**
 * show folder - Affiche une table dynamique de dossiers à partir d'un chemin donné
 * 
 * @param {string} path - Le chemin du dossier à afficher (par défaut, '')
 * @returns {HTMLTableElement} - Une table HTML remplie de dossier et de fichiers
 */
async function showFolder(path = ''){
    clearTable();

    try {
        let folders = await getFolder(path);
        let hiddenColumns = [];
        let currentPath = localStorage.getItem('folderPath');
        // if ()

        let table = createEntireElement('table', { id: 'folderSelection' });

        //Table head
        let thead = createEntireElement('thead'); 
        let trhead = createEntireElement('tr');
        Object.keys(folders[0]).forEach((key, index) => {
            let th;
            if (key === 'path' || key == 'type') {
                th = createEntireElement('th', { innerText: key });
                hiddenColumns.push(index);
            } else {
                th = createEntireElement('th', { 
                    innerText: key,
                    onclick: (e) => {
                        e.preventDefault();
                        //TODO: Implémenter le tri par colonne
                    }
                });
                
            }
            trhead.appendChild(th);
        });
        thead.appendChild(trhead);
        table.appendChild(thead);

        //Table body
        let tbody = createEntireElement('tbody');

        //Dossier Précédent
        let trPreviousFolder = previousFolder(currentPath);
        if (trPreviousFolder) tbody.appendChild(trPreviousFolder);
        
        //Dossiers Suivants
        folders.forEach((folder) => {
            let tr = createEntireElement('tr');
            Object.values(folder).forEach(value => {
                let td = createEntireElement('td', { 
                    innerText: value ?? "",
                    onclick: (e) => {
                        e.preventDefault();
                        let currentPath = localStorage.getItem('folderPath');
                        let folderPath = (currentPath) ? currentPath + '\\' + value : value;
                        localStorage.setItem('folderPath', folderPath);
                        showFolder(folderPath).then(table=>{
                            if (table) document.body.appendChild(table);
                        });
                    }
                });

                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        //Masquer les colonnes à ne pas afficher
        hiddenColumns.forEach(hiddenColumn => {
            for (let row of table.rows) {
                if (row.cells[hiddenColumn]) row.cells[hiddenColumn].className = 'hidden-column';
            }
        });

        return table;

    } catch (error) {
        console.error("Erreur lors de la récupération des dossiers: ", error)
        return;
    }

}

let currentPath = localStorage.getItem('folderPath');
currentPath = (currentPath) ? currentPath : '';
showFolder(currentPath).then(table => { if (table) document.body.appendChild(table); });


