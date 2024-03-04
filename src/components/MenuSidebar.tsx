import {
  IonMenu,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonItem
} from '@ionic/react'
import { cogOutline, speedometerOutline } from 'ionicons/icons';

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

function MenuSidebar() {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Prayer Wheel</IonTitle>
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
      </IonMenu>
    </>
  );
};

export default MenuSidebar;
