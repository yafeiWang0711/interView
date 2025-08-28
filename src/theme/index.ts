/**
 * 主题管理工具
 * 用于运行时切换和管理主题
 */

// 主题配置接口
interface ThemeConfig {
  primaryColor: string;
  headerBgColor: string;
  siderBgColor: string;
  [key: string]: string;
}

// 默认主题
const defaultTheme: ThemeConfig = {
  primaryColor: '#1890ff',
  headerBgColor: '#2e7aee',
  siderBgColor: '#f0f2f5',
};

// 当前主题
let currentTheme = { ...defaultTheme };

/**
 * 获取当前主题配置
 */
export const getTheme = (): ThemeConfig => {
  return { ...currentTheme };
};

/**
 * 更新主题配置
 * @param theme 新的主题配置
 */
export const updateTheme = (theme: Partial<ThemeConfig>): void => {
  currentTheme = { ...currentTheme, ...theme };
  
  // 更新 CSS 变量
  const root = document.documentElement;
  Object.entries(currentTheme).forEach(([key, value]) => {
    // 将驼峰命名转换为 kebab-case
    const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
};

/**
 * 重置为默认主题
 */
export const resetTheme = (): void => {
  currentTheme = { ...defaultTheme };
  updateTheme({});
};