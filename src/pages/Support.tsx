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
        <p>No support.</p>
      </div>
    </IonContent>
  </IonPage>
}

export default Support;
