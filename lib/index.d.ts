declare module "src/thousand" {
    export default function thousand(t: any): string;
}
declare module "index" {
    export { default as thousand } from "src/thousand";
}
