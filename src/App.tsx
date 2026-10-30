import { useCallback, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Creatives from "./components/Creatives";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import BlogPage from "./components/BlogPage";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import WhatsAppModal from "./components/WhatsAppModal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { Footer } from "./components/Footer";
import { ScrollProgress, scrollToId } from "./components/ui";
import type { CreativeTab } from "./data";

type Route = { page: "home" } | { page: "blog"; id: string | null };

function readRoute(): Route {
  const h = window.location.hash;
  if (!h.startsWith("#/blog")) return { page: "home" };
  const id = h.split("/")[2];
  return { page: "blog", id: id ? id : null };
}

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute);
  const [bookOpen, setBookOpen] = useState(false);
  const [creativeFilter, setCreativeFilter] = useState<CreativeTab>("All");

  const closeBook = useCallback(() => setBookOpen(false), []);

  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Every page change starts at the top
  const routeKey = route.page === "blog" ? `blog:${route.id}` : "home";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routeKey]);

  const showCreatives = useCallback((f: CreativeTab) => {
    setCreativeFilter(f);
    setTimeout(() => scrollToId("creatives"), 40);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-white">
      <div aria-hidden className="bg-dots pointer-events-none fixed inset-0" />
      <ScrollProgress />
      <div className="relative">
        {route.page === "blog" ? (
          <BlogPage articleId={route.id} />
        ) : (
          <>
            <Navbar onCreative={showCreatives} />
            <main>
              <Hero onBook={() => setBookOpen(true)} />
              <Services />
              <Creatives filter={creativeFilter} onFilter={setCreativeFilter} />
              <Projects />
              <Blog />
              <About />
              <Pricing />
              <Testimonials />
              <Contact />
            </main>
            
            <Footer onCreative={showCreatives} onBook={() => setBookOpen(true)} />
            
          </>
        )}
      </div>
      {/* <WhatsAppFab /> */}
      <WhatsAppModal open={bookOpen} onClose={closeBook} />
      <WhatsAppFloat />
      <Analytics />
    </div>
  );
}
