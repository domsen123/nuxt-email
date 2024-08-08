import type { Options as _SMTPOptions } from 'nodemailer/lib/smtp-connection'
import type { Options as _MailgunOptions } from 'nodemailer-mailgun-transport'
import type { SendMailOptions } from 'nodemailer'

export type { MailService } from './runtime/server/mailer'

type AnyItem = Record<string, unknown>

export type TransportTypes = 'smtp' | 'mailgun'

export interface BaseOptions {
  templatePath: string
  transport: TransportTypes
  from: string
  allowedDomains?: string[]
}

export type SMTPOptions = {
  transport: 'smtp'
} & _SMTPOptions

export type MailgunOptions = {
  transport: 'mailgun'
} & _MailgunOptions

export type ModuleOptions = (BaseOptions & SMTPOptions) | (BaseOptions & MailgunOptions)

export type EmailOptions = SendMailOptions & {
  template?: {
    name?: string
    data: AnyItem
  }
}

export interface BuilderElement<T extends keyof HTMLElementTagNameMap> {
  tag: T
  attributes?: Partial<BuilderElementTagNameMap[T]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: string | BuilderElement<any>[]
}

export type AnyBuilderElement = BuilderElement<keyof HTMLElementTagNameMap>

export interface BuilderElementTagNameMap {
  a: Omit<HTMLAnchorElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  abbr: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  address: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  area: Omit<HTMLAreaElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  article: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  aside: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  audio: Omit<HTMLAudioElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  b: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  base: Omit<HTMLBaseElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  bdi: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  bdo: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  blockquote: Omit<HTMLQuoteElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  body: Omit<HTMLBodyElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  br: Omit<HTMLBRElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  button: Omit<HTMLButtonElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  canvas: Omit<HTMLCanvasElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  caption: Omit<HTMLTableCaptionElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  cite: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  code: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  col: Omit<HTMLTableColElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  colgroup: Omit<HTMLTableColElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  data: Omit<HTMLDataElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  datalist: Omit<HTMLDataListElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  dd: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  del: Omit<HTMLModElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  details: Omit<HTMLDetailsElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  dfn: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  dialog: Omit<HTMLDialogElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  div: Omit<HTMLDivElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  dl: Omit<HTMLDListElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  dt: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  em: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  embed: Omit<HTMLEmbedElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  fieldset: Omit<HTMLFieldSetElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  figcaption: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  figure: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  footer: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  form: Omit<HTMLFormElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  h1: Omit<HTMLHeadingElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  h2: Omit<HTMLHeadingElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  h3: Omit<HTMLHeadingElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  h4: Omit<HTMLHeadingElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  h5: Omit<HTMLHeadingElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  h6: Omit<HTMLHeadingElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  head: Omit<HTMLHeadElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  header: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  hgroup: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  hr: Omit<HTMLHRElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  html: Omit<HTMLHtmlElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  i: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  iframe: Omit<HTMLIFrameElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  img: Omit<HTMLImageElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  input: Omit<HTMLInputElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  ins: Omit<HTMLModElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  kbd: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  label: Omit<HTMLLabelElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  legend: Omit<HTMLLegendElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  li: Omit<HTMLLIElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  link: Omit<HTMLLinkElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  main: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  map: Omit<HTMLMapElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  mark: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  menu: Omit<HTMLMenuElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  meta: Omit<HTMLMetaElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  meter: Omit<HTMLMeterElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  nav: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  noscript: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  object: Omit<HTMLObjectElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  ol: Omit<HTMLOListElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  optgroup: Omit<HTMLOptGroupElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  option: Omit<HTMLOptionElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  output: Omit<HTMLOutputElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  p: Omit<HTMLParagraphElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  picture: Omit<HTMLPictureElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  pre: Omit<HTMLPreElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  progress: Omit<HTMLProgressElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  q: Omit<HTMLQuoteElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  rp: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  rt: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  ruby: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  s: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  samp: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  script: Omit<HTMLScriptElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  search: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  section: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  select: Omit<HTMLSelectElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  slot: Omit<HTMLSlotElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  small: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  source: Omit<HTMLSourceElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  span: Omit<HTMLSpanElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  strong: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  style: Omit<HTMLStyleElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  sub: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  summary: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  sup: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  table: Omit<HTMLTableElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  tbody: Omit<HTMLTableSectionElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  td: Omit<HTMLTableCellElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  template: Omit<HTMLTemplateElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  textarea: Omit<HTMLTextAreaElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  tfoot: Omit<HTMLTableSectionElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  th: Omit<HTMLTableCellElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  thead: Omit<HTMLTableSectionElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  time: Omit<HTMLTimeElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  title: Omit<HTMLTitleElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  tr: Omit<HTMLTableRowElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  track: Omit<HTMLTrackElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  u: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  ul: Omit<HTMLUListElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  var: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  video: Omit<HTMLVideoElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
  wbr: Omit<HTMLElement, 'style'> & { style?: Partial<CSSStyleDeclaration> }
}
