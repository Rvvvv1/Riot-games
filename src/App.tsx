import { useEffect, useState } from "react";
import { AboutPage } from "./components/About";
import { HeroPage } from "./components/Hero";
import NavBarPage from "./components/Navbar";
import Featurespage from "./components/Features";
import FloatingImage from "./components/Story";
import ContactPage from "./components/Contact";
import FooterPage from "./components/Footer";
import { Loading } from "./components/Loading";

const withTimeout = <T,>(promise: Promise<T>, ms: number) =>
  new Promise<T>((resolve, reject) => {
    const id = window.setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (v) => {
        window.clearTimeout(id);
        resolve(v);
      },
      (e) => {
        window.clearTimeout(id);
        reject(e);
      },
    );
  });

const preloadImage = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`image failed: ${src}`));
    img.src = src;
  });

const preloadVideo = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    const cleanup = () => {
      video.onloadeddata = null;
      video.onerror = null;
    };
    video.onloadeddata = () => {
      cleanup();
      resolve();
    };
    video.onerror = () => {
      cleanup();
      reject(new Error(`video failed: ${src}`));
    };
    video.src = src;
    video.load();
  });

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const images = [
      "/img/entrance.webp",
      "/img/contact-2.webp",
      "/img/gallery-4.webp",
      "/img/gallery-2.webp",
      "/img/about.webp",
    ];

    const heroVideos = Array.from({ length: 6 }, (_, i) => `/videos/hero-${i + 1}.mp4`);
    const featureVideos = Array.from({ length: 5 }, (_, i) => `/videos/feature-${i + 1}.mp4`);

    const fontReady =
      "fonts" in document ? (document as unknown as { fonts: FontFaceSet }).fonts.ready : Promise.resolve();

    const tasks = [
      ...images.map((s) => withTimeout(preloadImage(s), 20000)),
      ...heroVideos.map((s) => withTimeout(preloadVideo(s), 30000)),
      ...featureVideos.map((s) => withTimeout(preloadVideo(s), 30000)),
      withTimeout(fontReady.then(() => undefined), 20000),
    ];

    Promise.allSettled(tasks).then(() => {
      if (cancelled) return;
      setAppReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!appReady) return <Loading />;

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBarPage />
      <HeroPage />
      <AboutPage />
      <Featurespage />
      <FloatingImage />
      <ContactPage />
      <FooterPage />
    </main>
  );
}

export default App;
