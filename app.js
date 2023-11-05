console.log("Let's get this party started!");

async function searchGiphy(query) {
    const result = await axios.get(
        `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
    return result;
}

async function searchAndAdd(query) {
    if(query === '') {
        query='hilarious'
    }
    const results = await searchGiphy(query);

    // pick a random gif from the results
    const rando = Math.floor(Math.random()*results.data.data.length);
    const resURL = results.data.data[rando].images.fixed_height.url;

    appendGif(resURL);
}

function appendGif(reference) {
    const container = document.querySelector('#results');
    const image = document.createElement('img')
    image.setAttribute('src', reference);
    container.appendChild(image);
}

document.querySelector('#searchForm').addEventListener('submit', function(evt) {
    evt.preventDefault();
    searchAndAdd(document.querySelector('#queryText').value);
});
document.querySelector('#clearBtn').addEventListener('click', function() {
    document.querySelector('#results').innerHTML = '';
});