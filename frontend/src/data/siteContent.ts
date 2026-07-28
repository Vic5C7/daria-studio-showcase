export type Language = "zh" | "en";

export type LocalizedText = Record<Language, string>;
export type LocalizedList = Record<Language, string[]>;

export type GalleryImage = {
  src: string;
  alt: LocalizedText;
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
  | "graduation";

export type ServiceType = {
  id: ServiceTypeId;
  name: LocalizedText;
  isAvailable: boolean;
};

export type GraduationSchoolId = "unimelb" | "monash" | "rmit";

export type GraduationSchool = {
  id: GraduationSchoolId;
  name: LocalizedText;
};

export type SceneTypeId = "unimelb-single" | "unimelb-carlton-garden";

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

export type AddOnGroupId = "clothing" | "props" | "makeup";

export type GraduationAddOn = {
  id: string;
  name: LocalizedText;
  priceAud: number;
  description?: LocalizedText;
};

export const brand = {
  name: {
    zh: "DG墨尔本摄影",
    en: "DG Melbourne Photography"
  },
  tagline: {
    zh: "毕业照与注册结婚跟拍",
    en: "Graduation and registry wedding photography"
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
    zh: "首版使用当前样片展示，后续可以继续加入更多学校、情侣和活动作品。",
    en: "This first version uses the current sample images and can grow with more campus, couple and event work."
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
    zh: "选择场景类型",
    en: "Choose scene type"
  },
  packageLabel: {
    zh: "选择毕业照套餐",
    en: "Choose graduation package"
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
  addOnsLabel: {
    zh: "加购项",
    en: "Add-ons"
  },
  estimatedTotal: {
    zh: "预计总价",
    en: "Estimated total"
  },
  choosePackageTotal: {
    zh: "请选择套餐",
    en: "Choose a package"
  },
  pricePendingTotal: {
    zh: "价格待确认",
    en: "Price pending"
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
  pricePendingTitle: {
    zh: "套餐价格待确认",
    en: "Package pricing pending"
  },
  pricePendingCopy: {
    zh: "这所学校的毕业照套餐暂未确认。你可以先留下备注，后续预约表单会继续沿用这些信息。",
    en: "Graduation package pricing for this school is not confirmed yet. You can leave notes here for the future booking flow."
  },
  packageDetailsLabel: {
    zh: "套餐包含",
    en: "Package includes"
  },
  addOnIntro: {
    zh: "加购项可多选，费用会自动计入预计总价。",
    en: "You can select multiple add-ons. They will be added to the estimated total."
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
      isAvailable: false
    },
    {
      id: "registry-wedding",
      name: {
        zh: "注册结婚跟拍",
        en: "Registry Wedding Coverage"
      },
      isAvailable: false
    },
    {
      id: "daily-portrait",
      name: {
        zh: "日常写真",
        en: "Lifestyle Portraits"
      },
      isAvailable: false
    },
    {
      id: "graduation",
      name: {
        zh: "毕业照",
        en: "Graduation Photography"
      },
      isAvailable: true
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

export const sceneTypesBySchool: Partial<Record<GraduationSchoolId, GraduationSceneType[]>> = {
  unimelb: [
    {
      id: "unimelb-single",
      name: {
        zh: "单场景：墨尔本大学",
        en: "Single scene: University of Melbourne"
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
    }
  ]
};

export const graduationPackages: Record<SceneTypeId, GraduationPackage[]> = {
  "unimelb-single": [
    {
      id: "unimelb-single-1",
      sceneTypeId: "unimelb-single",
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
          "学校标志性地点打卡点"
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
      id: "unimelb-single-2",
      sceneTypeId: "unimelb-single",
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
      id: "unimelb-single-3",
      sceneTypeId: "unimelb-single",
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
          "所有打卡点",
          "底片多",
          "适合跟父母朋友合照"
        ],
        en: [
          "400 original photos, all originals included",
          "18 retouched photos included",
          "Behind-the-scenes video included",
          "All photo spots",
          "More originals",
          "Suitable for photos with parents and friends"
        ]
      }
    }
  ],
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
        zh: ["墨尔本大学 + Carlton Garden", "400 张底片，底片全给", "18 张精修"],
        en: [
          "University of Melbourne + Carlton Garden",
          "400 original photos, all originals included",
          "18 retouched photos"
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
        zh: ["墨尔本大学 + Carlton Garden", "600 张底片，底片全给", "25 张精修"],
        en: [
          "University of Melbourne + Carlton Garden",
          "600 original photos, all originals included",
          "25 retouched photos"
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
        zh: ["墨尔本大学 + Carlton Garden", "700 张底片，底片全给", "30 张精修"],
        en: [
          "University of Melbourne + Carlton Garden",
          "700 original photos, all originals included",
          "30 retouched photos"
        ]
      }
    }
  ]
};

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
        zh: "学术筒",
        en: "Academic scroll"
      },
      priceAud: 4
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
  ]
};

export const galleryImages: GalleryImage[] = Array.from({ length: 9 }, (_, index) => {
  const paddedIndex = String(index + 1).padStart(2, "0");

  return {
    src: `images/models/model-${paddedIndex}.jpg`,
    alt: {
      zh: `DG墨尔本摄影毕业照作品 ${index + 1}`,
      en: `DG Melbourne Photography graduation portrait ${index + 1}`
    }
  };
});
