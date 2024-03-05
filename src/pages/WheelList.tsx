import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelList.css';
import { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import { Wheel } from '../Types/Wheel';

const WheelList: React.FC = () => {

  const [name, setName] = useState([])

  useEffect(() => { names() }, [])

  const names = async () => {
      const response = await fetch("http://localhost:8000/wheels/")
      setName(await response.json())
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
          <IonList lines="none" className="wheellist">
            {
              name.map((data: Wheel) => {
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
