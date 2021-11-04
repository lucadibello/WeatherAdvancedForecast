export default interface IRoute {
  path: string;
  name: string;
  exact: Boolean;
  component: any;
  props?: any;
}