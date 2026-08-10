import { ArrowLeft, Images, Search, WandSparkles } from "lucide-react";
import { useState } from "react";
import type { ClientAlbum } from "../data/clientAlbums";
import type { Language } from "../data/siteContent";

type CustomerListPageProps = {
  language: Language;
  customers: ClientAlbum[];
  onNavigateHome: () => void;
  onOpenAlbum: (clientId: string) => void;
};

function copy(language: Language, zh: string, en: string) {
  return language === "zh" ? zh : en;
}

export function CustomerListPage({
  language,
  customers,
  onNavigateHome,
  onOpenAlbum
}: CustomerListPageProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCustomers = customers.filter((customer) => {
    if (!normalizedQuery) {
      return true;
    }

    return [
      customer.clientName,
      customer.email,
      customer.phone,
      customer.shootTitle,
      customer.shootDate
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  return (
    <section className="customers-page">
      <div className="workspace-toolbar">
        <button className="back-button" type="button" onClick={onNavigateHome}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span>{copy(language, "返回网站页面", "Back to website")}</span>
        </button>
      </div>

      <div className="workspace-hero">
        <p>{copy(language, "后台客户", "Client admin")}</p>
        <h1>{copy(language, "管理客户", "Manage clients")}</h1>
      </div>

      <label className="customer-search-field">
        <span>{copy(language, "关键词搜索", "Keyword search")}</span>
        <span className="customer-search-input">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy(language, "搜索姓名、邮箱、手机号或拍摄项目", "Search name, email, phone, or shoot")}
          />
        </span>
      </label>

      {filteredCustomers.length === 0 ? (
        <div className="empty-state">{copy(language, "没有匹配的客户。", "No matching clients.")}</div>
      ) : (
        <div className="customer-card-grid">
          {filteredCustomers.map((customer) => {
            const requestedCount = customer.rawPhotos.filter((photo) => photo.retouchRequested).length;
            const retouchedCount = customer.rawPhotos.filter((photo) => photo.retouchedPhoto).length;

            return (
              <button
                className="customer-card"
                type="button"
                key={customer.id}
                onClick={() => onOpenAlbum(customer.id)}
              >
                <span className="customer-card-main">
                  <strong>{customer.clientName}</strong>
                  <span>{customer.email}</span>
                  <small>{customer.shootTitle}</small>
                </span>
                <span className="customer-card-meta">
                  <span>{customer.shootDate}</span>
                  <span>{customer.phone}</span>
                </span>
                <span className="customer-card-stats">
                  <span>
                    <Images size={17} aria-hidden="true" />
                    {customer.rawPhotos.length} {copy(language, "张底片", "raw")}
                  </span>
                  <span>
                    <WandSparkles size={17} aria-hidden="true" />
                    {requestedCount}/{customer.retouchQuota} {copy(language, "精修申请", "requests")}
                  </span>
                  <span>{retouchedCount} {copy(language, "已精修", "retouched")}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
