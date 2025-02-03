<script>
    import {getContext} from "svelte";
    import EditName from "./EditName.svelte";
    import EditDescription from "./EditDescription.svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    const userToken = getContext("userToken");
    let {changePage, userId, album, updateAlbum} = $props();
    let newImages = $state();

    const photoFile = (photo)=>{
        return `${import.meta.env.VITE_API_URL}/document/${photo.file}`;
    }

    const addPhotos = ()=>{
        loader.set(true);
        const formData = new FormData();
        for(let i = 0; i < newImages.length; i++){
            formData.append("images", newImages[i]);
        }

        fetch(`${import.meta.env.VITE_API_URL}/album/${album.id}/image`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            body: formData
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    updateAlbum(response);
                    album.photos = response.photos;
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader.set(false);
            });
    }

    const deletePhoto = (idx)=>{
        console.log("index");
        console.log(idx)
    }
</script>

<div class="EditAlbum">
    <button class="closeIcon" onclick={()=>{changePage("main")}}>
        <svg width="45px" height="45px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>

    <EditName 
        name={album.name}
        albumId={album.id}
        updateAlbum={updateAlbum}
    />

    <EditDescription
        description={album.description}
        albumId={album.id}
        updateAlbum={updateAlbum}
    />

    <div class="divider"></div>

    <div class="photos">
        <label class="addPhotoButton">
             <svg width="35px" height="35px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                <path d="M8 12H12M16 12H12M12 12V8M12 12V16" stroke="#ff0000bf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ff0000bf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <input
                type="file"
                bind:files={newImages}
                onchange={addPhotos}
                style="display:none"
                multiple
            >
        </label>

        {#each album.photos as photo, i}
            <div class="photo">
                <button class="deletePhoto" aria-label="Delete Photo" onclick={()=>{deletePhoto(i)}}>
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
                <img src={photoFile(photo)} alt={photo.file}>
                <p class="photoDescription">{photo.description}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .EditAlbum{
        color: var(--text);
        padding: 35px;
        position: relative;
    }

    .closeIcon{
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        cursor: pointer;
    }

    .divider{
        border-bottom: 1px solid rgba(255, 0, 0, 0.35);
    }

    .photos{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        padding-top: 15px;
        position: relative;
    }

    .addPhotoButton{
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        cursor: pointer;
    }

    .photo{
        width: 250px;
        position: relative;
        cursor: pointer;
        border: 1px solid rgba(255, 0, 0, 0.35);
        margin: 35px;
    }

    .deletePhoto{
        position: absolute;
        top: 5px;
        right: -35px;
        background: none;
        border: none;
        color: rgba(255, 0, 0, 0.75);
        z-index: 2;
        cursor:pointer;
    }

    .photo img{
        display: block;
        width: 100%;
    }

    .photo:hover .photoDescription{
        display: flex;
    }

    .photoDescription{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.55);
        color: black;
        height: 100%;
        width: 100%;
        padding: 5px;
    }
</style>
