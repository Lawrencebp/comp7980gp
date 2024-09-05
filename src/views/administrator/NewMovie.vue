<script setup>

</script>

<template>
  <div class="container" style="width: 80%">
    <el-form label-width="auto" label-position="top">
      <el-form-item label="Movie Name">
        <el-input placeholder="Movie Name"/>
      </el-form-item>
      <el-form-item label="Movie Area">
        <el-input placeholder="Movie Area"/>
      </el-form-item>
      <el-form-item label="Movie Describe">
        <el-input type="textarea" :show-word-limit="true" placeholder="Movie Describe" rows="5" maxlength="100"/>
      </el-form-item>
      <el-form-item label="Movie Type">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="Option A" value="Value A" />
          <el-checkbox label="Option B" value="Value B" />
          <el-checkbox label="Option C" value="Value C" />
          <el-checkbox label="Option D" value="Value D" />
          <el-checkbox label="Option E" value="Value E" />
          <el-checkbox label="Option F" value="Value F" />
          <el-checkbox label="Option G" value="Value G" />
          <el-checkbox label="Option H" value="Value H" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Movie time">
        <el-col :span="11">
          <el-date-picker
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Movie Box office  $">
        <el-input-number size="large" :precision="2" min="0" placeholder="Movie Box office"/>
      </el-form-item>
      <el-form-item label="Movie Duration">
        <el-input-number size="large" :precision="0" min="0" placeholder="Movie Duration"/>
      </el-form-item>
      <el-form-item label="Movie Score">
        <el-input-number size="large" :precision="0" min="0" placeholder="Movie Score"/>
      </el-form-item>
      <el-form-item style="margin-top: 20px">
        <el-button type="primary">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
:deep(.el-input){
  --el-input-bg-color: rgb(206, 206, 212);
  --el-input-border-color: none;
  --el-input-border-radius: 10px;
  font-size: 16px;
  --el-input-text-color: rgb(34,53,81);
}

:deep(.el-form-item__label) {
  color: white;
}
:deep(.el-checkbox__label){
  color:white;
}
</style>
