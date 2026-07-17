import type { ComputedRef, Ref } from 'vue'

export interface PublicSlideRoute {
  readonly no: number
  readonly meta: {
    readonly slide: {
      readonly frontmatter: Record<string, unknown>
    }
  }
}

export interface PublicSlidevNav {
  readonly slides: Ref<PublicSlideRoute[]>
  readonly currentPage: ComputedRef<number>
  readonly go: (page: number | string, clicks?: number, force?: boolean) => Promise<void>
}

/**
 * Type-only mirror of the documented public members used by this addon.
 * Runtime resolution still targets the real `@slidev/client` package.
 */
export declare function useNav(): PublicSlidevNav
