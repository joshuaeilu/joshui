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
  IonToolbar,
} from "@ionic/react";
import "./Settings.css";
import { useContext } from "react";
import { AppSettingsContext } from "../components/hooks/AppSettingsContext";
import PlayerControls from "../components/PlayerControls";

const Settings: React.FC = () => {
  const appSettingsContext = useContext(AppSettingsContext);

  if (!appSettingsContext) {
    return null;
  }

  const { settings, setSettings } = appSettingsContext;

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
            <IonButton
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
              {settings.voice.enabled ? "Disable" : "Enable"}
            </IonButton>
            <IonRange
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
            <IonButton onClick={() => {
              setSettings({
                ...settings,
                music: {
                  ...settings.music,
                  enabled: !settings.music.enabled,
                },
              });
            }}>
              {settings.music.enabled ? "Disable" : "Enable"}
            </IonButton>
            <IonRange
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
            <IonButton onClick={() => {
              setSettings({
                ...settings,
                headsUpBeep: {
                  ...settings.headsUpBeep,
                  enabled: !settings.headsUpBeep.enabled,
                },
              });
            }} >
              {settings.headsUpBeep.enabled ? "Disable" : "Enable"}
            </IonButton>
            <IonRange
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
            <IonButton onClick={() => {
              setSettings({
                ...settings,
                shufflePlaylists: !settings.shufflePlaylists,
              });
            }} >
              {settings.shufflePlaylists ? "Disable" : "Enable"}
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <PlayerControls />
    </IonPage>
  );
};

export default Settings;
