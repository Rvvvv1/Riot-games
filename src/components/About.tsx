import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

export const AboutPage = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    gsap.from("#intro .intro-animate", {
      y: 18,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: "#intro",
        start: "top 70%",
      },
    });
  });

  return (
    <div id="intro" className="min-h-screen w-screen">
      <div className="relative mt-36 mb-8 flex flex-col items-center gap-5">
        <AnimatedTitle
          title="什么是《英雄联盟》？"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="intro-animate font-robert-regular mt-5 max-w-3xl text-center text-xl leading-10 uppercase md:text-[1.25rem]">
          《英雄联盟》是一款团队策略游戏，两支由五名强大英雄组成的队伍展开对决，目标是摧毁对方的基地。从超过140位英雄中选择你的角色，施展精彩操作，击杀敌人，摧毁防御塔，一路披荆斩棘，最终赢得胜利。
        </div>

        <div className="intro-animate about-subtext">
          <p>League of Legends</p>
          <p className="text-gray-500">
            A 5v5 MOBA where teams battle to destroy the enemy Nexus
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt=""
            className="absolute top-0 left-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
