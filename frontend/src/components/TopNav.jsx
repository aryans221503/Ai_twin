import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Menu, LogOut, Settings, Search } from 'lucide-react';

export default function TopNav({ toggleSidebar }) {
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="backdrop-blur-xl bg-black/60 border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Left Section - Logo & Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <Menu className="w-5 h-5 text-white" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">AT</span>
                        </div>
                        <span className="text-lg font-bold text-white hidden sm:inline">AI Twin</span>
                    </div>
                </div>

                {/* Center Section - Search */}
                <div className="hidden md:block max-w-md w-full">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search memories..."
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Right Section - User Profile & Actions */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate('/settings')}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>

                    <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-white/10">
                        <div className="text-right">
                            <p className="text-sm font-medium text-white">{user?.username || 'User'}</p>
                            <p className="text-xs text-gray-500">Active</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-sm font-bold">
                            {user?.username?.[0]?.toUpperCase() || 'A'}
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                    </button>
                </div>
            </div>
        </div>
    );
}
