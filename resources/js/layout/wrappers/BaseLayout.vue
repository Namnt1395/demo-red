<template>
    <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <transition name="fade-transform" mode="out-in">
            <Header/>
        </transition>
        <div class="app-main">
            <!--            <transition name="fade-transform" mode="out-in">-->
            <!--                <SideBar/>-->
            <!--            </transition>-->
            <div class="app-main__outer">
                <div class="app-main__inner">
                    <slot></slot>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

export default {
    name: "BaseLayout",
    components: {Footer, SideBar, Header}
}
</script>

<style lang="scss">
.fixed-sidebar .app-main .app-main__outer {
    padding-left: 0px !important;
}
</style>
