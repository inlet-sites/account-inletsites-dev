<script>
    import {getContext} from "svelte";

    let {description, albumId, updateAlbum} = $props();
    const loader = getContext("loader");
    const notify = getContext("notify");
    const userToken = getContext("userToken");
    let edit = $state(false);

    const submit = ()=>{
        loader.set(true);
        fetch(`${import.meta.env.VITE_API_URL}/album/${albumId}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify({description: description})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    updateAlbum(response);
                    edit = false;
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

<div class="EditDescription">
    <div class="top">
        <p>Description</p>
        {#if edit}
            <button aria-label="Update description" onclick={submit}>
                <svg width="35px" height="35px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M5 13L9 17L19 7" stroke="#ff0000bf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {:else}
            <button aria-label="Edit description" onclick={()=>{edit = true}}>
                <svg width="35px" height="35px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#ff0000bf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {/if}
    </div>

    {#if edit}
        <form class="standardForm" onsubmit={submit}>
            <textarea
                bind:value={description}
                required
            ></textarea>
        </form>
    {:else}
        <p>{description}</p>
    {/if}
</div>

<style>
    .EditDescription{
        margin: 35px 0;
    }

    .top{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .top p{
        text-decoration: underline;
        font-size: 24px;
        font-weight: bold;
    }

    p{
        font-size: 22px;
    }

    .top button{
        background: none;
        border: none;
        margin-left: 15px;
        cursor: pointer;
    }

    .standardForm{
        max-width: 550px;
    }
</style>
