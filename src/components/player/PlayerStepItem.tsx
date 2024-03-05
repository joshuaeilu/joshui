import './PlayerStepItem.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText } from "@ionic/react";

const PlayerStepItem = ({name, desc}: {name: string, desc: string}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText>{desc}</IonText>
      </IonCardContent>
    </IonCard>
  )
}

export default PlayerStepItem;
