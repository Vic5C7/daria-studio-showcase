export type Language = "zh" | "en";

export type LocalizedText = Record<Language, string>;
export type LocalizedList = Record<Language, string[]>;

export type GalleryCategoryId =
  | "all"
  | "graduation"
  | "unimelb"
  | "monash"
  | "rmit"
  | "registry-wedding"
  | "studio"
  | "id-photo";

export type GalleryCategory = {
  id: GalleryCategoryId;
  name: LocalizedText;
};

export type GalleryImage = {
  src: string;
  alt: LocalizedText;
  categoryIds: GalleryCategoryId[];
};

export type ServiceAreaId = "shanghai" | "melbourne";

export type ServiceArea = {
  id: ServiceAreaId;
  name: LocalizedText;
};

export type ServiceTypeId =
  | "wedding-portrait"
  | "registry-wedding"
  | "daily-portrait"
  | "graduation"
  | "id-photo";

export type ServiceTypeStatus = "available" | "comingSoon" | "detailsPending";

export type ServiceType = {
  id: ServiceTypeId;
  name: LocalizedText;
  status: ServiceTypeStatus;
};

export type GraduationSchoolId = "unimelb" | "monash" | "rmit";

export type GraduationSchool = {
  id: GraduationSchoolId;
  name: LocalizedText;
};

export type SceneTypeId =
  | "shared-campus"
  | "unimelb-single"
  | "unimelb-carlton-garden"
  | "graduation-studio";

export type GraduationSceneType = {
  id: SceneTypeId;
  name: LocalizedText;
  description: LocalizedText;
};

export type GraduationPackage = {
  id: string;
  sceneTypeId: SceneTypeId;
  name: LocalizedText;
  priceAud: number;
  details: LocalizedList;
};

export type AddOnGroupId = "clothing" | "props" | "makeup" | "studio";

export type GraduationAddOn = {
  id: string;
  name: LocalizedText;
  priceAud: number;
  description?: LocalizedText;
  availableSchoolIds?: GraduationSchoolId[];
  availableSceneTypeIds?: SceneTypeId[];
};

export type StudioBackgroundTemplate = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
};

export type RegistryPackage = {
  id: string;
  name: LocalizedText;
  priceAud: number;
  originalPhotos: number;
  retouchedPhotos: number;
  includedExtraLocations: number;
  details: LocalizedList;
};

export type RegistryAddOnGroupId = "styling" | "registry-props" | "wardrobe";

export type RegistryAddOn = {
  id: string;
  name: LocalizedText;
  priceAud: number;
  description?: LocalizedText;
  retouchedBonus?: number;
};

export const brand = {
  name: {
    zh: "DARIA STUDIO",
    en: "DARIA STUDIO"
  },
  tagline: {
    zh: "毕业照、注册跟拍与证件照",
    en: "Graduation, registry wedding and ID photography"
  },
  intro: {
    zh: "在墨尔本留下您的专属记忆",
    en: "Create your own lasting memories in Melbourne."
  }
} satisfies Record<string, LocalizedText>;

export const navigation = {
  home: {
    zh: "作品",
    en: "Gallery"
  },
  pricing: {
    zh: "价格套餐",
    en: "Pricing"
  },
  language: {
    zh: "English",
    en: "中文"
  }
} satisfies Record<string, LocalizedText>;

export const homeContent = {
  eyebrow: {
    zh: "墨尔本摄影工作室",
    en: "Melbourne Photo Studio"
  },
  pricingButton: {
    zh: "查看拍摄价格套餐",
    en: "View Photography Packages"
  },
  galleryTitle: {
    zh: "作品展示",
    en: "Selected Work"
  },
  galleryIntro: {
    zh: "按服务和学校快速筛选样片；暂无公开样片的分类会显示清楚的空状态。",
    en: "Browse samples by service and school. Categories without published images show a clear empty state."
  },
  galleryEmpty: {
    zh: "该分类暂未发布样片。",
    en: "No published samples in this category yet."
  }
} satisfies Record<string, LocalizedText>;

