<script>
    let {type, close, action} = $props();
</script>

<div class="Modal">
    <div class="modal">
        {#if type === "deleteModal"}
            <p class="text">Are you sure that you want to delete this album and all of its photos? This is permanent.</p>

            <div class="buttonBox">
                <button class="button" onclick={close}>Cancel</button>
                <button class="button dangerButton" onclick={action}>Delete Album</button>
            </div>
        {/if}
    </div>
</div>

<style>
    .Modal{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        backdrop-filter: blur(10px);
        z-index: 10;
    }

    .modal{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 50%;
        max-width: 500px;
        background: var(--text);
        padding: 15px;
    }

    .text{
        font-size: 22px;
        text-align: center;
    }

    .buttonBox{
        display: flex;
        justify-content: space-around;
    }

    .buttonBox button{
        font-size: 18px;
    }

    .dangerButton{
        background: red;
        color: var(--text);
    }
</style>
