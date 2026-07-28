import { ArrowLeft, Check, GraduationCap, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { NotesInput } from "../components/NotesInput";
import {
  campusesBySchool,
  clothingOptions,
  gownColorOptions,
  makeupOptions,
  pricing,
  pricingContent,
  propOptions,
  schools,
  serviceAreas,
  serviceTypesByArea,
  shootPoints,
  type Language,
  type ServiceAreaId,
  type ServiceTypeId
} from "../data/siteContent";

type NoteSection = "campus" | "spots" | "props" | "makeup";

type SectionNotes = Record<NoteSection, string[]>;

type PricingPageProps = {
  language: Language;
  onNavigateHome: () => void;
};

const emptySectionNotes: SectionNotes = {
  campus: [],
  spots: [],
  props: [],
  makeup: []
};

export function PricingPage({ language, onNavigateHome }: PricingPageProps) {
  const [selectedAreaId, setSelectedAreaId] = useState<ServiceAreaId | "">("");
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState<ServiceTypeId | "">("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [selectedCampusId, setSelectedCampusId] = useState("");
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);
  const [selectedProps, setSelectedProps] = useState<string[]>([]);
  const [selectedClothingId, setSelectedClothingId] = useState("");
  const [selectedGownColorId, setSelectedGownColorId] = useState("");
  const [selectedMakeup, setSelectedMakeup] = useState<string[]>([]);
  const [sectionNotes, setSectionNotes] = useState<SectionNotes>(emptySectionNotes);

  const selectedArea = useMemo(
    () => serviceAreas.find((area) => area.id === selectedAreaId),
    [selectedAreaId]
  );

  const availableServiceTypes = selectedAreaId ? serviceTypesByArea[selectedAreaId] : [];

  const selectedSchool = useMemo(
    () => schools.find((school) => school.id === selectedSchoolId),
    [selectedSchoolId]
  );

  const availableCampuses = selectedSchoolId ? campusesBySchool[selectedSchoolId] ?? [] : [];

  const selectedCampus = useMemo(
    () => availableCampuses.find((campus) => campus.id === selectedCampusId),
    [availableCampuses, selectedCampusId]
  );

  const showServiceTypes = Boolean(selectedAreaId);
  const showSchoolSelect = selectedAreaId === "melbourne" && selectedServiceTypeId === "graduation";
  const showCampusSelect = showSchoolSelect && Boolean(selectedSchool);
  const showPhotoSpots = showCampusSelect && Boolean(selectedCampus);
  const propsTotal = selectedProps.length * pricing.propPriceAud;
  const clothingTotal =
    clothingOptions.find((option) => option.id === selectedClothingId)?.priceAud ?? 0;
  const makeupTotal = selectedMakeup.reduce((sum, makeupId) => {
    const makeup = makeupOptions.find((option) => option.id === makeupId);
    return sum + (makeup?.priceAud ?? 0);
  }, 0);
  const totalPrice =
    selectedPoints.length * pricing.graduationSpotPriceAud +
    propsTotal +
    clothingTotal +
    makeupTotal;

  const selectArea = (areaId: ServiceAreaId) => {
    setSelectedAreaId(areaId);
    setSelectedServiceTypeId("");
    setSelectedSchoolId("");
    setSelectedCampusId("");
    setSelectedPoints([]);
    setSelectedProps([]);
    setSelectedClothingId("");
    setSelectedGownColorId("");
    setSelectedMakeup([]);
    setSectionNotes(emptySectionNotes);
  };

  const selectServiceType = (serviceTypeId: ServiceTypeId) => {
    setSelectedServiceTypeId(serviceTypeId);
    setSelectedSchoolId("");
    setSelectedCampusId("");
    setSelectedPoints([]);
    setSelectedProps([]);
    setSelectedClothingId("");
    setSelectedGownColorId("");
    setSelectedMakeup([]);
    setSectionNotes(emptySectionNotes);
  };

  const selectSchool = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    setSelectedCampusId("");
    setSelectedPoints([]);
    setSelectedProps([]);
    setSelectedClothingId("");
    setSelectedGownColorId("");
    setSelectedMakeup([]);
    setSectionNotes(emptySectionNotes);
  };

  const selectCampus = (campusId: string) => {
    setSelectedCampusId(campusId);
    setSelectedPoints([]);
    setSelectedProps([]);
    setSelectedClothingId("");
    setSelectedGownColorId("");
    setSelectedMakeup([]);
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      spots: [],
      props: [],
      makeup: []
    }));
  };

  const togglePoint = (point: string) => {
    setSelectedPoints((currentPoints) =>
      currentPoints.includes(point)
        ? currentPoints.filter((currentPoint) => currentPoint !== point)
        : [...currentPoints, point]
    );
  };

  const toggleProp = (propId: string) => {
    setSelectedProps((currentProps) =>
      currentProps.includes(propId)
        ? currentProps.filter((currentProp) => currentProp !== propId)
        : [...currentProps, propId]
    );
  };

  const toggleMakeup = (makeupId: string) => {
    setSelectedMakeup((currentMakeup) =>
      currentMakeup.includes(makeupId)
        ? currentMakeup.filter((currentOption) => currentOption !== makeupId)
        : [...currentMakeup, makeupId]
    );
  };

  const selectClothing = (clothingId: string) => {
    const nextClothingId = selectedClothingId === clothingId ? "" : clothingId;

    setSelectedClothingId(nextClothingId);
    if (!nextClothingId) {
      setSelectedGownColorId("");
    }
  };

  const updateNotes = (section: NoteSection, notes: string[]) => {
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      [section]: notes
    }));
  };

  return (
    <section className="pricing-page">
      <aside className="floating-total" aria-live="polite">
        <span>{pricingContent.estimatedTotal[language]}</span>
        <strong>{totalPrice} AUD</strong>
      </aside>

      <div className="pricing-hero">
        <button className="back-button" type="button" onClick={onNavigateHome}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span>{pricingContent.backHome[language]}</span>
        </button>
        <h1>{pricingContent.title[language]}</h1>
        <p>{pricingContent.intro[language]}</p>
      </div>

      <div className="pricing-layout flow-layout">
        <section className="pricing-panel selector-panel" aria-labelledby="area-title">
          <div className="panel-title">
            <MapPin size={24} aria-hidden="true" />
            <div>
              <p>Step 01</p>
              <h2 id="area-title">{pricingContent.areaLabel[language]}</h2>
            </div>
          </div>

          <div className="option-grid two-options">
            {serviceAreas.map((area) => (
              <button
                className={selectedAreaId === area.id ? "choice-button is-selected" : "choice-button"}
                type="button"
                key={area.id}
                onClick={() => selectArea(area.id)}
                aria-pressed={selectedAreaId === area.id}
              >
                <span>{area.name[language]}</span>
              </button>
            ))}
          </div>
        </section>

        {showServiceTypes && (
          <section className="pricing-panel selector-panel" aria-labelledby="service-type-title">
            <div className="panel-title">
              <GraduationCap size={24} aria-hidden="true" />
              <div>
                <p>Step 02</p>
                <h2 id="service-type-title">{pricingContent.serviceTypeLabel[language]}</h2>
              </div>
            </div>

            {availableServiceTypes.length === 0 ? (
              <div className="empty-state">{pricingContent.shanghaiEmpty[language]}</div>
            ) : (
              <div className="option-grid service-options">
                {availableServiceTypes.map((serviceType) => (
                  <button
                    className={
                      selectedServiceTypeId === serviceType.id
                        ? "choice-button service-choice is-selected"
                        : "choice-button service-choice"
                    }
                    type="button"
                    key={serviceType.id}
                    onClick={() => selectServiceType(serviceType.id)}
                    aria-pressed={selectedServiceTypeId === serviceType.id}
                    disabled={!serviceType.isAvailable}
                  >
                    <span>{serviceType.name[language]}</span>
                    <small>
                      {serviceType.isAvailable
                        ? pricingContent.availableNow[language]
                        : pricingContent.comingSoon[language]}
                    </small>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {showSchoolSelect && (
          <section className="pricing-panel selector-panel" aria-labelledby="school-title">
            <div className="panel-title">
              <GraduationCap size={24} aria-hidden="true" />
              <div>
                <p>Step 03</p>
                <h2 id="school-title">{pricingContent.schoolLabel[language]}</h2>
              </div>
            </div>

            <label className="field-label" htmlFor="school-select">
              {pricingContent.schoolLabel[language]}
            </label>
            <select
              id="school-select"
              value={selectedSchoolId}
              onChange={(event) => selectSchool(event.target.value)}
            >
              <option value="">{pricingContent.schoolPlaceholder[language]}</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name[language]}
                </option>
              ))}
            </select>
          </section>
        )}

        {showCampusSelect && selectedSchool && (
          <section className="pricing-panel selector-panel" aria-labelledby="campus-title">
            <div className="panel-title">
              <MapPin size={24} aria-hidden="true" />
              <div>
                <p>Step 04</p>
                <h2 id="campus-title">{pricingContent.campusLabel[language]}</h2>
              </div>
            </div>

            <label className="field-label" htmlFor="campus-select">
              {pricingContent.campusLabel[language]}
            </label>
            <select
              id="campus-select"
              value={selectedCampusId}
              onChange={(event) => selectCampus(event.target.value)}
            >
              <option value="">{pricingContent.campusPlaceholder[language]}</option>
              {availableCampuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name[language]}
                </option>
              ))}
            </select>

            <NotesInput
              idPrefix="campus"
              language={language}
              notes={sectionNotes.campus}
              onChange={(notes) => updateNotes("campus", notes)}
            />
          </section>
        )}

        {showPhotoSpots && selectedSchool && selectedCampus && (
          <>
            <section className="pricing-panel graduation-panel" aria-labelledby="photo-spots-title">
              <div className="panel-title compact-title">
                <div>
                  <p>Step 05</p>
                  <h2 id="photo-spots-title">{pricingContent.pointsLabel[language]}</h2>
                </div>
              </div>

              <div className="spot-heading">
                <div>
                  <p>
                    <MapPin size={16} aria-hidden="true" />
                    {selectedArea?.name[language]} · {selectedSchool.name[language]} ·{" "}
                    {selectedCampus.name[language]}
                  </p>
                </div>
                <strong>
                  {pricingContent.selectedPrefix[language]} {selectedPoints.length}{" "}
                  {pricingContent.selectedSuffix[language]}
                </strong>
              </div>

              <p className="price-note">{pricingContent.perPoint[language]}</p>

              <div className="spot-grid" aria-label={pricingContent.pointsLabel[language]}>
                {shootPoints.map((point) => {
                  const isSelected = selectedPoints.includes(point);

                  return (
                    <button
                      className={isSelected ? "spot-button is-selected" : "spot-button"}
                      type="button"
                      key={point}
                      onClick={() => togglePoint(point)}
                      aria-pressed={isSelected}
                    >
                      {isSelected && <Check size={16} aria-hidden="true" />}
                      <span>{point}</span>
                    </button>
                  );
                })}
              </div>

              <NotesInput
                idPrefix="spots"
                language={language}
                notes={sectionNotes.spots}
                onChange={(notes) => updateNotes("spots", notes)}
              />
            </section>

            <section className="pricing-panel selector-panel" aria-labelledby="props-title">
              <div className="panel-title compact-title">
                <div>
                  <p>Step 06</p>
                  <h2 id="props-title">{pricingContent.propsLabel[language]}</h2>
                </div>
              </div>

              <p className="price-note">{pricingContent.propsPriceNote[language]}</p>

              <div className="option-grid addon-options">
                {propOptions.map((prop) => (
                  <button
                    className={selectedProps.includes(prop.id) ? "choice-button is-selected" : "choice-button"}
                    type="button"
                    key={prop.id}
                    onClick={() => toggleProp(prop.id)}
                    aria-pressed={selectedProps.includes(prop.id)}
                  >
                    <span>{prop.name[language]}</span>
                    <small>{prop.priceAud} AUD</small>
                  </button>
                ))}
              </div>

              <NotesInput
                idPrefix="props"
                language={language}
                notes={sectionNotes.props}
                onChange={(notes) => updateNotes("props", notes)}
              />
            </section>

            <section className="pricing-panel selector-panel" aria-labelledby="clothing-title">
              <div className="panel-title compact-title">
                <div>
                  <p>Step 07</p>
                  <h2 id="clothing-title">{pricingContent.clothingLabel[language]}</h2>
                </div>
              </div>

              <div className="option-grid addon-options">
                {clothingOptions.map((clothing) => (
                  <button
                    className={
                      selectedClothingId === clothing.id ? "choice-button is-selected" : "choice-button"
                    }
                    type="button"
                    key={clothing.id}
                    onClick={() => selectClothing(clothing.id)}
                    aria-pressed={selectedClothingId === clothing.id}
                  >
                    <span>{clothing.name[language]}</span>
                    <small>{clothing.priceAud} AUD</small>
                  </button>
                ))}
              </div>

              {selectedClothingId === "academic-gown" && (
                <div className="gown-color-field">
                  <label className="field-label" htmlFor="gown-color-select">
                    {pricingContent.gownColorLabel[language]}
                  </label>
                  <select
                    id="gown-color-select"
                    value={selectedGownColorId}
                    onChange={(event) => setSelectedGownColorId(event.target.value)}
                  >
                    <option value="">{pricingContent.gownColorPlaceholder[language]}</option>
                    {gownColorOptions.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name[language]}
                      </option>
                    ))}
                  </select>
                  <p className="helper-note">{pricingContent.gownColorNote[language]}</p>
                </div>
              )}
            </section>

            <section className="pricing-panel selector-panel" aria-labelledby="makeup-title">
              <div className="panel-title compact-title">
                <div>
                  <p>Step 08</p>
                  <h2 id="makeup-title">{pricingContent.makeupLabel[language]}</h2>
                </div>
              </div>
              <p className="price-note">{pricingContent.makeupPriceNote[language]}</p>
              <div className="option-grid addon-options">
                {makeupOptions.map((makeup) => (
                  <button
                    className={
                      selectedMakeup.includes(makeup.id) ? "choice-button is-selected" : "choice-button"
                    }
                    type="button"
                    key={makeup.id}
                    onClick={() => toggleMakeup(makeup.id)}
                    aria-pressed={selectedMakeup.includes(makeup.id)}
                  >
                    <span>{makeup.name[language]}</span>
                    <small>{makeup.priceAud} AUD</small>
                  </button>
                ))}
              </div>

              <NotesInput
                idPrefix="makeup"
                language={language}
                notes={sectionNotes.makeup}
                onChange={(notes) => updateNotes("makeup", notes)}
              />
            </section>
          </>
        )}
      </div>
    </section>
  );
}
