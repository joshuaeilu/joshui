import { IonCard, IonCardContent } from "@ionic/react";

const PlayerStepItem = ({name, seconds, active=false, style}: 
  {name: string, seconds: number, active?: boolean, style?: {[key: string]: any}}) => {
  return (
    <IonCard color={active ? "primary" : "light"} style={{
      marginTop: 0,
      ...style
    }}>
      <IonCardContent>
        {name}
        <br/>
        {prettyPrintSeconds(seconds)}
      </IonCardContent>
    </IonCard>
  )
}

export function prettyPrintSeconds(seconds: number): string {
  return Math.floor(seconds/60) + ":" + (seconds%60 < 10 ? '0': '') + seconds%60
}

export default PlayerStepItem;
