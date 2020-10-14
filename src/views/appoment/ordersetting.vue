<template>
  <div>
    <div class="content-header">
      <h1>
        预约管理
        <small>预约设置</small>
      </h1>
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>预约管理</el-breadcrumb-item>
        <el-breadcrumb-item>预约设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="app-container">
      <div class="box">
        <div class="ordersetting">
          <el-card class="box-card">
            <div class="boxMain">
              <el-button style="margin-bottom: 20px;margin-right: 20px"
                         type="primary"
                         @click="templateDownload">模板下载</el-button>
              <el-upload action="/ordersetting/importOrderSettings.do"
                         name="excelFile"
                         :show-file-list="false">
                <el-button type="primary">上传文件</el-button>
              </el-upload>
            </div>
            <div>
              操作说明：请点击"模板下载"按钮获取模板文件，在模板文件中录入预约设置数据
              <span style="color: red">(日期格式为：yyyy/MM/dd)</span>后点击"上传文件"按钮上传模板文件。
            </div>
          </el-card>
          <el-calendar v-model="today">
            <template slot="dateCell"
                      slot-scope="{date, data}">
              <div v-if="settingData[data.day]">
                <div v-if="settingData[data.day].number == settingData[data.day].reservations"
                     style="background-color:red;height:85px;">
                  <div>
                    <font color='blue'>{{data.day}}</font>
                  </div>
                  <div>{{settingData[data.day].reservations}}/{{settingData[data.day].number}}</div>
                  <div>已满</div>
                </div>
                <div v-else
                     style="background-color:lightblue;height:85px;">
                  <div>
                    <font color='blue'>{{data.day}}</font>
                  </div>
                  <div>{{settingData[data.day].reservations}}/{{settingData[data.day].number}}</div>
                  <div><button v-if="date >= today"
                            @click="goSetting(data.day)"><i class="el-icon-setting"></i>设置</button></div>
                </div>
              </div>
              <div v-else>
                <div v-if="data.type == 'current-month'"
                     style="padding-top:25px;">
                  <font color='blue'>{{data.day}}</font>
                  <button v-if="date >= today"
                          @click="goSetting(data.day)"><i class="el-icon-setting"></i>设置</button>
                </div>
                <div v-else
                     style="background-color:rgb(192,196,204);height:85px;width100%;">
                </div>
              </div>
            </template>
          </el-calendar>
        </div>
      </div>
    </div>
    <el-dialog title="预约设置"
               :visible.sync="settingDialog"
               width="30%"
               top="15%">
      <div>日期:{{settingDay}}</div>
      <el-input v-model="number"
                placeholder="输入预约总人数"></el-input>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="settingDialog = false">取消</el-button>
        <el-button type="primary"
                   @click="settingDialog = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: new Date(),
      settingData: {},
      settingDay: '',
      settingDialog: false,
      number: '',
    }
  },
  methods: {
    templateDownload() {
      window.open('api/template/ordersetting_template.xlsx', '_parent')
    },
    goSetting: function (day) {
      this.settingDay = day
      this.settingDialog = true
    },
    isCurrentMonth: function (date) {},
  },
  created() {
    this.settingData = {
      '2020-09-01': { number: 200, reservations: 200 },
      '2020-09-02': { number: 200, reservations: 200 },
      '2020-09-05': { number: 200, reservations: 100 },
      '2020-09-15': { number: 200, reservations: 50 },
      '2020-09-28': { number: 100, reservations: 90 },
    }
  },
}
</script>

<style scoped>
.el-calendar-table .el-calendar-day {
  padding: 0;
}
</style>
