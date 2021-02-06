# Google Maps Hooks

_Google Maps Hooks_ is a utility library that exposes various React hooks that interact with the official Google Maps API.

---

## Installation

With Yarn:

```sh
yarn add google-maps-hooks
```

With NPM:

```sh
npm install --save google-maps-hooks
```

---

## Getting a Google Maps API Key

See: _<https://developers.google.com/maps/gmp-get-started#create-project>_

---

## API Quick Reference

### Hooks

- `useGeocoding`
- `useDirections`
- `useDistanceMatrix`
- `useGeolocation`
- `useElevation`
- `usePlaces`
- `usePlayableLocations`
- `useRoads`
- `useSemanticTile`
- `useStreetView`
- `useTimeZone`

### Components

- `GMapsProvider`

---

## Usage

1. Firstly, wrap your root component _(normally `App`)_ with `GMapsProvider` and pass it your Google Maps API Key.

   ```jsx
   import GMapsProvider from "google-maps-hooks";

   const App = () => {
    ...
   };

   const Root = () => (
    <GMapsProvider apiKey={YOUR_GOOGLE_MAPS_API_KEY}>
     <App />
    </GMapsProvider>
   );

   export default Root;
   ```

2. **And that's it!** You can now call any of the available hooks from anywhere in your application.

### Example

```jsx
import React, { useEffect } from "react";
import GMapsProvider, { useGeocoding } from "google-maps-hooks";

const App = () => {
  const geocoding = useGeocoding();

  useEffect(() => {
    geocoding.geocode("My home address").then((res) => console.log(res));
  }, [geocoding]);

  return <p>Example</p>;
};

const Root = () => (
  <GMapsProvider apiKey="AIzaSyAYjk3uc084G9YRkMfSbbfhA0atGZmbh_8">
    <App />
  </GMapsProvider>
);

export default Root;
```

---

## API Reference (Components)

### `GMapsProvider`

#### • Props

| Name     | Type        | Required | Default value |
| -------- | ----------- | -------- | ------------- |
| apiKey   | `string`    | **Yes**  | _None_        |
| children | `ReactNode` | No       | _None_        |

---

## API Reference (Hooks)

### `useGeocoding`

#### • Parameters

None

#### • Returns

An object containing only one method: `geocode`.

`geocode` takes an address (`string`) as its first argument and returns a `Promise` that resolves to an object containing the geocoded data.
