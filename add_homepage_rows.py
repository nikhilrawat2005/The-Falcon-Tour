#!/usr/bin/env python3

CARD = """  <a class="pkg-card reveal" href="packages/{slug}.html" style="display:block;color:inherit;" id="pkg-card-{cardid}">
    <div class="img-slot has-img"><img alt="{alt}" loading="lazy" src="assets/images/{img_dir}/{img}"/></div>
    <div class="pkg-days">{days}</div>
    <div class="pkg-region-tag">{flag} {region}</div>
    <div class="pkg-body">
      <span class="pkg-route">{route}</span>
      <h3>{title}</h3>
      <div class="pkg-highlights">
{hl}
      </div>
      <div class="pkg-footer">
        <div class="pkg-price">{price}<small>per person onwards</small></div>
        <span class="pkg-cta-link">View Itinerary →</span>
      </div>
    </div>
  </a>
"""

ROW = """<!-- {comment} Row -->
<h3 class="pkg-region-heading reveal">{heading}</h3>
<div class="carousel-row" id="{rowid}">
{cards}</div>
<div class="carousel-nav" style="margin-bottom:40px;">
  <button aria-label="Scroll left" onclick="document.getElementById('{rowid}').scrollBy({{left:-370,behavior:'smooth'}})">
    <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <button aria-label="Scroll right" onclick="document.getElementById('{rowid}').scrollBy({{left:370,behavior:'smooth'}})">
    <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
  </button>
</div>

"""

def hl(items):
    return "\n".join('        <div class="pkg-hl-item">' + i + '</div>' for i in items)

def make_row(comment, heading, rowid, img_dir, packages):
    cards = ""
    for p in packages:
        cards += CARD.format(
            slug=p['slug'], cardid=p['slug'].replace('package-', ''), alt=p['title'],
            img_dir=img_dir, img=p['img'], days=p['days'], flag=p['flag'], region=p['region'],
            route=p['route'], title=p['title'], hl=hl(p['hl']), price=p['price']
        )
    return ROW.format(comment=comment, heading=heading, rowid=rowid, cards=cards)

output = ""

output += make_row("Thailand", "Thailand Packages", "pkgRowThailand", "thailand", [
    dict(slug="package-thailand-essentials", title="Discover Thailand | Beaches, Temples & City Lights", img="1.jpg",
         days="5D / 4N", flag="\U0001F1F9\U0001F1ED", region="Thailand", route="Pattaya · Bangkok",
         hl=["Alcazar Cabaret Show","Coral Island Tour","Bangkok City & Temple Tour"], price="₹18,999"),
    dict(slug="package-classic-thailand", title="Classic Thailand | Pattaya, Bangkok & Island Adventures", img="2.jpg",
         days="6D / 5N", flag="\U0001F1F9\U0001F1ED", region="Thailand", route="Pattaya · Bangkok",
         hl=["Coral Island Tour","Chao Phraya Dinner Cruise","Safari World & Marine Park"], price="₹29,999"),
    dict(slug="package-thailand-phuket-krabi", title="Explore Southern Thailand | Phuket & Krabi", img="3.jpg",
         days="6D / 5N", flag="\U0001F1F9\U0001F1ED", region="Phuket & Krabi", route="Phuket · Krabi",
         hl=["Phi Phi Island Tour","Four Islands Tour","Ao Nang Beach Leisure"], price="₹24,999"),
    dict(slug="package-thailand-ultimate", title="Thailand Unveiled | Islands, Beaches & City Wonders", img="4.jpg",
         days="8D / 7N", flag="\U0001F1F9\U0001F1ED", region="Grand Tour", route="Phuket · Krabi · Bangkok",
         hl=["James Bond Island Tour","Four Islands Tour","Chao Phraya Dinner Cruise"], price="₹34,999"),
])

