declare global {
  namespace chrome {
    namespace runtime {
      interface LastError {
        message?: string;
      }

      const lastError: LastError | undefined;

      function sendMessage(
        extensionId: string,
        message: unknown,
        responseCallback?: (response: unknown) => void
      ): void;

      function sendMessage(
        message: unknown,
        responseCallback?: (response: unknown) => void
      ): void;
    }
  }
}

export {};
