<script>
    import {getContext} from "svelte";

    const loader = getContext("loader");
    const userToken = getContext("userToken");
    const notify = getContext("notify");
    let {photo, albumId, updateAlbum, close} = $props();
    const photoLink = `${import.meta.env.VITE_API_URL}/document/${photo.file}`;

    const submit = ()=>{
        loader.set(true);
        fetch(`${import.meta.env.VITE_API_URL}/album/${albumId}/image/${photo.id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify({description: photo.description})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    updateAlbum(response);
                    close();
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader.set(false);
            });
    }
</script>

<div class="PhotoDescription">
    <button class="closeBtn" onclick={close} aria-label="Close">
        <svg width="45px" height="45px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>

    <img src={photoLink} alt={photo.originalName}>

    <form class="standardForm" onsubmit={submit}>
        <label>
            <textarea
                bind:value={photo.description}
                rows="5"
                placeholder="Photo Description"
                required
            >{photo.description}</textarea>
        </label>

        <button class="button">Submit</button>
    </form>
</div>

<style>
    .PhotoDescription{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        z-index: 3;
        background: black;
        padding: 35px;
    }

    .closeBtn{
        position: absolute;
        top: 35px;
        right: 35px;
        cursor: pointer;
        background: none;
        border: none;
    }

    .PhotoDescription img{
        max-height: 50%;
        max-width: 100%;
    }

    form{
        width: 75%;
    }

    @media screen and (max-width: 800px){
        .standardForm textarea{
            font-size: 18px;
        }
    }

    @media screen and (max-width: 500px){
        form{
            justify-content: center;
            width: 100%;
            height: 50%;
        }
    }
</style>
