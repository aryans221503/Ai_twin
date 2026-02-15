import { useState, useEffect } from 'react';
import { Save, Lock, Bell, Palette, Zap, LogOut, Trash2, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function Settings() {
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();

    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [savedMessage, setSavedMessage] = useState('');

    // Profile Settings State
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : {
            fullName: user?.username || 'User Name',
            email: 'user@example.com',
            bio: 'AI enthusiast',
            username: user?.username || 'username'
        };
    });

    // Security Settings State
    const [security, setSecurity] = useState(() => {
        const saved = localStorage.getItem('securitySettings');
        return saved ? JSON.parse(saved) : {
            twoFAEnabled: false,
            showPassword: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    });

    // AI Personality State
    const [personality, setPersonality] = useState(() => {
        const saved = localStorage.getItem('aiPersonality');
        return saved ? JSON.parse(saved) : {
            friendliness: 75,
            formality: 50,
            humor: 60,
            techLevel: 80,
            responseStyle: 'balanced'
        };
    });

    // Notification Settings State
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('notifications');
        return saved ? JSON.parse(saved) : {
            chatNotifications: true,
            emailNotifications: false,
            memoryAlerts: true,
            documentAlerts: true,
            weeklyReports: false,
            soundEnabled: true
        };
    });

    // Privacy Settings State
    const [privacy, setPrivacy] = useState(() => {
        const saved = localStorage.getItem('privacySettings');
        return saved ? JSON.parse(saved) : {
            dataSharing: false,
            memoryRetention: '6months',
            exportData: false
        };
    });

    // Integrations State
    const [integrations, setIntegrations] = useState(() => {
        const saved = localStorage.getItem('integrations');
        return saved ? JSON.parse(saved) : {
            telegramConnected: false,
            telegramToken: '',
            discordConnected: false,
            slackConnected: false
        };
    });

    // Save Functions
    const saveProfile = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('userProfile', JSON.stringify(profile));
            setLoading(false);
            setSavedMessage('Profile updated successfully!');
            setTimeout(() => setSavedMessage(''), 3000);
        }, 500);
    };

    const saveSecurity = () => {
        setLoading(true);
        setTimeout(() => {
            if (security.newPassword !== security.confirmPassword) {
                setSavedMessage('Passwords do not match!');
                setLoading(false);
                return;
            }
            localStorage.setItem('securitySettings', JSON.stringify(security));
            setSecurity({ ...security, oldPassword: '', newPassword: '', confirmPassword: '' });
            setLoading(false);
            setSavedMessage('Password changed successfully!');
            setTimeout(() => setSavedMessage(''), 3000);
        }, 500);
    };

    const savePersonality = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('aiPersonality', JSON.stringify(personality));
            setLoading(false);
            setSavedMessage('AI personality updated!');
            setTimeout(() => setSavedMessage(''), 3000);
        }, 500);
    };

    const saveNotifications = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('notifications', JSON.stringify(notifications));
            setLoading(false);
            setSavedMessage('Notification preferences saved!');
            setTimeout(() => setSavedMessage(''), 3000);
        }, 500);
    };

    const savePrivacy = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('privacySettings', JSON.stringify(privacy));
            setLoading(false);
            setSavedMessage('Privacy settings updated!');
            setTimeout(() => setSavedMessage(''), 3000);
        }, 500);
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
            navigate('/login');
        }
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure? This action cannot be undone.')) {
            if (window.confirm('This will permanently delete your account and all data.')) {
                // In real scenario, this would call backend
                logout();
                navigate('/welcome');
            }
        }
    };

    const handleClearHistory = () => {
        if (window.confirm('Clear all chat history? This cannot be undone.')) {
            setSavedMessage('Chat history cleared!');
            setTimeout(() => setSavedMessage(''), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="backdrop-blur-xl bg-black/60 border-b border-white/10 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-1">Manage your AI Twin and account preferences</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="space-y-2 sticky top-24">
                            {[
                                { id: 'profile', label: 'Profile', icon: '👤' },
                                { id: 'security', label: 'Security', icon: '🔒' },
                                { id: 'personality', label: 'AI Personality', icon: '🤖' },
                                { id: 'notifications', label: 'Notifications', icon: '🔔' },
                                { id: 'privacy', label: 'Privacy', icon: '🛡️' },
                                { id: 'integrations', label: 'Integrations', icon: '🔗' },
                                { id: 'danger', label: 'Danger Zone', icon: '⚠️' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-green-500/20 border border-green-500/50 text-white'
                                            : 'hover:bg-white/10 text-gray-300 hover:text-white'
                                    }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Save Message */}
                        {savedMessage && (
                            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 flex items-center gap-2">
                                <Check className="w-5 h-5" />
                                {savedMessage}
                            </div>
                        )}

                        {/* Profile Settings */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                                            <input
                                                type="text"
                                                value={profile.username}
                                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={profile.fullName}
                                                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                                            <textarea
                                                value={profile.bio}
                                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                                rows="4"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            onClick={saveProfile}
                                            disabled={loading}
                                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Save className="w-5 h-5" />
                                            Save Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Settings */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

                                    {/* Two Factor Authentication */}
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                                                <p className="text-sm text-gray-400 mt-1">Add an extra layer of security to your account</p>
                                            </div>
                                            <button
                                                onClick={() => setSecurity({ ...security, twoFAEnabled: !security.twoFAEnabled })}
                                                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                                    security.twoFAEnabled
                                                        ? 'bg-green-500/20 border border-green-500 text-green-400'
                                                        : 'bg-white/10 border border-white/20 text-gray-300'
                                                }`}
                                            >
                                                {security.twoFAEnabled ? 'Enabled' : 'Disabled'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Change Password */}
                                    <div className="border-t border-white/10 pt-8">
                                        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Old Password</label>
                                                <input
                                                    type={security.showPassword ? 'text' : 'password'}
                                                    value={security.oldPassword}
                                                    onChange={(e) => setSecurity({ ...security, oldPassword: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                                <input
                                                    type={security.showPassword ? 'text' : 'password'}
                                                    value={security.newPassword}
                                                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                                                <input
                                                    type={security.showPassword ? 'text' : 'password'}
                                                    value={security.confirmPassword}
                                                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                                                />
                                            </div>

                                            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={security.showPassword}
                                                    onChange={(e) => setSecurity({ ...security, showPassword: e.target.checked })}
                                                    className="rounded border border-white/20"
                                                />
                                                Show passwords
                                            </label>

                                            <button
                                                onClick={saveSecurity}
                                                disabled={loading}
                                                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Lock className="w-5 h-5" />
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* AI Personality Settings */}
                        {activeTab === 'personality' && (
                            <div className="space-y-6">
                                <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">AI Personality</h2>
                                    <p className="text-gray-400 mb-6">Customize how your AI Twin responds to you</p>

                                    <div className="space-y-6">
                                        {/* Friendliness */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-medium text-gray-300">Friendliness</label>
                                                <span className="text-green-400 font-semibold">{personality.friendliness}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={personality.friendliness}
                                                onChange={(e) => setPersonality({ ...personality, friendliness: parseInt(e.target.value) })}
                                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500"
                                            />
                                        </div>

                                        {/* Formality */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-medium text-gray-300">Formality</label>
                                                <span className="text-green-400 font-semibold">{personality.formality}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={personality.formality}
                                                onChange={(e) => setPersonality({ ...personality, formality: parseInt(e.target.value) })}
                                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500"
                                            />
                                        </div>

                                        {/* Humor */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-medium text-gray-300">Humor Level</label>
                                                <span className="text-green-400 font-semibold">{personality.humor}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={personality.humor}
                                                onChange={(e) => setPersonality({ ...personality, humor: parseInt(e.target.value) })}
                                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500"
                                            />
                                        </div>

                                        {/* Technical Level */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-medium text-gray-300">Technical Depth</label>
                                                <span className="text-green-400 font-semibold">{personality.techLevel}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={personality.techLevel}
                                                onChange={(e) => setPersonality({ ...personality, techLevel: parseInt(e.target.value) })}
                                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500"
                                            />
                                        </div>

                                        {/* Response Style */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">Response Style</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['brief', 'balanced', 'detailed'].map((style) => (
                                                    <button
                                                        key={style}
                                                        onClick={() => setPersonality({ ...personality, responseStyle: style })}
                                                        className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                                                            personality.responseStyle === style
                                                                ? 'bg-green-500/20 border border-green-500 text-green-400'
                                                                : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
                                                        }`}
                                                    >
                                                        {style}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={savePersonality}
                                            disabled={loading}
                                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Zap className="w-5 h-5" />
                                            Save Personality Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Settings */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>

                                    <div className="space-y-4">
                                        {[
                                            { key: 'chatNotifications', label: 'Chat Notifications', desc: 'Get notified about new messages' },
                                            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive summaries via email' },
                                            { key: 'memoryAlerts', label: 'Memory Alerts', desc: 'Notify when memories are updated' },
                                            { key: 'documentAlerts', label: 'Document Alerts', desc: 'Alerts for document uploads' },
                                            { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Get weekly usage statistics' },
                                            { key: 'soundEnabled', label: 'Sound Notifications', desc: 'Play sound for notifications' },
                                        ].map(({ key, label, desc }) => (
                                            <div key={key} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                                                <div>
                                                    <p className="text-white font-medium">{label}</p>
                                                    <p className="text-sm text-gray-400">{desc}</p>
                                                </div>
                                                <button
                                                    onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                                                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                                        notifications[key]
                                                            ? 'bg-green-500/20 border border-green-500 text-green-400'
                                                            : 'bg-white/10 border border-white/20 text-gray-300'
                                                    }`}
                                                >
                                                    {notifications[key] ? 'On' : 'Off'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={saveNotifications}
                                        disabled={loading}
                                        className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Bell className="w-5 h-5" />
                                        Save Notifications
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Privacy Settings */}
                        {activeTab === 'privacy' && (
                            <div className="space-y-6">
                                <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                                            <div>
                                                <p className="text-white font-medium">Data Sharing</p>
                                                <p className="text-sm text-gray-400">Allow anonymous usage analytics</p>
                                            </div>
                                            <button
                                                onClick={() => setPrivacy({ ...privacy, dataSharing: !privacy.dataSharing })}
                                                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                                    privacy.dataSharing
                                                        ? 'bg-green-500/20 border border-green-500 text-green-400'
                                                        : 'bg-white/10 border border-white/20 text-gray-300'
                                                }`}
                                            >
                                                {privacy.dataSharing ? 'On' : 'Off'}
                                            </button>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">Memory Retention</label>
                                            <select
                                                value={privacy.memoryRetention}
                                                onChange={(e) => setPrivacy({ ...privacy, memoryRetention: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                                            >
                                                <option value="3months">3 months</option>
                                                <option value="6months">6 months</option>
                                                <option value="1year">1 year</option>
                                                <option value="forever">Forever</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        onClick={savePrivacy}
                                        disabled={loading}
                                        className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        Save Privacy Settings
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Integrations */}
                        {activeTab === 'integrations' && (
                            <div className="space-y-6">
                                <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">Integrations</h2>

                                    {/* Telegram */}
                                    <div className="mb-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">📱</div>
                                                <div>
                                                    <h3 className="font-semibold text-white">Telegram Bot</h3>
                                                    <p className="text-sm text-gray-400">Connect your AI Twin to Telegram</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setIntegrations({ ...integrations, telegramConnected: !integrations.telegramConnected })}
                                                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                                    integrations.telegramConnected
                                                        ? 'bg-green-500/20 border border-green-500 text-green-400'
                                                        : 'bg-blue-500/20 border border-blue-500 text-blue-400'
                                                }`}
                                            >
                                                {integrations.telegramConnected ? 'Connected' : 'Connect'}
                                            </button>
                                        </div>

                                        {integrations.telegramConnected && (
                                            <div className="mt-4 p-3 bg-black/40 rounded border border-white/10">
                                                <p className="text-sm text-gray-300 mb-2">Bot Token:</p>
                                                <input
                                                    type="text"
                                                    placeholder="Your bot token here"
                                                    value={integrations.telegramToken}
                                                    onChange={(e) => setIntegrations({ ...integrations, telegramToken: e.target.value })}
                                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm focus:border-green-500 outline-none"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Discord */}
                                    <div className="mb-6 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">💜</div>
                                                <div>
                                                    <h3 className="font-semibold text-white">Discord (Coming Soon)</h3>
                                                    <p className="text-sm text-gray-400">Integrate with Discord servers</p>
                                                </div>
                                            </div>
                                            <button disabled className="px-4 py-2 rounded-lg font-semibold bg-gray-500/20 border border-gray-500 text-gray-400 cursor-not-allowed">
                                                Coming Soon
                                            </button>
                                        </div>
                                    </div>

                                    {/* Slack */}
                                    <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">🟣</div>
                                                <div>
                                                    <h3 className="font-semibold text-white">Slack (Coming Soon)</h3>
                                                    <p className="text-sm text-gray-400">Integrate with your Slack workspace</p>
                                                </div>
                                            </div>
                                            <button disabled className="px-4 py-2 rounded-lg font-semibold bg-gray-500/20 border border-gray-500 text-gray-400 cursor-not-allowed">
                                                Coming Soon
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Danger Zone */}
                        {activeTab === 'danger' && (
                            <div className="space-y-6">
                                <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <AlertTriangle className="w-6 h-6 text-red-400" />
                                        <h2 className="text-2xl font-bold text-white">Danger Zone</h2>
                                    </div>

                                    <p className="text-gray-400 mb-6">Irreversible actions - proceed with caution</p>

                                    <div className="space-y-4">
                                        <button
                                            onClick={handleClearHistory}
                                            className="w-full p-4 bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/50 rounded-lg text-left hover:bg-orange-500/20 transition-colors group"
                                        >
                                            <p className="text-white font-semibold group-hover:text-orange-400">Clear Chat History</p>
                                            <p className="text-sm text-gray-400">Delete all your chat messages</p>
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (window.confirm('Reset all AI Twin learning? This will clear personality data.')) {
                                                    setSavedMessage('AI Twin reset!');
                                                    setTimeout(() => setSavedMessage(''), 3000);
                                                }
                                            }}
                                            className="w-full p-4 bg-yellow-500/10 border border-yellow-500/30 hover:border-yellow-500/50 rounded-lg text-left hover:bg-yellow-500/20 transition-colors group"
                                        >
                                            <p className="text-white font-semibold group-hover:text-yellow-400">Reset AI Twin</p>
                                            <p className="text-sm text-gray-400">Reset your AI Twin to initial state</p>
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full p-4 bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/50 rounded-lg text-left hover:bg-blue-500/20 transition-colors group flex items-center justify-between"
                                        >
                                            <div>
                                                <p className="text-white font-semibold group-hover:text-blue-400">Logout</p>
                                                <p className="text-sm text-gray-400">Sign out of your account</p>
                                            </div>
                                            <LogOut className="w-5 h-5 text-blue-400" />
                                        </button>

                                        <button
                                            onClick={handleDeleteAccount}
                                            className="w-full p-4 bg-red-500/10 border border-red-500/30 hover:border-red-500/50 rounded-lg text-left hover:bg-red-500/20 transition-colors group flex items-center justify-between"
                                        >
                                            <div>
                                                <p className="text-white font-semibold group-hover:text-red-400">Delete Account</p>
                                                <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                                            </div>
                                            <Trash2 className="w-5 h-5 text-red-400" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}
