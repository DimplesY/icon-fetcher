<template>
  <div
    :class="['relative inline-block', { border: border }, { 'opacity-0': hasError }]"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      background,
      padding: padding ? `${padding}px` : 0,
      borderRadius: borderRadius ? `${borderRadius}px` : 0,
    }"
  >
    <!-- 加载占位 -->
    <div v-if="isLoading" class="absolute inset-0 animate-pulse">
      <div class="w-full h-full rounded-md bg-gray-200/60" />
    </div>

    <!-- 图标图片 -->
    <img
      v-if="imgSrc"
      :src="imgSrc"
      :alt="`${domain} logo`"
      :width="size"
      :height="size"
      :loading="lazy ? 'lazy' : 'eager'"
      @error="handleError"
      @load="handleLoad"
      :class="[
        'inline-block transition-opacity duration-300',
        { 'opacity-0': isLoading, 'opacity-100': !isLoading },
      ]"
      :style="{
        objectFit: 'contain',
        display: hasError ? 'none' : 'inline-block',
      }"
    />

    <!-- 回退显示首字母 -->
    <div
      v-if="hasError"
      class="w-full h-full flex items-center justify-center bg-gray-100 rounded-md"
      :style="{ fontSize: `${size * 0.5}px` }"
    >
      {{ domain.charAt(0).toUpperCase() }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { getDomain } from './lib/utils'

export default defineComponent({
  name: 'favicon-crawler',
  props: {
    url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 32,
    },
    timeout: {
      type: Number,
      default: 3000,
    },
    border: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: Number,
      default: 0,
    },
    background: {
      type: String,
      default: 'transparent',
    },
    borderRadius: {
      type: Number,
      default: 0,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    preferFallback: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const domain = getDomain(props.url)
    const imgSrc = ref('')
    const fallbackIndex = ref(0)
    const isLoading = ref(true)
    const hasError = ref(false)
    const isInitialized = ref(false)
    let timeoutId: ReturnType<typeof window.setTimeout> | null

    const standardSources = computed(() => [
      `https://${domain}/favicon.ico`,
      `https://${domain}/logo.svg`,
      `https://${domain}/logo.png`,
      `https://${domain}/apple-touch-icon.png`,
      `https://${domain}/apple-touch-icon-precomposed.png`,
      `https://${domain}/static/img/favicon.ico`,
      `https://${domain}/static/img/favicon.png`,
      `https://${domain}/img/favicon.png`,
      `https://${domain}/img/favicon.ico`,
      `https://${domain}/static/img/logo.svg`,
    ])

    const fallbackServices = computed(() => [
      `https://www.google.com/s2/favicons?domain=https://${domain}&sz=64`,
      `https://www.google.com/s2/favicons?domain=http://${domain}&sz=64`,
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    ])

    const fallbackSources = computed(() =>
      props.preferFallback
        ? [...fallbackServices.value, ...standardSources.value]
        : [...standardSources.value, ...fallbackServices.value],
    )

    watch([imgSrc, isLoading], ([newSrc, loading]) => {
      if (loading && newSrc) {
        timeoutId = window.setTimeout(() => {
          handleError()
          timeoutId = null
        }, props.timeout)
      }
    })

    const clearLoadTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    const handleError = () => {
      const nextIndex = fallbackIndex.value + 1
      if (nextIndex < fallbackSources.value.length) {
        fallbackIndex.value = nextIndex
        imgSrc.value = fallbackSources.value[nextIndex]
        isLoading.value = true
      } else {
        hasError.value = true
        isLoading.value = false
      }
    }

    const handleLoad = () => {
      isLoading.value = false
      hasError.value = false
      clearLoadTimeout()
    }

    onMounted(() => {
      if (!isInitialized.value) {
        imgSrc.value = fallbackSources.value[0]
        isInitialized.value = true
      }
    })

    onUnmounted(() => {
      clearLoadTimeout()
    })

    return {
      domain,
      imgSrc,
      isLoading,
      hasError,
      handleError,
      handleLoad,
    }
  },
})
</script>
