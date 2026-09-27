export function filled(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function externalProps(href) {
  if (!filled(href)) return null;
  const isExternal = /^https?:\/\//i.test(href);
  if (isExternal) return { href, target: "_blank", rel: "noreferrer noopener" };
  if (/\.pdf(?:$|\?)/i.test(href)) {
    const filename = href.split("/").pop().split("?")[0] || "resume.pdf";
    return { href, target: "_blank", rel: "noreferrer", download: filename };
  }
  return { href };
}
