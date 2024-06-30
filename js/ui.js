export class GameDisplay {
    static displayData(gamesData) {
        let gamesBox = ``;
        for (let i = 0; i < gamesData.length; i++) {
            let videoPath = gamesData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");
            gamesBox += `
                <div class="col">
                    <div onmouseleave="gameApp.stopVideo(event)" onmouseenter="gameApp.startVideo(event)" onclick="gameApp.showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button">
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
        document.getElementById('gameData').innerHTML = gamesBox;
    }
}

export class detailsDisplay {
    static displayData(containerDetails) {
        const detailsBox = `
            <div class="col-md-4">
                <figure>
                    <img src="${containerDetails.thumbnail}" class="w-100" alt="details image" />
                </figure>
            </div>
            <div class="col-md-8">
                <div>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" class="text-light">
                            <li class="breadcrumb-item text-reset"><a href="./index.html">Home</a></li>
                            <li class="breadcrumb-item text-info" aria-current="page">${containerDetails.title}</li>
                        </ol>
                    </nav>
                    <h1>${containerDetails.title}</h1>
                    <h3>About ${containerDetails.title}</h3>
                    <p>${containerDetails.description}</p>
                </div>
            </div>
        `;
        document.getElementById("detailsData").innerHTML = detailsBox;

        const backgroundImage = containerDetails.thumbnail.replace(
            "thumbnail",
            "background"
        );
        document.body.style.cssText = `
            background-image:url('${backgroundImage}') ;
            background-size:cover;
            background-position:center;
        `;
    }
}

