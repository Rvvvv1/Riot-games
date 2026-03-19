import { AboutPage } from "./components/About";
import { HeroPage } from "./components/Hero";
import NavBarPage from "./components/Navbar";
import Featurespage from "./components/Features";
import FloatingImage from "./components/Story";
import ContactPage from "./components/Contact";
import FooterPage from "./components/Footer";

function App() {
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
