import React, { createContext } from "react";

export const defaultAppSettingsContext = {
  voice: {
    enabled: true,
    volume: 100,
  },
  music: {
    enabled: true,
    volume: 100,
  },
  headsUpBeep: {
    enabled: true,
    volume: 100,
  },
  shufflePlaylists: false
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
    headsUpBeep: {
      enabled: boolean;
      volume: number;
    };
    shufflePlaylists: boolean;
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
      headsUpBeep: {
        enabled: boolean;
        volume: number;
      };
      shufflePlaylists: boolean;
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
