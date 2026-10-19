import React, { useEffect, useMemo, useState } from 'react';
import {
  Search, ShoppingBag, UserRound, Menu, X, Heart, ArrowRight,
  SlidersHorizontal, Plus, Minus, Trash2, Pencil, PackagePlus,
  Instagram, ChevronDown, Sparkles, Truck, ShieldCheck, RotateCcw
} from 'lucide-react';

const starterProducts = [
  { id: 1, name: 'Pearl Bloom Studs', category: 'Studs', price: 499, oldPrice: 699, rating: 4.8, tag: 'Bestseller', description: 'A little floral sparkle for every day.', material: 'Gold-plated alloy', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Golden Jhumkas', category: 'Jhumkas', price: 899, oldPrice: 1099, rating: 4.9, tag: 'Loved', description: 'Traditional charm with a modern golden finish.', material: 'Gold-plated alloy', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Everyday Gold Hoops', category: 'Hoops', price: 699, oldPrice: 899, rating: 4.7, tag: 'Everyday', description: 'Your new go-to hoops, made to go everywhere.', material: 'Stainless steel', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Sky Teardrop Earrings', category: 'Drops', price: 1299, oldPrice: 1599, rating: 4.8, tag: 'New', description: 'A graceful drop with a soft pop of colour.', material: 'Gold-plated alloy', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Classic Pearl Drops', category: 'Drops', price: 799, oldPrice: 999, rating: 4.6, tag: '', description: 'Timeless pearls for brunches, evenings and more.', material: 'Imitation pearl', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Mini Star Studs', category: 'Studs', price: 399, oldPrice: 499, rating: 4.5, tag: 'Under ₹500', description: 'Tiny stars, endless compliments.', material: 'Silver-tone alloy', image: 'https://images.unsplash.com/photo-1635767798638-3665a7b1b1f6?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Antique Charm Jhumki', category: 'Jhumkas', price: 999, oldPrice: 1299, rating: 4.9, tag: '', description: 'A statement pair inspired by classic Indian craft.', material: 'Antique-finish alloy', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Sculpted Oval Hoops', category: 'Hoops', price: 749, oldPrice: 949, rating: 4.7, tag: '', description: 'Sculptural, lightweight hoops with a polished finish.', material: 'Stainless steel', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85' }
];

const money = n => `₹${Number(n).toLocaleString('en-IN')}`;
const readStore = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};