output += make_row("Vietnam", "Vietnam Packages", "pkgRowVietnam", "vietnam", [
    dict(slug="package-vietnam-essentials", title="Discover Vietnam | Hanoi & Halong Bay Escape", img="1.jpg",
         days="5D / 4N", flag="\U0001F1FB\U0001F1F3", region="Vietnam", route="Hanoi · Halong Bay",
         hl=["Overnight Halong Bay Cruise","Hanoi City Tour","Cave Visit & Kayaking"], price="₹32,999"),
    dict(slug="package-classic-vietnam", title="Classic Vietnam | Heritage, Beaches & Bay Cruises", img="2.jpg",
         days="6D / 5N", flag="\U0001F1FB\U0001F1F3", region="Vietnam", route="Hanoi · Halong Bay · Da Nang",
         hl=["Halong Bay Overnight Cruise","Ba Na Hills & Golden Bridge","Marble Mountains"], price="₹62,999"),
    dict(slug="package-vietnam-best", title="Vietnam Unveiled | From Heritage Streets to Coastal Wonders", img="3.jpg",
         days="7D / 6N", flag="\U0001F1FB\U0001F1F3", region="Best of Vietnam", route="Hanoi · Halong Bay · Da Nang",
         hl=["Hoi An Ancient Town","Ba Na Hills & Golden Bridge","Coconut Village Basket Boat"], price="₹57,999"),
    dict(slug="package-vietnam-ultimate", title="The Ultimate Vietnam | Culture, Coastlines & City Life", img="4.jpg",
         days="9D / 8N", flag="\U0001F1FB\U0001F1F3", region="Grand Tour", route="Hanoi · Da Nang · Ho Chi Minh City",
         hl=["Hoi An Ancient Town","Mekong Delta & Cu Chi Tunnels","Ba Na Hills & Golden Bridge"], price="₹89,999"),
])

output += make_row("Bali", "Bali Packages", "pkgRowBali", "bali", [
    dict(slug="package-bali-essentials", title="Discover Bali | Island of Gods", img="1.jpg",
         days="5D / 4N", flag="\U0001F1EE\U0001F1E9", region="Bali", route="Kuta",
         hl=["Kintamani Volcano Tour","Tanah Lot Temple Sunset","Uluwatu Temple & Kecak Dance"], price="₹29,999"),
    dict(slug="package-classic-bali", title="Classic Bali | Beaches, Temples & Rice Terraces", img="2.jpg",
         days="6D / 5N", flag="\U0001F1EE\U0001F1E9", region="Bali", route="Kuta · Ubud",
         hl=["Tegallalang Rice Terrace","Uluwatu Temple & Kecak Dance","Tanah Lot Temple"], price="₹42,999"),
    dict(slug="package-bali-unveiled", title="Bali Unveiled | Temples, Beaches & Island Adventures", img="3.jpg",
         days="7D / 6N", flag="\U0001F1EE\U0001F1E9", region="Best of Bali", route="Kuta · Ubud",
         hl=["West Nusa Penida Tour","Bali Swing","Tirta Empul Temple"], price="₹54,999"),
    dict(slug="package-bali-ultimate", title="The Ultimate Bali | Luxury, Culture & Island Bliss", img="4.jpg",
         days="8D / 7N", flag="\U0001F1EE\U0001F1E9", region="Bali Luxury", route="Seminyak · Ubud · Nusa Penida",
         hl=["Nusa Penida Island Tours","Bali Swing","Beach Club Experience"], price="₹82,999"),
])

