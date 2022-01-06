<template>
    <div class="app-header header-shadow">
        <b-navbar type="dark"  class="bg-dark-nav">
            <b-navbar-brand href="#">Bigear logo</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">Dashboard</b-nav-item>
                    <b-nav-item to="/cate">Category</b-nav-item>
                    <b-nav-item-dropdown text="Tool">
                        <b-dropdown-item href="#">Api</b-dropdown-item>
                        <b-dropdown-item href="#">Domain</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {

        }
    },
}
</script>

<style lang="scss" scoped>
.bg-dark-nav {
    width: 100%;
    height: 100%;
}
.navbar-dark .navbar-nav .nav-link {
    color: white !important;
    font-weight: bold;
}
.dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
}
.app-theme-white {
    .app-footer .app-footer__inner, .app-header {
        background: rgb(55 71 79) !important;
        color: white;
    }
}

.app-header
{
    .app-header__content .header-menu .nav-link {
        color: white;
    }
}
</style>
