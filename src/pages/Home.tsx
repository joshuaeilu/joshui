import { IonButtons, IonCard, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRouterLink, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { cogOutline, searchOutline } from "ionicons/icons";
import { useHistory } from "react-router";

const QuickstartCard = ({name, icon, url}: {name: string, icon: string, url: string}) => {
  const history = useHistory()

  return <IonCard className="ion-padding" onClick={(e) => {
    e.preventDefault()
    history.push(url)
  }}>
    <IonIcon icon={icon} style={{ fontSize: 64 }}/>
    <h3>{name}</h3>
  </IonCard>
}

const Home = () => {
  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonGrid className="ion-padding ion-text-center ion-justify-content-center">
        <h1>Welcome to Prayer Wheels!</h1>
        <p>Prayer Wheels is a project by Covered Ministries to provide tools for structured and continuous prayer.</p>
        <p>You can find wheels by either searching the <IonRouterLink routerLink="/wheellist">Find Wheels</IonRouterLink> tab or by getting a link from a friend.</p>
        <p>This app is currently in <IonText color="danger"><b>alpha</b></IonText>.  Please report any issues through the links in the <IonRouterLink routerLink="/support">Support</IonRouterLink> tab.</p>
        <h3>Quick Start</h3>
        <QuickstartCard name="Find Wheels" icon={searchOutline} url="/wheellist" />
        <QuickstartCard name="Settings" icon={cogOutline} url="/settings" />

        <h3>PWA Support</h3>
        <p>If you would like to use this app natively on mobile, it supports being installed as a PWA!</p>
        <p>Tap the three dots in the upper right corner of your browser and select the option to install this app to your home screen.  This will install the app onto your device.</p>
      </IonGrid>
    </IonContent>
  </IonPage>
}

export default Home;
