declare module '@aceternity/world-map' {
  import * as React from 'react';

  export type Country = { name: string; code?: string };

  export interface WorldMapProps extends React.HTMLAttributes<HTMLElement> {
    highlightedCountries?: string[];
    onCountryHover?: (country: { name?: string } | null) => void;
    onCountryLeave?: () => void;
  }

  export const WorldMap: React.ComponentType<WorldMapProps>;

  const _default: { WorldMap: React.ComponentType<WorldMapProps> };
  export default _default;
}
