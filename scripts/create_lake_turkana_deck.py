from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "lake-turkana"
OUTPUT = ROOT / "public" / "life-around-lake-turkana-photo-essay.pptx"
SLIDE_W, SLIDE_H = 12192000, 6858000
EMU = 914400


slides = [
    {
        "image": "Picture3.jpg", "kicker": "PHOTO ESSAY  /  NORTHERN KENYA",
        "title": "A Lake\nUnder Pressure",
        "body": "Water. Livelihoods. Cooperation.\n\nLife around Lake Turkana, told through the people who depend on it.",
        "caption": "A man draws water from a shallow well in a dry river bed.", "cover": True,
    },
    {
        "image": "Picture2.jpg", "kicker": "01  /  THE SETTING",
        "title": "A desert lake.\nMany ways of life.",
        "body": "In arid northern Kenya, families, pastoralists and fishing communities rely on a small number of wells and rivers. When these water sources weaken, the lake becomes even more central to daily life.",
        "caption": "A family homestead in the Lake Turkana region.",
    },
    {
        "image": "Picture1.jpg", "kicker": "02  /  A SHARED RESOURCE",
        "title": "“Water is the number one\nnatural resource.”",
        "body": "Narogoe Ebenyo Maisa\nPastoralist and chair, Kibish Water Resource User Association\n\nThe water table has fallen as rainfall has declined, making reliable water harder to find.",
        "caption": "Narogoe Ebenyo Maisa speaks about water access in Kibish.", "quote": True,
    },
    {
        "image": "Picture9.jpg", "kicker": "03  /  THE DAILY JOURNEY",
        "title": "When a river bed\nruns dry",
        "body": "A shallow well can become the difference between getting through the day and going without. Water collection is part of the rhythm of home, work and caring for livestock.",
        "caption": "A resident fetches water from a shallow well in a dry river bed.",
    },
    {
        "image": "Inline-Image-3-Kenya-Story-3.jpg", "kicker": "04  /  WORK ON THE WATER",
        "title": "Fishing takes skill,\npatience and teamwork.",
        "body": "Along the shore, fishing supports local food and livelihoods. Preparing nets and going out together are part of the daily work of communities around the lake.",
        "caption": "Fishermen prepare nets at Impresa beach, Kalokol.",
    },
    {
        "image": "Picture6.jpg", "kicker": "05  /  FROM CATCH TO MARKET",
        "title": "The lake’s value\ntravels beyond shore.",
        "body": "Fish drying in the sun is a visible link between the lake and household livelihoods. The work continues after the boats return, as the catch is prepared and preserved.",
        "caption": "Fish dry at Impresa beach in Kalokol town.",
    },
    {
        "image": "Picture8.jpg", "kicker": "06  /  PRESSURE ON LAND AND WATER",
        "title": "Scarcity is shared\nby people and livestock.",
        "body": "Drought and unreliable water sources can push families to move and bring different needs together at the same wells and shorelines. Where access is tight, competition can turn into conflict.",
        "caption": "Goats search for pasture in the dry landscape.",
    },
    {
        "image": "Picture12.jpg", "kicker": "07  /  MAKING SPACE FOR DIALOGUE",
        "title": "Shared resources\nneed shared decisions.",
        "body": "Water user groups, community leaders and local partners create ways to discuss access and manage pressure. Listening locally helps decisions reflect the people who live with the consequences.",
        "caption": "A community meeting with local partners in the Lake Turkana area.",
    },
    {
        "image": "Picture13.jpg", "kicker": "08  /  COOPERATION IN PRACTICE",
        "title": "Dialogue can change\nwhat happens next.",
        "body": "“The WPS project is engaging the community … to forge peaceful coexistence.”\n\nCharles Losike\nPlumber and vice chair, Kibish Water Association",
        "caption": "Charles Losike, Kibish Water Association.", "quote": True,
    },
    {
        "image": "Picture11.jpg", "kicker": "A WAY FORWARD",
        "title": "Protect the water.\nStrengthen the ties.",
        "body": "Listen to the people closest to the water.\nSupport fair, dependable access.\nKeep dialogue open across communities.\n\nResilience grows when shared resources are managed together.",
        "caption": "Residents transport supplies in Kalokol.",
    },
    {
        "image": "Picture10.jpg", "kicker": "PHOTO CREDITS  /  SOURCES",
        "title": "The story behind\nthe photographs.",
        "body": "Photo essay: International Alert, “Water is the number one natural resource”: Lake Turkana photo essay (January 2023).\n\nPhotographs: Martin Mwangi / International Alert. Captions and community quotations are credited to the original story.\n\nSource: international-alert.org/stories/water-is-the-number-one-natural-resource-lake-turkana-photo-essay/\n\nPrepared by Simon Wamugunda Waweru",
        "caption": "Community dialogue is part of managing shared water resources.", "source": True,
    },
]


