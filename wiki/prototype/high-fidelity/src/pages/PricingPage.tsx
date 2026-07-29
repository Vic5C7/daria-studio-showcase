import {
  ArrowLeft,
  Camera,
  Gift,
  GraduationCap,
  MapPin,
  Minus,
  Plus,
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
  pricingContent,
  registryAddOns,
  registryPackages,
  sceneTypesBySchool,
  serviceAreas,
  serviceTypesByArea,
  studioBackgroundTemplates,
  type AddOnGroupId,
  type GraduationAddOn,
  type GraduationSchoolId,
  type Language,
  type RegistryAddOn,
  type RegistryAddOnGroupId,
  type SceneTypeId,
  type ServiceAreaId,
  type ServiceTypeId,
  type ServiceTypeStatus
} from "../data/siteContent";

type NoteSection =
  | "schoolScene"
  | "package"
  | "clothing"
  | "props"
  | "makeup"
  | "studio"
  | "studioBackground"
  | "registryPackage"
  | "registryLocations"
  | "registryStyling"
  | "registryProps"
  | "registryWardrobe"
  | "pendingService";

type SectionNotes = Record<NoteSection, string[]>;
type AddOnOption = GraduationAddOn | RegistryAddOn;

type PricingPageProps = {
  language: Language;
  onNavigateHome: () => void;
};

function createEmptySectionNotes(): SectionNotes {
  return {
    schoolScene: [],
    package: [],
    clothing: [],
    props: [],
    makeup: [],
    studio: [],
    studioBackground: [],
    registryPackage: [],
    registryLocations: [],
    registryStyling: [],
    registryProps: [],
    registryWardrobe: [],
    pendingService: []
  };
}

function formatAud(price: number) {
  return `${price} AUD`;
}

function getServiceStatusLabel(status: ServiceTypeStatus, language: Language) {
  if (status === "available") {
    return pricingContent.availableNow[language];
  }

  if (status === "detailsPending") {
    return pricingContent.detailsPending[language];
  }

  return pricingContent.comingSoon[language];
}

