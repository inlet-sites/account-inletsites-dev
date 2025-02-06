<script>
    import {getContext} from "svelte";

    const user = getContext("user");
</script>

<div class="Account">
    <h1>My Account</h1>

    <h2>{$user.name}</h2>
    <h3>{$user.email}</h3>
</div>
<style>
    .Account{
        color: var(--text);
        padding: 35px;
    }

    h1{
        margin-bottom: 35px;
        text-decoration: underline;
    }
</style>
