import './PlayerStepItem.css';
import { IonCard, IonCardContent, IonText } from "@ionic/react";

const PlayerStepItem = ({name, seconds, active=false}: {name: string, seconds: number, active?: boolean}) => {
  return (
    <IonCard className={"playerstepitem " + (active ? "active" : "")} style={{
      marginTop: 0
    }}>
      <IonCardContent>
        <IonText>{name}</IonText>
        <br/>
        <IonText>{Math.floor(seconds/60)}:{seconds%60 < 10 ? '0': ''}{seconds%60}</IonText>
      </IonCardContent>
    </IonCard>
  )
}

export default PlayerStepItem;
