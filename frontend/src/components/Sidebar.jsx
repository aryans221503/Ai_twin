import { MessageCircle, Brain, Upload, Settings, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, toggleSidebar, onNewChat }) {
    const navigate = useNavigate();

    const menuItems = [
        { icon: MessageCircle, label: 'New Chat', action: onNewChat || (() => {}) },
        { icon: Brain, label: 'My Memories', action: () => {} },
        { icon: Upload, label: 'Upload Documents', action: () => {} },
        { icon: Settings, label: 'Settings', action: () => navigate('/settings') },
    ];

    const recentChats = [
        { id: 1, title: 'JavaScript async/await', time: '2 hours ago' },
        { id: 2, title: 'Project planning tips', time: '5 hours ago' },
        { id: 3, title: 'Python debugging tricks', time: '1 day ago' },
        { id: 4, title: 'React hooks explained', time: '2 days ago' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed md:static top-0 left-0 h-full w-64 backdrop-blur-xl bg-black/60 border-r border-white/10 transition-all duration-300 z-50
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">

                    {/* Close Button (Mobile) */}
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden self-end text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>

                    {/* Main Menu */}
                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={item.action}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white group"
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10" />

                    {/* Recent Chats */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">Recent Chats</h3>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {recentChats.map((chat) => (
                                <button
                                    key={chat.id}
                                    className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors group"
                                >
                                    <p className="text-sm text-gray-300 group-hover:text-white truncate">{chat.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Section - Storage Info */}
                    <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
                        <div className="text-xs text-gray-400">
                            <p className="mb-2">Storage</p>
                            <div className="w-full bg-white/10 rounded-full h-2">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-1/3" />
                            </div>
                            <p className="text-gray-500 mt-1">2.3 GB / 10 GB</p>
                        </div>

                        <button className="w-full text-center py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                            Upgrade Plan
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
