import { User, List } from "./api";

export type RootStackParamList = {
    'Tela de Pesquisa': undefined;
    'Perfil': { 
        id: string | undefined 
    };
    'Lista': {
      list: List[],
      title: string,
    };
};

export interface BaseModalProps {
    message: string;
    modalIsOpen: boolean;
    onClose: () => void;
}
export interface ModalState {
    message: string;
    modalIsOpen: boolean;
    closeAndBack: boolean;
}

export enum ScreenList {
    ORGS = "Tela de Organizações",
    REPOS = "Tela de Repositórios",
    SEGUIDORES = "Tela de Seguidores",
};