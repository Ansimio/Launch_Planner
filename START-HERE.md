# Edition — Retail launch decision planner

A small, researched portfolio prototype for Andreaa Simion. Built with AI assistance.

## Deschide aplicația
1. Dezarhivează fișierul ZIP.
2. Deschide `index.html` în browser. Nu necesită instalare, cont, API sau abonament.
3. Încearcă Low demand, Base și High. Apoi schimbă prețul, cantitatea și costurile în Costs & assumptions.
4. Consultă Show calculation și Evidence & method ca să vezi exact ce include fiecare rezultat.

Interfața este în engleză, pentru portofoliul și aplicațiile din UK. Datele editate se salvează în browser; în modul file:// suportul pentru localStorage diferă între browsere. Folosește Export analysis pentru o copie CSV. Nu se trimit date la un server. Linkurile către surse deschid site-urile externe doar când le accesezi.

## Publicare pe Vercel
Acesta este un proiect separat de portofoliu și de One Clue. Creează un repository nou (de exemplu `edition-launch-planner`). Încarcă fișierele din ZIP la rădăcina lui, cu `index.html` direct în repository, nu într-un subfolder. Importă repository-ul în Vercel folosind presetul Other, fără comandă de build. Păstrează output directory la rădăcina proiectului. Nu sunt necesare variabile de mediu sau chei API. După publicare, linkul poate fi adăugat în portofoliu. Nu am modificat conturile sau proiectele tale existente.

## Ce este realist și ce rămâne de verificat
- Tarife publice de producție, poștă și procesare card, cu surse și data consultării.
- Stoc și numerar separate; ambalaje cumpărate în loturi; comisioane aplicate inclusiv la transportul plătit de client.
- Costul timpului propriu este separat de plățile efective.
- Cererea, prețul de vânzare, costul promovării, livrarea de la tipografie, timpul de producție, ambalarea și rezerva de incertitudine sunt ipoteze editabile.
- Nu există vânzări, interviuri cu clienți, negocieri cu furnizori sau rezultate comerciale reale.
- Un singur produs și două strategii de aprovizionare. Nu comparăm furnizori cu produse de calități diferite ca și cum ar fi echivalente.
- Nu este un magazin, un instrument de contabilitate sau o prognoză a pieței.

## Verificare efectuată
12 teste automate de calcul trecute, inclusiv praguri de preț, stoc insuficient, zero vânzări, ambalaje, comisioane, break-even și reconcilierea stoc/numerar/timp. Teste în browser: schimbarea ipotezelor, avertizare buget, recalcularea stocului, protecția dependențelor, salvarea progresului și export CSV. Layout verificat pe desktop și într-un viewport de ~390px. Nu a fost testat cu utilizatori externi sau pe un telefon fizic.

Pentru repetarea testelor (opțional, Node.js instalat): `node test-model.cjs`.

## Înainte de a-l prezenta la interviu
Parcurge trei decizii și explică-le în cuvintele tale:
1. De ce o unitate mai ieftină nu înseamnă automat o alegere mai bună?
2. Cum poți avea numerar pozitiv, dar rezultat negativ după evaluarea timpului propriu?
3. Ce informație reală ai cere înainte să aprobi cheltuiala?

Proiectul se poate pune în CV ca proiect independent după ce îl parcurgi și verifici că poți explica deciziile. Nu îl transforma în experiență comercială sau impact real.
