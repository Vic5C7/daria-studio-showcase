export type Language = "zh" | "en";

export type LocalizedText = Record<Language, string>;
export type LocalizedList = Record<Language, string[]>;

export type GalleryImage = {
  src: string;
  alt: LocalizedText;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type ServiceAreaId = string;

export type ServiceArea = {
  id: ServiceAreaId;
  name: LocalizedText;
  isAvailable: boolean;
  isVisible: boolean;
};

export type ServiceTypeId = string;

export type GalleryServiceTypeId = string;
export type StudioModelId = string;
export type ServiceKind = "graduation" | "registry" | "id-photo" | "other";

export type ServiceType = {
  id: ServiceTypeId;
  name: LocalizedText;
  isAvailable: boolean;
  isVisible?: boolean;
  kind?: ServiceKind;
};

export type GalleryServiceType = {
  id: GalleryServiceTypeId;
  name: LocalizedText;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type StudioModelGallery = {
  id: StudioModelId;
  name: LocalizedText;
  images: GalleryImage[];
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type GraduationSchoolId = string;

export type GraduationSchool = {
  id: GraduationSchoolId;
  name: LocalizedText;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type SceneTypeId = string;

export type GraduationSceneType = {
  id: SceneTypeId;
  name: LocalizedText;
  description: LocalizedList;
  previewImage: GalleryImage;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type GraduationPackage = {
  id: string;
  sceneTypeId: SceneTypeId;
  name: LocalizedText;
  priceAud: number;
  details: LocalizedList;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type RegistryPackage = {
  id: string;
  name: LocalizedText;
  priceAud: number;
  details: LocalizedList;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type AddOnGroupId = "clothing" | "props" | "makeup";
export type RegistryAddOnGroupId = "registryStyling" | "registryProps" | "registryClothing";
export type IdPhotoAddOnGroupId = "idPhotoStyling" | "idPhotoProps" | "idPhotoClothing";

export type GraduationAddOn = {
  id: string;
  name: LocalizedText;
  priceAud: number;
  description?: LocalizedList;
  previewImage?: GalleryImage;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type RegistryAddOn = {
  id: string;
  name: LocalizedText;
  priceAud: number;
  description?: LocalizedList;
  previewImage?: GalleryImage;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export type IdPhotoAddOn = {
  id: string;
  name: LocalizedText;
  priceAud: number;
  description?: LocalizedList;
  previewImage?: GalleryImage;
  isAvailable?: boolean;
  isVisible?: boolean;
};

export const brand = {
  name: {
    zh: "DARIA STUDIO",
    en: "DARIA STUDIO"
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
  },
  login: {
    zh: "登录",
    en: "Log in"
  },
  register: {
    zh: "注册",
    en: "Sign up"
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
  studioModelLabel: {
    zh: "棚拍影集",
    en: "Studio Albums"
  }
} satisfies Record<string, LocalizedText>;

export const authContent = {
  eyebrow: {
    zh: "客户账户",
    en: "Client Account"
  },
  title: {
    zh: "管理预约与拍摄资料",
    en: "Manage bookings and shoot details"
  },
  intro: {
    zh: "登录后可查看套餐选择、保存沟通记录，并继续完成拍摄预约。",
    en: "Sign in to review package choices, save notes, and continue a booking."
  },
  loginTab: {
    zh: "登录",
    en: "Log in"
  },
  registerTab: {
    zh: "注册",
    en: "Sign up"
  },
  nameLabel: {
    zh: "姓名",
    en: "Name"
  },
  namePlaceholder: {
    zh: "请输入姓名",
    en: "Your name"
  },
  emailLabel: {
    zh: "邮箱",
    en: "Email"
  },
  emailPlaceholder: {
    zh: "you@example.com",
    en: "you@example.com"
  },
  passwordLabel: {
    zh: "密码",
    en: "Password"
  },
  passwordPlaceholder: {
    zh: "请输入密码",
    en: "Enter your password"
  },
  remember: {
    zh: "记住我",
    en: "Remember me"
  },
  forgotPassword: {
    zh: "忘记密码",
    en: "Forgot password"
  },
  loginSubmit: {
    zh: "登录",
    en: "Log in"
  },
  registerSubmit: {
    zh: "创建账户",
    en: "Create account"
  },
  switchToRegister: {
    zh: "还没有账户？立即注册",
    en: "No account yet? Sign up"
  },
  switchToLogin: {
    zh: "已有账户？返回登录",
    en: "Already have an account? Log in"
  },
  secureNote: {
    zh: "预约、选片与发票信息将同步到你的客户账户。",
    en: "Bookings, selections, and invoices stay with your client account."
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
    zh: "选择套餐",
    en: "Choose package"
  },
  registryPackageLabel: {
    zh: "选择注册/求婚套餐",
    en: "Choose registry/proposal package"
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
  areaComingSoon: {
    zh: "暂未开放",
    en: "Not available yet"
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
  packageSpotNote: {
    zh: "打卡点会根据当天实际情况灵活调整。若遇到天气、光线、人流、临时管制等因素，部分点位可能不适合拍摄或无法完成，我们会选择同校区内更合适的替代点位，尽量保证整体成片效果和拍摄体验。",
    en: "Photo spots may be adjusted based on the conditions on the day. If weather, lighting, crowds, temporary access limits, or other on-site factors make certain spots unsuitable or unavailable, we will choose suitable alternative locations on campus to help maintain the overall photo quality and shooting experience."
  },
  registryExtraLocationLabel: {
    zh: "额外地点备注",
    en: "Extra location notes"
  },
  registryExtraLocationIntro: {
    zh: "每添加 1 条地点备注，费用增加 100 AUD，并增加 4 张精修。",
    en: "Each location note adds 100 AUD and 4 retouched photos."
  },
  registryExtraLocationPlaceholder: {
    zh: "请输入额外地点，例如 Carlton Garden",
    en: "Add an extra location, e.g. Carlton Garden"
  },
  registryAddLocation: {
    zh: "添加地点",
    en: "Add location"
  },
  registryExtraLocationMaxReached: {
    zh: "已达到 10 个额外地点上限。",
    en: "10 extra-location limit reached."
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
  },
  copySelectionEyebrow: {
    zh: "联系工作室",
    en: "Contact the studio"
  },
  copySelectionTitle: {
    zh: "复制全部选择信息",
    en: "Copy all selection details"
  },
  copySelectionHelper: {
    zh: "复制套餐、加购项、备注和预计总价，发送给客服。",
    en: "Copy your package, add-ons, notes, and estimated total to send to support."
  },
  copySelectionButton: {
    zh: "一键复制全部信息",
    en: "Copy all details"
  },
  copySelectionSuccess: {
    zh: "已复制全部信息",
    en: "All details copied"
  },
  copySelectionFailure: {
    zh: "复制失败，请手动复制",
    en: "Copy failed. Please copy manually."
  },
  customerServiceWechat: {
    zh: "客服微信",
    en: "WeChat support"
  }
} satisfies Record<string, LocalizedText>;

export const serviceAreas: ServiceArea[] = [
  {
    id: "shanghai",
    name: {
      zh: "上海",
      en: "Shanghai"
    },
    isAvailable: false,
    isVisible: true
  },
  {
    id: "melbourne",
    name: {
      zh: "墨尔本",
      en: "Melbourne"
    },
    isAvailable: true,
    isVisible: true
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
        zh: "注册/求婚跟拍",
        en: "Registry / Proposal Coverage"
      },
      isAvailable: true
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
      id: "id-photo",
      name: {
        zh: "证件照",
        en: "ID Photo"
      },
      isAvailable: true
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

const optionPreviewImage: GalleryImage = {
  src: "images/options/option-preview-placeholder.jpg",
  alt: {
    zh: "DARIA STUDIO 选项预览占位图",
    en: "DARIA STUDIO option preview placeholder"
  }
};

const sharedSingleGraduationSceneType: GraduationSceneType = {
  id: "unimelb-single",
  name: {
    zh: "单场景：学校校园",
    en: "Single scene: campus"
  },
  description: {
    zh: ["适合在所选学校校园内完成标志性地点打卡。"],
    en: ["Designed for iconic graduation portraits around the selected campus."]
  },
  previewImage: optionPreviewImage
};

const graduationStudioSceneType: GraduationSceneType = {
  id: "graduation-studio",
  name: {
    zh: "棚拍",
    en: "Studio Shoot"
  },
  description: {
    zh: ["适合想要快速完成棚内毕业照，并选择多种背景模板的拍摄。"],
    en: ["Designed for a quick in-studio graduation shoot with multiple background templates."]
  },
  previewImage: optionPreviewImage
};

const unimelbGraduationSceneTypes: GraduationSceneType[] = [
  sharedSingleGraduationSceneType,
  {
    id: "unimelb-carlton-garden",
    name: {
      zh: "双场景：学校校园 + Carlton Garden",
      en: "Two scenes: campus + Carlton Garden"
    },
    description: {
      zh: ["包含所选学校校园与 Carlton Garden，适合毕业典礼当天的双场景记录。"],
      en: ["Includes the selected campus and Carlton Garden, suitable for graduation ceremony day coverage."]
    },
    previewImage: optionPreviewImage
  },
  graduationStudioSceneType
];

export const sceneTypesBySchool: Partial<Record<GraduationSchoolId, GraduationSceneType[]>> = {
  unimelb: unimelbGraduationSceneTypes,
  monash: [sharedSingleGraduationSceneType, graduationStudioSceneType],
  rmit: [sharedSingleGraduationSceneType, graduationStudioSceneType]
};

export const graduationPackages: Partial<Record<SceneTypeId, GraduationPackage[]>> = {
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
          "基本所有打卡点",
          "底片多",
          "适合跟父母朋友合照"
        ],
        en: [
          "400 original photos, all originals included",
          "18 retouched photos included",
          "Behind-the-scenes video included",
          "Most photo spots",
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
        zh: ["学校校园 + Carlton Garden", "400 张底片，底片全给", "18 张精修"],
        en: [
          "Campus + Carlton Garden",
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
        zh: ["学校校园 + Carlton Garden", "600 张底片，底片全给", "25 张精修"],
        en: [
          "Campus + Carlton Garden",
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
        zh: ["学校校园 + Carlton Garden", "700 张底片，底片全给", "30 张精修"],
        en: [
          "Campus + Carlton Garden",
          "700 original photos, all originals included",
          "30 retouched photos"
        ]
      }
    }
  ]
};

export const graduationStudioPackage = {
  title: {
    zh: "早鸟棚拍套餐",
    en: "Early Bird Studio Package"
  },
  priceAud: 79,
  details: {
    zh: [
      "80 张底片，底片全给",
      "送花絮视频",
      "送拍立得",
      "包含内搭、毕业服、衬衫、基础道具",
      "9 张精修",
      "多种背景模板皆可选"
    ],
    en: [
      "80 original photos, all originals included",
      "Behind-the-scenes video included",
      "Polaroid included",
      "Inner outfit, graduation outfit, shirt, and basic props included",
      "9 retouched photos",
      "Multiple background templates available"
    ]
  }
} satisfies {
  title: LocalizedText;
  priceAud: number;
  details: LocalizedList;
};

export const idPhotoPackage = {
  title: {
    zh: "早鸟证件照套餐",
    en: "Early Bird ID Photo Package"
  },
  priceAud: 79,
  details: {
    zh: [
      "早鸟价仅需 79 AUD",
      "证件照拍摄",
      "80 张底片，底片全给",
      "送花絮视频",
      "送拍立得",
      "包含内搭、裙子、衬衫、西装",
      "也可以自带服装",
      "9 张精修",
      "多种背景模板皆可选"
    ],
    en: [
      "Early bird price: 79 AUD",
      "ID photo shoot",
      "80 original photos, all originals included",
      "Behind-the-scenes video included",
      "Polaroid included",
      "Inner outfit, skirt, shirt, and suit included",
      "You can also bring your own outfit",
      "9 retouched photos",
      "Multiple background templates available"
    ]
  }
} satisfies {
  title: LocalizedText;
  priceAud: number;
  details: LocalizedList;
};

export const registryPackages: RegistryPackage[] = [
  {
    id: "registry-1",
    name: {
      zh: "套餐 1",
      en: "Package 1"
    },
    priceAud: 249,
    details: {
      zh: ["注册/求婚拍摄", "亲朋合影", "200 张底片，底片全给", "送花絮视频", "5 张精修"],
      en: [
        "Registry/proposal coverage",
        "Family and friend group photos",
        "200 original photos, all originals included",
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
    details: {
      zh: [
        "注册/求婚拍摄",
        "亲朋合影",
        "双人注册后情侣照",
        "注册摆拍：交换戒指、亲吻、展示证书、证书签字等",
        "300 张底片，底片全给",
        "送花絮视频",
        "9 张精修"
      ],
      en: [
        "Registry/proposal coverage",
        "Family and friend group photos",
        "Post-registry couple portraits",
        "Directed registry poses: ring exchange, kiss, certificate display, certificate signing, and more",
        "300 original photos, all originals included",
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
    details: {
      zh: [
        "注册/求婚拍摄",
        "亲朋合影",
        "双人注册后情侣照",
        "注册摆拍：交换戒指、亲吻、展示证书、证书签字等",
        "另一地点情侣照",
        "400 张底片，底片全给",
        "送花絮视频",
        "13 张精修"
      ],
      en: [
        "Registry/proposal coverage",
        "Family and friend group photos",
        "Post-registry couple portraits",
        "Directed registry poses: ring exchange, kiss, certificate display, certificate signing, and more",
        "Couple portraits at one additional location",
        "400 original photos, all originals included",
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
    details: {
      zh: [
        "注册/求婚拍摄",
        "亲朋合影",
        "双人注册后情侣照",
        "注册摆拍：交换戒指、亲吻、展示证书、证书签字等",
        "另两地点情侣照",
        "500 张底片，底片全给",
        "送花絮视频",
        "17 张精修"
      ],
      en: [
        "Registry/proposal coverage",
        "Family and friend group photos",
        "Post-registry couple portraits",
        "Directed registry poses: ring exchange, kiss, certificate display, certificate signing, and more",
        "Couple portraits at two additional locations",
        "500 original photos, all originals included",
        "Behind-the-scenes video included",
        "17 retouched photos"
      ]
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
        zh: ["各学校各学院都有。"],
        en: ["Available for each school and faculty."]
      },
      previewImage: optionPreviewImage
    },
    {
      id: "heels-qipao-dress",
      name: {
        zh: "高跟鞋 + 旗袍/裙子",
        en: "Heels + qipao/dress"
      },
      priceAud: 10,
      previewImage: optionPreviewImage
    },
    {
      id: "hanfu",
      name: {
        zh: "汉服",
        en: "Hanfu"
      },
      priceAud: 40,
      previewImage: optionPreviewImage
    }
  ],
  props: [
    {
      id: "bear-cap-bouquet-set",
      name: {
        zh: "毕业熊 + 学士帽 + 花束组合",
        en: "Graduation bear + cap + bouquet set"
      },
      priceAud: 10,
      previewImage: optionPreviewImage
    },
    {
      id: "bouquet",
      name: {
        zh: "花束",
        en: "Bouquet"
      },
      priceAud: 3,
      previewImage: optionPreviewImage
    },
    {
      id: "academic-cap",
      name: {
        zh: "学士帽",
        en: "Academic cap"
      },
      priceAud: 3,
      previewImage: optionPreviewImage
    },
    {
      id: "graduation-bear",
      name: {
        zh: "毕业熊",
        en: "Graduation bear"
      },
      priceAud: 5,
      previewImage: optionPreviewImage
    },
    {
      id: "academic-scroll",
      name: {
        zh: "学术筒",
        en: "Academic scroll"
      },
      priceAud: 4,
      previewImage: optionPreviewImage
    },
    {
      id: "uniform-bear",
      name: {
        zh: "校服熊",
        en: "Uniform bear"
      },
      priceAud: 3,
      previewImage: optionPreviewImage
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
        zh: ["含化妆、发型、睫毛、修眉，送跟妆，送 5 张精修。"],
        en: ["Includes makeup, hair, lashes, brow shaping, on-site touch-up, and 5 retouched photos."]
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
        zh: ["含化妆、发型、修眉，送跟妆，送 5 张精修；主要修饰五官并增强立体度。"],
        en: ["Includes makeup, hair, brow shaping, on-site touch-up, and 5 retouched photos; focused on natural facial definition."]
      }
    }
  ]
};

// Each school starts with the shared defaults, but the editable copy keeps a
// separate list so schools can publish different add-ons later.
export const graduationAddOnsBySchool: Record<
  string,
  Record<AddOnGroupId, GraduationAddOn[]>
> = Object.fromEntries(
  graduationSchools.map((school) => [
    school.id,
    {
      clothing: graduationAddOns.clothing,
      props:
        school.id === "monash" || school.id === "rmit"
          ? graduationAddOns.props.filter((addOn) => addOn.id !== "academic-scroll")
          : graduationAddOns.props,
      makeup: graduationAddOns.makeup
    }
  ])
) as Record<string, Record<AddOnGroupId, GraduationAddOn[]>>;

export const graduationStudioProps: GraduationAddOn[] = [];

export const idPhotoAddOns: Record<IdPhotoAddOnGroupId, IdPhotoAddOn[]> = {
  idPhotoClothing: [],
  idPhotoStyling: [
    {
      id: "id-photo-studio-styling",
      name: {
        zh: "棚内简单妆造",
        en: "Simple in-studio makeup and styling"
      },
      priceAud: 79
    }
  ],
  idPhotoProps: []
};

export const registryAddOns: Record<RegistryAddOnGroupId, RegistryAddOn[]> = {
  registryStyling: [
    {
      id: "registry-female-styling",
      name: {
        zh: "女妆造",
        en: "Female styling"
      },
      priceAud: 149,
      description: {
        zh: ["发型 + 妆容 + 睫毛，送 5 张精修。"],
        en: ["Hair, makeup, lashes, and 5 retouched photos included."]
      }
    },
    {
      id: "registry-male-styling",
      name: {
        zh: "男妆造",
        en: "Male styling"
      },
      priceAud: 79,
      description: {
        zh: ["发型 + 妆容。"],
        en: ["Hair and makeup."]
      }
    }
  ],
  registryProps: [
    {
      id: "registry-bouquet",
      name: {
        zh: "花束",
        en: "Bouquet"
      },
      priceAud: 10,
      previewImage: optionPreviewImage
    },
    {
      id: "registry-white-gloves",
      name: {
        zh: "白纱手套",
        en: "White tulle gloves"
      },
      priceAud: 10,
      previewImage: optionPreviewImage
    },
    {
      id: "registry-veil",
      name: {
        zh: "头纱",
        en: "Veil"
      },
      priceAud: 10,
      previewImage: optionPreviewImage
    },
    {
      id: "registry-accessories",
      name: {
        zh: "配饰",
        en: "Accessories"
      },
      priceAud: 10,
      previewImage: optionPreviewImage
    }
  ],
  registryClothing: [
    {
      id: "registry-wedding-dress",
      name: {
        zh: "女婚纱",
        en: "Wedding dress"
      },
      priceAud: 40,
      previewImage: optionPreviewImage
    },
    {
      id: "registry-suit",
      name: {
        zh: "西装",
        en: "Suit"
      },
      priceAud: 40,
      previewImage: optionPreviewImage
    }
  ]
};

const galleryTypeNames: Record<GalleryServiceTypeId, LocalizedText> = {
  "wedding-portrait": {
    zh: "婚纱照",
    en: "Wedding Portraits"
  },
  "registry-wedding": {
    zh: "注册/求婚跟拍",
    en: "Registry / Proposal Coverage"
  },
  "daily-portrait": {
    zh: "日常写真",
    en: "Lifestyle Portraits"
  },
  "id-photo": {
    zh: "证件照",
    en: "ID Photo"
  },
  graduation: {
    zh: "毕业照",
    en: "Graduation Photography"
  },
  "studio-shoot": {
    zh: "棚拍",
    en: "Studio Shoot"
  }
};

export const galleryServiceTypes: GalleryServiceType[] = [
  {
    id: "wedding-portrait",
    name: galleryTypeNames["wedding-portrait"]
  },
  {
    id: "registry-wedding",
    name: galleryTypeNames["registry-wedding"]
  },
  {
    id: "daily-portrait",
    name: galleryTypeNames["daily-portrait"]
  },
  {
    id: "id-photo",
    name: galleryTypeNames["id-photo"]
  },
  {
    id: "graduation",
    name: galleryTypeNames.graduation
  },
  {
    id: "studio-shoot",
    name: galleryTypeNames["studio-shoot"]
  }
];

const galleryImageSources = Array.from({ length: 9 }, (_, index) => ({
  src: optionPreviewImage.src,
  index: index + 1
}));

function createGalleryImagesForService(
  serviceName: LocalizedText,
  sources = galleryImageSources
): GalleryImage[] {
  return sources.map((image) => ({
    src: image.src,
    alt: {
      zh: `DARIA STUDIO ${serviceName.zh}样片 ${image.index}`,
      en: `DARIA STUDIO ${serviceName.en} sample ${image.index}`
    }
  }));
}

function createStudioModelImages(modelName: LocalizedText, coverImageIndex: number): GalleryImage[] {
  const coverImageSource = galleryImageSources.find((image) => image.index === coverImageIndex);
  const orderedSources = coverImageSource
    ? [
        coverImageSource,
        ...galleryImageSources.filter((image) => image.index !== coverImageIndex)
      ]
    : galleryImageSources;

  return createGalleryImagesForService(modelName, orderedSources.slice(0, 5));
}

export const galleryImages: GalleryImage[] = createGalleryImagesForService(galleryTypeNames.graduation);

export const studioModelGalleries: StudioModelGallery[] = galleryImageSources.map((image) => {
  const modelNumber = String(image.index).padStart(2, "0");

  return {
    id: `model-${image.index}` as StudioModelId,
    name: {
      zh: `模特 ${modelNumber}`,
      en: `Model ${modelNumber}`
    },
    images: createStudioModelImages(
      {
        zh: `棚拍模特 ${image.index}`,
        en: `Studio model ${image.index}`
      },
      image.index
    )
  };
});

export const galleryImagesByServiceType: Record<GalleryServiceTypeId, GalleryImage[]> = {
  "wedding-portrait": createGalleryImagesForService(galleryTypeNames["wedding-portrait"]),
  "registry-wedding": createGalleryImagesForService(galleryTypeNames["registry-wedding"]),
  "daily-portrait": createGalleryImagesForService(galleryTypeNames["daily-portrait"]),
  "id-photo": createGalleryImagesForService(galleryTypeNames["id-photo"]),
  graduation: galleryImages,
  "studio-shoot": studioModelGalleries[0].images
};
