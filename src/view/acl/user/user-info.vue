<template>
  <div>
    <Row :gutter="16">
      <Col offset="6" span="12">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名称" prop="name">
          <Input v-model="formData.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formData.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="Password" prop="password">
            <Input type="password" v-model="formData.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="手机" prop="mobile">
          <Input v-model="formData.mobile"></Input>
        </FormItem>
        <FormItem label="Radio">
          <RadioGroup v-model="formData.sex">
            <Radio label="1">男</Radio>
            <Radio label="2">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Radio">
          <Select v-model="formData.roleId">
            <Option v-for="item in roleList" :value="item.roleId" :key="item.roleId">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formData')">保存</Button>
          <Button @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
  </div>
</template>

<script>

import { getById, save } from '@/api/user'
import { getAllRole } from '@/api/role'

export default {
  data () {
    return {
      formData: {
        userId: '',
        name: '',
        email: '',
        sex: '1',
        mobile: '',
        password: '',
        roleId: ''
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      },
      roleList: []
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          save(this.formData).then(res => {
            this.$Message.success(res.msg)
            this.formData = res.data
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    loadData () {
      if (this.$route.query && this.$route.query.userId) {
        this.formData.userId = this.$route.query.userId
        getById(this.formData.userId)
          .then(res => {
            this.formData = res.data
          }).catch((err) => {
            console.log(err)
          })
      } else {
        this.formData.userId = ''
      }
      getAllRole()
        .then(res => {
          this.roleList = res.data
        }).catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadData()
  }

}

</script>
