# aurora-background-kit

React Aurora background package inspired by ReactBits workflow.

## Install

```bash
npm install aurora-background-kit ogl
```

## Usage (Aurora only)

```jsx
import { Aurora } from "aurora-background-kit";
import "aurora-background-kit/styles.css";

export default function HeroBg() {
  return (
    <div style={{ position: "relative", height: 420 }}>
      <Aurora
        colorStops={["#fff35a", "#1d4ed8", "#7ea2ff"]}
        blend={0.68}
        amplitude={1.8}
        speed={1.0}
        intensity={1.1}
      />
    </div>
  );
}
```

## Usage (Full Aurora background)

```jsx
import { AuroraBackground } from "aurora-background-kit";
import "aurora-background-kit/styles.css";

export default function Page() {
  return <AuroraBackground mode="dark" />;
}
```

## Exports

- `aurora-background-kit` -> `Aurora`, `AuroraBackground`
- `aurora-background-kit/aurora` -> `Aurora`
- `aurora-background-kit/background` -> `AuroraBackground`
- `aurora-background-kit/styles.css` -> shared CSS/keyframes

## Local pack

```bash
npm run pack:local
```
