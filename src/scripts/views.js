function showHomeView(mainContent){
    mainContent.innerHTML = `

    <section id="home">
        <container>
            <section>
            <div class="title">
                <span>Good afternoon</span>
            </div>
            <container class="playlists" id="home-head-cnt">
                
            </container>
        </section>

        <section class="home-section">
            <div class="title">
                <span>Episodes for you</span>
            </div>
            <container id="albums">
                
            </container>
        </section>

        <section class="home-section">
            <div class="title">
                <span>Browse all</span>
            </div>
            <container id="all-genres-cnt">

            </container>

    </container>
    
    </section>
    <section class="page-footer"></section>
    </section>
        `;

    localStorage.setItem("current-view", JSON.stringify({ name: "home" }));

    const wrapper = document.getElementById("main-page-bg");
    whiteBg(wrapper, "hide")

    let homePlaylists = playlists.slice(0, 6)
    let homeGenres = genres
    let albums = createAlbums()
    let homeAlbums = albums

    const genresCnt = document.getElementById("all-genres-cnt");
    const albumsCtn = document.getElementById("albums");

    for (playlist of homePlaylists){
        createPlaylistHtml(playlist)
    }
    
    for (genre of homeGenres){
        createGenreHtml(genre, genresCnt)
    }

    for (album of homeAlbums){
        createAlbumHtml(album, albumsCtn)
    }
}

function showPlaylistView(mainContent, playlist, type) {
    if (playlist.songs){ var playlistLenght = playlist.songs.length; }
    if (playlist.songs){ var playlistDuration = ((playlist.songs.reduce((acc, song) => acc + song.duration, 0)) / 60 ).toFixed(2); }
    const filtersBtnName = 'Custom Order'

    mainContent.innerHTML = `
    <article id="playlist-view">
        <container class="wrapper">
            <section id="section-id">
                <div class="playlist-info">
                    <div class="playlist-icon" id="edit-btnNd">
                    
                    </div>
                    <div class="info">
                        <span>
                            <p>Private Playlist</p>
                            <h1 id="edit-btn">${playlist.name}</h1>
                        </span>
                        <span id="p-lenght-dur">
                        
                        </span>
                    </div>
                    
                </div>
            </section>
            <div class="show-more">
                <div>
                    <div>
                        <i class="fa-solid fa-play"></i>
                    </div>
                    <span>...</span>
                </div>

                <div>
                    <i id="mg-glass" class="fa-solid fa-magnifying-glass"></i>
                    <input id="filters-search-input"  type="text" placeholder="Search in playlist">

                    <button id="filters">
                        <span id="filters-btn-name">${filtersBtnName}<i class="fa-solid fa-caret-down"></i></span>
                        
                        <div id="filters-dropdown">
                            <div class="title">
                                <span>Sort by</span>
                            </div>

                            <div class="btns">
                                <div id="reset-all">
                                    <span>Custom Order</span>
                                </div>

                                <div id="time-sort-btn">
                                    <span>Duration</span>
                                </div>
                                <div id="date-sort-btn">
                                    <span>Date Added</span>
                                </div>
                                <div id="album-sort-btn">
                                    <span>Album</span>
                                </div>
                                <div id="songs-sort-btn">
                                    <span>Title</span>
                                </div>
                                <div id="tempo">
                                    <span>Tempo</span>
                                    <div id="tempo-dropdown" style="display: none;">
                                        <div class="btns">
                                            <div id="tempo-slow">
                                                <span>Slow</span>
                                            </div>
                                            <div id="tempo-medium">
                                                <span>Medium</span>
                                            </div>
                                            <div id="tempo-fast">
                                                <span>Fast</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>    

                        </div>

                    </button>
                </div>

            </div>
            <div id="sticky-desc">
                <div class="songs-title">
                    <div>
                        <span id="id-sort">#</span>
                        <span id="title-sort">Title</span>
                    </div>
                    <div>
                        <span id="album-sort">Album</span>
                        <span id="date-sort">Date added</span>
                        <span id="duration-sort"><i class="fa-regular fa-clock"></i></span>
                    </div>
                </div>
            </div>
            <container id="songs-container">
                
                <div id="songs-wrapper">
                    
                </div>
            </container>
            <container class="playlist-footer">
            
            </container>

        </container>
    </article>
    `;

    const playlistDesc = document.getElementById("p-lenght-dur");
    const btn = document.getElementById("edit-btn");
    const modal = document.getElementById("playlist-edit-box");
    const tint = document.getElementById("page-tint");
    const wrapper = document.getElementById("main-page-bg");
    const playlistIcon = document.getElementById("edit-btnNd")

    if (type === "genre"){
        const genreName = playlist
        const songsList = songs.filter(song => song.genre === genreName)

        btn.innerHTML = `${genreName}`
        playlistDesc.innerHTML = `alex ${songsList.length} songs`

        if (songsList.length >= 4){
            const collage = createImage(songsList)
            playlistIcon.appendChild(collage)

        } else if (songsList.length < 4){
            playlistIcon.innerHTML = `<img src="${songsList[0].coverUrl}">`
        }

        createHtmlSongs(mapLists(songsList))
        localStorage.setItem("current-view", JSON.stringify({ name: "genreView", view: playlist }));
    }
    
    if (type === "playlist"){
        const collage = createImage(playlist.songs)
        playlistDesc.innerHTML = `alex ${playlistLenght} songs, <p>${playlistDuration}</p>`

        if (playlist.id === "L2I37"){
            playlistIcon.innerHTML = `<img src="${playlist.image_url}">`
            playlist.songs = getLiked()
            createHtmlSongs(mapLists(playlist.songs))

        } 
        
        else if (playlist.id !== "L2I37"){
            createHtmlSongs(mapLists(playlist.songs))

            if (playlist.songs.length > 4 ){
                playlistIcon.appendChild(collage)

            }
            else if (playlist.songs.length < 4 && playlist.songs.length > 0){
                playlistIcon.innerHTML = `<img src="${playlist.songs[0].coverUrl}">`
            }
            else {
                playlistIcon.innerHTML = `<img src="/assets/images/covers/basic-cover.png">`; 
            }
        }

        
      
        handleEditMenu(btn, modal, tint, playlist)
        localStorage.setItem("current-view", JSON.stringify({ name: "playlist", view: playlist }));

    }

    whiteBg(wrapper, "show")
    
    handleScroll()
    handleFavSongs(playlist.id)
    handleFilters(playlist)

}

function whiteBg(wrapper, state){
    if (state === "hide") {
        wrapper.style.display = "none";
    } else if (state === "show"){
        wrapper.style.display = "flex";
    }
}


function createImage(songs){
    const collage = document.createElement("div");
    collage.className = "collage";
    function getRandomIndex(maxIndex) {
        return Math.floor(Math.random() * (maxIndex + 1));
    }

    const selectedImages = [];
    if (songs) {
        const totalImages = songs.length;
        while (selectedImages.length < 4 && selectedImages.length < totalImages) {

            const randomIndex = getRandomIndex(totalImages - 1);
            const selectedImage = songs[randomIndex].coverUrl;

            if (!selectedImages.includes(selectedImage)) {
                selectedImages.push(selectedImage);
            }
        }
    }

    const [first, second, third, fourth] = selectedImages

    collage.innerHTML = `
        <img src="${first}">
        <img src="${second}">
        <img src="${third}">
        <img src="${fourth}">
        `

    return collage
}

