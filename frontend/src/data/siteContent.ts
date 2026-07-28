export type Language = "zh" | "en";

export type LocalizedText = Record<Language, string>;

export type GalleryImage = {
  src: string;
  alt: LocalizedText;
};

export type School = {
  id: string;
  name: LocalizedText;
};

export type Campus = {
  id: string;
  name: LocalizedText;
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

export type AddOnOption = {
  id: string;
  name: LocalizedText;
  priceAud?: number;
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
  campusLabel: {
    zh: "选择校区",
    en: "Choose a campus"
  },
  campusPlaceholder: {
    zh: "请选择校区",
    en: "Please choose a campus"
  },
  pointsLabel: {
    zh: "选择拍照点位",
    en: "Choose photo spots"
  },
  propsLabel: {
    zh: "道具",
    en: "Props"
  },
  clothingLabel: {
    zh: "服装",
    en: "Clothing"
  },
  makeupLabel: {
    zh: "美妆",
    en: "Makeup"
  },
  gownColorLabel: {
    zh: "选择学士服披肩颜色",
    en: "Choose academic hood color"
  },
  gownColorPlaceholder: {
    zh: "请选择披肩颜色",
    en: "Please choose a hood color"
  },
  gownColorNote: {
    zh: "请您自行确认学士服披肩的颜色",
    en: "Please confirm the academic hood color yourself."
  },
  selectedPrefix: {
    zh: "已选择",
    en: "Selected"
  },
  selectedSuffix: {
    zh: "个点位",
    en: "spots"
  },
  estimatedTotal: {
    zh: "预计总价",
    en: "Estimated total"
  },
  perPoint: {
    zh: "每个拍照点位 25 AUD",
    en: "25 AUD per photo spot"
  },
  noSelection: {
    zh: "选择 A-Z 点位后自动计算价格",
    en: "Select A-Z spots to calculate pricing"
  },
  shanghaiEmpty: {
    zh: "上海地区服务套餐暂未开放",
    en: "Shanghai service packages are not available yet."
  },
  comingSoon: {
    zh: "暂未拓展",
    en: "Coming soon"
  },
  makeupPlaceholder: {
    zh: "美妆服务暂未拓展",
    en: "Makeup service is not available yet."
  },
  propsPriceNote: {
    zh: "每个道具 5 AUD，可多选",
    en: "5 AUD per prop, multiple selections allowed"
  },
  makeupPriceNote: {
    zh: "面妆 20 AUD，头发 5 AUD，可多选",
    en: "Makeup 20 AUD, hair 5 AUD, multiple selections allowed"
  },
  availableNow: {
    zh: "当前可选",
    en: "Available now"
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
    zh: "每栏最多可添加 10 条备注",
    en: "Up to 10 notes per section"
  },
  notesMaxReached: {
    zh: "已达到 10 条备注上限",
    en: "10-note limit reached"
  }
} satisfies Record<string, LocalizedText>;

export const pricing = {
  graduationSpotPriceAud: 25,
  propPriceAud: 5,
  weddingDayRateAud: 2000
};

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

export const schools: School[] = [
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

export const campusesBySchool: Record<string, Campus[]> = {
  unimelb: [
    {
      id: "parkville",
      name: {
        zh: "帕克维尔校区",
        en: "Parkville"
      }
    },
    {
      id: "southbank",
      name: {
        zh: "南岸校区",
        en: "Southbank"
      }
    },
    {
      id: "burnley",
      name: {
        zh: "伯恩利校区",
        en: "Burnley"
      }
    },
    {
      id: "werribee",
      name: {
        zh: "韦里比校区",
        en: "Werribee"
      }
    }
  ],
  monash: [
    {
      id: "clayton",
      name: {
        zh: "克莱顿校区",
        en: "Clayton"
      }
    },
    {
      id: "caulfield",
      name: {
        zh: "考菲尔德校区",
        en: "Caulfield"
      }
    },
    {
      id: "peninsula",
      name: {
        zh: "半岛校区",
        en: "Peninsula"
      }
    },
    {
      id: "parkville",
      name: {
        zh: "帕克维尔校区",
        en: "Parkville"
      }
    },
    {
      id: "alfred",
      name: {
        zh: "阿尔弗雷德校区",
        en: "Alfred"
      }
    }
  ],
  rmit: [
    {
      id: "melbourne-city",
      name: {
        zh: "墨尔本市中心校区",
        en: "Melbourne City"
      }
    },
    {
      id: "bundoora",
      name: {
        zh: "邦多拉校区",
        en: "Bundoora"
      }
    },
    {
      id: "brunswick",
      name: {
        zh: "布伦瑞克校区",
        en: "Brunswick"
      }
    }
  ]
};

export const shootPoints = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index)
);

export const propOptions: AddOnOption[] = [
  {
    id: "graduation-scroll",
    name: {
      zh: "毕业卷轴",
      en: "Graduation Scroll"
    },
    priceAud: pricing.propPriceAud
  },
  {
    id: "graduation-bear",
    name: {
      zh: "毕业小熊",
      en: "Graduation Bear"
    },
    priceAud: pricing.propPriceAud
  },
  {
    id: "bouquet",
    name: {
      zh: "花束",
      en: "Bouquet"
    },
    priceAud: pricing.propPriceAud
  }
];

export const clothingOptions: AddOnOption[] = [
  {
    id: "academic-gown",
    name: {
      zh: "学士服",
      en: "Academic Gown"
    },
    priceAud: 30
  }
];

export const gownColorOptions: AddOnOption[] = [
  {
    id: "black",
    name: {
      zh: "黑色",
      en: "Black"
    }
  },
  {
    id: "white",
    name: {
      zh: "白色",
      en: "White"
    }
  },
  {
    id: "red",
    name: {
      zh: "红色",
      en: "Red"
    }
  },
  {
    id: "blue",
    name: {
      zh: "蓝色",
      en: "Blue"
    }
  },
  {
    id: "green",
    name: {
      zh: "绿色",
      en: "Green"
    }
  },
  {
    id: "purple",
    name: {
      zh: "紫色",
      en: "Purple"
    }
  },
  {
    id: "gold",
    name: {
      zh: "金色",
      en: "Gold"
    }
  },
  {
    id: "other",
    name: {
      zh: "其他 / 不确定",
      en: "Other / Not sure"
    }
  }
];

export const makeupOptions: AddOnOption[] = [
  {
    id: "face-makeup",
    name: {
      zh: "面妆",
      en: "Makeup"
    },
    priceAud: 20
  },
  {
    id: "hair",
    name: {
      zh: "头发",
      en: "Hair"
    },
    priceAud: 5
  }
];

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
