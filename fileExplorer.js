/*------------------------------------------------------------------/
/                                                                   /
/                    Récupération des données                       /
/                                                                   /
/------------------------------------------------------------------*/

async function getFolder(name) {
    const response = await fetch(`http://localhost/GSB/Drive%20GSB/temp.api.php?folder=${name}`);
    if (!response.ok) {
        console.error('Erreur lors de la récupération des données du dossier');
        return;
    }
    const folder = await response.json();
    console.log(folder);
    return folder;
}

/*------------------------------------------------------------------/
/                                                                   /
/                     Utilisation des données                       /
/                                                                   /
/------------------------------------------------------------------*/

async function showFolder(){

    try {
        let folders = await getFolder(1);

        let list = createEntireElement('div', { 
            id: 'list',
            style: { display: 'block' }, 
        });
    
        folders.forEach(folder => {
            
            let row = createEntireElement('div', { style: { display: 'flex', flexDirection: 'row' } });
            
            let name = createEntireElement('p', { name: 'name', innerText: folder.name });
            row.appendChild(name);
            let type = createEntireElement('p', { name: 'type', innerText: folder.type });
            row.appendChild(type);
            let date = createEntireElement('p', { name: 'date', innerText: folder.creationDate });
            row.appendChild(date);
            let author = createEntireElement('p', { name: 'author', innerText : folder.author });
            row.appendChild(author);
            let size = createEntireElement('p', { name: 'size', innerText: folder.size });
            row.appendChild(size);
    
            list.appendChild(row);
        });

        return list;

    } catch (error) {
        console.error("Erreur lors de la récupération des dossiers: ", error)
        return;
    }

}

showFolder().then(list=>{
    if (list) {
        document.body.appendChild(list);
        console.log(list);
    }
});