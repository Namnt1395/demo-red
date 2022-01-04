<template>
    <div class="app-sidebar sidebar-shadow">
        <div class="app-header__logo">
            <div class="logo-src"></div>
            <div class="header__pane ml-auto">
                <div>
                    <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
                            data-class="closed-sidebar">
                                    <span class="hamburger-box">
                                        <span class="hamburger-inner"></span>
                                    </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="app-header__mobile-menu">
            <div>
                <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                                <span class="hamburger-box">
                                    <span class="hamburger-inner"></span>
                                </span>
                </button>
            </div>
        </div>
        <div class="app-header__menu">
                        <span>
                            <button type="button"
                                    class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                                <span class="btn-icon-wrapper">
                                    <i class="fa fa-ellipsis-v fa-w-6"></i>
                                </span>
                            </button>
                        </span>
        </div>
        <div class="scrollbar-sidebar ps ps--active-y">
            <div class="app-sidebar__inner">
                <ul class="vertical-nav-menu metismenu">
                    <li v-for="item in menu">
                        <router-link class="link" :to="{name: item.href}">
                            <i class="metismenu-icon" v-bind:class="item.icon"></i>
                            {{ item.title }}
                        </router-link>

                        <ul class="mm-collapse" v-if="item.hasChild">
                            <li v-for="sub in item.child">
                                <router-link class="link" :to="{name: sub.href}">
                                    <i class="metismenu-icon"></i>
                                    {{ sub.title }}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
                <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
            </div>
            <div class="ps__rail-y" style="top: 0px; height: 275px; right: 0px;">
                <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 79px;"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "SideBar",
    data() {
        return {
            menu: [
                {
                    title: 'Dashboards',
                    icon: 'pe-7s-rocket',
                    href: 'dasboard'
                },
                {
                    title: 'Category',
                    icon: 'pe-7s-browser',
                    href: 'cate'
                },
            ],
        }
    },
}
</script>

<style scoped>

</style>
