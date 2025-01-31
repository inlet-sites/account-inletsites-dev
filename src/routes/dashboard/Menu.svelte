<script>
    import logo from "$lib/logo.png";

    const logout = ()=>{
        localStorage.removeItem("userToken");
        window.location.href = "/";
    }
</script>

<aside>
    <img src={logo} alt="Inlet Sites logo">

    <div class="buttons">
    </div>

    <div class="bottom">
        <button onclick={logout}>Logout</button>
    </div>
</aside>

<style>
    aside{
        position: fixed;
        top: 0;
        left: 0;
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
</style>
