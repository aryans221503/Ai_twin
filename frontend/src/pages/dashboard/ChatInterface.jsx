import { useState, useRef } from 'react';
import { Send, Paperclip, Smile, Loader } from 'lucide-react';

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: 'Hey! I\'m your AI Twin. I\'ve been learning from your conversations to understand your communication style, preferences, and expertise. How can I assist you today?',
            intent: 'casual',
            timestamp: new Date(Date.now() - 3600000)
        },
        {
            id: 2,
            type: 'user',
            content: 'Tell me about async programming in JavaScript',
            timestamp: new Date(Date.now() - 3500000)
        },
        {
            id: 3,
            type: 'ai',
            content: 'Async programming in JavaScript allows you to perform long-running operations without blocking the main thread. Here are the key concepts:\n\n1. **Callbacks** - Traditional approach, can lead to callback hell\n2. **Promises** - Better error handling and chaining\n3. **Async/Await** - Cleaner syntax, looks like synchronous code\n\nWhich approach would you like me to deep-dive into?',
            intent: 'coding',
            timestamp: new Date(Date.now() - 3400000)
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };
        setMessages([...messages, userMessage]);
        setInputValue('');
        setLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage = {
                id: messages.length + 2,
                type: 'ai',
                content: 'I understand. That\'s an important question. Based on the context of our previous conversations, here\'s my personalized response...\n\nThis is where your AI Twin would provide a contextual, personalized response based on its learning of your preferences and communication style.',
                intent: 'coding',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setLoading(false);
        }, 1500);
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            // Add file message to chat
            const fileMessage = {
                id: messages.length + 1,
                type: 'user',
                content: `📎 Attached: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
                timestamp: new Date()
            };
            setMessages([...messages, fileMessage]);
        }
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const getIntentColor = (intent) => {
        const colors = {
            coding: 'text-blue-400',
            factual: 'text-purple-400',
            casual: 'text-green-400'
        };
        return colors[intent] || 'text-gray-400';
    };

    return (
        <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-black/80">

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xl ${
                                message.type === 'user'
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl rounded-tr-sm'
                                    : 'bg-white/10 border border-white/20 text-gray-100 rounded-2xl rounded-tl-sm'
                            } px-5 py-3 backdrop-blur-sm`}
                        >
                            {message.type === 'ai' && message.intent && (
                                <p className={`text-xs font-semibold mb-2 ${getIntentColor(message.intent)} uppercase tracking-wider`}>
                                    {message.intent}
                                </p>
                            )}
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            <p className={`text-xs mt-2 ${
                                message.type === 'user' ? 'text-white/70' : 'text-gray-400'
                            }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 border border-white/20 text-gray-100 rounded-2xl rounded-tl-sm px-5 py-3 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <Loader className="w-4 h-4 animate-spin text-green-400" />
                                <span className="text-sm text-gray-300">AI Twin is thinking...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 backdrop-blur-xl bg-black/40 p-6">
                <form onSubmit={handleSendMessage} className="space-y-4">
                    {/* Input Field */}
                    <div className="flex items-end gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask your AI Twin anything..."
                                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 focus:bg-white/10 outline-none transition-all resize-none"
                            />

                            {/* Action Buttons Inside Input */}
                            <div className="absolute right-2 bottom-2 flex items-center gap-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx,.txt,.jpg,.png,.gif"
                                />
                                <button
                                    type="button"
                                    onClick={handleFileClick}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    title="Attach file"
                                >
                                    <Paperclip className="w-4 h-4 text-gray-400 hover:text-white" />
                                </button>
                                <button
                                    type="button"
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    title="Emoji"
                                >
                                    <Smile className="w-4 h-4 text-gray-400 hover:text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Send Button */}
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || loading}
                            className="p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Suggested Prompts */}
                    <div className="flex flex-wrap gap-2">
                        {['Help me brainstorm', 'Explain a concept', 'Code review'].map((prompt) => (
                            <button
                                key={prompt}
                                type="button"
                                onClick={() => setInputValue(prompt)}
                                className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </form>
            </div>

        </div>
    );
}
