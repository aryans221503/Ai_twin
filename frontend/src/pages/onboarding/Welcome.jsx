import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground';
import '../../index.css';

const featuresList = [
    {
        title: 'Learns Your Style',
        description: 'Train the AI on your messaging style and communication patterns'
    },
    {
        title: 'Auto-Responds',
        description: 'Handles messages in your voice while you\'re away'
    },
    {
        title: 'Extracts Insights',
        description: 'Automatically discovers tasks and remembers important details'
    }
];

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* 3D Moving Background */}
            <AnimatedBackground />

            {/* Main Content */}
            <div className="relative z-10">

                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-center px-4 py-20">
                    <div className="max-w-4xl mx-auto text-center space-y-10 w-full">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-3 animate-fadeIn opacity-0" style={{ animationDelay: '0.2s' }}>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-white">AT</span>
                            </div>
                            <span className="text-3xl font-bold text-white">AI Twin</span>
                        </div>

                        {/* Main Headline with Glitch */}
                        <div className="space-y-6 animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s' }}>
                            <h1
                                className="glitch text-6xl md:text-7xl font-bold text-white leading-tight"
                                data-text="Your Personal AI That Behaves Like You"
                            >
                                Your Personal AI That Behaves Like You
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-textShimmer">
                                Train an AI on your messaging style. It responds as you, extracts tasks, and remembers important details automatically.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fadeInUp opacity-0" style={{ animationDelay: '0.6s' }}>
                            <button
                                onClick={() => navigate('/onboarding/signup')}
                                className="px-10 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg shadow-lg hover:shadow-xl animate-pulse-glow"
                            >
                                Get Started Free
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-10 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:scale-105 hover:border-primary-500/50 transition-all duration-300 text-lg animate-border-glow"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-8 animate-fadeIn opacity-0" style={{ animationDelay: '0.8s' }}>
                            <div className="flex items-center justify-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold hover:scale-110 hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-bounce"
                                            style={{ animationDelay: `${i * 0.1}s` }}
                                        >
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-300 mt-4 animate-textWave">Join 200+ users already using AI Twin</p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4 bg-black/40 backdrop-blur-xl border-t border-white/10">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white glitch-text" data-text="Why Choose AI Twin?">
                            Why Choose AI Twin?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuresList.map((feature, index) => (
                                <div
                                    key={index}
                                    className="backdrop-blur-xl bg-black/40 p-8 rounded-2xl border border-white/10 hover:border-primary-500/50 hover:bg-black/60 transition-all duration-500 text-center space-y-4 animate-scaleIn opacity-0 group cursor-pointer"
                                    style={{
                                        animationDelay: `${0.2 + index * 0.15}s`,
                                        transformOrigin: 'center bottom'
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-lg bg-primary-500/30 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-primary-500/50 transition-all duration-300">
                                        <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-white font-semibold text-xl group-hover:text-primary-400 transition-colors duration-300 animate-titlePop">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 px-4 border-t border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white glitch-text" data-text="How It Works">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: '1', title: 'Upload Your Chats', description: 'Share your conversations to train your AI Twin' },
                                { step: '2', title: 'AI Learns Your Style', description: 'Machine learning models analyze your patterns' },
                                { step: '3', title: 'Start Auto-Responding', description: 'Your AI Twin handles messages in your voice' }
                            ].map((item, index) => (
                                <div key={index} className="text-center space-y-4 animate-slideInUp opacity-0" style={{ animationDelay: `${0.2 + index * 0.2}s` }}>
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto hover:scale-110 hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 cursor-pointer animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                                        <span className="text-2xl font-bold text-white">{item.step}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white hover:text-primary-300 transition-colors duration-300 animate-titlePop">{item.title}</h3>
                                    <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 px-4 bg-black/40 backdrop-blur-xl border-t border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white glitch-text" data-text="What Users Say">
                            What Users Say
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { name: 'Sarah Chen', role: 'Content Creator', quote: 'AI Twin saves me hours every week handling messages while I focus on creating.' },
                                { name: 'Alex Rodriguez', role: 'Entrepreneur', quote: 'Finally, a tool that truly understands my communication style. Game-changer!' }
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="backdrop-blur-xl bg-black/40 p-8 rounded-2xl border border-white/10 space-y-4 hover:border-primary-500/50 hover:bg-black/60 transition-all duration-500 animate-slideInUp opacity-0 group"
                                    style={{ animationDelay: `${0.2 + index * 0.2}s` }}
                                >
                                    <p className="text-gray-300 text-lg italic group-hover:text-gray-200 transition-colors duration-300 animate-textShimmer">"{testimonial.quote}"</p>
                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-white font-semibold group-hover:text-primary-400 transition-colors duration-300 animate-titlePop">{testimonial.name}</p>
                                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section className="py-20 px-4 border-t border-white/10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-white glitch-text" data-text="Your Data. Your Control.">
                            Your Data. Your Control.
                        </h2>
                        <p className="text-xl text-gray-300 animate-textShimmer">
                            We take privacy seriously. Your conversations are encrypted, and you control exactly what data is used.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                            {[
                                { icon: '🔒', title: 'End-to-End Encrypted', desc: 'Your data is encrypted in transit and at rest' },
                                { icon: '👤', title: 'You Control Everything', desc: 'Decide what data the AI can access' },
                                { icon: '⚖️', title: 'GDPR Compliant', desc: 'Full compliance with data protection laws' }
                            ].map((item, index) => (
                                <div key={index} className="space-y-3 animate-scaleIn opacity-0 hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${0.3 + index * 0.15}s` }}>
                                    <div className="text-5xl filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>{item.icon}</div>
                                    <h3 className="text-lg font-semibold text-white animate-titlePop">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-20 px-4 border-t border-white/10 text-center">
                    <div className="max-w-2xl mx-auto space-y-8">
                        <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s' }}>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 glitch-text" data-text="Ready to create your AI Twin?">
                                Ready to create your AI Twin?
                            </h2>
                            <p className="text-xl text-gray-300 animate-textWave">
                                Join 200+ creators who are automating their conversations
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s' }}>
                            <button
                                onClick={() => navigate('/onboarding/signup')}
                                className="px-10 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300 text-lg active:scale-95 animate-pulse-glow"
                            >
                                Get Started Free
                            </button>
                            <button
                                onClick={() => navigate('/onboarding/upload-chats')}
                                className="px-10 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:scale-105 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 text-lg active:scale-95 animate-border-glow"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-4 border-t border-white/10 bg-black/80 animate-fadeIn opacity-0" style={{ animationDelay: '0.8s' }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-8">
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                    <span className="text-lg font-bold text-white">AT</span>
                                </div>
                                <span className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">AI Twin</span>
                            </div>
                            <div className="flex gap-6 flex-wrap justify-center">
                                <a href="#" className="text-gray-400 hover:text-white hover:scale-105 transition-all duration-300">Privacy Policy</a>
                                <a href="#" className="text-gray-400 hover:text-white hover:scale-105 transition-all duration-300">Terms of Service</a>
                                <a href="#" className="text-gray-400 hover:text-white hover:scale-105 transition-all duration-300">Contact</a>
                            </div>
                        </div>
                        <div className="text-center text-gray-500 text-sm border-t border-white/10 pt-8">
                            <p>&copy; 2026 AI Twin. All rights reserved.</p>
                        </div>
                    </div>
                </footer>

            </div>

            {/* styles moved to src/index.css to avoid JSX parsing issues */}
        </div>
    );
}