<template>
  <div>
    <Row :gutter="16">
      <Col offset="6" span="12">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="name">
          <Input v-model="formData.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formData.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="手机" prop="mobile">
          <Input v-model="formData.mobile"></Input>
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
export default {
  data () {
    return {
      formData: {
        userId: '',
        name: '',
        email: '',
        mobile: ''
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ]
      }
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
    }
  },
  created () {
    this.loadData()
  }

}

</script>