function Header({ cartCount, onCart, onAdmin, onShop, search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <div className="header-inner">
      <button className="icon-btn mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21}/></button>
      <a className="brand" href="#home" onClick={onShop}><span className="brand-mark">✳</span><span><strong>BhagyaSwapn Jewels</strong><small>परंपरेचा साज • सौंदर्याचा ठसा</small></span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
        <a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a>
        <a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <div className="header-actions">
        <label className="header-search"><Search size={17}/><input value={search} onChange={e => { setSearch(e.target.value); onShop(); }} placeholder="Search earrings" aria-label="Search earrings"/></label>
        <button className="icon-btn admin-shortcut" title="Manage products" onClick={onAdmin}><UserRound size={19}/></button>
        <button className="icon-btn cart-icon" aria-label="Open shopping bag" onClick={onCart}><ShoppingBag size={20}/><span className="cart-count">{cartCount}</span></button>
      </div>
    </div>
  </header>;
}

function ProductCard({ product, onAdd, onQuickView }) {
  const [liked, setLiked] = useState(false);
  return <article className="product-card">
    <div className="product-image-wrap" onClick={() => onQuickView(product)} role="button" tabIndex="0" onKeyDown={e => e.key === 'Enter' && onQuickView(product)}>
      <img src={product.image} alt={product.name} loading="lazy" onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85'; }}/>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <button className={liked ? 'like-btn liked' : 'like-btn'} aria-label="Add to wishlist" onClick={e => { e.stopPropagation(); setLiked(!liked); }}><Heart size={17} fill={liked ? 'currentColor' : 'none'}/></button>
      <button className="quick-view" onClick={e => { e.stopPropagation(); onQuickView(product); }}>Quick view</button>
    </div>
    <div className="product-info">
      <div className="product-title-row"><h3>{product.name}</h3><span className="rating">★ {product.rating || '4.8'}</span></div>
      <p className="product-category">{product.category}</p>
      <div className="price-row"><strong>{money(product.price)}</strong>{product.oldPrice > product.price && <del>{money(product.oldPrice)}</del>}</div>
      <button className="add-btn" onClick={() => onAdd(product)}><Plus size={15}/> Add to bag</button>
    </div>
  </article>;
}

function CartDrawer({ open, onClose, cart, products, setCart }) {
  const cartProducts = cart.map(item => ({ ...item, product: products.find(p => p.id === item.id) })).filter(item => item.product);
  const subtotal = cartProducts.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const changeQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  return <>
    {open && <button className="scrim" aria-label="Close cart" onClick={onClose}/>}
    <aside className={open ? 'cart-drawer drawer-open' : 'cart-drawer'} aria-label="Shopping bag">
      <div className="drawer-heading"><div><span className="eyebrow">YOUR LITTLE TREASURES</span><h2>Your Bag <span>({cartProducts.reduce((n, i) => n + i.qty, 0)})</span></h2></div><button className="icon-btn" onClick={onClose}><X/></button></div>
      {cartProducts.length === 0 ? <div className="empty-cart"><ShoppingBag size={38}/><h3>Your bag is waiting to sparkle</h3><p>Add something lovely to get started.</p><button className="primary-btn" onClick={onClose}>पाहा earrings <ArrowRight size={16}/></button></div> :
        <><div className="cart-items">{cartProducts.map(({product, qty}) => <div className="cart-item" key={product.id}>
          <img src={product.image} alt={product.name}/><div className="cart-item-info"><h4>{product.name}</h4><strong>{money(product.price)}</strong><div className="qty-control"><button onClick={() => changeQty(product.id, -1)}><Minus size={13}/></button><span>{qty}</span><button onClick={() => changeQty(product.id, 1)}><Plus size={13}/></button></div></div>
          <button className="remove-btn" aria-label="Remove item" onClick={() => setCart(prev => prev.filter(i => i.id !== product.id))}><Trash2 size={16}/></button>
        </div>)}</div>
        <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="primary-btn full-width" onClick={() => alert('Thanks for your interest! Checkout is a demo. Connect a payment provider to accept real orders.')}>Continue to checkout <ArrowRight size={16}/></button><button className="text-btn full-width" onClick={onClose}>Continue shopping</button></div></>}
      <div className="cart-perks"><span><Truck size={17}/> Easy delivery</span><span><ShieldCheck size={17}/> Secure shopping</span></div>
    </aside>
  </>;
}

function AdminPanel({ products, setProducts, onClose }) {
  const blank = { name: '', category: 'Studs', price: '', oldPrice: '', rating: '4.8', tag: 'New', description: '', material: 'Gold-plated alloy', image: '' };
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const save = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.image.trim()) { setMessage('Please fill in product name, price, and image URL.'); return; }
    const item = { ...form, id: editing ?? Date.now(), price: Number(form.price), oldPrice: Number(form.oldPrice || form.price), rating: Number(form.rating || 4.8) };
    setProducts(prev => editing ? prev.map(p => p.id === editing ? item : p) : [item, ...prev]);
    setForm(blank); setEditing(null); setMessage('Product saved in this browser.');
  };
  const edit = p => { setEditing(p.id); setForm({...p, price: String(p.price), oldPrice: String(p.oldPrice || '')}); setMessage(''); window.scrollTo({top:0, behavior:'smooth'}); };
  const remove = id => { if (window.confirm('Delete this product?')) setProducts(prev => prev.filter(p => p.id !== id)); };
  return <div className="admin-page">
    <div className="admin-top"><div><span className="eyebrow">STORE MANAGEMENT</span><h1>दागिने व्यवस्थापन</h1><p>नवीन दागिना जोडा, माहिती बदला किंवा संग्रहातून दागिना काढा.</p></div><button className="secondary-btn" onClick={onClose}><X size={16}/> Back to store</button></div>
    <div className="admin-grid">
      <form className="admin-form" onSubmit={save}>
        <div className="form-heading"><PackagePlus size={20}/><h2>{editing ? 'Edit earring' : 'नवीन दागिना जोडा'}</h2></div>
        <label>Product name<input value={form.name} onChange={e => update('name',e.target.value)} placeholder="e.g. Pearl Bloom Studs" required/></label>
        <div className="form-two"><label>Category<select value={form.category} onChange={e => update('category',e.target.value)}>{['Studs','Jhumkas','Hoops','Drops','Cuffs','Sets'].map(c => <option key={c}>{c}</option>)}</select></label><label>Tag<input value={form.tag} onChange={e => update('tag',e.target.value)} placeholder="New / Bestseller"/></label></div>
        <div className="form-two"><label>Price (₹)<input type="number" min="0" value={form.price} onChange={e => update('price',e.target.value)} placeholder="499" required/></label><label>Original price (₹)<input type="number" min="0" value={form.oldPrice} onChange={e => update('oldPrice',e.target.value)} placeholder="699"/></label></div>
        <label>Product image URL<input type="url" value={form.image} onChange={e => update('image',e.target.value)} placeholder="https://..." required/></label>
        <label>Short description<textarea rows="2" value={form.description} onChange={e => update('description',e.target.value)} placeholder="What makes this pair special?"/></label>
        <label>Material<input value={form.material} onChange={e => update('material',e.target.value)} placeholder="Gold-plated alloy"/></label>
        {message && <p className="form-message">{message}</p>}
        <div className="form-actions"><button className="primary-btn" type="submit">{editing ? 'Save changes' : 'Add product'} <ArrowRight size={16}/></button>{editing && <button type="button" className="secondary-btn" onClick={() => {setForm(blank);setEditing(null);setMessage('');}}>Cancel edit</button>}</div>
        <p className="admin-note">Demo note: changes are stored in this browser only. Use a database and secure admin login for a live multi-customer store.</p>
      </form>
      <section className="inventory-panel"><div className="inventory-heading"><div><h2>तुमचा दागिन्यांचा संग्रह</h2><p>{products.length} products in the catalogue</p></div></div>
        <div className="inventory-list">{products.map(p => <div className="inventory-item" key={p.id}><img src={p.image} alt={p.name}/><div className="inventory-copy"><strong>{p.name}</strong><span>{p.category} · {money(p.price)}</span></div><button className="icon-btn" aria-label="Edit product" onClick={() => edit(p)}><Pencil size={16}/></button><button className="icon-btn danger-icon" aria-label="Delete product" onClick={() => remove(p.id)}><Trash2 size={16}/></button></div>)}</div>
      </section>
    </div>
  </div>;
}

