# 🎯 हिंदी क्विज़ ऐप

एक **Progressive Web App (PWA)** जिसमें हिंदी में विभिन्न विषयों पर क्विज़ खेल सकते हैं।

![हिंदी क्विज़](icons/icon-192x192.png)

## 🌐 Live Demo
👉 **[hindi-quiz-app.netlify.app](https://hindi-quiz-app.netlify.app)**

---

## 📁 Project Structure — फ़ाइलों की भाषाएँ

```
hindi-quiz-webapp/
│
├── index.html          ← HTML  (वेब पेज की संरचना)
├── manifest.json       ← JSON  (PWA सेटिंग्स)
├── sw.js               ← JavaScript  (Service Worker — offline support)
├── favicon.ico         ← ICO  (browser tab icon)
├── README.md           ← Markdown  (दस्तावेज़)
│
├── css/
│   └── style.css       ← CSS  (डिज़ाइन और रंग)
│
├── js/
│   ├── data.js         ← JavaScript  (प्रश्न डेटा)
│   └── app.js          ← JavaScript  (app logic)
│
└── icons/
    ├── logo.svg              ← SVG  (vector logo)
    ├── icon-72x72.png        ← PNG  (PWA icon)
    ├── icon-96x96.png        ← PNG
    ├── icon-128x128.png      ← PNG
    ├── icon-144x144.png      ← PNG
    ├── icon-152x152.png      ← PNG
    ├── icon-192x192.png      ← PNG
    ├── icon-384x384.png      ← PNG
    ├── icon-512x512.png      ← PNG
    └── apple-touch-icon.png  ← PNG  (iOS icon)
```

---

## 💻 कौन-सी Coding Languages लगती हैं?

| भाषा | File | काम |
|------|------|-----|
| **HTML** | `index.html` | वेब पेज की संरचना (ढाँचा) |
| **CSS** | `css/style.css` | रंग, डिज़ाइन, animations |
| **JavaScript** | `js/app.js`, `js/data.js`, `sw.js` | Logic, data, offline support |
| **JSON** | `manifest.json` | PWA configuration |
| **SVG** | `icons/logo.svg` | Vector logo |

---

## ✨ Features

- 🏛️ **6 श्रेणियाँ** — सामान्य ज्ञान, इतिहास, विज्ञान, भूगोल, हिंदी साहित्य, खेलकूद
- ❓ **60 प्रश्न** (हर श्रेणी में 10)
- ⏱️ **15 सेकंड टाइमर** — तेज़ जवाब = ज़्यादा अंक
- 📱 **PWA** — Phone में Install होती है
- 📶 **Offline** — बिना internet के भी चलती है
- 🎊 **Confetti** — सही जवाब पर animation
- 🔄 **Random** — हर बार अलग क्रम में प्रश्न

---

## 🚀 GitHub Pages पर Deploy करें

1. यह repository **Fork** करें
2. **Settings → Pages** जाएं
3. Source: **Deploy from branch → main → / (root)**
4. Save करें → आपकी site live!

**URL:** `https://[your-username].github.io/hindi-quiz-app/`

---

## 🛠️ Local पर चलाएं

```bash
# Clone करें
git clone https://github.com/[username]/hindi-quiz-app.git

# Folder खोलें
cd hindi-quiz-app

# index.html को browser में खोलें
# या VS Code Live Server use करें
```

---

## 📲 PWA Install करें

Chrome/Edge में:
1. App खोलें
2. Address bar में **Install (⊕)** बटन दबाएं
3. **Install** पर click करें

---

## 🤝 Contribute करें

नए प्रश्न जोड़ने के लिए `js/data.js` file edit करें:

```javascript
'नई श्रेणी': [
  {
    q: 'आपका प्रश्न?',
    opts: ['विकल्प अ', 'विकल्प ब', 'विकल्प स', 'विकल्प द'],
    ans: 0,  // सही उत्तर का index (0-3)
    exp: 'व्याख्या यहाँ लिखें।'
  }
]
```

---

Made with ❤️ in India 🇮🇳
