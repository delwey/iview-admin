<template>
  <div>
    <Row :gutter="16">
      <Col span="8" offset="4">
        <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称" prop="name">
            <Input v-model="formData.name" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="状态" prop="usable">
            <Select v-model="formData.usable">
              <Option value="0">正常</Option>
              <Option value="1">挂起</Option>
            </Select>
          </FormItem>
          <FormItem label="排序" prop="sort">
            <InputNumber :min="1" v-model="formData.sort"></InputNumber>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleSubmit('formData')">保存</Button>
            <Button @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Col>
      <Col span="8">
        <Tree ref="tree" :data="treeData" show-checkbox multiple></Tree>
      </Col>
    </Row>
  </div>
</template>

<script>

import { getById, save } from '@/api/role'
import { getTree } from '@/api/resource'

export default {
  data () {
    return {
      formData: {
        roleId: '',
        parentId: '0000',
        name: '',
        usable: '0',
        sort: 0,
        remarks: ''
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      treeData: []
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let nodes = []
          let selectedNodes = this.$refs['tree'].getCheckedNodes()
          selectedNodes.forEach(element => {
            if (element.children.length === 0) {
              nodes.push(element.id)
            }
          })
          this.formData.remarks = nodes.join(',')
          console.log('selected node ', this.formData.remarks)
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
      if (this.$route.query && this.$route.query.roleId) {
        this.formData.roleId = this.$route.query.roleId
        getById(this.formData.roleId)
          .then(res => {
            this.formData = res.data
          }).catch((err) => {
            console.log(err)
          })
      } else {
        this.formData.roleId = ''
      }
      getTree(this.formData.roleId)
        .then(res => {
          this.treeData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadData()
  }

}

</script>
