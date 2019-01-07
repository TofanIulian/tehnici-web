var about = document.getElementById("aboutMe");
var resume = document.getElementById("resume");
var portfolio = document.getElementById("portfolio");
var contact = document.getElementById("contact");
var lastExperienceId = 0;
var data = [];
function renderExperienceHTML() {
    var html = "";
    about.innerHTML = "<h2>Work Experience</h2>";
    for (i = 0; i < data.length; i++) {
        html += `<div class="chapter">
                    <div class="chapter-header">
                        <h3>` + data[i].jobName + " at " + data[i].firmName + `</h3>
                    </div>
                    <div class="chapter-body">`
            + data[i].description + `
                    </div>
                    <br>
                    <button class="btn" onclick="deleteExperienceById(` + data[i].id + `)"><i class="fa fa-trash"></i> Delete</button>
                    <button class="btn" onclick="openModal(`+ data[i].id + `)"><i class="fa fa-edit"></i> Update</button>
                    <span>` + data[i].startDate + ' - ' + data[i].endDate + `</span>
                </div> `
    }
    lastExperienceId = data[data.length - 1].id;
    html += `<button class="btn open" onclick="openModal('create')"><i class="fa fa-plus-circle"></i> Add new work experience</button>`
    //console.log(html);
    about.insertAdjacentHTML('beforeend', html);

    document.getElementById('bodyc').innerHTML = document.getElementById('about-me-component').innerHTML;
}

function renderResumeHTML() {
    var html = "";
    resume.innerHTML = "<h2>Resume</h2>";
    for (i = 0; i < data.length; i++) {
        html += `<div class="chapter">
                    <div class="chapter-body">`
            + data[i].body + `
                    </div>
                    <img src="` + data[i].imgLink + `" alt="nothing stuff" class="nothing">

                </div> `
    }
    //console.log(html);
    resume.insertAdjacentHTML('beforeend', html);
    document.getElementById('bodyc').innerHTML = document.getElementById('resume-component').innerHTML;
}

function renderPortfolioHTML() {
    var html = "";
    portfolio.innerHTML = ``;
    html = `<div class="chapter">
    <img src="` + data.imgLink + `" alt="nothing stuff" class="nothing">
            </div> `;
    portfolio.insertAdjacentHTML('beforeend', html);

    document.getElementById('bodyc').innerHTML = document.getElementById('portfolio-component').innerHTML;
}

function renderContactHTML() {
    var html = "";
    contact.innerHTML = "<h2>Contact</h2>";
    for (i = 0; i < data.length; i++) {
        html += `<div class="chapter">
                    <div class="chapter-header">
                        <h3>` + data[i].lastName + " " + data[i].fistName +`</h3>
                        <h4>` + data[i].location + `</h4>
                    </div>
                    <div class="chapter-body">`
            + data[i].email +"<br>" + data[i].phoneNumber + `
                    </div>
                    <img src="` + data[i].imgLink + `" alt="cat stuff" class="cat">
                </div> `
    }
    //console.log(contact.innerHTML);
    contact.insertAdjacentHTML('beforeend', html);
    document.getElementById('bodyc').innerHTML = document.getElementById('contact-component').innerHTML;
    
}

window.onload = function () {
    getAll('experience');
};


function f(source, tab) {
    // document.getElementById('bodyc').innerHTML = document.getElementById(source).innerHTML;
    document.getElementById('about-me-tab').className = document.getElementById('about-me-tab').className.replace(/(?:^|\s)selected(?!\S)/g, '');
    document.getElementById('resume-tab').className = document.getElementById('about-me-tab').className.replace(/(?:^|\s)selected(?!\S)/g, '');
    document.getElementById('portfolio-tab').className = document.getElementById('about-me-tab').className.replace(/(?:^|\s)selected(?!\S)/g, '');
    document.getElementById('contact-tab').className = document.getElementById('about-me-tab').className.replace(/(?:^|\s)selected(?!\S)/g, '');
    document.getElementById(tab).className += "selected";

    // var ourRequest = new XMLHttpRequest();
    // ourRequest.open('GET', 'http://localhost:3000/posts', true)
    // ourRequest.onload = function(){
    //     console.log(ourRequest.responseText);
    // }
    // ourRequest.send();
    // var ourPostRequest = new XMLHttpRequest();
    // ourPostRequest.open('POST', 'http://localhost:3000/posts')
    // ourPostRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // ourPostRequest.send(JSON.stringify({ "id": 2,
    // "title": "tofi",
    // "author": "it madafakin works" }));
}

function replaceContentInContainer(target, source) {
    document.getElementById(target).innerHTML = document.getElementById(source).innerHTML;
}

function nup() {
}

function getAll(param) { //GET ALL
    var url = "http://localhost:3000/" + param;
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
        data = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            // console.table(data);
            // console.log(xhr.responseText);
            //console.log(param);
            if (param == "experience")
                renderExperienceHTML();
            if (param == "resume")
                renderResumeHTML();
            if (param == "portfolio")
                renderPortfolioHTML();
            if (param == "contact")
                renderContactHTML();
        } else {
            console.error(experience);
        }
    }
    xhr.send(null);
}

function getById() { //Get 1
    var url = "http://localhost:8080/api/v1/users";
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url + '/1', true)
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            //console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
}


function create(param) { //POST
    var url = "http://localhost:3000/" + param;

    var data = {};

    data.id = lastExperienceId + 1;
    data.jobName = document.getElementById("jobName").value;
    data.firmName = document.getElementById("firmName").value;
    data.description = document.getElementById("description").value;
    data.startDate = document.getElementById("startDate").value;
    data.endDate = document.getElementById("endDate").value;
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.table(users);
             getAll(param);
        } else {
            console.error(users);
        }
    }
    xhr.send(json);

    modal.style.display = "none";
}



function updateExperience(id) { //PUT
    var url = "http://localhost:3000/experience/";

    var data = {};
    data.jobName = document.getElementById("jobName").value;
    data.firmName = document.getElementById("firmName").value;
    data.description = document.getElementById("description").value;
    data.startDate = document.getElementById("startDate").value;
    data.endDate = document.getElementById("endDate").value;
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url + id, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
            getAll('experience');
        } else {
            console.error(users);
        }
    }
    xhr.send(json);

    modal.style.display = "none";
}

function deleteExperienceById(id) { //DELETE
    var url = "http://localhost:3000/experience/";
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + id, true);
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
            getAll('experience');
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
}



// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
function openModal(option) {
    if(option == 'create'){
        document.getElementById("jobName").value = '';
        document.getElementById("firmName").value = '' ;
        document.getElementById("description").value = '';
        document.getElementById("startDate").value = '';
        document.getElementById("endDate").value = '';
        footer.innerHTML = `<button class="sub-button" onclick="create('experience')">Add</button>`;
    }
    else{
        const result = data.filter(experience => experience.id == option);
        //console.log(result);
        document.getElementById("jobName").value = result[0].jobName;
        document.getElementById("firmName").value = result[0].firmName ;
        document.getElementById("description").value = result[0].description;
        document.getElementById("startDate").value = result[0].startDate;
        document.getElementById("endDate").value = result[0].endDate;
        footer.innerHTML = `<button class="sub-button" onclick="updateExperience(`+ result[0].id + `)">Update</button>`;
    }
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
