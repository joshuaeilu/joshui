import React, { createContext } from "react";

export const defaultAppSettingsContext = {
  voice: {
    enabled: false,
    volume: 0.0,
  },
  music: {
    enabled: false,
    volume: 0.0,
  },
  headUpBeep: {
    enabled: false,
    volume: 0.0,
    when: 0.2,
  },
  timerSpeed: 1,
};

export const AppSettingsContext = createContext<{
  settings: {
    voice: {
      enabled: boolean;
      volume: number;
    };
    music: {
      enabled: boolean;
      volume: number;
    };
    headUpBeep: {
      enabled: boolean;
      volume: number;
      when: number;
    };
    timerSpeed: number;
  };
  setSettings: React.Dispatch<
    React.SetStateAction<{
      voice: {
        enabled: boolean;
        volume: number;
      };
      music: {
        enabled: boolean;
        volume: number;
      };
      headUpBeep: {
        enabled: boolean;
        volume: number;
        when: number;
      };
      timerSpeed: number;
    }>
  >;
} | null>(null);

export function AppSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = React.useState(defaultAppSettingsContext);

  return (
    <AppSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
}
