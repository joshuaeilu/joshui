import "./WheelListItem.css";
import { IonRouterLink, IonText, IonTitle, IonToolbar } from "@ionic/react";

function WheelListItem({name, content, url}: {name: string, content: string, url: string}) {
  return (
    <>
      <IonRouterLink routerLink="/settings" routerDirection="none">
        <IonToolbar>
          <IonTitle class="wheellistitemtitle ion-padding">{name}</IonTitle>
          <IonText class="wheellistitemtext">{content}</IonText>
        </IonToolbar>
      </IonRouterLink>
    </>
  )
}

export default WheelListItem;
