import {
  Aperture,
  ArrowLeft,
  ChevronDown,
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
  X,
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
import {
  defaultPricingFlowLayouts,
  type EditablePricingContent,
  type PricingFlowKind,
  type PricingFlowSectionKey
} from "../data/editableContent";
import {
  pricingContent as defaultPricingContent,
  type AddOnGroupId,
  type GalleryImage,
  type GraduationAddOn,
  type IdPhotoAddOn,
  type IdPhotoAddOnGroupId,
  type Language,
  type LocalizedList,
  type RegistryAddOn,
  type RegistryAddOnGroupId,
  type SceneTypeId,
  type ServiceAreaId,
  type ServiceTypeId
} from "../data/siteContent";

type AddOnNoteSection = AddOnGroupId | RegistryAddOnGroupId | IdPhotoAddOnGroupId;
type AddOnOption = GraduationAddOn | RegistryAddOn | IdPhotoAddOn;
type NoteSection = "schoolScene" | "package" | "registryExtraLocations" | AddOnNoteSection;
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
  initialServiceTypeId?: string;
  initialSchoolId?: string;
  initialSceneId?: string;
  initialPackageScope?: PackageScope;
  initialPackageId?: string;
  initialAddOnTarget?: AddOnTarget;
  initialAddOnGroup?: "clothing" | "props" | "makeup";
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

function formatAud(price: number) {
  return `${price} AUD`;
}

function isContentVisible(item: { isVisible?: boolean }) {
  return item.isVisible !== false;
}

function isContentAvailable(item: { isAvailable?: boolean }) {
  return item.isAvailable !== false;
}

function renderDescriptionItems(
  description: LocalizedList | undefined,
  language: Language
) {
  const items = (description?.[language] ?? []).filter((item) => item.trim().length > 0);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {items.map((item, index) => (
        <span className="content-detail" key={`${index}-${item}`}>
          {item}
        </span>
      ))}
    </>
  );
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
  const [addedFlowSections] = useState<PricingFlowSectionInstance[]>([]);
  const [isAddSectionMenuOpen, setIsAddSectionMenuOpen] = useState(false);
  const [isSpotGalleryOpen, setIsSpotGalleryOpen] = useState(false);

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
    graduationAddOns: sharedGraduationAddOns,
    graduationAddOnsBySchool,
    pricingCopy
  } = content;

  const pricingContent = pricingCopy ?? defaultPricingContent;

  const graduationAddOns = selectedSchoolId
    ? graduationAddOnsBySchool[selectedSchoolId] ?? sharedGraduationAddOns
    : sharedGraduationAddOns;

  const availableServiceTypes = selectedAreaId
    ? (serviceTypesByArea[selectedAreaId] ?? []).filter(isContentVisible)
    : [];
  const visibleServiceAreas = useMemo(
    () => serviceAreas.filter(isContentVisible),
    [serviceAreas]
  );
  const visibleGraduationSchools = useMemo(
    () => graduationSchools.filter(isContentVisible),
    [graduationSchools]
  );
  const visibleRegistryPackages = useMemo(
    () => registryPackages.filter(isContentVisible),
    [registryPackages]
  );

  const selectedServiceType = useMemo(
    () => availableServiceTypes.find((serviceType) => serviceType.id === selectedServiceTypeId),
    [availableServiceTypes, selectedServiceTypeId]
  );

  const selectedSchool = useMemo(
    () => graduationSchools.find((school) => school.id === selectedSchoolId),
    [graduationSchools, selectedSchoolId]
  );

  const availableSceneTypes = selectedSchoolId
    ? (sceneTypesBySchool[selectedSchoolId] ?? []).filter(isContentVisible)
    : [];

  const selectedSceneType = useMemo(
    () => availableSceneTypes.find((sceneType) => sceneType.id === selectedSceneTypeId),
    [availableSceneTypes, selectedSceneTypeId]
  );

  const availablePackages = selectedSceneTypeId
    ? (graduationPackages[selectedSceneTypeId] ?? []).filter(isContentVisible)
    : [];

  const selectedPackage = useMemo(
    () => availablePackages.find((graduationPackage) => graduationPackage.id === selectedPackageId),
    [availablePackages, selectedPackageId]
  );

  const selectedRegistryPackage = useMemo(
    () => visibleRegistryPackages.find((registryPackage) => registryPackage.id === selectedPackageId),
    [visibleRegistryPackages, selectedPackageId]
  );

  const spotGalleryImages = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const imageNumber = String((index % 9) + 1).padStart(2, "0");

        return {
          src: `images/models/model-${imageNumber}.jpg`,
          alt: {
            zh: `毕业照打卡点 ${index + 1}`,
            en: `Graduation photo spot ${index + 1}`
          }
        };
      }),
    []
  );

  const allAddOns = useMemo(
    () => [
      ...Object.values(graduationAddOns).flat(),
      ...graduationStudioProps,
      ...Object.values(registryAddOns).flat(),
      ...Object.values(idPhotoAddOns).flat()
    ].filter(isContentVisible),
    [graduationAddOns, graduationStudioProps, idPhotoAddOns, registryAddOns]
  );

  const availablePropsAddOns = useMemo(
    () => {
      if (selectedSceneTypeId === "graduation-studio") {
        return graduationStudioProps;
      }

      return graduationAddOns.props ?? [];
    },
    [graduationAddOns.props, graduationStudioProps, selectedSceneTypeId]
  );

  useEffect(() => {
    setSelectedAddOnIds((currentAddOnIds) =>
      currentAddOnIds.filter((addOnId) =>
        allAddOns.some((addOn) => addOn.id === addOnId && isContentAvailable(addOn))
      )
    );
  }, [allAddOns]);

  useEffect(() => {
    const selectedArea = serviceAreas.find((area) => area.id === selectedAreaId);

    if (selectedAreaId && (!selectedArea || !isContentVisible(selectedArea) || !isContentAvailable(selectedArea))) {
      setSelectedAreaId("");
      setSelectedServiceTypeId("");
      clearGraduationSelections();
    }
  }, [selectedAreaId, serviceAreas]);

  useEffect(() => {
    const selectedServiceTypeOption = availableServiceTypes.find(
      (serviceType) => serviceType.id === selectedServiceTypeId
    );

    if (
      selectedServiceTypeId &&
      (!selectedServiceTypeOption || !isContentAvailable(selectedServiceTypeOption))
    ) {
      setSelectedServiceTypeId("");
      clearGraduationSelections();
    }
  }, [availableServiceTypes, selectedServiceTypeId]);

  useEffect(() => {
    const selectedSchoolOption = graduationSchools.find((school) => school.id === selectedSchoolId);

    if (
      selectedSchoolId &&
      (!selectedSchoolOption ||
        !isContentVisible(selectedSchoolOption) ||
        !isContentAvailable(selectedSchoolOption))
    ) {
      clearGraduationSelections();
    }
  }, [graduationSchools, selectedSchoolId]);

  useEffect(() => {
    const selectedSceneOption = availableSceneTypes.find(
      (sceneType) => sceneType.id === selectedSceneTypeId
    );

    if (
      selectedSceneTypeId &&
      (!selectedSceneOption || !isContentAvailable(selectedSceneOption))
    ) {
      setSelectedSceneTypeId("");
      setSelectedPackageId("");
      setSelectedAddOnIds([]);
      setIsSpotGalleryOpen(false);
    }
  }, [availableSceneTypes, selectedSceneTypeId]);

  useEffect(() => {
    if (!isSpotGalleryOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSpotGalleryOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isSpotGalleryOpen]);

  useEffect(() => {
    const selectedPackageOption = [
      ...availablePackages,
      ...visibleRegistryPackages
    ].find((packageOption) => packageOption.id === selectedPackageId);

    if (
      selectedPackageId &&
      (!selectedPackageOption || !isContentAvailable(selectedPackageOption)) &&
      selectedPackageId !== graduationStudioPackage.title.en &&
      selectedPackageId !== idPhotoPackage.title.en
    ) {
      setSelectedPackageId("");
      setSelectedAddOnIds([]);
    }
  }, [availablePackages, graduationStudioPackage.title.en, idPhotoPackage.title.en, selectedPackageId, visibleRegistryPackages]);

  const selectedAddOnsTotal = selectedAddOnIds.reduce((sum, addOnId) => {
    const addOn = allAddOns.find((option) => option.id === addOnId);
    return sum + (addOn && isContentAvailable(addOn) ? addOn.priceAud : 0);
  }, 0);

  const selectedServiceKind = selectedServiceType?.kind ?? "other";
  const isGraduationService = selectedServiceKind === "graduation";
  const isRegistryService = selectedServiceKind === "registry";
  const isIdPhotoService = selectedServiceKind === "id-photo";
  const isStudioGraduation = isGraduationService && selectedSceneTypeId === "graduation-studio";
  const hasAvailableGraduationPackage = Boolean(
    selectedPackage && isContentAvailable(selectedPackage)
  );
  const hasAvailableRegistryPackage = Boolean(
    selectedRegistryPackage && isContentAvailable(selectedRegistryPackage)
  );
  const hasAvailableStudioPackage =
    isContentVisible(graduationStudioPackage) && isContentAvailable(graduationStudioPackage);
  const hasAvailableIdPhotoPackage =
    isContentVisible(idPhotoPackage) && isContentAvailable(idPhotoPackage);
  const registryExtraLocationsTotal = isRegistryService ? sectionNotes.registryExtraLocations.length * 100 : 0;
  const graduationBasePrice = isStudioGraduation
    ? hasAvailableStudioPackage
      ? graduationStudioPackage.priceAud
      : 0
    : hasAvailableGraduationPackage
      ? selectedPackage?.priceAud ?? 0
      : 0;
  const totalPrice = isRegistryService
    ? (hasAvailableRegistryPackage ? selectedRegistryPackage?.priceAud ?? 0 : 0) +
      selectedAddOnsTotal +
      registryExtraLocationsTotal
    : isIdPhotoService
      ? (hasAvailableIdPhotoPackage ? idPhotoPackage.priceAud : 0) + selectedAddOnsTotal
      : graduationBasePrice + selectedAddOnsTotal;
  const showServiceTypes = Boolean(selectedAreaId);
  const showSchoolSelect = isGraduationService;
  const showSceneTypes = isGraduationService && Boolean(selectedSchool);
  const showGraduationPackages = isGraduationService && Boolean(selectedSceneType) && !isStudioGraduation;
  const showRegistryPackages = isRegistryService;
  const showIdPhotoPackage = isIdPhotoService && isContentVisible(idPhotoPackage);
  const showAddOns = isRegistryService
    ? hasAvailableRegistryPackage
    : isIdPhotoService
      ? hasAvailableIdPhotoPackage
      : isStudioGraduation
        ? hasAvailableStudioPackage
        : hasAvailableGraduationPackage;
  const hasConfirmedTotal = isRegistryService
    ? hasAvailableRegistryPackage
    : isIdPhotoService
      ? hasAvailableIdPhotoPackage
      : isStudioGraduation
        ? hasAvailableStudioPackage
        : hasAvailableGraduationPackage;
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

  const currentFlowKind: PricingFlowKind = isRegistryService
    ? "registry"
    : isIdPhotoService
      ? "idPhoto"
      : "graduation";
  const pricingFlowLayouts = content.pricingFlowLayouts ?? defaultPricingFlowLayouts;
  const currentFlowLayout =
    pricingFlowLayouts[currentFlowKind] ?? defaultPricingFlowLayouts[currentFlowKind];

  const isFlowSectionVisible = (sectionKey: PricingFlowSectionKey) =>
    currentFlowLayout.order.includes(sectionKey) && !currentFlowLayout.hidden.includes(sectionKey);

  const flowSectionStyle = (sectionKey: PricingFlowSectionKey) => ({
    order: Math.max(0, currentFlowLayout.order.indexOf(sectionKey))
  });

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
        return showAddOns && isGraduationService && !isStudioGraduation && (graduationAddOns.clothing ?? []).some(isContentVisible);
      case "props":
        return showAddOns && isGraduationService && availablePropsAddOns.some(isContentVisible);
      case "makeup":
        return showAddOns && isGraduationService && (graduationAddOns.makeup ?? []).some(isContentVisible);
      case "registryStyling":
        return showAddOns && isRegistryService && (registryAddOns.registryStyling ?? []).some(isContentVisible);
      case "registryProps":
        return showAddOns && isRegistryService && (registryAddOns.registryProps ?? []).some(isContentVisible);
      case "registryClothing":
        return showAddOns && isRegistryService && (registryAddOns.registryClothing ?? []).some(isContentVisible);
      case "idPhotoClothing":
        return showAddOns && isIdPhotoService && (idPhotoAddOns.idPhotoClothing ?? []).some(isContentVisible);
      case "idPhotoStyling":
        return showAddOns && isIdPhotoService && (idPhotoAddOns.idPhotoStyling ?? []).some(isContentVisible);
      case "idPhotoProps":
        return showAddOns && isIdPhotoService && (idPhotoAddOns.idPhotoProps ?? []).some(isContentVisible);
      default:
        return false;
    }
  };

  const getFlowStepLabel = (sectionKey: PricingFlowSectionKey, fallback = "") => {
    const visibleSections = currentFlowLayout.order.filter(
      (candidate) => isFlowSectionVisible(candidate) && canOfferFlowSection(candidate)
    );
    const sectionIndex = visibleSections.indexOf(sectionKey);
    return sectionIndex >= 0 ? formatStepLabel(sectionIndex + 1) : fallback;
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

  const renderServiceAreaOptions = (keyPrefix: string) => (
    <div className="option-grid two-options">
      {visibleServiceAreas.length === 0 ? (
        <div className="empty-state">
          {language === "zh" ? "暂无可显示的服务地区。" : "No service areas are currently visible."}
        </div>
      ) : (
        visibleServiceAreas.map((area) => {
          const isUnavailable = !isContentAvailable(area);
          const areaClassName = [
            "choice-button",
            selectedAreaId === area.id ? "is-selected" : "",
            isUnavailable ? "is-unavailable" : ""
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              className={areaClassName}
              type="button"
              key={`${keyPrefix}-${area.id}`}
              onClick={() => {
                if (!isUnavailable) {
                  selectArea(area.id);
                }
              }}
              aria-pressed={selectedAreaId === area.id}
              aria-disabled={isUnavailable}
              data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
              title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
            >
              <span>{area.name[language]}</span>
            </button>
          );
        })
      )}
    </div>
  );

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
    setIsSpotGalleryOpen(false);
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

  const toggleAddOn = (addOnId: string, exclusiveAddOnIds: string[] = []) => {
    setSelectedAddOnIds((currentAddOns) => {
      if (exclusiveAddOnIds.length > 0) {
        if (currentAddOns.includes(addOnId)) {
          return currentAddOns;
        }

        return [
          ...currentAddOns.filter((currentAddOn) => !exclusiveAddOnIds.includes(currentAddOn)),
          addOnId
        ];
      }

      return currentAddOns.includes(addOnId)
        ? currentAddOns.filter((currentAddOn) => currentAddOn !== addOnId)
        : [...currentAddOns, addOnId];
    });
  };

  const updateNotes = (section: NoteSection, notes: string[]) => {
    setSectionNotes((currentNotes) => ({
      ...currentNotes,
      [section]: notes
    }));
  };

  const renderSpotGalleryButton = () => {
    if (!selectedSceneType) {
      return null;
    }

    return (
      <button
        className="spot-gallery-trigger"
        type="button"
        onClick={() => setIsSpotGalleryOpen(true)}
        aria-expanded={isSpotGalleryOpen}
        aria-controls="graduation-spot-gallery"
      >
        <span>{language === "zh" ? "查看所有打卡点" : "View all photo spots"}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
    );
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

  const getAddOnTargetForCurrentSelection = (
    sectionKey?: PricingFlowSectionKey
  ): AddOnTarget => {
    if (isStudioGraduation && sectionKey === "makeup") {
      return "graduation";
    }

    if (isStudioGraduation) {
      return "graduationStudio";
    }

    if (isRegistryService) {
      return "registry";
    }

    if (isIdPhotoService) {
      return "idPhoto";
    }

    return "graduation";
  };

  const getPackageScopeForSection = (sectionKey?: PricingFlowSectionKey): PackageScope => {
    if (sectionKey === "registryPackage") {
      return "registry";
    }

    if (sectionKey === "idPhotoPackage") {
      return "idPhoto";
    }

    if (sectionKey === "studioPackage") {
      return "studio";
    }

    if (sectionKey === "graduationPackage") {
      return "graduation";
    }

    return getPackageScopeForCurrentSelection();
  };

  const getAddOnGroupForSection = (
    sectionKey?: PricingFlowSectionKey
  ): "clothing" | "props" | "makeup" | undefined => {
    if (sectionKey === "clothing" || sectionKey === "registryClothing" || sectionKey === "idPhotoClothing") {
      return "clothing";
    }

    if (sectionKey === "props" || sectionKey === "registryProps" || sectionKey === "idPhotoProps") {
      return "props";
    }

    if (sectionKey === "makeup" || sectionKey === "registryStyling" || sectionKey === "idPhotoStyling") {
      return "makeup";
    }

    return undefined;
  };

  const getContextForTab = (
    tab: PricingEditorTab,
    sectionKey?: PricingFlowSectionKey
  ): PricingEditorContext => {
    const context: PricingEditorContext = {
      visibleTabs: [tab]
    };

    if (selectedAreaId) {
      context.initialAreaId = selectedAreaId;
    }

    if (selectedServiceTypeId) {
      context.initialServiceTypeId = selectedServiceTypeId;
    }

    if (selectedSchoolId) {
      context.initialSchoolId = selectedSchoolId;
    }

    if (selectedSceneTypeId) {
      context.initialSceneId = selectedSceneTypeId;
    }

    if (tab === "packages") {
      context.initialPackageScope = getPackageScopeForSection(sectionKey);

      if (selectedPackageId) {
        context.initialPackageId = selectedPackageId;
      }
    }

    if (tab === "addons") {
      context.initialAddOnTarget = getAddOnTargetForCurrentSelection(sectionKey);
      context.initialAddOnGroup = getAddOnGroupForSection(sectionKey);
    }

    return context;
  };

  const openPricingEditor = (
    tab: PricingEditorTab,
    isContextual = false,
    sectionKey?: PricingFlowSectionKey
  ) => {
    setEditorInitialTab(tab);
    setEditorContext(isContextual ? getContextForTab(tab, sectionKey) : {});
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
      setIsAddSectionMenuOpen(false);
      return;
    }

    onChange({
      ...content,
      pricingFlowLayouts: {
        ...pricingFlowLayouts,
        [currentFlowKind]: {
          ...currentFlowLayout,
          hidden: currentFlowLayout.hidden.includes(sectionKey)
            ? currentFlowLayout.hidden
            : [...currentFlowLayout.hidden, sectionKey]
        }
      }
    });
    setIsAddSectionMenuOpen(false);
  };

  const addFlowSection = (sectionKey: PricingFlowSectionKey) => {
    onChange({
      ...content,
      pricingFlowLayouts: {
        ...pricingFlowLayouts,
        [currentFlowKind]: {
          order: currentFlowLayout.order.includes(sectionKey)
            ? currentFlowLayout.order
            : [...currentFlowLayout.order, sectionKey],
          hidden: currentFlowLayout.hidden.filter((hiddenSection) => hiddenSection !== sectionKey)
        }
      }
    });
    setIsAddSectionMenuOpen(false);
  };

  const renderPricingEditButton = (
    tab: PricingEditorTab,
    labelText: string,
    sectionKey?: PricingFlowSectionKey
  ) => {
    if (!isAdmin) {
      return null;
    }

    return (
      <button
        className="admin-title-edit-button"
        type="button"
        onClick={() => openPricingEditor(tab, true, sectionKey)}
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
        {editorTab && renderPricingEditButton(editorTab, labelText, sectionKey)}
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
            <button
              className="pricing-flow-add-close"
              type="button"
              onClick={() => setIsAddSectionMenuOpen(false)}
              aria-label="关闭添加栏弹窗"
              title="关闭"
            >
              <X size={16} aria-hidden="true" />
            </button>
            <p>选择一个已有栏添加回流程</p>
            <div className="pricing-flow-add-list">
              {defaultPricingFlowLayouts[currentFlowKind].order.map((sectionKey) => {
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
    const visibleOptions = options.filter(isContentVisible);
    const isExclusiveSelection = ["makeup", "registryStyling", "idPhotoStyling"].includes(section);
    const shouldShowPreview = !isExclusiveSelection;
    const exclusiveAddOnIds = isExclusiveSelection ? options.map((option) => option.id) : [];

    if (!instanceId && (visibleOptions.length === 0 || !isFlowSectionVisible(section as PricingFlowSectionKey))) {
      return null;
    }

    return (
      <section
        className="pricing-panel selector-panel"
        style={flowSectionStyle(section as PricingFlowSectionKey)}
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

        {visibleOptions.length === 0 ? (
          <div className="empty-state">这一栏当前还没有可选内容</div>
        ) : (
          <div className="option-grid addon-options">
            {visibleOptions.map((addOn) => {
              const isSelected = selectedAddOnIds.includes(addOn.id);
              const isUnavailable = !isContentAvailable(addOn);

              return (
                <button
                  className={
                    [
                      "choice-button addon-choice",
                      isSelected ? "is-selected" : "",
                      isUnavailable ? "is-unavailable" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                  type="button"
                  key={addOn.id}
                  onClick={() => {
                    if (!isUnavailable) {
                      toggleAddOn(addOn.id, exclusiveAddOnIds);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-disabled={isUnavailable}
                  data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                  title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                >
                  {shouldShowPreview && addOn.previewImage && renderOptionPreview(addOn.previewImage, language)}
                  <span>{addOn.name[language]}</span>
                  <strong>{formatAud(addOn.priceAud)}</strong>
                  {renderDescriptionItems(addOn.description, language)}
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
    isStudioGraduation && isContentVisible(graduationStudioPackage) && isFlowSectionVisible("studioPackage"),
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

            {renderServiceAreaOptions(`${instanceId}-area`)}
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
                      [
                        "choice-button service-choice",
                        selectedServiceTypeId === serviceType.id ? "is-selected" : "",
                        !isContentAvailable(serviceType) ? "is-unavailable" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    type="button"
                    key={`${instanceId}-${serviceType.id}`}
                    onClick={() => {
                      if (isContentAvailable(serviceType)) {
                        selectServiceType(serviceType.id);
                      }
                    }}
                    aria-pressed={selectedServiceTypeId === serviceType.id}
                    aria-disabled={!isContentAvailable(serviceType)}
                    data-tooltip={!isContentAvailable(serviceType) ? pricingContent.areaComingSoon[language] : undefined}
                    title={!isContentAvailable(serviceType) ? pricingContent.areaComingSoon[language] : undefined}
                  >
                    <span>{serviceType.name[language]}</span>
                    <small>
                      {isContentAvailable(serviceType)
                        ? pricingContent.availableNow[language]
                        : pricingContent.areaComingSoon[language]}
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
              {visibleGraduationSchools.map((school) => {
                const isSelected = selectedSchoolId === school.id;
                const isUnavailable = !isContentAvailable(school);

                return (
                  <button
                    className={
                      [
                        "choice-button school-choice",
                        isSelected ? "is-selected" : "",
                        isUnavailable ? "is-unavailable" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    type="button"
                    key={`${instanceId}-${school.id}`}
                    onClick={() => {
                      if (!isUnavailable) {
                        selectSchool(school.id);
                      }
                    }}
                    aria-pressed={isSelected}
                    aria-disabled={isUnavailable}
                    data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                    title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
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
                {availableSceneTypes.map((sceneType) => {
                  const isUnavailable = !isContentAvailable(sceneType);

                  return (
                    <button
                      className={
                        [
                          "choice-button scene-choice",
                          selectedSceneTypeId === sceneType.id ? "is-selected" : "",
                          isUnavailable ? "is-unavailable" : ""
                        ]
                          .filter(Boolean)
                          .join(" ")
                      }
                      type="button"
                      key={`${instanceId}-${sceneType.id}`}
                      onClick={() => {
                        if (!isUnavailable) {
                          selectSceneType(sceneType.id);
                        }
                      }}
                      aria-pressed={selectedSceneTypeId === sceneType.id}
                      aria-disabled={isUnavailable}
                      data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                      title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                    >
                      {renderOptionPreview(sceneType.previewImage, language)}
                      <span>{sceneType.name[language]}</span>
                      {renderDescriptionItems(sceneType.description, language)}
                    </button>
                  );
                })}
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
              <div
                className={
                  isContentAvailable(graduationStudioPackage)
                    ? "choice-button package-choice is-selected"
                    : "choice-button package-choice is-unavailable"
                }
                data-tooltip={
                  !isContentAvailable(graduationStudioPackage)
                    ? pricingContent.areaComingSoon[language]
                    : undefined
                }
              >
                <span>{graduationStudioPackage.title[language]}</span>
                <strong className="package-price">{formatAud(graduationStudioPackage.priceAud)}</strong>
                <small>{pricingContent.packageDetailsLabel[language]}</small>
                {graduationStudioPackage.details[language].map((detail) => (
                  <span className="package-detail content-detail" key={`${instanceId}-${detail}`}>
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
              {renderSpotGalleryButton()}
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
                    const isUnavailable = !isContentAvailable(graduationPackage);

                    return (
                      <button
                        className={
                          [
                            "choice-button package-choice",
                            isSelected ? "is-selected" : "",
                            isUnavailable ? "is-unavailable" : ""
                          ]
                            .filter(Boolean)
                            .join(" ")
                        }
                        type="button"
                        key={`${instanceId}-${graduationPackage.id}`}
                        onClick={() => {
                          if (!isUnavailable) {
                            selectPackage(graduationPackage.id);
                          }
                        }}
                        aria-pressed={isSelected}
                        aria-disabled={isUnavailable}
                        data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                        title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                      >
                        <span>{graduationPackage.name[language]}</span>
                        <strong className="package-price">{formatAud(graduationPackage.priceAud)}</strong>
                        <small>{pricingContent.packageDetailsLabel[language]}</small>
                        {graduationPackage.details[language].map((detail) => (
                          <span className="package-detail content-detail" key={`${instanceId}-${graduationPackage.id}-${detail}`}>
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
              {visibleRegistryPackages.map((registryPackage) => {
                const isSelected = selectedPackageId === registryPackage.id;
                const isUnavailable = !isContentAvailable(registryPackage);

                return (
                  <button
                    className={
                      [
                        "choice-button package-choice",
                        isSelected ? "is-selected" : "",
                        isUnavailable ? "is-unavailable" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    type="button"
                    key={`${instanceId}-${registryPackage.id}`}
                    onClick={() => {
                      if (!isUnavailable) {
                        selectPackage(registryPackage.id);
                      }
                    }}
                    aria-pressed={isSelected}
                    aria-disabled={isUnavailable}
                    data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                    title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                  >
                    <span>{registryPackage.name[language]}</span>
                    <strong className="package-price">{formatAud(registryPackage.priceAud)}</strong>
                    <small>{pricingContent.packageDetailsLabel[language]}</small>
                    {registryPackage.details[language].map((detail) => (
                      <span className="package-detail content-detail" key={`${instanceId}-${registryPackage.id}-${detail}`}>
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
              <div
                className={
                  isContentAvailable(idPhotoPackage)
                    ? "choice-button package-choice is-selected"
                    : "choice-button package-choice is-unavailable"
                }
                data-tooltip={
                  !isContentAvailable(idPhotoPackage)
                    ? pricingContent.areaComingSoon[language]
                    : undefined
                }
              >
                <span>{idPhotoPackage.title[language]}</span>
                <strong className="package-price">{formatAud(idPhotoPackage.priceAud)}</strong>
                <small>{pricingContent.packageDetailsLabel[language]}</small>
                {idPhotoPackage.details[language].map((detail) => (
                  <span className="package-detail content-detail" key={`${instanceId}-${detail}`}>
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

      <aside className="floating-total" aria-live="polite">
        <span>{pricingContent.estimatedTotal[language]}</span>
        <strong className={hasConfirmedTotal ? undefined : "floating-total-status"}>
          {totalDisplay}
        </strong>
      </aside>

      <div className="pricing-layout flow-layout">
        {isFlowSectionVisible("areas") && (
        <section className="pricing-panel selector-panel" style={flowSectionStyle("areas")} aria-labelledby="area-title">
          <div className="panel-title panel-title-with-action">
            <MapPinned size={24} aria-hidden="true" />
            <div>
              <p>{getFlowStepLabel("areas")}</p>
              <h2 id="area-title">{pricingContent.areaLabel[language]}</h2>
            </div>
            {renderFlowSectionActions("areas", pricingContent.areaLabel[language], "areas")}
          </div>

          {renderServiceAreaOptions("area")}
        </section>
        )}

        {showServiceTypes && isFlowSectionVisible("services") && (
          <section className="pricing-panel selector-panel" style={flowSectionStyle("services")} aria-labelledby="service-type-title">
            <div className="panel-title panel-title-with-action">
              <ListChecks size={24} aria-hidden="true" />
              <div>
                <p>{getFlowStepLabel("services")}</p>
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
                      [
                        "choice-button service-choice",
                        selectedServiceTypeId === serviceType.id ? "is-selected" : "",
                        !isContentAvailable(serviceType) ? "is-unavailable" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    type="button"
                    key={serviceType.id}
                    onClick={() => {
                      if (isContentAvailable(serviceType)) {
                        selectServiceType(serviceType.id);
                      }
                    }}
                    aria-pressed={selectedServiceTypeId === serviceType.id}
                    aria-disabled={!isContentAvailable(serviceType)}
                    data-tooltip={!isContentAvailable(serviceType) ? pricingContent.areaComingSoon[language] : undefined}
                    title={!isContentAvailable(serviceType) ? pricingContent.areaComingSoon[language] : undefined}
                  >
                    <span>{serviceType.name[language]}</span>
                    <small>
                      {isContentAvailable(serviceType)
                        ? pricingContent.availableNow[language]
                        : pricingContent.areaComingSoon[language]}
                    </small>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {showSchoolSelect && isFlowSectionVisible("schools") && (
          <section className="pricing-panel selector-panel" style={flowSectionStyle("schools")} aria-labelledby="school-title">
            <div className="panel-title panel-title-with-action">
              <School size={24} aria-hidden="true" />
              <div>
                <p>{getFlowStepLabel("schools")}</p>
                <h2 id="school-title">{pricingContent.schoolLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("schools", pricingContent.schoolLabel[language], "schools")}
            </div>

            <div className="option-grid school-options">
            {visibleGraduationSchools.map((school) => {
              const isSelected = selectedSchoolId === school.id;
              const isUnavailable = !isContentAvailable(school);

              return (
                <button
                  className={
                    [
                      "choice-button school-choice",
                      isSelected ? "is-selected" : "",
                      isUnavailable ? "is-unavailable" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                  type="button"
                  key={school.id}
                  onClick={() => {
                    if (!isUnavailable) {
                      selectSchool(school.id);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-disabled={isUnavailable}
                  data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                  title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                >
                    <span>{school.name[language]}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {showSceneTypes && isFlowSectionVisible("scenes") && (
          <section className="pricing-panel selector-panel" style={flowSectionStyle("scenes")} aria-labelledby="scene-type-title">
            <div className="panel-title panel-title-with-action">
              <Images size={24} aria-hidden="true" />
              <div>
                <p>{getFlowStepLabel("scenes")}</p>
                <h2 id="scene-type-title">{pricingContent.sceneTypeLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("scenes", pricingContent.sceneTypeLabel[language], "scenes")}
            </div>

            <div className="option-grid scene-options">
              {availableSceneTypes.map((sceneType) => {
                const isUnavailable = !isContentAvailable(sceneType);

                return (
                  <button
                    className={
                      [
                        "choice-button scene-choice",
                        selectedSceneTypeId === sceneType.id ? "is-selected" : "",
                        isUnavailable ? "is-unavailable" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    type="button"
                    key={sceneType.id}
                    onClick={() => {
                      if (!isUnavailable) {
                        selectSceneType(sceneType.id);
                      }
                    }}
                    aria-pressed={selectedSceneTypeId === sceneType.id}
                    aria-disabled={isUnavailable}
                    data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                    title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                  >
                    {renderOptionPreview(sceneType.previewImage, language)}
                    <span>{sceneType.name[language]}</span>
                    {renderDescriptionItems(sceneType.description, language)}
                  </button>
                );
              })}
            </div>

            <NotesInput
              idPrefix="school-scene"
              language={language}
              notes={sectionNotes.schoolScene}
              onChange={(notes) => updateNotes("schoolScene", notes)}
            />
          </section>
        )}

        {isStudioGraduation && isContentVisible(graduationStudioPackage) && isFlowSectionVisible("studioPackage") && (
          <section className="pricing-panel selector-panel" style={flowSectionStyle("studioPackage")} aria-labelledby="studio-package-title">
            <div className="panel-title compact-title panel-title-with-action">
              <Aperture size={24} aria-hidden="true" />
              <div>
                <p>{getFlowStepLabel("studioPackage")}</p>
                <h2 id="studio-package-title">{pricingContent.packageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("studioPackage", pricingContent.packageLabel[language], "packages")}
            </div>

            <div className="option-grid package-options">
              <div
                className={
                  isContentAvailable(graduationStudioPackage)
                    ? "choice-button package-choice is-selected"
                    : "choice-button package-choice is-unavailable"
                }
                data-tooltip={
                  !isContentAvailable(graduationStudioPackage)
                    ? pricingContent.areaComingSoon[language]
                    : undefined
                }
              >
                <span>{graduationStudioPackage.title[language]}</span>
                <strong className="package-price">{formatAud(graduationStudioPackage.priceAud)}</strong>
                <small>{pricingContent.packageDetailsLabel[language]}</small>
                {graduationStudioPackage.details[language].map((detail) => (
                        <span className="package-detail content-detail" key={detail}>
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {showGraduationPackages && selectedSceneType && isFlowSectionVisible("graduationPackage") && (
          <section className="pricing-panel selector-panel" style={flowSectionStyle("graduationPackage")} aria-labelledby="package-title">
            <div className="panel-title compact-title panel-title-with-action">
              <PackageCheck size={24} aria-hidden="true" />
              <div>
                <p>{getFlowStepLabel("graduationPackage")}</p>
                <h2 id="package-title">{pricingContent.packageLabel[language]}</h2>
              </div>
              {renderSpotGalleryButton()}
              {renderFlowSectionActions("graduationPackage", pricingContent.packageLabel[language], "packages")}
            </div>

            <p className="selection-context">{selectedSceneType.name[language]}</p>
            <p className="selection-context">{pricingContent.packageSpotNote[language]}</p>

            <div className="option-grid package-options">
              {availablePackages.map((graduationPackage) => {
                const isSelected = selectedPackageId === graduationPackage.id;
                const isUnavailable = !isContentAvailable(graduationPackage);

                return (
                  <button
                    className={
                      [
                        "choice-button package-choice",
                        isSelected ? "is-selected" : "",
                        isUnavailable ? "is-unavailable" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    type="button"
                    key={graduationPackage.id}
                    onClick={() => {
                      if (!isUnavailable) {
                        selectPackage(graduationPackage.id);
                      }
                    }}
                    aria-pressed={isSelected}
                    aria-disabled={isUnavailable}
                    data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                    title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                  >
                    <span>{graduationPackage.name[language]}</span>
                    <strong className="package-price">{formatAud(graduationPackage.priceAud)}</strong>
                    <small>{pricingContent.packageDetailsLabel[language]}</small>
                    {graduationPackage.details[language].map((detail) => (
                        <span className="package-detail content-detail" key={detail}>
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
          <section className="pricing-panel selector-panel" style={flowSectionStyle("registryPackage")} aria-labelledby="registry-package-title">
            <div className="panel-title compact-title panel-title-with-action">
              <HeartHandshake size={24} aria-hidden="true" />
              <div>
                <p>{getFlowStepLabel("registryPackage")}</p>
                <h2 id="registry-package-title">{pricingContent.registryPackageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("registryPackage", pricingContent.registryPackageLabel[language], "packages")}
            </div>

            <div className="option-grid package-options">
              {visibleRegistryPackages.map((registryPackage) => {
                const isSelected = selectedPackageId === registryPackage.id;
                const isUnavailable = !isContentAvailable(registryPackage);

                return (
                  <button
                    className={
                      [
                        "choice-button package-choice",
                        isSelected ? "is-selected" : "",
                        isUnavailable ? "is-unavailable" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    type="button"
                    key={registryPackage.id}
                    onClick={() => {
                      if (!isUnavailable) {
                        selectPackage(registryPackage.id);
                      }
                    }}
                    aria-pressed={isSelected}
                    aria-disabled={isUnavailable}
                    data-tooltip={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                    title={isUnavailable ? pricingContent.areaComingSoon[language] : undefined}
                  >
                    <span>{registryPackage.name[language]}</span>
                    <strong className="package-price">{formatAud(registryPackage.priceAud)}</strong>
                    <small>{pricingContent.packageDetailsLabel[language]}</small>
                    {registryPackage.details[language].map((detail) => (
                        <span className="package-detail content-detail" key={detail}>
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
          <section className="pricing-panel selector-panel" style={flowSectionStyle("idPhotoPackage")} aria-labelledby="id-photo-package-title">
            <div className="panel-title compact-title panel-title-with-action">
              <ScanFace size={24} aria-hidden="true" />
              <div>
                <p>{getFlowStepLabel("idPhotoPackage")}</p>
                <h2 id="id-photo-package-title">{pricingContent.packageLabel[language]}</h2>
              </div>
              {renderFlowSectionActions("idPhotoPackage", pricingContent.packageLabel[language], "packages")}
            </div>

            <div className="option-grid package-options">
              <div
                className={
                  isContentAvailable(idPhotoPackage)
                    ? "choice-button package-choice is-selected"
                    : "choice-button package-choice is-unavailable"
                }
                data-tooltip={
                  !isContentAvailable(idPhotoPackage)
                    ? pricingContent.areaComingSoon[language]
                    : undefined
                }
              >
                <span>{idPhotoPackage.title[language]}</span>
                <strong className="package-price">{formatAud(idPhotoPackage.priceAud)}</strong>
                <small>{pricingContent.packageDetailsLabel[language]}</small>
                {idPhotoPackage.details[language].map((detail) => (
                        <span className="package-detail content-detail" key={detail}>
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {isRegistryService && selectedRegistryPackage && isFlowSectionVisible("registryExtraLocations") && (
          <section className="pricing-panel selector-panel" style={flowSectionStyle("registryExtraLocations")} aria-labelledby="registry-extra-locations-title">
            <div className="panel-title compact-title panel-title-with-action">
              <MapPinPlus size={24} aria-hidden="true" />
              <div>
                <p>{getFlowStepLabel("registryExtraLocations")}</p>
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
            <section className="pricing-panel selector-panel add-on-intro-panel" style={flowSectionStyle("addOnsIntro")}>
              <div className="panel-title compact-title panel-title-with-action">
                <BadgePlus size={24} aria-hidden="true" />
                <div>
                  <p>{getFlowStepLabel("addOnsIntro", addOnsStepLabel)}</p>
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
                    getFlowStepLabel("makeup", "Step 06"),
                    WandSparkles,
                    graduationAddOns.makeup ?? []
                  )}

                  {renderAddOnSection(
                    "props",
                    pricingContent.propsLabel[language],
                    getFlowStepLabel("props", "Step 07"),
                    Gift,
                    availablePropsAddOns
                  )}
                </>
              ) : (
                <>
                  {renderAddOnSection(
                    "clothing",
                    pricingContent.clothingLabel[language],
                    getFlowStepLabel("clothing", "Step 06"),
                    Shirt,
                    graduationAddOns.clothing ?? []
                  )}

                  {renderAddOnSection(
                    "props",
                    pricingContent.propsLabel[language],
                    getFlowStepLabel("props", "Step 07"),
                    Gift,
                    availablePropsAddOns
                  )}

                  {renderAddOnSection(
                    "makeup",
                    pricingContent.makeupLabel[language],
                    getFlowStepLabel("makeup", "Step 08"),
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
                  getFlowStepLabel("registryStyling", "Step 05"),
                  WandSparkles,
                  registryAddOns.registryStyling ?? []
                )}

                {renderAddOnSection(
                  "registryProps",
                  pricingContent.propsLabel[language],
                  getFlowStepLabel("registryProps", "Step 06"),
                  Gift,
                  registryAddOns.registryProps ?? []
                )}

                {renderAddOnSection(
                  "registryClothing",
                  pricingContent.clothingLabel[language],
                  getFlowStepLabel("registryClothing", "Step 07"),
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
                  getFlowStepLabel("idPhotoClothing", "Step 04"),
                  Shirt,
                  idPhotoAddOns.idPhotoClothing ?? []
                )}

                {renderAddOnSection(
                  "idPhotoStyling",
                  pricingContent.makeupLabel[language],
                  getFlowStepLabel("idPhotoStyling", "Step 05"),
                  WandSparkles,
                  idPhotoAddOns.idPhotoStyling ?? []
                )}

                {renderAddOnSection(
                  "idPhotoProps",
                  pricingContent.propsLabel[language],
                  getFlowStepLabel("idPhotoProps", "Step 06"),
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
            initialServiceTypeId={editorContext.initialServiceTypeId}
            initialSchoolId={editorContext.initialSchoolId}
            initialSceneId={editorContext.initialSceneId}
            initialPackageScope={editorContext.initialPackageScope}
            initialPackageId={editorContext.initialPackageId}
            initialAddOnTarget={editorContext.initialAddOnTarget}
            initialAddOnGroup={editorContext.initialAddOnGroup}
            onClose={() => setIsEditorOpen(false)}
          onSave={(nextContent) => {
            onChange(nextContent);
            setIsEditorOpen(false);
          }}
        />
      )}

      {isSpotGalleryOpen && selectedSceneType && (
        <div
          className="studio-album-overlay"
          onClick={() => setIsSpotGalleryOpen(false)}
          role="presentation"
        >
          <div
            className="studio-album-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="graduation-spot-gallery-title"
            id="graduation-spot-gallery"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="studio-album-modal-header">
              <div>
                <p>{selectedSchool?.name[language] ?? pricingContent.sceneTypeLabel[language]}</p>
                <h3 id="graduation-spot-gallery-title">
                  {language === "zh" ? "所有打卡点" : "All photo spots"}
                </h3>
              </div>
              <button
                className="studio-album-close"
                type="button"
                onClick={() => setIsSpotGalleryOpen(false)}
                aria-label={language === "zh" ? "关闭打卡点" : "Close photo spots"}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <p className="spot-gallery-modal-context">{selectedSceneType.name[language]}</p>

            <div className="spot-gallery-modal-grid">
              {spotGalleryImages.map((image, imageIndex) => (
                <figure className="studio-album-modal-photo" key={`spot-photo-${imageIndex}`}>
                  <img src={image.src} alt={image.alt[language]} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
