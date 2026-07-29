import {
  ArrowLeft,
  Camera,
  Gift,
  GraduationCap,
  Heart,
  MapPin,
  Shirt,
  Sparkles,
  type LucideIcon
} from "lucide-react";
import { useMemo, useState } from "react";
import { NotesInput } from "../components/NotesInput";
import {
  graduationAddOns,
  graduationPackages,
  graduationSchools,
  graduationStudioPackage,
  graduationStudioProps,
  idPhotoAddOns,
  idPhotoPackage,
  pricingContent,
  registryAddOns,
  registryPackages,
  sceneTypesBySchool,
  serviceAreas,
  serviceTypesByArea,
  type AddOnGroupId,
  type GraduationAddOn,
  type IdPhotoAddOn,
  type IdPhotoAddOnGroupId,
  type Language,
  type RegistryAddOn,
  type RegistryAddOnGroupId,
  type SceneTypeId,
  type ServiceAreaId,
  type ServiceTypeId
} from "../data/siteContent";

type AddOnNoteSection = AddOnGroupId | RegistryAddOnGroupId | IdPhotoAddOnGroupId;
type AddOnOption = GraduationAddOn | RegistryAddOn | IdPhotoAddOn;
type NoteSection = "schoolScene" | "package" | "registryExtraLocations" | AddOnNoteSection;

type SectionNotes = Record<NoteSection, string[]>;

type PricingPageProps = {
  language: Language;
  onNavigateHome: () => void;
};

const emptySectionNotes: SectionNotes = {
  schoolScene: [],
  package: [],
  clothing: [],
  props: [],
  makeup: [],
  registryExtraLocations: [],
  registryStyling: [],
  registryProps: [],
  registryClothing: [],
  idPhotoStyling: [],
  idPhotoProps: []
};

function formatAud(price: number) {
  return `${price} AUD`;
}

