import { getManager, ObjectType, Repository } from "typeorm";
import { BasicRepositoryI } from "../core/basic";

export class TypeORMRepository<T> implements BasicRepositoryI<T> {
  private _entityClass: ObjectType<T>;

  constructor(table: ObjectType<T>) {
    this._entityClass = table;
  }

  get repository(): Repository<T> {
    return getManager().getRepository<T>(this._entityClass);
  }

  findOne(id: string): Promise<T | undefined> {
    return getManager().getRepository<T>(this._entityClass).findOne(id);
  }

  list(): Promise<T[] | undefined> {
    return getManager().getRepository<T>(this._entityClass).find({});
  }

  insert(item: T): Promise<string | undefined> {
    return new Promise<string | undefined>(async (resolve, reject) => {
      const result = await getManager()
        .getRepository<T>(this._entityClass)
        .insert(item);

      if (result.identifiers.length === 0) {
        reject("Cant insert item");
        return;
      }

      const id = result.identifiers[0].id as string;
      resolve(id);
    });
  }

  upsert(item: T): Promise<T> {
    return getManager().getRepository<T>(this._entityClass).save(item);
  }

  // update(item : T, id: string) {
  //     return getManager().getRepository<T>(this.tableName).update(item, )
  // }
}
