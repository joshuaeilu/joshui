import { IonButtons, IonCard, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRouterLink, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { searchOutline, speedometer } from "ionicons/icons";

const QuickstartCard = ({name, icon}: {name: string, icon: string}) => {
  return <IonCard className="ion-padding">
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
        <h1 style={{ margin: "auto" }}>Welcome to Prayer Wheels!</h1>
        <p>Prayer Wheels is a project by Covered Ministries to assist in guiding you through long periods of prayer.</p>
        <p>You can find wheels by either searching the <IonRouterLink routerLink="/wheellist">wheel list tab</IonRouterLink> or by getting a link from a friend.</p>
        <p>This app is currently in <IonText color="danger"><b>alpha</b></IonText>.  Please report any issues through the links in <IonRouterLink routerLink="/support">the support tab</IonRouterLink>.</p>
        <h3>Quick Start</h3>
        <QuickstartCard name="Find Wheels" icon={searchOutline} />
      </IonGrid>
    </IonContent>
  </IonPage>
}

export default Home;
