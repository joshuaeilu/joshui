import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"

const Support = () => {
  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Support</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div style={{ marginLeft: 15 }}>
        <p>You can reach the Prayer Wheel team at <a href="mailto:test@example.com">test@example.com</a>.</p>
        <p></p>
      </div>
    </IonContent>
  </IonPage>
}

export default Support;
