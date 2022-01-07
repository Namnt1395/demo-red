<template>
    <div>
        <component :is="layout">
            <transition name="fade-transform" mode="out-in">
                <router-view></router-view>
            </transition>
        </component>
    </div>

</template>

<script>

const default_layout = "default";

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || default_layout) + '-layout';
        }
    }
}
</script>

<style>
@import './styles/custom.scss';
@import '../assets/css/main.css';
@import './styles/transition.scss';
</style>
