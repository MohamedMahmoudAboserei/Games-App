export class Display {
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
