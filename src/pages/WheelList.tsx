import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Wheel } from '../Types';
import { API_URL } from '../App'
import PlayerControls from '../components/PlayerControls';
import { WheelListItem } from '../components/ListItem';

const WheelList: React.FC = () => {
  const [wheels, setWheels] = useState<Wheel[]>([])

  useEffect(() => { getWheels() }, [])

  const getWheels = async () => {
    const response = await fetch(`${API_URL}/wheels/`)
    setWheels(await response.json())
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Wheel List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          {wheels.length != 0 && <IonList lines="none" className="wheellist">
            {
              wheels.map((data) => {
                const totalTime = data.steps.reduce(
                  (accumulator, currentValue) => accumulator + currentValue.length, 0
                )
                return (
                  <WheelListItem key={wheels.indexOf(data)} wheel={data} length={totalTime} />
                )
              })
            }
          </IonList>}
          {wheels.length == 0 && <>Loading...</>}
        </IonContent>
        <PlayerControls />
      </IonPage>
    </>
  );
};

export default WheelList;
