import { Camera, Languages } from "lucide-react";
import { brand, navigation, type Language } from "../data/siteContent";

type HeaderProps = {
  language: Language;
  currentRoute: "home" | "pricing";
  onNavigate: (route: "home" | "pricing") => void;
  onToggleLanguage: () => void;
};

export function Header({ language, currentRoute, onNavigate, onToggleLanguage }: HeaderProps) {
  return (
    <header className="site-header">
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
      </nav>
    </header>
  );
}
