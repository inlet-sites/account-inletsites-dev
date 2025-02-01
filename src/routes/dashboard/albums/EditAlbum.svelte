<script>
    import {getContext} from "svelte";
    import EditName from "./EditName.svelte";
    import EditDescription from "./EditDescription.svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    const userToken = getContext("userToken");
    let {changePage, userId, album, updateAlbum} = $props();
</script>

<div class="EditAlbum">
    <button class="closeIcon" onclick={()=>{changePage("main")}}>
        <svg width="45px" height="45px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>

    <h1>Edit Album</h1>

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
</style>
