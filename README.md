# Football Insight Assistant

A conversational AI-powered football analytics application that democratizes professional-level football analytics through natural language interactions.

## 🎯 Features

### Core Capabilities
- **16 Demo Queries** across 7 categories:
  - Shot mapvisualization with gradient pitch design
  - Player comparisons (any two players)
  - Team tactical analysis (20+ teams)
  - Player rankings (any position)
  - Statistical queries (top scorers, assists)
  - Match predictions
  - Form tracking

### Visualizations
- 🎯 Shot maps with goal/miss indicators
- 🏈 Gradient-based team cards with stats
- 📊 Professional pitch rendering with player locations

### Smart Features
- 🤖 Natural language processing for queries
- 🔄 Auto-scroll and loading states
- 🎨 Polished UI with gradients, animations, cards
- 💬 Real-time chat interface with conversational responses

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/adamacu/football-insight-assistant.git
cd football-insight-assistant

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Running the App
Open http://localhost:3000 to see the application.

### Demo Page
Visit http://localhost:3000/demo for the interactive chat interface.

## 📊 Demo Queries

Try these in the chat:
- "Show me shot map for Liverpool vs Chelsea"
- "Compare Salah vs Haaland"
- "Analyze Arsenal tactics"
- "Who is the best striker"
- "Compare Mbappe vs Vinicius"
- "Analyze Real Madrid"

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Visualizations**: D3.js, Recharts
- **Icons**: Lucide React
- **State**: React hooks (useState, useEffect, useRef)
- **Animations**: CSS keyframes + transitions
- **Data Source**: StatsBomb Open Data (sample data)

## 🎨 UI/UX Highlights

- Gradient backgrounds throughout
- Smooth CSS animations (pulse, fade, slide-in)
- Custom scrollbar styling
- Hover effects and transitions
- Backdrop blur effects
- Card-based modern design
- Responsive layout

## 📁 Project Structure

\`\`\`bash
football-insight-assistant/
├── app/
│   ├── demo/page.tsx          # Interactive demo page
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx              # Landing page
│   └── globals.css           # Custom styles and animations
├── components/
│   ├── Chat.tsx              # Chat interface
│   ├── Message.tsx           # Message bubbles
│   └── ShotMap.tsx           # Shot visualization
├── lib/
│   └── sampleData.ts         # Static football data
└── public/                   # Static assets
\`\`\`

## 🎓 Architecture

### Query Processing
1. User types natural language query
2. Pattern matching detects query type
3. Smart functions extract entities (players, teams, positions)
4. Dynamic response generation with contextual stats

### Data Flow
\`\`\`
User Input → Query Processor → Response Generator → Visualization Renderer → UI Display
\`\`\`

## 🔧 Development

### Adding New Demo Queries
1. Key phrases to match in `Chat.tsx`
2. Response content with stats
3. Optional visualization component

### Adding New Visualizations
1. Create component in `/components`
2. Update responses in `Chat.tsx`
3. Integrate with query matching logic

## 📋 Hackathon Submissions

This project was built as a hackathon MVP demonstrating:
- **Novelty**: Conversational AI for sports analytics
- **Utility**: Saves coaches, analysts, fans time getting insights
- **Visual Polish**: Professional-grade UI with gradients, animations
- **Breadth**: 16 query types, 7 categories of analysis

## 🎯 Demo Script

\`\`\`
1. Landing page - Gradient hero with pulsing badge
2. Demo page - Show "Show me shot map for Liverpool vs Chelsea"
3. Shot map - Visual pitch with glowing goals
4. Second query - "Compare Mbappe vs Vinicius"
5. Third query - "Who is the best winger"
6. Explain: "Built with Next.js, StatsBomb data, and LLM-powered natural language"
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
# Deploy to Vercel from GitHub
\`\`\`

### Local Production
\`\`\`bash
npm run build
npm run start
\`\`\`

## 📄 License

MIT License - feel free to use and modify.

## 🙏 Credits

- **Data**: StatsBomb Open Data
- **Tech**: Next.js, Tailwind CSS, D3.js
- **Icons**: Lucide React

## 📧 Contact

For questions or issues: [GitHub Issues](https://github.com/adamacu/football-insight-assistant/issues)
