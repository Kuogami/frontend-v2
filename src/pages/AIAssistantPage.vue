<script setup lang="ts">
import { onMounted } from 'vue'
import { Bot, Send, User, Sparkles, MapPin, Calendar, Utensils, Trash2 } from 'lucide-vue-next'
import { useAIAssistant } from '../composables/useAIAssistant'

const {
  messages,
  inputMessage,
  isTyping,
  chatContainer,
  quickActions,
  sendMessage,
  handleQuickAction,
  clearMessages,
  scrollToBottom,
} = useAIAssistant()

// 图标组件映射
const iconComponents: Record<string, typeof MapPin> = {
  MapPin,
  Calendar,
  Utensils,
}

onMounted(() => {
  scrollToBottom()
})

const handleSend = () => {
  sendMessage()
}
</script>

<template>
  <div class="w-full max-w-3xl mx-auto px-4 py-8">
    <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_2px_12px_rgba(147,177,207,0.12)] border border-white/50 overflow-hidden flex flex-col h-[75vh]">
      <!-- 头部 -->
      <div class="p-5 border-b border-sky-100/50 flex items-center justify-between bg-gradient-to-r from-sky-50/50 to-white/50">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A3FF] to-sky-400 flex items-center justify-center shadow-lg shadow-sky-200">
            <Bot class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="font-semibold text-[var(--color-carbon)] text-lg">AI 旅行助手</h2>
            <p class="text-sm text-[var(--color-carbon-light)] flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              在线 - 随时为您服务
            </p>
          </div>
        </div>
        <button
          @click="clearMessages"
          class="p-2.5 rounded-xl hover:bg-red-50 text-[var(--color-carbon-light)] hover:text-red-500 transition-colors"
          title="清空对话"
        >
          <Trash2 class="w-5 h-5" />
        </button>
      </div>
      
      <!-- 消息区域 -->
      <div ref="chatContainer" class="flex-1 overflow-y-auto p-5 space-y-4">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
            'flex gap-3',
            message.role === 'user' ? 'flex-row-reverse' : ''
          ]"
        >
          <!-- 头像 -->
          <div
            :class="[
              'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
              message.role === 'assistant' 
                ? 'bg-gradient-to-br from-[#00A3FF] to-sky-400' 
                : 'bg-[var(--color-carbon)]'
            ]"
          >
            <Bot v-if="message.role === 'assistant'" class="w-4 h-4 text-white" />
            <User v-else class="w-4 h-4 text-white" />
          </div>
          
          <!-- 消息内容 -->
          <div
            :class="[
              'max-w-[80%] p-4 rounded-2xl',
              message.role === 'assistant' 
                ? 'bg-sky-50/80 text-[var(--color-carbon)] rounded-tl-md' 
                : 'bg-[#00A3FF] text-white rounded-tr-md'
            ]"
          >
            <p class="text-sm whitespace-pre-wrap leading-relaxed">{{ message.content }}</p>
            <p 
              :class="[
                'text-xs mt-2',
                message.role === 'assistant' ? 'text-[var(--color-carbon-light)]' : 'text-white/70'
              ]"
            >
              {{ message.time }}
            </p>
          </div>
        </div>

        <!-- 输入中提示 -->
        <div v-if="isTyping" class="flex gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A3FF] to-sky-400 flex items-center justify-center flex-shrink-0">
            <Bot class="w-4 h-4 text-white" />
          </div>
          <div class="bg-sky-50/80 p-4 rounded-2xl rounded-tl-md">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 bg-[#00A3FF] rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2.5 h-2.5 bg-[#00A3FF] rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2.5 h-2.5 bg-[#00A3FF] rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 快捷操作 -->
      <div class="px-5 py-3 border-t border-sky-100/50 flex items-center gap-2 bg-white/50">
        <Sparkles class="w-4 h-4 text-[#00A3FF] flex-shrink-0" />
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <button
            v-for="action in quickActions"
            :key="action.label"
            @click="handleQuickAction(action.prompt)"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-[#00A3FF] text-xs font-medium rounded-full hover:bg-sky-100 transition-colors whitespace-nowrap"
          >
            <component :is="iconComponents[action.icon]" class="w-3 h-3" />
            {{ action.label }}
          </button>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="p-4 border-t border-sky-100/50 bg-white/50">
        <div class="flex items-center gap-3">
          <input
            v-model="inputMessage"
            @keyup.enter="handleSend"
            type="text"
            placeholder="输入您的问题..."
            class="flex-1 px-4 py-3 bg-sky-50/60 rounded-xl text-[var(--color-carbon)] placeholder:text-[var(--color-carbon-light)]/60 outline-none focus:ring-2 focus:ring-[#00A3FF]/20 transition-all"
          />
          <button
            @click="handleSend"
            :disabled="!inputMessage.trim()"
            :class="[
              'p-3 rounded-xl transition-all',
              inputMessage.trim() 
                ? 'bg-[#00A3FF] text-white hover:bg-[#00A3FF]/90 shadow-md shadow-sky-200' 
                : 'bg-sky-100 text-sky-300 cursor-not-allowed'
            ]"
          >
            <Send class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
