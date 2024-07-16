import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonRouterLink, IonText, IonTitle, IonToolbar } from "@ionic/react";

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
      <div style={{
        marginLeft: 15
      }}>
        <h3>Welcome to Prayer Wheels!</h3>
        <p>Prayer Wheels is a project by Covered Ministries to assist in guiding you through long periods of prayer.</p>
        <p>You can find wheels by either searching the <IonRouterLink routerLink="/wheellist">wheel list tab</IonRouterLink> or by getting a link from a friend.</p>
        <p>This app is currently in <IonText color="danger"><b>alpha</b></IonText>.  Please report any issues through the links in <IonRouterLink routerLink="/support">the support tab</IonRouterLink>.</p>
      </div>
    </IonContent>
  </IonPage>
}

export default Home;
