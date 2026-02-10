# Shimmer Component

A lightweight shimmer loading placeholder component for React.

## Features

- Smooth shimmer animation effect
- Fully responsive
- Customizable dimensions and border radius
- Dark mode support

## Installation

```tsx
import Shimmer from "./components/Shimmer/Shimmer";
```

## Props

| Prop           | Type               | Required | Description                                         |
| -------------- | ------------------ | -------- | --------------------------------------------------- |
| `height`       | `number \| string` | Yes      | Height of shimmer (use string like "100px", "100%") |
| `width`        | `number \| string` | Yes      | Width of shimmer (use string like "100px", "100%")  |
| `borderRadius` | `number \| string` | Yes      | Border radius (use string like "8px", "50%")        |
| `darkMode`     | `boolean`          | No       | Enable dark mode shimmer (default: `false`)         |

## Usage

### Basic Example

```tsx
import Shimmer from "./components/Shimmer/Shimmer";

function App() {
  return <Shimmer height="200px" width="300px" borderRadius="8px" />;
}
```

### Card Skeleton

```tsx
import Shimmer from "./components/Shimmer/Shimmer";

function CardSkeleton() {
  return (
    <div style={{ padding: "20px", width: "300px" }}>
      <Shimmer height="200px" width="100%" borderRadius="8px" />
      <div style={{ marginTop: "10px" }}>
        <Shimmer height="20px" width="80%" borderRadius="4px" />
      </div>
      <div style={{ marginTop: "8px" }}>
        <Shimmer height="20px" width="60%" borderRadius="4px" />
      </div>
    </div>
  );
}
```

### Dark Mode

```tsx
import Shimmer from "./components/Shimmer/Shimmer";

function App() {
  return (
    <div style={{ background: "#1a1a1a", padding: "20px" }}>
      <Shimmer
        height="200px"
        width="300px"
        borderRadius="8px"
        darkMode={true}
      />
    </div>
  );
}
```

## Notes

- Pass values as strings with units (e.g., "100px", "50%", "10rem")
- Perfect for skeleton screens and loading states
