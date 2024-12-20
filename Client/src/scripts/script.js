document.addEventListener("DOMContentLoaded", () => {
    diplayMostListenedToArtists();
    displayTopListener();
    listenedToToday();
    usersWithSameTopGenre();
    recommendedAlbum();
    diplayUserPlaylists();
})

function toggleText() {
    var x = document.getElementById("textSH");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// Get the header
var header = document.getElementById("myHeader");

const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');

    if (carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }

    carousel[carouselImageIndex].classList.toggle('active');
}

setInterval(() => {
    changeCarousel();
}, 3000);

function performSearch() {
    // Get the search input value
    var searchTerm = document.getElementById("searchInput").value.trim();

    // Get the search results div
    var searchResultsDiv = document.getElementById("searchResults");

    // Check if the search term is not empty
    if (searchTerm !== "") {
        // Display the search term in the results div
        displaySearchResults(searchTerm);
        // Show the search results div
        searchResultsDiv.style.display = "block";
    } else {
        // If the search term is empty, hide the results div
        hideSearchResults();
    }
}

function displaySearchResults(result) {
    // Get the search results div
    var searchResultsDiv = document.getElementById("searchResults");

    // Display the result in a paragraph
    var resultParagraph = document.createElement("p");
    resultParagraph.textContent = "Search Result: " + result;

    // Clear previous results
    searchResultsDiv.innerHTML = "";

    // Append the new result
    searchResultsDiv.appendChild(resultParagraph);
}

function hideSearchResults() {
    // Hide the search results div
    var searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.style.display = "none";
}

