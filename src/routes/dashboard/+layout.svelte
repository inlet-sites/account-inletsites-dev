<script>
    import {onMount, setContext} from "svelte";
    import {writable} from "svelte/store";
    import "../../global.css";
    import Menu from "./Menu.svelte";
    import Loader from "../../components/Loader.svelte";
    import Notifier from "../../components/Notifier.svelte";

    let {children} = $props();
    let permissions = $state();

    const loader = writable(false);
    setContext("loader", loader);

    const notifier = writable(null);
    setContext("notifier", notifier);

    const user = writable();
    setContext("user", user);

    onMount(()=>{
        const userToken = localStorage.getItem("userToken");
        if(!userToken) window.location.href = "/";

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

<Menu
    permissions={permissions}
/>

<div class="container">
    {@render children()}
</div>
