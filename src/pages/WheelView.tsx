import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { SavedWheelsModel, Wheel } from '../Types'
import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../App'
import PlayerControls from '../components/PlayerControls';
import { PlayerStateContext } from '../components/hooks/PlayerStateProvider';
import { heart, heartOutline, play, share } from 'ionicons/icons';
import { Share } from '@capacitor/share';

const WheelView: React.FC = () => {
  const [present] = useIonToast();
  let { id } = useParams<{ id: string }>();

  const [wheel, setWheel] = useState<Wheel | null>(null)
  const [saved, setSaved] = useState(wheelSaved(parseInt(id)))

  useEffect(() => { getWheel() }, [])

  const getWheel = async () => {
    const url = `${API_URL}/wheels/${id}/`
    const response = await fetch(url)
    setWheel(await response.json())
  }

  const playerStateContext = useContext(PlayerStateContext);

  if (playerStateContext == null) return null;

  const { setActiveWheel } = playerStateContext;

  if (wheel == null) return <>Loading...</>

  const shareButton = async () => {
    const wheel_url = `${API_URL}/wheels/${id}`
    if ((await Share.canShare()).value) {
      await Share.share({
        url: wheel_url
      })
    } else {
      navigator.clipboard.writeText(wheel_url)
      present({
        message: "Link to wheel has been copied to clipboard!  Paste it anywhere with Ctrl-V.",
        duration: 1500,
        position: "top"
      })
    }
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle style={{
              marginTop: 8
            }}>{wheel.title}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setActiveWheel(wheel)}>
                <IonIcon icon={play} />
                <p className="ion-hide-md-down">&nbsp;Play</p>
              </IonButton>
              <IonButton onClick={() => {
                saveWheel(wheel)
                setSaved(wheelSaved(wheel.id))
              }}>
                {saved ? <IonIcon icon={heart} /> : <IonIcon icon={heartOutline} />}
                <p className="ion-hide-md-down">&nbsp;Save</p>
              </IonButton>
              <IonButton onClick={() => shareButton()}>
                <IonIcon icon={share} />
                <p className="ion-hide-md-down">&nbsp;Share</p>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {
              wheel.steps.map((step) => {
                return (
                  <ListItem key={wheel.steps.indexOf(step)} name={step.head} content={step.body} length={step.length} />
                )
              })
            }
          </IonList>
        </IonContent>
        <PlayerControls />
      </IonPage>
    </>
  )
}

function saveWheel(wheel: Wheel) {
  const wheelsJSON = window.localStorage.getItem("pw-saved")
  let savedWheels: SavedWheelsModel;
  if (wheelsJSON == null) {
    savedWheels = { wheel_ids: [wheel.id] }
  } else {
    savedWheels = JSON.parse(wheelsJSON);
    if (savedWheels.wheel_ids.includes(wheel.id)) {
      savedWheels.wheel_ids.forEach((element, index) => {
        if (element == wheel.id) savedWheels.wheel_ids.splice(index, 1)
      });
    } else {
      savedWheels.wheel_ids.push(wheel.id);
    }
  }
  window.localStorage.setItem("pw-saved", JSON.stringify(savedWheels))
}

function wheelSaved(wheelId: number): boolean {
  const wheelsJSON = window.localStorage.getItem("pw-saved")
  if (wheelsJSON == null) return false

  const wheels: SavedWheelsModel = JSON.parse(wheelsJSON)
  return wheels.wheel_ids.includes(wheelId)
}

export default WheelView;
