import { createStandaloneToast } from '@chakra-ui/react';

// Params type
// content: string (required)
// position?: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left'
// status?: 'success' | 'info' | 'warning' | 'error'
// duration?: number (ms)
// isClosable?: boolean
// title?: string

const Toast = {
  show: (config) => {
    const { content, position = 'top-right', status = 'info', duration = 4000, isClosable = true, title } = config;
    const { toast } = createStandaloneToast();

    return toast({
      description: content,
      title,
      position,
      isClosable,
      duration,
      status
    });
  }
};

export default Toast;
