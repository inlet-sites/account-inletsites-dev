<script>
    import {getContext} from "svelte";
    import emptyAlbum from "$lib/emptyAlbum.webp";
    import NewAlbum from "./NewAlbum.svelte";
    import EditAlbum from "./EditAlbum.svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    const userToken = getContext("userToken");
    const user = getContext("user");

    let albums = $state();
    let editAlbum = $state();
    let currentPage = $state("main");

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
        editAlbum = album;
        currentPage = "editAlbum";
    }

    const addAlbum = (album)=>{
        albums.push(album);
    }

    const changePage = (page)=>{
       currentPage = page;
    }

    const updateAlbum = (album)=>{
        for(let i = 0; i < albums.length; i++){
            if(albums[i].id === album.id){
                albums[i] = album;
                break;
            }
        }
    }
</script>

<svelte:head>
    <title>My Albums | Inlet Sites</title>
</svelte:head>

{#if currentPage === "newAlbum"}
    <NewAlbum
        changePage={changePage}
        loader={loader}
        notify={notify}
        addAlbum={addAlbum}
        userId={$user.id}
        userToken={userToken}
    />
{:else if currentPage === "editAlbum"}
    <EditAlbum
        changePage={changePage}
        loader={loader}
        notify={notify}
        userId={$user.id}
        userToken={userToken}
        album={editAlbum}
        updateAlbum={updateAlbum}
    />
{:else}
    <div class="Albums">
        <header>
            <h1>My Albums</h1>

            <button
                class="newAlbum"
                aria-label="New Album"
                onclick={()=>{currentPage = "newAlbum"}}
            >
                <svg width="45px" height="45px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M8 12H12M16 12H12M12 12V8M12 12V16" stroke="#ff0000bf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ff0000bf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg> 
            </button>
        </header>

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
{/if}

<style>
    .Albums{
        color: var(--text);
        padding: 35px;
        height: 100%;
        width: 100%;
        position: relative;
    }

    header{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 50px;
    }

    .newAlbum{
        background: none;
        border: none;
        cursor: pointer;
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

    @media screen and (max-width: 800px){
        header{
            padding-left: 55px;
        }
    }

    @media screen and (max-width: 500px){
        header{
            padding: 0;
            flex-direction: column;
            align-items: center;
        }
    }
</style>
