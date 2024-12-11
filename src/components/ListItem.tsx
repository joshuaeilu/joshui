import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonIcon, IonRow, IonText, IonThumbnail, IonTitle, useIonToast } from "@ionic/react";
import { heart, heartOutline, logOutOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { ResolvedStep, ResolvedWheel, ResolvedWheelAudio, Step, Wheel, WheelAudio } from "../Types";
import { useHistory } from "react-router";
import { useSavedWheels } from "./hooks/SavedWheelsProvider";
import { Storage } from "@ionic/storage";

// Utility function to format milliseconds to hours, minutes, and seconds
const formatTime = (milliseconds: number): string => {
  let seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  let time = ""
  time += (hours != 0) ? `${hours}h` : ""
  time += (minutes != 0) ? ` ${minutes}m` : ""
  time += (seconds != 0) ? ` ${seconds}s` : ""

  return time;
};

export async function resolvedWheelToWheel(resolvedWheel: ResolvedWheel): Promise<Wheel> {
  const storage = new Storage()
  await storage.create()
  const wheelFromStorage = await storage.get(`pw-saved-${resolvedWheel.id}`)

  const wheel: Wheel = {
    ...wheelFromStorage,
    steps: resolvedWheel.steps.map((step) => ({
      ...step,
      override_song: step.override_song?.type.includes("audio") ? URL.createObjectURL(step.override_song) : null,
      foreground_audio: step.foreground_audio?.type.includes("audio") ? URL.createObjectURL(step.foreground_audio) : null
    })),
    background_audio: resolvedWheel.background_audio.map((audio) => ({
      ...audio,
      audio_url: audio.audio ? URL.createObjectURL(audio.audio) : null
    }))
  }

  return wheel
}

// Utility that requests the contents of the URLs in a wheel and returns a new wheel where the keys that the URLs were stored at now have blobs.
async function resolveWheelURLs(wheel: Wheel): Promise<ResolvedWheel> {
  console.log("Resolving wheel", wheel)
  let resolvedWheel: ResolvedWheel = {
    ...wheel,
    background_audio: await Promise.all(wheel.background_audio.map(async (audio) => {
      const audioBlob = await fetch(audio.audio_url);

      const resolvedAudio: ResolvedWheelAudio = {
        audio: await audioBlob.blob(),
        id: audio.id,
        wheel
      }

      return resolvedAudio
    })),
    steps: await Promise.all(wheel.steps.map(async (step) => {
      console.log("Resolving step", step)
      const foregroundAudio = await fetch(step.foreground_audio);
      const overrideAudio = await fetch(step.override_song);
      console.log(foregroundAudio)
      console.log(overrideAudio)

      const resolvedStep: ResolvedStep = {
        foreground_audio: await foregroundAudio.blob(),
        override_song: await overrideAudio.blob(),
        body: step.body,
        head: step.head,
        id: step.id,
        wheel: step.wheel,
        length: step.length,
        wheel_index: step.wheel_index
       };

      console.log("Resolved step", resolvedStep)

      return resolvedStep
    }))
  }

  return resolvedWheel
}

export const WheelListItem = ({ wheel, length = 0 }: { wheel: Wheel, length?: number }) => {
  const time = (length > 0) ? formatTime(length) : "0sec";

  const savedWheelsContext = useSavedWheels()!

  const [saved, setSaved] = useState(savedWheelsContext.wheelSaved(wheel.id))
  useEffect(() => {
    setSaved(savedWheelsContext.wheelSaved(wheel.id))
  }, [savedWheelsContext.wheelIDs])

  const [present] = useIonToast()
  const history = useHistory()

  return <IonCard>
    <IonCardHeader color="primary">
      <IonGrid style={{
        width: "100%"
      }}>
        <IonRow style={{
          display: "flex",
          justifyContent: "between"
        }}>
          <IonThumbnail>
            <img src={wheel.icon} style={{ width: 40 }} />
          </IonThumbnail>
          <IonCol>
            <IonTitle>{wheel.title}</IonTitle>
          </IonCol>
          <IonCol style={{
            flex: "0"
          }}>
            <IonTitle>{time}</IonTitle>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardHeader>
    <IonCardContent style={{ paddingTop: '16px', paddingBottom: '16px' }}>
      <IonText class="listitemtext">{wheel.description}</IonText>
      <br />
      <IonButton onClick={(e) => {
        e.preventDefault()
        history.push(`/wheel/${wheel.id}`)
      }}>
        <IonIcon icon={logOutOutline} />
        <p className="ion-hide-md-down">View Wheel</p>
      </IonButton>
      <IonButton onClick={async (e) => {
        e.preventDefault()
        savedWheelsContext.toggleSaveWheel(wheel.id)
        const isSaved = savedWheelsContext.wheelSaved(wheel.id)
        setSaved(isSaved)

        const storage = new Storage()
        await storage.create()
        if (isSaved) {
          present({
            message: "Saving...",
            duration: 1000
          })
          // save using ionic storage
          const resolvedWheel = await resolveWheelURLs(wheel)
          await storage.set(`pw-saved-${wheel.id}`, resolvedWheel);
          present({
            message: "Saved",
            duration: 1000
          })
        } else {
          // delete using ionic storage
          await storage.remove(`pw-saved-${wheel.id}`)
          present({
            message: "Removed",
            duration: 1000
          })
        }
      }}>
        {saved ? <IonIcon icon={heart} /> : <IonIcon icon={heartOutline} />}
        <p className="ion-hide-md-down">&nbsp;Save</p>
      </IonButton>
    </IonCardContent>
  </IonCard>
}

export const StepListItem = ({ name, content, length = 0 }: { name: string, content: string, length?: number }) => {
  const time = (length > 0) ? formatTime(length) : "0sec";

  const item =
    <IonCard>
      <IonCardHeader color="primary">
        <IonGrid style={{
          width: "100%"
        }}>
          <IonRow style={{
            display: "flex",
            justifyContent: "between"
          }}>
            <IonCol>
              <IonTitle>{name}</IonTitle>
            </IonCol>
            <IonCol style={{
              flex: "0"
            }}>
              <IonTitle>{time}</IonTitle>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardHeader>
      <IonCardContent style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <IonText class="listitemtext">{content}</IonText>
      </IonCardContent>
    </IonCard>

  return item;
}
