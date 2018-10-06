declare module '*.css' {
  const styles: any;
  export = styles;
}
declare module '*.less' {
  const styles: any;
  export = styles;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
