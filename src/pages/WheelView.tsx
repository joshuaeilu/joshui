import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelView.css';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem';
import Footer from '../components/Footer';

const WheelView: React.FC = () => {
  let { wheelId } = useParams<{wheelId: string}>();

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{wheelId}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <ListItem name={wheelId} content="This is Step 1"/>
            <ListItem name="Step 2" content="This is Step 2"/>
          </IonList>
        </IonContent>
        <Footer />
      </IonPage>
    </>
  )
}

export default WheelView;