//toggles playlist display (songs)
async function togglePlaylistResult(playlistName, playlistID) {
    const pName = document.getElementById('Playlist-name');
    pName.dataset.id = playlistID;
    pName.textContent = playlistName;
    const songsDIV = document.getElementById('playlist-songs');
    var playlistResult = document.getElementById('playlistResult');
    var userPlaylist = document.getElementById('userPlaylist');
    try {
        const response = await fetch(`http://localhost:3000/api/playlistSongs/${playlistName}`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            const data = await response.json();
            let n = 1;
            for (song of data) {
                const songDIV = document.createElement('div');
                songDIV.classList.add('queue');
                const songIMGDIV = document.createElement('div');
                songIMGDIV.classList.add('queue-cover');
                const songIMG = document.createElement('img');
                songIMG.src = `images/plCard${n}.png`;
                songIMGDIV.appendChild(songIMG);;
                songName = document.createElement('p');
                songName.classList.add('name');
                songName.textContent = song.songName;
                songDIV.appendChild(songIMGDIV);
                songDIV.appendChild(songName);
                songsDIV.appendChild(songDIV);
                n = n + 1;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }

    // Toggle the visibility of the collabResult div
    if (playlistResult.style.display === 'none') {
        playlistResult.style.display = 'block';
    } else {
        while (songsDIV.firstChild) {
            songsDIV.removeChild(songsDIV.firstChild);
        }
        playlistResult.style.display = 'none';
    }
}

//toggles playlist display (songs)
async function togglePersonalResult(playlistName, playlistID) {
    console.log('name:' + playlistName);
    const play = document.getElementById('personalized-playlist-name');
    play.dataset.id = playlistID;
    play.textContent = playlistName;
    const songsDIV = document.getElementById('personalized-playlist-songs');
    var playlistResult = document.getElementById('personal-result');
    try {
        const response = await fetch(`http://localhost:3000/api/playlistSongs/${playlistName}`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            const data = await response.json();
            let n = 1;
            for (song of data) {
                const songDIV = document.createElement('div');
                songDIV.classList.add('queue');
                const songIMGDIV = document.createElement('div');
                songIMGDIV.classList.add('queue-cover');
                const songIMG = document.createElement('img');
                songIMG.src = `images/plCard${n}.png`;
                songIMGDIV.appendChild(songIMG);;
                songName = document.createElement('p');
                songName.classList.add('name');
                songName.textContent = song.songName;
                songDIV.appendChild(songIMGDIV);
                songDIV.appendChild(songName);
                songsDIV.appendChild(songDIV);
                n = n + 1;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }

    // Toggle the visibility of the collabResult div
    if (playlistResult.style.display === 'none') {
        playlistResult.style.display = 'block';
    } else {
        while (songsDIV.firstChild) {
            songsDIV.removeChild(songsDIV.firstChild);
        }
        playlistResult.style.display = 'none';
    }
}

//toggles playlist display (songs)
async function togglePersonalResult(playlistName, playlistID) {
    console.log('name:' + playlistName);
    const play = document.getElementById('personalized-playlist-name');
    play.dataset.id = playlistID;
    play.textContent = playlistName;
    const songsDIV = document.getElementById('personalized-playlist-songs');
    var playlistResult = document.getElementById('personal-result');
    try {
        const response = await fetch(`http://localhost:3000/api/playlistSongs/${playlistName}`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            const data = await response.json();
            let n = 1;
            for (song of data) {
                const songDIV = document.createElement('div');
                songDIV.classList.add('queue');
                const songIMGDIV = document.createElement('div');
                songIMGDIV.classList.add('queue-cover');
                const songIMG = document.createElement('img');
                songIMG.src = `images/plCard${n}.png`;
                songIMGDIV.appendChild(songIMG);;
                songName = document.createElement('p');
                songName.classList.add('name');
                songName.textContent = song.songName;
                songDIV.appendChild(songIMGDIV);
                songDIV.appendChild(songName);
                songsDIV.appendChild(songDIV);
                n = n + 1;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }

    // Toggle the visibility of the collabResult div
    if (playlistResult.style.display === 'none') {
        playlistResult.style.display = 'block';
    } else {
        while (songsDIV.firstChild) {
            songsDIV.removeChild(songsDIV.firstChild);
        }
        playlistResult.style.display = 'none';
    }
}

//function to display collaborator names
async function getCollaborators() {
    var collabResultDiv = document.getElementById('collabResult');
    const collabDIV = document.getElementById('collaborators');
    var collabSearchButton = document.getElementById('collabSearch');
    const playlistName = document.getElementById('Playlist-name').textContent;
    try {
        const response = await fetch(`http://localhost:3000/api/collaborators/${playlistName}`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            while (collabDIV.firstChild) {
                collabDIV.removeChild(collabDIV.firstChild);
            }
            const data = await response.json();
            for (const collaborator of data) {
                username = document.createElement('p');
                username.classList.add('name');
                username.textContent = collaborator.collaborator;
                collabDIV.appendChild(username);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function toggleCollabResult() {
    var collabResultDiv = document.getElementById('collabResult');
    var collabSearchButton = document.getElementById('collabSearch');
    getCollaborators();
    // Toggle the visibility of the collabResult div
    if (collabResultDiv.style.display === 'none') {
        collabResultDiv.style.display = 'block';
        collabSearchButton.innerText = 'Close';
    } else {
        collabResultDiv.style.display = 'none';
        collabSearchButton.innerText = 'Show Collaborators';
    }
}

//display the users playlists
async function createNewPlaylist() {
    const div = document.getElementById("randomized-playlist");
    let n = 0;
    let counter = 0;
    for (child in div.children) {
        counter = counter + 1
        if (counter === 2) {
            n = n + 1;
            counter = 0;
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/api/createPlaylist/${n}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // function generateRandomNumber() {
        //   // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
        //   const randomNumber = Math.random();

        //   // Scale the random number to be between 1 and 3 (inclusive)
        //   const scaledNumber = Math.floor(randomNumber * 5) + 1;

        //   return scaledNumber;
        // }

        const data = await response.json();
        // const randomNum = generateRandomNumber();
        console.log("OUTPUT!!!");
        console.log(data);
        // console.log(randomNum);

        const playlistDiv = document.getElementById("randomized-playlist");
        // let playlistNum = 1;

        // Update the front end to append a new div with the playlist information
        // for (playlist of data){
        const playlistCard = document.createElement('div');
        playlistCard.classList.add('personal-playlist-card');
        const playlistImg = document.createElement('img');
        const playlistBtn = document.createElement('button');
        playlistImg.classList.add('personal-playlist-image');
        playlistImg.src = `images/album${n}.png`;
        playlistBtn.classList.add('playlist-user-button');
        playlistBtn.appendChild(playlistImg);
        const playName = document.createElement('p');
        playName.classList.add('personal-playlist-name');
        playName.textContent = data.playlistName;
        playlistCard.appendChild(playlistBtn)
        // playlistDiv.appendChild(playlistBtn);
        playlistDiv.appendChild(playName);
        playlistDiv.appendChild(playlistCard);
        console.log('playlist name: ' + data.playlistName);
        (function (playlistName, playlistID) {
            playlistDiv.onclick = function () {
                togglePersonalResult(playlistName, playlistID);
            };
        })(data.playlistName, data.playlistID);
        // playlistNum = playlistNum + 1;
        // }

    } catch (error) {
        console.error('Error:', error);
        // Handle errors as needed
    }
}


//function to display most listened to artists
async function diplayMostListenedToArtists() {
    try {
        const response = await fetch(`http://localhost:3000/api/totalSongListenTime`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            const data = await response.json();
            const artistsDIV = document.getElementById('top-artists')
            let n = 1;
            for (song of data) {
                const artistDIV = document.createElement('div');
                artistDIV.classList.add('playlist-card');
                const artistIMG = document.createElement('img');
                artistIMG.classList.add('playlist-card-img');
                artistIMG.src = `images/artist${n}.png`;
                artistName = document.createElement('p');
                artistName.classList.add('playlist-card-name');
                artistName.textContent = song.artistName;
                artistDIV.appendChild(artistIMG);
                artistDIV.appendChild(artistName);
                artistsDIV.appendChild(artistDIV);
                n = n + 1;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//function to display users playlists with ability to click on the playlist to display its songs
async function diplayUserPlaylists() {
    try {
        const response = await fetch(`http://localhost:3000/api/userPlaylists`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            const data = await response.json();
            const DIV = document.getElementById('user-playlists');
            var pName = document.getElementById('Playlist-name');
            let n = 1;
            for (playlist of data) {
                const playlistDIV = document.createElement('div');
                playlistDIV.classList.add('user-playlist-card');
                const playlistIMG = document.createElement('img');
                const playlistButton = document.createElement('button');
                playlistIMG.classList.add('playlist-card-img');
                playlistIMG.src = `images/plCard${n}.png`;
                playlistButton.classList.add('playlist-user-button');
                playlistButton.appendChild(playlistIMG);
                (function (playlistName) {
                    playlistButton.onclick = function () {
                        togglePlaylistResult(playlistName);
                    };
                })(playlist.playlistName);

                playlistName = document.createElement('p');
                playlistName.classList.add('playlist-card-name');
                playlistName.textContent = playlist.playlistName;
                playlistDIV.appendChild(playlistButton);
                playlistDIV.appendChild(playlistName);
                DIV.appendChild(playlistDIV);
                n = n + 1;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//function to display top listener
async function displayTopListener() {
    try {
        const response = await fetch(`http://localhost:3000/api/topUser`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            const data = await response.json();
            const DIV = document.getElementById('top-listener');
            for (user of data) {
                const userDIV = document.createElement('div');
                userDIV.classList.add('playlist-card');
                const userIMG = document.createElement('img');
                userIMG.classList.add('playlist-card-img');
                userIMG.src = `images/user4.png`;
                userName = document.createElement('p');
                userName.classList.add('playlist-card-name');
                userName.textContent = user.username;
                userDIV.appendChild(userIMG);
                userDIV.appendChild(userName);
                DIV.appendChild(userDIV);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


//function to display what is being listened to today
async function listenedToToday() {
    try {
        const response = await fetch(`http://localhost:3000/api/songsListenedDate`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            const data = await response.json();
            const DIV = document.getElementById('listened-to-today');
            let n = 2;
            for (song of data) {
                const songDIV = document.createElement('div');
                songDIV.classList.add('playlist-card');
                const songIMG = document.createElement('img');
                songIMG.classList.add('playlist-card-img');
                songIMG.src = `images/album${n}.png`;
                songName = document.createElement('p');
                songName.classList.add('playlist-card-name');
                songName.textContent = song.songName;
                songDIV.appendChild(songIMG);
                songDIV.appendChild(songName);
                DIV.appendChild(songDIV);
                n = n + 1;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//function to display users with the same top genre
async function usersWithSameTopGenre() {
    try {
        const response = await fetch(`http://localhost:3000/api/topListenedGenre`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            const data = await response.json();
            const DIV = document.getElementById('users-with-same-top-genre');
            let n = 1;
            for (user of data) {
                const userDIV = document.createElement('div');
                userDIV.classList.add('playlist-card');
                const userIMG = document.createElement('img');
                userIMG.classList.add('playlist-card-img');
                userIMG.src = `images/user${n}.png`;
                userName = document.createElement('p');
                userName.classList.add('playlist-card-name');
                userName.textContent = user.username;
                userDIV.appendChild(userIMG);
                userDIV.appendChild(userName);
                DIV.appendChild(userDIV);
                n = n + 1;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//function to recommend an album for a user
async function recommendedAlbum() {
    try {
        const response = await fetch(`http://localhost:3000/api/recommendedAlbum`);
        if (!response.ok) {
            console.log("Error fetching log in status");
        } else {
            const data = await response.json();
            const DIV = document.getElementById('recommended-albums');
            let n = 1;
            for (album of data) {
                const albumDIV = document.createElement('div');
                albumDIV.classList.add('playlist-card');
                const albumIMG = document.createElement('img');
                albumIMG.classList.add('playlist-card-img');
                albumIMG.src = `images/album${n}.png`;
                albumName = document.createElement('p');
                albumName.classList.add('playlist-card-name');
                albumName.textContent = album.playlistName;
                albumDIV.appendChild(albumIMG);
                albumDIV.appendChild(albumName);
                DIV.appendChild(albumDIV);
                n = n + 1;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


//function to add a collaborator
async function addCollaborator() {
    const username = document.getElementById('userInput').value;
    const pName = document.getElementById('Playlist-name');
    const playlistID = pName.dataset.id;
    try {
        const response = await fetch(`http://localhost:3000/api/addCollaborator/${username}?playlistID=${playlistID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            console.log('Updated');
            getCollaborators();
        } else {
            console.error('Error:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}