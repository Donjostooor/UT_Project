<template>
    <nav class="navbar navbar-expand-md fixed-top the-blur " data-aos="zoom-out"  data-aos-delay="1700" aria-label="Eighth navbar example">
        <div class="container">
            <a href="/"><img class="logo" src="/src/assets/logo.png" alt="loading..."/></a>
        </div>
        <div class="container">
            <div class="collapse navbar-collapse nav-btn" id="navbarsExample07">
                <div class="col-3 nav-btn">
                    <a href="/login"><p>Log-in</p></a>
                    <a href="/register"><p>Register</p></a>
                </div>           
            </div>
        </div>
    </nav>
</template>
<style>
.the-blur {
    position: fixed;
    top:0;
    width: 100%;
    min-height: 50px;
    margin-bottom: 20px;
    background: rgba(0,0,0,.8);
    z-index:999;
}
.navbar {
    height: 80px;
}
.logo {
    padding-bottom: 10px;
    width: 100%;
    height: 100px;
}
.nav-btn {
    padding: 10px 10px 0px 10px;
    display: flex;
    justify-content: end;
}
</style>