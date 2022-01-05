<template>
    <div>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <div role="group" class="btn-group" data-toggle="buttons">
                    <div class="btn-group">
                        <router-link :to="{name: 'cate_create'}" class="btn btn-sm btn-primary heading-btn">
                            <span>New</span>
                        </router-link>
                        <button class="btn btn-info" data-toggle="modal" data-target="#editCate">show modal</button>
                        <!--                        <a class="btn btn-sm btn-primary heading-btn" href="#" @click="showModel()">-->
                        <!--                            <i class="icon-graph position-left"></i><span>Edit</span></a>-->
                    </div>
                </div>
            </div>
            <el-table
                v-if="this.list != null"
                v-loading="listLoading"
                :data="list"
                :height="50"
                :cell-style="{padding: '0', height: '40px'}"
                :max-height="900"
                :header-cell-style="{ background: '#F5F7FA', color:'black',textAlign: 'center', height: '40px' }"
                border
                :row-class-name="tableRowClassName"
                :cell-class-name="tableColClassName"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="Name">
                </el-table-column>
                <el-table-column
                    prop="status"
                    sortable
                    label="status">
                </el-table-column>
                <el-table-column
                    prop="description"
                    sortable
                    label="Description">
                </el-table-column>
            </el-table>
            <div class="divider"></div>
            <div class="card-body">
                <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                            @pagination="getList"/>
            </div>
        </div>
        <b-modal id="modal1" title="Bootstrap-Vue">
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="Name category" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="Choose status" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="Status Category">
                        <el-option label="Active" :value="1">Active</el-option>
                        <el-option label="DeActive" :value="2">DeActive</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Description" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </b-modal>

        <b-button class="mr-2" v-b-modal.modal1 @click="showModel">Launch demo modal 1</b-button>

    </div>

</template>

<script>
import Pagination from "../../components/Pagination";
import Restfull from "../../api/restfull";
import ModalLayouts from "../../partials/ModalLayouts";


export default {
    name: "Category",
    components: {
        ModalLayouts,
        Pagination,
    },
    data() {
        return {
            ruleForm: {
                title: '',
                status: '',
                description: '',
            },
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
            },
            multipleSelection: [],
            selectTagPicker: ''
        };
    },
    computed: {},
    created() {
        this.getList();
    },
    methods: {
        async getList() {
            console.log(this.listLoading)
            this.listLoading = true;
            let url = 'api/category/list'
            const {data, count} = await new Restfull(url).list(this.listQuery);
            this.list = data;
            this.total = count;
            this.listLoading = false;
        },
        tableRowClassName({row, rowIndex}) {
            if (row.amount1 === "234") {
                return 'warning-row';
            } else if (row.amount1 === "324") {
                return 'success-row';
            } else if (row.amount1 >= 539) {
                return 'high-row';
            }
            return '';
        },
        tableColClassName({row, column, rowIndex, columnIndex}) {
            return ''
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log("multiple...", this.multipleSelection, this.multipleSelection.length)
        },
        showModel() {
            let cateItem = this.multipleSelection[0]
            this.ruleForm = cateItem
            this.selectTagPicker = this.ruleForm.status
        }
    }
}
</script>

<style>
.modal-backdrop {
    display: none;
}

.el-table__body-wrapper {
    height: 600px !important;
}

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
