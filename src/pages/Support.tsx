import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { API_URL } from "../App";

const Support = () => {
  const [markdown, setMarkdown] = useState<string | null>();

  const getMarkdown = async () => {
    const request = await fetch(`${API_URL}/mdpages/support_page`)
    if (!request.ok) return
    const data = await request.json()
    setMarkdown(data)
  }

  useEffect(() => {
    getMarkdown()
  }, [])

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
      <div style={{ marginLeft: 15 }} className="ion-padding ion-text-center">
        {markdown ?
        <Markdown>{markdown}</Markdown>
        :
        <p>Contacts can be found on the Covered Ministries site.</p>}
      </div>
    </IonContent>
  </IonPage>
}

export default Support;
