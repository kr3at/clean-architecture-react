export interface UseCase<TParams, TResult> {
  execute(params: TParams): Promise<TResult>;
}