export const pricingContent = {
  backHome: {
    zh: "返回作品",
    en: "Back to Gallery"
  },
  title: {
    zh: "拍摄价格套餐",
    en: "Photography Packages"
  },
  intro: {
    zh: "请选择你的服务套餐",
    en: "Please choose your service package."
  },
  areaLabel: {
    zh: "选择服务地区",
    en: "Choose service area"
  },
  serviceTypeLabel: {
    zh: "选择服务类型",
    en: "Choose service type"
  },
  schoolLabel: {
    zh: "选择学校",
    en: "Choose a school"
  },
  schoolPlaceholder: {
    zh: "请选择学校",
    en: "Please choose a school"
  },
  sceneTypeLabel: {
    zh: "选择拍摄类型",
    en: "Choose shoot type"
  },
  packageLabel: {
    zh: "选择毕业照套餐",
    en: "Choose graduation package"
  },
  registryPackageLabel: {
    zh: "选择注册跟拍套餐",
    en: "Choose registry package"
  },
  registryLocationsLabel: {
    zh: "额外拍摄地点",
    en: "Extra shoot locations"
  },
  registryExtraLocationsIntro: {
    zh: "每增加 1 个付费额外地点加 100 AUD，并增加 4 张精修。套餐本身包含的额外地点不重复计费。",
    en: "Each paid extra location adds 100 AUD and 4 retouched photos. Locations already included in the package are not counted again."
  },
  includedLocationsLabel: {
    zh: "套餐已含额外地点",
    en: "Included extra locations"
  },
  paidExtraLocationsLabel: {
    zh: "新增加购地点",
    en: "Paid extra locations"
  },
  extraLocationUnit: {
    zh: "个地点",
    en: "locations"
  },
  increaseExtraLocation: {
    zh: "增加额外地点",
    en: "Add extra location"
  },
  decreaseExtraLocation: {
    zh: "减少额外地点",
    en: "Remove extra location"
  },
  retouchedPhotosLabel: {
    zh: "包含精修",
    en: "Retouched photos included"
  },
  retouchedPhotoUnit: {
    zh: "张",
    en: "photos"
  },
  clothingLabel: {
    zh: "服装",
    en: "Clothing"
  },
  propsLabel: {
    zh: "道具",
    en: "Props"
  },
  makeupLabel: {
    zh: "妆造",
    en: "Makeup and styling"
  },
  studioAddOnsLabel: {
    zh: "棚拍加购",
    en: "Studio add-ons"
  },
  registryStylingLabel: {
    zh: "注册妆造",
    en: "Registry styling"
  },
  registryPropsLabel: {
    zh: "注册道具",
    en: "Registry props"
  },
  registryWardrobeLabel: {
    zh: "注册服装",
    en: "Registry wardrobe"
  },
  addOnsLabel: {
    zh: "加购项",
    en: "Add-ons"
  },
  registryAddOnsLabel: {
    zh: "注册跟拍加购项",
    en: "Registry add-ons"
  },
  studioBackgroundLabel: {
    zh: "选择棚拍背景模板",
    en: "Choose studio background template"
  },
  estimatedTotal: {
    zh: "预计总价",
    en: "Estimated total"
  },
  choosePackageTotal: {
    zh: "请选择套餐",
    en: "Choose a package"
  },
  detailsPendingTotal: {
    zh: "详情待确认",
    en: "Details pending"
  },
  shanghaiEmpty: {
    zh: "上海地区服务套餐暂未开放。",
    en: "Shanghai service packages are not available yet."
  },
  comingSoon: {
    zh: "暂未拓展",
    en: "Coming soon"
  },
  availableNow: {
    zh: "当前可选",
    en: "Available now"
  },
  detailsPending: {
    zh: "详情待确认",
    en: "Details pending"
  },
  detailsPendingTitle: {
    zh: "服务详情待确认",
    en: "Service details pending"
  },
  idPhotoPendingCopy: {
    zh: "证件照已作为独立服务分类加入原型，但套餐价格、交付内容和公开文案尚未确认。正式展示前应继续使用待确认状态。",
    en: "ID photos are now shown as a separate service category, but package prices, deliverables and public copy are not confirmed yet. It should stay in a pending state before publishing."
  },
  packageDetailsLabel: {
    zh: "套餐包含",
    en: "Package includes"
  },
  addOnIntro: {
    zh: "加购项可多选，费用会自动计入预计总价。",
    en: "You can select multiple add-ons. They will be added to the estimated total."
  },
  photoSpotGuidanceTitle: {
    zh: "打卡点说明",
    en: "Photo spot guidance"
  },
  photoSpotGuidanceCopy: {
    zh: "所有打卡点会根据天气、光线、人流、临时封闭和其他现场情况灵活调整；摄影师可能改用附近角度或替代点位，最终成片效果也会受拍摄时间与现场条件影响。",
    en: "Photo spots may be adjusted for weather, light, crowds, temporary closures or other on-site conditions. The photographer may use nearby angles or substitute spots, and final image results can vary by timing and conditions."
  },
  notesTitle: {
    zh: "备注",
    en: "Notes"
  },
  notesPlaceholder: {
    zh: "请输入备注",
    en: "Add a note"
  },
  addNote: {
    zh: "添加备注",
    en: "Add note"
  },
  deleteNote: {
    zh: "删除",
    en: "Delete"
  },
  notesLimit: {
    zh: "每栏最多可添加 10 条备注。",
    en: "Up to 10 notes per section."
  },
  notesMaxReached: {
    zh: "已达到 10 条备注上限。",
    en: "10-note limit reached."
  }
} satisfies Record<string, LocalizedText>;

