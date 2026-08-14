import { useState, type ReactNode, type FormEvent } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Instagram, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import hero from './assets/hero.png';
import spa from './assets/spa.png';
import chairs from './assets/chairs.png';
import hair from './assets/hair.png';
import nails from './assets/nails.png';
import facial from './assets/facial.png';
import products from './assets/products.png';
import arch from './assets/arch.png';
import interior from './assets/interior.png';
import entrance from './assets/entrance.png';

const WA = '919090696918';
const maps = 'https://maps.app.goo.gl/eL7fWVZVhFWZwPf38';
const instagram = 'https://www.instagram.com/havanathesalon/';
const phone = '+919090696918';

const services = [
  { title:'Hair Studio', copy:'Precision cuts, colour, treatments and styling shaped around you.', image:hair, items:['Haircuts','Hair Colour','Keratin','Hair Spa','Hair Treatments','Styling'] },
  { title:'Skin Therapy', copy:'Restorative rituals designed to leave skin fresh, luminous and renewed.', image:facial, items:['Facials','Detan','Glow Treatments','Acne Care','Skin Treatments'] },
  { title:'Nail Artistry', copy:'Refined manicures, pedicures and detail-led nail design.', image:nails, items:['Manicure','Pedicure','Gel Extensions','Nail Art'] },
  { title:'Makeup & Body', copy:'Polished looks for bridal moments, celebrations and special occasions.', image:spa, items:['Bridal Makeup','Party Makeup','Body Polishing','Special Occasion Makeup'] },
];
const gallery = [
  ['Salon architecture', arch, 'Salon'], ['Signature hair', hair, 'Hair'], ['Nail detail', nails, 'Nails'], ['Treatment ritual', facial, 'Beauty'],
  ['Havana interior', interior, 'Salon'], ['Luxury styling', chairs, 'Hair'], ['Product edit', products, 'Beauty'], ['The entrance', entrance, 'Salon']
];
const testimonials = [
  'Absolutely stunning experience. The space feels beautiful and the service is even better.',
  'The team understood exactly what I wanted. Loved the attention to detail and the finish.',
  'A genuinely premium salon experience in Jubilee Hills. I will definitely be back.'
];

