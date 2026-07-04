# Nettoyage du dépôt DDC RDC — à exécuter dans E:\PROSE HP\ddc-rdc
# APRÈS avoir appliqué le patch : git am ddc-rdc-securite.patch

# 1. Supprimer le dossier assets/ (37 Mo, hérité du template, non utilisé)
#    Les photos d'équipe existent déjà dans public/images/team/
git rm -r --quiet assets/

# 2. Supprimer les fichiers parasites du template Bootstrap
git rm --quiet "Prompt admin.docx" Readme.txt portfolio-details.html service-details.html starter-page.html

# 3. Retirer le cache TypeScript du suivi Git (désormais dans .gitignore)
git rm --cached --quiet tsconfig.tsbuildinfo

# 4. Committer
git commit -m "Nettoyage : suppression assets/ (37 Mo non utilisés) et fichiers du template"

Write-Host "Nettoyage terminé. Vérifiez avec : git status" -ForegroundColor Green