def emu(inches):
    return round(inches * EMU)


def rect_shape(shape_id, name, x, y, w, h, color, alpha=None):
    alpha_xml = f'<a:alpha val="{alpha}"/>' if alpha is not None else ""
    return (
        f'<p:sp><p:nvSpPr><p:cNvPr id="{shape_id}" name="{name}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'
        f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>'
        f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="{color}">{alpha_xml}</a:srgbClr></a:solidFill>'
        f'<a:ln><a:noFill/></a:ln></p:spPr></p:sp>'
    )


def text_shape(shape_id, name, text, x, y, w, h, size, color="F5F3EC", bold=False, font="Aptos", valign="t"):
    paragraphs = []
    for line in text.split("\n"):
        value = escape(line)
        paragraphs.append(
            '<a:p><a:pPr algn="l" marL="0" indent="0"/><a:r>'
            f'<a:rPr lang="en-US" sz="{size}" b="{1 if bold else 0}" dirty="0">'
            f'<a:solidFill><a:srgbClr val="{color}"/></a:solidFill><a:latin typeface="{font}"/></a:rPr>'
            f'<a:t xml:space="preserve">{value}</a:t></a:r><a:endParaRPr lang="en-US" sz="{size}"/></a:p>'
        )
    return (
        f'<p:sp><p:nvSpPr><p:cNvPr id="{shape_id}" name="{name}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>'
        f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>'
        '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr>'
        f'<p:txBody><a:bodyPr wrap="square" anchor="{valign}"><a:noAutofit/></a:bodyPr><a:lstStyle/>{"".join(paragraphs)}</p:txBody></p:sp>'
    )


def picture(shape_id, filename):
    return (
        f'<p:pic><p:nvPicPr><p:cNvPr id="{shape_id}" name="Photo {shape_id}" descr="Photo essay photograph"/>'
        '<p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>'
        '<p:blipFill><a:blip r:embed="rId2"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>'
        f'<p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{SLIDE_W}" cy="{SLIDE_H}"/></a:xfrm>'
        '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>'
    )


def slide_xml(index, slide):
    parts = [picture(2, slide["image"])]
    parts.append(rect_shape(3, "Photo wash", 0, 0, 13.333, 7.5, "081B1E", 23000))
    parts.append(rect_shape(4, "Reading panel", 0, 0, 8.0, 7.5, "071719", 71000))
    parts.append(rect_shape(5, "Amber rule", 0.55, 0.55, 0.055, 6.25, "D7A65A"))
    cover = slide.get("cover", False)
    source = slide.get("source", False)
    kicker_size = 1250 if not source else 1100
    parts.append(text_shape(6, "Section label", slide["kicker"], 0.88, 0.57, 6.45, 0.38, kicker_size, "E5B866", True, "Aptos"))
    title_size = 4400 if cover else (3000 if source else (3250 if slide.get("quote") else 3800))
    title_h = 2.0 if cover else 1.75
    title_y = 1.28 if cover else 1.22
    parts.append(text_shape(7, "Slide title", slide["title"], 0.88, title_y, 6.45, title_h, title_size, "FBF8F0", True, "Aptos Display"))
    body_y = 3.72 if not cover else 4.1
    body_h = 2.35 if not source else 2.58
    body_size = 2100 if cover else (1450 if source else (1900 if slide.get("quote") else 1950))
    parts.append(text_shape(8, "Slide text", slide["body"], 0.92, body_y, 6.2, body_h, body_size, "F2F0E8", False, "Aptos"))
    parts.append(rect_shape(9, "Caption rule", 0.9, 6.4, 0.36, 0.025, "D7A65A"))
    parts.append(text_shape(10, "Photograph caption", slide["caption"], 0.9, 6.48, 6.2, 0.3, 950, "E0DED5", False, "Aptos"))
    parts.append(text_shape(11, "Photo credit", "PHOTO: MARTIN MWANGI / INTERNATIONAL ALERT", 0.9, 6.88, 5.5, 0.22, 750, "B7B6AF", False, "Aptos"))
    parts.append(text_shape(12, "Slide number", f"{index:02d}  /  {len(slides):02d}", 11.76, 6.88, 0.9, 0.22, 850, "F3EDE0", True, "Aptos"))
    tree = (
        '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>'
        '<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>'
        + "".join(parts)
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
        'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">'
        f'<p:cSld name="Slide {index}"><p:spTree>{tree}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>'
    )


