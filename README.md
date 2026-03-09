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

### The Chain

The app follows a strict `Service → Repository → Client` chain. Each layer has one responsibility, is intentionally kept dumb, and only talks to the layer directly below it through a contract. This is the KISS ("Keep It Simple, Stupid") principle applied per layer — every class knows exactly what it needs to, and nothing more.

Each layer answers a different question:

| Layer          | Question                                           |
| -------------- | -------------------------------------------------- |
| Business Logic | _"What does the app need to do?"_                  |
| Data Access    | _"How do I get the data the app needs?"_           |
| Infrastructure | _"How do I communicate with the external system?"_ |

### Why This Matters

Because each layer only depends on a contract, not a concrete implementation, any layer can be swapped without touching anything above it:

- Swap `fetch` for `axios`? Only `HttpClient` changes
- Endpoint or base URL changes? Only `PokemonClient` changes
- Swap the entire data source — REST API, database, local file, or mock? Write a new class that implements `IPokemonRepository` and pass it in. `PokemonService` accepts anything that fits the contract
- Business logic changes? Only the `Service` changes
- Components only ever call the `Service` — they have no knowledge of HTTP, endpoints, or data mapping

### Data Flow

Raw API data (`IPokemon`) enters at the infrastructure layer and travels up to the repository. The repository passes it to `PokemonDTO.fromResponse()` which validates and maps it into a `PokemonDTO` — from this point forward, nothing in the app ever sees raw API data. Each layer only ever works with `PokemonDTO`.

```
Component → Service → Repository → Client → PokeAPI
                           ↑
                receives IPokemon from Client
                passes it to PokemonDTO.fromResponse()
                everything above only ever sees PokemonDTO
```

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

The generic contracts know nothing about Pokémon — they work for any API you add in the future. The Pokémon-specific contracts keep each layer decoupled from concrete implementations, meaning any class that satisfies the contract can be plugged in without touching anything above it.

| Contract             | Scope   | Responsibility                                                                                                                                                         |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IHttpClient`        | Generic | Contract any HTTP client must implement                                                                                                                                |
| `IRepository<T>`     | Generic | Contract any repository must implement                                                                                                                                 |
| `IPokemonClient`     | Pokémon | Contract for the PokéAPI client — defines its named endpoint methods                                                                                                   |
| `IPokemonRepository` | Pokémon | Extends `IRepository<T>` with Pokémon-specific queries — any class that implements this contract can be passed in — the service never knows or cares what is behind it |

### Errors

Errors are thrown as close to the problem as possible and caught as close to the user as possible — **throw early, catch late**.

- Infrastructure throws `HttpError` when a request fails
- The repository catches `HttpError` and rethrows domain-specific errors where meaningful — a 404 becomes a `PokemonNotFoundError` because the PokeAPI could not find a Pokémon for the given ID or name. Any other status code means something went wrong at the network or server level and is rethrown as-is
- Components catch known, expected errors and handle them gracefully. Anything unknown is rethrown — bugs should never be swallowed silently
- As a final defensive layer, Vue's `app.config.errorHandler` in the bootstrap catches anything that was not handled by a component, logs it, and prevents a silent failure. Nothing falls through unnoticed

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
