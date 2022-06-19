declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * api url可理解为api base url or api prefix
     * 格式可以为fullurl或者pathname
     * 比如: https://api.demo.cn/api, //api.demo.cn/api, /api
     * 当配置为fullurl时请确认后端允许跨域
     */
    readonly apiUrl: string;
  }
}

declare module "*.css";
declare module "*.less";
declare module "*.png";
declare module "*.json";
declare module "*.svg" {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>
  ): React.ReactElement;
  const url: string
  export default url
}
