import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

/**
 * Custom hook to initialize Microsoft Clarity
 * @param projectId - Your Clarity project ID (get it from https://clarity.microsoft.com/)
 */
export const useClarity = (projectId: string) => {
  useEffect(() => {
    if (!projectId) {
      console.warn('Clarity project ID is missing');
      return;
    }

    // Initialize Clarity
    Clarity.init(projectId);

    console.log('Microsoft Clarity initialized');
  }, [projectId]);
};
