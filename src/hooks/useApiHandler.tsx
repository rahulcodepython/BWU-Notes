import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type ApiFunction<T = any> = () => Promise<T>; // eslint-disable-line @typescript-eslint/no-explicit-any
type OnFinallyFunction = () => void;

export function useApiHandler<T = any>() { // eslint-disable-line @typescript-eslint/no-explicit-any
    const [isLoading, setIsLoading] = useState(false);

    const callApi = useCallback(
        async (apiFunction: ApiFunction<T>, onFinally?: OnFinallyFunction): Promise<T | null> => {
            setIsLoading(true);
            try {
                const result = await apiFunction();
                return result;
            } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
                toast.error(error.message as string);
                return null;
            } finally {
                setIsLoading(false);
                if (onFinally) onFinally();
            }
        },
        []
    );

    return { isLoading, callApi };
}