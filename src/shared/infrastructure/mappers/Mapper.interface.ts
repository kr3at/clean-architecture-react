export interface Mapper<T,R> {
  toDomain(raw: R): T;
  fromDomain(entity: T): R;
}
