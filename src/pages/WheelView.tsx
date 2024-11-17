import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Wheel } from '../Types'
import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../App'
import PlayerControls from '../components/PlayerControls';
import { PlayerStateContext } from '../components/hooks/PlayerStateProvider';
import { heart, heartOutline, play, share } from 'ionicons/icons';
import { Share } from '@capacitor/share';
import { StepListItem } from '../components/ListItem';
import { SavedWheelsContext } from '../components/hooks/SavedWheelsProvider';

const WheelView: React.FC = () => {
  const [present] = useIonToast();
  let { id } = useParams<{ id: string }>();

  const savedWheelsContext = useContext(SavedWheelsContext)!

  const [wheel, setWheel] = useState<Wheel | null>(null)
  const [saved, setSaved] = useState(savedWheelsContext.wheelSaved(parseInt(id)))

  useEffect(() => { getWheel() }, [])
  useEffect(() => { setSaved(savedWheelsContext.wheelSaved(parseInt(id))) }, [savedWheelsContext.wheelIDs])

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
        message: "Link to wheel has been copied to clipboard!  Paste it anywhere.",
        duration: 1500,
        position: "top"
      })
    }
  }

  return <IonPage>
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
            savedWheelsContext.toggleSaveWheel(wheel.id)
            setSaved(savedWheelsContext.wheelSaved(wheel.id))
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
          wheel.steps.sort((a, b) => a.wheel_index - b.wheel_index).map((step) => {
            return (
              <StepListItem key={wheel.steps.indexOf(step)} name={step.head} content={step.body} length={step.length} />
            )
          })
        }
      </IonList>
    </IonContent>
    <PlayerControls />
  </IonPage>
}

export default WheelView;
