const searchInput = document.getElementById('search-term');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');
const songTitle = document.getElementById('song-title');
const songLyric = document.getElementById('song-lyric');

// Search button event handler
searchBtn.addEventListener('click', showSearchResults);

function showSearchResults() {
    let searchTerm = searchInput.value;

    if(searchTerm === '' || searchTerm === null || typeof(searchTerm) !== 'string'){
        alert('Please enter your artist song name');
    }
    else {
        getSearchResult(); 
        searchTerm.value = '';       
    }
}

async function getSearchResult() {
    const response = await fetch(`https://api.lyrics.ovh/suggest/${searchInput.value}`);
    const result = await response.json();

    const singleResult = result.data.slice(0, 10).map(song => `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button data-title="${song.title}" data-artist="${song.artist.name}" onClick="showLyrics()" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>  
    `).join('');

    searchResult.innerHTML = singleResult;
}


// get lyrics button event handler function
function showLyrics() {
    const artist = event.target.dataset.artist;
    const title = event.target.dataset.title;
    console.log(artist, title);
    
    songTitle.innerText = title;
    songLyric.innerText = getLyrics(artist, title).lyrics;
    console.log(getLyrics(artist, title).lyrics);
}

async function getLyrics(artist, title) {
    const response = await fetch(`https://api.lyrics.ovh/v1/'${artist}/${title}`);
    const data = await response.json();
    return data;
}