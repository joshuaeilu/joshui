import { IonButton, IonCol, IonFooter, IonIcon, IonRange, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './PlayerControls.css';
import { useContext } from 'react';
import { PlayerState, PlayerStateContext } from './hooks/PlayerStateProvider';
import PlayerStepItem from './player/PlayerStepItem';
import { pause, play } from 'ionicons/icons';

function PlayerControls() {
  const playerStateContext = useContext(PlayerStateContext);

  if(!playerStateContext) {
    return null;
  }

  let { playerState } = playerStateContext;
  let wheel = playerState.wheel;

  return (
    <IonFooter>
      <IonToolbar>
        <IonRow>
          <IonCol size="auto">
            <IonTitle>{wheel?.title}</IonTitle>
            <IonButton onClick={() => playAudio(playerState)}>
              <IonIcon icon={play} />
            </IonButton>
            <IonButton onClick={() => pauseAudio(playerState)}>
              <IonIcon icon={pause} />
            </IonButton>
          </IonCol>
          <PlayerStepItem name="step 1" desc="test"></PlayerStepItem>
        </IonRow>
      </IonToolbar>
    </IonFooter>
  )
}

function playAudio(playerState: PlayerState) {
  // Swallowing errors for now
  playerState.background_audio.play().catch((e)=>{
  });
  playerState.foreground_audio.play().catch((e)=>{
  });
}

function pauseAudio(playerState: PlayerState) {
  playerState.background_audio.pause();
  playerState.foreground_audio.pause();
}

export default PlayerControls;
