<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <!-- Tabs with icons -->
                <div class="mb-3">
                    <br>
                </div>
                <div class="nav-wrapper">

                    <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab"
                                href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1"
                                aria-selected="true"><i
                                    class="bi bi-graph-up-arrow"></i>&nbsp;&nbsp;&nbsp;<strong>กราฟการปล่อยคาร์บอนของคุณ</strong></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab"
                                href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2"
                                aria-selected="false"><i
                                    class="bi bi-cup-hot-fill"></i>&nbsp;&nbsp;&nbsp;<strong>ชนิดอาหารที่ท่านประทาน</strong></a>
                        </li>

                    </ul>
                    
                </div>
                <div class="card shadow">
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">

                            <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel"
                                aria-labelledby="tabs-icons-text-1-tab">
                                <ChartMonth />
                            </div>

                            <div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel"
                                aria-labelledby="tabs-icons-text-2-tab">
                                <ChartFood class="CFSize"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ChartMonth from '../components/ChartMonth.vue'
import ChartFood from '../components/ChartFood.vue'
export default {
    components: {
        ChartMonth,
        ChartFood,
    },
}
</script>
<style>
</style>