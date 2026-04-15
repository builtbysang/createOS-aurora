# CreateOS Aurora Component

Reusable background component for sharing with other developers.

## Export

```js
import { CreateOSAuroraBackground } from "@/components";
```

## Basic usage

```jsx
import { CreateOSAuroraBackground } from "@/components";

export default function Page() {
  return <CreateOSAuroraBackground mode="dark" />;
}
```

## With overlay content

```jsx
import { CreateOSAuroraBackground } from "@/components";

export default function Page() {
  return (
    <CreateOSAuroraBackground mode="light" showFooter>
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-5xl font-semibold">CreateOS Aurora</h1>
      </div>
    </CreateOSAuroraBackground>
  );
}
```

## Props

- `mode`: `"dark"` | `"light"` (default: `"dark"`)
- `showFooter`: `boolean` (default: `true`)
- `className`: `string` (optional wrapper classes)
- `children`: `ReactNode` (optional content above background)

