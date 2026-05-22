import sys

path = r"D:\F2V\F2V Design System Final\design-system\V-04-disease-input.html"
with open(path, "r", encoding="utf-8", newline="") as f:
    html = f.read()

nl = "\r\n" if "\r\n" in html else "\n"

sections = [
    "section-acute-rates",
    "section-peracute-rates",
    "section-subacute-rates",
    "section-chronic-rates",
]

sf_old = '<div class="disease-edit__section-fields">'
sf_new = '<div class="disease-edit__section-fields disease-edit__section-fields--rates">'

open_old = '</span>' + nl + '              <div class="disease-edit__range" role="group"'
open_new = ('</span>' + nl
            + '              <div class="disease-edit__rate-body">' + nl
            + '              <div class="disease-edit__range" role="group"')

close_old = ('                </div>' + nl
             + '              </div>' + nl
             + '            </div>')
close_new = ('                </div>' + nl
             + '              </div>' + nl
             + '              </div>' + nl
             + '            </div>')

for sid in sections:
    start = html.index('<section id="' + sid + '"')
    end = html.index('</section>', start) + len('</section>')
    block = html[start:end]

    assert block.count(sf_old) == 1, (sid, "section-fields", block.count(sf_old))
    block = block.replace(sf_old, sf_new, 1)

    assert block.count(open_old) == 3, (sid, "open", block.count(open_old))
    block = block.replace(open_old, open_new)

    assert block.count(close_old) == 3, (sid, "close", block.count(close_old))
    block = block.replace(close_old, close_new)

    html = html[:start] + block + html[end:]

with open(path, "w", encoding="utf-8", newline="") as f:
    f.write(html)

print("OK")
