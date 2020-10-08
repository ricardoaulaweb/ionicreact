import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import { defaultAvatar } from "../constants";
import Carro from "../models/Carro.model";

export default ({ carro }: { carro: Carro }) => (
  <IonItem routerLink={`/form/${1}`}>
    <IonAvatar style={{ marginRight: "10px", display: "flex" }}>
      <img
        alt="foto"
        src={carro.imagem ? carro.imagem.webPath : defaultAvatar}
      />
    </IonAvatar>
    <IonLabel color="primary">
      <h2>
        {carro.descricao} - {carro.tipo}
      </h2>
      <h3>Cor {carro.cor}</h3>
      <p>
        Adquirido em {carro.dataCompra.getFullYear()} por R$ {carro.valor}
      </p>
    </IonLabel>
  </IonItem>
);
