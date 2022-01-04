<template>
    <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <transition name="fade" mode="out-in" appear>
            <Header/>
        </transition>
        <div class="app-main">
            <transition name="fade" mode="out-in" appear>
                <SideBar/>
            </transition>
            <div class="app-main__outer">
                <div class="app-main__inner">
                    <slot></slot>
                </div>
                <transition name="fade" mode="out-in" appear>
                    <Footer/>
                </transition>
            </div>
        </div>

        <!-- Modal Component -->
        <b-modal id="modal1" title="Bootstrap-Vue">
            <p class="my-4">Hello from modal!</p>
        </b-modal>
        <b-modal id="modallg" size="lg" title="Large Modal">
            Hello Modal!
        </b-modal>
        <b-modal id="modalsm" size="sm" title="Small Modal">
            Hello Modal!
        </b-modal>
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

<style scoped>

</style>
