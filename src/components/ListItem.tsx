import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonIcon, IonRow, IonText, IonThumbnail, IonTitle, useIonLoading, useIonToast } from "@ionic/react";
import { download, downloadOutline, logOutOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Wheel } from "../Types";
import { useHistory } from "react-router";
import { useDownloadedWheels } from "./hooks/DownloadedWheelsProvider";

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

export const WheelListItem = ({ wheel, length = 0 }: { wheel: Wheel, length?: number }) => {
  const time = (length > 0) ? formatTime(length) : "0sec";

  const downloadedWheelsContext = useDownloadedWheels()!

  const [downloaded, setDownloaded] = useState(false)
  useEffect(() => {
    const updateDownloaded = async () => setDownloaded(await downloadedWheelsContext.isDownloaded(wheel.id))
    updateDownloaded()
  }, [])

  const [present] = useIonToast()
  const [presentLoad, dismissLoad] = useIonLoading()
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

        presentLoad({
          message: "Downloading..."
        })
        if (!downloaded) {
          await downloadedWheelsContext.addWheel(wheel.id).then(() => {
            present({
              message: "Downloaded",
              duration: 3000,
            })
          })
        } else {
          await downloadedWheelsContext.removeWheel(wheel.id).then(() => {
            present({
              message: "Removed",
              duration: 3000
            })
          })
        }
        dismissLoad()

        setDownloaded(await downloadedWheelsContext.isDownloaded(wheel.id))
      }}>
        {downloaded ? <IonIcon icon={download} /> : <IonIcon icon={downloadOutline} />}
        <p className="ion-hide-md-down">&nbsp;Download</p>
      </IonButton>
    </IonCardContent>
  </IonCard >
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
