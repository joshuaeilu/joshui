import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Home = () => {
  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div style={{
        marginLeft: 15
      }}>
        <h3>Welcome to Prayer Wheels!</h3>
        <p>This app brings to you the accessibility of a prayer wheel.</p>
      </div>
    </IonContent>
  </IonPage>
}

export default Home;
