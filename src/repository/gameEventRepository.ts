import { Service } from "typedi";
import { TypeORMRepository } from "./typeORMRepository";
import {GameEvent} from "../core/gameEvent";

@Service()
export class GameEventRepository extends TypeORMRepository<GameEvent> {
  constructor() {
    super(GameEvent);
  }

}