export function PricingPage({ language, onNavigateHome }: PricingPageProps) {
  const [selectedAreaId, setSelectedAreaId] = useState<ServiceAreaId | "">("");
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState<ServiceTypeId | "">("");
  const [selectedSchoolId, setSelectedSchoolId] = useState<GraduationSchoolId | "">("");
  const [selectedSceneTypeId, setSelectedSceneTypeId] = useState<SceneTypeId | "">("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [selectedGraduationAddOnIds, setSelectedGraduationAddOnIds] = useState<string[]>([]);
  const [selectedStudioBackgroundId, setSelectedStudioBackgroundId] = useState("");
  const [selectedRegistryPackageId, setSelectedRegistryPackageId] = useState("");
  const [registryExtraLocationCount, setRegistryExtraLocationCount] = useState(0);
  const [selectedRegistryAddOnIds, setSelectedRegistryAddOnIds] = useState<string[]>([]);
  const [sectionNotes, setSectionNotes] = useState<SectionNotes>(() => createEmptySectionNotes());

  const availableServiceTypes = selectedAreaId ? serviceTypesByArea[selectedAreaId] : [];

  const selectedServiceType = useMemo(
    () => availableServiceTypes.find((serviceType) => serviceType.id === selectedServiceTypeId),
    [availableServiceTypes, selectedServiceTypeId]
  );

  const selectedSchool = useMemo(
    () => graduationSchools.find((school) => school.id === selectedSchoolId),
    [selectedSchoolId]
  );

  const availableSceneTypes = selectedSchoolId ? sceneTypesBySchool[selectedSchoolId] : [];

  const selectedSceneType = useMemo(
    () => availableSceneTypes.find((sceneType) => sceneType.id === selectedSceneTypeId),
    [availableSceneTypes, selectedSceneTypeId]
  );

  const availablePackages = selectedSceneTypeId ? graduationPackages[selectedSceneTypeId] ?? [] : [];

  const selectedPackage = useMemo(
    () => availablePackages.find((graduationPackage) => graduationPackage.id === selectedPackageId),
    [availablePackages, selectedPackageId]
  );

  const allGraduationAddOns = useMemo(() => Object.values(graduationAddOns).flat(), []);
  const allRegistryAddOns = useMemo(() => Object.values(registryAddOns).flat(), []);

  const selectedGraduationAddOnsTotal = selectedGraduationAddOnIds.reduce((sum, addOnId) => {
    const addOn = allGraduationAddOns.find((option) => option.id === addOnId);
    return sum + (addOn?.priceAud ?? 0);
  }, 0);

  const selectedRegistryPackage = useMemo(
    () => registryPackages.find((registryPackage) => registryPackage.id === selectedRegistryPackageId),
    [selectedRegistryPackageId]
  );

  const selectedRegistryAddOns = selectedRegistryAddOnIds
    .map((addOnId) => allRegistryAddOns.find((option) => option.id === addOnId))
    .filter((addOn): addOn is RegistryAddOn => Boolean(addOn));

  const selectedRegistryAddOnsTotal = selectedRegistryAddOns.reduce(
    (sum, addOn) => sum + addOn.priceAud,
    0
  );

  const graduationTotalPrice = (selectedPackage?.priceAud ?? 0) + selectedGraduationAddOnsTotal;
  const registryTotalPrice =
    (selectedRegistryPackage?.priceAud ?? 0) +
    registryExtraLocationCount * 100 +
    selectedRegistryAddOnsTotal;
  const registryRetouchedTotal = selectedRegistryPackage
    ? selectedRegistryPackage.retouchedPhotos +
      registryExtraLocationCount * 4 +
      selectedRegistryAddOns.reduce((sum, addOn) => sum + (addOn.retouchedBonus ?? 0), 0)
    : 0;

  const showServiceTypes = Boolean(selectedAreaId);
  const isGraduationService = selectedAreaId === "melbourne" && selectedServiceTypeId === "graduation";
  const isRegistryService = selectedAreaId === "melbourne" && selectedServiceTypeId === "registry-wedding";
  const isDetailsPendingService = selectedServiceType?.status === "detailsPending";
  const showSchoolSelect = isGraduationService;
  const showSceneTypes = Boolean(selectedSchool);
  const showPackages = Boolean(selectedSceneType);
  const showStudioBackground = selectedSceneTypeId === "graduation-studio" && Boolean(selectedPackage);
  const showGraduationAddOns = Boolean(selectedPackage);
  const showRegistryLocations = Boolean(selectedRegistryPackage);
  const showRegistryAddOns = Boolean(selectedRegistryPackage);
  const hasConfirmedTotal =
    (isGraduationService && Boolean(selectedPackage)) ||
    (isRegistryService && Boolean(selectedRegistryPackage));

  const totalDisplay = isDetailsPendingService
    ? pricingContent.detailsPendingTotal[language]
    : isRegistryService
      ? selectedRegistryPackage
        ? formatAud(registryTotalPrice)
        : pricingContent.choosePackageTotal[language]
      : isGraduationService && selectedPackage
        ? formatAud(graduationTotalPrice)
        : pricingContent.choosePackageTotal[language];

  const graduationAddOnGroups: AddOnGroupId[] =
    selectedSceneTypeId === "graduation-studio" ? ["studio"] : ["clothing", "props", "makeup"];

  const graduationAddOnMeta: Record<AddOnGroupId, { title: string; stepLabel: string; Icon: LucideIcon }> = {
    clothing: {
      title: pricingContent.clothingLabel[language],
      stepLabel: "Step 06",
      Icon: Shirt
    },
    props: {
      title: pricingContent.propsLabel[language],
      stepLabel: "Step 07",
      Icon: Gift
    },
    makeup: {
      title: pricingContent.makeupLabel[language],
      stepLabel: "Step 08",
      Icon: Sparkles
    },
    studio: {
      title: pricingContent.studioAddOnsLabel[language],
      stepLabel: "Step 07",
      Icon: Sparkles
    }
  };

  const registryAddOnMeta: Record<
    RegistryAddOnGroupId,
    { title: string; stepLabel: string; Icon: LucideIcon; noteSection: NoteSection }
  > = {
    styling: {
      title: pricingContent.registryStylingLabel[language],
      stepLabel: "Step 05",
      Icon: Sparkles,
      noteSection: "registryStyling"
    },
    "registry-props": {
      title: pricingContent.registryPropsLabel[language],
      stepLabel: "Step 06",
      Icon: Gift,
      noteSection: "registryProps"
    },
    wardrobe: {
      title: pricingContent.registryWardrobeLabel[language],
      stepLabel: "Step 07",
      Icon: Shirt,
      noteSection: "registryWardrobe"
    }
  };

  const clearFlowSelections = () => {
    setSelectedSchoolId("");
    setSelectedSceneTypeId("");
    setSelectedPackageId("");
    setSelectedGraduationAddOnIds([]);
    setSelectedStudioBackgroundId("");
    setSelectedRegistryPackageId("");
    setRegistryExtraLocationCount(0);
    setSelectedRegistryAddOnIds([]);
    setSectionNotes(createEmptySectionNotes());
  };

  const selectArea = (areaId: ServiceAreaId) => {
    setSelectedAreaId(areaId);
    setSelectedServiceTypeId("");
    clearFlowSelections();
  };

  const selectServiceType = (serviceTypeId: ServiceTypeId) => {
    setSelectedServiceTypeId(serviceTypeId);
    clearFlowSelections();
  };

  const selectSchool = (schoolId: GraduationSchoolId | "") => {
    setSelectedSchoolId(schoolId);
    setSelectedSceneTypeId("");
    setSelectedPackageId("");
    setSelectedGraduationAddOnIds([]);
    setSelectedStudioBackgroundId("");
    setSectionNotes(createEmptySectionNotes());
  };

  const selectSceneType = (sceneTypeId: SceneTypeId) => {
    setSelectedSceneTypeId(sceneTypeId);
    setSelectedPackageId("");
    setSelectedGraduationAddOnIds([]);
    setSelectedStudioBackgroundId(
      sceneTypeId === "graduation-studio" ? studioBackgroundTemplates[0]?.id ?? "" : ""
    );
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      package: [],
      clothing: [],
      props: [],
      makeup: [],
      studio: [],
      studioBackground: []
    }));
  };

  const selectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      package: []
    }));
  };

  const selectRegistryPackage = (packageId: string) => {
    setSelectedRegistryPackageId(packageId);
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      registryPackage: []
    }));
  };

  const toggleGraduationAddOn = (addOnId: string) => {
    setSelectedGraduationAddOnIds((currentAddOns) =>
      currentAddOns.includes(addOnId)
        ? currentAddOns.filter((currentAddOn) => currentAddOn !== addOnId)
        : [...currentAddOns, addOnId]
    );
  };

  const toggleRegistryAddOn = (addOnId: string) => {
    setSelectedRegistryAddOnIds((currentAddOns) =>
      currentAddOns.includes(addOnId)
        ? currentAddOns.filter((currentAddOn) => currentAddOn !== addOnId)
        : [...currentAddOns, addOnId]
    );
  };

  const adjustRegistryExtraLocations = (delta: number) => {
    setRegistryExtraLocationCount((currentCount) => Math.min(4, Math.max(0, currentCount + delta)));
  };

  const updateNotes = (section: NoteSection, notes: string[]) => {
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      [section]: notes
    }));
  };

  const getAvailableGraduationAddOns = (section: AddOnGroupId) =>
    graduationAddOns[section].filter((addOn) => {
      if (addOn.availableSchoolIds && (!selectedSchoolId || !addOn.availableSchoolIds.includes(selectedSchoolId))) {
        return false;
      }

      if (
        addOn.availableSceneTypeIds &&
        (!selectedSceneTypeId || !addOn.availableSceneTypeIds.includes(selectedSceneTypeId))
      ) {
        return false;
      }

      return true;
    });

  const renderAddOnSection = (
    section: NoteSection,
    title: string,
    stepLabel: string,
    Icon: LucideIcon,
    options: AddOnOption[],
    selectedAddOnIds: string[],
    onToggle: (addOnId: string) => void
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
              onClick={() => onToggle(addOn.id)}
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
                {availableServiceTypes.map((serviceType) => {
                  const isSelected = selectedServiceTypeId === serviceType.id;
                  const isSelectable = serviceType.status !== "comingSoon";

                  return (
                    <button
                      className={
                        isSelected
                          ? "choice-button service-choice is-selected"
                          : "choice-button service-choice"
                      }
                      type="button"
                      key={serviceType.id}
                      onClick={() => selectServiceType(serviceType.id)}
                      aria-pressed={isSelected}
                      disabled={!isSelectable}
                    >
                      <span>{serviceType.name[language]}</span>
                      <small>{getServiceStatusLabel(serviceType.status, language)}</small>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {isDetailsPendingService && selectedServiceType && (
          <section className="pricing-panel selector-panel" aria-labelledby="details-pending-title">
            <div className="panel-title compact-title">
              <Camera size={24} aria-hidden="true" />
              <div>
                <p>Step 03</p>
                <h2 id="details-pending-title">{pricingContent.detailsPendingTitle[language]}</h2>
              </div>
            </div>

            <div className="empty-state pending-state">
              <strong>{selectedServiceType.name[language]}</strong>
              <span>{pricingContent.idPhotoPendingCopy[language]}</span>
            </div>

            <NotesInput
              idPrefix="pending-service"
              language={language}
              notes={sectionNotes.pendingService}
              onChange={(notes) => updateNotes("pendingService", notes)}
            />
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
              onChange={(event) => selectSchool(event.target.value as GraduationSchoolId | "")}
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

        {showPackages && selectedSceneType && (
          <section className="pricing-panel selector-panel" aria-labelledby="package-title">
            <div className="panel-title compact-title">
              <GraduationCap size={24} aria-hidden="true" />
              <div>
                <p>Step 05</p>
                <h2 id="package-title">{pricingContent.packageLabel[language]}</h2>
              </div>
            </div>

            <p className="selection-context">{selectedSceneType.name[language]}</p>

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

            {selectedSceneTypeId !== "graduation-studio" && (
              <div className="guidance-box">
                <strong>{pricingContent.photoSpotGuidanceTitle[language]}</strong>
                <span>{pricingContent.photoSpotGuidanceCopy[language]}</span>
              </div>
            )}

            <NotesInput
              idPrefix="package"
              language={language}
              notes={sectionNotes.package}
              onChange={(notes) => updateNotes("package", notes)}
            />
          </section>
        )}

        {showStudioBackground && (
          <section className="pricing-panel selector-panel" aria-labelledby="studio-background-title">
            <div className="panel-title compact-title">
              <Camera size={24} aria-hidden="true" />
              <div>
                <p>Step 06</p>
                <h2 id="studio-background-title">{pricingContent.studioBackgroundLabel[language]}</h2>
              </div>
            </div>

            <div className="option-grid background-options">
              {studioBackgroundTemplates.map((template) => {
                const isSelected = selectedStudioBackgroundId === template.id;

                return (
                  <button
                    className={
                      isSelected
                        ? "choice-button background-choice is-selected"
                        : "choice-button background-choice"
                    }
                    type="button"
                    key={template.id}
                    onClick={() => setSelectedStudioBackgroundId(template.id)}
                    aria-pressed={isSelected}
                  >
                    <span>{template.name[language]}</span>
                    <small>{template.description[language]}</small>
                  </button>
                );
              })}
            </div>

            <NotesInput
              idPrefix="studio-background"
              language={language}
              notes={sectionNotes.studioBackground}
              onChange={(notes) => updateNotes("studioBackground", notes)}
            />
          </section>
        )}

        {showGraduationAddOns && (
          <>
            <section className="pricing-panel selector-panel add-on-intro-panel">
              <div className="panel-title compact-title">
                <Sparkles size={24} aria-hidden="true" />
                <div>
                  <p>{selectedSceneTypeId === "graduation-studio" ? "Step 07" : "Step 06-08"}</p>
                  <h2>{pricingContent.addOnsLabel[language]}</h2>
                  <span className="panel-helper-copy">{pricingContent.addOnIntro[language]}</span>
                </div>
              </div>
            </section>

            {graduationAddOnGroups.map((group) => {
              const meta = graduationAddOnMeta[group];

              return renderAddOnSection(
                group,
                meta.title,
                meta.stepLabel,
                meta.Icon,
                getAvailableGraduationAddOns(group),
                selectedGraduationAddOnIds,
                toggleGraduationAddOn
              );
            })}
          </>
        )}

        {isRegistryService && (
          <>
            <section className="pricing-panel selector-panel" aria-labelledby="registry-package-title">
              <div className="panel-title compact-title">
                <Camera size={24} aria-hidden="true" />
                <div>
                  <p>Step 03</p>
                  <h2 id="registry-package-title">{pricingContent.registryPackageLabel[language]}</h2>
                </div>
              </div>

              <div className="option-grid package-options registry-package-options">
                {registryPackages.map((registryPackage) => {
                  const isSelected = selectedRegistryPackageId === registryPackage.id;

                  return (
                    <button
                      className={
                        isSelected ? "choice-button package-choice is-selected" : "choice-button package-choice"
                      }
                      type="button"
                      key={registryPackage.id}
                      onClick={() => selectRegistryPackage(registryPackage.id)}
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

              <NotesInput
                idPrefix="registry-package"
                language={language}
                notes={sectionNotes.registryPackage}
                onChange={(notes) => updateNotes("registryPackage", notes)}
              />
            </section>

            {showRegistryLocations && selectedRegistryPackage && (
              <section className="pricing-panel selector-panel" aria-labelledby="registry-locations-title">
                <div className="panel-title compact-title">
                  <MapPin size={24} aria-hidden="true" />
                  <div>
                    <p>Step 04</p>
                    <h2 id="registry-locations-title">{pricingContent.registryLocationsLabel[language]}</h2>
                    <span className="panel-helper-copy">
                      {pricingContent.registryExtraLocationsIntro[language]}
                    </span>
                  </div>
                </div>

                <div className="location-summary">
                  <div>
                    <span>{pricingContent.includedLocationsLabel[language]}</span>
                    <strong>{selectedRegistryPackage.includedExtraLocations}</strong>
                  </div>
                  <div>
                    <span>{pricingContent.paidExtraLocationsLabel[language]}</span>
                    <strong>{registryExtraLocationCount}</strong>
                  </div>
                </div>

                <div className="counter-control">
                  <button
                    className="counter-button"
                    type="button"
                    onClick={() => adjustRegistryExtraLocations(-1)}
                    disabled={registryExtraLocationCount === 0}
                    aria-label={pricingContent.decreaseExtraLocation[language]}
                    title={pricingContent.decreaseExtraLocation[language]}
                  >
                    <Minus size={18} aria-hidden="true" />
                  </button>
                  <div className="counter-value">
                    <strong>{registryExtraLocationCount}</strong>
                    <span>{pricingContent.extraLocationUnit[language]}</span>
                  </div>
                  <button
                    className="counter-button"
                    type="button"
                    onClick={() => adjustRegistryExtraLocations(1)}
                    aria-label={pricingContent.increaseExtraLocation[language]}
                    title={pricingContent.increaseExtraLocation[language]}
                  >
                    <Plus size={18} aria-hidden="true" />
                  </button>
                </div>

                <div className="total-strip registry-retouch-summary">
                  <span>{pricingContent.retouchedPhotosLabel[language]}</span>
                  <strong>
                    {registryRetouchedTotal} {pricingContent.retouchedPhotoUnit[language]}
                  </strong>
                </div>

                <NotesInput
                  idPrefix="registry-locations"
                  language={language}
                  notes={sectionNotes.registryLocations}
                  onChange={(notes) => updateNotes("registryLocations", notes)}
                />
              </section>
            )}

            {showRegistryAddOns && (
              <>
                <section className="pricing-panel selector-panel add-on-intro-panel">
                  <div className="panel-title compact-title">
                    <Sparkles size={24} aria-hidden="true" />
                    <div>
                      <p>Step 05-07</p>
                      <h2>{pricingContent.registryAddOnsLabel[language]}</h2>
                      <span className="panel-helper-copy">{pricingContent.addOnIntro[language]}</span>
                    </div>
                  </div>
                </section>

                {(Object.keys(registryAddOns) as RegistryAddOnGroupId[]).map((group) => {
                  const meta = registryAddOnMeta[group];

                  return renderAddOnSection(
                    meta.noteSection,
                    meta.title,
                    meta.stepLabel,
                    meta.Icon,
                    registryAddOns[group],
                    selectedRegistryAddOnIds,
                    toggleRegistryAddOn
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
