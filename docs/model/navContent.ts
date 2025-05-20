interface Nav {
  abbreviation: string; //简介
  icon: string; // 图标
  link: string; // 链接
  name: string; // 名称
}

interface NavContent {
  name: string; // 名称
  nav: Nav[]; // 导航
}

export type { Nav, NavContent };
