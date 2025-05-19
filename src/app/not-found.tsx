'use client';
import { useEffect, useState } from 'react';

const NotFound = () => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleLeafClick = () => {
            const leaves = document.querySelectorAll('.leaf-animation');
            leaves.forEach(leaf => {
                const el = leaf as HTMLElement;
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                el.style.transform = `translate(${randomX}px, ${randomY}px)`;

                setTimeout(() => {
                    el.style.transform = '';
                }, 1000);
            });
        };

        document.body.addEventListener('click', handleLeafClick);
        return () => document.body.removeEventListener('click', handleLeafClick);
    }, []);

    return (
        <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
            <div className="relative w-full max-w-3xl mx-auto text-center">
                {/* Animated SVG Background Elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <svg
                        className="absolute top-0 left-0 w-full h-full spin-animation"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="none" stroke="#10B981" strokeWidth="2" d="M20,100 Q50,50 80,100 T140,100 T200,100" />
                    </svg>
                    <svg
                        className="absolute top-0 right-0 w-1/2 h-1/2 spin-animation"
                        style={{ animationDirection: 'reverse' }}
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" />
                    </svg>
                </div>

                {/* Main Content */}
                <div className="relative z-10">
                    {/* Animated 404 SVG */}
                    <div
                        className="mx-auto w-64 h-64 mb-8 float-animation"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="#D1FAE5"
                                stroke="#059669"
                                strokeWidth="2"
                                className={`pulse-animation ${isHovered ? 'animate-pulse' : ''}`}
                            />

                            <path
                                d="M60,30 L60,170 M60,100 L120,30 M120,30 L120,100"
                                stroke="#065F46"
                                strokeWidth="8"
                                strokeLinecap="round"
                                className="path-animation"
                            />

                            <path
                                d="M140,100 a40,40 0 1,0 0.1,0"
                                fill="none"
                                stroke="#065F46"
                                strokeWidth="8"
                                strokeLinecap="round"
                                className="path-animation"
                                style={{ animationDelay: '0.5s' }}
                            />

                            <path
                                d="M180,30 L180,170 M180,100 L120,170 M120,170 L120,100"
                                stroke="#065F46"
                                strokeWidth="8"
                                strokeLinecap="round"
                                className="path-animation"
                                style={{ animationDelay: '1s' }}
                            />

                            {/* Floating leaves */}
                            <path d="M30,40 Q40,20 50,40 T70,40" fill="none" stroke="#059669" strokeWidth="2" className="leaf-animation leaf-1" />
                            <path d="M170,160 Q180,140 190,160" fill="none" stroke="#059669" strokeWidth="2" className="leaf-animation leaf-2" />
                            <path d="M20,120 Q30,100 40,120" fill="none" stroke="#059669" strokeWidth="2" className="leaf-animation leaf-3" />
                        </svg>
                    </div>

                    <h1 className="text-5xl font-bold text-green-800 mb-4">Page Not Found</h1>
                    <p className="text-lg text-green-700 mb-8 max-w-md mx-auto">
                        {`Oops! The page you're looking for has disappeared into the digital wilderness.`}
                    </p>
                </div>
            </div>

            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        
        .float-animation { animation: float 6s ease-in-out infinite; }
        .spin-animation { animation: spin 20s linear infinite; }
        .pulse-animation { animation: pulse 3s ease-in-out infinite; }
        .leaf-animation { animation: float 4s ease-in-out infinite; }
        .path-animation {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 5s ease-in-out forwards;
        }
        
        .leaf-1 { animation-delay: 0s; }
        .leaf-2 { animation-delay: 1s; }
        .leaf-3 { animation-delay: 2s; }
      `}</style>
        </div>
    );
};

export default NotFound;