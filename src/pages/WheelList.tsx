import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelList.css';
import MenuSidebar from '../components/MenuSidebar';
import WheelListItem from '../components/WheelListItem';

const WheelList: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Wheel List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <WheelListItem name="Wheel 1" content="test" url="/settings"></WheelListItem>
          <WheelListItem name="Wheel 2" content="test 2"></WheelListItem>
          <WheelListItem name="Wheel 3" content="test 3"></WheelListItem>
          <WheelListItem name="Wheel 4" content="test 4"></WheelListItem>
        </IonContent>
      </IonPage>
    </>
  );
};

export default WheelList;
