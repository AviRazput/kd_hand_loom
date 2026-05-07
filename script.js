const BRAND = {
  name: "KD Handloom Store Motihari",
  instagram: "kd_handloom_stores",
  // TODO: replace with your real WhatsApp number including country code (no +, no spaces)
  whatsappNumber: "91XXXXXXXXXX",
};

const CATEGORIES = [
  { title: "Saree Collection", desc: "Daily wear to festive picks", tag: "Saree" },
  { title: "Men’s Wear", desc: "Half pants, basics, and more", tag: "Men" },
  { title: "Innerwear", desc: "Comfort-focused essentials", tag: "Innerwear" },
  { title: "Gamcha", desc: "Classic everyday gamcha", tag: "Gamcha" },
  { title: "Kurti", desc: "New designs & colors", tag: "Kurti" },
  { title: "Readymade Collection", desc: "Budget friendly ready-to-wear", tag: "Readymade" },
];

const PRODUCTS = [
  { title: "Cotton Saree", meta: "Best seller", group: "best" },
  { title: "Printed Kurti", meta: "Trending", group: "trending" },
  { title: "Gamcha (Premium)", meta: "Offer item", group: "offers" },
  { title: "Lungi (Cotton)", meta: "Trending", group: "trending" },
  { title: "Innerwear Pack", meta: "Best seller", group: "best" },
  { title: "Half Pants", meta: "Offer item", group: "offers" },
  { title: "Readymade Shirt", meta: "Best seller", group: "best" },
  { title: "Store Reel Pick", meta: "See reels", group: "reels" },
];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "className") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, String(v));
  }
  for (const child of children) {
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

function waLink(text) {
  const msg = encodeURIComponent(text);
  return `https://wa.me/${BRAND.whatsappNumber}?text=${msg}`;
}

function mountCategories() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  for (const c of CATEGORIES) {
    const card = el("a", { className: "card", href: "#contact", "data-category": c.tag });
    card.append(
      el("div", { className: "card-title" }, [c.title]),
      el("p", { className: "card-desc" }, [c.desc]),
      el("span", { className: "card-chip" }, ["Wholesale + Retail"])
    );
    grid.append(card);
  }
}

function mountProducts(filter = "trending") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const list = PRODUCTS.filter((p) => p.group === filter);
  for (const p of list) {
    const card = el("div", { className: "product" });
    const message = `${BRAND.name}\nProduct: ${p.title}\nNeed: Price + availability\nType: Wholesale/Retail`;

    card.append(
      el("div", { className: "thumb", "aria-hidden": "true" }),
      el("div", { className: "product-title" }, [p.title]),
      el("div", { className: "product-meta" }, [p.meta]),
      el("div", { className: "product-actions" }, [
        el("a", { className: "btn btn-outline", href: "#contact" }, ["Inquiry"]),
        el("a", { className: "btn btn-primary", href: waLink(message), target: "_blank", rel: "noreferrer" }, [
          "WhatsApp",
        ]),
      ])
    );
    grid.append(card);
  }
}

function initFeaturedFilters() {
  const chips = Array.from(document.querySelectorAll("[data-filter]"));
  if (chips.length === 0) return;

  const setActive = (btn) => {
    chips.forEach((c) => c.classList.toggle("is-active", c === btn));
    const filter = btn.getAttribute("data-filter") || "trending";
    mountProducts(filter);
  };

  chips.forEach((btn) => btn.addEventListener("click", () => setActive(btn)));
  setActive(chips[0]);
}

function initWhatsApp() {
  const heroBtn = document.getElementById("whatsAppHero");
  const contactBtn = document.getElementById("whatsAppContact");
  const fab = document.getElementById("fabWhatsApp");

  const baseMessage =
    "Hello KD Handloom Store Motihari!\nI want to order/inquire.\nCategory: \nQuantity: \nBudget: \nDelivery/Pickup: ";

  const link = waLink(baseMessage);
  if (heroBtn) heroBtn.setAttribute("href", link);
  if (contactBtn) contactBtn.setAttribute("href", link);
  if (fab)
    fab.addEventListener("click", () => {
      window.open(link, "_blank", "noreferrer");
    });
}

function initInquiryForm() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const category = String(fd.get("category") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const text =
      `Hello ${BRAND.name}!\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Category: ${category}\n` +
      `Message: ${message || "-"}\n` +
      `Need: Price + availability\n` +
      `Type: Wholesale/Retail`;

    window.open(waLink(text), "_blank", "noreferrer");
  });
}

function initMobileMenu() {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  if (!btn || !nav) return;

  const close = () => {
    nav.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  };
  const open = () => {
    nav.hidden = false;
    btn.setAttribute("aria-expanded", "true");
  };

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) close();
    else open();
  });

  document.addEventListener("click", (e) => {
    if (nav.hidden) return;
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.matches("[data-close-menu]")) close();
    if (!nav.contains(t) && !btn.contains(t)) close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

mountCategories();
initFeaturedFilters();
initWhatsApp();
initInquiryForm();
initMobileMenu();

