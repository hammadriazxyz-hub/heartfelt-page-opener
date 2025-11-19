import { useState } from "react";
import { cn } from "@/lib/utils";

const FoldedCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen perspective-1000">
      <div
        className={cn(
          "relative w-80 h-96 cursor-pointer transition-transform duration-700 ease-out",
          "transform-style-3d",
          isOpen ? "scale-110" : "hover:scale-105"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Card container with 3D effect */}
        <div
          className={cn(
            "relative w-full h-full transition-all duration-700",
            "transform-style-3d"
          )}
          style={{
            transformStyle: "preserve-3d",
            transform: isOpen ? "rotateY(-180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front of the card (closed state) */}
          <div
            className={cn(
              "absolute inset-0 backface-hidden",
              "bg-card rounded-lg shadow-2xl",
              "paper-texture border-2 border-border/30",
              "flex items-center justify-center"
            )}
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            {/* Folded paper effect with crease */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute inset-y-0 left-1/2 w-1 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            </div>

            {/* Hand-drawn heart */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="relative z-10"
            >
              <path
                d="M60 100 C 20 80, 10 50, 20 35 C 30 20, 45 20, 60 35 C 75 20, 90 20, 100 35 C 110 50, 100 80, 60 100 Z"
                fill="none"
                stroke="hsl(var(--heart-color))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw-heart"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }}
              />
            </svg>

            {/* Shadow effect at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent rounded-b-lg" />
          </div>

          {/* Back of the card (open state) */}
          <div
            className={cn(
              "absolute inset-0 backface-hidden",
              "bg-card rounded-lg shadow-2xl",
              "paper-texture border-2 border-border/30",
              "p-8 flex items-center justify-center"
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Lined paper effect */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-card-foreground/10"
                  style={{ top: `${(i + 1) * 8.33}%` }}
                />
              ))}
              {/* Left margin line */}
              <div className="absolute top-0 bottom-0 left-12 w-px bg-accent/20" />
            </div>

            {/* Message text */}
            <div className="relative z-10 text-center space-y-4">
              <p className="handwritten text-xl text-card-foreground leading-relaxed tracking-wide">
                WHEN YOU FEEL SAD
                <br />
                REMEMBER THAT YOU
                <br />
                HAVE ME, OK? I MAY
                <br />
                NOT BE MUCH, BUT I
                <br />
                WILL ALWAYS BE BY
                <br />
                YOUR SIDE.
              </p>
              
              {/* Small heart doodle at bottom */}
              <svg width="40" height="40" viewBox="0 0 40 40" className="mx-auto mt-4">
                <path
                  d="M20 32 C 10 26, 5 18, 8 12 C 11 6, 16 6, 20 12 C 24 6, 29 6, 32 12 C 35 18, 30 26, 20 32 Z"
                  fill="hsl(var(--heart-color))"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Instruction text */}
      {!isOpen && (
        <div className="absolute bottom-12 text-center">
          <p className="text-foreground/60 text-sm animate-pulse">
            Click to open
          </p>
        </div>
      )}
    </div>
  );
};

export default FoldedCard;
