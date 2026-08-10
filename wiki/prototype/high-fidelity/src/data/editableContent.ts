import {
  galleryImagesByServiceType,
  galleryServiceTypes,
  graduationAddOns,
  graduationPackages,
  graduationSchools,
  graduationStudioPackage,
  graduationStudioProps,
  idPhotoAddOns,
  idPhotoPackage,
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
};

export type EditableGalleryContent = {
  serviceTypes: GalleryServiceType[];
  imagesByServiceType: Record<string, GalleryImage[]>;
  studioModelGalleries: StudioModelGallery[];
};

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
  graduationStudioProps: GraduationAddOn[];
  idPhotoAddOns: Record<IdPhotoAddOnGroupId, IdPhotoAddOn[]>;
  registryAddOns: Record<RegistryAddOnGroupId, RegistryAddOn[]>;
};

export type EditableSiteContent = {
  gallery: EditableGalleryContent;
  pricing: EditablePricingContent;
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
      graduationStudioProps,
      idPhotoAddOns,
      registryAddOns
    }
  });
}
