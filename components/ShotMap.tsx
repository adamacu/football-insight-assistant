"use client";
import React from "react";
import { demoMatchData } from "@/lib/sampleData";

export default function ShotMap() {
  const pitchWidth = 600;
  const pitchHeight = 400;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold tracking-tight">
            Shot Analysis: {demoMatchData.match}
          </h3>
          <p className="text-gray-400 text-sm">Match breakdown with shot locations and statistics</p>
        </div>
      </div>

      <div className="relative">
        <svg width={pitchWidth} height={pitchHeight} className="rounded-xl shadow-2xl" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}>
          <defs>
            <linearGradient id="pitchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:"#2d6a4f"}} />
              <stop offset="50%" style={{stopColor:"#1a5d3d"}} />
              <stop offset="100%" style={{stopColor:"#2d6a4f"}} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Football Pitch Background */}
          <rect x="0" y="0" width={pitchWidth} height={pitchHeight} fill="url(#pitchGradient)" />

          {/* Pitch Lines */}
          <line x1={pitchWidth/2} y1="0" x2={pitchWidth/2} y2={pitchHeight} stroke="white" strokeWidth="1" opacity="0.4" />
          <circle cx={pitchWidth/2} cy={pitchHeight/2} r="35" stroke="white" strokeWidth="1" opacity="0.4" fill="none" />

          {/* Penalty Areas - Left */}
          <rect x={15} y={pitchHeight/2-80} width="110" height="160" stroke="white" strokeWidth="1" opacity="0.4" fill="none" />
          <rect x={15} y={pitchHeight/2-45} width="40" height="90" stroke="white" strokeWidth="1" opacity="0.4" fill="none" />
          <circle cx={pitchWidth/2} cy={pitchHeight/2} r="50" stroke="white" strokeWidth="1" opacity="0.4" fill="none" strokeDasharray="5,5" />

          {/* Penalty Areas - Right */}
          <rect x={pitchWidth-125} y={pitchHeight/2-80} width="110" height="160" stroke="white" strokeWidth="1" opacity="0.4" fill="none" />
          <rect x={pitchWidth-55} y={pitchHeight/2-45} width="40" height="90" stroke="white" strokeWidth="1" opacity="0.4" fill="none" />

          {/* Goals */}
          <rect x={pitchWidth-3} y={pitchHeight/2-40} width="3" height="80" fill="#fff" opacity="0.6" />
          <rect x="0" y={pitchHeight/2-40} width="3" height="80" fill="#fff" opacity="0.6" />

          {/* Penalty Spots */}
          <circle cx={pitchWidth-50} cy={pitchHeight/2} r="2" fill="white" opacity="0.6" />
          <circle cx={50} cy={pitchHeight/2} r="2" fill="white" opacity="0.6" />

          {/* Shots */}
          {demoMatchData.shots.map((shot, index) => (
            <g key={shot.id} style={{ animation: `pulse 0.5s ease-out ${index * 0.1}s` }}>
              {shot.type === 'goal' ? (
                <>
                  {/* Goal marker with glow effect */}
                  <circle
                    cx={shot.x} cy={shot.y} r="10"
                    fill="#ffd700"
                    opacity="0.9"
                    filter="url(#glow)"
                  />
                  <circle
                    cx={shot.x} cy={shot.y} r="6"
                    fill="#ffd700"
                  />
                  <text x={shot.x + 14} y={shot.y + 4} fill="white" fontSize="11" fontWeight="600">
                    {shot.player.split(' ').pop()}
                  </text>
                </>
              ) : (
                <>
                  <circle
                    cx={shot.x} cy={shot.y} r="7"
                    fill="#ef4444"
                    opacity="0.8"
                  />
                  <text x={shot.x + 11} y={shot.y + 4} fill="white" fontSize="10" fontWeight="500">
                    {shot.player.split(' ').pop()}
                  </text>
                </>
              )}
            </g>
          ))}

          {/* Legend */}
          <g opacity="0.95">
            <rect x={15} y={15} width="14" height="14" fill="#ffd700" rx="2" />
            <text x={35} y={27} fill="white" fontSize="12" fontWeight="500">Goal</text>
            <rect x={15} y={38} width="14" height="14" fill="#ef4444" rx="2" />
            <text x={35} y={50} fill="white" fontSize="12" fontWeight="500">Miss</text>
          </g>
        </svg>
      </div>

      {/* Stats Panel */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 p-5 rounded-xl border border-green-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <p className="text-green-400 font-bold text-lg">Liverpool</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300"><span className="text-green-400 font-semibold">Shots:</span> {demoMatchData.stats.liverpool.shots}</p>
            <p className="text-gray-300"><span className="text-green-400 font-semibold">Goals:</span> {demoMatchData.stats.liverpool.goals}</p>
            <p className="text-gray-300"><span className="text-green-400 font-semibold">xG:</span> {demoMatchData.stats.liverpool.xg}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-5 rounded-xl border border-blue-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <p className="text-blue-400 font-bold text-lg">Chelsea</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300"><span className="text-blue-400 font-semibold">Shots:</span> {demoMatchData.stats.chelsea.shots}</p>
            <p className="text-gray-300"><span className="text-blue-400 font-semibold">Goals:</span> {demoMatchData.stats.chelsea.goals}</p>
            <p className="text-gray-300"><span className="text-blue-400 font-semibold">xG:</span> {demoMatchData.stats.chelsea.xg}</p>
          </div>
        </div>
      </div>
    </div>
  );
}