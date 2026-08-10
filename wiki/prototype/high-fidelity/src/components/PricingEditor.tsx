import { ArrowDown, ArrowUp, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  cloneEditableContent,
  makeId,
  placeholderImage,
  type EditableFixedPackage,
  type EditablePricingContent,
  type EditableServiceType
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
  initialSchoolId?: string;
  initialSceneId?: string;
  initialPackageScope?: PackageScope;
  initialAddOnTarget?: AddOnTarget;
  onClose: () => void;
  onSave: (content: EditablePricingContent) => void;
};

export type PricingEditorTab = "areas" | "services" | "schools" | "scenes" | "packages" | "addons";
export type PackageScope = "graduation" | "registry" | "idPhoto" | "studio";
export type AddOnTarget = "graduation" | "registry" | "idPhoto";
type NormalizedAddOnGroup = "clothing" | "props" | "makeup";
type AddOnOption = GraduationAddOn | RegistryAddOn | IdPhotoAddOn;

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
    }
  };
}

function createAddOn(): AddOnOption {
  return {
    id: makeId("addon"),
    name: createLocalizedName("新加购项", "New Add-on"),
    priceAud: 0,
    description: createLocalizedName("", ""),
    previewImage: cloneEditableContent(placeholderImage)
  };
}

const allPricingTabs: Array<[PricingEditorTab, { zh: string; en: string }]> = [
  ["areas", { zh: "服务地区", en: "Areas" }],
  ["services", { zh: "服务类型", en: "Services" }],
  ["schools", { zh: "学校", en: "Schools" }],
  ["scenes", { zh: "场景", en: "Scenes" }],
  ["packages", { zh: "套餐", en: "Packages" }],
  ["addons", { zh: "加购项", en: "Add-ons" }]
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
  initialSchoolId,
  initialSceneId,
  initialPackageScope = "graduation",
  initialAddOnTarget = "graduation",
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
  const [selectedAreaId, setSelectedAreaId] = useState(
    getExistingId(draft.serviceAreas, initialAreaId)
  );
  const [selectedSchoolId, setSelectedSchoolId] = useState(
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
  const [addOnTarget, setAddOnTarget] = useState<AddOnTarget>(initialAddOnTarget);
  const [addOnGroup, setAddOnGroup] = useState<NormalizedAddOnGroup>("clothing");

  const selectedSchoolScenes = selectedSchoolId ? draft.sceneTypesBySchool[selectedSchoolId] ?? [] : [];
  const selectedAreaServiceTypes = selectedAreaId ? draft.serviceTypesByArea[selectedAreaId] ?? [] : [];
  const selectedGraduationPackages = selectedSceneId ? draft.graduationPackages[selectedSceneId] ?? [] : [];
  const isSelectedStudioScene = selectedSceneId === "graduation-studio";
  const isContextualServiceEditor =
    visibleTabs?.length === 1 && visibleTabs[0] === "services" && Boolean(initialAreaId);
  const selectedArea = draft.serviceAreas.find((area) => area.id === selectedAreaId);

  const updateAreaName = (areaId: string, field: Language, value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceAreas: currentDraft.serviceAreas.map((area) =>
        area.id === areaId ? { ...area, name: { ...area.name, [field]: value } } : area
      )
    }));
  };

  const addArea = () => {
    const id = makeId("area");
    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceAreas: [
        ...currentDraft.serviceAreas,
        { id, name: createLocalizedName("新地区", "New Area") }
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

  const addSchool = () => {
    const id = makeId("school");
    setDraft((currentDraft) => ({
      ...currentDraft,
      graduationSchools: [
        ...currentDraft.graduationSchools,
        { id, name: createLocalizedName("新学校", "New School") }
      ],
      sceneTypesBySchool: {
        ...currentDraft.sceneTypesBySchool,
        [id]: []
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
      const nextSchools = currentDraft.graduationSchools.filter((schoolOption) => schoolOption.id !== schoolId);
      setSelectedSchoolId(nextSchools[0]?.id ?? "");
      setSelectedSceneId(nextScenes[nextSchools[0]?.id ?? ""]?.[0]?.id ?? "");

      return {
        ...currentDraft,
        graduationSchools: nextSchools,
        sceneTypesBySchool: nextScenes,
        graduationPackages: nextPackages
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
      description: createLocalizedName("场景描述", "Scene description"),
      previewImage: cloneEditableContent(placeholderImage)
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

  const addRegistryPackage = () => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      registryPackages: [
        ...currentDraft.registryPackages,
        {
          id: makeId("package"),
          name: createLocalizedName("新套餐", "New Package"),
          priceAud: 0,
          details: { zh: [""], en: [""] }
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

  const updateFixedPackage = (
    packageKey: "idPhotoPackage" | "graduationStudioPackage",
    updater: (fixedPackage: EditableFixedPackage) => EditableFixedPackage
  ) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [packageKey]: updater(currentDraft[packageKey])
    }));
  };

  const getAddOns = (): AddOnOption[] => {
    if (addOnTarget === "graduation") {
      return draft.graduationAddOns[addOnGroup] ?? [];
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
      if (addOnTarget === "graduation") {
        return {
          ...currentDraft,
          graduationAddOns: {
            ...currentDraft.graduationAddOns,
            [addOnGroup]: nextAddOns as GraduationAddOn[]
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
    setAddOns([...getAddOns(), createAddOn()]);
  };

  const updateAddOn = (addOnId: string, updater: (addOn: AddOnOption) => AddOnOption) => {
    setAddOns(getAddOns().map((addOn) => (addOn.id === addOnId ? updater(addOn) : addOn)));
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

  const renderPackageDetails = (
    details: LocalizedList,
    onChange: (details: LocalizedList) => void
  ) => {
    const detailCount = Math.max(details.zh.length, details.en.length);

    return (
      <div className="admin-detail-list">
        <div className="admin-list-heading">
          <span>{label(language, "详情条目", "Details")}</span>
          <button type="button" onClick={() => onChange(addDetail(details))}>
            <Plus size={15} aria-hidden="true" />
            <span>{label(language, "添加", "Add")}</span>
          </button>
        </div>
        <div className="admin-detail-row admin-detail-row-heading">
          <span>{label(language, "中文详情", "Chinese detail")}</span>
          <span>{label(language, "英文详情", "English detail")}</span>
          <span aria-hidden="true" />
        </div>
        {Array.from({ length: detailCount }).map((_, detailIndex) => (
          <div className="admin-detail-row" key={detailIndex}>
            <input
              value={details.zh[detailIndex] ?? ""}
              placeholder="中文详情"
              onChange={(event) =>
                onChange(updateLocalizedList(details, "zh", detailIndex, event.target.value))
              }
            />
            <input
              value={details.en[detailIndex] ?? ""}
              placeholder="English detail"
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
    deletePackage: () => void
  ) => (
    <div className="admin-edit-card" key={packageItem.id}>
      <div className="admin-card-actions">
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
      </div>
      {renderPackageDetails(packageItem.details, (details) =>
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
      </div>
      {renderPackageDetails(fixedPackage.details, (details) =>
        updateFixedPackage(packageKey, (currentPackage) => ({ ...currentPackage, details }))
      )}
    </div>
  );

  const renderAddOnFields = (addOn: AddOnOption) => {
    const previewImage = withImage(addOn.previewImage);
    const description = addOn.description ?? createLocalizedName("", "");

    return (
      <div className="admin-edit-card" key={addOn.id}>
        <div className="admin-card-actions">
          <button
            className="admin-danger-button admin-card-delete-button"
            type="button"
            onClick={() => deleteAddOn(addOn.id)}
          >
            <Trash2 size={16} aria-hidden="true" />
            <span>{label(language, "删除", "Delete")}</span>
          </button>
        </div>
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
        </div>
        <div className="admin-edit-row admin-edit-row-wide">
          <label>
            <span>中文描述</span>
            <input
              value={description.zh}
              onChange={(event) =>
                updateAddOn(addOn.id, (currentAddOn) => ({
                  ...currentAddOn,
                  description: { ...(currentAddOn.description ?? createLocalizedName("", "")), zh: event.target.value }
                }))
              }
            />
          </label>
          <label>
            <span>English description</span>
            <input
              value={description.en}
              onChange={(event) =>
                updateAddOn(addOn.id, (currentAddOn) => ({
                  ...currentAddOn,
                  description: { ...(currentAddOn.description ?? createLocalizedName("", "")), en: event.target.value }
                }))
              }
            />
          </label>
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
                <div className="admin-edit-card" key={area.id}>
                  <div className="admin-card-actions">
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
                <div className="admin-edit-card" key={serviceType.id}>
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
                    <label className="admin-check-field">
                      <input
                        type="checkbox"
                        checked={serviceType.isAvailable}
                        onChange={(event) =>
                          updateServiceType(serviceType.id, (currentServiceType) => ({
                            ...currentServiceType,
                            isAvailable: event.target.checked
                          }))
                        }
                      />
                      <span>{label(language, "上架", "Listed")}</span>
                    </label>
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
              {draft.graduationSchools.map((school) => (
                <div className="admin-edit-card" key={school.id}>
                  <div className="admin-card-actions">
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

              {selectedSchoolScenes.map((scene) => (
                <div className="admin-edit-card" key={scene.id}>
                  <div className="admin-card-actions">
                    <button
                      className="admin-danger-button admin-card-delete-button"
                      type="button"
                      onClick={() => deleteScene(scene.id)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      <span>{label(language, "删除场景", "Delete Scene")}</span>
                    </button>
                  </div>
                  <div className="admin-edit-row admin-edit-row-wide">
                    {renderLocalizedNameFields(
                      scene.name.zh,
                      scene.name.en,
                      (value) => updateScene(scene.id, (currentScene) => ({ ...currentScene, name: { ...currentScene.name, zh: value } })),
                      (value) => updateScene(scene.id, (currentScene) => ({ ...currentScene, name: { ...currentScene.name, en: value } }))
                    )}
                  </div>
                  <div className="admin-edit-row admin-edit-row-wide">
                    <label>
                      <span>中文描述</span>
                      <input
                        value={scene.description.zh}
                        onChange={(event) =>
                          updateScene(scene.id, (currentScene) => ({
                            ...currentScene,
                            description: { ...currentScene.description, zh: event.target.value }
                          }))
                        }
                      />
                    </label>
                    <label>
                      <span>English description</span>
                      <input
                        value={scene.description.en}
                        onChange={(event) =>
                          updateScene(scene.id, (currentScene) => ({
                            ...currentScene,
                            description: { ...currentScene.description, en: event.target.value }
                          }))
                        }
                      />
                    </label>
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
                      {selectedGraduationPackages.map((graduationPackage) =>
                        renderPackageCard(
                          graduationPackage,
                          (updater) => updateGraduationPackage(graduationPackage.id, updater),
                          () => deleteGraduationPackage(graduationPackage.id)
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
                  {draft.registryPackages.map((registryPackage) =>
                    renderPackageCard(
                      registryPackage,
                      (updater) => updateRegistryPackage(registryPackage.id, updater),
                      () => deleteRegistryPackage(registryPackage.id)
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
                  <select value={addOnTarget} onChange={(event) => setAddOnTarget(event.target.value as AddOnTarget)}>
                    <option value="graduation">{label(language, "毕业照", "Graduation")}</option>
                    <option value="registry">{label(language, "注册结婚", "Registry")}</option>
                    <option value="idPhoto">{label(language, "证件照", "ID Photo")}</option>
                  </select>
                </label>
                <label className="admin-field">
                  <span>{label(language, "分组", "Group")}</span>
                  <select value={addOnGroup} onChange={(event) => setAddOnGroup(event.target.value as NormalizedAddOnGroup)}>
                    {(["clothing", "props", "makeup"] as NormalizedAddOnGroup[]).map((group) => (
                      <option value={group} key={group}>
                        {addOnGroupLabels[group][language]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {getAddOns().map((addOn) => renderAddOnFields(addOn))}
              <button className="admin-add-button" type="button" onClick={addAddOn}>
                <Plus size={18} aria-hidden="true" />
                <span>{label(language, "添加加购项", "Add Add-on")}</span>
              </button>
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
