> Webfejlesztési keretrendszerek
<br>Ékszer webshop
<br>Készítette: Sárközi Gergő
<br>srkzgrg@outlook.com

# Ékszer webshop

## 1. Összefogaló

Egy ékszereket áruló webshopról készült a projektmunka. Lehetőség van a webshopra regisztrálni, illetve bejelentkezni. Kétféle jogosultsági szint van. Létezik admin, illetve vásárló típusú felhasználói jogosultság. A vásárló bejelentkezés után képes rendeléseket leadni.

## 2. Projektről

### 2.1 Funkcionális követelmények

1. Regisztráció
	- Szükséges adatok: név, e-mail, nem, jelszó.
	- A jelszónak legalább 6 karakter hosszúnak kell lennie.
	- Csak helyes e-mail formátummal lehet regisztrálni.
	- A regisztrál felhasználó alapértelmezett jogosultásgi szintje: vásárló.

2. Bejelentkezés
	- Szükséges adatok: e-mail, jelszó.
	- Az autentikáció Firebase segítségével történik.
	
3. Termékek [User]
	- A termékek oldalon bejelentkezés után lehetőség van kosárhoz adni termékeket.
	- Egy terméket többször is hozzá lehet adni a kosárhoz, ezzel növelve a mennyiséget.
	- Az oldal tetején lehetőség van kategóriára szűrni.
	
3. Kosár [User]
	- A kosarat csak bejelentkezett felhasználók tekinthetik meg (AuthGuard)
	- Lehetőség van a termékek darabszámának növelésére, illetve csökkentésére.
	- Láthatjuk a termékek összárát.
	- Továbblépve meg kell adnunk a szállítási adatokat:
		- Szállítási cim
		- Telefonszám (06 20/30/70 1234567)
	- ÁSZF elfogadása kötelező a végelegesítés szekcióban.
	
3. Profil [User]
	- A profilt csak bejelentkezett felhasználók tekinthetik meg (AuthGuard)
	- Láthatjuk az összes korábbi rendelésünket.
	- Az adott rendelésre kattintva részletes információt kapunk a termékekről, árakról.
	- Nyomon tudjuk követni a rendelés státuszát.

4. Termékek kezelése [Admin]
	- A termékek kezelése oldalt csak admin jogosultságú felhasználók érhetnek el (AuthGuard)
	- Módosíthatjuk az eddigi termékek adatait (ID-t kivéve)
		- Új kép feltöltése esetén elmentődik a FireStore tárolóba
	- Hozzáadhatunk új termékeket.

5. Rendelések kezelése [Admin]
	- A rendelések kezelése oldalt csak admin jogosultságú felhasználók érhetnek el (AuthGuard)
	- Lehetőségünk van módosítani a rendelések státuszán:
		- "Feldolgozás alatt"
		- "Kiszállítás alatt"
		- "Kiszállítva"
		
## 2. Fejlesztés

### 2.1 Munkakörnyezet:

- MacBook Air M1 (CPU: Apple M1, RAM: 8 GB)
- Asztali PC (CPU: Ryzen FX 8300, RAM: 8 GB, GPU: RADEON R7)

### 2.2 Fejlesztéshez használt eszközök:

- Visual Studio Code
- Firebase
- Angular
- Git (Github)


## 3. Egyéb

### 3.1 Admin felhasználói fiók

- e-mail: admin@admin.hu
- jelszó: admin123

### 3.2 Beüzemelés

1. git clone https://github.com/srkzgrg/webkert-kotprog
2. cd webkert-kotprog
3. cd ekszerShop
4. npm install --force
5. ng serve

- Ha esetleg nem működne egy node_modules Angular15 miatt, akkor keress bátran e-mailben.

Szeged, 2023.05.03
