<script>
    import {onMount, setContext} from "svelte";
    import "../../global.css";
    import Menu from "./Menu.svelte";
    import Loader from "../../components/Loader.svelte";
    import Notifier from "../../components/Notifier.svelte";

    let {children} = $props();
    let notifier = $state(null);
    let loader = $state(false);
    let user = $state();

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
    setContext("loader", loader);
    setContext("user", user);

    onMount(()=>{
        const userToken = localStorage.getItem("userToken");
        if(!userToken) window.location.href = "/";

        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/user`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                user = response;
            })
            .catch((err)=>{
                notify("error", "penish");
            })
            .finally(()=>{
                loader = false;
            });
    });

</script>

{#if loader}
    <Loader/>
{/if}

{#if notifier}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

<Menu
    permissions={user.permissions}
/>

<div class="container">
    {@render children()}
</div>

<style>
    header{
        color: var(--text);
    }
</style>
