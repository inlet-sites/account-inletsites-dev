<script>
    import {onMount, setContext} from "svelte";
    import {writable} from "svelte/store";
    import {afterNavigate} from "$app/navigation";
    import "../../global.css";
    import Menu from "./Menu.svelte";
    import Loader from "../../components/Loader.svelte";
    import Notifier from "../../components/Notifier.svelte";

    let {children} = $props();
    let permissions = $state();
    let notifier = $state(null);
    let menuOpen = $state(false);
    afterNavigate(()=>{
        menuOpen = false;
    });
    $effect(()=>{
        document.body.style.overflow = menuOpen ? "hidden" : "visible";
    })

    const loader = writable(false);
    setContext("loader", loader);

    const notify = (type, message)=>{
        notifier = {
            type: type,
            message: message
        };

        setTimeout(()=>{
            notifier = null;
        }, 7500);
    }
    setContext("notify", notify);

    const user = writable();
    setContext("user", user);

    onMount(()=>{
        const userToken = localStorage.getItem("userToken");
        if(!userToken) window.location.href = "/";
        setContext("userToken", userToken);

        loader.set(true);
        fetch(`${import.meta.env.VITE_API_URL}/user`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                user.set(response);
                permissions = response.permissions;
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader.set(false);
            });
    });

    const openMenu = ()=>{
        menuOpen = true;
    }

    const closeMenu = ()=>{
        menuOpen = false;
    }
</script>

{#if $loader}
    <Loader/>
{/if}

{#if notifier}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

<div class="container">
    <button class="openMenuIcon" onclick={openMenu}>
        <svg width="45px" height="45px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M3 5H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M3 12H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M3 19H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>

    <Menu
        permissions={permissions}
        isOpen={menuOpen}
        close={closeMenu}
    />

    {#if $user}
        <div class="children">
            {@render children()}
        </div>
    {/if}
</div>

<style>
    .container{
        display: flex;
        height: 100vh;
        width: 100vw;
        position: relative;
    }

    .children{
        height: 100vh;
        width: calc(100vw - 250px);
    }

    .openMenuIcon{
        display: none;
    }

    @media screen and (max-width: 800px){
        .openMenuIcon{
            display: flex;
            position: absolute;
            top: 15px;
            left: 15px;
            background: none;
            border: none;
            z-index: 2;
        }

        .children{
            width: 100vw;
        }
    }
</style>
