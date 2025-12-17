export interface NavMenuItemConfig {
  titleKey: string;
  url: string;
  items: NavMenuItemConfig[];
}

export interface NavSectionConfig {
  sectionTitleKey: string;
  items: Omit<NavMenuItemConfig, "items">[];
}

export const headerMenuConfig: NavMenuItemConfig[] = [
  {
    titleKey: "menu.tradition.title",
    url: "/kashmir-shaivism",
    items: [
      { titleKey: "menu.tradition.philosophy", url: "/kashmir-shaivism", items: [] },
      { titleKey: "menu.tradition.swami", url: "/swami-lakshmanjoo", items: [] },
      { titleKey: "menu.tradition.about", url: "/about", items: [] },
    ],
  },
  {
    titleKey: "menu.study.title",
    url: "/storebook",
    items: [
      { titleKey: "menu.study.storebook", url: "/storebook", items: [] },
      { titleKey: "menu.study.workshops", url: "/workshops", items: [] },
      { titleKey: "menu.study.community", url: "/community", items: [] },
    ],
  },
  {
    titleKey: "menu.visit.title",
    url: "/ashrams",
    items: [
      { titleKey: "menu.visit.ashrams", url: "/ashrams", items: [] },
      { titleKey: "menu.visit.faq", url: "/faq", items: [] },
      { titleKey: "menu.visit.contact", url: "/contact", items: [] },
    ],
  },
  {
    titleKey: "menu.donate.title",
    url: "/donate",
    items: [],
  }
];

export const footerMenuConfig: NavSectionConfig[] = [
  {
    sectionTitleKey: "menu.sections.explore",
    items: [
      { titleKey: "menu.items.philosophy", url: "/kashmir-shaivism" },
      { titleKey: "menu.items.swami", url: "/swami-lakshmanjoo" },
      { titleKey: "menu.items.about", url: "/about" },
    ],
  },
  {
    sectionTitleKey: "menu.sections.resources",
    items: [
      { titleKey: "menu.items.storebook", url: "/storebook" },
      { titleKey: "menu.items.workshops", url: "/workshops" },
      { titleKey: "menu.items.community", url: "/community" },
    ],
  },
  {
    sectionTitleKey: "menu.sections.support",
    items: [
      { titleKey: "menu.items.ashrams", url: "/ashrams" },
      { titleKey: "menu.items.faq", url: "/faq" },
      { titleKey: "menu.items.contact", url: "/contact" },
      { titleKey: "menu.items.donate", url: "/donate" },
    ],
  },
];