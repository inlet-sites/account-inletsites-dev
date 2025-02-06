<script>
    import logo from "$lib/logo.png";

    let {page, permissions, isOpen, close} = $props();

    const logout = ()=>{
        localStorage.removeItem("userToken");
        window.location.href = "/";
    }
</script>

<aside class={isOpen ? "" : "closed"}>
    <button class="closeIcon" onclick={close}>
        <svg width="45px" height="45px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>

    <img src={logo} alt="Inlet Sites logo">

    {#if permissions}
        <div class="buttons">
            <a
                class={page === "account" ? "active" : ""}
                href="/dashboard/account"
            >Account</a>

            {#if permissions.includes("album")}
                <a
                    class={page === "albums" ? "active" : ""}
                    href="/dashboard/albums"
                >Albums</a>
            {/if}
        </div>
    {/if}

    <div class="bottom">
        <button onclick={logout}>Logout</button>
    </div>
</aside>

<style>
    aside{
        background: black;
        border-right: 1px solid rgba(255, 0, 0, 0.35);
        width: 250px;
        height: 100vh;
        padding: 5px;
        position: relative;
    }

    aside img{
        width: 50%;
    }

    .buttons{
        display: flex;
        flex-direction: column;
        margin-top: 35px;
        padding-left: 35px;
    }

    .buttons a{
        font-size: 24px;
        background: none;
        border: none;
        color: var(--text);
        cursor: pointer;
        text-align: left;
        margin: 10px 0;
        text-decoration: none;
    }

    .buttons a:hover{
        color: gray;
    }

    .bottom{
        position: absolute;
        bottom: 35px;
        left: 35px;
    }

    .bottom button{
        font-size: 24px;
        color: var(--text);
        background: none;
        border: none;
        cursor: pointer;
    }

    .closeIcon{
        display: none;
    }

    .buttons .active{
        color: rgba(255, 0, 0, 0.75);
    }

    .buttons .active:hover{
        color: rgba(255, 0, 0, 0.55);
    }

    @media screen and (max-width: 800px){
        aside{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 3;
            border-right: none;
        }

        aside img{
            width: 150px;
            margin-top: 35px;
        }

        .buttons a{
            font-size: 32px;
            margin: 35px 0;
        }

        .closeIcon{
            display: flex;
            position: absolute;
            top: 35px;
            right: 35px;
            background: none;
            border: none;
        }

        .closed{
            display: none;
        }
    }
</style>
