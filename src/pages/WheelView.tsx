import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { SavedWheelsModel, Wheel } from '../Types'
import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../App'
import PlayerControls from '../components/PlayerControls';
import { PlayerStateContext } from '../components/hooks/PlayerStateProvider';
import { play, save } from 'ionicons/icons';

const WheelView: React.FC = () => {
  let { id } = useParams<{id: string}>();

  const [wheel, setWheel] = useState<Wheel | null>(null)

  useEffect(() => { getWheel() }, [])

  const getWheel = async () => {
      const url = `${API_URL}/wheels/${id}/`
      const response = await fetch(url)
      setWheel(await response.json())
  }

  const playerStateContext = useContext(PlayerStateContext);

  if(playerStateContext == null) return null;

  const { setActiveWheel } = playerStateContext;
  
  if (wheel == null) return <>Loading...</>

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonRow>
              <IonCol size="auto">
                <IonTitle>{wheel.title}</IonTitle>
              </IonCol>
              <IonButton onClick={() => setActiveWheel(wheel)}>
                <IonIcon icon={play} />
              </IonButton>
              <IonButton onClick={() => saveWheel(wheel)}>
                <IonIcon icon={save} />
              </IonButton>
            </IonRow>
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
  if(wheelsJSON == null) {
    savedWheels = { wheel_ids: [wheel.id] } 
  } else {
    savedWheels = JSON.parse(wheelsJSON);
    savedWheels.wheel_ids.push(wheel.id);
  }
  window.localStorage.setItem("pw-saved", JSON.stringify(savedWheels))
}

export default WheelView;
