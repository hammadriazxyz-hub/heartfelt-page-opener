import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Check if API is already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      initializePlayer();
      return;
    }

    // Load YouTube IFrame API only if not loaded
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Create YouTube player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };
  }, []);

  const initializePlayer = () => {
    if (playerRef.current) return;
    
    playerRef.current = new (window as any).YT.Player('youtube-player', {
      videoId: 'IyzKaOblzIY',
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: 'IyzKaOblzIY',
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (event: any) => {
          // Don't autoplay, wait for user interaction
        },
      },
    });
  };

  const togglePlay = () => {
    if (playerRef.current && playerRef.current.playVideo) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (playerRef.current && playerRef.current.mute) {
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
      
      {/* Music Control Panel */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-card/90 backdrop-blur-md border border-border/40 rounded-full p-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all hover:scale-110 group"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" fill="currentColor" />
          ) : (
            <Play className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" fill="currentColor" />
          )}
        </button>

        {/* Mute/Unmute button */}
        <button
          onClick={toggleMute}
          disabled={!isPlaying}
          className="p-3 rounded-full bg-accent/10 hover:bg-accent/20 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-accent group-hover:text-accent/80 transition-colors" />
          ) : (
            <Volume2 className="w-5 h-5 text-accent group-hover:text-accent/80 transition-colors" />
          )}
        </button>
      </div>
    </>
  );
};

export default BackgroundMusic;
