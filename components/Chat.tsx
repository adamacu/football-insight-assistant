"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import Message from "./Message";
import ShotMap from "./ShotMap";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome to Football Insight Assistant! Ask me about player comparisons, match analysis, or tactical breakdowns.",
      visualization: null,
      stats: null
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const hardcodedResponses = {
    "show me shot map": {
      content: "Here's the shot analysis for Liverpool vs Chelsea (2023). Liverpool dominated with 12 shots, Chelsea 8. Liverpool's xG of 1.8 suggests they were the more dangerous side.",
      visualization: <ShotMap />,
      stats: "Shot quality: Liverpool 68% on target, Chelsea 45%"
    },
    "show shot map for": {
      content: "Here's the shot analysis for Liverpool vs Chelsea (2023). Liverpool dominated with 12 shots, Chelsea 8. Liverpool's xG of 1.8 suggests they were the more dangerous side.",
      visualization: <ShotMap />,
      stats: "Shot quality: Liverpool 68% on target, Chelsea 45%"
    },
    "compare salah vs haaland": {
      content: "Mohamed Salah and Erling Haaland represent different attacking profiles. Salah excels in creative playmaking (12 assists) and high work rate, while Haaland is an elite finisher (25 goals, 0.78 xG/90) with aerial dominance.",
      visualization: null,
      stats: "Similarity: 67% | Both top 5% in Europe"
    },
    "compare messi vs ronaldo": {
      content: "Lionel Messi and Cristiano Ronaldo represent two eras of football excellence. Messi's creative genius (0.48 xA/90) and dribbling (72%) contrast with Ronaldo's finishing (0.92 xG/90) and physical presence. Both are top 1% in career output.",
      visualization: null,
      stats: "Career goals: Messi 850+ | Ronaldo 890+ | Both 1000+ club matches"
    },
    "compare": {
      content: "I can compare any two players or teams! Common comparisons: Salah vs Haaland, Messi vs Ronaldo, Mbappe vs Vinicius. Try: 'Compare [Player A] vs [Player B]' or say a sport like 'Compare top scorers in Premier League'",
      visualization: null,
      stats: "Use comparison to analyze performance metrics, playing styles, and statistical profiles"
    },
    "analyze arsenal": {
      content: "Arsenal's attack is highly centralized through the left flank (35%), exploiting Saka's creativity. Their xG per match (1.6) ranks 3rd in Premier League.",
      visualization: null,
      stats: "Attack origin: Left 35% | Center 30% | Right 35%"
    },
    "analyze manchester city": {
      content: "Manchester City's possession-based approach (65% avg possession) creates sustained pressure. Their build-up through central midfielders (Rodri 92 passes/match) creates overloads that open wide channels for wingers.",
      visualization: null,
      stats: "Possession: 65% | Pass completion: 89% | xG per match: 2.1"
    },
    "analyze barcelona": {
      content: "Barcelona traditionally employs tiki-taka football with short passes and positional play. Current focus on youth development (average squad age 24.3) with 7 academy graduates in starting XI.",
      visualization: null,
      stats: "Passes per match: 820 | Press intensity: 8.1 PPDA | Academy players: 7"
    },
    "analyze brazil": {
      content: "Brazil's national team maintains attacking flair with 4-2-3-1 or 4-3-3 flexibility. Focus on technical wingers (Vinicius Jr, Rodrygo) who average 4.3 dribbles per match, creating chaos in wide areas.",
      visualization: null,
      stats: "FIFA Ranking: 3rd | Avg goals per match: 2.4 | Dribble success: 68%"
    },
    "who is the best striker": {
      content: "Based on xG and conversion rate, Haaland (0.78 xG/90) leads strikers globally. Harry Kane (0.65 xG/90) and Kylian Mbappe (0.61 xG/90) follow. However, 'best' depends on playing style - Haaland for finishing, Kane for link-up play, Mbappe for dribbling speed.",
      visualization: null,
      stats: "Haaland: 25 goals/season | Kane: 32 goals/season | Mbappe: 28 goals/season"
    },
    "who is the best midfielder": {
      content: "Kevin De Bruyne leads midfields in creative output (34 assists last season, 0.55 xA/90). Rodri excels in passing and control (92 passes/match), while Jude Bellingham shows versatility in attack (0.42 xG/90 from midfield). Different metrics favor different players.",
      visualization: null,
      stats: "De Bruyne: 34 assists | Rodri: 89% passing | Bellingham: 0.42 xG/90"
    },
    "predict match": {
      content: "Match predictions use historical xG, lineups, tactical matchups, and current form. For live predictions, our system would use real-time data feeds. In this demo version: 'I predict Arsenal vs Liverpool as a narrow Arsenal win (52% vs 48% probability) due to home advantage and recent form.'",
      visualization: null,
      stats: "Prediction accuracy: 72% (historical) | Confidence: High with 10+ match data points"
    },
    "top scorers": {
      content: "Current seasons top performers: Haaland (25 goals), Kane (30 goals), Mbappe (28 goals), Salah (18 goals), Son Heung-min (21 goals). Each in different leagues with varying number of matches played.",
      visualization: null,
      stats: "Premier League: Haaland 25 | Bundesliga: Kane 30 | La Liga: Vinicius 20"
    },
    "most assists": {
      content: "Assist leaders: Kevin De Bruyne (34), Bruno Fernandes (21), Mohamed Salah (12), Ousmane Dembele (18), Jack Grealish (14). Creative midfielders and winger-forwards dominate.",
      visualization: null,
      stats: "De Bruyne: 34 assists (best in 20+ years) | Salah: 12 from wing | Fernandes: 21 from set pieces"
    },
    "tactical analysis": {
      content: "Tactical analysis identifies team strengths, weaknesses, and style. For example: 'Liverpool uses high pressing (7.2 PPDA) creating turnovers. Chelsea builds through right flank with James. Arsenal's left-side focus exploited by opponents.",
      visualization: null,
      stats: "Pressing intensity: Liverpool 7.2 | Arsenal 8.9 | City 6.5 PPDA"
    },
    "formation analysis": {
      content: "Formation analysis tracks how teams structure themselves: Man City 4-2-3-1, Arsenal 4-3-3, Liverpool 4-2-3-1. Formation changes affect possession, shot locations, and defensive coverage areas.",
      visualization: null,
      stats: "Most common: 4-3-3 (45%) | 4-2-3-1 (30%) | 3-4-3 (15%) in Premier League"
    },
    "player form": {
      content: "Player form analyzes recent 5-10 matches for trends. Example: 'Salah in great form - goals in 4/7 matches, 2 assists. Haaland consistent - goals in 6/10. Form fluctuates: tracking who's hot impacts betting and tactical decisions.'",
      visualization: null,
      stats: "Hot streaks: Salah 4 games | Haaland 6 games | Form volatility tracked over 10 games"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractPlayerNames = (query: string): [string, string] | null => {
    const words = query.split(/\s+(?:vs\.?|and|&)\s+/i);
    if (words.length >= 2) {
      return [words[0].trim(), words[1].trim()];
    }
    return null;
  };

  const generateComparisonResponse = (player1: string, player2: string) => {
    const styles = ['creative midfielders', 'attack-oriented forwards', 'playmaking wingers', 'physical box-to-box players'];
    const stats1 = ['goal-scoring from wide positions', 'crossing accuracy and creativity', 'dribbling and chance creation', 'work rate and defensive contribution'];
    const stats2 = ['clinical finishing in the box', 'link-up play and hold-up ability', 'versatility across multiple positions', 'leadership and tactical awareness'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const stat1 = stats1[Math.floor(Math.random() * stats1.length)];
    const stat2 = stats2[Math.floor(Math.random() * stats2.length)];

    return {
      content: `Comparing ${player1} and ${player2} based on performance metrics. Analysis shows ${player1}'s strengths in ${stat1}, while ${player2} excels at ${stat2}. ${player1} operates as ${randomStyle} with exceptional vision and distribution. Both players rank in the top tiers, making this a compelling comparison of complementary playing styles and tactical impact.`,
      visualization: null,
      stats: `Analysis: ${player1} vs ${player2} | Compares: ${stat1}, ${stat2}, tactical roles`
    };
  };

  const extractTeamName = (query: string, keyword: string): string | null => {
    const words = query.split(new RegExp(`${keyword}\\s+(.*)`, 'i'));
    if (words.length > 1 && words[1].trim().length > 0) {
      return words[1].trim();
    }
    return null;
  };

  const generateTeamResponse = (query: string): typeof response | null => {
    const teams: Record<string, string> = {
      'arsenal': 'Arsenal',
      'man city': 'Manchester City',
      'manchester city': 'Manchester City',
      'city': 'Manchester City',
      'barcelona': 'Barcelona',
      'liverpool': 'Liverpool',
      'real madrid': 'Real Madrid',
      'madrid': 'Real Madrid',
      'bayern': 'Bayern Munich',
      'brazil': 'Brazil',
      'manchester united': 'Manchester United',
      'united': 'Manchester United',
      'chelsea': 'Chelsea',
      'tottenham': 'Tottenham',
      'spurs': 'Tottenham',
      'inter': 'Inter Milan',
      'juventus': 'Juventus',
      'ac milan': 'AC Milan',
      'psg': 'Paris Saint-Germain',
      'paris': 'Paris Saint-Germain',
      'portugal': 'Portugal',
      'france': 'France',
      'germany': 'Germany',
      'spain': 'Spain',
      'england': 'England'
    };

    for (const [key, fullName] of Object.entries(teams)) {
      if (query.includes(key.toLowerCase()) || query.includes(fullName.toLowerCase())) {
        const formations = ['4-3-3', '4-2-3-1', '3-4-3'];
        const styles = ['possession-based', 'counter-attacking', 'high-pressing'];
        const randomFormation = formations[Math.floor(Math.random() * formations.length)];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];

        return {
          content: `${fullName}'s tactical approach typically implements a ${randomFormation} formation with ${randomStyle} style. They focus on controlled build-up and creating numerical advantages in wide positions. Attack distribution leans toward their strongest channels with xG per match ranking among the top teams in their league.`,
          visualization: null,
          stats: `Tactical analysis: ${fullName} | Formation: ${randomFormation} | Style: ${randomStyle}`
        };
      }
    }
    return null;
  };

  const generatePlayerRankingResponse = (query: string): typeof response | null => {
    const positions = ['striker', 'forward', 'midfielder', 'winger', 'defender', 'goalkeeper'];
    let foundPosition = '';

    for (const pos of positions) {
      if (query.includes(pos)) {
        foundPosition = pos;
        break;
      }
    }

    if (foundPosition) {
      const topPlayers: Record<string, string[]> = {
        'striker': ['Haaland', 'Kane', 'Mbappe', 'Salah'],
        'forward': ['Haaland', 'Kane', 'Mbappe', 'Salah'],
        'midfielder': ['De Bruyne', 'Rodri', 'Bellingham', 'Modric'],
        'winger': ['Mbappe', 'Vinicius Jr', 'Salah', 'Saka'],
        'defender': ['Van Dijk', 'Ruben Dias', 'Hernandez', 'Kounde'],
        'goalkeeper': ['Alisson', 'Ederson', 'Courtois', 'Ter Stegen']
      };

      const players = topPlayers[foundPosition]?.slice(0, 3) || ['Current top performers'];
      const formattedPlayers = players.map((p, i) => `${i + 1}. ${p}`).join(' | ');

      return {
        content: `The best ${foundPosition}s in world football right now: ${formattedPlayers}. These players excel in ${foundPosition}-specific metrics like goal conversion, chance creation, spatial awareness, and positional versatility Rankings fluctuate based on recent form, tactical matchups, and opposition quality.`,
        visualization: null,
        stats: `Rankings: Top ${foundPosition}s worldwide | Measured by: form, impact, tactical role`
      };
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: input, visualization: null, stats: null }]);
    setIsTyping(true);

    const query = input.toLowerCase();
    let response = null;

    Object.keys(hardcodedResponses).forEach(key => {
      if (query.includes(key)) {
        response = hardcodedResponses[key];
      }
    });

    if (!response) {
      const playerNames = extractPlayerNames(query);
      if (playerNames && playerNames[0] && playerNames[1]) {
        response = generateComparisonResponse(playerNames[0], playerNames[1]);
      }
    }

    if (!response && query.includes('analyze')) {
      response = generateTeamResponse(query);
    }

    if (!response && (query.includes('who is the best') || query.includes('best') || query.includes('top') || query.includes('who is best'))) {
      response = generatePlayerRankingResponse(query);
    }

    setTimeout(() => {
      if (response) {
        setMessages(prev => [...prev, response]);
      } else {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "I can help with many queries! Try: 'Show me shot map for [team A] vs [team B]', 'Compare [Player A] vs [Player B]', 'Analyze [team name] tactics', 'Who is the best [position]', 'Top scorers', 'Most assists', 'Player form for [name]', or 'Predict match [team A] vs [team B]'.",
          visualization: null,
          stats: null
        }]);
      }
      setIsTyping(false);
    }, 500);

    setInput("");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="h-[600px] flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
        {/* Chat Header */}
        <div className="p-5 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold tracking-tight">Football Insight Assistant</h2>
              <p className="text-white/80 text-sm">Chat with StatsBomb data</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-black/20">
          {messages.map((msg, i) => (
            <Message key={i} message={msg} />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-400 text-sm animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-t border-white/10">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about players, matches, or tactics..."
              className="flex-1 bg-gray-700/80 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center gap-2 font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
              disabled={isTyping}
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={20} />}
            </button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: "Shot map", query: "Show me shot map for Liverpool vs Chelsea" },
              { label: "Comparison", query: "Compare Salah vs Haaland" },
              { label: "Team tactics", query: "Analyze Manchester City tactics" },
              { label: "Rankings", query: "Who is the best striker" },
              { label: "Predictions", query: "Predict match Arsenal vs Liverpool"
            }].map((btn) => (
              <button
                key={btn.label}
                onClick={() => setInput(btn.query)}
                className="text-xs text-gray-400 hover:text-white hover:bg-white/10 px-2 py-1 rounded-lg transition-all font-medium"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}