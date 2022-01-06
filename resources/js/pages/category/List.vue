<template>
    <div class="main-card mb-3 card">
        <div class="card-body">
            <div role="group" class="btn-group" data-toggle="buttons">
                <!--                <div class="btn-group">-->
                <!--                    <router-link :to="{name: 'cate_create'}" class="btn btn-sm btn-primary heading-btn">-->
                <!--                        <span>New</span>-->
                <!--                    </router-link>-->
                <!--                    <a class="btn btn-sm btn-primary heading-btn" v-bind:class="[activeEdit]" href="#"-->
                <!--                       @click="showModel">-->
                <!--                        <i class="icon-graph position-left"></i><span>Edit</span></a>-->
                <!--                </div>-->
                <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
                    <b-button-group class="mx-1">
                        <b-button :to="{name: 'cate_create'}" variant="primary">
                            New
                        </b-button>
                    </b-button-group>
                    <b-button-group class="mx-1">
                        <b-button v-bind:class="[activeEdit]" @click="showModel" variant="primary">Edit</b-button>
                    </b-button-group>
                </b-button-toolbar>
            </div>
            <div class="table-setting text-right">
                <b-dropdown  text="Column" class="dropleft">
                    <b-dropdown-form>
                        <el-checkbox type="success" @change="columnStatus =!columnStatus">Status</el-checkbox>
                    </b-dropdown-form>
                </b-dropdown>
            </div>
        </div>
        <el-table
            v-if="this.list != null"
            v-loading="listLoading"
            :data="list"
            :height="50"
            :cell-style="{padding: '0', height: '40px'}"
            :header-cell-style="{ background: '#F5F7FA', color:'black',textAlign: 'center', height: '40px' }"
            border
            :row-class-name="tableRowClassName"
            :cell-class-name="tableColClassName"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
            @cell-mouse-enter="mouseOver"
            @cell-mouse-leave="mouseLeave">
            <el-table-column
                type="selection"
                width="55"
                align="center">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                width="55"
                align="center">
            </el-table-column>
            <el-table-column
                prop="title"
                label="Name">
                <template slot-scope="scope">
                    <div class="detail-name position-relative">
                        <div class="name"> {{ scope.row.title }}</div>
                        <ul class="position-absolute right-0 top-1 display"
                            v-show="buttonIndex === scope.row.id">
                            <li>
                                <a href="javascript:void(0)" @click="showModelEdit(scope.row)">
                                    <i class="fa fa-edit blue"></i>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" @click="handleDelete(scope.row.id)">
                                    <i class="fa fa-trash blue"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="description"
                sortable
                label="Description">
            </el-table-column>
            <el-table-column
                v-if="columnStatus"
                prop="status_label"
                sortable
                label="Status"
                align="center"
                width="100">
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.status_label === 'Active' ? 'primary' : 'success'"
                        effect="dark">
                        {{ scope.row.status_label }}
                    </el-tag>
                </template>
            </el-table-column>

        </el-table>
        <div class="divider"></div>
        <div class="card-body">
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                        @pagination="handleGetList"/>
        </div>
        <b-modal ref="modal1" @ok="handleOk" @cancel="handleCancel" hide-backdrop hide-footer>
            <template #modal-title>
                <h5>Update Category</h5>
            </template>
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hideModal()">Close</button>
                    <button type="button" class="btn btn-primary" @click="handleEdit()">Update</button>
                </div>
            </el-form>
        </b-modal>
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
            columnStatus: false,
            ruleForm: {
                id: '',
                title: '',
                status: '',
                description: '',
            },
            activeEdit: 'disabled',
            buttonIndex: false,
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
            },
            multipleSelection: [],
            selectTagPicker: '',
        };
    },
    computed: {},
    created() {
        this.handleGetList();
        this.$on("completed", () => {
            this.listLoading = false
            this.hideModal()
            this.handleGetList()

        })
    },
    methods: {
        /**
         *
         * Process Data: get, update, delete
         */
        async handleGetList() {
            console.log(this.listLoading)
            this.listLoading = true;
            let url = 'api/category/list'
            const {data, count} = await new Restfull(url).list(this.listQuery);
            this.list = data;
            this.total = count;
            this.listLoading = false;
        },
        handleEdit() {
            const resource = this.ruleForm;
            let url = "api/category"
            this.listLoading = true
            new Restfull(url).update(this.ruleForm.id, resource).then(response => {
                if (response.success) {
                    console.log("update success")
                    this.$emit("completed")
                    Swal.fire({
                        //   position: 'top-end',
                        heightAuto: false,
                        width: 300,
                        icon: 'success',
                        title: 'Update success',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            })
        },
        handleDelete(id) {
            Swal.fire({
                title: 'Bạn có thực sự muốn xóa?',
                text: "Dữ liệu sẽ không thể khôi phục lại",
                icon: 'warning',
                width: 420,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    let url = "api/category"
                    new Restfull(url).destroy(id).then(() => {
                        Swal.fire({
                                heightAuto: false,
                                width: 300,
                                icon: 'success',
                                title: 'Deleted',
                                showConfirmButton: false,
                                timer: 1000
                            }
                        )
                        this.$emit('completed');
                    }).catch((data) => {
                        Swal.fire("Failed!", data.message, "warning");
                    })
                }
            })


        },
        /**
         *
         * End process data
         */

        /**
         *
         * Event table
         */
        showColumn(num) {
            if (num === 1) {
                this.columnStatus = !this.columnStatus;
            }
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
            let lengthSelection = this.multipleSelection.length
            if (lengthSelection === 1) {
                this.activeEdit = ''
            } else {
                this.activeEdit = 'disabled'
            }
            console.log("multiple...", this.multipleSelection.length)
        },
        /**
         *
         * End Event table
         */

        /**
         *
         * Modal
         */
        showModelEdit(content) {
            this.ruleForm = content
            this.$refs['modal1'].show()
        },
        showModel() {
            let cateItem = this.multipleSelection[0]
            this.ruleForm = cateItem
            this.selectTagPicker = this.ruleForm.status
            this.$refs['modal1'].show()
        },
        handleOk(bvModalEvt) {
            console.log("ok click")
            this.ruleForm = ''
        },
        handleCancel() {
            console.log("cancel click")
            this.ruleForm = ''
        },
        hideModal() {
            this.$refs['modal1'].hide()
        },
        /**
         *
         * End Modal
         */

        /**
         * event
         */
        mouseOver: function (index, row) {
            this.buttonIndex = index.id
        },
        mouseLeave: function () {
            this.buttonIndex = false
        }
    }
}
</script>

<style lang="scss" scoped>

.modal-footer {
    background: white !important;
}

.position-absolute {

    position: absolute;

}

.position-relative {

    position: relative;

}

.top-1 {
    top: 1px;

}

.right-0 {
    right: 0px;

}

.detail-name {
    ul {
        list-style-type: none;

        li {
            float: left;
            margin: 3px;
        }
    }
}

.display {

    display: block;

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
