/*------------------------------------------------------------------/
/                                                                   /
/                    Récupération des données                       /
/                                                                   /
/------------------------------------------------------------------*/

async function getFolder(path) {
    const response = await fetch(`http://localhost/GSB/DriveGSB/server/api.php?folder=${path}`);
    if (!response.ok) {
        console.error('Erreur lors de la récupération des données du dossier');
        return;
    }
    const folder = await response.json();
    console.log(`Données récupérées : ${folder}`);
    return folder;
}

/*------------------------------------------------------------------/
/                                                                   /
/                     Utilisation des données                       /
/                                                                   /
/------------------------------------------------------------------*/

async function showFolder(){

    try {
        let folders = await getFolder('root');

        // Vérifier si folders est bien un tableau et contient au moins un élément
        if (!Array.isArray(folders) || folders.length === 0) {
            console.error("Les dossiers récupérés sont vides ou non valides.");
            return;
        }

        let table = createEntireElement('table');

        let thead = createEntireElement('thead'); 
        let trhead = createEntireElement('tr');
        Object.keys(folders[0]).forEach(key => {
           let th = createEntireElement('th', { innerText: key });
           trhead.appendChild(th);
        });
        thead.appendChild(trhead);
        table.appendChild(thead);

        let tbody = createEntireElement('tbody');
        folders.forEach((folder, index) => {
            let tr = createEntireElement('tr');
            Object.values(folder).forEach(value => {
                let td = createEntireElement('td', { innerText: value ?? "" });
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        return table;

    } catch (error) {
        console.error("Erreur lors de la récupération des dossiers: ", error)
        return;
    }

}

showFolder().then(table=>{
    if (table) {
        document.body.appendChild(table);
        console.log(table);
    }
});