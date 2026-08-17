import {
  galleryImagesByServiceType,
  galleryServiceTypes,
  graduationAddOns,
  graduationAddOnsBySchool,
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
  studioModelGalleries,
  type GalleryImage,
  type GalleryServiceType,
  type GraduationAddOn,
  type GraduationPackage,
  type GraduationSceneType,
  type GraduationSchool,
  type AddOnGroupId,
  type IdPhotoAddOn,
  type IdPhotoAddOnGroupId,
  type LocalizedList,
  type LocalizedText,
  type RegistryAddOn,
  type RegistryAddOnGroupId,
  type RegistryPackage,
  type ServiceArea,
  type ServiceKind,
  type ServiceType,
  type StudioModelGallery
} from "./siteContent";

export type EditableServiceType = ServiceType & {
  kind: ServiceKind;
};

export type EditableFixedPackage = {
  title: LocalizedText;
  priceAud: number;
  details: LocalizedList;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type EditableGalleryContent = {
  serviceTypes: GalleryServiceType[];
  imagesByServiceType: Record<string, GalleryImage[]>;
  studioModelGalleries: StudioModelGallery[];
};

export type PricingFlowKind = "graduation" | "registry" | "idPhoto";
export type PricingFlowSectionKey =
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
  | "clothing"
  | "props"
  | "makeup"
  | "registryStyling"
  | "registryProps"
  | "registryClothing"
  | "idPhotoClothing"
  | "idPhotoStyling"
  | "idPhotoProps";

export type PricingFlowLayout = {
  order: PricingFlowSectionKey[];
  hidden: PricingFlowSectionKey[];
};

export type PricingCopy = typeof pricingContent;

export type EditablePricingContent = {
  serviceAreas: ServiceArea[];
  serviceTypesByArea: Record<string, EditableServiceType[]>;
  graduationSchools: GraduationSchool[];
  sceneTypesBySchool: Record<string, GraduationSceneType[]>;
  graduationPackages: Record<string, GraduationPackage[]>;
  graduationStudioPackage: EditableFixedPackage;
  idPhotoPackage: EditableFixedPackage;
  registryPackages: RegistryPackage[];
  graduationAddOns: Record<string, GraduationAddOn[]>;
  graduationAddOnsBySchool: Record<string, Record<AddOnGroupId, GraduationAddOn[]>>;
  graduationStudioProps: GraduationAddOn[];
  idPhotoAddOns: Record<IdPhotoAddOnGroupId, IdPhotoAddOn[]>;
  registryAddOns: Record<RegistryAddOnGroupId, RegistryAddOn[]>;
  pricingCopy: PricingCopy;
  pricingFlowLayouts: Record<PricingFlowKind, PricingFlowLayout>;
};

export type EditableSiteContent = {
  gallery: EditableGalleryContent;
  pricing: EditablePricingContent;
};

export const defaultPricingFlowLayouts: Record<PricingFlowKind, PricingFlowLayout> = {
  graduation: {
    order: [
      "areas",
      "services",
      "schools",
      "scenes",
      "studioPackage",
      "graduationPackage",
      "addOnsIntro",
      "clothing",
      "props",
      "makeup"
    ],
    hidden: []
  },
  registry: {
    order: [
      "areas",
      "services",
      "registryPackage",
      "registryExtraLocations",
      "addOnsIntro",
      "registryStyling",
      "registryProps",
      "registryClothing"
    ],
    hidden: []
  },
  idPhoto: {
    order: [
      "areas",
      "services",
      "idPhotoPackage",
      "addOnsIntro",
      "idPhotoClothing",
      "idPhotoStyling",
      "idPhotoProps"
    ],
    hidden: []
  }
};

export const placeholderImage: GalleryImage = {
  src: "images/options/option-preview-placeholder.jpg",
  alt: {
    zh: "DARIA STUDIO 选项预览占位图",
    en: "DARIA STUDIO option preview placeholder"
  }
};

export function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function cloneEditableContent<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getServiceKind(serviceType: ServiceType): ServiceKind {
  if (serviceType.kind) {
    return serviceType.kind;
  }

  if (serviceType.id === "graduation") {
    return "graduation";
  }

  if (serviceType.id === "registry-wedding") {
    return "registry";
  }

  if (serviceType.id === "id-photo") {
    return "id-photo";
  }

  return "other";
}

export function createDefaultEditableContent(): EditableSiteContent {
  const editableServiceTypesByArea = Object.fromEntries(
    Object.entries(serviceTypesByArea).map(([areaId, areaServiceTypes]) => [
      areaId,
      areaServiceTypes.map((serviceType) => ({
        ...serviceType,
        kind: getServiceKind(serviceType)
      }))
    ])
  ) as Record<string, EditableServiceType[]>;

  return cloneEditableContent({
    gallery: {
      serviceTypes: galleryServiceTypes,
      imagesByServiceType: galleryImagesByServiceType,
      studioModelGalleries
    },
    pricing: {
      serviceAreas,
      serviceTypesByArea: editableServiceTypesByArea,
      graduationSchools,
      sceneTypesBySchool: Object.fromEntries(Object.entries(sceneTypesBySchool)) as Record<
        string,
        GraduationSceneType[]
      >,
      graduationPackages: Object.fromEntries(Object.entries(graduationPackages)) as Record<
        string,
        GraduationPackage[]
      >,
      graduationStudioPackage,
      idPhotoPackage,
      registryPackages,
      graduationAddOns,
      graduationAddOnsBySchool,
      graduationStudioProps,
      idPhotoAddOns,
      registryAddOns,
      pricingCopy: pricingContent,
      pricingFlowLayouts: defaultPricingFlowLayouts
    }
  });
}

const editableContentStorageKey = "daria-studio-editable-content-v2";
const editableContentStorageVersion = 2;

function normalizeLocalizedList(value: unknown, fallback: LocalizedList = { zh: [], en: [] }): LocalizedList {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const source = value as { zh?: unknown; en?: unknown };
  const toArray = (entry: unknown, fallbackValues: string[]) => {
    if (Array.isArray(entry)) {
      return entry.filter((item): item is string => typeof item === "string");
    }

    return typeof entry === "string" ? [entry] : fallbackValues;
  };

  return {
    zh: toArray(source.zh, fallback.zh),
    en: toArray(source.en, fallback.en)
  };
}

function normalizePricingLists(pricing: EditablePricingContent): EditablePricingContent {
  return {
    ...pricing,
    graduationStudioPackage: {
      ...pricing.graduationStudioPackage,
      details: normalizeLocalizedList(pricing.graduationStudioPackage.details)
    },
    idPhotoPackage: {
      ...pricing.idPhotoPackage,
      details: normalizeLocalizedList(pricing.idPhotoPackage.details)
    },
    registryPackages: pricing.registryPackages.map((packageItem) => ({
      ...packageItem,
      details: normalizeLocalizedList(packageItem.details)
    })),
    graduationPackages: Object.fromEntries(
      Object.entries(pricing.graduationPackages).map(([sceneId, packages]) => [
        sceneId,
        packages.map((packageItem) => ({
          ...packageItem,
          details: normalizeLocalizedList(packageItem.details)
        }))
      ])
    ),
    sceneTypesBySchool: Object.fromEntries(
      Object.entries(pricing.sceneTypesBySchool).map(([schoolId, scenes]) => [
        schoolId,
        scenes.map((scene) => ({
          ...scene,
          description: normalizeLocalizedList(scene.description)
        }))
      ])
    ),
    graduationAddOns: Object.fromEntries(
      Object.entries(pricing.graduationAddOns).map(([groupId, addOns]) => [
        groupId,
        addOns.map((addOn) => ({
          ...addOn,
          description: normalizeLocalizedList(addOn.description)
        }))
      ])
    ),
    graduationAddOnsBySchool: Object.fromEntries(
      Object.entries(pricing.graduationAddOnsBySchool).map(([schoolId, groups]) => [
        schoolId,
        Object.fromEntries(
          Object.entries(groups).map(([groupId, addOns]) => [
            groupId,
            addOns.map((addOn) => ({
              ...addOn,
              description: normalizeLocalizedList(addOn.description)
            }))
          ])
        )
      ])
    ) as Record<string, Record<AddOnGroupId, GraduationAddOn[]>>,
    graduationStudioProps: pricing.graduationStudioProps.map((addOn) => ({
      ...addOn,
      description: normalizeLocalizedList(addOn.description)
    })),
    registryAddOns: Object.fromEntries(
      Object.entries(pricing.registryAddOns).map(([groupId, addOns]) => [
        groupId,
        addOns.map((addOn) => ({
          ...addOn,
          description: normalizeLocalizedList(addOn.description)
        }))
      ])
    ) as Record<RegistryAddOnGroupId, RegistryAddOn[]>,
    idPhotoAddOns: Object.fromEntries(
      Object.entries(pricing.idPhotoAddOns).map(([groupId, addOns]) => [
        groupId,
        addOns.map((addOn) => ({
          ...addOn,
          description: normalizeLocalizedList(addOn.description)
        }))
      ])
    ) as Record<IdPhotoAddOnGroupId, IdPhotoAddOn[]>
  };
}

export function readSavedEditableContent(): EditableSiteContent {
  const defaults = createDefaultEditableContent();

  try {
    const rawValue = window.localStorage.getItem(editableContentStorageKey);
    if (!rawValue) {
      return defaults;
    }

    const parsed = JSON.parse(rawValue) as {
      version?: number;
      content?: Partial<EditableSiteContent>;
    };

    if (parsed.version !== editableContentStorageVersion || !parsed.content) {
      return defaults;
    }

    const mergedContent = {
      ...defaults,
      ...parsed.content,
      gallery: {
        ...defaults.gallery,
        ...(parsed.content.gallery ?? {})
      },
      pricing: {
        ...defaults.pricing,
        ...(parsed.content.pricing ?? {})
      }
    } as EditableSiteContent;

    return {
      ...mergedContent,
      pricing: normalizePricingLists(mergedContent.pricing)
    };
  } catch {
    return defaults;
  }
}

export function saveEditableContent(content: EditableSiteContent) {
  window.localStorage.setItem(
    editableContentStorageKey,
    JSON.stringify({ version: editableContentStorageVersion, content })
  );
}