export function PricingPage({ language, onNavigateHome }: PricingPageProps) {
  const [selectedAreaId, setSelectedAreaId] = useState<ServiceAreaId | "">("");
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState<ServiceTypeId | "">("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [selectedSceneTypeId, setSelectedSceneTypeId] = useState<SceneTypeId | "">("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [sectionNotes, setSectionNotes] = useState<SectionNotes>(emptySectionNotes);

  const availableServiceTypes = selectedAreaId ? serviceTypesByArea[selectedAreaId] : [];

  const selectedSchool = useMemo(
    () => graduationSchools.find((school) => school.id === selectedSchoolId),
    [selectedSchoolId]
  );

  const availableSceneTypes = selectedSchoolId
    ? sceneTypesBySchool[selectedSchoolId as keyof typeof sceneTypesBySchool] ?? []
    : [];

  const selectedSceneType = useMemo(
    () => availableSceneTypes.find((sceneType) => sceneType.id === selectedSceneTypeId),
    [availableSceneTypes, selectedSceneTypeId]
  );

  const availablePackages = selectedSceneTypeId
    ? graduationPackages[selectedSceneTypeId as SceneTypeId] ?? []
    : [];

  const selectedPackage = useMemo(
    () => availablePackages.find((graduationPackage) => graduationPackage.id === selectedPackageId),
    [availablePackages, selectedPackageId]
  );

  const selectedRegistryPackage = useMemo(
    () => registryPackages.find((registryPackage) => registryPackage.id === selectedPackageId),
    [selectedPackageId]
  );

  const allAddOns = useMemo(
    () => [
      ...Object.values(graduationAddOns).flat(),
      ...graduationStudioProps,
      ...Object.values(registryAddOns).flat(),
      ...Object.values(idPhotoAddOns).flat()
    ],
    []
  );

  const availablePropsAddOns = useMemo(
    () => {
      if (selectedSceneTypeId === "graduation-studio") {
        return graduationStudioProps;
      }

      return selectedSchoolId === "monash" || selectedSchoolId === "rmit"
        ? graduationAddOns.props.filter((addOn) => addOn.id !== "academic-scroll")
        : graduationAddOns.props;
    },
    [selectedSceneTypeId, selectedSchoolId]
  );

  const selectedAddOnsTotal = selectedAddOnIds.reduce((sum, addOnId) => {
    const addOn = allAddOns.find((option) => option.id === addOnId);
    return sum + (addOn?.priceAud ?? 0);
  }, 0);

  const isGraduationService = selectedAreaId === "melbourne" && selectedServiceTypeId === "graduation";
  const isRegistryService = selectedAreaId === "melbourne" && selectedServiceTypeId === "registry-wedding";
  const isIdPhotoService = selectedAreaId === "melbourne" && selectedServiceTypeId === "id-photo";
  const isStudioGraduation = isGraduationService && selectedSceneTypeId === "graduation-studio";
  const registryExtraLocationsTotal = isRegistryService ? sectionNotes.registryExtraLocations.length * 100 : 0;
  const graduationBasePrice = isStudioGraduation
    ? graduationStudioPackage.priceAud
    : selectedPackage?.priceAud ?? 0;
  const totalPrice = isRegistryService
    ? (selectedRegistryPackage?.priceAud ?? 0) + selectedAddOnsTotal + registryExtraLocationsTotal
    : isIdPhotoService
      ? idPhotoPackage.priceAud + selectedAddOnsTotal
    : graduationBasePrice + selectedAddOnsTotal;
  const showServiceTypes = Boolean(selectedAreaId);
  const showSchoolSelect = isGraduationService;
  const showSceneTypes = isGraduationService && Boolean(selectedSchool);
  const showGraduationPackages = isGraduationService && Boolean(selectedSceneType) && !isStudioGraduation;
  const showRegistryPackages = isRegistryService;
  const showIdPhotoPackage = isIdPhotoService;
  const showAddOns = isRegistryService
    ? Boolean(selectedRegistryPackage)
    : isIdPhotoService || isStudioGraduation || Boolean(selectedPackage);
  const hasConfirmedTotal = isRegistryService
    ? Boolean(selectedRegistryPackage)
    : isIdPhotoService || isStudioGraduation || Boolean(selectedPackage);
  const addOnsStepLabel = isRegistryService
    ? "Step 05-07"
    : isIdPhotoService
      ? "Step 04-05"
      : isStudioGraduation
        ? "Step 06-07"
        : "Step 06-08";
  const totalDisplay = hasConfirmedTotal
    ? formatAud(totalPrice)
    : pricingContent.choosePackageTotal[language];

  const clearGraduationSelections = () => {
    setSelectedSchoolId("");
    setSelectedSceneTypeId("");
    setSelectedPackageId("");
    setSelectedAddOnIds([]);
    setSectionNotes(emptySectionNotes);
  };

  const selectArea = (areaId: ServiceAreaId) => {
    setSelectedAreaId(areaId);
    setSelectedServiceTypeId("");
    clearGraduationSelections();
  };

  const selectServiceType = (serviceTypeId: ServiceTypeId) => {
    setSelectedServiceTypeId(serviceTypeId);
    clearGraduationSelections();
  };

  const selectSchool = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    setSelectedSceneTypeId("");
    setSelectedPackageId("");
    setSelectedAddOnIds([]);
    setSectionNotes(emptySectionNotes);
  };

  const selectSceneType = (sceneTypeId: SceneTypeId) => {
    setSelectedSceneTypeId(sceneTypeId);
    setSelectedPackageId("");
    setSelectedAddOnIds([]);
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      package: [],
      clothing: [],
      props: [],
      makeup: []
    }));
  };

  const selectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      package: []
    }));
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOnIds((currentAddOns) =>
      currentAddOns.includes(addOnId)
        ? currentAddOns.filter((currentAddOn) => currentAddOn !== addOnId)
        : [...currentAddOns, addOnId]
    );
  };

  const updateNotes = (section: NoteSection, notes: string[]) => {
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      [section]: notes
    }));
  };

  const renderAddOnSection = (
    section: AddOnNoteSection,
    title: string,
    stepLabel: string,
    Icon: LucideIcon,
    options: AddOnOption[]
  ) => (
    <section className="pricing-panel selector-panel" aria-labelledby={`${section}-title`}>
      <div className="panel-title compact-title">
        <Icon size={24} aria-hidden="true" />
        <div>
          <p>{stepLabel}</p>
          <h2 id={`${section}-title`}>{title}</h2>
        </div>
      </div>

      <div className="option-grid addon-options">
        {options.map((addOn) => {
          const isSelected = selectedAddOnIds.includes(addOn.id);

          return (
            <button
              className={isSelected ? "choice-button addon-choice is-selected" : "choice-button addon-choice"}
              type="button"
              key={addOn.id}
              onClick={() => toggleAddOn(addOn.id)}
              aria-pressed={isSelected}
            >
              <span>{addOn.name[language]}</span>
              <strong>{formatAud(addOn.priceAud)}</strong>
              {addOn.description && (
                <small className="addon-description">{addOn.description[language]}</small>
              )}
            </button>
          );
        })}
      </div>

      <NotesInput
        idPrefix={section}
        language={language}
        notes={sectionNotes[section]}
        onChange={(notes) => updateNotes(section, notes)}
      />
    </section>
  );

  return (
    <section className="pricing-page">
      <aside className="floating-total" aria-live="polite">
        <span>{pricingContent.estimatedTotal[language]}</span>
        <strong className={hasConfirmedTotal ? undefined : "floating-total-status"}>
          {totalDisplay}
        </strong>
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
              {graduationSchools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name[language]}
                </option>
              ))}
            </select>
          </section>
        )}

        {showSceneTypes && (
          <section className="pricing-panel selector-panel" aria-labelledby="scene-type-title">
            <div className="panel-title">
              <Camera size={24} aria-hidden="true" />
              <div>
                <p>Step 04</p>
                <h2 id="scene-type-title">{pricingContent.sceneTypeLabel[language]}</h2>
              </div>
            </div>

            <div className="option-grid scene-options">
              {availableSceneTypes.map((sceneType) => (
                <button
                  className={
                    selectedSceneTypeId === sceneType.id
                      ? "choice-button scene-choice is-selected"
                      : "choice-button scene-choice"
                  }
                  type="button"
                  key={sceneType.id}
                  onClick={() => selectSceneType(sceneType.id)}
                  aria-pressed={selectedSceneTypeId === sceneType.id}
                >
                  <span>{sceneType.name[language]}</span>
                  <small>{sceneType.description[language]}</small>
                </button>
              ))}
            </div>

            <NotesInput
              idPrefix="school-scene"
              language={language}
              notes={sectionNotes.schoolScene}
              onChange={(notes) => updateNotes("schoolScene", notes)}
            />
          </section>
        )}

        {isStudioGraduation && (
          <section className="pricing-panel selector-panel" aria-labelledby="studio-package-title">
            <div className="panel-title compact-title">
              <Camera size={24} aria-hidden="true" />
              <div>
                <p>Step 05</p>
                <h2 id="studio-package-title">{graduationStudioPackage.title[language]}</h2>
              </div>
            </div>

            <div className="option-grid package-options">
              <div className="choice-button package-choice is-selected">
                <span>{graduationStudioPackage.title[language]}</span>
                <strong className="package-price">{formatAud(graduationStudioPackage.priceAud)}</strong>
                <small>{pricingContent.packageDetailsLabel[language]}</small>
                {graduationStudioPackage.details[language].map((detail) => (
                  <span className="package-detail" key={detail}>
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {showGraduationPackages && selectedSceneType && (
          <section className="pricing-panel selector-panel" aria-labelledby="package-title">
            <div className="panel-title compact-title">
              <GraduationCap size={24} aria-hidden="true" />
              <div>
                <p>Step 05</p>
                <h2 id="package-title">{pricingContent.packageLabel[language]}</h2>
              </div>
            </div>

            <p className="selection-context">{selectedSceneType.name[language]}</p>
            <p className="selection-context">{pricingContent.packageSpotNote[language]}</p>

            <div className="option-grid package-options">
              {availablePackages.map((graduationPackage) => {
                const isSelected = selectedPackageId === graduationPackage.id;

                return (
                  <button
                    className={
                      isSelected ? "choice-button package-choice is-selected" : "choice-button package-choice"
                    }
                    type="button"
                    key={graduationPackage.id}
                    onClick={() => selectPackage(graduationPackage.id)}
                    aria-pressed={isSelected}
                  >
                    <span>{graduationPackage.name[language]}</span>
                    <strong className="package-price">{formatAud(graduationPackage.priceAud)}</strong>
                    <small>{pricingContent.packageDetailsLabel[language]}</small>
                    {graduationPackage.details[language].map((detail) => (
                      <span className="package-detail" key={detail}>
                        {detail}
                      </span>
                    ))}
                  </button>
                );
              })}
            </div>

            <NotesInput
              idPrefix="package"
              language={language}
              notes={sectionNotes.package}
              onChange={(notes) => updateNotes("package", notes)}
            />
          </section>
        )}

        {showRegistryPackages && (
          <section className="pricing-panel selector-panel" aria-labelledby="registry-package-title">
            <div className="panel-title compact-title">
              <Heart size={24} aria-hidden="true" />
              <div>
                <p>Step 03</p>
                <h2 id="registry-package-title">{pricingContent.registryPackageLabel[language]}</h2>
              </div>
            </div>

            <div className="option-grid package-options">
              {registryPackages.map((registryPackage) => {
                const isSelected = selectedPackageId === registryPackage.id;

                return (
                  <button
                    className={
                      isSelected ? "choice-button package-choice is-selected" : "choice-button package-choice"
                    }
                    type="button"
                    key={registryPackage.id}
                    onClick={() => selectPackage(registryPackage.id)}
                    aria-pressed={isSelected}
                  >
                    <span>{registryPackage.name[language]}</span>
                    <strong className="package-price">{formatAud(registryPackage.priceAud)}</strong>
                    <small>{pricingContent.packageDetailsLabel[language]}</small>
                    {registryPackage.details[language].map((detail) => (
                      <span className="package-detail" key={detail}>
                        {detail}
                      </span>
                    ))}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {showIdPhotoPackage && (
          <section className="pricing-panel selector-panel" aria-labelledby="id-photo-package-title">
            <div className="panel-title compact-title">
              <Camera size={24} aria-hidden="true" />
              <div>
                <p>Step 03</p>
                <h2 id="id-photo-package-title">{idPhotoPackage.title[language]}</h2>
              </div>
            </div>

            <div className="option-grid package-options">
              <div className="choice-button package-choice is-selected">
                <span>{idPhotoPackage.title[language]}</span>
                <strong className="package-price">{formatAud(idPhotoPackage.priceAud)}</strong>
                <small>{pricingContent.packageDetailsLabel[language]}</small>
                {idPhotoPackage.details[language].map((detail) => (
                  <span className="package-detail" key={detail}>
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {isRegistryService && selectedRegistryPackage && (
          <section className="pricing-panel selector-panel" aria-labelledby="registry-extra-locations-title">
            <div className="panel-title compact-title">
              <MapPin size={24} aria-hidden="true" />
              <div>
                <p>Step 04</p>
                <h2 id="registry-extra-locations-title">
                  {pricingContent.registryExtraLocationLabel[language]}
                </h2>
              </div>
            </div>

            <p className="selection-context">{pricingContent.registryExtraLocationIntro[language]}</p>

            <NotesInput
              idPrefix="registry-extra-locations"
              language={language}
              notes={sectionNotes.registryExtraLocations}
              onChange={(notes) => updateNotes("registryExtraLocations", notes)}
              title={pricingContent.registryExtraLocationLabel[language]}
              placeholder={pricingContent.registryExtraLocationPlaceholder[language]}
              addLabel={pricingContent.registryAddLocation[language]}
              helperText={pricingContent.registryExtraLocationIntro[language]}
              maxReachedText={pricingContent.registryExtraLocationMaxReached[language]}
            />
          </section>
        )}

        {showAddOns && (
          <>
            <section className="pricing-panel selector-panel add-on-intro-panel">
              <div className="panel-title compact-title">
                <Sparkles size={24} aria-hidden="true" />
                <div>
                  <p>{addOnsStepLabel}</p>
                  <h2>{pricingContent.addOnsLabel[language]}</h2>
                  <span className="panel-helper-copy">{pricingContent.addOnIntro[language]}</span>
                </div>
              </div>
            </section>

            {isGraduationService && (
              isStudioGraduation ? (
                <>
                  {renderAddOnSection(
                    "makeup",
                    pricingContent.makeupLabel[language],
                    "Step 06",
                    Sparkles,
                    graduationAddOns.makeup
                  )}

                  {renderAddOnSection(
                    "props",
                    pricingContent.propsLabel[language],
                    "Step 07",
                    Gift,
                    availablePropsAddOns
                  )}
                </>
              ) : (
                <>
                  {renderAddOnSection(
                    "clothing",
                    pricingContent.clothingLabel[language],
                    "Step 06",
                    Shirt,
                    graduationAddOns.clothing
                  )}

                  {renderAddOnSection(
                    "props",
                    pricingContent.propsLabel[language],
                    "Step 07",
                    Gift,
                    availablePropsAddOns
                  )}

                  {renderAddOnSection(
                    "makeup",
                    pricingContent.makeupLabel[language],
                    "Step 08",
                    Sparkles,
                    graduationAddOns.makeup
                  )}
                </>
              )
            )}

            {isRegistryService && (
              <>
                {renderAddOnSection(
                  "registryStyling",
                  pricingContent.makeupLabel[language],
                  "Step 05",
                  Sparkles,
                  registryAddOns.registryStyling
                )}

                {renderAddOnSection(
                  "registryProps",
                  pricingContent.propsLabel[language],
                  "Step 06",
                  Gift,
                  registryAddOns.registryProps
                )}

                {renderAddOnSection(
                  "registryClothing",
                  pricingContent.clothingLabel[language],
                  "Step 07",
                  Shirt,
                  registryAddOns.registryClothing
                )}
              </>
            )}

            {isIdPhotoService && (
              <>
                {renderAddOnSection(
                  "idPhotoStyling",
                  pricingContent.makeupLabel[language],
                  "Step 04",
                  Sparkles,
                  idPhotoAddOns.idPhotoStyling
                )}

                {renderAddOnSection(
                  "idPhotoProps",
                  pricingContent.propsLabel[language],
                  "Step 05",
                  Gift,
                  idPhotoAddOns.idPhotoProps
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
