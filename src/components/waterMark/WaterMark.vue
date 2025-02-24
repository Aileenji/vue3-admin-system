<template>
  8888
  <el-upload
    list-type="picture-card"
    :auto-upload="true"
    :before-upload="handleSuccess"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

import type { UploadFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  //   dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}

const handleSuccess = async (file: UploadFile) => {
  console.log(file)
  await addWatermarkAndUpload(file, ['woshishui', '123'])
}
/**
 * 添加水印 异步
 * @param {图片file，在inout中的file} file
 * @param {水印数组，比如名字，电话，时间，地址} watermarks
 */
function addWatermarkAndUpload(file: any, watermarks: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function (event) {
      const img = new Image()
      img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // 设置canvas尺寸与图片一致
        canvas.width = img.width
        canvas.height = img.height

        // 绘制图片到canvas
        ctx.drawImage(img, 0, 0, img.width, img.height)

        //水印大小和颜色
        const fontSize = 100
        ctx.font = fontSize + 'px Arial'
        ctx.fillStyle = 'red'
        //水印起始位置，默认左下角
        const x = 20
        let y = 20
        // 添加水印
        for (let i = 0; i < watermarks.length; i++) {
          y = watermarkHandle(
            ctx,
            watermarks[i],
            canvas.width,
            canvas.height,
            fontSize,
            x,
            y,
          )
        }
        // 将带有水印的canvas转换为Blob对象
        canvas.toBlob(blob => {
          if (blob) {
            blob.name = file.name
            resolve(blob)
          } else {
            reject(new Error('Failed to create blob from canvas'))
          }
        }, 'image/png')
      }
      img.src = event.target.result
      dialogImageUrl.value = event.target.result
    }
    reader.readAsDataURL(file)
    // dialogImageUrl.value = reader
  })
}

/**
 * 写入水印，默认左下角 水印过长，换行 (x,y)=(0,0) 就是左下角的位置
 *  @param {canvas画布对象} ctx
 *  @param {单个水印} watermark
 *  @param {图片的长宽} height
 *  @param {图片的长宽} width
 *  @param {水印字体大小} fontSize
 *  @param {水印位置，默认左下角} x
 *  @param {水印位置，默认左下角} y
 */
function watermarkHandle(ctx, watermark, width, height, fontSize, x, y) {
  //添加水印
  const lineHeight = fontSize + 10
  let line = ''
  const list = []
  for (let i = 0; i < watermark.length; i++) {
    const testLine = line + watermark[i]
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth < width - fontSize && i < watermark.length - 1) {
      line = testLine
    } else {
      list.push(line)
      line = watermark[i]
    }
  }
  const testLine = line + list[list.length - 1]
  const metrics = ctx.measureText(testLine)
  const testWidth = metrics.width
  if (testWidth < width - fontSize) {
    list[list.length - 1] = list[list.length - 1] + line
  } else {
    list.push(line)
  }
  for (let i = list.length - 1; i >= 0; i--) {
    ctx.fillText(list[i], x, height - y)
    y += lineHeight
  }
  //位置
  return y
}
</script>
