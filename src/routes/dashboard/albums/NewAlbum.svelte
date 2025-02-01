<script>
    let {changePage, loader, notify, addAlbum, userId, userToken} = $props();
    let name = $state();
    let description = $state();

    const submit = ()=>{
        loader.set(true);
        fetch(`${import.meta.env.VITE_API_URL}/album`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    addAlbum(response);
                    changePage("main");
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

<div class="NewAlbum">
    <header>
        <h1>Create New Album</h1>

        <button class="closeIcon" onclick={()=>{changePage("main")}}>
            <svg width="45px" height="45px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </button>
    </header>

    <form class="standardForm" onsubmit={submit}>
        <label>Name
            <input
                type="text"
                bind:value={name}
                placeholder="Name"
                required
            >
        </label>

        <label>Description (optional)
            <textarea
                bind:value={description}
                rows="3"
            ></textarea>
        </label>

        <button class="button">Create</button>
    </form>
</div>

<style>
    .NewAlbum{
        height: 100%;
        width: 100%;
        color: var(--text);
        padding: 35px;
        position: relative;
    }

    header{
        display: flex;
        justify-content: space-between;
    }

    .closeIcon{
        background: none;
        border:none;
        cursor: pointer;
    }

    form{
        max-width: 550px;
    }

    @media screen and (max-width: 800px){
        .NewAlbum{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 75px;
        }

        .closeIcon{
            position: absolute;
            top: 15px;
            right: 15px;
        }
    }
</style>
