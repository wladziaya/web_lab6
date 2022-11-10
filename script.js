const statusBar = document.getElementById('downloadStatus')
const mainContainer = document.getElementById("usersContainer");
const fetchData = () => {
    statusBar.innerText = ""
    mainContainer.innerText = ""
    fetch('https://randomuser.me/api/?results=5')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            statusBar.innerText = "Download successfully with fetch"
            appendData(data.results)
        })
        .catch((error) => {
            statusBar.innerText = "Oooooops, something wrong with fetch: " + error;
        });
}

const promiseData = () => {
    statusBar.innerText = ""
    mainContainer.innerText = ""
    let urls = Array(5).fill('https://randomuser.me/api');
    Promise.all(urls.map(url =>
        fetch(url).then(response => { return response.json() })
    )).then((value) => {
        statusBar.innerText = "Download successfully with promise"
        value.map(user => appendData(user.results))
    }).catch((error) => {
        statusBar.innerText = "Oooooops, something wrong with promise: " + error;
    });
}

function appendData(data) {
    data.map(user => mainContainer.insertAdjacentHTML('beforeend',
    `<div id="userDiv">
        <img src=${user.picture.large} alt="profile-picture">
        <span>Cell: ${user.cell}</span>
        <span>City: ${user.location.city}</span>
        <span>Postcode: ${user.location.postcode}</span>
        <span>Email: <br> ${user.email}</span>
    </div>`))
}
