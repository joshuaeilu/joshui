import React, { createContext, useContext } from "react";

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
};

const AppSettingsContext = createContext<{
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
    }>
  >;
} | null>(null);

export const AppSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = React.useState(defaultAppSettingsContext);
  const [loaded, setLoaded] = React.useState(false);

  const savedSettings = window.localStorage.getItem("pw-settings")
  if (savedSettings != null && !loaded) {
    setLoaded(true)
    setSettings(JSON.parse(savedSettings));
  }

  React.useEffect(() => {
    window.localStorage.setItem("pw-settings", JSON.stringify(settings));
  }, [settings])

  return <AppSettingsContext.Provider value={{ settings, setSettings }}>
    {children}
  </AppSettingsContext.Provider>
}

export const useSettings = () => {
  return useContext(AppSettingsContext)
}
