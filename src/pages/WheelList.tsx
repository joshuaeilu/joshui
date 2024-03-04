import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelList.css';
import WheelListItem from '../components/WheelListItem';

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
          <WheelListItem name="Wheel 1" content="test" url="/settings" />
          <WheelListItem name="Wheel 2" content="test 2" url="/settings" />
          <WheelListItem name="Wheel 3" content="test 3" url="/settings" />
          <WheelListItem name="Wheel 4" content="test 4" url="/settings" />
        </IonContent>
      </IonPage>
    </>
  );
};

export default WheelList;
