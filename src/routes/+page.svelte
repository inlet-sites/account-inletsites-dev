<script>
    import {onMount} from "svelte";
    import "../global.css";
    import logo from "$lib/logo.png";
    import Notifier from "../components/Notifier.svelte";
    import Loader from "../components/Loader.svelte";

    let email = $state();
    let password = $state();
    let notifier = $state({type: "", message: ""});
    let loader = $state(false);

    const notify = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    const submit = ()=>{
        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/user/token`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    localStorage.setItem("userToken", response.token);
                    window.location.href = "/dashboard";
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page.");
            })
            .finally(()=>{
                loader = false;
            });
    }

    onMount(()=>{
        const token = localStorage.getItem("userToken");
        if(token) window.location.href = "/dashboard";
    });
</script>

<svelte:head>
    <title>My Account | Inlet Sites</title>
</svelte:head>

{#if notifier.type}
    <Notifier type={notifier.type} message={notifier.message}/>
{/if}

{#if loader}
    <Loader/>
{/if}

<div class="container">
    <div class="hero">
        <img src={logo} alt="Inlet Sites logo">

        <h1>Inlet Sites</h1>
    </div>

    <h2>Customer Portal</h2>

    <form class="standardForm" onsubmit={submit}>
        <label>Email
            <input
                type="email"
                bind:value={email}
                placeholder="Email"
                required
            >
        </label>

        <label>Password
            <input
                type="password"
                bind:value={password}
                placeholder="Password"
                required
            >
        </label>

        <button class="button">Log In</button>
    </form>
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        color: white;
        padding: 35px;
    }

    .hero{
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 200px;
    }

    .hero img{
        height: 100%;
        margin-right: 35px;
    }

    h1{
        font-size: 112px;
    }

    h2{
        font-size: 55px;
        margin-bottom: 35px;
    }

    @media screen and (max-width: 1000px){
        .hero{
            height: 100px;
        }

        h1{
            font-size: 75px;
        }

        h2{
            font-size: 35px;
        }
    }

    @media screen and (max-width: 700px){
        .hero{
            height: 75px;
        }

        .hero img{
            margin-right: 15px;
        }

        h1{
            font-size: 35px;
        }

        h2{
            font-size: 25px;
        }
    }
</style>
