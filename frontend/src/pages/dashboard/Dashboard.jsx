import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import TopNav from '../../components/TopNav';
import Sidebar from '../../components/Sidebar';
import RightSidebar from '../../components/RightSidebar';
import ChatInterface from './ChatInterface';
import LetterGlitch from '../../components/LetterGlitch';

export default function Dashboard() {
    const navigate = useNavigate();
    const { isAuthenticated, loadUser } = useAuthStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chatKey, setChatKey] = useState(0);

    // Check authentication on mount
    useEffect(() => {
        loadUser();
        if (!isAuthenticated && !localStorage.getItem('authToken')) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate, loadUser]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleNewChat = () => {
        setChatKey(prev => prev + 1);
        setSidebarOpen(false);
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-black overflow-hidden relative">
            
            {/* Full Screen 3D Moving Background */}
            <div className="fixed inset-0 z-0">
                <LetterGlitch
                    glitchColors={['#0a3d2c', '#22c55e', '#4ade80']}
                    glitchSpeed={80}
                    outerVignette={true}
                    smooth={true}
                />
            </div>

            {/* Content Layer - Above Background */}
            <div className="relative z-10 h-full w-full flex flex-col">
                {/* Top Navigation */}
                <TopNav toggleSidebar={toggleSidebar} />

                {/* Main Content Area */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Sidebar */}
                    <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} onNewChat={handleNewChat} />

                    {/* Chat Interface (Main) */}
                    <ChatInterface key={chatKey} />

                    {/* Right Sidebar */}
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
}
