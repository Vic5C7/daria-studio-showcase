import { useEffect, useMemo, useState } from "react";
import type { Language } from "./data/siteContent";
import { Header } from "./components/Header";
import { AuthPage } from "./pages/AuthPage";
import { ClientAlbumPage } from "./pages/ClientAlbumPage";
import { CustomerListPage } from "./pages/CustomerListPage";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { clearAuthUser, readSavedAuthUser, saveAuthUser, type AuthUser } from "./data/auth";
import {
  createDefaultClientAlbums,
  makeAlbumIdFromEmail,
  type ClientAlbum
} from "./data/clientAlbums";
import {
  readSavedEditableContent,
  saveEditableContent,
  type EditableSiteContent
} from "./data/editableContent";
import { readSavedLanguage, saveLanguage } from "./utils/language";

type Route = "home" | "pricing" | "auth" | "customers" | "album";

const basePath = import.meta.env.BASE_URL;
const usesHashRouting = basePath !== "/";

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
  const pathInsideBase = getPathInsideBase(pathname);

  if (pathInsideBase.startsWith("/pricing")) {
    return "pricing";
  }

  if (pathInsideBase.startsWith("/auth")) {
    return "auth";
  }

  if (pathInsideBase.startsWith("/customers")) {
    return "customers";
  }

  if (pathInsideBase.startsWith("/album")) {
    return "album";
  }

  return "home";
}

function getRouteFromLocation(location: Location): Route {
  if (location.hash === "#/pricing") {
    return "pricing";
  }

  if (location.hash === "#/auth") {
    return "auth";
  }

  if (location.hash === "#/customers") {
    return "customers";
  }

  if (location.hash === "#/album") {
    return "album";
  }

  return getRouteFromPathname(location.pathname);
}

function getPathForRoute(route: Route) {
  if (usesHashRouting) {
    if (route === "pricing") {
      return `${basePath}#/pricing`;
    }

    if (route === "customers") {
      return `${basePath}#/customers`;
    }

    if (route === "album") {
      return `${basePath}#/album`;
    }

    return route === "auth" ? `${basePath}#/auth` : basePath;
  }

  if (route === "pricing") {
    return `${basePath}pricing`;
  }

  if (route === "customers") {
    return `${basePath}customers`;
  }

  if (route === "album") {
    return `${basePath}album`;
  }

  return route === "auth" ? `${basePath}auth` : basePath;
}

export function App() {
  const [language, setLanguage] = useState<Language>(() => readSavedLanguage());
  const [route, setRoute] = useState<Route>(() => getRouteFromLocation(window.location));
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => readSavedAuthUser());
  const [editableContent, setEditableContent] = useState<EditableSiteContent>(() =>
    readSavedEditableContent()
  );
  const [clientAlbums, setClientAlbums] = useState<ClientAlbum[]>(() => createDefaultClientAlbums());
  const [selectedAlbumClientId, setSelectedAlbumClientId] = useState("");
  const isAdmin = currentUser?.role === "admin";
  const activeAlbum =
    currentUser?.role === "client"
      ? clientAlbums.find(
          (album) => album.id === makeAlbumIdFromEmail(currentUser.email) || album.email === currentUser.email
        ) ?? clientAlbums[0]
      : clientAlbums.find((album) => album.id === selectedAlbumClientId) ?? clientAlbums[0];

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  useEffect(() => {
    saveEditableContent(editableContent);
  }, [editableContent]);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(getRouteFromLocation(window.location));
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
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

  const login = (user: AuthUser) => {
    saveAuthUser(user);
    setCurrentUser(user);
    navigate("home");
  };

  const logout = () => {
    clearAuthUser();
    setCurrentUser(null);
    setSelectedAlbumClientId("");
  };

  const openCustomerAlbum = (clientId: string) => {
    setSelectedAlbumClientId(clientId);
    navigate("album");
  };

  const updateAlbum = (nextAlbum: ClientAlbum) => {
    setClientAlbums((currentAlbums) =>
      currentAlbums.map((album) => (album.id === nextAlbum.id ? nextAlbum : album))
    );
  };

  return (
    <div className="site-shell">
      <Header
        language={language}
        currentRoute={route}
        currentUser={currentUser}
        onNavigate={navigate}
        onLogout={logout}
        onToggleLanguage={toggleLanguage}
      />
      <main>
        {route === "auth" ? (
          <AuthPage language={language} onLogin={login} />
        ) : route === "customers" && isAdmin ? (
          <CustomerListPage
            language={language}
            customers={clientAlbums}
            onNavigateHome={() => navigate("home")}
            onOpenAlbum={openCustomerAlbum}
          />
        ) : route === "album" && currentUser && activeAlbum ? (
          <ClientAlbumPage
            language={language}
            album={activeAlbum}
            isAdmin={isAdmin}
            onBack={() => navigate(isAdmin ? "customers" : "home")}
            onChange={updateAlbum}
          />
        ) : route === "pricing" ? (
          <PricingPage
            language={language}
            content={editableContent.pricing}
            isAdmin={isAdmin}
            onChange={(pricingContent) =>
              setEditableContent((currentContent) => ({
                ...currentContent,
                pricing: pricingContent
              }))
            }
            onNavigateHome={() => navigate("home")}
          />
        ) : (
          <HomePage
            language={language}
            content={editableContent.gallery}
            isAdmin={isAdmin}
            onChange={(galleryContent) =>
              setEditableContent((currentContent) => ({
                ...currentContent,
                gallery: galleryContent
              }))
            }
            onNavigatePricing={() => navigate("pricing")}
          />
        )}
      </main>
    </div>
  );
}
