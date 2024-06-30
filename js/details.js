class GameDetails {
    constructor() {
        this.containerDetails = {};
        this.apiKey = 'b9246f6cc1msh0faf3b69e1a5a91p1b2e10jsn998749b6ea32';
        this.apiHost = 'free-to-play-games-database.p.rapidapi.com';
        this.id = new URLSearchParams(location.search).get("id");
        this.init();
    }

    async init() {
        await this.fetchData();
        this.displayData();
    }

    async fetchData() {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': this.apiHost
            }
        };
        const api = await fetch(
            `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`,
            options
        );
        this.containerDetails = await api.json();
    }

    displayData() {
        const detailsBox = `
            <div class="col-md-4">
                <figure>
                    <img src="${this.containerDetails.thumbnail}" class="w-100" alt="details image" />
                </figure>
            </div>
            <div class="col-md-8">
                <div>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" class="text-light">
                            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
                            <li class="breadcrumb-item text-info" aria-current="page">${this.containerDetails.title}</li>
                        </ol>
                    </nav>
                    <h1>${this.containerDetails.title}</h1>
                    <h3>About ${this.containerDetails.title}</h3>
                    <p>${this.containerDetails.description}</p>
                </div>
            </div>
        `;
        document.getElementById("detailsData").innerHTML = detailsBox;
        const backgroundImage = this.containerDetails.thumbnail.replace("thumbnail", "background");
        document.body.style.cssText = `
            background-image:url('${backgroundImage}') ;
            background-size:cover;
            background-position:center;
        `;
    }
}

// Start the process
new GameDetails();
