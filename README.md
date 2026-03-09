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
        │   ├── IPokemonClient.ts
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

Each layer answers a different question:

- `PokemonService` asks _"what does the app need to do?"_
- `PokemonRepository` asks _"how do I get the data the app needs?"_
- `PokemonClient` asks _"how do I communicate with the external system?"_

This means:

- Swap `fetch` for `axios`? Only `HttpClient` changes
- Endpoint or base URL changes? Only `PokemonClient` changes
- Swap the entire data source — REST API, database, local file, or mock? Write a new class that implements `IPokemonRepository` and pass it in. `PokemonService` accepts anything that fits the contract
- Business logic changes? Only the `Service` changes
- Components only ever call the `Service` — they have no knowledge of HTTP, endpoints or data mapping

The generic contracts (`IHttpClient`, `IRepository<T>`) know nothing about Pokémon — they work for any API you add in the future. `IPokemonClient` and `IPokemonRepository` are Pokémon-specific contracts that keep each layer decoupled from concrete implementations, meaning any class that satisfies the contract can be plugged in without touching anything above it.

---

### Classes

| Class               | Layer          | Responsibility                          | Notes                                                                |
| ------------------- | -------------- | --------------------------------------- | -------------------------------------------------------------------- |
| `HttpClient`        | Infrastructure | Does HTTP requests                      | No knowledge of any specific API or URL                              |
| `PokemonClient`     | Infrastructure | Owns all PokéAPI endpoints              | Extends `HttpClient`, implements `IPokemonClient`, defines all paths |
| `PokemonRepository` | Data Access    | Fetches and maps Pokémon data           | Calls named client methods — no knowledge of URL structure           |
| `PokemonDTO`        | Data Transfer  | Validates and maps the raw API response | Acts as the boundary of trust between the API and the app            |
| `PokemonService`    | Business Logic | Applies business logic                  | The only layer components ever interact with                         |

### Contracts

| Contract             | Responsibility                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IHttpClient`        | Contract any HTTP client must implement — generic, not Pokémon-specific                                                                                |
| `IPokemonClient`     | Contract for the PokéAPI client — defines its named endpoint methods                                                                                   |
| `IRepository<T>`     | Contract any repository must implement — generic, not Pokémon-specific                                                                                 |
| `IPokemonRepository` | Extends `IRepository<T>` with Pokémon-specific queries — the plug socket that allows any data source to be swapped in without the service ever knowing |

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
