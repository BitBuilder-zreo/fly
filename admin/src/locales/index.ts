import type { App } from 'vue';
import type { I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';

export let i18n: ReturnType<typeof createI18n>

async function createI18nOptions(): Promise<I18nOptions> {

  return {}
}


export async function setupI18n(app: App) {

  const options = await createI18nOptions();

  i18n = createI18n(options);

  app.use(i18n)
}