output += make_row("Kerala", "Kerala Packages", "pkgRowKerala", "kerala", [
    dict(slug="package-kerala-escape", title="Kerala Escape | Munnar & Alleppey", img="1.jpg",
         days="4D / 3N", flag="\U0001F1EE\U0001F1F3", region="Kerala", route="Munnar · Alleppey",
         hl=["Tea Gardens of Munnar","Mattupetty Dam","Alleppey Backwaters"], price="₹18,999"),
    dict(slug="package-kerala-gods-own-country", title="God's Own Country | Munnar, Thekkady & Alleppey", img="2.jpg",
         days="5D / 4N", flag="\U0001F1EE\U0001F1F3", region="Kerala", route="Munnar · Thekkady · Alleppey",
         hl=["Periyar Wildlife Sanctuary","Spice Plantation Tour","Alleppey Backwaters"], price="₹24,999"),
    dict(slug="package-kerala-highlights", title="Kerala Highlights | Munnar, Thekkady, Alleppey & Kochi", img="3.jpg",
         days="6D / 5N", flag="\U0001F1EE\U0001F1F3", region="Kerala Highlights", route="Munnar · Thekkady · Alleppey · Kochi",
         hl=["Alleppey Houseboat Experience","Fort Kochi","Chinese Fishing Nets"], price="₹29,999"),
    dict(slug="package-kerala-complete-experience", title="Complete Kerala Experience | Munnar, Thekkady, Alleppey & Kovalam", img="4.jpg",
         days="7D / 6N", flag="\U0001F1EE\U0001F1F3", region="Complete Kerala", route="Munnar · Thekkady · Alleppey · Kovalam",
         hl=["Premium Houseboat Stay","Kovalam Beach","Thekkady Wildlife"], price="₹37,999"),
])

output += make_row("Ladakh", "Ladakh Packages", "pkgRowLadakh", "ladakh", [
    dict(slug="package-ladakh-getaway", title="Leh Getaway | Land of High Passes", img="1.jpg",
         days="4D / 3N", flag="\U0001F1EE\U0001F1F3", region="Ladakh", route="Leh",
         hl=["Shanti Stupa","Magnetic Hill","Sangam Point"], price="₹13,999"),
    dict(slug="package-ladakh-classic", title="Classic Ladakh Adventure", img="2.jpg",
         days="5D / 4N", flag="\U0001F1EE\U0001F1F3", region="Ladakh", route="Leh · Nubra Valley",
         hl=["Khardung La Pass","Nubra Valley","Hunder Sand Dunes"], price="₹28,999"),
    dict(slug="package-ladakh-lakes-valleys", title="Best of Ladakh | Lakes & Valleys", img="3.jpg",
         days="6D / 5N", flag="\U0001F1EE\U0001F1F3", region="Best of Ladakh", route="Leh · Nubra Valley · Pangong Lake",
         hl=["Khardung La Pass","Pangong Lake","Nubra Valley"], price="₹35,999"),
    dict(slug="package-ladakh-ultimate", title="Ultimate Ladakh Expedition", img="4.jpg",
         days="7D / 6N", flag="\U0001F1EE\U0001F1F3", region="Ladakh Expedition", route="Leh · Nubra Valley · Pangong Lake",
         hl=["Turtuk Village Excursion","Pangong Lake","Khardung La Pass"], price="₹38,999"),
])

output += make_row("Kashmir", "Kashmir Packages", "pkgRowKashmir", "kashmir", [
    dict(slug="package-kashmir-delight", title="Kashmir Delight | Srinagar Escape", img="1.jpg",
         days="4D / 3N", flag="\U0001F1EE\U0001F1F3", region="Kashmir", route="Srinagar · Houseboat",
         hl=["Dal Lake Shikara Ride","Mughal Gardens","Houseboat Stay"], price="₹14,999"),
    dict(slug="package-classic-kashmir", title="Classic Kashmir", img="2.jpg",
         days="5D / 4N", flag="\U0001F1EE\U0001F1F3", region="Kashmir", route="Srinagar · Gulmarg · Houseboat",
         hl=["Gulmarg Gondola","Strawberry Valley","Houseboat Experience"], price="₹18,999"),
    dict(slug="package-best-of-kashmir", title="Best of Kashmir", img="3.jpg",
         days="6D / 5N", flag="\U0001F1EE\U0001F1F3", region="Best of Kashmir", route="Srinagar · Gulmarg · Pahalgam",
         hl=["Betaab Valley","Aru Valley","Chandanwari"], price="₹23,999"),
    dict(slug="package-kashmir-complete-experience", title="Complete Kashmir Experience", img="4.jpg",
         days="7D / 6N", flag="\U0001F1EE\U0001F1F3", region="Complete Kashmir", route="Srinagar · Gulmarg · Pahalgam",
         hl=["Gulmarg Gondola Base Area","Betaab & Aru Valley","Overnight Houseboat Stay"], price="₹29,999"),
])

