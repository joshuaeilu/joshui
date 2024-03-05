import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelList.css';
import { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import { Wheel } from '../Types/Wheel';
import { API_URL } from '../App'

const WheelList: React.FC = () => {

  const [wheels, setWheels] = useState([])

  useEffect(() => { getWheels() }, [])

  const getWheels = async () => {
      const response = await fetch(`${API_URL}/wheels/`)
      setWheels(await response.json())
  }

  if (wheels.length == 0) return <>Loading...</>

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
          <IonList lines="none" className="wheellist">
            {
              wheels.map((data: Wheel) => {
                return (
                  <ListItem name={data.title} content={data.description} url={`/wheel/${data.id}`} />
                )
              })
            }
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default WheelList;
