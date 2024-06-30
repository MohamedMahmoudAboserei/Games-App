class GameApp {
    constructor() {
        this.links = document.querySelectorAll(".menu a");
        this.loader = document.querySelector(".loading");
        this.apiKey = 'b9246f6cc1msh0faf3b69e1a5a91p1b2e10jsn998749b6ea32';
        this.apiHost = 'free-to-play-games-database.p.rapidapi.com';
        this.init();
    }

    init() {
        this.addEventListeners();
        this.getGames("mmorpg");
    }

    addEventListeners() {
        for (let i = 0; i < this.links.length; i++) {
            this.links[i].addEventListener("click", (e) => {
                document.querySelector(".menu .active").classList.remove("active");
                this.links[i].classList.add("active");
                const category = this.links[i].dataset.category;
                this.getGames(category);
            });
        }
    }

    async getGames(categoryName) {
        this.loader.classList.remove("d-none");
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': this.apiHost
            }
        };

        try {
            const apiResponse = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
            const data = await apiResponse.json();
            this.displayData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            this.loader.classList.add("d-none");
        }
    }

    displayData(gamesData) {
        let gamesBox = ``;
        for (let i = 0; i < gamesData.length; i++) {
            let videoPath = gamesData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");
            gamesBox += `
                <div class="col">
                    <div class="card h-100 bg-transparent" role="button">
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
            `;
        }
        const gameDataContainer = document.getElementById('gameData');
        gameDataContainer.innerHTML = gamesBox;

        // Add event listeners after the elements have been added to the DOM
        const cards = gameDataContainer.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', (event) => this.startVideo(event));
            card.addEventListener('mouseleave', (event) => this.stopVideo(event));
            card.addEventListener('click', () => this.showDetails(gamesData[index].id));
        });
    }

    startVideo(event) {
        const videoEl = event.target.querySelector("video");
        if (videoEl) {
            videoEl.classList.remove("d-none");
            videoEl.muted = true;
            videoEl.play();
        }
    }

    stopVideo(event) {
        const videoEl = event.target.querySelector("video");
        if (videoEl) {
            videoEl.classList.add("d-none");
            videoEl.muted = true;
            videoEl.pause();
        }
    }

    showDetails(id) {
        location.href = `./details.html?id=${id}`;
    }
}

// Start the process
const gameApp = new GameApp();
