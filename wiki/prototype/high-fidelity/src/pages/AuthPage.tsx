import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { findDemoAccount, type AuthUser } from "../data/auth";
import { authContent, brand, type Language } from "../data/siteContent";

type AuthMode = "login" | "register";

type AuthPageProps = {
  language: Language;
  onLogin: (user: AuthUser) => void;
};

export function AuthPage({ language, onLogin }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [error, setError] = useState("");
  const isLogin = mode === "login";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (isLogin) {
      const account = findDemoAccount(email, password);

      if (!account) {
        setError(language === "zh" ? "账号或密码错误。" : "Incorrect email or password.");
        return;
      }

      setError("");
      onLogin(account);
      return;
    }

    if (!email || !password) {
      setError(language === "zh" ? "请输入邮箱和密码。" : "Enter an email and password.");
      return;
    }

    setError("");
    onLogin({ email, role: "client" });
  };

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <section className="auth-panel" aria-labelledby="auth-panel-title">
          <div className="auth-tabs" role="tablist" aria-label={`${brand.name[language]} account`}>
            <button
              className={isLogin ? "auth-tab is-active" : "auth-tab"}
              type="button"
              role="tab"
              aria-selected={isLogin}
              onClick={() => setMode("login")}
            >
              {authContent.loginTab[language]}
            </button>
            <button
              className={!isLogin ? "auth-tab is-active" : "auth-tab"}
              type="button"
              role="tab"
              aria-selected={!isLogin}
              onClick={() => setMode("register")}
            >
              {authContent.registerTab[language]}
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2 id="auth-panel-title">
              {isLogin ? authContent.loginTab[language] : authContent.registerTab[language]}
            </h2>
            {error && <p className="auth-error">{error}</p>}

            {!isLogin && (
              <label className="auth-field">
                <span>{authContent.nameLabel[language]}</span>
                <span className="auth-input-wrap">
                  <UserRound size={18} aria-hidden="true" />
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={authContent.namePlaceholder[language]}
                  />
                </span>
              </label>
            )}

            <label className="auth-field">
              <span>{authContent.emailLabel[language]}</span>
              <span className="auth-input-wrap">
                <Mail size={18} aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={authContent.emailPlaceholder[language]}
                />
              </span>
            </label>

            <label className="auth-field">
              <span>{authContent.passwordLabel[language]}</span>
              <span className="auth-input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />
                <input
                  type="password"
                  name="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder={authContent.passwordPlaceholder[language]}
                />
              </span>
            </label>

            {isLogin && (
              <div className="auth-row">
                <label className="auth-check">
                  <input type="checkbox" name="remember" />
                  <span>{authContent.remember[language]}</span>
                </label>
                <button className="auth-link" type="button">
                  {authContent.forgotPassword[language]}
                </button>
              </div>
            )}

            <button className="auth-submit" type="submit">
              <span>{isLogin ? authContent.loginSubmit[language] : authContent.registerSubmit[language]}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            <button
              className="auth-switch-button"
              type="button"
              onClick={() => setMode(isLogin ? "register" : "login")}
            >
              {isLogin ? authContent.switchToRegister[language] : authContent.switchToLogin[language]}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
