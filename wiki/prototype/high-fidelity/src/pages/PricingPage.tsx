import {
  Aperture,
  ArrowLeft,
  BadgePlus,
  Gift,
  HeartHandshake,
  Images,
  ListChecks,
  MapPinPlus,
  MapPinned,
  PackageCheck,
  Pencil,
  Plus,
  ScanFace,
  School,
  Shirt,
  Trash2,
  WandSparkles,
  type LucideIcon
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NotesInput } from "../components/NotesInput";
import {
  PricingEditor,
  type AddOnTarget,
  type PackageScope,
  type PricingEditorTab
} from "../components/PricingEditor";
import type { EditablePricingContent } from "../data/editableContent";
import {
  pricingContent,
  type AddOnGroupId,
  type GalleryImage,
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
type PricingFlowSectionKey =
  | "areas"
  | "services"
  | "schools"
  | "scenes"
  | "studioPackage"
  | "graduationPackage"
  | "registryPackage"
  | "idPhotoPackage"
  | "registryExtraLocations"
  | "addOnsIntro"
  | AddOnNoteSection;
type PricingFlowSectionInstance = {
  id: string;
  sectionKey: PricingFlowSectionKey;
};

type SectionNotes = Record<NoteSection, string[]>;

type PricingPageProps = {
  language: Language;
  content: EditablePricingContent;
  isAdmin: boolean;
  onChange: (content: EditablePricingContent) => void;
  onNavigateHome: () => void;
};

type PricingEditorContext = {
  visibleTabs?: PricingEditorTab[];
  initialAreaId?: string;
  initialSchoolId?: string;
  initialSceneId?: string;
  initialPackageScope?: PackageScope;
  initialAddOnTarget?: AddOnTarget;
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
  idPhotoClothing: [],
  idPhotoStyling: [],
  idPhotoProps: []
};

const pricingFlowSectionOrder: PricingFlowSectionKey[] = [
  "areas",
  "services",
  "schools",
  "scenes",
  "studioPackage",
  "graduationPackage",
  "registryPackage",
  "idPhotoPackage",
  "registryExtraLocations",
  "addOnsIntro",
  "clothing",
  "props",
  "makeup",
  "registryStyling",
  "registryProps",
  "registryClothing",
  "idPhotoClothing",
  "idPhotoStyling",
  "idPhotoProps"
];

function formatAud(price: number) {
  return `${price} AUD`;
}

function renderOptionPreview(previewImage: GalleryImage, language: Language) {
  return (
    <span className="option-preview">
      <img src={previewImage.src} alt={previewImage.alt[language]} />
    </span>
  );
}

export function PricingPage({ language, content, isAdmin, onChange, onNavigateHome }: PricingPageProps) {
  const [selectedAreaId, setSelectedAreaId] = useState<ServiceAreaId | "">("");
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState<ServiceTypeId | "">("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [selectedSceneTypeId, setSelectedSceneTypeId] = useState<SceneTypeId | "">("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [sectionNotes, setSectionNotes] = useState<SectionNotes>(emptySectionNotes);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorInitialTab, setEditorInitialTab] = useState<PricingEditorTab>("areas");
  const [editorContext, setEditorContext] = useState<PricingEditorContext>({});
  const [hiddenFlowSections, setHiddenFlowSections] = useState<PricingFlowSectionKey[]>([]);
  const [addedFlowSections, setAddedFlowSections] = useState<PricingFlowSectionInstance[]>([]);
  const [isAddSectionMenuOpen, setIsAddSectionMenuOpen] = useState(false);

  const {
    serviceAreas,
    serviceTypesByArea,
    graduationSchools,
    sceneTypesBySchool,
    graduationPackages,
    graduationStudioPackage,
    graduationStudioProps,
    idPhotoAddOns,
    idPhotoPackage,
    registryAddOns,
    registryPackages,
    graduationAddOns
  } = content;

  const availableServiceTypes = selectedAreaId ? serviceTypesByArea[selectedAreaId] ?? [] : [];

  const selectedServiceType = useMemo(
    () => availableServiceTypes.find((serviceType) => serviceType.id === selectedServiceTypeId),
    [availableServiceTypes, selectedServiceTypeId]
  );

  const selectedSchool = useMemo(
    () => graduationSchools.find((school) => school.id === selectedSchoolId),
    [graduationSchools, selectedSchoolId]
  );

  const availableSceneTypes = selectedSchoolId
    ? sceneTypesBySchool[selectedSchoolId] ?? []
    : [];

  const selectedSceneType = useMemo(
    () => availableSceneTypes.find((sceneType) => sceneType.id === selectedSceneTypeId),
    [availableSceneTypes, selectedSceneTypeId]
  );

  const availablePackages = selectedSceneTypeId
    ? graduationPackages[selectedSceneTypeId] ?? []
    : [];

  const selectedPackage = useMemo(
    () => availablePackages.find((graduationPackage) => graduationPackage.id === selectedPackageId),
    [availablePackages, selectedPackageId]
  );

  const selectedRegistryPackage = useMemo(
    () => registryPackages.find((registryPackage) => registryPackage.id === selectedPackageId),
    [registryPackages, selectedPackageId]
  );

  const allAddOns = useMemo(
    () => [
      ...Object.values(graduationAddOns).flat(),
      ...graduationStudioProps,
      ...Object.values(registryAddOns).flat(),
      ...Object.values(idPhotoAddOns).flat()
    ],
    [graduationAddOns, graduationStudioProps, idPhotoAddOns, registryAddOns]
  );

  const availablePropsAddOns = useMemo(
    () => {
      if (selectedSceneTypeId === "graduation-studio") {
        return graduationStudioProps;
      }

      return selectedSchoolId === "monash" || selectedSchoolId === "rmit"
        ? (graduationAddOns.props ?? []).filter((addOn) => addOn.id !== "academic-scroll")
        : graduationAddOns.props ?? [];
    },
    [graduationAddOns.props, graduationStudioProps, selectedSceneTypeId, selectedSchoolId]
  );

  useEffect(() => {
    setSelectedAddOnIds((currentAddOnIds) =>
      currentAddOnIds.filter((addOnId) => allAddOns.some((addOn) => addOn.id === addOnId))
    );
  }, [allAddOns]);

  useEffect(() => {
    if (selectedAreaId && !serviceAreas.some((area) => area.id === selectedAreaId)) {
      setSelectedAreaId("");
      setSelectedServiceTypeId("");
      clearGraduationSelections();
    }
  }, [selectedAreaId, serviceAreas]);

  useEffect(() => {
    if (selectedServiceTypeId && !availableServiceTypes.some((serviceType) => serviceType.id === selectedServiceTypeId)) {
      setSelectedServiceTypeId("");
      clearGraduationSelections();
    }
  }, [availableServiceTypes, selectedServiceTypeId]);

  useEffect(() => {
    if (selectedSchoolId && !graduationSchools.some((school) => school.id === selectedSchoolId)) {
      clearGraduationSelections();
    }
  }, [graduationSchools, selectedSchoolId]);

  useEffect(() => {
    if (selectedSceneTypeId && !availableSceneTypes.some((sceneType) => sceneType.id === selectedSceneTypeId)) {
      setSelectedSceneTypeId("");
      setSelectedPackageId("");
      setSelectedAddOnIds([]);
    }
  }, [availableSceneTypes, selectedSceneTypeId]);

  useEffect(() => {
    const packageStillExists = [
      ...availablePackages,
      ...registryPackages
    ].some((packageOption) => packageOption.id === selectedPackageId);

    if (
      selectedPackageId &&
      !packageStillExists &&
      selectedPackageId !== graduationStudioPackage.title.en &&
      selectedPackageId !== idPhotoPackage.title.en
    ) {
      setSelectedPackageId("");
      setSelectedAddOnIds([]);
    }
  }, [availablePackages, graduationStudioPackage.title.en, idPhotoPackage.title.en, registryPackages, selectedPackageId]);

  const selectedAddOnsTotal = selectedAddOnIds.reduce((sum, addOnId) => {
    const addOn = allAddOns.find((option) => option.id === addOnId);
    return sum + (addOn?.priceAud ?? 0);
  }, 0);

  const selectedServiceKind = selectedServiceType?.kind ?? "other";
  const isGraduationService = selectedServiceKind === "graduation";
  const isRegistryService = selectedServiceKind === "registry";
  const isIdPhotoService = selectedServiceKind === "id-photo";
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
      ? "Step 04"
      : isStudioGraduation
        ? "Step 06"
        : "Step 06-08";
  const formatStepLabel = (stepIndex: number) => `Step ${String(stepIndex).padStart(2, "0")}`;
  const totalDisplay = hasConfirmedTotal
    ? formatAud(totalPrice)
    : pricingContent.choosePackageTotal[language];

  const isFlowSectionVisible = (sectionKey: PricingFlowSectionKey) =>
    !hiddenFlowSections.includes(sectionKey);

  const getFlowSectionLabel = (sectionKey: PricingFlowSectionKey) => {
    switch (sectionKey) {
      case "areas":
        return pricingContent.areaLabel[language];
      case "services":
        return pricingContent.serviceTypeLabel[language];
      case "schools":
        return pricingContent.schoolLabel[language];
      case "scenes":
        return pricingContent.sceneTypeLabel[language];
      case "studioPackage":
        return pricingContent.packageLabel[language];
      case "graduationPackage":
        return pricingContent.packageLabel[language];
      case "registryPackage":
        return pricingContent.registryPackageLabel[language];
      case "idPhotoPackage":
        return pricingContent.packageLabel[language];
      case "registryExtraLocations":
        return pricingContent.registryExtraLocationLabel[language];
      case "addOnsIntro":
        return pricingContent.addOnsLabel[language];
      case "clothing":
      case "registryClothing":
      case "idPhotoClothing":
        return pricingContent.clothingLabel[language];
      case "props":
      case "registryProps":
      case "idPhotoProps":
        return pricingContent.propsLabel[language];
      case "makeup":
      case "registryStyling":
      case "idPhotoStyling":
        return pricingContent.makeupLabel[language];
      default:
        return "流程栏";
    }
  };

  const getFlowSectionMenuLabel = (sectionKey: PricingFlowSectionKey) => {
    switch (sectionKey) {
      case "addOnsIntro":
        return "加购项说明";
      case "clothing":
        return `毕业照 · ${pricingContent.clothingLabel[language]}`;
      case "props":
        return `毕业照 · ${pricingContent.propsLabel[language]}`;
      case "makeup":
        return `毕业照 · ${pricingContent.makeupLabel[language]}`;
      case "registryStyling":
        return `注册结婚 · ${pricingContent.makeupLabel[language]}`;
      case "registryProps":
        return `注册结婚 · ${pricingContent.propsLabel[language]}`;
      case "registryClothing":
        return `注册结婚 · ${pricingContent.clothingLabel[language]}`;
      case "idPhotoClothing":
        return `证件照 · ${pricingContent.clothingLabel[language]}`;
      case "idPhotoStyling":
        return `证件照 · ${pricingContent.makeupLabel[language]}`;
      case "idPhotoProps":
        return `证件照 · ${pricingContent.propsLabel[language]}`;
      default:
        return getFlowSectionLabel(sectionKey);
    }
  };

  const canOfferFlowSection = (sectionKey: PricingFlowSectionKey) => {
    switch (sectionKey) {
      case "areas":
        return true;
      case "services":
        return showServiceTypes;
      case "schools":
        return showSchoolSelect;
      case "scenes":
        return showSceneTypes;
      case "studioPackage":
        return isStudioGraduation;
      case "graduationPackage":
        return showGraduationPackages && Boolean(selectedSceneType);
      case "registryPackage":
        return showRegistryPackages;
      case "idPhotoPackage":
        return showIdPhotoPackage;
      case "registryExtraLocations":
        return isRegistryService && Boolean(selectedRegistryPackage);
      case "addOnsIntro":
        return showAddOns;
      case "clothing":
        return showAddOns && isGraduationService && !isStudioGraduation && (graduationAddOns.clothing ?? []).length > 0;
      case "props":
        return showAddOns && isGraduationService && availablePropsAddOns.length > 0;
      case "makeup":
        return showAddOns && isGraduationService && (graduationAddOns.makeup ?? []).length > 0;
      case "registryStyling":
        return showAddOns && isRegistryService && (registryAddOns.registryStyling ?? []).length > 0;
      case "registryProps":
        return showAddOns && isRegistryService && (registryAddOns.registryProps ?? []).length > 0;
      case "registryClothing":
        return showAddOns && isRegistryService && (registryAddOns.registryClothing ?? []).length > 0;
      case "idPhotoClothing":
        return showAddOns && isIdPhotoService && (idPhotoAddOns.idPhotoClothing ?? []).length > 0;
      case "idPhotoStyling":
        return showAddOns && isIdPhotoService && (idPhotoAddOns.idPhotoStyling ?? []).length > 0;
      case "idPhotoProps":
        return showAddOns && isIdPhotoService && (idPhotoAddOns.idPhotoProps ?? []).length > 0;
      default:
        return false;
    }
  };

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

  const getPackageScopeForCurrentSelection = (): PackageScope => {
    if (isRegistryService) {
      return "registry";
    }

    if (isIdPhotoService) {
      return "idPhoto";
    }

    if (isStudioGraduation) {
      return "studio";
    }

    return "graduation";
  };

  const getAddOnTargetForCurrentSelection = (): AddOnTarget => {
    if (isRegistryService) {
      return "registry";
    }

    if (isIdPhotoService) {
      return "idPhoto";
    }

    return "graduation";
  };

  const getContextForTab = (tab: PricingEditorTab): PricingEditorContext => {
    const context: PricingEditorContext = {
      visibleTabs: [tab]
    };

    if (selectedAreaId) {
      context.initialAreaId = selectedAreaId;
    }

    if (selectedSchoolId) {
      context.initialSchoolId = selectedSchoolId;
    }

    if (selectedSceneTypeId) {
      context.initialSceneId = selectedSceneTypeId;
    }

    if (tab === "packages") {
      context.initialPackageScope = getPackageScopeForCurrentSelection();
    }

    if (tab === "addons") {
      context.initialAddOnTarget = getAddOnTargetForCurrentSelection();
    }

    return context;
  };

  const openPricingEditor = (tab: PricingEditorTab, isContextual = false) => {
    setEditorInitialTab(tab);
    setEditorContext(isContextual ? getContextForTab(tab) : {});
    setIsEditorOpen(true);
  };

  const deleteFlowSection = (sectionKey: PricingFlowSectionKey, instanceId?: string) => {
    const sectionLabel = getFlowSectionLabel(sectionKey);
    const deleteCopy = Boolean(instanceId);
    const shouldDelete = window.confirm(
      deleteCopy
        ? `确定删除新增的「${sectionLabel}」这一栏吗？这不会影响其他同名栏。`
        : `确定删除「${sectionLabel}」这一栏吗？这只会从当前流程隐藏，不会删除后台里的内容。`
    );

    if (!shouldDelete) {
      return;
    }

    if (instanceId) {
      setAddedFlowSections((currentSections) =>
        currentSections.filter((currentSection) => currentSection.id !== instanceId)
      );
      setIsAddSectionMenuOpen(false);
      return;
    }

    setHiddenFlowSections((currentSections) =>
      currentSections.includes(sectionKey) ? currentSections : [...currentSections, sectionKey]
    );
    setIsAddSectionMenuOpen(false);
  };

  const addFlowSection = (sectionKey: PricingFlowSectionKey) => {
    setAddedFlowSections((currentSections) => [
      ...currentSections,
      {
        id: `added-${sectionKey}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        sectionKey
      }
    ]);
    setIsAddSectionMenuOpen(false);
  };

  const renderPricingEditButton = (tab: PricingEditorTab, labelText: string) => {
    if (!isAdmin) {
      return null;
    }

    return (
      <button
        className="admin-title-edit-button"
        type="button"
        onClick={() => openPricingEditor(tab, true)}
        aria-label={`编辑${labelText}`}
        title={`编辑${labelText}`}
      >
        <Pencil size={16} aria-hidden="true" />
      </button>
    );
  };

  const renderFlowSectionActions = (
    sectionKey: PricingFlowSectionKey,
    labelText: string,
    editorTab?: PricingEditorTab,
    instanceId?: string
  ) => {
    if (!isAdmin) {
      return null;
    }

    return (
      <span className="admin-title-actions">
        {editorTab && renderPricingEditButton(editorTab, labelText)}
        <button
          className="admin-title-delete-button"
          type="button"
          onClick={() => deleteFlowSection(sectionKey, instanceId)}
          aria-label={`删除${labelText}栏`}
          title={`删除${labelText}栏`}
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </span>
    );
  };

  const renderAddFlowSectionControl = () => {
    if (!isAdmin) {
      return null;
    }

    return (
      <div className="pricing-flow-add-control">
        <button
          className="pricing-flow-add-button"
          type="button"
          onClick={() => setIsAddSectionMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isAddSectionMenuOpen}
        >
          <Plus size={18} aria-hidden="true" />
          <span>添加栏</span>
        </button>

        {isAddSectionMenuOpen && (
          <div className="pricing-flow-add-menu">
            <p>选择一个已有栏添加回流程</p>
            <div className="pricing-flow-add-list">
              {pricingFlowSectionOrder.map((sectionKey) => {
                return (
                <button
                  type="button"
                  key={sectionKey}
                  className="is-addable"
                  onClick={() => addFlowSection(sectionKey)}
                >
                  <span>{getFlowSectionMenuLabel(sectionKey)}</span>
                </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAddOnSection = (
    section: AddOnNoteSection,
    title: string,
    stepLabel: string,
    Icon: LucideIcon,
    options: AddOnOption[],
    instanceId?: string
  ) => {
    if (!instanceId && (options.length === 0 || !isFlowSectionVisible(section as PricingFlowSectionKey))) {
      return null;
    }

    return (
      <section
        className="pricing-panel selector-panel"
        aria-labelledby={`${section}${instanceId ? `-${instanceId}` : ""}-title`}
      >
        <div className="panel-title compact-title panel-title-with-action">
          <Icon size={24} aria-hidden="true" />
          <div>
            <p>{stepLabel}</p>
            <h2 id={`${section}${instanceId ? `-${instanceId}` : ""}-title`}>{title}</h2>
          </div>
          {renderFlowSectionActions(section as PricingFlowSectionKey, title, "addons", instanceId)}
        </div>

        {options.length === 0 ? (
          <div className="empty-state">这一栏当前还没有可选内容</div>
        ) : (
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
                {addOn.previewImage && renderOptionPreview(addOn.previewImage, language)}
                <span>{addOn.name[language]}</span>
                <strong>{formatAud(addOn.priceAud)}</strong>
                {addOn.description && (
                  <small className="addon-description">{addOn.description[language]}</small>
                )}
              </button>
            );
            })}
          </div>
        )}

        <NotesInput
          idPrefix={section}
          language={language}
          notes={sectionNotes[section]}
          onChange={(notes) => updateNotes(section, notes)}
        />
      </section>
    );
  };

  const visibleBaseStepCount = [
    isFlowSectionVisible("areas"),
    showServiceTypes && isFlowSectionVisible("services"),
    showSchoolSelect && isFlowSectionVisible("schools"),
    showSceneTypes && isFlowSectionVisible("scenes"),
    isStudioGraduation && isFlowSectionVisible("studioPackage"),
    showGraduationPackages && Boolean(selectedSceneType) && isFlowSectionVisible("graduationPackage"),
    showRegistryPackages && isFlowSectionVisible("registryPackage"),
    showIdPhotoPackage && isFlowSectionVisible("idPhotoPackage"),
    isRegistryService && Boolean(selectedRegistryPackage) && isFlowSectionVisible("registryExtraLocations"),
    showAddOns && isFlowSectionVisible("addOnsIntro"),
    showAddOns && isGraduationService && isStudioGraduation && (graduationAddOns.makeup ?? []).length > 0 && isFlowSectionVisible("makeup"),
    showAddOns && isGraduationService && isStudioGraduation && availablePropsAddOns.length > 0 && isFlowSectionVisible("props"),
    showAddOns && isGraduationService && !isStudioGraduation && (graduationAddOns.clothing ?? []).length > 0 && isFlowSectionVisible("clothing"),
    showAddOns && isGraduationService && !isStudioGraduation && availablePropsAddOns.length > 0 && isFlowSectionVisible("props"),
    showAddOns && isGraduationService && !isStudioGraduation && (graduationAddOns.makeup ?? []).length > 0 && isFlowSectionVisible("makeup"),
    showAddOns && isRegistryService && (registryAddOns.registryStyling ?? []).length > 0 && isFlowSectionVisible("registryStyling"),
    showAddOns && isRegistryService && (registryAddOns.registryProps ?? []).length > 0 && isFlowSectionVisible("registryProps"),
    showAddOns && isRegistryService && (registryAddOns.registryClothing ?? []).length > 0 && isFlowSectionVisible("registryClothing"),
    showAddOns && isIdPhotoService && (idPhotoAddOns.idPhotoClothing ?? []).length > 0 && isFlowSectionVisible("idPhotoClothing"),
    showAddOns && isIdPhotoService && (idPhotoAddOns.idPhotoStyling ?? []).length > 0 && isFlowSectionVisible("idPhotoStyling"),
    showAddOns && isIdPhotoService && (idPhotoAddOns.idPhotoProps ?? []).length > 0 && isFlowSectionVisible("idPhotoProps")
  ].filter(Boolean).length;

  const renderAddedFlowSection = (flowSection: PricingFlowSectionInstance, addedIndex: number) => {
    const { id: instanceId, sectionKey } = flowSection;
    const titleId = `${sectionKey}-${instanceId}-title`;
    const stepLabel = formatStepLabel(visibleBaseStepCount + addedIndex + 1);

    switch (sectionKey) {
      case "areas":
        return (
          <section className="pricing-panel selector-panel" aria-labelledby={titleId} key={instanceId}>
            <div className="panel-title panel-title-with-action">
              <MapPinned size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2 id={titleId}>{pricingContent.areaLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("areas", pricingContent.areaLabel[language], "areas", instanceId)}
            </div>

            <div className="option-grid two-options">
              {serviceAreas.map((area) => (
                <button
                  className={selectedAreaId === area.id ? "choice-button is-selected" : "choice-button"}
                  type="button"
                  key={`${instanceId}-${area.id}`}
                  onClick={() => selectArea(area.id)}
                  aria-pressed={selectedAreaId === area.id}
                >
                  <span>{area.name[language]}</span>
                </button>
              ))}
            </div>
          </section>
        );

      case "services":
        return (
          <section className="pricing-panel selector-panel" aria-labelledby={titleId} key={instanceId}>
            <div className="panel-title panel-title-with-action">
              <ListChecks size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2 id={titleId}>{pricingContent.serviceTypeLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("services", pricingContent.serviceTypeLabel[language], "services", instanceId)}
            </div>

            {!selectedAreaId ? (
              <div className="empty-state">请先选择服务地区</div>
            ) : availableServiceTypes.length === 0 ? (
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
                    key={`${instanceId}-${serviceType.id}`}
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
        );

      case "schools":
        return (
          <section className="pricing-panel selector-panel" aria-labelledby={titleId} key={instanceId}>
            <div className="panel-title panel-title-with-action">
              <School size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2 id={titleId}>{pricingContent.schoolLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("schools", pricingContent.schoolLabel[language], "schools", instanceId)}
            </div>

            <div className="option-grid school-options">
              {graduationSchools.map((school) => {
                const isSelected = selectedSchoolId === school.id;

                return (
                  <button
                    className={isSelected ? "choice-button school-choice is-selected" : "choice-button school-choice"}
                    type="button"
                    key={`${instanceId}-${school.id}`}
                    onClick={() => selectSchool(school.id)}
                    aria-pressed={isSelected}
                  >
                    <span>{school.name[language]}</span>
                  </button>
                );
              })}
            </div>
          </section>
        );

      case "scenes":
        return (
          <section className="pricing-panel selector-panel" aria-labelledby={titleId} key={instanceId}>
            <div className="panel-title panel-title-with-action">
              <Images size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2 id={titleId}>{pricingContent.sceneTypeLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("scenes", pricingContent.sceneTypeLabel[language], "scenes", instanceId)}
            </div>

            {availableSceneTypes.length === 0 ? (
              <div className="empty-state">请先选择学校</div>
            ) : (
              <div className="option-grid scene-options">
                {availableSceneTypes.map((sceneType) => (
                  <button
                    className={
                      selectedSceneTypeId === sceneType.id
                        ? "choice-button scene-choice is-selected"
                        : "choice-button scene-choice"
                    }
                    type="button"
                    key={`${instanceId}-${sceneType.id}`}
                    onClick={() => selectSceneType(sceneType.id)}
                    aria-pressed={selectedSceneTypeId === sceneType.id}
                  >
                    {renderOptionPreview(sceneType.previewImage, language)}
                    <span>{sceneType.name[language]}</span>
                    <small>{sceneType.description[language]}</small>
                  </button>
                ))}
              </div>
            )}
          </section>
        );

      case "studioPackage":
        return (
          <section className="pricing-panel selector-panel" aria-labelledby={titleId} key={instanceId}>
            <div className="panel-title compact-title panel-title-with-action">
              <Aperture size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2 id={titleId}>{pricingContent.packageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("studioPackage", pricingContent.packageLabel[language], "packages", instanceId)}
            </div>

            <div className="option-grid package-options">
              <div className="choice-button package-choice is-selected">
                <span>{graduationStudioPackage.title[language]}</span>
                <strong className="package-price">{formatAud(graduationStudioPackage.priceAud)}</strong>
                <small>{pricingContent.packageDetailsLabel[language]}</small>
                {graduationStudioPackage.details[language].map((detail) => (
                  <span className="package-detail" key={`${instanceId}-${detail}`}>
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </section>
        );

      case "graduationPackage":
        return (
          <section className="pricing-panel selector-panel" aria-labelledby={titleId} key={instanceId}>
            <div className="panel-title compact-title panel-title-with-action">
              <PackageCheck size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2 id={titleId}>{pricingContent.packageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("graduationPackage", pricingContent.packageLabel[language], "packages", instanceId)}
            </div>

            {!selectedSceneType ? (
              <div className="empty-state">请先选择学校和场景</div>
            ) : (
              <>
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
                        key={`${instanceId}-${graduationPackage.id}`}
                        onClick={() => selectPackage(graduationPackage.id)}
                        aria-pressed={isSelected}
                      >
                        <span>{graduationPackage.name[language]}</span>
                        <strong className="package-price">{formatAud(graduationPackage.priceAud)}</strong>
                        <small>{pricingContent.packageDetailsLabel[language]}</small>
                        {graduationPackage.details[language].map((detail) => (
                          <span className="package-detail" key={`${instanceId}-${graduationPackage.id}-${detail}`}>
                            {detail}
                          </span>
                        ))}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        );

      case "registryPackage":
        return (
          <section className="pricing-panel selector-panel" aria-labelledby={titleId} key={instanceId}>
            <div className="panel-title compact-title panel-title-with-action">
              <HeartHandshake size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2 id={titleId}>{pricingContent.registryPackageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("registryPackage", pricingContent.registryPackageLabel[language], "packages", instanceId)}
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
                    key={`${instanceId}-${registryPackage.id}`}
                    onClick={() => selectPackage(registryPackage.id)}
                    aria-pressed={isSelected}
                  >
                    <span>{registryPackage.name[language]}</span>
                    <strong className="package-price">{formatAud(registryPackage.priceAud)}</strong>
                    <small>{pricingContent.packageDetailsLabel[language]}</small>
                    {registryPackage.details[language].map((detail) => (
                      <span className="package-detail" key={`${instanceId}-${registryPackage.id}-${detail}`}>
                        {detail}
                      </span>
                    ))}
                  </button>
                );
              })}
            </div>
          </section>
        );

      case "idPhotoPackage":
        return (
          <section className="pricing-panel selector-panel" aria-labelledby={titleId} key={instanceId}>
            <div className="panel-title compact-title panel-title-with-action">
              <ScanFace size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2 id={titleId}>{pricingContent.packageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("idPhotoPackage", pricingContent.packageLabel[language], "packages", instanceId)}
            </div>

            <div className="option-grid package-options">
              <div className="choice-button package-choice is-selected">
                <span>{idPhotoPackage.title[language]}</span>
                <strong className="package-price">{formatAud(idPhotoPackage.priceAud)}</strong>
                <small>{pricingContent.packageDetailsLabel[language]}</small>
                {idPhotoPackage.details[language].map((detail) => (
                  <span className="package-detail" key={`${instanceId}-${detail}`}>
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </section>
        );

      case "registryExtraLocations":
        return (
          <section className="pricing-panel selector-panel" aria-labelledby={titleId} key={instanceId}>
            <div className="panel-title compact-title panel-title-with-action">
              <MapPinPlus size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2 id={titleId}>{pricingContent.registryExtraLocationLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("registryExtraLocations", pricingContent.registryExtraLocationLabel[language], undefined, instanceId)}
            </div>

            <p className="selection-context">{pricingContent.registryExtraLocationIntro[language]}</p>

            <NotesInput
              idPrefix={`registry-extra-locations-${instanceId}`}
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
        );

      case "addOnsIntro":
        return (
          <section className="pricing-panel selector-panel add-on-intro-panel" key={instanceId}>
            <div className="panel-title compact-title panel-title-with-action">
              <BadgePlus size={24} aria-hidden="true" />
              <div>
                <p>{stepLabel}</p>
                <h2>{pricingContent.addOnsLabel[language]}</h2>
                <span className="panel-helper-copy">{pricingContent.addOnIntro[language]}</span>
              </div>
              {renderFlowSectionActions("addOnsIntro", pricingContent.addOnsLabel[language], "addons", instanceId)}
            </div>
          </section>
        );

      case "clothing":
        return renderAddOnSection(
          "clothing",
          pricingContent.clothingLabel[language],
          stepLabel,
          Shirt,
          graduationAddOns.clothing ?? [],
          instanceId
        );

      case "props":
        return renderAddOnSection(
          "props",
          pricingContent.propsLabel[language],
          stepLabel,
          Gift,
          availablePropsAddOns,
          instanceId
        );

      case "makeup":
        return renderAddOnSection(
          "makeup",
          pricingContent.makeupLabel[language],
          stepLabel,
          WandSparkles,
          graduationAddOns.makeup ?? [],
          instanceId
        );

      case "registryStyling":
        return renderAddOnSection(
          "registryStyling",
          pricingContent.makeupLabel[language],
          stepLabel,
          WandSparkles,
          registryAddOns.registryStyling ?? [],
          instanceId
        );

      case "registryProps":
        return renderAddOnSection(
          "registryProps",
          pricingContent.propsLabel[language],
          stepLabel,
          Gift,
          registryAddOns.registryProps ?? [],
          instanceId
        );

      case "registryClothing":
        return renderAddOnSection(
          "registryClothing",
          pricingContent.clothingLabel[language],
          stepLabel,
          Shirt,
          registryAddOns.registryClothing ?? [],
          instanceId
        );

      case "idPhotoClothing":
        return renderAddOnSection(
          "idPhotoClothing",
          pricingContent.clothingLabel[language],
          stepLabel,
          Shirt,
          idPhotoAddOns.idPhotoClothing ?? [],
          instanceId
        );

      case "idPhotoStyling":
        return renderAddOnSection(
          "idPhotoStyling",
          pricingContent.makeupLabel[language],
          stepLabel,
          WandSparkles,
          idPhotoAddOns.idPhotoStyling ?? [],
          instanceId
        );

      case "idPhotoProps":
        return renderAddOnSection(
          "idPhotoProps",
          pricingContent.propsLabel[language],
          stepLabel,
          Gift,
          idPhotoAddOns.idPhotoProps ?? [],
          instanceId
        );

      default:
        return null;
    }
  };

  return (
    <section className="pricing-page">
      <aside className="floating-total" aria-live="polite">
        <span>{pricingContent.estimatedTotal[language]}</span>
        <strong className={hasConfirmedTotal ? undefined : "floating-total-status"}>
          {totalDisplay}
        </strong>
      </aside>

      <div className="pricing-hero">
        <div className="pricing-hero-actions">
          <button className="back-button" type="button" onClick={onNavigateHome}>
            <ArrowLeft size={18} aria-hidden="true" />
            <span>{pricingContent.backHome[language]}</span>
          </button>
          {isAdmin && (
            <button
              className="admin-edit-button"
              type="button"
              onClick={() => openPricingEditor("areas")}
              aria-label="编辑价格配置"
            >
              <Pencil size={18} aria-hidden="true" />
              <span>编辑价格配置</span>
            </button>
          )}
        </div>
        <h1>{pricingContent.title[language]}</h1>
        <p>{pricingContent.intro[language]}</p>
      </div>

      <div className="pricing-layout flow-layout">
        {isFlowSectionVisible("areas") && (
        <section className="pricing-panel selector-panel" aria-labelledby="area-title">
          <div className="panel-title panel-title-with-action">
            <MapPinned size={24} aria-hidden="true" />
            <div>
              <p>Step 01</p>
              <h2 id="area-title">{pricingContent.areaLabel[language]}</h2>
            </div>
            {renderFlowSectionActions("areas", pricingContent.areaLabel[language], "areas")}
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
        )}

        {showServiceTypes && isFlowSectionVisible("services") && (
          <section className="pricing-panel selector-panel" aria-labelledby="service-type-title">
            <div className="panel-title panel-title-with-action">
              <ListChecks size={24} aria-hidden="true" />
              <div>
                <p>Step 02</p>
                <h2 id="service-type-title">{pricingContent.serviceTypeLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("services", pricingContent.serviceTypeLabel[language], "services")}
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

        {showSchoolSelect && isFlowSectionVisible("schools") && (
          <section className="pricing-panel selector-panel" aria-labelledby="school-title">
            <div className="panel-title panel-title-with-action">
              <School size={24} aria-hidden="true" />
              <div>
                <p>Step 03</p>
                <h2 id="school-title">{pricingContent.schoolLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("schools", pricingContent.schoolLabel[language], "schools")}
            </div>

            <div className="option-grid school-options">
              {graduationSchools.map((school) => {
                const isSelected = selectedSchoolId === school.id;

                return (
                  <button
                    className={isSelected ? "choice-button school-choice is-selected" : "choice-button school-choice"}
                    type="button"
                    key={school.id}
                    onClick={() => selectSchool(school.id)}
                    aria-pressed={isSelected}
                  >
                    <span>{school.name[language]}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {showSceneTypes && isFlowSectionVisible("scenes") && (
          <section className="pricing-panel selector-panel" aria-labelledby="scene-type-title">
            <div className="panel-title panel-title-with-action">
              <Images size={24} aria-hidden="true" />
              <div>
                <p>Step 04</p>
                <h2 id="scene-type-title">{pricingContent.sceneTypeLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("scenes", pricingContent.sceneTypeLabel[language], "scenes")}
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
                  {renderOptionPreview(sceneType.previewImage, language)}
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

        {isStudioGraduation && isFlowSectionVisible("studioPackage") && (
          <section className="pricing-panel selector-panel" aria-labelledby="studio-package-title">
            <div className="panel-title compact-title panel-title-with-action">
              <Aperture size={24} aria-hidden="true" />
              <div>
                <p>Step 05</p>
                <h2 id="studio-package-title">{pricingContent.packageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("studioPackage", pricingContent.packageLabel[language], "packages")}
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

        {showGraduationPackages && selectedSceneType && isFlowSectionVisible("graduationPackage") && (
          <section className="pricing-panel selector-panel" aria-labelledby="package-title">
            <div className="panel-title compact-title panel-title-with-action">
              <PackageCheck size={24} aria-hidden="true" />
              <div>
                <p>Step 05</p>
                <h2 id="package-title">{pricingContent.packageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("graduationPackage", pricingContent.packageLabel[language], "packages")}
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

        {showRegistryPackages && isFlowSectionVisible("registryPackage") && (
          <section className="pricing-panel selector-panel" aria-labelledby="registry-package-title">
            <div className="panel-title compact-title panel-title-with-action">
              <HeartHandshake size={24} aria-hidden="true" />
              <div>
                <p>Step 03</p>
                <h2 id="registry-package-title">{pricingContent.registryPackageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("registryPackage", pricingContent.registryPackageLabel[language], "packages")}
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

        {showIdPhotoPackage && isFlowSectionVisible("idPhotoPackage") && (
          <section className="pricing-panel selector-panel" aria-labelledby="id-photo-package-title">
            <div className="panel-title compact-title panel-title-with-action">
              <ScanFace size={24} aria-hidden="true" />
              <div>
                <p>Step 03</p>
                <h2 id="id-photo-package-title">{pricingContent.packageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("idPhotoPackage", pricingContent.packageLabel[language], "packages")}
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

        {isRegistryService && selectedRegistryPackage && isFlowSectionVisible("registryExtraLocations") && (
          <section className="pricing-panel selector-panel" aria-labelledby="registry-extra-locations-title">
            <div className="panel-title compact-title panel-title-with-action">
              <MapPinPlus size={24} aria-hidden="true" />
              <div>
                <p>Step 04</p>
                <h2 id="registry-extra-locations-title">
                  {pricingContent.registryExtraLocationLabel[language]}
                </h2>
              </div>
              {renderFlowSectionActions("registryExtraLocations", pricingContent.registryExtraLocationLabel[language])}
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
            {isFlowSectionVisible("addOnsIntro") && (
            <section className="pricing-panel selector-panel add-on-intro-panel">
              <div className="panel-title compact-title panel-title-with-action">
                <BadgePlus size={24} aria-hidden="true" />
                <div>
                  <p>{addOnsStepLabel}</p>
                  <h2>{pricingContent.addOnsLabel[language]}</h2>
                  <span className="panel-helper-copy">{pricingContent.addOnIntro[language]}</span>
                </div>
                {renderFlowSectionActions("addOnsIntro", pricingContent.addOnsLabel[language], "addons")}
              </div>
            </section>
            )}

            {isGraduationService && (
              isStudioGraduation ? (
                <>
                  {renderAddOnSection(
                    "makeup",
                    pricingContent.makeupLabel[language],
                    "Step 06",
                    WandSparkles,
                    graduationAddOns.makeup ?? []
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
                    graduationAddOns.clothing ?? []
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
                    WandSparkles,
                    graduationAddOns.makeup ?? []
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
                  WandSparkles,
                  registryAddOns.registryStyling ?? []
                )}

                {renderAddOnSection(
                  "registryProps",
                  pricingContent.propsLabel[language],
                  "Step 06",
                  Gift,
                  registryAddOns.registryProps ?? []
                )}

                {renderAddOnSection(
                  "registryClothing",
                  pricingContent.clothingLabel[language],
                  "Step 07",
                  Shirt,
                  registryAddOns.registryClothing ?? []
                )}
              </>
            )}

            {isIdPhotoService && (
              <>
                {renderAddOnSection(
                  "idPhotoClothing",
                  pricingContent.clothingLabel[language],
                  "Step 04",
                  Shirt,
                  idPhotoAddOns.idPhotoClothing ?? []
                )}

                {renderAddOnSection(
                  "idPhotoStyling",
                  pricingContent.makeupLabel[language],
                  "Step 05",
                  WandSparkles,
                  idPhotoAddOns.idPhotoStyling ?? []
                )}

                {renderAddOnSection(
                  "idPhotoProps",
                  pricingContent.propsLabel[language],
                  "Step 06",
                  Gift,
                  idPhotoAddOns.idPhotoProps ?? []
                )}
              </>
            )}
          </>
        )}

        {addedFlowSections.map((flowSection, addedIndex) => renderAddedFlowSection(flowSection, addedIndex))}

        {renderAddFlowSectionControl()}
      </div>

      {isEditorOpen && (
        <PricingEditor
          language={language}
          content={content}
          initialTab={editorInitialTab}
          visibleTabs={editorContext.visibleTabs}
          initialAreaId={editorContext.initialAreaId}
          initialSchoolId={editorContext.initialSchoolId}
          initialSceneId={editorContext.initialSceneId}
          initialPackageScope={editorContext.initialPackageScope}
          initialAddOnTarget={editorContext.initialAddOnTarget}
          onClose={() => setIsEditorOpen(false)}
          onSave={(nextContent) => {
            onChange(nextContent);
            setIsEditorOpen(false);
          }}
        />
      )}
    </section>
  );
}
