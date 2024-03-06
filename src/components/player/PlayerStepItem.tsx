import './PlayerStepItem.css';
import { IonCard, IonCardContent, IonText } from "@ionic/react";

const PlayerStepItem = ({name, seconds}: {name: string, seconds: number}) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonText>{name}</IonText>
        <br/>
        <IonText>{Math.floor(seconds/60)}:{seconds%60 < 10 ? '0': ''}{seconds%60}</IonText>
      </IonCardContent>
    </IonCard>
  )
}

export default PlayerStepItem;
