<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap · romaindeville.eu</title>
        <style>
          :root { --bg:#0F172A; --bg2:#1E293B; --line:#334155; --muted:#94A3B8; --fg:#F1F5F9; --accent:#818cff; --accent2:#A78BFA; }
          * { box-sizing:border-box; }
          body { margin:0; background:var(--bg); color:var(--fg); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; line-height:1.5; }
          .wrap { max-width:1100px; margin:0 auto; padding:40px 24px 80px; }
          h1 { font-size:28px; margin:0 0 4px; }
          h1 .dot { color:var(--accent2); }
          .sub { color:var(--muted); margin:0 0 28px; font-size:14px; }
          .count { display:inline-block; background:var(--bg2); border:1px solid var(--line); color:var(--accent); padding:3px 10px; border-radius:999px; font-size:13px; font-weight:600; }
          table { width:100%; border-collapse:collapse; margin-top:20px; font-size:14px; }
          thead th { text-align:left; color:var(--muted); font-weight:600; text-transform:uppercase; font-size:11px; letter-spacing:.04em; padding:10px 12px; border-bottom:1px solid var(--line); }
          tbody td { padding:11px 12px; border-bottom:1px solid var(--line); vertical-align:top; }
          tbody tr:hover { background:rgba(129,140,255,.06); }
          a { color:var(--accent); text-decoration:none; word-break:break-all; }
          a:hover { text-decoration:underline; }
          .lang { display:inline-block; background:var(--bg2); border:1px solid var(--line); color:var(--muted); padding:1px 7px; border-radius:6px; font-size:11px; margin-right:4px; }
          .prio { color:var(--accent2); font-variant-numeric:tabular-nums; }
          .freq { color:var(--muted); }
          .date { color:var(--muted); font-size:12px; white-space:nowrap; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1>Romain De Ville<span class="dot">.</span> — Sitemap</h1>
          <p class="sub">Fichier destiné aux moteurs de recherche. <span class="count"><xsl:value-of select="count(s:urlset/s:url)"/> URLs</span></p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Langues (hreflang)</th>
                <th>Priorité</th>
                <th>Fréquence</th>
                <th>Modifié</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                  <td>
                    <xsl:for-each select="xhtml:link">
                      <span class="lang"><xsl:value-of select="@hreflang"/></span>
                    </xsl:for-each>
                  </td>
                  <td class="prio"><xsl:value-of select="s:priority"/></td>
                  <td class="freq"><xsl:value-of select="s:changefreq"/></td>
                  <td class="date"><xsl:value-of select="substring(s:lastmod,1,10)"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
