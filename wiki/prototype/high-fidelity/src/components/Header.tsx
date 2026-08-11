import {
  Camera,
  ChevronDown,
  Images,
  Languages,
  LayoutDashboard,
  LogIn,
  LogOut,
  UserRound,
  Users
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AuthUser } from "../data/auth";
import { brand, navigation, type Language } from "../data/siteContent";

type HeaderRoute = "home" | "pricing" | "auth" | "customers" | "album";

type HeaderProps = {
  language: Language;
  currentRoute: HeaderRoute;
  currentUser: AuthUser | null;
  onNavigate: (route: HeaderRoute) => void;
  onLogout: () => void;
  onToggleLanguage: () => void;
};

function copy(language: Language, zh: string, en: string) {
  return language === "zh" ? zh : en;
}

export function Header({
  language,
  currentRoute,
  currentUser,
  onNavigate,
  onLogout,
  onToggleLanguage
}: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const roleLabel = currentUser?.role === "admin" ? copy(language, "管理员", "Admin") : copy(language, "客户", "Client");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const syncHeaderHeight = () => {
      const height = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--site-header-height", `${height}px`);
    };

    syncHeaderHeight();

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(syncHeaderHeight) : null;
    observer?.observe(header);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const navigateFromMenu = (route: HeaderRoute) => {
    setIsUserMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <button
        className="brand-mark"
        type="button"
        onClick={() => onNavigate("home")}
        aria-label={brand.name[language]}
      >
        <Camera size={20} aria-hidden="true" />
        <span>{brand.name[language]}</span>
      </button>

      <nav className="site-nav" aria-label="Primary">
        <button
          className={currentRoute === "home" ? "nav-button is-active" : "nav-button"}
          type="button"
          onClick={() => onNavigate("home")}
        >
          {navigation.home[language]}
        </button>
        <button
          className={currentRoute === "pricing" ? "nav-button is-active" : "nav-button"}
          type="button"
          onClick={() => onNavigate("pricing")}
        >
          {navigation.pricing[language]}
        </button>
        <button
          className="language-button"
          type="button"
          onClick={onToggleLanguage}
          aria-label={navigation.language[language]}
          title={navigation.language[language]}
        >
          <Languages size={18} aria-hidden="true" />
          <span>{navigation.language[language]}</span>
        </button>
        {currentUser ? (
          <div className="user-session" ref={userMenuRef}>
            <button
              className={isUserMenuOpen ? "user-chip user-chip-button is-open" : "user-chip user-chip-button"}
              type="button"
              onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
            >
              <UserRound size={17} aria-hidden="true" />
              <span>
                {currentUser.email} · {roleLabel}
              </span>
              <ChevronDown size={16} aria-hidden="true" />
            </button>

            {isUserMenuOpen && (
              <div className="user-dropdown" role="menu">
                {currentUser.role === "admin" ? (
                  <>
                    <button type="button" role="menuitem" onClick={() => navigateFromMenu("home")}>
                      <LayoutDashboard size={17} aria-hidden="true" />
                      <span>{copy(language, "管理网站页面", "Manage website")}</span>
                    </button>
                    <button type="button" role="menuitem" onClick={() => navigateFromMenu("customers")}>
                      <Users size={17} aria-hidden="true" />
                      <span>{copy(language, "管理客户", "Manage clients")}</span>
                    </button>
                  </>
                ) : (
                  <button type="button" role="menuitem" onClick={() => navigateFromMenu("album")}>
                    <Images size={17} aria-hidden="true" />
                    <span>{copy(language, "我的相册", "My album")}</span>
                  </button>
                )}
              </div>
            )}

            <button
              className="logout-button"
              type="button"
              onClick={onLogout}
              aria-label={copy(language, "退出登录", "Log out")}
              title={copy(language, "退出登录", "Log out")}
            >
              <LogOut size={17} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            className={
              currentRoute === "auth"
                ? "auth-button auth-button-primary is-active"
                : "auth-button auth-button-primary"
            }
            type="button"
            onClick={() => onNavigate("auth")}
            aria-label={`${navigation.login[language]} / ${navigation.register[language]}`}
          >
            <LogIn size={17} aria-hidden="true" />
            <span>
              {navigation.login[language]} / {navigation.register[language]}
            </span>
          </button>
        )}
      </nav>
    </header>
  );
}
