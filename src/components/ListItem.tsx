import "./ListItem.css";
import { IonCard, IonCardContent, IonCardHeader, IonRouterLink, IonText, IonTitle, IonToolbar } from "@ionic/react";

function ListItem({name, content, url}: {name: string, content: string, url?: string}) {
  const item =
    <IonCard>
      <IonCardHeader class="listitemheader">
        <IonTitle>{name}</IonTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText class="listitemtext">{content}</IonText>
      </IonCardContent>
    </IonCard>

  if(url != null) {
    return (
      <IonRouterLink routerLink={url} routerDirection="none" className="pw-listitem">
        {item}
      </IonRouterLink>
    )
  }
  
  return item;
}

export default ListItem;
