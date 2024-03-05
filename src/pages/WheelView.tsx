import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelView.css';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { useEffect, useState } from 'react';

const WheelView: React.FC = () => {
  let id = useParams<{id: string}>();

  const [name, setName] = useState([])

  useEffect(() => {
      names()
  }, [])

  const names = async () => {
      const response = await fetch(`http://localhost:8000/wheels/${id}`)

      console.log(response)

      setName(await response.json())
  }

  // FIGURE OUT HOW TO PULL DATA FROM THE WHEEL


  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{`Title ${id.id}`}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <ListItem name={`Step 1 ${id.id}`} content="This is Step 1"/>
            <ListItem name="Step 2" content="This is Step 2"/>
          </IonList>
        </IonContent>
      </IonPage>
    </>
  )
}

export default WheelView;
