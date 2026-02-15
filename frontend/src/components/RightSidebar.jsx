import { Brain, FileText, Clock, Zap } from 'lucide-react';

export default function RightSidebar() {
    const stats = [
        {
            icon: Brain,
            label: 'Total Memories',
            value: '42',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: FileText,
            label: 'Documents',
            value: '5',
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: Clock,
            label: 'Last Chat',
            value: '2h ago',
            color: 'from-orange-500 to-orange-600'
        },
        {
            icon: Zap,
            label: 'Personality Match',
            value: '85%',
            color: 'from-green-500 to-green-600'
        },
    ];

    return (
        <div className="hidden lg:block w-72 backdrop-blur-xl bg-black/60 border-l border-white/10 p-6 space-y-6 overflow-y-auto">

            {/* Section Title */}
            <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Quick Stats</h3>
            </div>

            {/* Stats Cards */}
            <div className="space-y-3">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-xs text-gray-400 font-medium mb-2">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* AI Twin Personality */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your AI Twin</h3>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <p className="text-sm text-gray-300">Status: <span className="text-green-400 font-medium">Active</span></p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Learning Progress</span>
                            <span className="text-white font-medium">65%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full w-2/3" />
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 pt-2">
                        Your AI Twin is learning from your conversations and becoming more personalized each day.
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Recent Activity */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Activity</h3>

                <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-400">
                        <span>Created 2 new memories</span>
                        <span className="text-gray-500">2h ago</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                        <span>Uploaded document</span>
                        <span className="text-gray-500">5h ago</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                        <span>30 messages exchanged</span>
                        <span className="text-gray-500">1d ago</span>
                    </div>
                </div>
            </div>

            {/* Tip Box */}
            <div className="backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-blue-300">💡 Pro Tip</p>
                <p className="text-xs text-blue-200">Upload more documents to improve your AI Twin's accuracy and personalization.</p>
            </div>

        </div>
    );
}
