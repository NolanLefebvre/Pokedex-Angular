# Pokedex — TD individuel

**Lefebvre, Nolan :** 

## Description

Application Angular consommant l'API publique PokeAPI pour afficher une liste de
Pokémon sous forme de cartes, avec une recherche en direct par nom.

- Récupération des 20 premiers Pokémon via un service Angular dédié (`HttpClient`)
- Affichage sous forme de cartes réutilisables (un composant par carte)
- Recherche en direct (filtrage pendant la frappe, avec `debounceTime` RxJS)
- Architecture séparée : service (appels API) / composants (affichage) / modèle
  (typage TypeScript des données reçues)

## Installation et lancement

```bash
npm install
ng serve
```

L'application est ensuite accessible sur `http://localhost:4200`.

## Choix techniques et difficultés rencontrées

- Le projet utilise le mode **zoneless** (`provideZonelessChangeDetection`) :
  toutes les variables affichées dans un `@if` sont donc déclarées comme des
  `signal`, et mises à jour avec `.set()` plutôt que par simple affectation.
- Pour afficher une image par Pokémon sans multiplier les appels API,
  l'identifiant de chaque Pokémon est extrait directement de l'URL renvoyée
  par la liste, puis utilisé pour construire l'URL du sprite correspondant
  (dépôt GitHub officiel de PokeAPI). Un seul appel HTTP suffit donc pour
  toute la liste avec images.
- La recherche utilise un `Subject` RxJS combiné à `debounceTime(300)` et
  `distinctUntilChanged()`, pour éviter de refiltrer à chaque frappe et
  limiter les recalculs inutiles.
- Seuls les champs réellement utilisés (`id`, `name`, `imageUrl`) sont typés
  dans l'interface `PokemonEntity`, conformément à la consigne du sujet.