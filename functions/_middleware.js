// functions/_middleware.js
export async function onRequest(context) {
  const { request, next } = context;
  const host = new URL(request.url).host;

  // ============ 修改这里！填入你自己的两个自定义域名 ============
  const allowHostList = new Set([
    "dav.justsaber.com",    //网页UI域名（绑定Access，MFA登录）
  ]);
  // ==========================================================

  // 如果不在白名单，直接403禁止访问（pages.dev、预览域名全部拦截）
  if (!allowHostList.has(host)) {
    return new Response("Forbidden, Domain Not Allowed", { status: 403 });
  }

  // 域名校验通过，继续执行Davflare原有逻辑
  return await next();
}
