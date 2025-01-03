import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../../shared/infrastructure/store/store';
import { container } from 'tsyringe';
import { UpdatePostFieldUseCase } from '../useCases/UpdatePostFieldUseCase';
import { UpdatePostFieldParams } from '../dto/UpdatePostFieldParams';

export const useUpdatePostField = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePostField = async (params: UpdatePostFieldParams) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Obtenemos el caso de uso del contenedor
      // const useCase = container.resolve(UpdatePostFieldUseCase);
      
      // Ejecutamos el caso de uso
      // await useCase.execute(params);
      
      // Aquí podrías dispatchear una acción de Redux para actualizar el estado
      // dispatch(updatePostFieldInStore(params));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update field');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updatePostField,
    isLoading,
    error
  };
};
