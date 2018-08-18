<template>
  <div>
    <Row :gutter="16">
      <Col span="6">
        <Input search enter-button placeholder="角色名查询" v-model="searchKey" @on-search="loadData" />
      </Col>
      <Col span="18">
        <Button type="primary" @click="handleAdd">添加</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Table border stripe :columns="roleCols" :data="pages.rows"></Table>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Page
          show-total
          :total="pages.total"
          :page-size="pages.pageSize"
          :current="pages.current"
          @on-change="handleChange"
        />
      </Col>
    </Row>
  </div>
</template>

<script>
import { getList, remove } from '@/api/role'

export default {
  data () {
    return {
      searchKey: '',
      pages: {
        total: 0,
        current: 1,
        pageSize: 10,
        rows: []
      },
      modal1: false,
      roleCols: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '角色名称',
          key: 'name'
        },
        {
          title: '状态',
          key: 'usable',
          render: (h, params) => {
            return h('div', params.row.usable === '0' ? '正常' : '挂起')
          }
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params.index)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.handleRemove(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  methods: {
    handleAdd () {
      this.$router.push({
        path: 'role-info',
        query: { roleId: '' }
      })
    },
    handleEdit (index) {
      this.$router.push({
        path: 'role-info',
        query: { roleId: this.pages.rows[index].roleId }
      })
    },
    handleRemove (index) {
      this.$Modal.confirm({
        title: '确认',
        content: '删除角色？',
        onOk: () => {
          let id = this.pages.rows[index].roleId
          remove(id).then(res => {
            this.$Message.info(res.msg)
            this.pages.rows.splice(index, 1)
            this.pages.total--
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    handleChange (current) {
      this.pages.current = current
      this.loadData()
    },
    loadData () {
      getList(this.searchKey, this.pages.current, this.pages.pageSize).then(res => {
        this.pages = res.data
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
