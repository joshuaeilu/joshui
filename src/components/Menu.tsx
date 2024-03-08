import {
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonItem,
  IonRow
} from '@ionic/react'
import { cogOutline, speedometerOutline } from 'ionicons/icons';
import './Menu.css'
import logo from '../assets/logo.png'

const appPages = [
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
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <img src={logo} />
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
      </IonContent>
    </>
  );
};

export default Menu;