output += make_row("Bhutan", "Bhutan Packages", "pkgRowBhutan", "bhutan", [
    dict(slug="package-bhutan-serenity", title="Bhutan Serenity | Gateway to the Himalayas", img="1.jpg",
         days="4D / 3N", flag="\U0001F1E7\U0001F1F9", region="Bhutan", route="Phuentsholing · Thimphu",
         hl=["Buddha Dordenma Statue","Tashichho Dzong","Scenic Himalayan Drive"], price="₹21,999"),
    dict(slug="package-classic-bhutan", title="Classic Bhutan", img="2.jpg",
         days="5D / 4N", flag="\U0001F1E7\U0001F1F9", region="Bhutan", route="Phuentsholing · Thimphu · Paro",
         hl=["Dochula Pass","Paro Dzong","National Museum"], price="₹27,999"),
    dict(slug="package-best-of-bhutan", title="Best of Bhutan", img="3.jpg",
         days="6D / 5N", flag="\U0001F1E7\U0001F1F9", region="Best of Bhutan", route="Phuentsholing · Thimphu · Paro",
         hl=["Chele La Pass","Tiger's Nest Monastery Viewpoint","Paro Rinpung Dzong"], price="₹38,999"),
    dict(slug="package-bhutan-complete-experience", title="Complete Bhutan Experience", img="4.jpg",
         days="7D / 6N", flag="\U0001F1E7\U0001F1F9", region="Complete Bhutan", route="Phuentsholing · Thimphu · Punakha · Paro",
         hl=["Punakha Dzong & Suspension Bridge","Tiger's Nest Monastery Trek","Chele La Pass"], price="₹45,999"),
])

output += make_row("Almaty", "Almaty Packages", "pkgRowAlmaty", "almaty", [
    dict(slug="package-almaty-city-escape", title="Almaty City Escape", img="1.jpg",
         days="4D / 3N", flag="\U0001F1F0\U0001F1FF", region="Almaty", route="Almaty",
         hl=["Panfilov Park","Zenkov Cathedral","Kok Tobe Hill Cable Car"], price="₹25,999"),
    dict(slug="package-classic-almaty", title="Classic Almaty", img="2.jpg",
         days="5D / 4N", flag="\U0001F1F0\U0001F1FF", region="Almaty", route="Almaty",
         hl=["Medeu Ice Skating Rink","Shymbulak Ski Resort","Rakhat Chocolate Factory"], price="₹34,999"),
    dict(slug="package-best-of-almaty", title="Best of Almaty", img="3.jpg",
         days="6D / 5N", flag="\U0001F1F0\U0001F1FF", region="Best of Almaty", route="Almaty",
         hl=["Charyn Canyon","Kolsai Lake","Kaindy Lake (Optional)"], price="₹44,999"),
    dict(slug="package-almaty-complete-experience", title="Complete Almaty Experience", img="4.jpg",
         days="7D / 6N", flag="\U0001F1F0\U0001F1FF", region="Complete Almaty", route="Almaty",
         hl=["Charyn & Black Canyon","Kolsai Lake","Saty Village"], price="₹56,999"),
])

path = "index.html"
t = open(path, encoding="utf-8").read()
marker = '<!-- Sri Lanka Row -->'
assert marker in t, "marker not found"
t = t.replace(marker, output + marker, 1)
open(path, "w", encoding="utf-8").write(t)
print("index.html updated, new length:", len(t))