export const serviceAreas: ServiceArea[] = [
  {
    id: "shanghai",
    name: {
      zh: "上海",
      en: "Shanghai"
    }
  },
  {
    id: "melbourne",
    name: {
      zh: "墨尔本",
      en: "Melbourne"
    }
  }
];

export const serviceTypesByArea: Record<ServiceAreaId, ServiceType[]> = {
  shanghai: [],
  melbourne: [
    {
      id: "wedding-portrait",
      name: {
        zh: "婚纱照",
        en: "Wedding Portraits"
      },
      status: "comingSoon"
    },
    {
      id: "registry-wedding",
      name: {
        zh: "注册结婚跟拍",
        en: "Registry Wedding Coverage"
      },
      status: "available"
    },
    {
      id: "daily-portrait",
      name: {
        zh: "日常写真",
        en: "Lifestyle Portraits"
      },
      status: "comingSoon"
    },
    {
      id: "graduation",
      name: {
        zh: "毕业照",
        en: "Graduation Photography"
      },
      status: "available"
    },
    {
      id: "id-photo",
      name: {
        zh: "证件照",
        en: "ID Photos"
      },
      status: "detailsPending"
    }
  ]
};

export const graduationSchools: GraduationSchool[] = [
  {
    id: "unimelb",
    name: {
      zh: "墨尔本大学",
      en: "The University of Melbourne"
    }
  },
  {
    id: "monash",
    name: {
      zh: "莫纳什大学",
      en: "Monash University"
    }
  },
  {
    id: "rmit",
    name: {
      zh: "皇家墨尔本理工大学",
      en: "RMIT"
    }
  }
];

