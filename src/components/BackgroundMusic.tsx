import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create YouTube player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        videoId: 'IyzKaOblzIY',
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: 'IyzKaOblzIY',
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    };
  }, []);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Hidden YouTube player */}
      <div id="youtube-player" className="hidden" />
      
      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/30 shadow-lg hover:bg-card transition-all hover:scale-110"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Volume2 className="w-5 h-5 text-foreground" />
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;
