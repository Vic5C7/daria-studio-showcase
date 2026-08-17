import { ArrowDown, ArrowUp, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  cloneEditableContent,
  defaultPricingFlowLayouts,
  makeId,
  placeholderImage,
  type EditableFixedPackage,
  type EditablePricingContent,
  type EditableServiceType,
  type PricingFlowKind,
  type PricingFlowSectionKey
} from "../data/editableContent";
import type {
  GalleryImage,
  GraduationAddOn,
  GraduationPackage,
  GraduationSceneType,
  IdPhotoAddOn,
  Language,
  LocalizedList,
  RegistryAddOn,
  RegistryPackage,
  ServiceKind
} from "../data/siteContent";

type PricingEditorProps = {
  language: Language;
  content: EditablePricingContent;
  initialTab?: PricingEditorTab;
  visibleTabs?: PricingEditorTab[];
  initialAreaId?: string;
  initialServiceTypeId?: string;
  initialSchoolId?: string;
  initialSceneId?: string;
  initialPackageScope?: PackageScope;
  initialPackageId?: string;
  initialAddOnTarget?: AddOnTarget;
  initialAddOnGroup?: NormalizedAddOnGroup;
  onClose: () => void;
  onSave: (content: EditablePricingContent) => void;
};

export type PricingEditorTab = "areas" | "services" | "schools" | "scenes" | "packages" | "addons" | "flow" | "copy";
export type PackageScope = "graduation" | "registry" | "idPhoto" | "studio";
export type AddOnTarget = "graduation" | "graduationStudio" | "registry" | "idPhoto";
type NormalizedAddOnGroup = "clothing" | "props" | "makeup";
type AddOnOption = GraduationAddOn | RegistryAddOn | IdPhotoAddOn;
type PublishableItem = {
  isAvailable?: boolean;
  isVisible?: boolean;
};
type PublishableItemUpdate = Partial<PublishableItem>;

const serviceKindOptions: Array<{ id: ServiceKind; zh: string; en: string }> = [
  { id: "graduation", zh: "毕业照流程", en: "Graduation flow" },
  { id: "registry", zh: "注册结婚流程", en: "Registry flow" },
  { id: "id-photo", zh: "证件照流程", en: "ID photo flow" },
  { id: "other", zh: "暂不进入套餐流程", en: "No package flow" }
];

const addOnGroupLabels: Record<NormalizedAddOnGroup, { zh: string; en: string }> = {
  clothing: { zh: "服装", en: "Clothing" },
  props: { zh: "道具", en: "Props" },
  makeup: { zh: "妆造", en: "Makeup" }
};

const pricingFlowKindLabels: Record<PricingFlowKind, { zh: string; en: string }> = {
  graduation: { zh: "毕业照流程", en: "Graduation flow" },
  registry: { zh: "注册结婚流程", en: "Registry flow" },
  idPhoto: { zh: "证件照流程", en: "ID photo flow" }
};

const pricingFlowSectionLabels: Record<PricingFlowSectionKey, { zh: string; en: string }> = {
  areas: { zh: "服务地区", en: "Service areas" },
  services: { zh: "服务类型", en: "Service types" },
  schools: { zh: "学校", en: "Schools" },
  scenes: { zh: "场景", en: "Scenes" },
  studioPackage: { zh: "棚拍套餐", en: "Studio package" },
  graduationPackage: { zh: "毕业照套餐", en: "Graduation packages" },
  registryPackage: { zh: "注册结婚套餐", en: "Registry packages" },
  idPhotoPackage: { zh: "证件照套餐", en: "ID photo package" },
  registryExtraLocations: { zh: "额外地点", en: "Extra locations" },
  addOnsIntro: { zh: "加购项说明", en: "Add-on introduction" },
  clothing: { zh: "毕业照服装", en: "Graduation clothing" },
  props: { zh: "毕业照道具", en: "Graduation props" },
  makeup: { zh: "毕业照妆造", en: "Graduation styling" },
  registryStyling: { zh: "注册结婚妆造", en: "Registry styling" },
  registryProps: { zh: "注册结婚道具", en: "Registry props" },
  registryClothing: { zh: "注册结婚服装", en: "Registry clothing" },
  idPhotoClothing: { zh: "证件照服装", en: "ID photo clothing" },
  idPhotoStyling: { zh: "证件照妆造", en: "ID photo styling" },
  idPhotoProps: { zh: "证件照道具", en: "ID photo props" }
};

function label(language: Language, zh: string, en: string) {
  return language === "zh" ? zh : en;
}

function asPrice(value: string) {
  return Math.max(0, Number(value) || 0);
}

function withImage(image?: GalleryImage): GalleryImage {
  return image ?? cloneEditableContent(placeholderImage);
}

function updateLocalizedList(
  list: LocalizedList,
  field: Language,
  index: number,
  value: string
): LocalizedList {
  const nextValues = [...list[field]];
  nextValues[index] = value;
  return {
    ...list,
    [field]: nextValues
  };
}

function addDetail(list: LocalizedList): LocalizedList {
  return {
    zh: [...list.zh, ""],
    en: [...list.en, ""]
  };
}

function deleteDetail(list: LocalizedList, index: number): LocalizedList {
  return {
    zh: list.zh.filter((_, detailIndex) => detailIndex !== index),
    en: list.en.filter((_, detailIndex) => detailIndex !== index)
  };
}

function createLocalizedName(zh: string, en: string) {
  return { zh, en };
}

function createPackage(sceneTypeId: string): GraduationPackage {
  return {
    id: makeId("package"),
    sceneTypeId,
    name: createLocalizedName("新套餐", "New Package"),
    priceAud: 0,
    details: {
      zh: [""],
      en: [""]
    },
    isAvailable: false,
    isVisible: true
  };
}

function createAddOn(includePreview = true): AddOnOption {
  return {
    id: makeId("addon"),
    name: createLocalizedName("新加购项", "New Add-on"),
    priceAud: 0,
    description: { zh: [], en: [] },
    ...(includePreview ? { previewImage: cloneEditableContent(placeholderImage) } : {}),
    isAvailable: false,
    isVisible: true
  };
}

function PublishControls({
  language,
  item,
  onChange
}: {
  language: Language;
  item: PublishableItem;
  onChange: (updates: PublishableItemUpdate) => void;
}) {
  const isAvailable = item.isAvailable !== false;
  const isVisible = item.isVisible !== false;

  return (
    <div className="admin-publish-controls">
      <label className="admin-check-field">
        <input
          type="checkbox"
          checked={isAvailable}
          disabled={!isVisible}
          onChange={(event) => onChange({ isAvailable: event.target.checked })}
        />
        <span>{label(language, "上架", "Listed")}</span>
      </label>
      <label className="admin-check-field">
        <input
          type="checkbox"
          checked={!isVisible}
          onChange={(event) =>
            onChange({
              isVisible: !event.target.checked,
              isAvailable: event.target.checked ? false : isAvailable
            })
          }
        />
        <span>{label(language, "隐藏", "Hidden")}</span>
      </label>
    </div>
  );
}

const allPricingTabs: Array<[PricingEditorTab, { zh: string; en: string }]> = [
  ["areas", { zh: "服务地区", en: "Areas" }],
  ["services", { zh: "服务类型", en: "Services" }],
  ["schools", { zh: "学校", en: "Schools" }],
  ["scenes", { zh: "场景", en: "Scenes" }],
  ["packages", { zh: "套餐", en: "Packages" }],
  ["addons", { zh: "加购项", en: "Add-ons" }],
  ["flow", { zh: "流程栏", en: "Flow" }],
  ["copy", { zh: "文案", en: "Copy" }]
];

function getExistingId<T extends { id: string }>(items: T[], preferredId: string | undefined) {
  return items.some((item) => item.id === preferredId) ? preferredId ?? "" : items[0]?.id ?? "";
}