export const sceneTypesBySchool: Record<GraduationSchoolId, GraduationSceneType[]> = {
  unimelb: [
    {
      id: "unimelb-single",
      name: {
        zh: "校园外景：墨尔本大学",
        en: "Campus outdoor: University of Melbourne"
      },
      description: {
        zh: "适合在墨尔本大学校园内完成标志性地点打卡。",
        en: "Designed for iconic graduation portraits around the University of Melbourne campus."
      }
    },
    {
      id: "unimelb-carlton-garden",
      name: {
        zh: "双场景：墨尔本大学 + Carlton Garden",
        en: "Two scenes: University of Melbourne + Carlton Garden"
      },
      description: {
        zh: "包含墨尔本大学与 Carlton Garden，适合毕业典礼当天的双场景记录。",
        en: "Includes the University of Melbourne and Carlton Garden, suitable for graduation ceremony day coverage."
      }
    },
    {
      id: "graduation-studio",
      name: {
        zh: "室内棚拍：毕业照",
        en: "Indoor studio: Graduation"
      },
      description: {
        zh: "早鸟棚拍草案，适合想要稳定背景和室内灯光的毕业照。",
        en: "Draft early-bird studio option for controlled backgrounds and indoor lighting."
      }
    }
  ],
  monash: [
    {
      id: "shared-campus",
      name: {
        zh: "校园外景：共享基础套餐",
        en: "Campus outdoor: Shared base packages"
      },
      description: {
        zh: "使用与墨尔本大学单场景相同的基础套餐结构。",
        en: "Uses the same base package structure as the University of Melbourne single-scene option."
      }
    },
    {
      id: "graduation-studio",
      name: {
        zh: "室内棚拍：毕业照",
        en: "Indoor studio: Graduation"
      },
      description: {
        zh: "早鸟棚拍草案，适合想要稳定背景和室内灯光的毕业照。",
        en: "Draft early-bird studio option for controlled backgrounds and indoor lighting."
      }
    }
  ],
  rmit: [
    {
      id: "shared-campus",
      name: {
        zh: "校园外景：共享基础套餐",
        en: "Campus outdoor: Shared base packages"
      },
      description: {
        zh: "使用与墨尔本大学单场景相同的基础套餐结构。",
        en: "Uses the same base package structure as the University of Melbourne single-scene option."
      }
    },
    {
      id: "graduation-studio",
      name: {
        zh: "室内棚拍：毕业照",
        en: "Indoor studio: Graduation"
      },
      description: {
        zh: "早鸟棚拍草案，适合想要稳定背景和室内灯光的毕业照。",
        en: "Draft early-bird studio option for controlled backgrounds and indoor lighting."
      }
    }
  ]
};

function createBaseGraduationPackages(sceneTypeId: SceneTypeId, idPrefix: string): GraduationPackage[] {
  return [
    {
      id: `${idPrefix}-1`,
      sceneTypeId,
      name: {
        zh: "套餐 1",
        en: "Package 1"
      },
      priceAud: 198,
      details: {
        zh: [
          "200 张底片，底片全给",
          "送 9 张精修",
          "送花絮视频",
          "5-6 个打卡点",
          "学校标志性地点打卡"
        ],
        en: [
          "200 original photos, all originals included",
          "9 retouched photos included",
          "Behind-the-scenes video included",
          "5-6 photo spots",
          "Iconic campus locations"
        ]
      }
    },
    {
      id: `${idPrefix}-2`,
      sceneTypeId,
      name: {
        zh: "套餐 2",
        en: "Package 2"
      },
      priceAud: 298,
      details: {
        zh: [
          "300 张底片，底片全给",
          "送 13 张精修",
          "送花絮视频",
          "8-9 个打卡点",
          "更细致，更多拍摄点位",
          "更多动作指导 + 可选地点"
        ],
        en: [
          "300 original photos, all originals included",
          "13 retouched photos included",
          "Behind-the-scenes video included",
          "8-9 photo spots",
          "More detailed coverage and more locations",
          "More posing guidance + optional locations"
        ]
      }
    },
    {
      id: `${idPrefix}-3`,
      sceneTypeId,
      name: {
        zh: "套餐 3",
        en: "Package 3"
      },
      priceAud: 388,
      details: {
        zh: [
          "400 张底片，底片全给",
          "送 18 张精修",
          "送花絮视频",
          "所有打卡点（以现场条件为准）",
          "底片多",
          "适合跟父母朋友合照"
        ],
        en: [
          "400 original photos, all originals included",
          "18 retouched photos included",
          "Behind-the-scenes video included",
          "All photo spots where conditions allow",
          "More originals",
          "Suitable for photos with parents and friends"
        ]
      }
    }
  ];
}

