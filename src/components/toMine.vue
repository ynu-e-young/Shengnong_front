<template>
  <div>
    <h1>个人信息</h1>
    <el-row>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span><i class="el-icon-user"></i> 用户信息</span>
          </template>
          <p>用户名: {{ userInfo.username }}</p>
          <p>类型: {{ userInfo.type }}</p>
          <p>性别: {{ userInfo.sex === 0 ? '男' : '女' }}</p>
          <!-- 其他个人信息... -->
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span><i class="el-icon-s-platform"></i> 设备信息</span>
          </template>
          <p>设备数量: {{ deviceCount }}</p>
          <p>总数据条数: {{ totalDataCount }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { ElRow, ElCol, ElCard } from 'element-plus';

export default {
  name: 'UserProfile',
  components: {
    ElRow,
    ElCol,
    ElCard,
  },
  data() {
    return {
      userInfo: {
        username: 'boer',
        type: 1,
        sex: 0,
        // 其他个人信息...
        devices: [
          {
            // 设备信息...
          },
          // 其他设备...
        ],
      },
    };
  },
  computed: {
    deviceCount() {
      return this.userInfo.devices.length;
    },
    totalDataCount() {
      return this.userInfo.devices.reduce((total, device) => total + device.environmentDataList.length, 0);
    },
  },
};
</script>