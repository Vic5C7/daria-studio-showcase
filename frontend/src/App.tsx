import { useEffect, useMemo, useState } from "react";
import type { Language } from "./data/siteContent";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { readSavedLanguage, saveLanguage } from "./utils/language";

type Route = "home" | "pricing";

const basePath = import.meta.env.BASE_URL;

function getPathInsideBase(pathname: string) {
  if (basePath === "/") {
    return pathname;
  }

  const normalizedBasePath = basePath.endsWith("/") ? basePath : `${basePath}/`;

  if (pathname === normalizedBasePath.slice(0, -1)) {
    return "/";
  }

  if (pathname.startsWith(normalizedBasePath)) {
    return `/${pathname.slice(normalizedBasePath.length)}`;
  }

  return pathname;
}

function getRouteFromPathname(pathname: string): Route {
  return getPathInsideBase(pathname).startsWith("/pricing") ? "pricing" : "home";
}

function getPathForRoute(route: Route) {
  return route === "pricing" ? `${basePath}pricing` : basePath;
}

export function App() {
  const [language, setLanguage] = useState<Language>(() => readSavedLanguage());
  const [route, setRoute] = useState<Route>(() => getRouteFromPathname(window.location.pathname));

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPathname(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useMemo(
    () => (nextRoute: Route) => {
      const path = getPathForRoute(nextRoute);
      window.history.pushState({}, "", path);
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === "zh" ? "en" : "zh"));
  };

  return (
    <div className="site-shell">
      <Header
        language={language}
        currentRoute={route}
        onNavigate={navigate}
        onToggleLanguage={toggleLanguage}
      />
      <main>
        {route === "pricing" ? (
          <PricingPage language={language} onNavigateHome={() => navigate("home")} />
        ) : (
          <HomePage language={language} onNavigatePricing={() => navigate("pricing")} />
        )}
      </main>
    </div>
  );
}
