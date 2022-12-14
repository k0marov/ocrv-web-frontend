import { APITextsService } from "./features/texts/domain/service/APITextsService";
import { MockTextsService } from "./features/texts/domain/service/MockTextsService";
import { TextsBloc } from "./features/texts/domain/state/TextsBloc";

interface UIDeps {
    textsBloc: () => TextsBloc;
}

export let uiDeps: UIDeps;


const service = new APITextsService();
uiDeps = {
    textsBloc: () => new TextsBloc(service),
};