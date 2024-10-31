window.addEventListener("scroll", function(){
    let header = this.document.querySelector("#header")
    header.classList.toggle('rolagem', window.scrollY > 0)
  })


  document.addEventListener('DOMContentLoaded', () => {
    const infoForm = document.getElementById('infoForm');
    const infoInput = document.getElementById('infoInput');
    const infoList = document.getElementById('infoList');

    let infos = JSON.parse(localStorage.getItem('infos')) || [];

    const renderInfos = () => {
        infoList.innerHTML = '';
        infos.forEach((info, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${info} 
                <span class="edit" data-index="${index}">Editar</span>
                <span class="delete" data-index="${index}">Remover</span>
            `;
            infoList.appendChild(li);
        });
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('infos', JSON.stringify(infos));
    };

    infoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        infos.push(infoInput.value);
        saveToLocalStorage();
        renderInfos();
        infoInput.value = '';
    });

    infoList.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');

        if (e.target.classList.contains('edit')) {
            infoInput.value = infos[index];
            infos.splice(index, 1);
        }

        if (e.target.classList.contains('delete')) {
            infos.splice(index, 1);
            saveToLocalStorage();
            renderInfos();
        }

        saveToLocalStorage();
        renderInfos();
    });

    renderInfos();
});
