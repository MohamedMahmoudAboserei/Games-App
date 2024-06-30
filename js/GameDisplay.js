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
                                <video muted="true" preload="none" loop class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
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

