/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.html' {
  const content: any;
  export default content;
}