declare global {
  interface Window {
    update?: (arg) => void;
    play?: () => void;
    stop?: () => void;
    next?: () => void;
    pause?: () => void;
    shareRenderFunc?: () => void;
  }
}

export {};
