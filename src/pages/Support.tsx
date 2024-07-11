import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"

const Support = () => {
  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Support</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div style={{ marginLeft: 15 }}>
        <p>You can reach the Prayer Wheel team at <a href="mailto:prayerwheeladmin@coveredministries.com">prayerwheeladmin@coveredministries.com</a>.</p>
      </div>
    </IonContent>
  </IonPage>
}

export default Support;
