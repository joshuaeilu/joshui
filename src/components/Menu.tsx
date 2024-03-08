import {
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonItem,
  IonRow,
  IonInput,
  IonButton
} from '@ionic/react'
import { cogOutline, documentTextOutline, speedometerOutline } from 'ionicons/icons';
import logo from '../assets/logo.png'
import { useHistory } from 'react-router-dom';

const appPages = [
  {
    title: 'Saved Wheels',
    url: '/saved',
    iosIcon: documentTextOutline,
    mdIcon: documentTextOutline
  },
  {
    title: 'Wheels',
    url: '/wheellist',
    iosIcon: speedometerOutline,
    mdIcon: speedometerOutline
  },
  {
    title: 'Settings',
    url: '/settings',
    iosIcon: cogOutline,
    mdIcon: cogOutline
  }
]

function Menu() {
  const history = useHistory();

  function processURLInput() {
    const id = (document.getElementById("pw-id-input") as any).value;
    console.log((document.getElementById("pw-id-input") as any).value)
    if(id == null) {
      return;
    }
    history.push('/wheel/' + id)
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <img src={logo} style={{height: 48}}/>
            <IonTitle>Prayer Wheels</IonTitle>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {appPages.map((appPage, index) => {
          return (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          );
        })}
        <IonInput id="pw-id-input" label="Wheel ID" placeholder="Enter Here" type="number"/>
        <IonButton onClick={(e) => {{e.preventDefault(); processURLInput()}}}>Navigate</IonButton>
      </IonContent>
    </>
  );
};



export default Menu;
