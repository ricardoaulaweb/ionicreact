import {
  IonAvatar,
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import React, { useRef } from "react";
import { RouteComponentProps } from "react-router";
import CarroNaoEncontrado from "../components/CarroNaoEncontrado";
import { defaultAvatar } from "../constants";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import Carro from "../models/Carro.model";
import { TipoCarro } from "../models/TipoCarro";
import store from "../store";
import { ReducerActionType } from "../store/reducer";

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Form: React.FC<UserDetailPageProps> = ({ match, history }) => {
  const carroId = match.params.id && Number(match.params.id);
  const edicao = !!carroId;
  const titulo = edicao ? "Editar carro" : "Novo carro";
  const { state, dispath } = store.useStore();

  const carro = useRef(
    state.carros.find((c) => c.id === +match.params.id) || new Carro()
  ).current;

  const excluir = () => {
    history.goBack();
    requestAnimationFrame(() =>
      dispath({ type: ReducerActionType.DEL_CARRO, payload: carro.id })
    );
  };

  const salvar = () => {
    const type = edicao
      ? ReducerActionType.UPDATE_CARRO
      : ReducerActionType.ADD_CARRO;
    dispath({ type, payload: carro });
    history.goBack();
  };

  const { takePhoto } = usePhotoGallery();

  if (edicao && !state.carros.map((c) => c.id).includes(carroId)) {
    return <CarroNaoEncontrado />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{titulo}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{titulo}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonAvatar
          style={{
            width: "60%",
            height: "auto",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <img
            alt="foto"
            src={carro.imagem ? carro.imagem.webPath : defaultAvatar}
          />
        </IonAvatar>

        <IonItem>
          <IonLabel>Nome</IonLabel>
          <IonInput
            value={carro.descricao}
            onIonChange={(e) => carro.setDescricao(e.detail.value)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Tipo</IonLabel>
          <IonSelect
            value={carro.tipo}
            placeholder="Selecione"
            onIonChange={(e) => carro.setTipo(e.detail.value)}
          >
            {Object.values(TipoCarro).map((tipo) => (
              <IonSelectOption key={tipo} value={tipo}>
                {tipo}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Cor</IonLabel>
          <IonInput
            value={carro.cor}
            onIonChange={(e) => carro.setCor(e.detail.value)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Data compra</IonLabel>
          <IonDatetime
            display-timezone="utc"
            value={carro.dataCompra.toString()}
            onIonChange={(e) => carro.setDataCompra(new Date(e.detail.value))}
          ></IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel>Valor</IonLabel>
          <IonInput
            type="number"
            value={carro.valor}
            onIonChange={(e) => carro.setValor(Number(e.detail.value))}
          ></IonInput>
        </IonItem>

        <IonItem
          button
          detail
          onClick={async () => carro.setImagem(await takePhoto())}
        >
          <IonLabel>Incluir foto</IonLabel>
          <IonIcon icon={cameraOutline} slot="end" />
        </IonItem>

        {edicao && (
          <IonButton color="danger" onClick={excluir}>
            Excluir
          </IonButton>
        )}
        <IonButton color="primary" onClick={salvar}>
          Salvar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Form;
