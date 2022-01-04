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
            <el-table
                v-loading="listLoading"
                :data="list"
                :height="50"
                :summary-method="getSummaries"
                show-summary
                :cell-style="{padding: '0', height: '40px'}"
                :header-cell-style="{ background: '#F5F7FA', color:'black',textAlign: 'center', height: '40px' }"
                border
                :row-class-name="tableRowClassName"
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
            <div class="card-body">
                <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
            </div>

        </div>
    </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import Constants from "../../utils/constants"

export default {
    name: "Category",
    components: {
        Pagination
    },
    data() {
        return {
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 3,
            },
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
            }],
            pagination: {
                total: 5,
                //page: this.page
            }
        };
    },
    computed: {
        displayData() {
            if (!this.tableData || this.tableData.length === 0) return [];
            return this.tableData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        }
    },
    created() {
        this.getList();
    },
     methods: {
         getSummaries(param) {
             const { columns, data } = param;
             const sums = [];
             columns.forEach((column, index) => {
                 if (index === 0) {
                     sums[index] = 'Total Cost';
                     return;
                 }
                 const values = data.map(item => Number(item[column.property]));
                 if (!values.every(value => isNaN(value))) {
                     sums[index] = '$ ' + values.reduce((prev, curr) => {
                         const value = Number(curr);
                         if (!isNaN(value)) {
                             return prev + curr;
                         } else {
                             return prev;
                         }
                     }, 0);
                 } else {
                     sums[index] = 'N/A';
                 }
             });

             return sums;
         },
         async getList() {
             console.log(this.listQuery)
            this.listLoading = true;
            this.list = this.tableData;
            this.total = 5;
            this.listLoading = false;
         },
         tableRowClassName({row, rowIndex}) {
             if (row.amount1 === "234") {
                 return 'warning-row';
             } else if (row.amount1 === "324") {
                 return 'success-row';
             }else if (row.amount1 >=539){
                 return 'high-row';
             }
             return '';
         }
     }
}
</script>

<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
.el-table .high-row {
    background: #c8e6c9;
}
.divider {
    background: #b8c1cb !important;
}
</style>
