<script>
    import {getContext} from "svelte";
    import emptyAlbum from "$lib/emptyAlbum.webp";

    const loader = getContext("loader");
    const notify = getContext("notify");
    const userToken = getContext("userToken");
    const user = getContext("user");

    let albums = $state();

    loader.set(true);
    fetch(`${import.meta.env.VITE_API_URL}/album/${$user.id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
        }
    })
        .then(r=>r.json())
        .then((response)=>{
            if(response.error){
                notify("error", response.error.message);
            }else{
                albums = response;
            }
        })
        .catch((err)=>{
            notify("error", "Something went wrong, try refreshing the page");
        })
        .finally(()=>{
            loader.set(false);
        });

    const getAlbumImage = (album)=>{
        if(album.photos[0]){
            return `${import.meta.env.VITE_API_URL}/document/${album.photos[0].file}`;
        }else{
            return emptyAlbum;
        }
    }

    const edit = (album)=>{
        console.log("editing album");
        console.log(album.name);
    }
</script>

<div class="Albums">
    <h1>My Albums</h1>

    <button class="button newAlbum">Create New</button>

    <div class="albums">
        {#each albums as album}
            <button 
                class="album"
                aria-label="Edit {album.name}"
                onclick={()=>{edit(album)}}
            >
                <img src={getAlbumImage(album)} alt="{album.name} Album">
                <h3>{album.name}</h3>
            </button>
        {/each}
    </div>
</div>

<style>
    .Albums{
        color: var(--text);
        padding: 35px;
        height: 100%;
        width: 100%;
        position: relative;
    }

    .newAlbum{
        position: absolute;
        top: 35px;
        right: 35px;
    }

    .albums{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        margin-top: 35px;
    }

    .album{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 250px;
        border: 1px solid rgba(255, 0, 0, 0.35);
        padding: 15px;
        margin: 35px 0;
        background: none;
        color: var(--text);
        cursor: pointer;
    }

    .album img{
        max-width: 100%;
        margin-bottom: 15px;
        box-shadow: 0 0 10px rgb(200, 200, 200);
        border-radius: 10px;
    }

    .album h3{
        font-size: 22px;
    }
</style>
