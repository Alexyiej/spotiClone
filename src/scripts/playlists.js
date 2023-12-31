function generateUniqueId(){
    return Math.random().toString(36).substr(2, 9);
}

function handleCreateClick(playlists, songs) {
    if (playlists.length === 0) {
        playlist = {
            id: "L2I37",
            name: "Liked Songs",
            description: "Playlist",
            user: "Alex",
            image_url: "/assets/images/covers/likedCover.png",
            songs: getLiked()
        }

    } else if (playlists.length > 0) {
        playlist = {
            id: generateUniqueId(),
            name: "My Playlist #" + playListIndex,
            description: "Playlist",
            user: "Alex",
            image_url: "/assets/images/covers/basic-cover.png",
            songs: []
        }

        playListIndex++;
        localStorage.setItem("playlists-index", playListIndex)
        playlist.songs = songs.slice(10, 20);

    }
    playlists.push(playlist);
    createPlaylists(playlist)

}

function deletePlaylist(playlistId) {
    playlists = playlists.filter(playlist => playlist.id !== playlistId);

    localStorage.setItem("playlists", JSON.stringify(playlists));
    const index = localStorage.getItem("playlists-index");

    if (playlists.length === 0) {
        localStorage.setItem("playlists-index", 0);
    }
    else if (index > 0) {
        localStorage.setItem("playlists-index", index - 1);
    }
    
    loadPlaylists();
    
}

function createPlaylists(playlist) {
    const playlistsWrapper = document.querySelector(".playlists-wrapper");
    const playlistElement = document.createElement("article");
    const albumCover = createImage(playlist.songs) 

    playlistElement.dataset.id = playlist.id;
    playlistElement.className = "playlist";
    playlistElement.innerHTML = `
        <div class="wrapper">
            <div class="playlist-icon">
                
            </div>
            <div class="playlist-title">
                <span>${playlist.name}</span>
            </div>
            <div class="playlist-description">
                <span>${playlist.description}</span>
                <span>${playlist.user}</span>
            </div>
        </div>
    `;

    playlistsWrapper.appendChild(playlistElement);
    if (playlist.id !== "L2I37" && playlist.songs.length > 4){playlistElement.querySelector(".playlist-icon").appendChild(albumCover);}
    else if (playlist.id === "L2I37"){playlistElement.querySelector(".playlist-icon").innerHTML = `<img src="${playlist.image_url}">`;}
    else if (playlist.length < 4 && playlist.length > 0){playlistElement.querySelector(".playlist-icon").innerHTML = `<img src="${playlist.songs[0].coverUrl}">`;}

    else { playlistElement.querySelector(".playlist-icon").innerHTML = `<img src="/assets/images/covers/basic-cover.png">`; }
}

function editPlaylist(playlist){
    console.log(playlist)
}

function handlePlaylistView(){
    const playlistsWrapper = document.querySelector(".playlists-wrapper");
    const view = document.getElementById("main-content");

    playlistsWrapper.addEventListener("click", function(event) {
        const playlistElement = event.target.closest(".playlist");
        if (playlistElement) {
            const playlist = playlists.find(playlist => playlist.id === playlistElement.dataset.id);
    
            showPlaylistView(view, playlist, "playlist")
    
        }
    });
}
