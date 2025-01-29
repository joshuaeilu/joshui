import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { API_URL } from "../App";
import PlayerControls from "../components/PlayerControls";
import { useLocalStorage } from "react-use";

const Support = () => {
  const [savedText, setSavedText] = useLocalStorage('pw-support-page', null)
  const [markdown, setMarkdown] = useState<string | null>()

  const [version, setVersion] = useState<string | null>()
  const [apiFailed, setApiFailed] = useState<boolean>(false)

  const getMarkdown = async () => {
    await fetch(`${API_URL}/mdpages/support_page`)
      .then(async (res) => {
        const data = await res.json()
        setSavedText(data)
        setMarkdown(data)
      }).catch(() => {
        setMarkdown(savedText)
      })
  }

  useEffect(() => {
    getMarkdown()
  }, [])

  const getVersion = async () => {
    const request = await fetch(`${API_URL}/version`)
    if (!request.ok) {
      setApiFailed(true)
      return
    }
    const data = await request.text()
    setVersion(data)
  }

  useEffect(() => {
    getVersion()
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
      <div style={{ marginLeft: 15 }} className="ion-padding ion-text-center ion-justify-content-center">
        {markdown ?
          <Markdown>{markdown}</Markdown>
          :
          <p>Contacts can be found on the Covered Ministries site.</p>}

        <h3>App Info</h3>
        <p>Version: <IonText color="success">{__APP_VERSION__}</IonText></p>
        <h3>API Info</h3>
        {apiFailed ?
          <IonText color='danger'>API Unreachable.</IonText>
          :
          <>
            <p>Version: {version ? <IonText color="success">{version}</IonText> : <IonText color="warning">API Version Unavailable.</IonText>}</p>
            <p>URL: <IonText color="success">{API_URL}</IonText></p>
          </>
        }
      </div>
    </IonContent>
    <PlayerControls />
  </IonPage>
}

export default Support;