def content_types():
    overrides = [
        '<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>',
        '<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>',
        '<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>',
        '<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>',
    ]
    overrides += [f'<Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>' for i in range(1, len(slides) + 1)]
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpg" ContentType="image/jpeg"/>' + ''.join(overrides) + '</Types>'


def write_deck():
    with ZipFile(OUTPUT, "w", ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types())
        z.writestr("_rels/.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>')
        z.writestr("ppt/presentation.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>' + ''.join(f'<p:sldId id="{255+i}" r:id="rId{i+1}"/>' for i in range(1, len(slides) + 1)) + f'</p:sldIdLst><p:sldSz cx="{SLIDE_W}" cy="{SLIDE_H}" type="wide"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>')
        pres_rels = ['<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>']
        pres_rels += [f'<Relationship Id="rId{i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{i}.xml"/>' for i in range(1, len(slides) + 1)]
        z.writestr("ppt/_rels/presentation.xml.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + ''.join(pres_rels) + '</Relationships>')
        z.writestr("ppt/slideMasters/slideMaster1.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="1" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>')
        z.writestr("ppt/slideMasters/_rels/slideMaster1.xml.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>')
        z.writestr("ppt/slideLayouts/slideLayout1.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>')
        z.writestr("ppt/slideLayouts/_rels/slideLayout1.xml.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>')
        z.writestr("ppt/theme/theme1.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Lake Turkana"><a:themeElements><a:clrScheme name="Lake"><a:dk1><a:srgbClr val="071719"/></a:dk1><a:lt1><a:srgbClr val="F5F3EC"/></a:lt1><a:dk2><a:srgbClr val="1E2929"/></a:dk2><a:lt2><a:srgbClr val="E7E1D3"/></a:lt2><a:accent1><a:srgbClr val="D7A65A"/></a:accent1><a:accent2><a:srgbClr val="597B79"/></a:accent2><a:accent3><a:srgbClr val="8E7960"/></a:accent3><a:accent4><a:srgbClr val="B8C8C0"/></a:accent4><a:accent5><a:srgbClr val="A45D48"/></a:accent5><a:accent6><a:srgbClr val="748C9B"/></a:accent6><a:hlink><a:srgbClr val="88B7AD"/></a:hlink><a:folHlink><a:srgbClr val="BD9B74"/></a:folHlink></a:clrScheme><a:fontScheme name="Aptos"><a:majorFont><a:latin typeface="Aptos Display"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Aptos"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme><a:fmtScheme name="Clean"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>')
        for i, slide in enumerate(slides, 1):
            z.writestr(f"ppt/slides/slide{i}.xml", slide_xml(i, slide))
            rels = (
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>'
                f'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image{i}.jpg"/>'
                '</Relationships>'
            )
            z.writestr(f"ppt/slides/_rels/slide{i}.xml.rels", rels)
            z.write(ASSETS / slide["image"], f"ppt/media/image{i}.jpg")


if __name__ == "__main__":
    write_deck()
    print(OUTPUT)
