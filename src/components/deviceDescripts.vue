<template>
  <!-- 示例数据    {
        "id": "402881f18f296d60018f296e5bff0000",
        "createdDate": "2024-04-29 10:37:29",
        "lastModifiedDate": null,
        "customName": "consequat",
        "typeName": "ipsum ",
        "ipAddress": "do minim en",
        "status": 1,
        "city": "enim dolore",
        "address": "sit nostrud",
        "buyDate": null,
        "deliveryDate": null,
        "acceptanceDate": null,
        "putIntoUseDate": null,
        "description": "reprehenderit in voluptate id",
        "coordinate": "do amet consectetur Duis",
        "entityId": "402881f18f296d60018f296e5bff0000"
    }, -->
        <el-descriptions class="margin-top" title="设备信息" :column="3" :size="size" border>
          <template #extra>
            <el-button type="primary" @click="isEditing = !isEditing">
              {{ isEditing ? '取消' : '编辑' }}
              <el-icon class="el-icon--right">
                <Edit />
              </el-icon>
            </el-button>
            <el-button type="warning">提交
              <el-icon class="el-icon--right">
                <Upload />
              </el-icon>
            </el-button>
          </template>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconChip theme="outline" size="16" fill="#333" />
                Custom Name
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.customName }}
            </template>
            <el-input v-else v-model="newDevice.customName"></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconTag theme="outline" size="16" fill="#333" />
                Type Name
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.typeName }}
            </template>
            <el-input v-else v-model="newDevice.typeName"></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconLocalTwo theme="outline" size="16" fill="#333" />
                IP Address
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.ipAddress }}
            </template>
            <el-input v-else v-model="newDevice.ipAddress"></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconTagOne theme="outline" size="16" fill="#333" />
                Status
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.status }}
            </template>
            <el-input v-else v-model="newDevice.status"></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconLocal theme="outline" size="16" fill="#333" />
                Address
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.address }}
            </template>
            <!-- TODO: 将这个拼接为字符串给后端或者改后端接口 -->
            <div v-else class="areabox">
              <el-select v-model="newDevice.address.province" placeholder="请选择省"
                :style="{ width: `${prop.width}px`, marginRight: `${prop.gap}px` }" @change="handleProvinceSelect">
                <el-option v-for="item in regionData" :label="item.label" :value="item.value" :key="item.value" />
              </el-select>
              <el-select v-model="newDevice.address.city" placeholder="请选择市" :disabled="!address.province || cityList.length == 0"
                :style="{ width: `${prop.width}px`, marginRight: `${prop.gap}px` }" @change="handleCitySelect">
                <el-option v-for="item in cityList" :label="item.label" :value="item.value" :key="item.value" />
              </el-select>
              <el-select v-model="newDevice.address.area" placeholder="请选择区" :style="{ width: `${prop.width}px` }"
                :disabled="!address.province || !address.city || areaList.length == 0" @change="handleAreaSelect">
                <el-option v-for="item in areaList" :label="item.label" :value="item.value" :key="item.value" />
              </el-select>
            </div>

          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconCoordinateSystem theme="outline" size="16" fill="#333" />
                Coordinate
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.coordinate }}
            </template>
            <el-input v-else v-model="newDevice.coordinate"></el-input>
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconCalendar theme="outline" size="16" fill="#333" />
                Created Date
              </div>
            </template>

            <template v-if="!isEditing">
              {{ newDevice.createdDate }}
            </template>
            <el-date-picker v-else v-model="newDevice.createdDate" type="datetime" placeholder="Select date and time"
              :shortcuts="shortcuts" />
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <IconNotes theme="outline" size="16" fill="#333" />
                Description
              </div>
            </template>
            <template v-if="!isEditing">
              {{ newDevice.description }}
            </template>
            <el-input v-else v-model="newDevice.description"></el-input>
          </el-descriptions-item>

          <!-- Add more el-descriptions-item for other data fields as needed -->
        </el-descriptions>
</template>

<script>
export default {
        
}
</script>