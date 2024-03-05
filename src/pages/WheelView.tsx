import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelView.css';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { Wheel } from '../Types/Wheel'
import { useEffect, useState } from 'react';
import { API_URL } from '../config'

const WheelView: React.FC = () => {
  let { id } = useParams<{id: string}>();

  const [wheel, setWheel] = useState<Wheel | null>(null)

  useEffect(() => { getWheel() }, [])

  const getWheel = async () => {
      const url = `${API_URL}/wheels/${id}/`
      const response = await fetch(url)
      console.log(url)
      setWheel(await response.json())
  }

  if (wheel == null) return <>Loading...</>

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{`Title ${wheel.title}`}</IonTitle>
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
