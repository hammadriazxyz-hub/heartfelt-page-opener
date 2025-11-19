import { useState } from "react";
import FoldedCard from "@/components/FoldedCard";
import DinoGame from "@/components/DinoGame";

const Index = () => {
  const [hasWon, setHasWon] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {!hasWon ? (
        <DinoGame onWin={() => setHasWon(true)} />
      ) : (
        <FoldedCard />
      )}
    </div>
  );
};

export default Index;
