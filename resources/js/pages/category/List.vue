<template>
    <div>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <div role="group" class="btn-group" data-toggle="buttons">
                    <div class="btn-group">
                        <a class="btn btn-sm btn-primary heading-btn" href="/campaigns/new">
                            <i class="icon-plus22 position-left"></i><span>New</span></a>
                        <a class="btn btn-sm btn-primary heading-btn disabled" href="/campaigns/undefined">
                            <i class="icon-graph position-left"></i><span>Edit</span></a>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <el-table
                :data="displayData"
                :header-cell-style="{ background: '#F5F7FA', color:'black',textAlign: 'center' }"
                border
                style="width: 100%;">
                <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    sortable
                    label="Name">
                </el-table-column>
                <el-table-column
                    prop="amount1"
                    sortable
                    label="Amount 1">
                </el-table-column>
                <el-table-column
                    prop="amount2"
                    sortable
                    label="Amount 2">
                </el-table-column>
                <el-table-column
                    prop="amount3"
                    sortable
                    label="Amount 3">
                </el-table-column>
            </el-table>
            <div class="divider"></div>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="3"
                :total="5" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "Category",
    data() {
        return {
            page: 1,
            pageSize: 4,
            tableData: [{
                id: '12987122',
                name: 'Tom',
                amount1: '234',
                amount2: '3.2',
                amount3: 10
            }, {
                id: '12987123',
                name: 'Tom',
                amount1: '165',
                amount2: '4.43',
                amount3: 12
            }, {
                id: '12987124',
                name: 'Tom',
                amount1: '324',
                amount2: '1.9',
                amount3: 9
            }, {
                id: '12987125',
                name: 'Tom',
                amount1: '621',
                amount2: '2.2',
                amount3: 17
            }, {
                id: '12987126',
                name: 'Tom',
                amount1: '539',
                amount2: '4.1',
                amount3: 15
            }]
        };
    },
    computed: {
        displayData() {
            if (!this.tableData || this.tableData.length === 0) return [];

            return this.tableData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        }
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`current page: ${val}`);
            this.page = val;
        },
    }
}
</script>

<style scoped>
    .divider {
        background: #b8c1cb !important;
    }
</style>
