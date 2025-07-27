import {
  airbnb,
  apple,
  arrowUp,
  bill,
  binance,
  card,
  close,
  coinbase,
  discount,
  dropbox,
  facebook,
  google,
  instagram,
  linkedin,
  logo,
  menu,
  people01,
  people02,
  people03,
  quotes,
  robot,
  robot2,
  send,
  shield,
  star,
  taxXmindLogo,
  twitter,
} from '../assets';
  
  export const navLinks = [
    {
      id: "home",
      title: "Ana Sayfa",
    },
    {
      id: "features",
      title: "Özellikler",
    },
    {
      id: "testimonials",
      title: "Referanslar",
    },
    {
      id: "contact",
      title: "İletişim",
    },
  ];
  
  export const features = [
    {
      id: "feature-1",
      icon: star,
      title: "Yapay Zeka Destekli Analiz",
      content:
        "Hasta verilerini analiz ederek kişiselleştirilmiş tedavi protokolleri oluşturan gelişmiş yapay zeka algoritmaları.",
    },
    {
      id: "feature-2",
      icon: shield,
      title: "Güvenli Veri Yönetimi",
      content:
        "Hasta bilgilerinin en yüksek güvenlik standartlarında korunması ve KVKK uyumluluğu ile merkezi veri depolama.",
    },
    {
      id: "feature-3",
      icon: send,
      title: "Gerçek Zamanlı İzleme",
      content:
        "Tedavi süreçlerinin anlık takibi, biyobelirteç ölçümlerinin otomatik değerlendirmesi ve sürekli optimizasyon.",
    },
  ];
  
  export const feedback = [
    {
      id: "feedback-1",
      content:
        "RRTM platformu sayesinde hastalarımın tedavi süreçlerini çok daha etkili bir şekilde yönetebiliyorum. Yapay zeka destekli öneriler gerçekten değerli.",
      name: "Dr. Ayşe Kaya",
      title: "İç Hastalıkları Uzmanı",
      img: people01,
    },
    {
      id: "feedback-2",
      content:
        "Biyobelirteç analizi ve kişiselleştirilmiş protokoller ile hastalarımda gözle görülür iyileşmeler elde ediyoruz. Harika bir sistem.",
      name: "Prof. Dr. Mehmet Özkan",
      title: "Geleneksel ve Tamamlayıcı Tıp Uzmanı",
      img: people02,
    },
    {
      id: "feedback-3",
      content:
        "Merkezi veri yönetimi ile tüm hasta bilgilerimize kolayca erişebiliyor, tedavi etkinliğini objektif olarak değerlendirebiliyoruz.",
      name: "Dr. Zeynep Aksoy",
      title: "Dahiliye Uzmanı",
      img: people03,
    },
  ];
  
  export const stats = [
    {
      id: "stats-1",
      title: "Aktif Hasta",
      value: "2,500+",
    },
    {
      id: "stats-2",
      title: "Tamamlanmış Tedavi",
      value: "15,000+",
    },
    {
      id: "stats-3",
      title: "Başarı Oranı",
      value: "%92",
    },
    {
      id: "stats-4",
      title: "Hekim Kullanıcı",
      value: "150+",
    },
  ];
  
  export const footerLinks = [
    {
      title: "Platform",
      links: [
        {
          name: "Özellikler",
          link: "#features",
        },
        {
          name: "Nasıl Çalışır",
          link: "#how-it-works",
        },
        {
          name: "RRTM Protokolü",
          link: "#rrtm-protocol",
        },
        {
          name: "Güvenlik",
          link: "#security",
        },
        {
          name: "Hizmet Şartları",
          link: "/terms",
        },
      ],
    },
    {
      title: "Destek",
      links: [
        {
          name: "Yardım Merkezi",
          link: "/help",
        },
        {
          name: "Eğitim Materyalleri",
          link: "/training",
        },
        {
          name: "Teknik Destek",
          link: "/support",
        },
        {
          name: "API Dokümantasyonu",
          link: "/api-docs",
        },
        {
          name: "Sistem Durumu",
          link: "/status",
        },
      ],
    },
    {
      title: "Hakkımızda",
      links: [
        {
          name: "RTM Klinik",
          link: "/about",
        },
        {
          name: "Ekibimiz",
          link: "/team",
        },
        {
          name: "Araştırma",
          link: "/research",
        },
        {
          name: "Kariyer",
          link: "/careers",
        },
      ],
    },
  ];
  
  export const socialMedia = [
    {
      id: "social-media-1",
      icon: instagram,
      link: "https://www.instagram.com/rtmklinik",
    },
    {
      id: "social-media-2",
      icon: facebook,
      link: "https://www.facebook.com/rtmklinik",
    },
    {
      id: "social-media-3",
      icon: twitter,
      link: "https://www.twitter.com/rtmklinik",
    },
    {
      id: "social-media-4",
      icon: linkedin,
      link: "https://www.linkedin.com/company/rtmklinik",
    },
  ];
  
  export const clients = [
    {
      id: "client-1",
      logo: airbnb,
      name: "Sağlık Bakanlığı"
    },
    {
      id: "client-2",
      logo: binance,
      name: "Türk Tabipleri Birliği"
    },
    {
      id: "client-3",
      logo: coinbase,
      name: "GETAT Derneği"
    },
    {
      id: "client-4",
      logo: dropbox,
      name: "Üniversite Hastaneleri"
    },
  ];