export const graduationPackages: Record<SceneTypeId, GraduationPackage[]> = {
  "shared-campus": createBaseGraduationPackages("shared-campus", "shared-campus"),
  "unimelb-single": createBaseGraduationPackages("unimelb-single", "unimelb-single"),
  "unimelb-carlton-garden": [
    {
      id: "unimelb-dual-1",
      sceneTypeId: "unimelb-carlton-garden",
      name: {
        zh: "套餐 1",
        en: "Package 1"
      },
      priceAud: 388,
      details: {
        zh: ["墨尔本大学 + Carlton Garden", "400 张底片，底片全给", "18 张精修", "送花絮视频"],
        en: [
          "University of Melbourne + Carlton Garden",
          "400 original photos, all originals included",
          "18 retouched photos",
          "Behind-the-scenes video included"
        ]
      }
    },
    {
      id: "unimelb-dual-2",
      sceneTypeId: "unimelb-carlton-garden",
      name: {
        zh: "套餐 2",
        en: "Package 2"
      },
      priceAud: 468,
      details: {
        zh: ["墨尔本大学 + Carlton Garden", "600 张底片，底片全给", "25 张精修", "送花絮视频"],
        en: [
          "University of Melbourne + Carlton Garden",
          "600 original photos, all originals included",
          "25 retouched photos",
          "Behind-the-scenes video included"
        ]
      }
    },
    {
      id: "unimelb-dual-3",
      sceneTypeId: "unimelb-carlton-garden",
      name: {
        zh: "套餐 3",
        en: "Package 3"
      },
      priceAud: 548,
      details: {
        zh: ["墨尔本大学 + Carlton Garden", "700 张底片，底片全给", "30 张精修", "送花絮视频"],
        en: [
          "University of Melbourne + Carlton Garden",
          "700 original photos, all originals included",
          "30 retouched photos",
          "Behind-the-scenes video included"
        ]
      }
    }
  ],
  "graduation-studio": [
    {
      id: "graduation-studio-early-bird",
      sceneTypeId: "graduation-studio",
      name: {
        zh: "棚拍早鸟套餐",
        en: "Studio early-bird package"
      },
      priceAud: 79,
      details: {
        zh: [
          "80 张底片，底片全给",
          "送 9 张精修",
          "送花絮视频",
          "送拍立得",
          "可选择背景模板",
          "包含服装或道具清单待确认"
        ],
        en: [
          "80 original photos, all originals included",
          "9 retouched photos included",
          "Behind-the-scenes video included",
          "Instant photo included",
          "Background template selection",
          "Included wardrobe or props list pending confirmation"
        ]
      }
    }
  ]
};

export const studioBackgroundTemplates: StudioBackgroundTemplate[] = [
  {
    id: "soft-white",
    name: {
      zh: "柔白背景",
      en: "Soft white"
    },
    description: {
      zh: "干净明亮，适合证件感或正式毕业照。",
      en: "Clean and bright for a polished graduation portrait."
    }
  },
  {
    id: "warm-grey",
    name: {
      zh: "暖灰背景",
      en: "Warm grey"
    },
    description: {
      zh: "柔和低饱和，适合温柔自然的棚拍效果。",
      en: "Soft and muted for a natural studio look."
    }
  },
  {
    id: "classic-red",
    name: {
      zh: "复古红背景",
      en: "Classic red"
    },
    description: {
      zh: "更有仪式感，适合想要醒目纪念感的客人。",
      en: "More ceremonial for a bold keepsake portrait."
    }
  }
];

