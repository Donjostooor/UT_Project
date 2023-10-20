<template>
    <div class="container-fluid">
        <div class="row">

            <div class="col-2 nav-body">
                <div class="nav-wrapper nav-fix">
                    <div class="nav-head">
                        <h3 class="display-3">Dashboard</h3>
                    </div>
                    <ul class="nav nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                        <li class="nav-btn">
                            <a class="nav-link mb-sm-3 mb-md-0 display-5 active" id="tabs-icons-text-1-tab"
                                data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1"
                                aria-selected="true"><i class="bi bi-graph-up-arrow"></i>
                                &nbsp;&nbsp;&nbsp;<strong>OverView</strong>
                            </a>
                        </li>
                        <li class="nav-btn">
                            <a class="nav-link mb-sm-3 mb-md-0 display-5" id="tabs-icons-text-2-tab" data-toggle="tab"
                                href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2"
                                aria-selected="false">
                                <i class="bi bi-people"></i>&nbsp;&nbsp;&nbsp;<strong>UserProfile</strong>
                            </a>
                        </li>
                        <li class="nav-btn">
                            <a class="nav-link mb-sm-3 mb-md-0 display-5" id="tabs-icons-text-3-tab" data-toggle="tab"
                                href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3"
                                aria-selected="false"><i class="bi bi-cup-hot-fill"></i>
                                &nbsp;&nbsp;&nbsp;<strong>ListMenu</strong>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-10 content-bg">
                <div class="col-12">
                    <NavbarAdmin />
                </div>
                <div class="col-12 context-body">
                    <div class="">
                        <div class="card-body">
                            <div class="tab-content" id="myTabContent">

                                <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel"
                                    aria-labelledby="tabs-icons-text-1-tab">
                                    <OverView />
                                </div>

                                <div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel"
                                    aria-labelledby="tabs-icons-text-2-tab">
                                        <UserProfile />
                                </div>
                                <div class="tab-pane fade" id="tabs-icons-text-3" role="tabpanel"
                                    aria-labelledby="tabs-icons-text-3-tab">
                                        <ListMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <Footer />
</template>
<script>
import Footer from '/src/components/Nav/footer.vue';
import NavbarAdmin from './NavbarAdmin.vue';
import OverView from './OverView.vue';
import UserProfile from './UserProfile.vue';
import ListMenu from './ListMenu.vue';
export default {
    name: 'Dashboard',
    components: {
        Footer,
        NavbarAdmin,
        OverView,
        UserProfile,
        ListMenu,

    }

}
</script>
<style scoped>
.nav-head {
    text-align: left;
    padding-left: 2vh;
    padding-bottom: 5vh;
}

.nav-fix {
    position: fixed;
}

.nav-body {
    height: 100vh;

}

.nav-btn {
    padding-left: 2vh;
    padding-bottom: 5vh;
    width: 100%;
}

.content-bg {
    background-color: rgb(0, 0, 0, 0.15);
}

.context-body {
    padding-top: 13vh;
}
</style>