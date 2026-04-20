import { ref, nextTick, computed } from 'vue'

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
}

// 全局共享状态 - 单例模式
const messages = ref<Message[]>([
  {
    id: 1,
    role: 'assistant',
    content: '您好！我是您的智能旅行助手。我可以帮您规划旅行路线、推荐景点美食、解答旅行相关问题。请问有什么可以帮您的吗？',
    time: '10:00',
  },
])

const inputMessage = ref('')
const isTyping = ref(false)

export function useAIAssistant() {
  const chatContainer = ref<HTMLElement | null>(null)

  const quickActions = [
    { icon: 'MapPin', label: '推荐景点', prompt: '请推荐一些北京必去的景点' },
    { icon: 'Calendar', label: '行程规划', prompt: '帮我规划一个三日游行程' },
    { icon: 'Utensils', label: '美食推荐', prompt: '推荐一些当地特色美食' },
  ]

  const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || inputMessage.value
    if (!messageToSend.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: messageToSend,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }

    messages.value.push(userMessage)
    inputMessage.value = ''
    isTyping.value = true

    await scrollToBottom()

    // 模拟 AI 回复
    setTimeout(async () => {
      const aiMessage: Message = {
        id: Date.now(),
        role: 'assistant',
        content: generateAIResponse(messageToSend),
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }
      messages.value.push(aiMessage)
      isTyping.value = false

      await scrollToBottom()
    }, 1000 + Math.random() * 500)
  }

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt)
  }

  const clearMessages = () => {
    messages.value = [
      {
        id: Date.now(),
        role: 'assistant',
        content: '您好！我是您的智能旅行助手。我可以帮您规划旅行路线、推荐景点美食、解答旅行相关问题。请问有什么可以帮您的吗？',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]
  }

  return {
    messages,
    inputMessage,
    isTyping,
    chatContainer,
    quickActions,
    sendMessage,
    handleQuickAction,
    clearMessages,
    scrollToBottom,
  }
}

// 模拟 AI 响应生成
function generateAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('景点') || lowerMessage.includes('推荐')) {
    return '根据您的需求，我为您推荐以下热门景点：\n\n1. 故宫博物院 - 世界最大的宫殿建筑群\n2. 长城 - 中华民族的象征\n3. 颐和园 - 皇家园林典范\n4. 天坛 - 明清祭天圣地\n\n这些景点各有特色，建议您根据兴趣和时间合理安排。需要我帮您规划具体行程吗？'
  }
  
  if (lowerMessage.includes('行程') || lowerMessage.includes('规划')) {
    return '好的，我来为您规划一个精彩的三日游行程：\n\n【第一天】故宫 → 景山公园 → 王府井\n【第二天】长城（八达岭）→ 鸟巢/水立方夜景\n【第三天】颐和园 → 圆明园 → 南锣鼓巷\n\n每个景点建议游览时间2-3小时，记得提前预约门票！'
  }
  
  if (lowerMessage.includes('美食') || lowerMessage.includes('吃')) {
    return '北京有很多特色美食值得品尝：\n\n1. 北京烤鸭 - 推荐全聚德、大董\n2. 炸酱面 - 老北京的味道\n3. 豆汁儿配焦圈 - 地道早餐\n4. 涮羊肉 - 冬季必吃\n5. 驴打滚、艾窝窝 - 传统小吃\n\n您想了解哪家餐厅的具体信息吗？'
  }
  
  return '感谢您的提问！作为您的旅行助手，我建议您可以考虑以下几点：\n\n1. 根据您的时间安排，合理规划每日行程\n2. 提前预订热门景点的门票\n3. 了解当地的天气情况，做好相应准备\n\n如果您能告诉我更多关于您的旅行偏好，我可以为您提供更个性化的建议。'
}
