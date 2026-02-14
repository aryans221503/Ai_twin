import { useNavigate } from 'react-router-dom';
import LetterGlitch from '../../components/LetterGlitch';

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex bg-black relative">

            {/* Matrix Background - Full Screen */}
            <div className="absolute inset-0">
                <LetterGlitch
                    glitchColors={['#0a3d2c', '#68ba4aff', '#37a15aff']}
                    glitchSpeed={80}
                    outerVignette={true}
                    smooth={true}
                />
            </div>

            {/* Left Side - Branding (Now in Card) */}
            <div className="hidden lg:flex lg:w-1/2 relative p-12">

                {/* Glassmorphism Card for All Content */}
                <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-3xl p-10 flex flex-col justify-between w-full shadow-2xl">

                    {/* Logo */}
                    <div>
                        <div className="flex items-center gap-3 text-white">
                            <span className="text-2xl font-bold">AI Twin</span>
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold text-white leading-tight">
                            Your personal AI that texts like you
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Train an AI on your messaging style. It responds as you, extracts tasks,
                            and remembers important details automatically.
                        </p>

                        {/* Features */}
                        <div className="space-y-3 pt-6">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-lg bg-primary-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg className="w-4 h-4 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Learns your style</p>
                                    <p className="text-gray-400 text-sm">Continuous training on your conversations</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-lg bg-primary-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg className="w-4 h-4 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Auto-responds</p>
                                    <p className="text-gray-400 text-sm">Handles messages in your voice</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-lg bg-primary-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg className="w-4 h-4 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Extracts insights</p>
                                    <p className="text-gray-400 text-sm">Tasks and memories automatically</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div>
                        <div className="flex items-center gap-3 text-gray-300 text-sm">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-2 border-black/50"></div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-400 to-accent-400 border-2 border-black/50"></div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-primary-400 border-2 border-black/50"></div>
                            </div>
                            <span>Join 200+ users already using AI Twin</span>
                        </div>
                    </div>

                </div>

            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8 relative">
                <div className="w-full max-w-md space-y-8 backdrop-blur-xl bg-black/60 p-10 rounded-2xl border border-white/10 shadow-2xl">

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 text-white mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                            <span className="text-xl font-bold">AT</span>
                        </div>
                        <span className="text-2xl font-bold">AI Twin</span>
                    </div>

                    {/* Heading */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white">
                            Get started
                        </h2>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/onboarding/signup')}
                            className="w-full px-6 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
                        >
                            Sign up with email
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-transparent text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border border-white/10 rounded-xl hover:bg-white/20 transition-colors text-white"
                                onClick={() => alert('Google OAuth - Coming soon!')}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>Google</span>
                            </button>

                            <button
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border border-white/10 rounded-xl hover:bg-white/20 transition-colors text-white"
                                onClick={() => alert('Apple OAuth - Coming soon!')}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                <span>Apple</span>
                            </button>
                        </div>
                    </div>

                    {/* Sign In Link */}
                    <div className="text-center pt-6">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>

                    {/* Terms */}
                    <p className="text-xs text-gray-500 text-center">
                        By continuing, you agree to our{' '}
                        <a href="#" className="underline hover:text-gray-400">Terms</a>
                        {' '}and{' '}
                        <a href="#" className="underline hover:text-gray-400">Privacy Policy</a>
                    </p>

                </div>
            </div>

        </div>
    );
}