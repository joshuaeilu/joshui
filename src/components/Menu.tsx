import {
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonItem,
} from '@ionic/react'
import { cogOutline, documentTextOutline, home, information, searchOutline } from 'ionicons/icons';
import logo from '../assets/logo.png'
import "./Menu.css"
import { useHistory } from 'react-router';

const appPages = [
  {
    title: 'Home',
    url: '/homepage',
    iosIcon: home,
    mdIcon: home
  },
  {
    title: 'Downloaded Wheels',
    url: '/downloaded',
    iosIcon: documentTextOutline,
    mdIcon: documentTextOutline
  },
  {
    title: 'Find Wheels',
    url: '/wheellist',
    iosIcon: searchOutline,
    mdIcon: searchOutline
  },
  {
    title: 'Settings',
    url: '/settings',
    iosIcon: cogOutline,
    mdIcon: cogOutline
  },
  {
    title: 'Support',
    url: '/support',
    iosIcon: information,
    mdIcon: information
  }
]

function Menu() {
  const history = useHistory()

  return <>
    <IonHeader>
      <IonToolbar>
        <IonItem onClick={(e) => {
          e.preventDefault()
          history.push("/homepage")
        }}>
          <img src={logo} style={{ height: 48 }} />
          <IonTitle>Prayer Wheels</IonTitle>
        </IonItem>
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
};

export default Menu;
