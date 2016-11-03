# Tervezési jegyzetek

## Projekt
- Adatai:
    - Neve
    - Leírása
    - Adminja
    - Jegyei
- Lehet:
    - Léterhozni
        - Kell:
            - Név
            - Leírás
    - Módosítani
        - Nevet
        - Leírást
    - Törölni
        - Ilyenkor mindent törölni kell, jegyek, kommentek, hozzárendelések

## Jegy
- Statuszok:
    - Open:
        - NEW - 1
        - Working - 2
        - Waiting for more info - 3
    - Closed:
        - Fixed - 4
        - On-hold - 5
        - Deleted - 6
- Adatai:
    - Létrehozó
    - Dátum
    - Státusz
    - Leírása
    - kommentjei
        - Feladó
        - dátum
        - szöveg
    - illetékes

## Adminnak:
- Új project oldal
    - Név
    - Leírás
- Saját Projektek
    - Módosítás
    - Törlés
    - Staff hozzáadás:
        - Olyan akinek már van felhasználója...

## Staff:
- Projekjeinek a jegyeinél tud:
    - Statusz vált.
    - assigne
    - törölni

## Felhasználó:
- Minden projekthez tud:
    - jegyet felvinni
    - kommentelni

## Vendég:
- Joga van megnézni a projekteket és a jegyeket

## Sitemap
- Főoldal
    - Lista a projektekről
- Projekt oldal
    - Lista a hibákról
- Regisztráció
- Bejelentkezés
- Bejelentkezés után:
    - DashBoard
        - Saját hibák
    - Profil
        - Adatok módositasa
    - Új jegyet felvenni
    - hibáknál megjelenik a komment beírás
    -Staff:
        - DashBoard+
            - Saját projektek
            - Hozzárendelések
            - Hibák
        - Jegyek+
    - Admin
    - DashBoard++
        - Új projekt
        - Saját projektek
            - Törlés
            - Assigne
            - STB
