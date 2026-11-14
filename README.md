# CPSI LABS — Site officiel

Site statique en français. Aucun framework, serveur applicatif, compte utilisateur ou paiement. Les logos sont les visuels de CPSI LABS. Tous droits réservés sur la marque et les contenus du site ; les licences des applications sont distinctes.

## Prévisualiser

```bash
python3 -m http.server 8000
```
Ouvrir http://localhost:8000.

## Ajouter une application

Dans `assets/catalogue.js`, ajouter un objet au tableau `applications` après la publication effective de la version. Exemple de structure (fictif, ne pas publier tel quel) :

```js
{ name: "Nom réel", platform: "Android", description: "Description exacte", version: "v1.0.0", license: "Propriétaire — gratuit", releases: "https://github.com/cpsi-labs/NOM/releases", docs: "https://github.com/cpsi-labs/NOM#readme" }
```

Les liens du catalogue sont limités aux dépôts GitHub de CPSI LABS. Ne pas ajouter de projet non publié. Les instructions d'installation, FAQ spécifiques, licences et notes de version restent dans les dépôts des applications.

## Déploiement

Dépôt public `cpsi-labs/cpsi-labs.github.io`, Settings > Pages > Deploy from a branch > main > /(root). Le fichier `.nojekyll` désactive Jekyll. Ne jamais inclure de secret ni de clé privée dans ce dépôt public.
