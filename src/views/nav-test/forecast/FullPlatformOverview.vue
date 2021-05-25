<!--
 * @Author: changluo
 * @Description:全平台预测总览
-->
<template>
  <div class="full-platform-overview">
    <div class="operation-wrapper">
      <div class="head-wrapper">
        <el-date-picker
          @change="handlePickerChange"
          class="date-picker"
          v-model="currentDate"
          :picker-options="pickerOptions"
          type="daterange"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button
          @click="handleSearch()"
          type="primary"
          size="small"
          style="background: #437bee"
          >查询</el-button
        >
      </div>
    </div>
    <el-card class="content">
      <div slot="header" class="check-wrapper">
        <el-checkbox-group v-model="checkList" @change="handleCheck">
          <el-checkbox
            v-for="item in defaultCheckList"
            :key="item"
            :label="item"
            :value="item"
            @change="handleCheckedItem($event, item)"
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
        <i class="el-icon-download"></i>
      </div>
      <el-table
        ref="filterTable"
        class="table-wrapper"
        :data="tableData"
        :default-sort="defaultSortProp"
        @sort-change="sortChange"
        :cell-style="setCellColor"
      >
        <el-table-column
          v-for="item in getNoChildrenColumnList"
          v-show="item.prop"
          :key="item.prop"
          align="center"
          sortable="custom"
          :prop="item.prop"
          :sort-orders="['descending', null]"
          width="120"
          fixed="left"
        >
          <template slot="header">
            <span>{{ item.label }}</span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in getHasChildrenColumnList"
          v-show="!item.prop"
          :label="item.label"
          :prop="item.prop"
          :key="item.label"
          align="center"
        >
          <figure v-if="item.children && item.children.length">
            <el-table-column
              v-for="secondItem in item.children"
              :label="secondItem.label"
              :prop="secondItem.prop"
              :key="secondItem.label"
              sortable="custom"
              :sort-orders="['descending', null]"
              width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row[secondItem.prop] }}</span>
              </template>
            </el-table-column>
          </figure>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { responseData } from './index'
// import echarts from 'echarts'
const T3 = moment().subtract(3, 'day')
const T9 = moment().subtract(9, 'day')
const defaultCheckList = ['LTV', 'LT', 'RR']

export default {
  data() {
    return {
      currentDate: [T9, T3], // [T-9,T-3]
      checkList: ['LTV', 'LT'],
      noCheckedList: ['RR'],
      defaultCheckList: defaultCheckList,
      pickerOptions: {
        disabledDate: time => {
          return time < moment('2020-01-01') || time > T3
        }
      },
      orderBy: 'LTV90',
      sortRule: 'descending',
      orderByParent: 'LTV',
      tableData: responseData.tableList,
      theadList: responseData.columns,
      cacheTheadList: responseData.columns,
      notReal: responseData.notReal
    }
  },
  computed: {
    // 计算属性
    defaultSortProp() {
      return { prop: this.orderBy, order: this.sortRule }
    },
    getNoChildrenColumnList() {
      return this.theadList.filter(item => item.prop)
    },
    getHasChildrenColumnList() {
      return this.theadList.filter(item => !item.prop)
    }
  },
  created() {
    console.log('tableData', this.tableData)
    console.log('theadList', this.theadList)
    console.log('getHasChildrenColumnList', this.getHasChildrenColumnList)
    this.tableData = responseData.tableList
    this.theadList = responseData.columns
    this.cacheTheadList = responseData.columns
    this.notReal = responseData.notReal
    this.handleSearch()
  },
  methods: {
    handlePickerChange(value) {
      const startTime = moment(this.currentDate[0]).format('YYYY-MM-DD')
      const endTime = moment(this.currentDate[1]).format('YYYY-MM-DD')
      console.log('日期', { value, startTime, endTime })
    },
    handleSearch() {
      const startTime = moment(this.currentDate[0]).format('YYYY-MM-DD')
      const endTime = moment(this.currentDate[1]).format('YYYY-MM-DD')
      // 勾选checkbox时，重新展示最新的table表头
      this.theadList = this.cacheTheadList.filter(
        item => !this.noCheckedList.includes(item.label)
      )
      const params = {
        startTime,
        endTime,
        checkList: this.checkList,
        orderBy: this.orderBy,
        sortRule: this.sortRule
      }
      console.log('this.orderByParent', this.orderByParent)
      console.log('search-params', params)
    },
    // eslint-disable-next-line no-unused-vars
    handleCheck(val) {
      this.noCheckedList = defaultCheckList.filter(item => !val.includes(item))
      this.orderBy = ''
      this.sortRule = ''
      this.$refs.filterTable.clearSort()
      this.handleSearch()
    },
    // eslint-disable-next-line no-unused-vars
    handleCheckedItem(checkStatus, current) {
      // console.log('handleCheckedItem', checkStatus, current)
      // this.noCheckedList = defaultCheckList.filter(
      //   i => !this.checkList.includes(i)
      // )
      // // 取消勾选checkbox时，需要判断取消table选中降序的状态
      // console.log('this.theadList+++++', this.theadList)
      // console.log('this.checkList+++++', this.checkList)
      // if (current === this.orderByParent) {
      //   if (!checkStatus) {
      //     this.orderBy = ''
      //     this.sortRule = ''
      //     this.orderByParent = ''
      //     this.$refs.filterTable.clearSort()
      //   }
      // }
      // console.log('handleCheck-noCheckedList', this.noCheckedList)
      // this.handleSearch()
    },
    // 获取点击排序的父级
    handleGetOrderByParent(arr) {
      arr.forEach(i => {
        if (i.children && i.children.length) {
          i.children.forEach(k => {
            if (this.orderBy === k.prop) {
              this.orderByParent = i.label
            }
          })
        } else {
          this.orderByParent = ''
        }
      })
    },
    // 只有降序和取消降序
    sortChange(column) {
      console.log(column)
      if (column.order === 'ascending') {
        this.sortRule = ''
      } else if (column.order === 'descending') {
        this.sortRule = 'desc'
      } else {
        this.sortRule = ''
      }
      this.orderBy = column.prop
      if (!this.sortRule) {
        this.orderBy = ''
      }
      // this.handleGetOrderByParent(this.theadList)
      this.handleSearch()
    },
    // eslint-disable-next-line no-unused-vars
    setCellColor({ row, column, rowIndex, columnIndex }) {
      // console.log('setCellColor', { row, column, rowIndex, columnIndex })
      if (this.notReal.includes(column.property)) {
        return 'color:#a23123;'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.full-platform-overview {
  padding: 0px 15px !important;
  .head-wrapper {
    padding: 10px 0px;
    .date-picker {
      margin-right: 10px;
    }
  }
  .check-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 30px;
    .el-checkbox-group {
      .el-checkbox {
        padding: 6px 12px;
        border-radius: 5px 5px 5px 5px;
        border: 1px solid #437bee;
        &::v-deep {
          .el-checkbox__inner {
            background-color: #fff;
            border-color: #e0e0e0;
          }
        }
        &.is-checked {
          background-color: #437bee;
          &::v-deep {
            .el-checkbox__inner {
              background-color: #437bee;
              border-color: #437bee;
            }
            .el-checkbox__label {
              color: #fff;
            }
          }
        }
      }
    }
    .el-icon-download {
      color: #437bee;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .table-wrapper {
    &::v-deep {
      .el-table__header {
        .caret-wrapper {
          .ascending {
            display: none;
          }
        }
        .descending .sort-caret.descending {
          border-top-color: #437bee;
        }
      }
    }
  }
}
</style>
