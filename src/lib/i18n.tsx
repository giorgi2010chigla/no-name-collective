import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Lang = "en" | "ka";

const dict = {
  en: {
    nav_home: "Index",
    nav_shop: "Shop",
    nav_lang: "ქარ",
    hero_line1: "We don't sell clothes.",
    hero_line2: "We sell art.",
    hero_sub: "A concept store for those who refuse to be named.",
    scroll: "Scroll",
    manifesto_title: "Manifesto",
    manifesto_body: "No logo. No noise. No name. Garments built as objects, worn as statements. Each piece is a refusal — of trend, of identity, of the obvious.",
    slogan_1: "Anonymous by design",
    slogan_2: "Wear the silence",
    slogan_3: "Form follows defiance",
    slogan_4: "Nothing to prove",
    shop_title: "Selected Works",
    shop_sub: "Three pieces. No collections. Always available.",
    contact_title: "Find Us",
    location: "Location",
    location_addr: "12 Aghmashenebeli Ave\nTbilisi, Georgia",
    hours: "Hours",
    hours_val: "Mon — Sat\n12:00 — 20:00",
    contact: "Contact",
    contact_val: "hello@noname.store\n+995 555 00 00 00",
    footer: "© NO NAME — All rights reserved",
    view: "View",
    price: "Price",
  },
  ka: {
    nav_home: "მთავარი",
    nav_shop: "მაღაზია",
    nav_lang: "EN",
    hero_line1: "ჩვენ არ ვყიდით ტანსაცმელს.",
    hero_line2: "ჩვენ ვყიდით ხელოვნებას.",
    hero_sub: "კონცეპტ სტორი მათთვის, ვისაც სახელი არ სჭირდება.",
    scroll: "გადაახვიე",
    manifesto_title: "მანიფესტი",
    manifesto_body: "უ-ლოგო. უ-ხმაურო. უ-სახელო. ტანსაცმელი როგორც ობიექტი, ნაცმევი როგორც განცხადება. თითოეული ნაჭერი არის უარი — ტრენდზე, იდენტობაზე, თვალსაჩინოზე.",
    slogan_1: "ანონიმური დიზაინით",
    slogan_2: "ატარე სიჩუმე",
    slogan_3: "ფორმა მიჰყვება ჯანყს",
    slogan_4: "არაფერი დასამტკიცებელი",
    shop_title: "შერჩეული ნამუშევრები",
    shop_sub: "სამი ნაჭერი. კოლექციების გარეშე. ყოველთვის ხელმისაწვდომი.",
    contact_title: "გვიპოვე",
    location: "მისამართი",
    location_addr: "აღმაშენებლის გამზ. 12\nთბილისი, საქართველო",
    hours: "საათები",
    hours_val: "ორშ — შაბ\n12:00 — 20:00",
    contact: "კონტაქტი",
    contact_val: "hello@noname.store\n+995 555 00 00 00",
    footer: "© NO NAME — ყველა უფლება დაცულია",
    view: "ნახე",
    price: "ფასი",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict.en) => string };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (stored === "en" || stored === "ka") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: keyof typeof dict.en) => dict[lang][k] ?? dict.en[k];
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