function QuickView({ product, onClose, onAdd }) {
  if (!product) return null;
  return <div className="modal-backdrop" onClick={onClose}><div className="quick-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-btn" onClick={onClose}><X/></button><img src={product.image} alt={product.name}/><div className="quick-modal-copy"><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><div className="price-row"><strong>{money(product.price)}</strong>{product.oldPrice > product.price && <del>{money(product.oldPrice)}</del>}</div><p>{product.description || 'A beautiful finishing touch for your everyday style.'}</p><p className="material-line">Material: {product.material || 'Gold-plated alloy'}</p><button className="primary-btn full-width" onClick={() => {onAdd(product);onClose();}}>Add to bag <ShoppingBag size={16}/></button></div></div></div>;
}

export default function App() {
  const [products, setProducts] = useState(() => readStore('bhagyaSwapn_products', starterProducts));
  const [cart, setCart] = useState(() => readStore('bhagyaSwapn_cart', []));
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [quickProduct, setQuickProduct] = useState(null);
  const [notice, setNotice] = useState('');
  useEffect(() => localStorage.setItem('bhagyaSwapn_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('bhagyaSwapn_cart', JSON.stringify(cart)), [cart]);
  const categories = ['All','Studs','Jhumkas','Hoops','Drops'];
  const visibleProducts = useMemo(() => {
    let list = products.filter(p => (category === 'All' || p.category === category) && `${p.name} ${p.category} ${p.description || ''}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-low') list.sort((a,b) => a.price-b.price);
    if (sort === 'price-high') list.sort((a,b) => b.price-a.price);
    if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [products, category, search, sort]);
  const addToCart = product => {
    setCart(prev => prev.some(i => i.id === product.id) ? prev.map(i => i.id === product.id ? {...i, qty:i.qty+1} : i) : [...prev, {id:product.id, qty:1}]);
    setNotice(`${product.name} added to your bag`); setTimeout(() => setNotice(''), 2400);
  };
  const goShop = () => { setAdminOpen(false); setTimeout(() => document.getElementById('shop')?.scrollIntoView({behavior:'smooth'}), 20); };
  const cartCount = cart.reduce((n,i) => n+i.qty, 0);
  return <div className="app-shell">
    <div className="announcement"><Sparkles size={13}/> महाराष्ट्रीयन परंपरेचा सुंदर साज <span>•</span> Free shipping on orders over ₹999</div>
    <Header cartCount={cartCount} onCart={() => setCartOpen(true)} onAdmin={() => {setAdminOpen(true);window.scrollTo({top:0,behavior:'smooth'});}} onShop={goShop} search={search} setSearch={setSearch}/>
    {adminOpen ? <AdminPanel products={products} setProducts={setProducts} onClose={goShop}/> : <>
      <main>
        <section className="hero" id="home">
          <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-line"/> महाराष्ट्रीयन परंपरेतून प्रेरित</span><h1>परंपरेचा साज.<br/><em>तुमच्या प्रत्येक क्षणासाठी.</em></h1><p>नथ, ठुशी, कोल्हापुरी साज आणि पारंपरिक दागिन्यांच्या सौंदर्यातून साकारलेली खास निवड.</p><button className="primary-btn" onClick={goShop}>संग्रह पाहा <ArrowRight size={17}/></button><div className="hero-proof"><div className="avatar-stack"><span>✦</span><span>✧</span><span>✺</span></div><div><strong>परंपरेवर प्रेम करणाऱ्यांसाठी</strong><small>महाराष्ट्रीयन संस्कृतीचा सुंदर वारसा</small></div></div></div>
          <div className="hero-visual"><img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=90" alt="Elegant golden earrings styled for a special occasion"/><div className="hero-sticker"><span>THE LITTLE</span><strong>GOLDEN<br/>THINGS</strong><span>YOU'LL LOVE ✦</span></div><div className="hero-image-caption">THE EVERYDAY EDIT <span>01 / 04</span></div></div>
        </section>
        <section className="category-section section-wrap">
          <div className="section-heading"><div><span className="eyebrow">तुमच्या आवडीचा पारंपरिक साज</span><h2>पारंपरिक <em>दागिने</em></h2></div><a href="#shop" className="under-link">सर्व प्रकार पाहा <ArrowRight size={15}/></a></div>
          <div className="category-grid">
            {[
              {name:'Studs',sub:'नाजूक आणि सुंदर',img:'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=85'},
              {name:'Jhumkas',sub:'परंपरेचा खास साज',img:'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=85'},
              {name:'Hoops',sub:'प्रत्येक दिवसासाठी',img:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=85'},
              {name:'Drops',sub:'प्रत्येक क्षण खास',img:'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=700&q=85'}
            ].map(c => <button className="category-card" key={c.name} onClick={() => {setCategory(c.name);goShop();}}><div className="category-img"><img src={c.img} alt={c.name} loading="lazy"/><span><ArrowRight size={18}/></span></div><strong>{c.name}</strong><small>{c.sub}</small></button>)}
          </div>
        </section>
        <section className="shop-section section-wrap" id="shop">
          <div className="section-heading shop-heading"><div><span className="eyebrow">तुमच्या आवडीचा खास दागिना</span><h2>महाराष्ट्रीयन <em>दागिन्यांचा संग्रह</em></h2><p>सण, समारंभ आणि रोजच्या वापरासाठी निवडक दागिने.</p></div><div className="sort-control"><SlidersHorizontal size={16}/><label htmlFor="sort">Sort by</label><select id="sort" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name A–Z</option></select><ChevronDown size={14}/></div></div>
          <div className="filter-row">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={category === c ? 'filter-chip active' : 'filter-chip'}>{c}</button>)}<span className="results-count">{visibleProducts.length} styles</span></div>
          {visibleProducts.length ? <div className="product-grid">{visibleProducts.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} onQuickView={setQuickProduct}/>)}</div> : <div className="no-results"><Search size={30}/><h3>No earrings found</h3><p>Try another search or category.</p><button className="secondary-btn" onClick={() => {setSearch('');setCategory('All');}}>Clear filters</button></div>}
          <div className="center-action"><button className="secondary-btn" onClick={() => {setCategory('All');setSearch('');}}>पाहा all earrings <ArrowRight size={16}/></button></div>
        </section>
        <section className="story-banner section-wrap" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85" alt="Delicate jewellery detail" loading="lazy"/><div className="story-image-label">DETAILS THAT FEEL LIKE YOU</div></div><div className="story-copy"><span className="eyebrow">यांच्याकडून खास EARORA</span><h2>परंपरेतील सौंदर्य <em>मनात कायम.</em></h2><p>महाराष्ट्राच्या समृद्ध संस्कृतीतून प्रेरणा घेऊन, प्रत्येक सण-समारंभासाठी आणि खास क्षणांसाठी दागिन्यांची निवड. पारंपरिक नक्षीकाम, सोनसळी छटा आणि मराठमोळा साज — तुमच्या सौंदर्यात भर घालण्यासाठी.</p><a href="#shop" className="under-link">तुमचा आवडता साज निवडा <ArrowRight size={15}/></a><div className="story-signature">आपुलकीने, <span>भाग्यस्वप्न ज्वेल्स ✦</span></div></div></section>
        <section className="promise-strip"><div><Truck/><strong>A little something extra</strong><span>Free shipping over ₹999</span></div><div><ShieldCheck/><strong>Shop with confidence</strong><span>Secure shopping experience</span></div><div><RotateCcw/><strong>Easy returns</strong><span>Simple and hassle-free</span></div><div><Heart/><strong>Picked with love</strong><span>Styles for your every day</span></div></section>
        <section className="newsletter"><span className="eyebrow">आमच्याकडून एक खास संदेश</span><h2>नवीन संग्रहाची माहिती <em>सर्वात आधी मिळवा.</em></h2><p>नवीन दागिने, सणासुदीच्या कल्पना आणि खास ऑफर्स थेट तुमच्या ईमेलवर.</p><form onSubmit={e => {e.preventDefault();alert('Thank you for subscribing! Connect an email marketing service to save subscribers.');}}><input type="email" required placeholder="Your email address" aria-label="Your email address"/><button className="primary-btn" type="submit">मला माहिती पाठवा <ArrowRight size={15}/></button></form><small>By subscribing, you agree to receive occasional emails from BhagyaSwapn Jewels.</small></section>
      </main>
      <footer id="footer" className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="brand brand-light" href="#home"><span className="brand-mark">✳</span><span><strong>BhagyaSwapn Jewels</strong><small>परंपरेचा साज • सौंदर्याचा ठसा</small></span></a><p>मराठमोळ्या सौंदर्याला साजेसे दागिने.</p><div className="socials"><a href="#footer" aria-label="Instagram"><Instagram size={17}/></a><a href="#footer" aria-label="Social link">f</a><a href="#footer" aria-label="Social link">p</a></div></div><div className="footer-links"><strong>पाहा</strong><a href="#shop">सर्व दागिने</a><a href="#shop">नवीन संग्रह</a><a href="#story">आमची कहाणी</a><button onClick={() => {setAdminOpen(true);window.scrollTo({top:0,behavior:'smooth'});}}>Admin / Add products</button></div><div className="footer-links"><strong>ग्राहक सेवा</strong><a href="#footer">डिलिव्हरी माहिती</a><a href="#footer">परतावा व बदल</a><a href="#footer">FAQs</a><a href="mailto:hello@bhagyaswapnjewels.example">संपर्क साधा</a></div><div className="footer-signup"><strong>नवीन संग्रहाची माहिती मिळवा</strong><p>Be the first to know about new collections and special treats.</p><a className="under-link" href="#home">वर जा ↑</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} BhagyaSwapn Jewels. मराठमोळ्या प्रेमाने सजवलेले.</span><span>Demo storefront · Payments not enabled</span></div></footer>
    </>}
    {notice && <div className="toast"><span>✓</span>{notice}<button onClick={() => setCartOpen(true)}>View bag</button></div>}
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} products={products} setCart={setCart}/>
    <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} onAdd={addToCart}/>
  </div>;
}