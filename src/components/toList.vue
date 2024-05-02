<template>

  <el-main style="width: 100%;height: 90%">

    <el-table style="width: 100%;height:100%;justify-content: center" :data="tableData" stripe border>

      <el-table-column type="index" label="序号" fixed width="80" />

      <el-table-column label="机器名" prop="customName" fixed width="200" />

      <el-table-column label="类型名" prop="typeName" width="200" />

      <el-table-column label="创建日期" prop="createdDate" width="180" />

      <el-table-column label="最后一次修改日期" prop="lastModifiedDate" width="180" />

      <el-table-column label="操作" fixed="right" width="215px">

        <!-- </el-table-column label="数据量" fixed="right" width="215px"> -->

        <template v-slot:default="scope">

          <!-- 把当前这个 device 的 id 传输给 toview -->
          <el-button @click="toview(scope.row.id)">
            查看机器
          </el-button>

          <el-button @click="toConnect(scope.row.id)">
            关联机器
          </el-button>

        </template>

      </el-table-column>

    </el-table>

  </el-main>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import { onBeforeMount, reactive, toRefs, toRaw } from "vue";
import api from "@/axios/api";
import router from "@/router";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "toList",
  setup() {
    let obj = reactive({
      tableData: [],
      getMachine: () => {
        api.getMachines().then(res => {
          obj.tableData = res.data
        })
      },
      toview: async (deviceId) => {
        // console.log( obj.tableData.find(item => item.id === deviceId))
        let images = []
        await api.getImages(deviceId).then(res => {
          images = res.data
        })
        // await api.queryDataByDevice(deviceId).then(res => {
        //   environmentDataList = res.data
        // })
        router.push({
          name: "toView",
          state: {
            images: images,
            deviceId: deviceId,
            // 这里 find 的是一个proxy对象，如果切换页面，这个对象会变为 null
            device: toRaw(obj.tableData.find(item => item.id === deviceId))
          }
        })
      },
      toCreate: async () => {
        await ElMessage({
          message: '提交成功!',
          type: 'success'
        })
        obj.dialogVisible1 = false
      },
      beforeCreate: () => {
        obj.dialogVisible1 = true
      },
      // toConnect 弹窗显示机器 ID 并提示将该 ID 烧入机器固件，提供复制按钮
      toConnect: (deviceId) => {
        ElMessageBox.alert(`请将机器 ID 烧入机器固件：${deviceId}`, '机器 ID', {
          confirmButtonText: '复制',
          callback: action => {
            if (action === 'confirm') {
              navigator.clipboard.writeText(deviceId).then(() => {
                ElMessage({
                  message: '复制成功!',
                  type: 'success'
                })
              })
            }
          }
        })

      },
      dialogVisible1: false,
      dialogVisible2: false
    })



    onBeforeMount(() => {
      obj.getMachine()
    })
    return { ...toRefs(obj) }
  }
}
</script>

<style scoped>
.el-row {
  margin: 0 0 20px 0;
}
</style>