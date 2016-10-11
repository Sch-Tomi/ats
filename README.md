# ATS
Another Ticket System

## 1 Követelmény analízis

### 1.1 Célkitűzés

A program célja egy könnyen és egyszeráen használható hiba jegyrendszer létrehozása. Az adatok védelme érdekében csak regisztrált és megfelelő jogusultságokkal rendelkező felhasználók férhetnek hozzá bizonyos funkciókhoz. Ezen felül a különböző jogkörök is segítik az adatok védelmét.

#### Funkcionális követelmények

- Regisztráció
- Bejelentkezés
- Mindenki számára elérhető:
    - Projektek megtekintése
    - projektekhez tartozó bejegyzések megtekintése
- Felhasználók számára elérhető:
    - Új hiba jegy felvétele
    - Kommentelés a hibákhoz
- Staffnak elérhető:
    - Hiba jegyek állapotának módosítása
    - Staff hozzárendelés
- Adminak elérhető:
    - Új projekt indítása
    - Staff kijelőlése a saját projektjéhez

#### Nem funkcionális követelmények:

- **Áttekinthetőség:** Jegyek csoportosítása, állapot szerint

- **Megbízhatóság:** jelszóval védett funkciók, és jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.

- **Karbantarthatóság:** könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt

#### 1.2 Fogalomjegyzék
- **jegy:** egy az aktuális projekthez tartozó probléma, hiba átfogó megnevezése

####  1.3 Használatieset-modell, funkcionális követelmények

**Vendég**: Csak a publikus oldalakat éri el
- Főoldal
- Bejelentkezés
- Regisztráció
- Projektek / jegyek megtekintése

**Bejelentkezett felhasználó**: A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.
- Új hiba jegy felvétele
- Kommentelés a hibákhoz

**Staffnak elérhető:** A felhasználói szinten túl
- Hiba jegyek állapotának módosítása
- Staff hozzárendelés

**Adminak elérhető:** A staff szinten túl
- Új projekt indítása
- Staff kijelőlése a projektjeihez


![Usecase Diagram](https://github.com/Sch-Tomi/ats/blob/master/doc/img/usecase.png "Usecase Diagram")
