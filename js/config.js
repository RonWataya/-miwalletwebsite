/* ==========================================================================
   Mi Wallet Limited — site configuration
   Every contact detail, link, price and app version shown on the website is
   read from here. Change a value once and every page picks it up.
   In HTML:  data-cfg="path"            fills the element's text
             data-cfg-href="path"       sets the link (add data-cfg-scheme="mailto|tel|wa")
             data-cfg-format="mwk"      formats a number as MWK 65,000
   ========================================================================== */
window.SITE_CONFIG = {
  company: {
    name: "Mi Wallet Limited",
    address: "Minolta Complex, Kristwick, Blantyre, Malawi",
    website: "https://miwalletmw.com"
  },

  phone: {
    primary: "+265 991 448 707",
    secondary: "+265 887 355 195",
    whatsapp: "+265 991 448 707"
  },

  email: {
    info: "info@miwalletmw.com",
    support: "support@miwalletmw.com",
    business: "ronnex@miwalletmw.com"
  },

  links: {
    omnipos: "https://omnipos.miwalletmw.com",
    carhire: "https://carhire.miwalletmw.com",
    creditManual: "downloads/Mi_Wallet_Credit_User_Manual.pdf"
  },

  /* Monthly prices in MWK */
  pricing: {
    credit: 6600,
    omniposStandard: 65000,
    omniposPro: 150000,
    omniposBusiness: 450000
  },

  /* Renewal: leave mobileMoneyNumber empty to hide it on the renewal page */
  renewal: {
    mobileMoneyNumber: "",
    reference: "your registered phone number"
  },

  downloads: {
    credit: {
      name: "Mi Wallet Credit",
      version: "3.0",
      released: "7 April 2026",
      file: "assets/downloads/Credit.apk",
      requires: "Android 5.0 or higher"
    },
    cashier: {
      name: "OmniPOS Cashier",
      version: "1.0",
      released: "4 April 2026",
      file: "assets/downloads/omnipos.apk",
      requires: "Android 5.0 or higher"
    }
  },

  api: {
    subscriptionStatus: "/api/app/web-status"
  }
};
