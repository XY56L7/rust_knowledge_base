# 🦀 Rust fejlesztői kurzus - Kezdőtől haladóig

Egy modern, interaktív Next.js weboldal, amely a Rust programozási nyelv tanítására szolgál. A projekt teljes mértékben JSON fájlokból táplálkozik, így könnyen bővíthető és karbantartható.

## 🚀 Funkciók

- **Interaktív leckék**: Részletes leckék markdown formátumban
- **Kód példák**: Szintaxis kiemeléssel és magyarázatokkal
- **Gyakorlatok**: Gyakorló feladatok megoldásokkal és tippekkel
- **Progresszív tananyag**: Kezdőtől haladó szintig strukturált kurzus
- **Modern UI**: Reszponzív design dark mode támogatással
- **JSON-alapú**: Minden tartalom JSON fájlokból, könnyen szerkeszthető

## 📁 Projekt struktúra

```
rust-for-beginners/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Főoldal
│   ├── lessons/           # Lecke oldalak
│   └── layout.tsx         # Root layout
├── components/            # React komponensek
│   ├── CodeBlock.tsx      # Kód megjelenítő
│   └── ExerciseCard.tsx   # Gyakorlat kártya
├── data/                  # JSON adatfájlok
│   ├── course.json        # Kurzus struktúra
│   └── lessons/           # Lecke fájlok
├── types/                 # TypeScript típusok
│   └── index.ts
└── utils/                 # Segédfüggvények
    └── dataLoader.ts      # Adat betöltő
```

## 🛠️ Telepítés és futtatás

### Előfeltételek

- Node.js 18+ 
- npm vagy yarn

### Telepítés

```bash
npm install
```

### Fejlesztési szerver indítása

```bash
npm run dev
```

Nyisd meg a böngészőben: [http://localhost:3000](http://localhost:3000)

### Build készítése

```bash
npm run build
npm start
```

## 📝 Új lecke hozzáadása

### Automatikus módszer (ajánlott)

Használd a beépített scriptet:

```bash
npm run create-lesson lesson-X-title "Lecke címe"
```

Ez létrehoz egy sablon JSON fájlt a `data/lessons/` könyvtárban.

### Manuális módszer

1. **Kurzus struktúra frissítése**: Szerkeszd a `data/course.json` fájlt, és add hozzá az új lecke ID-ját a megfelelő fejezethez.

2. **Lecke fájl létrehozása**: Hozz létre egy új JSON fájlt a `data/lessons/` könyvtárban, például `lesson-X-title.json`.

3. **Lecke struktúra**:

```json
{
  "id": "lesson-X-title",
  "title": "Lecke címe",
  "description": "Rövid leírás",
  "content": "# Markdown tartalom\n\nItt lehet markdown formátumban írni...",
  "difficulty": "beginner|intermediate|advanced",
  "estimatedTime": 20,
  "prerequisites": ["lesson-1-introduction"],
  "codeExamples": [
    {
      "id": "ex-1",
      "title": "Példa címe",
      "description": "Leírás",
      "code": "fn main() {\n    println!(\"Hello!\");\n}",
      "explanation": "Magyarázat",
      "language": "rust"
    }
  ],
  "exercises": [
    {
      "id": "exercise-1",
      "title": "Feladat címe",
      "description": "Leírás",
      "starterCode": "fn main() {\n    // Kód\n}",
      "solution": "fn main() {\n    println!(\"Megoldás\");\n}",
      "hints": ["Tipp 1", "Tipp 2"],
      "difficulty": "easy|medium|hard"
    }
  ]
}
```

## 🎨 Testreszabás

### Színek és stílusok

A Tailwind CSS konfiguráció a `tailwind.config.ts` fájlban található. A színek és stílusok könnyen módosíthatók.

### Dark mode

A dark mode automatikusan működik a rendszer beállításai alapján. A `app/globals.css` fájlban testreszabható.

## 📚 Jelenlegi kurzus tartalom

A kurzus 9 fejezetből áll:

1. **Alapok** - Bevezetés, változók, adattípusok, függvények
2. **Ownership és Borrowing** - Rust egyedi memóriakezelése
3. **Struktúrák és Enumok** - Adatszerkezetek és mintaillesztés
4. **Hibakezelés** - Result és Option típusok
5. **Kollekciók** - Vektorok, hash map-ek, stringek
6. **Modulok és Csomagok** - Kód szervezése
7. **Generikus típusok és Traits** - Polimorfizmus
8. **Párhuzamos programozás** - Thread-ek, async/await
9. **Haladó témák** - Macro-k, unsafe Rust, optimalizálás

## 🔧 Technológiai stack

- **Next.js 14** - React framework App Router-rel
- **TypeScript** - Típusbiztonság
- **Tailwind CSS** - Utility-first CSS framework
- **React Markdown** - Markdown renderelés
- **JSON** - Adattárolás és konfiguráció

## 📄 Licenc

Ez a projekt oktatási célokra készült.

## 🤝 Közreműködés

A projekt könnyen bővíthető új leckékkel. Egyszerűen add hozzá az új lecke JSON fájlt a `data/lessons/` könyvtárba, és frissítsd a `course.json` fájlt.

---

**Készítve szeretettel a Rust közösség számára** 🦀

