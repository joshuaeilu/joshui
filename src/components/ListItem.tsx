import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonIcon, IonRouterLink, IonRow, IonText, IonTitle } from "@ionic/react";
import { heart, heartOutline, logOutOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { toggleSaveWheel, wheelSaved } from "../SavedWheelHandler";
import { Wheel } from "../Types";
import { API_URL } from "../App";
import { useHistory } from "react-router";

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

  const [saved, setSaved] = useState(wheelSaved(wheel.id))
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
      <IonButton onClick={(e) => {
        e.preventDefault()
        toggleSaveWheel(wheel)
        setSaved(wheelSaved(wheel.id))
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
