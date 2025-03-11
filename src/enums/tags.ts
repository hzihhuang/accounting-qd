import {
  faUtensils,
  faShoppingCart,
  faBoxOpen,
  faBus,
  faHome,
  faTshirt,
  faFilm,
  faUsers,
  faPhone,
  faPlane,
  faBriefcaseMedical,
  faShieldAlt,
  faBook,
  faPaw,
  faBriefcase,
  faCar,
  faLaptop,
  faDumbbell,
  faCouch,
  faBaby,
  faCookieBite,
  faAppleAlt,
  faTicketAlt,
  faGift,
  faMoneyBillWave,
  faCoins,
  faPiggyBank,
  faHandshake,
  faStore,
  faEnvelopeOpenText,
  faUndo,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons'

// 标签id
export enum TagsEnum {
  // **高频支出类（常用的排前）**
  CATERING = 1, // 餐饮 🍽️
  SHOPPING = 2, // 购物 🛒
  FRUIT = 3, // 水果 🍏
  SNACKS = 4, // 零食 🍪
  DAILY = 5, // 日用 📦
  TRAFFIC = 6, // 交通 🚌
  HOUSING = 7, // 住房 🏠
  CLOTHING = 8, // 服饰 👕
  ENTERTAINMENT = 9, // 娱乐 🎬
  SOCIAL = 10, // 社交 👥
  COMMUNICATION = 11, // 通讯 📞
  TRAVEL = 12, // 旅行 ✈️
  MEDICAL = 13, // 医疗 🏥
  INSURANCE = 14, // 保险 🛡️
  STUDY = 15, // 学习 📚
  PET = 16, // 宠物 🐾
  OFFICE = 17, // 办公 💼
  CAR = 18, // 汽车 🚗
  DIGITAL = 19, // 数码 💻
  SPORTS = 20, // 运动 🏋️
  HOUSEHOLD = 21, // 家庭 🛋️
  CHILDCARE = 22, // 育儿 👶
  LOTTERY = 23, // 彩票 🎟️
  GIFTCASH = 24, // 礼金 🎁
  OTHER = 25, // 其他 ❓

  // **收入类**
  SALARY = 26, // 工资收入 💰
  BONUS = 27, // 奖金 🏅
  INVESTMENT = 28, // 投资收益 🏦
  PARTTIME = 29, // 兼职收入 🤝
  BUSINESS = 30, // 经营收入 🏪
  REDPACKET = 31, // 红包收入 ✉️
  REFUND = 32, // 退款 🔄
  OTHER2 = 33, // 其他 ❓
}

export const TagsIcons: Record<TagsEnum, any> = {
  // **高频支出类**
  [TagsEnum.CATERING]: faUtensils, // 餐饮 🍽️
  [TagsEnum.SHOPPING]: faShoppingCart, // 购物 🛒
  [TagsEnum.FRUIT]: faAppleAlt, // 水果 🍏
  [TagsEnum.SNACKS]: faCookieBite, // 零食 🍪
  [TagsEnum.DAILY]: faBoxOpen, // 日用 📦
  [TagsEnum.TRAFFIC]: faBus, // 交通 🚌
  [TagsEnum.HOUSING]: faHome, // 住房 🏠
  [TagsEnum.CLOTHING]: faTshirt, // 服饰 👕
  [TagsEnum.ENTERTAINMENT]: faFilm, // 娱乐 🎬
  [TagsEnum.SOCIAL]: faUsers, // 社交 👥
  [TagsEnum.COMMUNICATION]: faPhone, // 通讯 📞
  [TagsEnum.TRAVEL]: faPlane, // 旅行 ✈️
  [TagsEnum.MEDICAL]: faBriefcaseMedical, // 医疗 🏥
  [TagsEnum.INSURANCE]: faShieldAlt, // 保险 🛡️
  [TagsEnum.STUDY]: faBook, // 学习 📚
  [TagsEnum.PET]: faPaw, // 宠物 🐾
  [TagsEnum.OFFICE]: faBriefcase, // 办公 💼
  [TagsEnum.CAR]: faCar, // 汽车 🚗
  [TagsEnum.DIGITAL]: faLaptop, // 数码 💻
  [TagsEnum.SPORTS]: faDumbbell, // 运动 🏋️
  [TagsEnum.HOUSEHOLD]: faCouch, // 家庭 🛋️
  [TagsEnum.CHILDCARE]: faBaby, // 育儿 👶
  [TagsEnum.LOTTERY]: faTicketAlt, // 彩票 🎟️
  [TagsEnum.GIFTCASH]: faGift, // 礼金 🎁
  [TagsEnum.OTHER]: faEllipsis, // 其他 ❓

  // **收入类**
  [TagsEnum.SALARY]: faMoneyBillWave, // 工资收入 💰
  [TagsEnum.BONUS]: faCoins, // 奖金 🏅
  [TagsEnum.INVESTMENT]: faPiggyBank, // 投资收益 🏦
  [TagsEnum.PARTTIME]: faHandshake, // 兼职收入 🤝
  [TagsEnum.BUSINESS]: faStore, // 经营收入 🏪
  [TagsEnum.REDPACKET]: faEnvelopeOpenText, // 红包收入 ✉️
  [TagsEnum.REFUND]: faUndo, // 退款 🔄
  [TagsEnum.OTHER2]: faEllipsis, // 其他 ❓
}
