
let result;

window.onload = function(){
    document.addEventListener('click', documentAction);

    function documentAction(e){
        const target = e.target;
        if(target.classList.contains("btn__load")){
            getProjects(target);

        }
        if(target.classList.contains("info__icon")){
            modal(target.parentNode, result)
        }
    }
}

async function getProjects(button){
    if(!button.classList.contains("_hold")){
        button.classList.add("_hold");
        const file = "./json/projects.json";
        let response = await fetch(file, {
            method: "GET"
        });
        if(response.ok) {
            document.querySelector('.section__projects').style.alignItems = 'flex-start'
            result = await response.json();
            loadProjects(result);
            button.classList.remove("_hold");
            button.remove();
        } else {
            alert("Ошибка");
        }
        
    }
    
}

const projectsContainer = document.querySelector('.projects__container');

function loadProjects(data){
    data.projects.forEach(item => {
        const projectImg = item.img;
        const projectId = item.id;

        let html = `
            <article class="project__item item">
                <img src="./img/${projectImg}" alt="img" class="item__image">
                <div class="item__info info" data-id="${projectId}">
                    <img src="./img/infoIcon.svg" alt="info" class="info__icon">
                </div>
            </article>
        ` 
        projectsContainer.insertAdjacentHTML("beforeend", html);
    });
}

const modalWindow = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');
const modalShadow = document.querySelector('.modal__shadow');

modalShadow.addEventListener('click', closeModal)

function closeModal(){
    modalWindow.classList.remove('active');
    document.body.classList.remove('_lock');
    modalShadow.classList.remove('active');
    if(modalContainer){
        modalContainer.remove();
    }
}

function modal(modalType, data){
    const currentProject =  data.projects[modalType.dataset.id];
    const title = currentProject.title;
    const about = currentProject.about;
    const technologies = currentProject.technologies;
    const github = currentProject.UrlGithub;
    const url = currentProject.Url;
    const modalContainer = document.querySelector('.modal__container');
    if(modalContainer){
        modalContainer.remove();
    }
    let technologiesContainer = ``
    
    technologies.forEach(item => {
        technologiesContainer+=`<li class="technologies__item">${item}</li>`
    })
    console.log(technologiesContainer)

    let htmlModal = `
    <div class="modal__container">
        <h2 class="modal__title">${title}</h2>
        <h3 class="modal__about">${about}</h3>
        <ul class="modal__list technologies">${technologiesContainer}</ul>
        <div class="modal__urls">
            <a href="${github}"
                class="modal__github">${github}</a>
            <a href="${url}"
                class="modal__url">${url}</a>
        </div>
    </div>
    `
    modalWindow.insertAdjacentHTML('afterbegin', htmlModal);
    modalWindow.classList.add('active');
    document.body.classList.add('_lock');
    modalShadow.classList.add('active');
    
}

function stepSection() {
    const steps = document.querySelectorAll('.section');
    const buttonNext = document.querySelector('.btn__next');
    const buttonPrev = document.querySelector('.btn__prev');

    let sectionStep = 0;

    buttonNext.addEventListener('click', () => {
        sectionStep++;
        currentStep();
    });

    buttonPrev.addEventListener('click', () => {
        sectionStep--;
        currentStep();
    })

    function currentStep(){
        steps.forEach(step => {
            step.classList.contains('active') && step.classList.remove('active');
        })

        steps[sectionStep].classList.add('active')
        
        if(sectionStep === 0){
            buttonPrev.style.display = "none";
        } else{
            buttonPrev.style.display = "block";
        }
        
        if(sectionStep === steps.length - 1){
            buttonNext.style.display = "none";
        } else{
            buttonNext.style.display = "block";
        }
        
    }
    currentStep()

}

stepSection() 
