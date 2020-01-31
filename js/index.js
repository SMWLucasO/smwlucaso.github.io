(function () {
    'use strict';

    let currentIndex = 1;

    document.getElementById("next").onclick = (click) => {
        clearActiveItems();

        let projects = document.getElementsByClassName('gallery-item');
        if((currentIndex) >= projects.length-1)
            currentIndex = -1;

        projects[++currentIndex].classList.add('active-item');
        projects[++currentIndex].classList.add('active-item');
    };

    document.getElementById("prev").onclick = (click) => {
        clearActiveItems();
        let projects = document.getElementsByClassName('gallery-item');

        if((currentIndex-2) < 0)
            currentIndex = projects.length;

        projects[--currentIndex].classList.add('active-item');
        projects[--currentIndex].classList.add('active-item');
    };

    function clearActiveItems() {
        [...document.getElementsByClassName('active-item')].forEach((el) => el.classList.remove('active-item'));
    }

    function setupProjects() {
        fetch('assets/data/projects.json')
            .then(returned => returned.json())
            .then(outcome => {
                generateHTMLFromTemplate(outcome, generateProjectHTML);
            });
    }

    function generateHTMLFromTemplate(projectJSONData) {
        fetch('templates/project.mustache')
            .then(data => data.text())
            .then(template => {
                for (let project in projectJSONData.projects) {
                    generateProjectHTML(template, project, projectJSONData.projects[project]);
                }
            }).finally(() => {
            showInitialProjectsInHTML();
        });
    }

    function generateProjectHTML(template, projectName, project) {
        let rendered = Mustache.render(template,
            {
                name: projectName,
                description: project.description,
                src: project.src,
                tags: project.tags
            }
        );

        document.getElementById("projects-placeholder").innerHTML += rendered;
    }

    function showInitialProjectsInHTML() {
        let galleryItems = document.getElementsByClassName('gallery-item');
        galleryItems[0].classList.add('active-item');
        galleryItems[1].classList.add('active-item');
    }

    setupProjects();
})();