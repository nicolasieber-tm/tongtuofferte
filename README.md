# TongTu Projektvorschlag

Interaktive Offertenseite für TCMswiss, erstellt aus den finalen Word-Dokumenten. Lokale Vorschau, noch nicht veröffentlicht.

## Lokal

Node.js 22.13 oder neuer. `npm ci`, dann `npm run dev -- --port 3000`.

## Produktion / Railway

`npm run build` erstellt die statische Seite unter `dist/client`. `npm start` startet den kleinen Node-Server. Er verwendet Railway `PORT` und bindet auf `0.0.0.0`.

Repository: https://github.com/nicolasieber-tm/tongtuofferte. In Railway das Repository verbinden; Dockerfile und railway.json sind vorbereitet. Keine externe Datenbank nötig.

## Inhalte aktualisieren

- `app/page.tsx`: Texte, Preise, Module und Zeitplan.
- `app/requirements.json`: 107 Katalogpositionen aus dem Word-Dokument, einschliesslich technischer Bedingungen. S16/C5 sind technisch zu bestätigen, K-Prioritäten optional. Weitere explizite Voraussetzungen werden separat gekennzeichnet. Eine Position ist kein Nachweis fertiger Implementierung.
- `app/globals.css`: Gestaltung, responsives Layout, Scroll- und Kartenanimationen mit reduzierter Bewegung.
- `public/documents`: PDF-Fassungen von Offerte und Katalog. Vor Veröffentlichung aktualisieren; die aktuelle Offerte enthält noch Platzhalter für Testrechnung/Modulversion/Datum/Validierung. Testrechnung wird separat versendet.
- `public/assets`: Original-Logos von tcmswiss.ch und trendingmedia.ch. Orange #eb5e0b aus der TongTu-Website. Schriftarten DM Sans und Manrope werden über Google Fonts geladen.

Die Oberfläche ist eine abstrakte Konzeptillustration, keine verbindliche Dashboardgestaltung. Die Landingpage fasst zusammen; vollständige Bedingungen stehen in den PDFs. Modell B setzt kundenseitige Infrastruktur voraus.

Suchmaschinenindexierung ist deaktiviert. Dies ist kein Zugriffsschutz; bei Veröffentlichung sind URL und PDFs ohne Passwort zugänglich.
