<template>
            <div class="main-card mb-3 card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-6 d-flex justify-content-center">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                                <el-form-item label="Name category" prop="title">
                                    <el-input v-model="ruleForm.title" ></el-input>
                                </el-form-item>
                                <el-form-item label="Choose status" prop="status">
                                    <el-select v-model="ruleForm.status" placeholder="Status Category">
                                        <el-option label="Active" value="1"></el-option>
                                        <el-option label="DeActive" value="2"></el-option>
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
                        </div>
                    </div>


                </div>

            </div>

</template>

<script>
import Restfull from "../../api/restfull";
export default {
    data() {
        return {
            ruleForm: {
                title: '',
                status: '',
                description: '',
            },
            rules: {
                title: [
                    {required: true, message: 'Please input Activity name', trigger: 'blur'},
                    {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'}
                ],
                status: [
                    {required: true, message: 'Please select Status', trigger: 'change'}
                ],

                description: [
                    {required: true, message: 'Please input activity form', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = 'api/category'
                    new Restfull(url)
                        .store(this.ruleForm)
                        .then(response => {
                            this.$message({
                                message: 'Category user ' + this.ruleForm.name +' has been created successfully.',
                                type: 'success',
                                duration:  1000,
                            });
                        //    this.resetForm(this.ruleForm);
                            this.$router.back()
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => {
                            this.userCreating = false;
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>


<style scoped>
 .demo-ruleForm{
  width: 460px;
}
</style>
