# caught-em-all

A Vue app which consumes the [PokéAPI](https://pokeapi.co/).

## Architecture

```
src/
├── Contracts/
│   ├── IHttpClient.ts
│   └── IRepository.ts
├── Http/
│   └── HttpClient.ts
└── Pokemon/
    ├── IPokemon.ts
    ├── IPokemonRepository.ts
    ├── PokemonClient.ts
    ├── PokemonDTO.ts
    ├── PokemonRepository.ts
    └── PokemonService.ts
```

The app follows a `Service → Repository → Client` chain. Each layer has one responsibility and only talks to the layer directly below it through a contract.

This means:

- Swap `fetch` for `axios`? Only `HttpClient` changes
- Backend URL or endpoint changes? Only the `Repository` changes
- Business logic changes? Only the `Service` changes
- Components only ever call the `Service` — they have no knowledge of HTTP, endpoints or data mapping

The contracts (`IHttpClient`, `IRepository<T>`) know nothing about Pokemon — they work for any API you add in the future.

- **HttpClient** — does HTTP requests
  _Generic base class, no knowledge of any specific API or URL_

- **PokemonClient** — configures the PokéAPI connection
  _Extends `HttpClient` with the PokéAPI base URL_

- **PokemonRepository** — fetches Pokémon data
  _Owns the endpoints — the only place that changes if an endpoint changes_

- **PokemonDTO** — validates and maps the raw API response
  _Acts as the boundary of trust between the API and the app_

- **PokemonService** — applies business logic
  _The only layer components ever interact with_

- **IHttpClient** — contract any HTTP client must implement
  _Makes the client layer swappable_

- **IRepository\<T\>** — contract any repository must implement
  _Generic `T` defines the return type, works for any domain_

- **IPokemonRepository** — contract for the Pokémon repository
  _Extends `IRepository<PokemonDTO>` with Pokémon-specific methods_

## Requirements

Ensure you are using the correct Node.js version by running the following command in the root of the repository:

```sh
nvm use
```

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
