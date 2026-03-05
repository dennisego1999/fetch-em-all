# caught-em-all

A Vue app which consumes the [PokéAPI](https://pokeapi.co/).

---

## Architecture

```
src/
└── js/
    └── Classes/
        ├── Clients/
        │   └── HttpClient.ts
        ├── Contracts/
        │   ├── IHttpClient.ts
        │   └── IRepository.ts
        ├── Errors/
        │   ├── HttpError.ts
        └── Pokemon/
            ├── InvalidPokemonError.ts
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

---

### Classes

| Class               | Responsibility                          | Notes                                                     |
| ------------------- | --------------------------------------- | --------------------------------------------------------- |
| `HttpClient`        | Does HTTP requests                      | No knowledge of any specific API or URL                   |
| `PokemonClient`     | Configures the PokéAPI connection       | Extends `HttpClient` with the PokéAPI base URL            |
| `PokemonRepository` | Fetches Pokémon data                    | The only place that changes if an endpoint changes        |
| `PokemonDTO`        | Validates and maps the raw API response | Acts as the boundary of trust between the API and the app |
| `PokemonService`    | Applies business logic                  | The only layer components ever interact with              |

### Contracts

| Contract             | Responsibility                          |
| -------------------- | --------------------------------------- |
| `IHttpClient`        | Contract any HTTP client must implement |
| `IRepository<T>`     | Contract any repository must implement  |
| `IPokemonRepository` | Contract for the Pokémon repository     |

---

## Requirements

Ensure you are using the correct Node.js version by running the following command in the root of the repository:

```sh
nvm use
```

---

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
