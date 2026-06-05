// Traduce un error con `code` y `params` enviados por el backend usando i18n.
// Si no hay code o la clave no existe, devuelve el message original.
export default function translateError(t, err) {
  if (err?.code) {
    const key = `errors.${err.code}`;
    const translated = t(key, err.params ?? {});
    if (translated !== key) return translated;
  }
  return err?.message ?? "";
}
