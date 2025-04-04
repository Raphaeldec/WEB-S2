# WEB-S2
Dossier commun :
  - Louis HERMANN
  - Téïva AIRAULT
  - Raphaël DECIRON
  - Paul Saint-Supéry

## Modèle de données

### Table : missions

| Champ        | Type   | Dimension | Remarques                  |
|--------------|--------|-----------|----------------------------|
| code_mission | Texte  | 10        | Clé primaire               |
| nom_mission  | Texte  | 100       |                            |
| difficulte   | Texte  | 20        |                            |
| date_debut   | Date   | -         | Format YYYY-MM-DD          |
| date_fin     | Date   | -         | Format YYYY-MM-DD          |

### Table : etapes_mission

| Champ        | Type    | Dimension | Remarques                        |
|--------------|---------|-----------|----------------------------------|
| id_etape     | Texte   | 10        | Clé primaire                     |
| code_mission | Texte   | 10        | Clé étrangère vers `missions`    |
| description  | Texte   | 255       |                                  |
| ordre        | Entier  | 3         |                                  |
| complete     | Booléen | -         |                                  |

**Remarques générales :**
- Chaque feuille CSV correspond à une table.
- Chaque ligne correspond à un enregistrement.
- Les colonnes référant à une entrée dans une autre feuille sont appelées clés étrangères.
