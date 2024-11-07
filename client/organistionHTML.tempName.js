function createEntireElement(element, attributes){
    let elm = document.createElement(element);

    console.log(`Création de l'élément : ${element} avec les attributs : ${attributes}`);

    if (attributes === undefined){
        return elm
    }
    for (let [key, value] of Object.entries(attributes)) {
        if (value !== undefined) {
            if (key === 'innerText') elm.innerText = value;
            else if (key === 'innerHTML') elm.innerHTML = value;
            else if (key === 'style' && typeof value === 'object') {
                Object.assign(elm.style, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                elm.addEventListener(key.slice(2), value);
            } else elm.setAttribute(key, value);
        }
    }
    return elm;
}

//*Exemple d'utilisation de createEntireElement :
// let div = createEntireElement('div', { id: 'cnt' });
// let iptBtn = createEntireElement('input', { 
//     type: 'button', 
//     value: 'Bonjour toi', 
//     onclick: function (e) {
//         e.preventDefault();
//         let existingP = document.getElementById('p');
//         if (existingP) existingP.remove();
//         else {
//             let p = createEntireElement('p', { 
//                 id: 'p', 
//                 innerText: 'SALUT BOTÉDAIZIL' });
//             document.body.appendChild(p);
//         }
//     }
// });
// document.body.appendChild(div);
// document.body.appendChild(iptBtn);

