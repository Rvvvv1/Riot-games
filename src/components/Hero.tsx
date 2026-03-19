import { useEffect, useMemo, useRef, useState } from "react";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Loading } from "./Loading";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
export const HeroPage = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isNextReady, setIsNextReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadRef = useRef<HTMLVideoElement>(null);
  const totalVideos = 6;
  const getNextIndex = (index: number) => (index % totalVideos) + 1;

  const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

  const nextIndex = useMemo(
    () => getNextIndex(currentIndex),
    [currentIndex],
  );

  useEffect(() => {
    setIsNextReady(false);
  }, [currentIndex]);

  const advanceToNext = () => {
    const nextSrc = preloadRef.current?.currentSrc || getVideoSrc(nextIndex);

    if (isNextReady && videoRef.current) {
      setIsLoading(false);
      videoRef.current.src = nextSrc;
      videoRef.current.load();
      void videoRef.current.play();
      setCurrentIndex(nextIndex);
      return;
    }

    setIsLoading(true);
    setCurrentIndex(nextIndex);
  };

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 93% 90%, 0 95%)",
      borderRadius: "0% 0% 37% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div id="portfolio" className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && <Loading />}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
      >
        <div>
          <video
            ref={videoRef}
            src={getVideoSrc(currentIndex)}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute top-0 left-0 size-full object-cover object-center"
            onCanPlay={() => setIsLoading(false)}
            onPlaying={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            onEnded={advanceToNext}
            onError={() => setIsLoading(false)}
          />

          {/* 预加载下一条 */}
          <video
            ref={preloadRef}
            src={getVideoSrc(nextIndex)}
            muted
            playsInline
            preload="auto"
            className="hidden"
            onCanPlayThrough={() => setIsNextReady(true)}
            onError={() => setIsNextReady(false)}
          />
        </div>

        <h1 className="hero-heading absolute right-5 bottom-5 z-45 text-white">
          Riot
          <br />
          Games
        </h1>

        <div className="absolute top-0 left-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h3 className="special-font hero-heading text-blue-100">
              英雄去超越
            </h3>

            <h4 className="font-robert-regular mt-2 mb-5 max-w-64 text-white">
              leagueoflegends
            </h4>

            <Button
              id="watch-trailer"
              title="立即游玩"
              leftIcon={<ArrowRight />}
              containerClass="bg-yellow-300 flex-center gap-1 font-bold"
              onClick={() => window.location.href = "https://www.leagueoflegends.com/en-gb/"}
            />
          </div>
        </div>
      </div>

      <h1 className="hero-heading absolute right-5 bottom-5 text-black">
        Riot
        <br />
        Games
      </h1>
    </div>
  );
};
