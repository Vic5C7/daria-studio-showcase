import { useEffect, useMemo, useState } from "react";
import type { Language } from "./data/siteContent";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { readSavedLanguage, saveLanguage } from "./utils/language";

type Route = "home" | "pricing";

function getRouteFromPathname(pathname: string): Route {
  return pathname.startsWith("/pricing") ? "pricing" : "home";
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
      const path = nextRoute === "pricing" ? "/pricing" : "/";
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
