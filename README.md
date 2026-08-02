`# DDC RDC — Site institutionnel

Site officiel de la **Dynamique Debout Congolais (DDC RDC)**,
association congolaise engagée pour l'autonomisation des jeunes,
des femmes et des communautés à Bukavu, Sud-Kivu, RDC.

🌐 [ddcrdc.org](https://ddcrdc.org)

---

## Stack technique

- **Next.js 16** (App Router, SSR) + React 18 + TypeScript
- **Tailwind CSS 3** — charte navy `#0B3558` / or `#F2B705`
- **Plus Jakarta Sans** — police institutionnelle
- **Lucide Icons**, **Leaflet** (carte interactive)
- **Auth admin** : cookie HMAC + hash scrypt
- **Persistance** : JSON local (`data/admin-store.json`)
  ou MySQL (`mysql2`) selon l'environnement
- **Déploiement** : Vercel (production) /
  Netlify compatible (OpenNext)

---

## Structure du projet

```
app/             # Pages et routes (App Router)
  admin/         # Interface d'administration
  api/           # Route handlers
components/      # Composants réutilisables
data/            # Contenu statique et admin-store
lib/             # Utilitaires, auth, metadata
public/          # Images, logos, assets
scripts/         # Scripts de génération (hash admin)

```

---

## Démarrage local

```bash
npm install
cp .env.example .env.local
node scripts/generate-admin-hash.mjs "VotreMotDePasse"
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Variables d'environnement

| Variable | Obligatoire | Description |
|---|---|---|
| `ADMIN_EMAIL` | ✅ | Email de connexion admin |
| `ADMIN_PASSWORD_HASH` | ✅ | Hash scrypt (via `generate-admin-hash.mjs`) |
| `ADMIN_ROLE` | ✅ | `super_admin` |
| `ADMIN_SESSION_SECRET` | ✅ | Secret HMAC 64 caractères min. |
| `NEXT_PUBLIC_PAYPAL_DONATION_URL` | ✅ | URL bouton PayPal |
| `CONTACT_RECEIVER_EMAIL` | ✅ | Email destinataire contact |
| `DATABASE_URL` | ⬜ | MySQL (optionnel — fallback JSON) |
| `EMAIL_API_KEY` | ⬜ | Resend (optionnel) |
| `NEXT_PUBLIC_SUPABASE_URL` | ⬜ | Supabase (optionnel) |

⚠️ Ne jamais utiliser `ADMIN_PASSWORD` en production.
Toujours utiliser `ADMIN_PASSWORD_HASH` (format `scrypt:...`).

---

## Administration

Interface admin accessible sur `/admin`.

Fonctionnalités : articles, actualités, programmes,
axes, réalisations, équipe, documents, partenaires,
témoignages, impact, messages, newsletter,
paramètres du site.

---

## Programmes fondateurs

| Programme | Axe |
|---|---|
| JASIRI | Identité, inclusion et capital humain |
| PROJEC | Autonomisation économique et résilience |
| École Citoyenne / CLAC | Gouvernance et citoyenneté |
| Alerte Précoce | Gouvernance et citoyenneté |
| Vert et Climat | Autonomisation économique et résilience |
| Creative Child | Identité, inclusion et capital humain |
| Kongo Culture | Identité, inclusion et capital humain |
| Think Tank DDC | Gouvernance et citoyenneté |

---

## Déploiement

### Vercel (recommandé)
Connecter le repo GitHub à Vercel, configurer
les variables d'environnement, et chaque push
sur `main` déclenche un déploiement automatique.

### Netlify
Un `netlify.toml` est présent à la racine.
⚠️ Ne pas ajouter `publish = ".next"` —
cela provoque des 404 généralisés
(cf. commit f53d810).

---

## Contact

**Dynamique Debout Congolais — DDC RDC**
Av. Nyarwizimia 019, Quartier Panzi,
Commune d'Ibanda, Bukavu, Sud-Kivu, RDC

📧 ddc.democratie@gmail.com
📞 +243 992 588 137
🌐 [ddcrdc.org](https://ddcrdc.org)
🐦 [@ddcrdc](https://x.com/ddcrdc)
📘 [facebook.com/ddcrdc](https://facebook.com/ddcrdc)

---

*Site développé et maintenu par PROSE DIGITAL
pour la DDC RDC.*
``
