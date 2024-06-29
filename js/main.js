// =============> Global <===============
const links = document.querySelectorAll(".menu a");
const loader = document.querySelector(".loading");

// =============> When Start <===============
getGames("mmorpg");

// =============> Events <===============

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        document.querySelector(".menu .active").classList.remove("active");
        links[i].classList.add("active");
        const category = links[i].dataset.category;
        getGames(category)
    });
}

// =============> Functions <===============

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
async function getGames(categoryName) {
    loader.classList.remove("d-none");
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b9246f6cc1msh0faf3b69e1a5a91p1b2e10jsn998749b6ea32',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const apiResponse = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
    const data = await apiResponse.json();
    displayData(data)
    loader.classList.add("d-none");
}

function displayData(gamesData) {
    let gamesBox = ``
    for (let i = 0; i < gamesData.length; i++) {
        let videoPath = gamesData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");
        gamesBox += `
            <div class="col">
                <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button">
                    <div class="card-body">
                        <figure class="position-relative">
                            <img class="card-img-top object-fit-cover h-100"
                                src="${gamesData[i].thumbnail}">
                            <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                                <source src="${videoPath}">
                                </video>
                        </figure>
                        <figcaption>
                            <div class="hstack justify-content-between">
                                <h3 class="h6 small">${gamesData[i].title}</h3>
                                <span class="badge text-bg-primary p-2">Free</span>
                            </div>
                            <p class="card-text small text-center opacity-50">
                                ${gamesData[i].short_description}
                            </p>
                        </figcaption>
                    </div>
                    <footer class="card-footer small hstack justify-content-between">
                        <span class="badge badge-color">${gamesData[i].genre}</span>
                        <span class="badge badge-color">${gamesData[i].platform}</span>
                    </footer>
                </div>
            </div>
        `
    }
    document.getElementById('gameData').innerHTML = gamesBox;
}

function startVideo() {
    const videoEl = event.target.querySelector("video");
    videoEl.classList.remove("d-none");
    videoEl.muted = true;
    videoEl.play();
}

function stopVideo() {
    const videoEl = event.target.querySelector("video");
    videoEl.classList.add("d-none");
    videoEl.muted = true;
    videoEl.pause();
}

function showDetails(id) {
    location.href = `./details.html?id=${id}`;
}

