<template>
  <Row :gutter="16" >
    <Col span="8">
      <div>
        <Button type="info"    size="small" @click="handleAdd" style="margin-left: 8px">添加</Button>
        <Button type="warning" size="small" @click="handleRemove" style="margin-left: 8px">删除</Button>
      </div>
      <Tree :data="treeData" @on-select-change="handleSelect"></Tree>
    </Col>
    <Col span="8">
    <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
      <FormItem label="名称" prop="name">
        <Input v-model="formData.name" placeholder="请输入名称"></Input>
      </FormItem>
      <FormItem label="Href" prop="href">
        <Input v-model="formData.href" placeholder="请输入Href"></Input>
      </FormItem>
      <FormItem label="类型" prop="type">
        <Select v-model="formData.type" style="width:200px">
          <Option value="1">目录</Option>
          <Option value="2">菜单</Option>
        </Select>
      </FormItem>
      <FormItem label="状态" prop="usable">
        <Select v-model="formData.usable" style="width:200px">
          <Option value="0">正常</Option>
          <Option value="1">挂起</Option>
        </Select>
      </FormItem>
      <FormItem label="排序" prop="sort">
        <InputNumber :min="1" v-model="formData.sort"></InputNumber>
      </FormItem>
      <FormItem label="备注" prop="remarks">
        <Input v-model="formData.remarks"></Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formData')">保存</Button>
      </FormItem>
    </Form>
    </Col>
    <Col span="8"></Col>
  </Row>
</template>

<script>
import { getTree, getResource, save, remove } from '@/api/resource'
import { appendTreeNode, updateTreeNode, deleteFromTree } from '@/api/treeter'

export default {
  data () {
    return {
      formData: {
        resourceId: '',
        parentId: '',
        name: '',
        href: '',
        type: '2',
        usable: '0',
        sort: 1,
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
      selectedNode: [],
      treeData: [],
      action: ''
    }
  },
  methods: {
    handleSelect (selected) {
      if (selected.length === 1) {
        this.selectedNode = selected[0]
        // console.log('this.selectedNode', this.selectedNode)
        this.action = 'modify'
        getResource(selected[0].id)
          .then(res => {
            this.formData = res.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    handleAdd () {
      if (!this.selectedNode) {
        this.$Message.warn('请选择父节点')
      } else {
        this.action = 'add'
        this.formData = {
          resourceId: '',
          parentId: this.selectedNode.id,
          name: '',
          href: '',
          type: '2',
          usable: '0',
          sort: 1,
          remarks: ''
        }
      }
    },
    handleRemove () {
      if (!this.selectedNode) {
        this.$Message.warning('请选择删除的节点')
        return
      }
      if (this.selectedNode.children.length > 0) {
        this.$Message.warning('该节点包含子节点，不能删除')
        return
      }
      this.$Modal.confirm({
        title: '确认',
        content: '删除用户？',
        onOk: () => {
          remove(this.selectedNode.id)
            .then(res => {
              this.$Message.success(res.msg)
              deleteFromTree(this.treeData, this.selectedNode.id)
              this.handleReset()
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          save(this.formData)
            .then(res => {
              this.$Message.success(res.msg)
              this.formData = res.data
              this.selectedNode.title = res.data.name
              if (this.action === 'modify') {
                updateTreeNode(this.treeData, this.selectedNode)
              } else if (this.action === 'add') {
                let newNode = {
                  title: this.formData.name,
                  id: this.formData.resourceId,
                  pid: this.formData.parentId
                }
                appendTreeNode(this.treeData, newNode)
              }
            })
            .catch(err => {
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
      getTree()
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
