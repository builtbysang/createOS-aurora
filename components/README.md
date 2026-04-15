# Aurora Background Component

Reusable background component for sharing with other developers.

## Export

```js
import { AuroraBackground } from "@/components";
```

If used as package, import styles:

```js
import "aurora-background-kit/styles.css";
```

## Basic usage

```jsx
import { AuroraBackground } from "@/components";

export default function Page() {
  return <AuroraBackground mode="dark" />;
}
```

## With overlay content

```jsx
import { AuroraBackground } from "@/components";

export default function Page() {
  return (
    <AuroraBackground mode="light" showFooter>
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-5xl font-semibold">Aurora Background</h1>
      </div>
    </AuroraBackground>
  );
}
```

## Props

- `mode`: `"dark"` | `"light"` (default: `"dark"`)
- `showFooter`: `boolean` (default: `true`)
- `className`: `string` (optional wrapper classes)
- `children`: `ReactNode` (optional content above background)

