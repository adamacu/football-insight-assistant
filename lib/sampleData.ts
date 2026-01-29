export const demoMatchData = {
  match: "Liverpool vs Chelsea (2023-11-25)",
  shots: [
    { id: 1, player: "Mohamed Salah", x: 85, y: 30, type: "goal", minute: 15 },
    { id: 2, player: "Raheem Sterling", x: 75, y: 45, type: "miss", minute: 22 },
    { id: 3, player: "Mohamed Salah", x: 82, y: 25, type: "goal", minute: 38 },
    { id: 4, player: "Virgil van Dijk", x: 60, y: 50, type: "miss", minute: 42 },
    { id: 5, player: "Darwin Nunez", x: 88, y: 35, type: "miss", minute: 50 },
    { id: 6, player: "Enzo Fernandez", x: 70, y: 55, type: "miss", minute: 58 },
    { id: 7, player: "Mohamed Salah", x: 86, y: 28, type: "goal", minute: 65 },
    { id: 8, player: "Cole Palmer", x: 78, y: 40, type: "goal", minute: 72 },
    { id: 9, player: "Darwin Nunez", x: 84, y: 38, type: "miss", minute: 78 },
    { id: 10, player: "Luis Diaz", x: 80, y: 45, type: "miss", minute: 85 },
    { id: 11, player: "Nicolas Jackson", x: 82, y: 32, type: "miss", minute: 88 },
    { id: 12, player: "Trent Arnold", x: 65, y: 55, type: "miss", minute: 90 },
  ],
  stats: {
    liverpool: { shots: 8, goals: 2, xg: 1.8 },
    chelsea: { shots: 4, goals: 1, xg: 0.9 }
  }
};

export const demoComparisonData = {
  players: {
    salah: { name: "Mohamed Salah", goals: 18, assists: 12, xg: 0.45, speed: 92, creativity: 88 },
    haaland: { name: "Erling Haaland", goals: 25, assists: 4, xg: 0.78, aerial: 89, finishing: 94 }
  },
  radar: {
    salah: [0.72, 0.67, 0.88, 0.75, 0.82],
    haaland: [0.87, 0.55, 0.65, 0.78, 0.85]
  }
};