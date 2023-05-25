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

export enum ScreenList {
    ORGS = "Tela de Organizações",
    REPOS = "Tela de Repositórios",
    SEGUIDORES = "Tela de Seguidores",
};