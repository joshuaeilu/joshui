import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelView.css';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { Wheel } from '../Types/Wheel'
import { useEffect, useState } from 'react';

const WheelView: React.FC = () => {
  let { id } = useParams<{id: string}>();

  const [name, setName] = useState([])

  useEffect(() => { names() }, [])

  const names = async () => {
      const response = await fetch(`http://localhost:8000/wheels/${id}/`)
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
            <IonTitle>{`Title ${name.title}`}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <ListItem name={`Step 1 ${id}`} content="This is Step 1"/>
            <ListItem name="Step 2" content="This is Step 2"/>
          </IonList>
        </IonContent>
      </IonPage>
    </>
  )
}

export default WheelView;
