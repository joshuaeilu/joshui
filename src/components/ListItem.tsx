import { IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonRouterLink, IonRow, IonText, IonTitle } from "@ionic/react";

// Utility function to format milliseconds to hours, minutes, and seconds
const formatTime = (milliseconds: number): string => {
  let seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  let time = ""
  time += (hours != 0) ? `${hours}h` : ""
  time += (minutes != 0) ? ` ${minutes}m` : ""
  time += (seconds != 0) ? ` ${seconds}s` : ""

  return time;
};

function ListItem({ name, content, length = 0, url }: { name: string, content: string, length?: number, url?: string }) {
  const time = (length > 0) ? formatTime(length) : "0sec";

  const item =
    <IonCard>
      <IonCardHeader color="primary">
        <IonGrid style={{
          width: "100%"
        }}>
          <IonRow style={{
            display: "flex",
            justifyContent: "between"
          }}>
            <IonCol>
              <IonTitle>{name}</IonTitle>
            </IonCol>
            <IonCol style={{
              flex: "0"
            }}>
              <IonTitle>{time}</IonTitle>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardHeader>
      <IonCardContent style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <IonText class="listitemtext">{content}</IonText>
      </IonCardContent>
    </IonCard>

  if (url != null) {
    return (
      <IonRouterLink routerLink={url} routerDirection="none" className="pw-listitem">
        {item}
      </IonRouterLink>
    )
  }

  return item;
}

export default ListItem;