function Reveal({children, delay=0, className='' }:{children:ReactNode;delay?:number;className?:string}){
  return <motion.div className={className} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.7,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
function SectionLabel({children}:{children:ReactNode}){ return <div className="eyebrow"><span />{children}</div> }
function Button({children,href,onClick,light=false}:{children:ReactNode;href?:string;onClick?:()=>void;light?:boolean}){
  const cls=`button ${light?'button-light':''}`;
  if(href) return <a className={cls} href={href}>{children}<ArrowUpRight size={16}/></a>;
  return <button className={cls} onClick={onClick}>{children}<ArrowUpRight size={16}/></button>;
}

export function App(){
  const [menu,setMenu]=useState(false); const [filter,setFilter]=useState('All'); const [lightbox,setLightbox]=useState<number|null>(null); const [slide,setSlide]=useState(0); const [sent,setSent]=useState(false);
  const {scrollYProgress}=useScroll(); const heroY=useTransform(scrollYProgress,[0,.25],[0,100]);
  const filtered=gallery.filter(([, ,cat])=>filter==='All'||cat===filter);
  const openBooking=()=>document.getElementById('booking')?.scrollIntoView({behavior:'smooth'});
  const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault(); const data=new FormData(e.currentTarget); const text=`Hi Havana The Salon, I would like to book an appointment.\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\nPreferred Date: ${data.get('date')}\nPreferred Time: ${data.get('time')}\nMessage: ${data.get('message')||'—'}\n\nPlease confirm my appointment.`; setSent(true); window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`,'_blank'); };
  return <div className="site">
    <header className="nav"><a className="brand" href="#home" aria-label="Havana The Salon home"><span>HAVANA</span><small>THE SALON</small></a><nav className="desktop-nav">{['About','Services','Gallery','Reviews','Contact'].map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav><Button onClick={openBooking}>Book Appointment</Button><button className="menu-btn" onClick={()=>setMenu(true)} aria-label="Open menu"><Menu/></button></header>
    <AnimatePresence>{menu&&<motion.div className="mobile-menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="close-menu" onClick={()=>setMenu(false)}><X/></button><div className="mobile-links">{['Home','About','Services','Gallery','Reviews','Contact'].map(x=><a key={x} onClick={()=>setMenu(false)} href={`#${x.toLowerCase()}`}>{x}</a>)}</div><div className="mobile-actions"><Button onClick={()=>{setMenu(false);openBooking()}}>Book Appointment</Button><a href={`https://wa.me/${WA}`} className="text-action"><MessageCircle size={18}/> WhatsApp</a><a href={`tel:${phone}`} className="text-action"><Phone size={18}/> Call Havana</a></div></motion.div>}</AnimatePresence>

    <main>
      <section id="home" className="hero"><motion.img style={{y:heroY}} src={hero} alt="Havana The Salon interior"/><div className="hero-overlay"/><div className="hero-copy"><Reveal><SectionLabel>Jubilee Hills · Hyderabad</SectionLabel><h1>Style<br/><em>Done Right.</em></h1><p>Premium hair, beauty and styling experiences in the heart of Jubilee Hills.</p><div className="hero-actions"><Button onClick={openBooking}>Book Appointment</Button><a className="ghost-link" href="#services">Explore Services <ArrowUpRight size={17}/></a></div></Reveal></div><div className="scroll-note"><span>Scroll to explore</span><div/></div></section>

      <section id="about" className="section about"><div className="about-grid"><Reveal><div className="image-frame large"><img src={entrance} alt="Havana salon entrance"/></div></Reveal><Reveal delay={.12}><SectionLabel>The Havana experience</SectionLabel><h2>Where artistry<br/><i>meets elegance.</i></h2><p className="lead">Havana The Salon is a premium beauty destination built around expert artistry, personalised attention and an atmosphere that makes every visit feel considered.</p><p>From the first consultation to the final detail, every service is shaped around you — with professional products, thoughtful technique and a space designed to slow the world down.</p><div className="features">{[['01','Certified Experts','Precision-led service from experienced professionals.'],['02','Hygiene First','A clean, comfortable and professional environment.'],['03','Premium Products','Professional-grade products selected for performance.'],['04','Luxury Ambience','A warm, immersive space designed around you.']].map(([n,t,c])=><div className="feature" key={n}><b>{n}</b><div><strong>{t}</strong><p>{c}</p></div></div>)}</div></Reveal></div></section>

      <section id="services" className="section services"><Reveal><div className="section-head"><div><SectionLabel>What we do</SectionLabel><h2>Signature<br/><i>Services</i></h2></div><p>Tailored for your unique beauty journey — from everyday refinement to the moments worth remembering.</p></div></Reveal><div className="service-grid">{services.map((s,i)=><Reveal key={s.title} delay={i*.06}><article className="service-card"><div className="service-image"><img src={s.image} alt={s.title}/><div className="service-index">0{i+1}</div><div className="service-hover"><span>Explore</span><ArrowUpRight/></div></div><div className="service-body"><h3>{s.title}</h3><p>{s.copy}</p><div className="service-tags">{s.items.slice(0,4).map(x=><span key={x}>{x}</span>)}</div><button onClick={openBooking}>Book this service <ArrowUpRight size={15}/></button></div></article></Reveal>)}</div></section>

      <section className="manifesto"><motion.img src={chairs} alt="Havana salon chairs"/><div><SectionLabel>The Havana standard</SectionLabel><h2>Beauty is<br/><i>in the details.</i></h2><p>Modern technique. Personal taste. A little Havana attitude.</p></div></section>

      <section id="gallery" className="section gallery"><Reveal><div className="section-head gallery-head"><div><SectionLabel>Inside Havana</SectionLabel><h2>Moments of<br/><i>Glamour</i></h2></div><div className="filters">{['All','Hair','Beauty','Nails','Salon'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div></div></Reveal><motion.div layout className="gallery-grid">{filtered.map(([name,img],i)=><motion.button layout key={name} className={`gallery-item gi-${i%4}`} onClick={()=>setLightbox(gallery.findIndex(g=>g[0]===name))}><img src={img} alt={name}/><span>{name}<ArrowUpRight size={15}/></span></motion.button>)}</motion.div></section>

      <section className="transformation"><div className="transformation-image"><img src={hair} alt="Hair transformation"/></div><div className="transformation-copy"><SectionLabel>The Havana transformation</SectionLabel><h2>Leave feeling<br/><i>like you — elevated.</i></h2><p>Whether it is a new cut, a colour refresh, glowing skin or a finishing touch, the goal is simple: make your best features feel unmistakably yours.</p><Button onClick={openBooking}>Start your transformation</Button></div></section>

      <section id="reviews" className="section reviews"><Reveal><div className="reviews-inner"><SectionLabel>Client love</SectionLabel><h2>Loved by<br/><i>our clients.</i></h2><div className="quote">“{testimonials[slide]}”</div><div className="review-bottom"><span>Havana client</span><div className="slider-controls"><button onClick={()=>setSlide((slide+testimonials.length-1)%testimonials.length)}><ChevronLeft/></button><button onClick={()=>setSlide((slide+1)%testimonials.length)}><ChevronRight/></button></div></div></div></Reveal></section>

      <section className="instagram-strip"><div><SectionLabel>Social</SectionLabel><h2>Follow the<br/><i>Havana journey.</i></h2></div><a href={instagram} target="_blank" rel="noreferrer"><Instagram size={22}/><span>@havanathesalon</span><ArrowUpRight/></a></section>

      <section id="booking" className="section booking"><div className="booking-copy"><SectionLabel>Appointments</SectionLabel><h2>Your Havana<br/><i>experience awaits.</i></h2><p>Tell us what you are looking for and we will take it from there. Your appointment request opens directly in WhatsApp for quick confirmation.</p><div className="booking-details"><div><CalendarDays/><span><b>Every day</b>10:00 AM — 10:00 PM</span></div><div><Phone/><span><b>Call us</b>090906 96918</span></div></div></div><form onSubmit={submit} className="booking-form">{sent&&<div className="sent"><Check/><span>WhatsApp opened. Please send the pre-filled message to confirm.</span></div>}<label>Full Name<input required name="name" placeholder="Your name"/></label><label>Phone Number<input required name="phone" inputMode="tel" placeholder="+91"/></label><label>Service<select required name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.flatMap(s=>s.items).map(x=><option key={x}>{x}</option>)}</select></label><div className="form-row"><label>Preferred Date<input required type="date" name="date"/></label><label>Preferred Time<input required type="time" name="time"/></label></div><label>Message <span className="optional">Optional</span><textarea name="message" rows={4} placeholder="Anything you'd like us to know?"/></label><button className="submit">Book via WhatsApp <MessageCircle size={18}/></button></form></section>

      <section id="contact" className="location"><div className="location-map"><div className="map-card"><MapPin size={20}/><span>Jubilee Hills<br/><b>Hyderabad</b></span></div><a className="map-link" href={maps} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={15}/></a></div><div className="location-copy"><SectionLabel>Find Havana</SectionLabel><h2>Come see<br/><i>for yourself.</i></h2><p>1st Floor, MR Plaza, Road No. 36, Sri Rama Colony, Kavuri Hills, Jubilee Hills, Hyderabad, Telangana 500033</p><a className="contact-line" href={`tel:${phone}`}><Phone/>090906 96918</a><div className="hours"><span>Opening hours</span><b>10:00 AM — 10:00 PM<br/>Every day</b></div><Button href={maps}>Get Directions</Button></div></section>

      <section className="final-cta"><div><SectionLabel>One last thing</SectionLabel><h2>Ready for your next<br/><i>transformation?</i></h2><p>Step into Havana The Salon and experience beauty, styling and luxury designed around you.</p><div className="hero-actions"><Button onClick={openBooking}>Book Appointment</Button><a className="ghost-link" href={`https://wa.me/${WA}`}>WhatsApp Us <ArrowUpRight size={17}/></a></div></div></section>
    </main>

    <footer><div className="footer-brand"><a className="brand" href="#home"><span>HAVANA</span><small>THE SALON</small></a><p>STYLE DONE RIGHT</p></div><div className="footer-links"><div><b>Explore</b><a href="#about">About</a><a href="#services">Services</a><a href="#gallery">Gallery</a><a href="#reviews">Reviews</a></div><div><b>Contact</b><a href={`tel:${phone}`}>090906 96918</a><a href={instagram}>Instagram</a><a href={maps}>Directions</a></div><div><b>Visit</b><span>1st Floor, MR Plaza<br/>Road No. 36, Kavuri Hills<br/>Jubilee Hills, Hyderabad</span><span>10 AM — 10 PM · Daily</span></div></div><div className="footer-bottom"><span>© 2026 Havana The Salon. All rights reserved.</span><span>Jubilee Hills · Hyderabad</span></div></footer>

    <div className="mobile-bar"><a href={`tel:${phone}`}><Phone/><span>Call</span></a><a href={`https://wa.me/${WA}`}><MessageCircle/><span>WhatsApp</span></a><button onClick={openBooking}><CalendarDays/><span>Book</span></button></div>
    <AnimatePresence>{lightbox!==null&&<motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setLightbox(null)}><button onClick={()=>setLightbox(null)}><X/></button><motion.img initial={{scale:.94}} animate={{scale:1}} src={gallery[lightbox][1]} alt={gallery[lightbox][0]} onClick={e=>e.stopPropagation()}/><span>{gallery[lightbox][0]}</span></motion.div>}</AnimatePresence>
  </div>
}
