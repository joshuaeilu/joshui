import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonRange,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Settings.css";
import { useContext } from "react";
import { AppSettingsContext } from "../components/hooks/AppSettingsContext";

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
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>Settings</p>
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
                    volume: e.detail.value! as unknown as number,
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
                    volume: e.detail.value! as unknown as number,
                  },
                })
              }}
            />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Head-Up Beep</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton onClick={() => {
              setSettings({
                ...settings,
                headUpBeep: {
                  ...settings.headUpBeep,
                  enabled: !settings.headUpBeep.enabled,
                },
              });
            }} >
              {settings.headUpBeep.enabled ? "Disable" : "Enable"}
            </IonButton>
            <IonRange
              onIonInput={(e) => {
                setSettings({
                  ...settings,
                  headUpBeep: {
                    ...settings.headUpBeep,
                    volume: e.detail.value! as unknown as number,
                  },
                })
              }}
            />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Timer Speed</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonRange 
              onIonInput={(e) => {
                setSettings({
                  ...settings,
                  timerSpeed: e.detail.value! as unknown as number,
                })
              }}
            />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