export const graduationAddOns: Record<AddOnGroupId, GraduationAddOn[]> = {
  clothing: [
    {
      id: "graduation-gown-cap",
      name: {
        zh: "毕业袍 + 毕业帽",
        en: "Graduation gown + cap"
      },
      priceAud: 35,
      description: {
        zh: "各学校各学院都有。",
        en: "Available for each school and faculty."
      }
    },
    {
      id: "heels-qipao-dress",
      name: {
        zh: "高跟鞋 + 旗袍/裙子",
        en: "Heels + qipao/dress"
      },
      priceAud: 10
    },
    {
      id: "hanfu",
      name: {
        zh: "汉服",
        en: "Hanfu"
      },
      priceAud: 40
    }
  ],
  props: [
    {
      id: "bear-cap-bouquet-set",
      name: {
        zh: "毕业熊 + 学士帽 + 花束组合",
        en: "Graduation bear + cap + bouquet set"
      },
      priceAud: 10
    },
    {
      id: "bouquet",
      name: {
        zh: "花束",
        en: "Bouquet"
      },
      priceAud: 3
    },
    {
      id: "academic-cap",
      name: {
        zh: "学士帽",
        en: "Academic cap"
      },
      priceAud: 3
    },
    {
      id: "graduation-bear",
      name: {
        zh: "毕业熊",
        en: "Graduation bear"
      },
      priceAud: 5
    },
    {
      id: "academic-scroll",
      name: {
        zh: "毕业筒",
        en: "Graduation scroll"
      },
      priceAud: 4,
      availableSchoolIds: ["unimelb"]
    },
    {
      id: "uniform-bear",
      name: {
        zh: "校服熊",
        en: "Uniform bear"
      },
      priceAud: 3
    }
  ],
  makeup: [
    {
      id: "female-styling",
      name: {
        zh: "女生妆造",
        en: "Female makeup and styling"
      },
      priceAud: 149,
      description: {
        zh: "含化妆、发型、睫毛、修眉，送跟妆，送 5 张精修。",
        en: "Includes makeup, hair, lashes, brow shaping, on-site touch-up, and 5 retouched photos."
      }
    },
    {
      id: "male-styling",
      name: {
        zh: "男生妆造",
        en: "Male makeup and styling"
      },
      priceAud: 79,
      description: {
        zh: "含化妆、发型、修眉，送跟妆，送 5 张精修；主要修饰五官并增强立体度。",
        en: "Includes makeup, hair, brow shaping, on-site touch-up, and 5 retouched photos; focused on natural facial definition."
      }
    }
  ],
  studio: [
    {
      id: "studio-simple-styling",
      name: {
        zh: "棚内简单妆造",
        en: "Simple indoor styling"
      },
      priceAud: 79,
      description: {
        zh: "与毕业照外景妆造和注册跟拍妆造分开计算。",
        en: "Kept separate from outdoor graduation styling and registry styling."
      },
      availableSceneTypeIds: ["graduation-studio"]
    },
    {
      id: "studio-specialty-prop",
      name: {
        zh: "特殊道具",
        en: "Specialty prop"
      },
      priceAud: 8,
      description: {
        zh: "草案价格，公开文案和可用性仍需确认。",
        en: "Draft price; public wording and availability still need confirmation."
      },
      availableSceneTypeIds: ["graduation-studio"]
    }
  ]
};

export const registryPackages: RegistryPackage[] = [
  {
    id: "registry-1",
    name: {
      zh: "套餐 1",
      en: "Package 1"
    },
    priceAud: 249,
    originalPhotos: 200,
    retouchedPhotos: 5,
    includedExtraLocations: 0,
    details: {
      zh: ["注册/求婚跟拍", "亲朋好友合影", "200 张底片", "送花絮视频", "5 张精修"],
      en: [
        "Registry or proposal coverage",
        "Family and friend group photos",
        "200 original photos",
        "Behind-the-scenes video included",
        "5 retouched photos"
      ]
    }
  },
  {
    id: "registry-2",
    name: {
      zh: "套餐 2",
      en: "Package 2"
    },
    priceAud: 349,
    originalPhotos: 300,
    retouchedPhotos: 9,
    includedExtraLocations: 0,
    details: {
      zh: [
        "包含套餐 1",
        "注册后双人情侣照",
        "交换戒指、亲吻、展示证书、证书签字等摆拍",
        "300 张底片",
        "送花絮视频",
        "9 张精修"
      ],
      en: [
        "Includes Package 1",
        "After-registry couple portraits",
        "Posed moments such as ring exchange, kiss, certificate display and signing",
        "300 original photos",
        "Behind-the-scenes video included",
        "9 retouched photos"
      ]
    }
  },
  {
    id: "registry-3",
    name: {
      zh: "套餐 3",
      en: "Package 3"
    },
    priceAud: 449,
    originalPhotos: 400,
    retouchedPhotos: 13,
    includedExtraLocations: 1,
    details: {
      zh: ["包含套餐 2", "另 1 个地点情侣照", "400 张底片", "送花絮视频", "13 张精修"],
      en: [
        "Includes Package 2",
        "Couple portraits at 1 additional location",
        "400 original photos",
        "Behind-the-scenes video included",
        "13 retouched photos"
      ]
    }
  },
  {
    id: "registry-4",
    name: {
      zh: "套餐 4",
      en: "Package 4"
    },
    priceAud: 549,
    originalPhotos: 500,
    retouchedPhotos: 17,
    includedExtraLocations: 2,
    details: {
      zh: ["包含套餐 2", "另 2 个地点情侣照", "500 张底片", "送花絮视频", "17 张精修"],
      en: [
        "Includes Package 2",
        "Couple portraits at 2 additional locations",
        "500 original photos",
        "Behind-the-scenes video included",
        "17 retouched photos"
      ]
    }
  }
];

