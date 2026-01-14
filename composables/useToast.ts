export const useToast = () => {
  if (process.client) {
    return {
      toast: (options: { title: string; description?: string; variant?: 'default' | 'destructive' }) => {
        // Simple browser notification as fallback
        // You can replace this with a Vue toast library later
        const message = options.description 
          ? `${options.title}: ${options.description}` 
          : options.title;
        
        if (options.variant === 'destructive') {
          console.error(message);
          // You can add a custom toast UI here
        } else {
          console.log(message);
          // You can add a custom toast UI here
        }
      },
    };
  }
  return {
    toast: () => {}, // No-op on server
  };
};

