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

The app follows a `Service → Repository → Client` chain. Each layer has one responsibility.

- **IHttpClient** — contract any HTTP client must implement, makes the client layer swappable
- **IRepository** — generic contract any repository must implement, generic `T` defines the return type
- **IPokemonRepository** — extends `IRepository<PokemonDTO>` with Pokémon-specific methods like `findByName`
- **HttpClient** — generic base class for HTTP requests, not tied to any specific API
- **PokemonClient** — extends `HttpClient`, provides the PokéAPI base URL
- **PokemonRepository** — fetches Pokémon-specific data, owns the endpoints. The only place that changes if an endpoint changes
- **PokemonDTO** — validates and maps the raw API response, acts as the boundary of trust between the API and the app
- **PokemonService** — consumes the repository and applies business logic

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
