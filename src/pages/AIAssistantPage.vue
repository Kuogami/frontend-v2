<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Bot, Send, User, Sparkles, MapPin, Calendar, Utensils } from 'lucide-vue-next'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
}

const messages = ref<Message[]>([
  {
    id: 1,
    role: 'assistant',
    content: '您好！我是您的智能旅行助手。我可以帮您规划旅行路线、推荐景点美食、解答旅行相关问题。请问有什么可以帮您的吗？',
    time: '10:00',
  },
])

const inputMessage = ref('')
const chatContainer = ref<HTMLElement | null>(null)

const quickActions = [
  { icon: MapPin, label: '推荐景点', prompt: '请推荐一些北京必去的景点' },
  { icon: Calendar, label: '行程规划', prompt: '帮我规划一个三日游行程' },
  { icon: Utensils, label: '美食推荐', prompt: '推荐一些当地特色美食' },
]

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return
  
  const userMessage: Message = {
    id: Date.now(),
    role: 'user',
    content: inputMessage.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  }
  
  messages.value.push(userMessage)
  inputMessage.value = ''
  
  // 滚动到底部
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
  
  // 模拟 AI 回复
  setTimeout(async () => {
    const aiMessage: Message = {
      id: Date.now(),
      role: 'assistant',
      content: '感谢您的提问！作为您的旅行助手，我建议您可以考虑以下几点：\n\n1. 根据您的时间安排，合理规划每日行程\n2. 提前预订热门景点的门票\n3. 了解当地的天气情况，做好相应准备\n\n如果您能告诉我更多关于您的旅行偏好，我可以为您提供更个性化的建议。',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
    messages.value.push(aiMessage)
    
    await nextTick()
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }, 1000)
}

const handleQuickAction = (prompt: string) => {
  inputMessage.value = prompt
  sendMessage()
}
</script>

<template>
  <div class="w-full max-w-3xl mx-auto px-4 py-8">
    <div class="bg-white rounded-2xl shadow-[0_2px_12px_rgba(147,177,207,0.12)] overflow-hidden flex flex-col h-[70vh]">
      <!-- 头部 -->
      <div class="p-5 border-b border-sky-100 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shadow-md shadow-sky-200">
          <Bot class="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 class="font-medium text-carbon">AI 旅行助手</h2>
          <p class="text-xs text-carbon-light flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            在线
          </p>
        </div>
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
              'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0',
              message.role === 'assistant' 
                ? 'bg-gradient-to-br from-sky-400 to-sky-500' 
                : 'bg-carbon'
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
                ? 'bg-sky-50 text-carbon rounded-tl-md' 
                : 'bg-sky-primary text-white rounded-tr-md'
            ]"
          >
            <p class="text-sm whitespace-pre-wrap leading-relaxed">{{ message.content }}</p>
            <p 
              :class="[
                'text-xs mt-2',
                message.role === 'assistant' ? 'text-carbon-light' : 'text-white/70'
              ]"
            >
              {{ message.time }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- 快捷操作 -->
      <div class="px-5 py-3 border-t border-sky-100 flex items-center gap-2">
        <Sparkles class="w-4 h-4 text-sky-primary flex-shrink-0" />
        <div class="flex items-center gap-2 overflow-x-auto">
          <button
            v-for="action in quickActions"
            :key="action.label"
            @click="handleQuickAction(action.prompt)"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-primary text-xs font-medium rounded-full hover:bg-sky-100 transition-colors whitespace-nowrap"
          >
            <component :is="action.icon" class="w-3 h-3" />
            {{ action.label }}
          </button>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="p-4 border-t border-sky-100">
        <div class="flex items-center gap-3">
          <input
            v-model="inputMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="输入您的问题..."
            class="flex-1 px-4 py-3 bg-sky-50/60 rounded-xl text-carbon placeholder:text-carbon-light/60 outline-none focus:ring-2 focus:ring-sky-primary/20 transition-all"
          />
          <button
            @click="sendMessage"
            :disabled="!inputMessage.trim()"
            :class="[
              'p-3 rounded-xl transition-all',
              inputMessage.trim() 
                ? 'bg-sky-primary text-white hover:bg-sky-primary/90 shadow-md shadow-sky-200' 
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