export const registryAddOns: Record<RegistryAddOnGroupId, RegistryAddOn[]> = {
  styling: [
    {
      id: "registry-female-styling",
      name: {
        zh: "女生发型 + 妆容 + 睫毛",
        en: "Female hair, makeup and lashes"
      },
      priceAud: 149,
      retouchedBonus: 5,
      description: {
        zh: "送 5 张精修。",
        en: "Includes 5 additional retouched photos."
      }
    },
    {
      id: "registry-male-styling",
      name: {
        zh: "男生发型 + 妆容",
        en: "Male hair and makeup"
      },
      priceAud: 79
    }
  ],
  "registry-props": [
    {
      id: "registry-bouquet",
      name: {
        zh: "花束",
        en: "Bouquet"
      },
      priceAud: 10
    },
    {
      id: "registry-white-veil-gloves",
      name: {
        zh: "白纱手套",
        en: "White veil gloves"
      },
      priceAud: 10
    },
    {
      id: "registry-veil",
      name: {
        zh: "头纱",
        en: "Veil"
      },
      priceAud: 10
    },
    {
      id: "registry-accessories",
      name: {
        zh: "配饰",
        en: "Accessories"
      },
      priceAud: 10
    }
  ],
  wardrobe: [
    {
      id: "registry-wedding-dress",
      name: {
        zh: "女婚纱",
        en: "Wedding dress"
      },
      priceAud: 40
    },
    {
      id: "registry-suit",
      name: {
        zh: "西装",
        en: "Suit"
      },
      priceAud: 40
    }
  ]
};

export const galleryCategories: GalleryCategory[] = [
  {
    id: "all",
    name: {
      zh: "全部",
      en: "All"
    }
  },
  {
    id: "graduation",
    name: {
      zh: "毕业照",
      en: "Graduation"
    }
  },
  {
    id: "unimelb",
    name: {
      zh: "墨尔本大学",
      en: "University of Melbourne"
    }
  },
  {
    id: "monash",
    name: {
      zh: "莫纳什大学",
      en: "Monash"
    }
  },
  {
    id: "rmit",
    name: {
      zh: "RMIT",
      en: "RMIT"
    }
  },
  {
    id: "registry-wedding",
    name: {
      zh: "注册跟拍",
      en: "Registry"
    }
  },
  {
    id: "studio",
    name: {
      zh: "棚拍",
      en: "Studio"
    }
  },
  {
    id: "id-photo",
    name: {
      zh: "证件照",
      en: "ID Photos"
    }
  }
];

export const galleryImages: GalleryImage[] = Array.from({ length: 9 }, (_, index) => {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const schoolCategory: GalleryCategoryId =
    index < 4 ? "unimelb" : index < 7 ? "monash" : "rmit";

  return {
    src: `images/models/model-${paddedIndex}.jpg`,
    alt: {
      zh: `DARIA STUDIO 墨尔本毕业照作品 ${index + 1}`,
      en: `DARIA STUDIO Melbourne graduation portrait ${index + 1}`
    },
    categoryIds: ["graduation", schoolCategory]
  };
});