export function PricingEditor({
  language,
  content,
  initialTab = "areas",
  visibleTabs,
  initialAreaId,
  initialServiceTypeId,
  initialSchoolId,
  initialSceneId,
  initialPackageScope = "graduation",
  initialPackageId,
  initialAddOnTarget = "graduation",
  initialAddOnGroup = "clothing",
  onClose,
  onSave
}: PricingEditorProps) {
  const [draft, setDraft] = useState<EditablePricingContent>(() => cloneEditableContent(content));
  const availableTabs = allPricingTabs.filter(
    ([tabId]) => !visibleTabs || visibleTabs.includes(tabId)
  );
  const isSingleTabEditor = availableTabs.length === 1;
  const [activeTab, setActiveTab] = useState<PricingEditorTab>(
    availableTabs.some(([tabId]) => tabId === initialTab) ? initialTab : availableTabs[0]?.[0] ?? "areas"
  );
  const activeTabLabel = availableTabs.find(([tabId]) => tabId === activeTab)?.[1] ?? {
    zh: "价格配置",
    en: "Pricing"
  };
  const [selectedFlowKind, setSelectedFlowKind] = useState<PricingFlowKind>("graduation");
  const [selectedAreaId, setSelectedAreaId] = useState(
    getExistingId(draft.serviceAreas, initialAreaId)
  );
  const [focusedServiceTypeId] = useState(initialServiceTypeId ?? "");
  const [selectedSchoolId, setSelectedSchoolId] = useState(
    getExistingId(draft.graduationSchools, initialSchoolId)
  );
  const [selectedAddOnSchoolId, setSelectedAddOnSchoolId] = useState(
    getExistingId(draft.graduationSchools, initialSchoolId)
  );
  const [selectedSceneId, setSelectedSceneId] = useState(
    draft.sceneTypesBySchool[getExistingId(draft.graduationSchools, initialSchoolId)]?.some(
      (scene) => scene.id === initialSceneId
    )
      ? initialSceneId ?? ""
      : draft.sceneTypesBySchool[getExistingId(draft.graduationSchools, initialSchoolId)]?.[0]?.id ?? ""
  );
  const [packageScope, setPackageScope] = useState<PackageScope>(initialPackageScope);
  const [focusedPackageId] = useState(initialPackageId ?? "");
  const [addOnTarget, setAddOnTarget] = useState<AddOnTarget>(initialAddOnTarget);
  const [addOnGroup, setAddOnGroup] = useState<NormalizedAddOnGroup>(initialAddOnGroup);

  const selectedSchoolScenes = selectedSchoolId ? draft.sceneTypesBySchool[selectedSchoolId] ?? [] : [];
  const selectedAreaServiceTypes = selectedAreaId ? draft.serviceTypesByArea[selectedAreaId] ?? [] : [];
  const selectedGraduationPackages = selectedSceneId ? draft.graduationPackages[selectedSceneId] ?? [] : [];
  const isSelectedStudioScene = selectedSceneId === "graduation-studio";
  const isContextualServiceEditor =
    visibleTabs?.length === 1 && visibleTabs[0] === "services" && Boolean(initialAreaId);
  const selectedArea = draft.serviceAreas.find((area) => area.id === selectedAreaId);
  const selectedFlowLayout =
    draft.pricingFlowLayouts?.[selectedFlowKind] ?? defaultPricingFlowLayouts[selectedFlowKind];
  const allFlowSections = defaultPricingFlowLayouts[selectedFlowKind].order;

  const updateAreaName = (areaId: string, field: Language, value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceAreas: currentDraft.serviceAreas.map((area) =>
        area.id === areaId ? { ...area, name: { ...area.name, [field]: value } } : area
      )
    }));
  };

  const moveFlowSection = (sectionIndex: number, direction: -1 | 1) => {
    setDraft((currentDraft) => {
      const layout = currentDraft.pricingFlowLayouts[selectedFlowKind] ?? defaultPricingFlowLayouts[selectedFlowKind];
      const nextIndex = sectionIndex + direction;
      if (nextIndex < 0 || nextIndex >= layout.order.length) {
        return currentDraft;
      }

      const order = [...layout.order];
      [order[sectionIndex], order[nextIndex]] = [order[nextIndex], order[sectionIndex]];
      return {
        ...currentDraft,
        pricingFlowLayouts: {
          ...currentDraft.pricingFlowLayouts,
          [selectedFlowKind]: { ...layout, order }
        }
      };
    });
  };

  const setFlowSectionHidden = (sectionKey: PricingFlowSectionKey, hidden: boolean) => {
    setDraft((currentDraft) => {
      const layout = currentDraft.pricingFlowLayouts[selectedFlowKind] ?? defaultPricingFlowLayouts[selectedFlowKind];
      return {
        ...currentDraft,
        pricingFlowLayouts: {
          ...currentDraft.pricingFlowLayouts,
          [selectedFlowKind]: {
            ...layout,
            hidden: hidden
              ? layout.hidden.includes(sectionKey)
                ? layout.hidden
                : [...layout.hidden, sectionKey]
              : layout.hidden.filter((hiddenSection) => hiddenSection !== sectionKey)
          }
        }
      };
    });
  };

  const restoreFlowSection = (sectionKey: PricingFlowSectionKey) => {
    setDraft((currentDraft) => {
      const layout = currentDraft.pricingFlowLayouts[selectedFlowKind] ?? defaultPricingFlowLayouts[selectedFlowKind];
      return {
        ...currentDraft,
        pricingFlowLayouts: {
          ...currentDraft.pricingFlowLayouts,
          [selectedFlowKind]: {
            order: layout.order.includes(sectionKey) ? layout.order : [...layout.order, sectionKey],
            hidden: layout.hidden.filter((hiddenSection) => hiddenSection !== sectionKey)
          }
        }
      };
    });
  };

  const updateArea = (areaId: string, updater: (area: (typeof draft.serviceAreas)[number]) => (typeof draft.serviceAreas)[number]) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceAreas: currentDraft.serviceAreas.map((area) =>
        area.id === areaId ? updater(area) : area
      )
    }));
  };

  const moveArea = (areaId: string, direction: -1 | 1) => {
    setDraft((currentDraft) => {
      const areaIndex = currentDraft.serviceAreas.findIndex((area) => area.id === areaId);
      const nextIndex = areaIndex + direction;

      if (areaIndex < 0 || nextIndex < 0 || nextIndex >= currentDraft.serviceAreas.length) {
        return currentDraft;
      }

      const serviceAreas = [...currentDraft.serviceAreas];
      [serviceAreas[areaIndex], serviceAreas[nextIndex]] = [serviceAreas[nextIndex], serviceAreas[areaIndex]];

      return {
        ...currentDraft,
        serviceAreas
      };
    });
  };

  const addArea = () => {
    const id = makeId("area");
    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceAreas: [
        ...currentDraft.serviceAreas,
        {
          id,
          name: createLocalizedName("新地区", "New Area"),
          isAvailable: false,
          isVisible: true
        }
      ],
      serviceTypesByArea: {
        ...currentDraft.serviceTypesByArea,
        [id]: []
      }
    }));
    setSelectedAreaId(id);
  };

  const deleteArea = (areaId: string) => {
    const area = draft.serviceAreas.find((currentArea) => currentArea.id === areaId);
    const confirmed = window.confirm(
      label(language, `确定删除「${area?.name.zh ?? "地区"}」及其服务类型吗？`, `Delete "${area?.name.en ?? "area"}" and its service types?`)
    );

    if (!confirmed) {
      return;
    }

    setDraft((currentDraft) => {
      const nextAreas = currentDraft.serviceAreas.filter((currentArea) => currentArea.id !== areaId);
      const nextServiceTypesByArea = { ...currentDraft.serviceTypesByArea };
      delete nextServiceTypesByArea[areaId];
      setSelectedAreaId(nextAreas[0]?.id ?? "");

      return {
        ...currentDraft,
        serviceAreas: nextAreas,
        serviceTypesByArea: nextServiceTypesByArea
      };
    });
  };

  const addServiceType = () => {
    if (!selectedAreaId) {
      return;
    }

    const serviceType: EditableServiceType = {
      id: makeId("service"),
      name: createLocalizedName("新服务类型", "New Service Type"),
      isAvailable: true,
      kind: "other"
    };

    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceTypesByArea: {
        ...currentDraft.serviceTypesByArea,
        [selectedAreaId]: [...(currentDraft.serviceTypesByArea[selectedAreaId] ?? []), serviceType]
      }
    }));
  };

  const updateServiceType = (
    serviceTypeId: string,
    updater: (serviceType: EditableServiceType) => EditableServiceType
  ) => {
    if (!selectedAreaId) {
      return;
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceTypesByArea: {
        ...currentDraft.serviceTypesByArea,
        [selectedAreaId]: (currentDraft.serviceTypesByArea[selectedAreaId] ?? []).map((serviceType) =>
          serviceType.id === serviceTypeId ? updater(serviceType) : serviceType
        )
      }
    }));
  };

  const deleteServiceType = (serviceTypeId: string) => {
    if (!selectedAreaId) {
      return;
    }

    const serviceType = selectedAreaServiceTypes.find((currentServiceType) => currentServiceType.id === serviceTypeId);
    const confirmed = window.confirm(
      label(language, `确定删除「${serviceType?.name.zh ?? "服务类型"}」吗？`, `Delete "${serviceType?.name.en ?? "service type"}"?`)
    );

    if (!confirmed) {
      return;
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceTypesByArea: {
        ...currentDraft.serviceTypesByArea,
        [selectedAreaId]: (currentDraft.serviceTypesByArea[selectedAreaId] ?? []).filter(
          (currentServiceType) => currentServiceType.id !== serviceTypeId
        )
      }
    }));
  };

  const moveServiceType = (serviceTypeIndex: number, direction: -1 | 1) => {
    if (!selectedAreaId) {
      return;
    }

    setDraft((currentDraft) => {
      const serviceTypes = [...(currentDraft.serviceTypesByArea[selectedAreaId] ?? [])];
      const nextIndex = serviceTypeIndex + direction;

      if (nextIndex < 0 || nextIndex >= serviceTypes.length) {
        return currentDraft;
      }

      [serviceTypes[serviceTypeIndex], serviceTypes[nextIndex]] = [
        serviceTypes[nextIndex],
        serviceTypes[serviceTypeIndex]
      ];

      return {
        ...currentDraft,
        serviceTypesByArea: {
          ...currentDraft.serviceTypesByArea,
          [selectedAreaId]: serviceTypes
        }
      };
    });
  };

  const moveSchool = (schoolIndex: number, direction: -1 | 1) => {
    setDraft((currentDraft) => {
      const nextIndex = schoolIndex + direction;
      if (nextIndex < 0 || nextIndex >= currentDraft.graduationSchools.length) {
        return currentDraft;
      }

      const graduationSchools = [...currentDraft.graduationSchools];
      [graduationSchools[schoolIndex], graduationSchools[nextIndex]] = [
        graduationSchools[nextIndex],
        graduationSchools[schoolIndex]
      ];
      return { ...currentDraft, graduationSchools };
    });
  };

  const addSchool = () => {
    const id = makeId("school");
    setDraft((currentDraft) => ({
      ...currentDraft,
      graduationSchools: [
        ...currentDraft.graduationSchools,
        {
          id,
          name: createLocalizedName("新学校", "New School"),
          isAvailable: false,
          isVisible: true
        }
      ],
      sceneTypesBySchool: {
        ...currentDraft.sceneTypesBySchool,
        [id]: []
      },
      graduationAddOnsBySchool: {
        ...currentDraft.graduationAddOnsBySchool,
        [id]: {
          clothing: [],
          props: [],
          makeup: []
        }
      }
    }));
    setSelectedSchoolId(id);
    setSelectedSceneId("");
  };

  const updateSchoolName = (schoolId: string, field: Language, value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      graduationSchools: currentDraft.graduationSchools.map((school) =>
        school.id === schoolId ? { ...school, name: { ...school.name, [field]: value } } : school
      )
    }));
  };

  const deleteSchool = (schoolId: string) => {
    const school = draft.graduationSchools.find((currentSchool) => currentSchool.id === schoolId);
    const confirmed = window.confirm(
      label(language, `确定删除「${school?.name.zh ?? "学校"}」及其场景吗？`, `Delete "${school?.name.en ?? "school"}" and its scenes?`)
    );

    if (!confirmed) {
      return;
    }

    setDraft((currentDraft) => {
      const sceneIds = (currentDraft.sceneTypesBySchool[schoolId] ?? []).map((scene) => scene.id);
      const nextPackages = { ...currentDraft.graduationPackages };
      sceneIds.forEach((sceneId) => delete nextPackages[sceneId]);
      const nextScenes = { ...currentDraft.sceneTypesBySchool };
      delete nextScenes[schoolId];
      const nextGraduationAddOnsBySchool = { ...currentDraft.graduationAddOnsBySchool };
      delete nextGraduationAddOnsBySchool[schoolId];
      const nextSchools = currentDraft.graduationSchools.filter((schoolOption) => schoolOption.id !== schoolId);
      setSelectedSchoolId(nextSchools[0]?.id ?? "");
      setSelectedAddOnSchoolId((currentAddOnSchoolId) =>
        currentAddOnSchoolId === schoolId ? nextSchools[0]?.id ?? "" : currentAddOnSchoolId
      );
      setSelectedSceneId(nextScenes[nextSchools[0]?.id ?? ""]?.[0]?.id ?? "");

      return {
        ...currentDraft,
        graduationSchools: nextSchools,
        sceneTypesBySchool: nextScenes,
        graduationPackages: nextPackages,
        graduationAddOnsBySchool: nextGraduationAddOnsBySchool
      };
    });
  };

  const addScene = () => {
    if (!selectedSchoolId) {
      return;
    }

    const id = makeId("scene");
    const scene: GraduationSceneType = {
      id,
      name: createLocalizedName("新场景", "New Scene"),
      description: {
        zh: ["场景描述"],
        en: ["Scene description"]
      },
      previewImage: cloneEditableContent(placeholderImage),
      isAvailable: false,
      isVisible: true
    };

    setDraft((currentDraft) => ({
      ...currentDraft,
      sceneTypesBySchool: {
        ...currentDraft.sceneTypesBySchool,
        [selectedSchoolId]: [...(currentDraft.sceneTypesBySchool[selectedSchoolId] ?? []), scene]
      },
      graduationPackages: {
        ...currentDraft.graduationPackages,
        [id]: []
      }
    }));
    setSelectedSceneId(id);
  };

  const updateScene = (
    sceneId: string,
    updater: (scene: GraduationSceneType) => GraduationSceneType
  ) => {
    if (!selectedSchoolId) {
      return;
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      sceneTypesBySchool: {
        ...currentDraft.sceneTypesBySchool,
        [selectedSchoolId]: (currentDraft.sceneTypesBySchool[selectedSchoolId] ?? []).map((scene) =>
          scene.id === sceneId ? updater(scene) : scene
        )
      }
    }));
  };

  const deleteScene = (sceneId: string) => {
    if (!selectedSchoolId) {
      return;
    }

    const scene = selectedSchoolScenes.find((currentScene) => currentScene.id === sceneId);
    const confirmed = window.confirm(
      label(language, `确定删除「${scene?.name.zh ?? "场景"}」及其套餐吗？`, `Delete "${scene?.name.en ?? "scene"}" and its packages?`)
    );

    if (!confirmed) {
      return;
    }

    setDraft((currentDraft) => {
      const nextScenes = (currentDraft.sceneTypesBySchool[selectedSchoolId] ?? []).filter(
        (currentScene) => currentScene.id !== sceneId
      );
      const nextPackages = { ...currentDraft.graduationPackages };
      delete nextPackages[sceneId];
      setSelectedSceneId(nextScenes[0]?.id ?? "");

      return {
        ...currentDraft,
        sceneTypesBySchool: {
          ...currentDraft.sceneTypesBySchool,
          [selectedSchoolId]: nextScenes
        },
        graduationPackages: nextPackages
      };
    });
  };

  const moveScene = (sceneIndex: number, direction: -1 | 1) => {
    if (!selectedSchoolId) {
      return;
    }

    setDraft((currentDraft) => {
      const scenes = [...(currentDraft.sceneTypesBySchool[selectedSchoolId] ?? [])];
      const nextIndex = sceneIndex + direction;
      if (nextIndex < 0 || nextIndex >= scenes.length) {
        return currentDraft;
      }

      [scenes[sceneIndex], scenes[nextIndex]] = [scenes[nextIndex], scenes[sceneIndex]];
      return {
        ...currentDraft,
        sceneTypesBySchool: {
          ...currentDraft.sceneTypesBySchool,
          [selectedSchoolId]: scenes
        }
      };
    });
  };

  const addGraduationPackage = () => {
    if (!selectedSceneId) {
      return;
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      graduationPackages: {
        ...currentDraft.graduationPackages,
        [selectedSceneId]: [
          ...(currentDraft.graduationPackages[selectedSceneId] ?? []),
          createPackage(selectedSceneId)
        ]
      }
    }));
  };

  const updateGraduationPackage = (
    packageId: string,
    updater: (graduationPackage: GraduationPackage) => GraduationPackage
  ) => {
    if (!selectedSceneId) {
      return;
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      graduationPackages: {
        ...currentDraft.graduationPackages,
        [selectedSceneId]: (currentDraft.graduationPackages[selectedSceneId] ?? []).map((graduationPackage) =>
          graduationPackage.id === packageId ? updater(graduationPackage) : graduationPackage
        )
      }
    }));
  };

  const deleteGraduationPackage = (packageId: string) => {
    if (!selectedSceneId) {
      return;
    }

    const confirmed = window.confirm(label(language, "确定删除这个毕业照套餐吗？", "Delete this graduation package?"));
    if (!confirmed) {
      return;
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      graduationPackages: {
        ...currentDraft.graduationPackages,
        [selectedSceneId]: (currentDraft.graduationPackages[selectedSceneId] ?? []).filter(
          (graduationPackage) => graduationPackage.id !== packageId
        )
      }
    }));
  };

  const moveGraduationPackage = (packageIndex: number, direction: -1 | 1) => {
    if (!selectedSceneId) {
      return;
    }

    setDraft((currentDraft) => {
      const packages = [...(currentDraft.graduationPackages[selectedSceneId] ?? [])];
      const nextIndex = packageIndex + direction;
      if (nextIndex < 0 || nextIndex >= packages.length) {
        return currentDraft;
      }

      [packages[packageIndex], packages[nextIndex]] = [packages[nextIndex], packages[packageIndex]];
      return {
        ...currentDraft,
        graduationPackages: {
          ...currentDraft.graduationPackages,
          [selectedSceneId]: packages
        }
      };
    });
  };

  const addRegistryPackage = () => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      registryPackages: [
        ...currentDraft.registryPackages,
        {
          id: makeId("package"),
          name: createLocalizedName("新套餐", "New Package"),
          priceAud: 0,
          details: { zh: [""], en: [""] },
          isAvailable: false,
          isVisible: true
        }
      ]
    }));
  };

  const updateRegistryPackage = (
    packageId: string,
    updater: (registryPackage: RegistryPackage) => RegistryPackage
  ) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      registryPackages: currentDraft.registryPackages.map((registryPackage) =>
        registryPackage.id === packageId ? updater(registryPackage) : registryPackage
      )
    }));
  };

  const deleteRegistryPackage = (packageId: string) => {
    const confirmed = window.confirm(label(language, "确定删除这个注册结婚套餐吗？", "Delete this registry package?"));
    if (!confirmed) {
      return;
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      registryPackages: currentDraft.registryPackages.filter((registryPackage) => registryPackage.id !== packageId)
    }));
  };

  const moveRegistryPackage = (packageIndex: number, direction: -1 | 1) => {
    setDraft((currentDraft) => {
      const nextIndex = packageIndex + direction;
      if (nextIndex < 0 || nextIndex >= currentDraft.registryPackages.length) {
        return currentDraft;
      }

      const registryPackages = [...currentDraft.registryPackages];
      [registryPackages[packageIndex], registryPackages[nextIndex]] = [
        registryPackages[nextIndex],
        registryPackages[packageIndex]
      ];
      return { ...currentDraft, registryPackages };
    });
  };

  const updateFixedPackage = (
    packageKey: "idPhotoPackage" | "graduationStudioPackage",
    updater: (fixedPackage: EditableFixedPackage) => EditableFixedPackage
  ) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [packageKey]: updater(currentDraft[packageKey])
    }));
  };

  const updatePricingCopy = (copyKey: keyof EditablePricingContent["pricingCopy"], field: Language, value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      pricingCopy: {
        ...currentDraft.pricingCopy,
        [copyKey]: {
          ...currentDraft.pricingCopy[copyKey],
          [field]: value
        }
      }
    }));
  };

  const getAddOns = (): AddOnOption[] => {
    if (addOnTarget === "graduationStudio") {
      return draft.graduationStudioProps;
    }

    if (addOnTarget === "graduation") {
      return (
        draft.graduationAddOnsBySchool[selectedAddOnSchoolId]?.[addOnGroup] ??
        draft.graduationAddOns[addOnGroup] ??
        []
      );
    }

    if (addOnTarget === "registry") {
      const groupKey =
        addOnGroup === "clothing"
          ? "registryClothing"
          : addOnGroup === "props"
            ? "registryProps"
            : "registryStyling";
      return draft.registryAddOns[groupKey] ?? [];
    }

    const groupKey =
      addOnGroup === "clothing"
        ? "idPhotoClothing"
        : addOnGroup === "props"
          ? "idPhotoProps"
          : "idPhotoStyling";
    return draft.idPhotoAddOns[groupKey] ?? [];
  };

  const setAddOns = (nextAddOns: AddOnOption[]) => {
    setDraft((currentDraft) => {
      if (addOnTarget === "graduationStudio") {
        return {
          ...currentDraft,
          graduationStudioProps: nextAddOns as GraduationAddOn[]
        };
      }

      if (addOnTarget === "graduation") {
        return {
          ...currentDraft,
          graduationAddOnsBySchool: {
            ...currentDraft.graduationAddOnsBySchool,
            [selectedAddOnSchoolId]: {
              ...(currentDraft.graduationAddOnsBySchool[selectedAddOnSchoolId] ?? {
                clothing: [],
                props: [],
                makeup: []
              }),
              [addOnGroup]: nextAddOns as GraduationAddOn[]
            }
          }
        };
      }

      if (addOnTarget === "registry") {
        const groupKey =
          addOnGroup === "clothing"
            ? "registryClothing"
            : addOnGroup === "props"
              ? "registryProps"
              : "registryStyling";
        return {
          ...currentDraft,
          registryAddOns: {
            ...currentDraft.registryAddOns,
            [groupKey]: nextAddOns as RegistryAddOn[]
          }
        };
      }

      const groupKey =
        addOnGroup === "clothing"
          ? "idPhotoClothing"
          : addOnGroup === "props"
            ? "idPhotoProps"
            : "idPhotoStyling";
      return {
        ...currentDraft,
        idPhotoAddOns: {
          ...currentDraft.idPhotoAddOns,
          [groupKey]: nextAddOns as IdPhotoAddOn[]
        }
      };
    });
  };

  const addAddOn = () => {
    setAddOns([...getAddOns(), createAddOn(addOnGroup !== "makeup")]);
  };

  const updateAddOn = (addOnId: string, updater: (addOn: AddOnOption) => AddOnOption) => {
    setAddOns(getAddOns().map((addOn) => (addOn.id === addOnId ? updater(addOn) : addOn)));
  };

  const moveAddOn = (addOnIndex: number, direction: -1 | 1) => {
    const addOns = getAddOns();
    const nextIndex = addOnIndex + direction;
    if (nextIndex < 0 || nextIndex >= addOns.length) {
      return;
    }

    const nextAddOns = [...addOns];
    [nextAddOns[addOnIndex], nextAddOns[nextIndex]] = [nextAddOns[nextIndex], nextAddOns[addOnIndex]];
    setAddOns(nextAddOns);
  };

  const deleteAddOn = (addOnId: string) => {
    const confirmed = window.confirm(label(language, "确定删除这个加购项吗？", "Delete this add-on?"));
    if (!confirmed) {
      return;
    }

    setAddOns(getAddOns().filter((addOn) => addOn.id !== addOnId));
  };

  const renderLocalizedNameFields = (
    zhValue: string,
    enValue: string,
    onZhChange: (value: string) => void,
    onEnChange: (value: string) => void
  ) => (
    <>
      <label>
        <span>中文名称</span>
        <input value={zhValue} onChange={(event) => onZhChange(event.target.value)} required />
      </label>
      <label>
        <span>English name</span>
        <input value={enValue} onChange={(event) => onEnChange(event.target.value)} required />
      </label>
    </>
  );

  const renderLocalizedListFields = (
    details: LocalizedList,
    onChange: (details: LocalizedList) => void,
    copy = {
      title: { zh: "详情条目", en: "Details" },
      zhHeader: { zh: "中文详情", en: "Chinese detail" },
      enHeader: { zh: "英文详情", en: "English detail" },
      zhPlaceholder: { zh: "中文详情", en: "Chinese detail" },
      enPlaceholder: { zh: "英文详情", en: "English detail" }
    }
  ) => {
    const detailCount = Math.max(details.zh.length, details.en.length);

    return (
      <div className="admin-detail-list">
        <div className="admin-list-heading">
          <span>{copy.title[language]}</span>
          <button type="button" onClick={() => onChange(addDetail(details))}>
            <Plus size={15} aria-hidden="true" />
            <span>{label(language, "添加", "Add")}</span>
          </button>
        </div>
        <div className="admin-detail-row admin-detail-row-heading">
          <span>{copy.zhHeader[language]}</span>
          <span>{copy.enHeader[language]}</span>
          <span aria-hidden="true" />
        </div>
        {Array.from({ length: detailCount }).map((_, detailIndex) => (
          <div className="admin-detail-row" key={detailIndex}>
            <input
              value={details.zh[detailIndex] ?? ""}
              placeholder={copy.zhPlaceholder[language]}
              onChange={(event) =>
                onChange(updateLocalizedList(details, "zh", detailIndex, event.target.value))
              }
            />
            <input
              value={details.en[detailIndex] ?? ""}
              placeholder={copy.enPlaceholder[language]}
              onChange={(event) =>
                onChange(updateLocalizedList(details, "en", detailIndex, event.target.value))
              }
            />
            <button type="button" onClick={() => onChange(deleteDetail(details, detailIndex))}>
              <Trash2 size={15} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderPackageCard = (
    packageItem: GraduationPackage | RegistryPackage,
    updatePackage: (updater: (packageItem: any) => any) => void,
    deletePackage: () => void,
    movePackage: (direction: -1 | 1) => void,
    packageIndex: number,
    packageCount: number,
    isContextTarget = false
  ) => (
    <div
      className={isContextTarget ? "admin-edit-card is-context-target" : "admin-edit-card"}
      key={packageItem.id}
    >
      <div className="admin-card-actions">
        <button
          className="admin-card-order-button"
          type="button"
          onClick={() => movePackage(-1)}
          disabled={packageIndex === 0}
          aria-label={label(language, "上移套餐", "Move package up")}
          title={label(language, "上移套餐", "Move package up")}
        >
          <ArrowUp size={16} aria-hidden="true" />
        </button>
        <button
          className="admin-card-order-button"
          type="button"
          onClick={() => movePackage(1)}
          disabled={packageIndex === packageCount - 1}
          aria-label={label(language, "下移套餐", "Move package down")}
          title={label(language, "下移套餐", "Move package down")}
        >
          <ArrowDown size={16} aria-hidden="true" />
        </button>
        <button className="admin-danger-button admin-card-delete-button" type="button" onClick={deletePackage}>
          <Trash2 size={16} aria-hidden="true" />
          <span>{label(language, "删除套餐", "Delete Package")}</span>
        </button>
      </div>
      <div className="admin-edit-row">
        {renderLocalizedNameFields(
          packageItem.name.zh,
          packageItem.name.en,
          (value) => updatePackage((currentPackage) => ({ ...currentPackage, name: { ...currentPackage.name, zh: value } })),
          (value) => updatePackage((currentPackage) => ({ ...currentPackage, name: { ...currentPackage.name, en: value } }))
        )}
        <label>
          <span>价格 AUD</span>
          <input
            type="number"
            min="0"
            value={packageItem.priceAud}
            onChange={(event) =>
              updatePackage((currentPackage) => ({ ...currentPackage, priceAud: asPrice(event.target.value) }))
            }
          />
        </label>
        <PublishControls
          language={language}
          item={packageItem}
          onChange={(updates) => updatePackage((currentPackage) => ({ ...currentPackage, ...updates }))}
        />
      </div>
      {renderLocalizedListFields(packageItem.details, (details) =>
        updatePackage((currentPackage) => ({ ...currentPackage, details }))
      )}
    </div>
  );

  const renderFixedPackage = (
    fixedPackage: EditableFixedPackage,
    packageKey: "idPhotoPackage" | "graduationStudioPackage"
  ) => (
    <div className="admin-edit-card">
      <div className="admin-edit-row">
        {renderLocalizedNameFields(
          fixedPackage.title.zh,
          fixedPackage.title.en,
          (value) => updateFixedPackage(packageKey, (currentPackage) => ({ ...currentPackage, title: { ...currentPackage.title, zh: value } })),
          (value) => updateFixedPackage(packageKey, (currentPackage) => ({ ...currentPackage, title: { ...currentPackage.title, en: value } }))
        )}
        <label>
          <span>价格 AUD</span>
          <input
            type="number"
            min="0"
            value={fixedPackage.priceAud}
            onChange={(event) =>
              updateFixedPackage(packageKey, (currentPackage) => ({
                ...currentPackage,
                priceAud: asPrice(event.target.value)
              }))
            }
          />
        </label>
        <PublishControls
          language={language}
          item={fixedPackage}
          onChange={(updates) => updateFixedPackage(packageKey, (currentPackage) => ({ ...currentPackage, ...updates }))}
        />
      </div>
      {renderLocalizedListFields(fixedPackage.details, (details) =>
        updateFixedPackage(packageKey, (currentPackage) => ({ ...currentPackage, details }))
      )}
    </div>
  );

  const renderAddOnFields = (addOn: AddOnOption, addOnIndex: number, addOnCount: number) => {
    const shouldShowPreview = addOnGroup !== "makeup";
    const previewImage = withImage(addOn.previewImage);
    const description = addOn.description ?? { zh: [], en: [] };

    return (
      <div className="admin-edit-card" key={addOn.id}>
        <div className="admin-card-actions">
          <button
            className="admin-card-order-button"
            type="button"
            onClick={() => moveAddOn(addOnIndex, -1)}
            disabled={addOnIndex === 0}
            aria-label={label(language, "上移加购项", "Move add-on up")}
            title={label(language, "上移加购项", "Move add-on up")}
          >
            <ArrowUp size={16} aria-hidden="true" />
          </button>
          <button
            className="admin-card-order-button"
            type="button"
            onClick={() => moveAddOn(addOnIndex, 1)}
            disabled={addOnIndex === addOnCount - 1}
            aria-label={label(language, "下移加购项", "Move add-on down")}
            title={label(language, "下移加购项", "Move add-on down")}
          >
            <ArrowDown size={16} aria-hidden="true" />
          </button>
          <button
            className="admin-danger-button admin-card-delete-button"
            type="button"
            onClick={() => deleteAddOn(addOn.id)}
          >
            <Trash2 size={16} aria-hidden="true" />
            <span>{label(language, "删除", "Delete")}</span>
          </button>
        </div>
        {shouldShowPreview && (
          <div className="admin-add-on-preview" aria-label={previewImage.alt[language]}>
            <img src={previewImage.src} alt={previewImage.alt[language]} />
          </div>
        )}
        <div className="admin-edit-row admin-edit-row-wide">
          {renderLocalizedNameFields(
            addOn.name.zh,
            addOn.name.en,
            (value) => updateAddOn(addOn.id, (currentAddOn) => ({ ...currentAddOn, name: { ...currentAddOn.name, zh: value } })),
            (value) => updateAddOn(addOn.id, (currentAddOn) => ({ ...currentAddOn, name: { ...currentAddOn.name, en: value } }))
          )}
          <label>
            <span>价格 AUD</span>
            <input
              type="number"
              min="0"
              value={addOn.priceAud}
              onChange={(event) =>
                updateAddOn(addOn.id, (currentAddOn) => ({ ...currentAddOn, priceAud: asPrice(event.target.value) }))
              }
            />
          </label>
          <PublishControls
            language={language}
            item={addOn}
            onChange={(updates) => updateAddOn(addOn.id, (currentAddOn) => ({ ...currentAddOn, ...updates }))}
          />
        </div>
        {renderLocalizedListFields(
          description,
          (nextDescription) =>
            updateAddOn(addOn.id, (currentAddOn) => ({ ...currentAddOn, description: nextDescription })),
          {
            title: { zh: "描述条目", en: "Description items" },
            zhHeader: { zh: "中文描述", en: "Chinese description" },
            enHeader: { zh: "英文描述", en: "English description" },
            zhPlaceholder: { zh: "中文描述", en: "Chinese description" },
            enPlaceholder: { zh: "英文描述", en: "English description" }
          }
        )}
        <div className="admin-edit-row admin-edit-row-wide">
          {shouldShowPreview && (
            <>
              <label>
                <span>预览图地址</span>
                <input
                  value={previewImage.src}
                  onChange={(event) =>
                    updateAddOn(addOn.id, (currentAddOn) => ({
                      ...currentAddOn,
                      previewImage: { ...withImage(currentAddOn.previewImage), src: event.target.value || placeholderImage.src }
                    }))
                  }
                />
              </label>
              <label>
                <span>预览图中文 alt</span>
                <input
                  value={previewImage.alt.zh}
                  onChange={(event) =>
                    updateAddOn(addOn.id, (currentAddOn) => ({
                      ...currentAddOn,
                      previewImage: {
                        ...withImage(currentAddOn.previewImage),
                        alt: { ...withImage(currentAddOn.previewImage).alt, zh: event.target.value }
                      }
                    }))
                  }
                />
              </label>
              <label>
                <span>Preview English alt</span>
                <input
                  value={previewImage.alt.en}
                  onChange={(event) =>
                    updateAddOn(addOn.id, (currentAddOn) => ({
                      ...currentAddOn,
                      previewImage: {
                        ...withImage(currentAddOn.previewImage),
                        alt: { ...withImage(currentAddOn.previewImage).alt, en: event.target.value }
                      }
                    }))
                  }
                />
              </label>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="admin-modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="admin-modal admin-modal-wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pricing-editor-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div>
            <p>{label(language, "后台编辑", "Admin Edit")}</p>
            <h2 id="pricing-editor-title">
              {isSingleTabEditor
                ? label(language, `${activeTabLabel.zh}管理`, `${activeTabLabel.en} Management`)
                : label(language, "价格配置管理", "Pricing Management")}
            </h2>
          </div>
          <button className="admin-icon-button" type="button" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {!isSingleTabEditor && (
          <div className="admin-tabs" role="tablist">
            {availableTabs.map(([tabId, tabLabel]) => (
              <button
                className={activeTab === tabId ? "admin-tab is-active" : "admin-tab"}
                type="button"
                key={tabId}
                onClick={() => setActiveTab(tabId as PricingEditorTab)}
              >
                {tabLabel[language]}
              </button>
            ))}
          </div>
        )}

        <div className="admin-modal-body">
          {activeTab === "areas" && (
            <div className="admin-stack">
              {draft.serviceAreas.map((area) => (
                <div
                  className={area.id === selectedAreaId ? "admin-edit-card is-context-target" : "admin-edit-card"}
                  key={area.id}
                >
                  <div className="admin-card-actions">
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveArea(area.id, -1)}
                      disabled={draft.serviceAreas[0]?.id === area.id}
                      aria-label={label(language, "上移服务地区", "Move area up")}
                      title={label(language, "上移服务地区", "Move area up")}
                    >
                      <ArrowUp size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveArea(area.id, 1)}
                      disabled={draft.serviceAreas[draft.serviceAreas.length - 1]?.id === area.id}
                      aria-label={label(language, "下移服务地区", "Move area down")}
                      title={label(language, "下移服务地区", "Move area down")}
                    >
                      <ArrowDown size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-danger-button admin-card-delete-button"
                      type="button"
                      onClick={() => deleteArea(area.id)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      <span>{label(language, "删除", "Delete")}</span>
                    </button>
                  </div>
                  <div className="admin-edit-row">
                    {renderLocalizedNameFields(
                      area.name.zh,
                      area.name.en,
                      (value) => updateAreaName(area.id, "zh", value),
                      (value) => updateAreaName(area.id, "en", value)
                    )}
                    <PublishControls
                      language={language}
                      item={area}
                      onChange={(updates) => updateArea(area.id, (currentArea) => ({ ...currentArea, ...updates }))}
                    />
                  </div>
                </div>
              ))}
              <button className="admin-add-button" type="button" onClick={addArea}>
                <Plus size={18} aria-hidden="true" />
                <span>{label(language, "添加服务地区", "Add Area")}</span>
              </button>
            </div>
          )}

          {activeTab === "services" && (
            <div className="admin-stack">
              <div className="admin-toolbar">
                {isContextualServiceEditor ? (
                  <div className="admin-context-field" aria-label={label(language, "所属地区", "Area")}>
                    <span>{label(language, "所属地区", "Area")}</span>
                    <strong>{selectedArea?.name[language] ?? label(language, "当前地区", "Current area")}</strong>
                  </div>
                ) : (
                  <label className="admin-field">
                    <span>{label(language, "所属地区", "Area")}</span>
                    <select value={selectedAreaId} onChange={(event) => setSelectedAreaId(event.target.value)}>
                      {draft.serviceAreas.map((area) => (
                        <option value={area.id} key={area.id}>
                          {area.name[language]}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>

              {selectedAreaServiceTypes.map((serviceType, serviceTypeIndex) => (
                <div
                  className={
                    serviceType.id === focusedServiceTypeId
                      ? "admin-edit-card is-context-target"
                      : "admin-edit-card"
                  }
                  key={serviceType.id}
                >
                  <div className="admin-card-actions">
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveServiceType(serviceTypeIndex, -1)}
                      disabled={serviceTypeIndex === 0}
                      aria-label={label(language, "上移", "Move up")}
                      title={label(language, "上移", "Move up")}
                    >
                      <ArrowUp size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveServiceType(serviceTypeIndex, 1)}
                      disabled={serviceTypeIndex === selectedAreaServiceTypes.length - 1}
                      aria-label={label(language, "下移", "Move down")}
                      title={label(language, "下移", "Move down")}
                    >
                      <ArrowDown size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-danger-button admin-card-delete-button"
                      type="button"
                      onClick={() => deleteServiceType(serviceType.id)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      <span>{label(language, "删除", "Delete")}</span>
                    </button>
                  </div>
                  <div className="admin-edit-row admin-edit-row-wide">
                    {renderLocalizedNameFields(
                      serviceType.name.zh,
                      serviceType.name.en,
                      (value) => updateServiceType(serviceType.id, (currentServiceType) => ({ ...currentServiceType, name: { ...currentServiceType.name, zh: value } })),
                      (value) => updateServiceType(serviceType.id, (currentServiceType) => ({ ...currentServiceType, name: { ...currentServiceType.name, en: value } }))
                    )}
                    <label>
                      <span>{label(language, "用途", "Flow")}</span>
                      <select
                        value={serviceType.kind}
                        onChange={(event) =>
                          updateServiceType(serviceType.id, (currentServiceType) => ({
                            ...currentServiceType,
                            kind: event.target.value as ServiceKind
                          }))
                        }
                      >
                        {serviceKindOptions.map((kindOption) => (
                          <option value={kindOption.id} key={kindOption.id}>
                            {kindOption[language]}
                          </option>
                        ))}
                      </select>
                    </label>
                    <PublishControls
                      language={language}
                      item={serviceType}
                      onChange={(updates) =>
                        updateServiceType(serviceType.id, (currentServiceType) => ({
                          ...currentServiceType,
                          ...updates,
                          isAvailable: updates.isAvailable ?? currentServiceType.isAvailable,
                          isVisible: updates.isVisible ?? currentServiceType.isVisible
                        }))
                      }
                    />
                  </div>
                </div>
              ))}

              <button className="admin-add-button" type="button" onClick={addServiceType} disabled={!selectedAreaId}>
                <Plus size={18} aria-hidden="true" />
                <span>{label(language, "添加服务类型", "Add Service Type")}</span>
              </button>
            </div>
          )}

          {activeTab === "schools" && (
            <div className="admin-stack">
              {draft.graduationSchools.map((school, schoolIndex) => (
                <div
                  className={school.id === selectedSchoolId ? "admin-edit-card is-context-target" : "admin-edit-card"}
                  key={school.id}
                >
                  <div className="admin-card-actions">
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveSchool(schoolIndex, -1)}
                      disabled={schoolIndex === 0}
                      aria-label={label(language, "上移学校", "Move school up")}
                      title={label(language, "上移学校", "Move school up")}
                    >
                      <ArrowUp size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveSchool(schoolIndex, 1)}
                      disabled={schoolIndex === draft.graduationSchools.length - 1}
                      aria-label={label(language, "下移学校", "Move school down")}
                      title={label(language, "下移学校", "Move school down")}
                    >
                      <ArrowDown size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-danger-button admin-card-delete-button"
                      type="button"
                      onClick={() => deleteSchool(school.id)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      <span>{label(language, "删除", "Delete")}</span>
                    </button>
                  </div>
                  <div className="admin-edit-row">
                    {renderLocalizedNameFields(
                      school.name.zh,
                      school.name.en,
                      (value) => updateSchoolName(school.id, "zh", value),
                      (value) => updateSchoolName(school.id, "en", value)
                    )}
                    <PublishControls
                      language={language}
                      item={school}
                      onChange={(updates) =>
                        setDraft((currentDraft) => ({
                          ...currentDraft,
                          graduationSchools: currentDraft.graduationSchools.map((currentSchool) =>
                            currentSchool.id === school.id
                              ? { ...currentSchool, ...updates }
                              : currentSchool
                          )
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
              <button className="admin-add-button" type="button" onClick={addSchool}>
                <Plus size={18} aria-hidden="true" />
                <span>{label(language, "添加学校", "Add School")}</span>
              </button>
            </div>
          )}

          {activeTab === "scenes" && (
            <div className="admin-stack">
              <div className="admin-toolbar">
                <label className="admin-field">
                  <span>{label(language, "所属学校", "School")}</span>
                  <select
                    value={selectedSchoolId}
                    onChange={(event) => {
                      setSelectedSchoolId(event.target.value);
                      setSelectedSceneId(draft.sceneTypesBySchool[event.target.value]?.[0]?.id ?? "");
                    }}
                  >
                    {draft.graduationSchools.map((school) => (
                      <option value={school.id} key={school.id}>
                        {school.name[language]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {selectedSchoolScenes.map((scene, sceneIndex) => (
                <div
                  className={scene.id === selectedSceneId ? "admin-edit-card is-context-target" : "admin-edit-card"}
                  key={scene.id}
                >
                  <div className="admin-card-actions">
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveScene(sceneIndex, -1)}
                      disabled={sceneIndex === 0}
                      aria-label={label(language, "上移场景", "Move scene up")}
                      title={label(language, "上移场景", "Move scene up")}
                    >
                      <ArrowUp size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveScene(sceneIndex, 1)}
                      disabled={sceneIndex === selectedSchoolScenes.length - 1}
                      aria-label={label(language, "下移场景", "Move scene down")}
                      title={label(language, "下移场景", "Move scene down")}
                    >
                      <ArrowDown size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-danger-button admin-card-delete-button"
                      type="button"
                      onClick={() => deleteScene(scene.id)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      <span>{label(language, "删除场景", "Delete Scene")}</span>
                    </button>
                  </div>
                  <div
                    className="admin-add-on-preview"
                    aria-label={withImage(scene.previewImage).alt[language]}
                  >
                    <img
                      src={withImage(scene.previewImage).src}
                      alt={withImage(scene.previewImage).alt[language]}
                    />
                  </div>
                  <div className="admin-edit-row admin-edit-row-wide">
                    {renderLocalizedNameFields(
                      scene.name.zh,
                      scene.name.en,
                      (value) => updateScene(scene.id, (currentScene) => ({ ...currentScene, name: { ...currentScene.name, zh: value } })),
                      (value) => updateScene(scene.id, (currentScene) => ({ ...currentScene, name: { ...currentScene.name, en: value } }))
                    )}
                  </div>
                  {renderLocalizedListFields(
                    scene.description,
                    (description) => updateScene(scene.id, (currentScene) => ({ ...currentScene, description })),
                    {
                      title: { zh: "描述条目", en: "Description items" },
                      zhHeader: { zh: "中文描述", en: "Chinese description" },
                      enHeader: { zh: "英文描述", en: "English description" },
                      zhPlaceholder: { zh: "中文描述", en: "Chinese description" },
                      enPlaceholder: { zh: "英文描述", en: "English description" }
                    }
                  )}
                  <div className="admin-edit-row admin-edit-row-wide">
                    <label>
                      <span>预览图地址</span>
                      <input
                        value={withImage(scene.previewImage).src}
                        onChange={(event) =>
                          updateScene(scene.id, (currentScene) => ({
                            ...currentScene,
                            previewImage: { ...withImage(currentScene.previewImage), src: event.target.value || placeholderImage.src }
                          }))
                        }
                      />
                    </label>
                    <label>
                      <span>预览图中文 alt</span>
                      <input
                        value={withImage(scene.previewImage).alt.zh}
                        onChange={(event) =>
                          updateScene(scene.id, (currentScene) => ({
                            ...currentScene,
                            previewImage: {
                              ...withImage(currentScene.previewImage),
                              alt: { ...withImage(currentScene.previewImage).alt, zh: event.target.value }
                            }
                          }))
                        }
                      />
                    </label>
                    <label>
                      <span>Preview English alt</span>
                      <input
                        value={withImage(scene.previewImage).alt.en}
                        onChange={(event) =>
                          updateScene(scene.id, (currentScene) => ({
                            ...currentScene,
                            previewImage: {
                              ...withImage(currentScene.previewImage),
                              alt: { ...withImage(currentScene.previewImage).alt, en: event.target.value }
                            }
                          }))
                        }
                      />
                    </label>
                    <PublishControls
                      language={language}
                      item={scene}
                      onChange={(updates) =>
                        updateScene(scene.id, (currentScene) => ({ ...currentScene, ...updates }))
                      }
                    />
                  </div>
                </div>
              ))}
              <button className="admin-add-button" type="button" onClick={addScene} disabled={!selectedSchoolId}>
                <Plus size={18} aria-hidden="true" />
                <span>{label(language, "添加场景", "Add Scene")}</span>
              </button>
            </div>
          )}

          {activeTab === "packages" && (
            <div className="admin-stack">
              <div className="admin-toolbar">
                <label className="admin-field">
                  <span>{label(language, "套餐类型", "Package Type")}</span>
                  <select value={packageScope} onChange={(event) => setPackageScope(event.target.value as PackageScope)}>
                    <option value="graduation">{label(language, "毕业照套餐", "Graduation Packages")}</option>
                    <option value="registry">{label(language, "注册结婚套餐", "Registry Packages")}</option>
                    <option value="idPhoto">{label(language, "证件照套餐", "ID Photo Package")}</option>
                    <option value="studio">{label(language, "棚拍毕业套餐", "Studio Graduation Package")}</option>
                  </select>
                </label>
                {packageScope === "graduation" && (
                  <>
                    <label className="admin-field">
                      <span>{label(language, "所属学校", "School")}</span>
                      <select
                        value={selectedSchoolId}
                        onChange={(event) => {
                          setSelectedSchoolId(event.target.value);
                          setSelectedSceneId(draft.sceneTypesBySchool[event.target.value]?.[0]?.id ?? "");
                        }}
                      >
                        {draft.graduationSchools.map((school) => (
                          <option value={school.id} key={school.id}>
                            {school.name[language]}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="admin-field">
                      <span>{label(language, "所属场景", "Scene")}</span>
                      <select
                        value={selectedSceneId}
                        onChange={(event) => setSelectedSceneId(event.target.value)}
                        disabled={selectedSchoolScenes.length === 0}
                      >
                        {selectedSchoolScenes.length === 0 ? (
                          <option value="">
                            {label(language, "该学校暂无场景", "No scenes for this school")}
                          </option>
                        ) : (
                          selectedSchoolScenes.map((scene) => (
                            <option value={scene.id} key={scene.id}>
                              {scene.name[language]}
                            </option>
                          ))
                        )}
                      </select>
                    </label>
                  </>
                )}
              </div>

              {packageScope === "graduation" && (
                <>
                  {isSelectedStudioScene ? (
                    renderFixedPackage(draft.graduationStudioPackage, "graduationStudioPackage")
                  ) : (
                    <>
                      {selectedGraduationPackages.map((graduationPackage, packageIndex) =>
                        renderPackageCard(
                          graduationPackage,
                          (updater) => updateGraduationPackage(graduationPackage.id, updater),
                          () => deleteGraduationPackage(graduationPackage.id),
                          (direction) => moveGraduationPackage(packageIndex, direction),
                          packageIndex,
                          selectedGraduationPackages.length,
                          graduationPackage.id === focusedPackageId
                        )
                      )}
                      <button className="admin-add-button" type="button" onClick={addGraduationPackage} disabled={!selectedSceneId}>
                        <Plus size={18} aria-hidden="true" />
                        <span>{label(language, "添加毕业照套餐", "Add Graduation Package")}</span>
                      </button>
                    </>
                  )}
                </>
              )}

              {packageScope === "registry" && (
                <>
                  {draft.registryPackages.map((registryPackage, packageIndex) =>
                    renderPackageCard(
                      registryPackage,
                      (updater) => updateRegistryPackage(registryPackage.id, updater),
                      () => deleteRegistryPackage(registryPackage.id),
                      (direction) => moveRegistryPackage(packageIndex, direction),
                      packageIndex,
                      draft.registryPackages.length,
                      registryPackage.id === focusedPackageId
                    )
                  )}
                  <button className="admin-add-button" type="button" onClick={addRegistryPackage}>
                    <Plus size={18} aria-hidden="true" />
                    <span>{label(language, "添加注册结婚套餐", "Add Registry Package")}</span>
                  </button>
                </>
              )}

              {packageScope === "idPhoto" && renderFixedPackage(draft.idPhotoPackage, "idPhotoPackage")}
              {packageScope === "studio" && renderFixedPackage(draft.graduationStudioPackage, "graduationStudioPackage")}
            </div>
          )}

          {activeTab === "addons" && (
            <div className="admin-stack">
              <div className="admin-toolbar">
                <label className="admin-field">
                  <span>{label(language, "服务", "Service")}</span>
                  <select
                    value={addOnTarget}
                    onChange={(event) => {
                      const nextTarget = event.target.value as AddOnTarget;
                      setAddOnTarget(nextTarget);
                      if (nextTarget === "graduationStudio") {
                        setAddOnGroup("props");
                      }
                    }}
                  >
                    <option value="graduation">{label(language, "毕业照", "Graduation")}</option>
                    <option value="graduationStudio">{label(language, "毕业照棚拍", "Graduation Studio")}</option>
                    <option value="registry">{label(language, "注册结婚", "Registry")}</option>
                    <option value="idPhoto">{label(language, "证件照", "ID Photo")}</option>
                  </select>
                </label>
                {addOnTarget === "graduation" && (
                  <label className="admin-field">
                    <span>{label(language, "所属学校", "School")}</span>
                    <select
                      value={selectedAddOnSchoolId}
                      onChange={(event) => setSelectedAddOnSchoolId(event.target.value)}
                    >
                      {draft.graduationSchools.map((school) => (
                        <option value={school.id} key={school.id}>
                          {school.name[language]}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <label className="admin-field">
                  <span>{label(language, "分组", "Group")}</span>
                  <select
                    value={addOnGroup}
                    disabled={addOnTarget === "graduationStudio"}
                    onChange={(event) => setAddOnGroup(event.target.value as NormalizedAddOnGroup)}
                  >
                    {(["clothing", "props", "makeup"] as NormalizedAddOnGroup[]).map((group) => (
                      <option value={group} key={group}>
                        {addOnGroupLabels[group][language]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {getAddOns().map((addOn, addOnIndex, addOns) =>
                renderAddOnFields(addOn, addOnIndex, addOns.length)
              )}
              <button className="admin-add-button" type="button" onClick={addAddOn}>
                <Plus size={18} aria-hidden="true" />
                <span>{label(language, "添加加购项", "Add Add-on")}</span>
              </button>
            </div>
          )}

          {activeTab === "flow" && (
            <div className="admin-stack">
              <label className="admin-field">
                <span>{label(language, "流程", "Flow")}</span>
                <select
                  value={selectedFlowKind}
                  onChange={(event) => setSelectedFlowKind(event.target.value as PricingFlowKind)}
                >
                  {(Object.keys(pricingFlowKindLabels) as PricingFlowKind[]).map((flowKind) => (
                    <option value={flowKind} key={flowKind}>
                      {pricingFlowKindLabels[flowKind][language]}
                    </option>
                  ))}
                </select>
              </label>

              {selectedFlowLayout.order.map((sectionKey, sectionIndex) => {
                const isHidden = selectedFlowLayout.hidden.includes(sectionKey);
                return (
                  <div className="admin-edit-card" key={sectionKey}>
                    <div className="admin-card-actions">
                      <button
                        className="admin-card-order-button"
                        type="button"
                        onClick={() => moveFlowSection(sectionIndex, -1)}
                        disabled={sectionIndex === 0}
                        aria-label={label(language, "上移流程栏", "Move flow section up")}
                        title={label(language, "上移流程栏", "Move flow section up")}
                      >
                        <ArrowUp size={16} aria-hidden="true" />
                      </button>
                      <button
                        className="admin-card-order-button"
                        type="button"
                        onClick={() => moveFlowSection(sectionIndex, 1)}
                        disabled={sectionIndex === selectedFlowLayout.order.length - 1}
                        aria-label={label(language, "下移流程栏", "Move flow section down")}
                        title={label(language, "下移流程栏", "Move flow section down")}
                      >
                        <ArrowDown size={16} aria-hidden="true" />
                      </button>
                      <label className="admin-check-field">
                        <input
                          type="checkbox"
                          checked={!isHidden}
                          onChange={(event) => setFlowSectionHidden(sectionKey, !event.target.checked)}
                        />
                        <span>{label(language, "显示", "Visible")}</span>
                      </label>
                    </div>
                    <strong>{pricingFlowSectionLabels[sectionKey][language]}</strong>
                  </div>
                );
              })}

              {allFlowSections.filter((sectionKey) => !selectedFlowLayout.order.includes(sectionKey)).length > 0 && (
                <div className="admin-edit-card">
                  <strong>{label(language, "已移除流程栏", "Removed flow sections")}</strong>
                  <div className="admin-row-actions">
                    {allFlowSections
                      .filter((sectionKey) => !selectedFlowLayout.order.includes(sectionKey))
                      .map((sectionKey) => (
                        <button
                          className="admin-secondary-button"
                          type="button"
                          key={sectionKey}
                          onClick={() => restoreFlowSection(sectionKey)}
                        >
                          <Plus size={15} aria-hidden="true" />
                          {pricingFlowSectionLabels[sectionKey][language]}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "copy" && (
            <div className="admin-stack">
              {Object.entries(draft.pricingCopy).map(([copyKey, copyValue]) => (
                <div className="admin-edit-card" key={copyKey}>
                  <div className="admin-card-actions">
                    <strong>{copyKey}</strong>
                  </div>
                  <div className="admin-edit-row admin-edit-row-wide">
                    <label>
                      <span>中文</span>
                      <input
                        value={copyValue.zh}
                        onChange={(event) =>
                          updatePricingCopy(copyKey as keyof EditablePricingContent["pricingCopy"], "zh", event.target.value)
                        }
                      />
                    </label>
                    <label>
                      <span>English</span>
                      <input
                        value={copyValue.en}
                        onChange={(event) =>
                          updatePricingCopy(copyKey as keyof EditablePricingContent["pricingCopy"], "en", event.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-modal-footer">
          <button className="admin-secondary-button" type="button" onClick={onClose}>
            {label(language, "取消", "Cancel")}
          </button>
          <button className="admin-save-button" type="button" onClick={() => onSave(draft)}>
            <Save size={18} aria-hidden="true" />
            <span>{label(language, "保存并预览", "Save Preview")}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
