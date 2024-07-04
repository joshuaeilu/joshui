import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonModal, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { API_URL } from "../App";
import { useRef } from "react";

const ShareModal = ({wheelId, modaltrigger}: {wheelId: number, modaltrigger: string}) => {
  const linkText = API_URL + "/wheel/" + wheelId;

  const modal = useRef<HTMLIonModalElement>(null)

  return <IonModal ref={modal} trigger={modaltrigger}>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Share Wheel</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonItem>
        <p>Share this link with your friends!</p>
      </IonItem>
      <IonItem>
        <code>{linkText}</code>
      </IonItem>
      <IonItem>
        <IonButton onClick={() => navigator.clipboard.writeText(linkText)}>Copy to Clipboard</IonButton>
      </IonItem>
    </IonContent>
  </IonModal>
}

export default ShareModal;
