import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { User } from '../Types';
import { API_URL } from '../App'
import PlayerControls from '../components/PlayerControls';
import { useParams } from 'react-router';
import { WheelListItem } from '../components/ListItem';

const WheelList: React.FC = () => {
  let { username } = useParams<{username: string}>();

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => { getUser() }, [])

  const getUser = async () => {
      const response = await fetch(`${API_URL}/username/${username}`)
      setUser(await response.json())
  }

  if (user == null) return <>Loading...</>

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{username}'s Wheels</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <IonList lines="none" className="wheellist">
            {
              user.wheel_set.map((data) => {
                return (
                    <WheelListItem key={user.wheel_set.indexOf(data)} wheel={data} length={data.wheel_time} />
                )
              })
            }
          </IonList>
        </IonContent>
        <PlayerControls />
      </IonPage>
    </>
  );
};

export default WheelList;
