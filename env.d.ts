/// <reference types="@slidev/client" />
/// <reference types="@slidev/types/client" />
/// <reference types="vite/client" />
/// <reference path="./node_modules/@slidev/client/shim-vue.d.ts" />

declare const __DEV__: boolean
declare const __SLIDEV_FEATURE_DRAWINGS_PERSIST__: boolean
declare const __SLIDEV_FEATURE_EDITOR__: boolean
declare const __SLIDEV_HAS_SERVER__: boolean
declare const __SLIDEV_HASH_ROUTE__: boolean

declare module 'file-saver'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
