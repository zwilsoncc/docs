import css from 'styled-jsx/css'
export const FONT_FAMILY_SANS =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'

export const FONT_FAMILY_MONO =
  'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif'

export const COLOR_ERROR = '#FF001F'
export const COLOR_SUCCESS = '#0076FF'
export const COLOR_PRIMARY = '#0076FF'

export const COLOR_CODE_LIGHT = '#D400FF'

export const SYNTAX_HIGHLIGHTING = css.global`
  code[class*='language-'],
  pre[class*='language-'] {
    color: #000;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    font-size: 0.95em;
    line-height: 1.4em;
    tab-size: 4;
    hyphens: none;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999;
  }
  .token.namespace {
    opacity: 0.7;
  }
  .token.string {
    color: #028265;
  }
  .token.attr-value,
  .token.punctuation,
  .token.operator {
    color: #000;
  }
  .token.url,
  .token.symbol,
  .token.boolean,
  .token.variable,
  .token.constant,
  .token.inserted {
    color: #36acaa;
  }
  .token.atrule,
  .language-autohotkey .token.selector,
  .language-json .token.boolean,
  code[class*='language-css'] {
    font-weight: 600;
  }
  .language-json .token.boolean {
    color: #0076ff;
  }
  .token.keyword {
    color: #ff0078;
    font-weight: bolder;
  }
  .token.function,
  .token.tag,
  .token.class-name,
  .token.number {
    color: #0076ff;
  }
  .token.deleted,
  .language-autohotkey .token.tag {
    color: #9a050f;
  }
  .token.selector,
  .language-autohotkey .token.keyword {
    color: #00009f;
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .language-json .token.property,
  .language-markdown .token.title {
    color: #000;
    font-weight: bolder;
  }
  .language-markdown .token.code {
    color: #0076ff;
    font-weight: normal;
  }
  .language-markdown .token.list,
  .language-markdown .token.hr {
    color: #999;
  }
  .language-markdown .token.url {
    color: #ff0078;
    font-weight: bolder;
  }
  .token.selector {
    color: #2b91af;
  }
  .token.property,
  .token.entity {
    color: #ff0000;
  }
  .token.attr-name,
  .token.regex {
    color: #d9931e;
  }
  .token.directive.tag .tag {
    background: #ffff00;
    color: #393a34;
  }
  /* dark */
  pre.dark[class*='language-'] {
    color: #fafbfc;
  }
  .language-json .dark .token.boolean {
    color: #0076ff;
  }
  .dark .token.string {
    color: #50e3c2;
  }
  .dark .token.function,
  .dark .token.tag,
  .dark .token.class-name,
  .dark .token.number {
    color: #2ba8ff;
  }
  .dark .token.attr-value,
  .dark .token.punctuation,
  .dark .token.operator {
    color: #efefef;
  }
  .dark .token.attr-name,
  .dark .token.regex {
    color: #fac863;
  }
  .language-json .dark .token.property,
  .language-markdown .dark .token.title {
    color: #fff;
  }
  .language-markdown .dark .token.code {
    color: #50e3c2;
  }
`

export const BASE_THEME = css.global`
  :root {
      /* Spacing variables */
      --geist-gap: 16pt;
      --geist-gap-negative: -16pt;
      --geist-gap-half: 8pt;
      --geist-gap-half-negative: -8pt;
      --geist-gap-quarter: 4pt;
      --geist-gap-quarter-negative: -4pt;
      --geist-page-margin: 16pt;
      --geist-page-width: 750pt;
      --geist-page-width-with-margin: 782pt;
      /* Breakpoints */
      --geist-breakpoint-mobile: 600px;
      --geist-breakpoint-tablet: 960px;
      /* Appearance */
      --geist-radius: 5px;
      /* Colors */
      --geist-cyan: #79FFE1;
      --geist-purple: #F81CE5;
      --geist-alert: #FF0080;
      /* Fonts */
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      --font-mono: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  }
   /* Helper classes */
  a.geist-reset {
    text-decoration: none;
    color: inherit;
  }
  hr.geist-hr-reset {
    margin: 0;
    border: none;
    border-bottom: 1px solid var(--accents-2);
    margin-top: -1px;
  }
  .geist-ellipsis {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    max-width: 100%;
   }
  .geist-overflow-scroll {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .geist-overflow-scroll-x {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .geist-overflow-scroll-y {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  /* Media Queries */
  @media screen and (min-width: 601px) {
    .geist-show-on-mobile {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .geist-hide-on-mobile {
      display: none;
    }
    .geist-overflow-reset-mobile {
      overflow: initial;
      -webkit-overflow-scrolling: initial;
    }
  }
  @media screen and (min-width: 961px) {
    .geist-show-on-tablet {
      display: none;
    }
  }
  @media screen and (max-width: 960px) {
    .geist-hide-on-tablet {
      display: none;
    }
  }
  /* Light Mode */
  :root, .dark-theme .invert-theme {
    --geist-foreground: #000;
    --geist-background: #fff;
    --geist-selection: var(--geist-cyan);
    --accents-1: #fafafa;
    --accents-2: #eaeaea;
    --accents-3: #999999;
    --accents-4: #888888;
    --accents-5: #666666;
    --accents-6: #444444;
    --accents-7: #333333;
    --accents-8: #111111;
    --geist-link-color: var(--geist-success);
    --geist-link-style: none;
    --geist-success: #0070F3;
    --geist-error: #FF0000;
    --geist-warning: #F5A623;
    --geist-secondary: var(--accents-5);
    --geist-code: var(--geist-purple);
    --dropdown-box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
    --dropdown-triangle-stroke: #fff;
    --scroller-start: rgba(255, 255, 255, 1);
    --scroller-end: rgba(255, 255, 255, 0);
    --shadow-small: 0 5px 10px rgba(0, 0, 0, 0.12);
    --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
    --shadow-large: 0 30px 60px rgba(0, 0, 0, 0.12);
    --portal-opacity: 0.25;
  }
  .geist-card-shadow {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  }
`

export const THEMES = css.global`
  /* Dark Mode */
  .dark-theme, .invert-theme {
    --geist-foreground: #fff;
    --geist-background: #000;
    --geist-selection: var(--geist-purple);
    --accents-8: #fafafa;
    --accents-7: #eaeaea;
    --accents-6: #999999;
    --accents-5: #888888;
    --accents-4: #666666;
    --accents-3: #444444;
    --accents-2: #333333;
    --accents-1: #111111;
    --geist-success: #0070F3;
    --geist-error: #FF0000;
    --geist-warning: #F5A623;
    --geist-secondary: var(--accents-5);
    --geist-code: var(--geist-cyan);
    --dropdown-box-shadow: 0 0 0 1px #333;
    --dropdown-triangle-stroke: #333;
    --scroller-start: rgba(0, 0, 0, 0.3);
    --scroller-end: rgba(255, 255, 255, 0);
    --geist-link-color: var(--geist-foreground);
    --geist-link-style: underline;
    --shadow-small: 0 0 0 1px #333;
    --shadow-medium: 0 0 0 1px #333;
    --shadow-large: 0 0 0 1px #333;
    --portal-opacity: 0.75;
  }
  .dark-theme .geist-card-shadow {
    box-shadow: 0 0 0 1px #333;
  }
`

const ThemeVariables = () => (
  <style jsx global>
    {THEMES}
  </style>
)

export const CSSVariables = ({ disableTheme }) => (
  <>
    <style jsx global>
      {BASE_THEME}
    </style>

    {!disableTheme && <ThemeVariables />}
  </>
)
