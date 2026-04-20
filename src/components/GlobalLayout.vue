<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './NavBar.vue'
import GlobalAIAssistant from './GlobalAIAssistant.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[var(--color-background)]">
    <!-- 置顶毛玻璃导航栏 -->
    <NavBar />
    
    <!-- 全局 AI 助手悬浮组件 -->
    <GlobalAIAssistant />
    
    <!-- 主内容区域 -->
    <main class="flex-1 pt-20">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <slot />
      </div>
    </main>
    
    <!-- 页脚 -->
    <footer class="border-t border-[var(--color-border-light)] bg-white/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-[var(--color-carbon-light)]">
            © {{ currentYear }} 旅游系统. 保留所有权利.
          </p>
          <div class="flex items-center gap-6">
            <a href="#" class="text-sm text-[var(--color-carbon-light)] hover:text-[var(--color-sky-primary)] transition-colors">
              隐私政策
            </a>
            <a href="#" class="text-sm text-[var(--color-carbon-light)] hover:text-[var(--color-sky-primary)] transition-colors">
              服务条款
            </a>
            <a href="#" class="text-sm text-[var(--color-carbon-light)] hover:text-[var(--color-sky-primary)] transition-colors">
              联系我们
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
