from PIL import Image
for f, (w, h) in [('home_bg1.jpeg',(2560,1600)),('home_bg2.jpeg',(2560,1600)),('home_bg3.jpeg',(2560,1600)),('home_bg4.jpeg',(2560,1600)),('home_bg1m.jpeg',(1400,2400)),('home_bg2m.jpeg',(1400,2400)),('home_bg3m.jpeg',(1400,2400)),('home_bg4m.jpeg',(1400,2400))]:
    img = Image.open(f); img.thumbnail((w,h), Image.LANCZOS)
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGB')
    img.save(f, 'JPEG', quality=95, optimize=True, progressive=True)