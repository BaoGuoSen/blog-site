export const switchRender = <T, S>(node1: T, node2: S, condition: boolean) =>
  condition ? node1 : node2

export default switchRender
