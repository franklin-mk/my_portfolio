import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { CursorGlow, ScrollProgress, scrollToId } from "./components/ui";
import type { CreativeTab } from "./data";
import { Analytics } from "@vercel/analytics/react";
import { ParticleNetwork } from "./components/ParticleNetwork";

// Lazy-load below-the-fold sections & secondary views
const Services = lazy(() => import("./components/Services"));
const Creatives = lazy(() => import("./components/Creatives"));
const Projects = lazy(() => import("./components/Projects"));
const Blog = lazy(() => import("./components/Blog"));
const BlogPage = lazy(() => import("./components/BlogPage"));
const About = lazy(() => import("./components/About"));
const Pricing = lazy(() => import("./components/Pricing"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const WhatsAppModal = lazy(() => import("./components/WhatsAppModal"));
const Footer = lazy(() =>
  import("./components/Footer").then((module) => ({ default: module.Footer }))
);

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

  // Waits for the lazy Creatives chunk to mount before scrolling on slower connections
  const showCreatives = useCallback((f: CreativeTab) => {
    setCreativeFilter(f);
    const attemptScroll = (tries = 0) => {
      if (document.getElementById("creatives")) {
        scrollToId("creatives");
      } else if (tries < 10) {
        setTimeout(() => attemptScroll(tries + 1), 50);
      }
    };
    attemptScroll();
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-white">
      <div aria-hidden /* className="bg-dots pointer-events-none fixed inset-0" */ />
      <CursorGlow />
      <ParticleNetwork/>
      <ScrollProgress />
      <div className="relative">
        {route.page === "blog" ? (
          <Suspense fallback={<div className="min-h-screen" />}>
            <BlogPage articleId={route.id} />
          </Suspense>
        ) : (
          <>
            <Navbar onCreative={showCreatives} />
            <main>
              <Hero onBook={() => setBookOpen(true)} />
              <Suspense fallback={null}>
                <Services />
                <Creatives filter={creativeFilter} onFilter={setCreativeFilter} />
                <Projects />
                <Blog />
                <About />
                <Pricing />
                <Testimonials />
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer
                onCreative={showCreatives}
                onBook={() => setBookOpen(true)}
              />
            </Suspense>
          </>
        )}
      </div>

      {bookOpen && (
        <Suspense fallback={null}>
          <WhatsAppModal open={bookOpen} onClose={closeBook} />
        </Suspense>
      )}

      <WhatsAppFloat />
      <Analytics />
    </div>
  );
}