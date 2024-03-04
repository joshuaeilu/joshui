import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelList.css';
import ListItem from '../components/ListItem';

const WheelList: React.FC = () => {
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
            <ListItem name="Wheel 1" content="test" url="/wheel/banana" />
            <ListItem name="Wheel 2" content="test 2" url="/settings" />
            <ListItem name="Wheel 3" content="test 3" url="/settings" />
            <ListItem name="Wheel 4" content="test 4" url="/settings" />
            <ListItem name="Wheel 5" content="test 5" url="/settings" />
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default WheelList;
