# Test technique

## Description des entrées
  - _from_: Date de début au format MM-DD-YYYY
  - _to_: Date de fin au format MM-DD-YYYY
  - _format_: Format d'affichage, `json` ou `csv`

## Lancement du programme via Docker
```bash
$ sudo docker build -t test_technique .
$ #sudo docker run test_technique from to format
$ sudo docker run test_technique 01-01-2020 05-01-2020 json
```

## To-do list
- Améliorer la vérification des dates (mois sans jour 31, février, années bissextiles).
- On ne sauvegarde pas les données de production reçues des APIs. Dans la réalité les données de production seraient (déjà) remontées, validées et stockées dans un datalake. En utilisant directement ce datalake on évite d'appeler plusieurs fois les APIs sur des données déjà remontées.
- En cas d'erreur côté serveur le programme crash. En pratique il faudrait implémenter un délai pour réssayer d'appeler l'API après un échec, avec un nombre maximum d'essais (avec éventuellement une alerte à remonter si on atteint ce nombre).
- L'algo de correction des trous dans les données serait bien plus compliqué en pratique et devra être dûment testé sur des cas exotiques.
