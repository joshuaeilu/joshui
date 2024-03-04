import "./ListItem.css";
import { IonRouterLink, IonText, IonTitle, IonToolbar } from "@ionic/react";

function ListItem({name, content, url}: {name: string, content: string, url?: string}) {
  const item =
    <IonToolbar>
      <IonTitle class="listitemtitle ion-padding">{name}</IonTitle>
      <IonText class="listitemtext">{content}</IonText>
    </IonToolbar>

  if(url != null) {
    return (
      <IonRouterLink routerLink={url} routerDirection="none">
        {item}
      </IonRouterLink>
    )
  }
  
  return item;
}

export default ListItem;
