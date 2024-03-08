import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRange,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useContext } from "react";
import { AppSettingsContext } from "../components/hooks/AppSettingsContext";
import PlayerControls from "../components/PlayerControls";

const Settings: React.FC = () => {
  const appSettingsContext = useContext(AppSettingsContext);

  if (!appSettingsContext) {
    return null;
  }

  const { settings, setSettings } = appSettingsContext;

  console.log(settings);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Voice</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonToggle
              checked={settings.voice.enabled}
              onClick={() => {
                setSettings({
                  ...settings,
                  voice: {
                    ...settings.voice,
                    enabled: !settings.voice.enabled,
                  },
                });
              }}
            >
            Enable
            </IonToggle>
            <IonRange
              label="Volume"
              value={settings.voice.volume}
              onIonInput={(e) => {
                setSettings({
                  ...settings,
                  voice: {
                    ...settings.voice,
                    volume: e.detail.value! as number,
                  },
                })
              }}
            />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Music</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonToggle
              checked={settings.music.enabled}
              onClick={() => {
                setSettings({
                  ...settings,
                  music: {
                    ...settings.music,
                    enabled: !settings.music.enabled,
                  },
                });
              }}
            >
            Enable
            </IonToggle>
            <IonRange
              label="Volume"
              value={settings.music.volume}
              onIonInput={(e) => {
                setSettings({
                  ...settings,
                  music: {
                    ...settings.music,
                    volume: e.detail.value! as number,
                  },
                })
              }}
            />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Heads-Up Beep</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonToggle 
            checked={settings.headsUpBeep.enabled}
            onClick={() => {
              setSettings({
                ...settings,
                headsUpBeep: {
                  ...settings.headsUpBeep,
                  enabled: !settings.headsUpBeep.enabled,
                },
              });
            }} >
            Enable
            </IonToggle>
            <IonRange
              label="volume"
              value={settings.headsUpBeep.volume}
              onIonInput={(e) => {
                setSettings({
                  ...settings,
                  headsUpBeep: {
                    ...settings.headsUpBeep,
                    volume: e.detail.value! as number,
                  },
                })
              }}
            />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Shuffle Music</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonToggle 
            checked={settings.shufflePlaylists}
            onClick={() => {
              setSettings({
                ...settings,
                shufflePlaylists: !settings.shufflePlaylists,
              });
            }} >
            Enable
            </IonToggle>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <PlayerControls />
    </IonPage>
  );
};

export default Settings;
