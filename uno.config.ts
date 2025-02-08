// uno.config.ts
import {
  type Preset,
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { presetApplet, presetRemRpx, transformerAttributify } from 'unocss-applet'

const isMp = process.env?.UNI_PLATFORM?.startsWith('mp') ?? false

const presets: Preset[] = []
if (isMp) {
  // 使用小程序预设
  presets.push(presetApplet(), presetRemRpx())
} else {
  presets.push(
    // 非小程序用官方预设
    presetUno(),
    // 支持css class属性化
    presetAttributify(),
  )
}
export default defineConfig({
  presets: [
    ...presets,
    // 支持图标，需要搭配图标库，eg: @iconify-json/carbon, 使用 `<button class="i-carbon-sun dark:i-carbon-moon" />`
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // 将颜色函数 (rgb()和hsl()) 从空格分隔转换为逗号分隔，更好的兼容性app端，example：
    // `rgb(255 0 0)` -> `rgb(255, 0, 0)`
    // `rgba(255 0 0 / 0.5)` -> `rgba(255, 0, 0, 0.5)`
    // 与群友的正常写法冲突，先去掉！（2024-05-25）
    // presetLegacyCompat({
    //   commaStyleColorFunction: true,
    // }) as Preset,
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: [['center', 'flex justify-center items-center']],
  transformers: [
    // 启用 @apply 功能
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify({
      // 解决与第三方框架样式冲突问题
      prefixedOnly: true,
      prefix: 'fg',
    }),
  ],
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    [
      /^([pm])([xytrbl]?)-(\d+)$/,
      ([, prop, dir, value]) => {
        const cssProp = prop === 'p' ? 'padding' : 'margin'
        const dirs = {
          x: [`${cssProp}-left`, `${cssProp}-right`],
          y: [`${cssProp}-top`, `${cssProp}-bottom`],
          t: `${cssProp}-top`,
          r: `${cssProp}-right`,
          b: `${cssProp}-bottom`,
          l: `${cssProp}-left`,
        }
        const size = !isMp ? `${(Number(value) / 7.5).toFixed(2)}vw` : `${value}rpx`
        return dirs[dir]
          ? Array.isArray(dirs[dir])
            ? Object.fromEntries(dirs[dir].map((k) => [k, size]))
            : { [dirs[dir]]: size }
          : { [cssProp]: size }
      },
    ],
    // 处理 font-size
    [
      /^fs-(\d+)$/,
      ([, value]) => ({
        'font-size': !isMp ? `${(Number(value) / 7.5).toFixed(2)}vw` : `${value}rpx`,
      }),
    ],

    // 处理 gap
    [
      /^gap-(\d+)$/,
      ([, value]) => ({
        gap: !isMp ? `${(Number(value) / 7.5).toFixed(2)}vw` : `${value}rpx`,
      }),
    ],
  ],
})
