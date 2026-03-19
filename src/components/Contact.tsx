import { Mail } from "lucide-react";
import AnimatedTitle from "./AnimatedTitle";

interface ImageClipBoxProps {
  src: string;
  clipClass: string;
  alt?: string;
}

const ImageClipBox = ({ src, clipClass, alt = "" }: ImageClipBoxProps) => (
  <div className={clipClass}>
    <img src={src} alt={alt} />
  </div>
);

const ContactPage = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute top-0 -left-20 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-1"
            alt="Contact image 1"
          />
          <ImageClipBox
            src="/img/gallery-4.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            alt="Contact image 2"
          />
        </div>

        <div className="absolute -top-40 left-20 hidden w-60 sm:block sm:top-1/2 md:right-10 md:left-auto lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/gallery-2.webp"
            clipClass="sword-man-clip-path md:scale-125"
            alt="Gallery image"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="font-general mb-10 text-[10px] uppercase">
            BiN Lee 作品集 使用技术
          </p>

          <AnimatedTitle
            title="Vite <br /> React<br /> GSAP <br /> TailwindCSS <br />"
            containerClass="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <button
            id="contact-me"
            className="group relative z-10 mt-10 flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white px-7 py-3 text-black"
          >
            <div className="mr-2 flex items-center">
              <Mail className="h-4 w-4" />
            </div>

            <span className="font-general relative inline-flex items-center overflow-hidden text-xs">
              <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                rvvvvv1998@gmail.com
              </div>
              <div className="absolute translate-y-[170%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                rvvvvv1998@gmail.com
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
