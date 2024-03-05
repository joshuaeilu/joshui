import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelView.css';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { Wheel } from '../Types'
import { useEffect, useState } from 'react';
import { API_URL } from '../App'

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

  console.log(wheel.steps)

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{wheel.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {
              wheel.steps.map((step) => {

                return (
                  <ListItem key={wheel.steps.indexOf(step)} name={step.head} content={step.body} />
                )
              })
            }
          </IonList>
        </IonContent>
      </IonPage>
    </>
  )
}

export default WheelView;
