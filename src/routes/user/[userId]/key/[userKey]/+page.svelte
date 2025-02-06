<script>
    import "../../../../../global.css";
    import logo from "$lib/logo.png";
    import Notifier from "../../../../../components/Notifier.svelte";
    import Loader from "../../../../../components/Loader.svelte";

    let {data} = $props();
    let password = $state();
    let confirmPassword = $state();
    let notifier = $state(null);
    let loader = $state(false);

    const notify = (type, message)=>{
        notifier = {
            type: type,
            message: message
        };

        setTimeout(()=>{
            notifier = null;
        }, 7500);
    }

    const submit = ()=>{
        if(password.length < 10){
            notify("error", "Password must contain at least 10 characters");
            return;
        }
        if(password !== confirmPassword){
            notify("error", "Passwords do not match");
            return;
        }

        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/user/${data.userId}/key/${data.userKey}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: password,
                confirmPassword: confirmPassword
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    window.location.href = "/";
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader = false;
            });
    }
</script>

{#if notifier}
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

    <h2>Create your password</h2>

    <form class="standardForm" onsubmit={submit}>
        <label>Password
            <input
                type="password"
                bind:value={password}
                placeholder="Password"
                required
            >
        </label>

        <label>Confirm Password
            <input
                type="password"
                bind:value={confirmPassword}
                placeholder="Password"
                required
            >
        </label>

        <button class="button">Submit</button>
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
