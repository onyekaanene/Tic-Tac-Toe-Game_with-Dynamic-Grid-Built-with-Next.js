import Game from "@/components/game/Game";

export default function Home() {
  return (
    <main className="main">
      <header className="header">
        <h1 className="header__title">Tic-Tac-Toe</h1>
        <p className="header__subtitle">Classic game. Dynamic board.</p>
      </header>
      <Game initialBoardSize={3} />
    </main>
  );
}
